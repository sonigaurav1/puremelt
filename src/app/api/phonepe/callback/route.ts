import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

// Minimal types to avoid explicit `any` while keeping runtime flexibility
type PhonePeStatus = Record<string, unknown>;
type ConvexHttpClientLike = {
    call: (name: string, args: unknown) => Promise<unknown>;
};
type ConvexHttpClientConstructor = new (address: string, adminKey?: string) => ConvexHttpClientLike;

// Verify payment by calling PhonePe status API and update Convex payment status.
export async function POST(request: Request) {
    try {
        const merchantId = process.env.PHONEPE_MERCHANT_ID as string | undefined;
        const saltKey = process.env.PHONEPE_SALT_KEY as string | undefined;
        const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
        const env = (process.env.PHONEPE_ENV || 'uat').toLowerCase();
        const base =
            env === 'production'
                ? 'https://api.phonepe.com/apis/hermes'
                : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

        const payload = await request.json().catch(() => ({}));
        const mtid: string | undefined =
            payload?.data?.merchantTransactionId || payload?.merchantTransactionId || payload?.transactionId || payload?.mtid;

        if (!merchantId || !saltKey || !mtid) {
            console.warn('Callback missing merchantId/saltKey/mtid', { merchantId: !!merchantId, mtid });
            return NextResponse.json({ ok: false }, { status: 400 });
        }

        // Query PhonePe status API to confirm the final status
        const statusPath = `/pg/v1/status/${encodeURIComponent(merchantId)}/${encodeURIComponent(mtid)}`;
        const xVerifyHash = crypto.createHash('sha256').update(statusPath + saltKey).digest('hex');
        const xVerify = `${xVerifyHash}###${saltIndex}`;

        const statusResp = await fetch(`${base}${statusPath}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
                'X-MERCHANT-ID': merchantId
            }
        });
        const statusUnknown: unknown = await statusResp.json().catch(() => ({}));
        const statusJson: PhonePeStatus =
            statusUnknown && typeof statusUnknown === 'object'
                ? (statusUnknown as PhonePeStatus)
                : ({} as PhonePeStatus);

        const success = (statusJson['success'] === true) && (statusJson['code'] === 'PAYMENT_SUCCESS');
        const newStatus = success ? 'paid' : 'failed';

        // Update Convex payment by transactionId (merchantTransactionId)
        try {
            const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL;
            const serviceKey = process.env.CONVEX_SERVICE_ROLE_KEY;
            if (convexUrl && serviceKey) {
                const convexMod: unknown = await import('convex');
                const cm = (convexMod ?? {}) as Record<string, unknown>;
                let ConvexHttpClientCtor: ConvexHttpClientConstructor | null = null;
                if (typeof cm['ConvexHttpClient'] === 'function') {
                    ConvexHttpClientCtor = cm['ConvexHttpClient'] as unknown as ConvexHttpClientConstructor;
                } else if (cm['default'] && typeof (cm['default'] as Record<string, unknown>)['ConvexHttpClient'] === 'function') {
                    ConvexHttpClientCtor = (cm['default'] as Record<string, unknown>)['ConvexHttpClient'] as unknown as ConvexHttpClientConstructor;
                } else if (typeof cm['default'] === 'function') {
                    ConvexHttpClientCtor = cm['default'] as unknown as ConvexHttpClientConstructor;
                }

                if (ConvexHttpClientCtor) {
                    const client = new ConvexHttpClientCtor(convexUrl, serviceKey);
                    if (client) {
                        try {
                            await client.call('payments.updatePaymentStatusByTransactionId', {
                                transactionId: mtid,
                                status: newStatus,
                                details: {
                                    phonepeStatus: statusJson,
                                    callbackPayload: payload as unknown
                                }
                            });
                        } catch (e) {
                            console.warn('Convex updatePaymentStatusByTransactionId failed:', String(e));
                        }
                    }
                }
            }
        } catch (e) {
            console.warn('Failed to call Convex from callback:', String(e));
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('PhonePe callback error', err);
        return NextResponse.json({ error: 'internal' }, { status: 500 });
    }
}
