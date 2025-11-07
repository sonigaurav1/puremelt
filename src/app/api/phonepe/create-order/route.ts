import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

/**
 * PhonePe create-order route.
 *
 * Creates a PhonePe payment session and returns a redirect URL for the client.
 * Requires env: PHONEPE_MERCHANT_ID, PHONEPE_SALT_KEY, PHONEPE_SALT_INDEX, PHONEPE_ENV (uat|production), NEXT_PUBLIC_SITE_URL
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId, amount, currency = 'INR', metadata } = body || {};

        if (!orderId || !amount || typeof amount !== 'number') {
            return NextResponse.json(
                { error: 'orderId and amount are required' },
                { status: 400 }
            );
        }

        const merchantId = process.env.PHONEPE_MERCHANT_ID || process.env.PHONEPE_CLIENT_ID;
        const saltKey = process.env.PHONEPE_SALT_KEY || process.env.PHONEPE_CLIENT_SECRET;
        const saltIndex = process.env.PHONEPE_SALT_INDEX || process.env.PHONEPE_CLIENT_VERSION || '1';
        const env = (process.env.PHONEPE_ENV || 'uat').toLowerCase();
        const site = process.env.NEXT_PUBLIC_SITE_URL || '';

        if (!merchantId || !saltKey) {
            // Fallback to demo values so local dev can proceed
            const createdAt = Date.now();
            const phonepeOrderId = `PHONEPE_ORDER_${orderId}_${createdAt}`;
            const redirectUrl = `${site}/order/thank-you`;
            return NextResponse.json({ phonepeOrderId, redirectUrl, demo: true });
        }

        const base =
            env === 'production'
                ? 'https://api.phonepe.com/apis/hermes'
                : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

        // PhonePe expects amount in paise
        const amountPaise = Math.round(amount * 100);
        const merchantTransactionId = orderId; // keep it same to correlate
        const merchantUserId = metadata?.userId || metadata?.email || 'GUEST';

        const redirectUrl = `${site}/order/thank-you?mtid=${encodeURIComponent(
            merchantTransactionId
        )}`;
        const callbackUrl = `${site}/api/phonepe/callback`;

        const payload = {
            merchantId,
            merchantTransactionId,
            merchantUserId,
            amount: amountPaise,
            currency, // Ensure currency is sent (warning fix & correctness)
            redirectUrl,
            redirectMode: 'REDIRECT',
            callbackUrl,
            paymentInstrument: { type: 'PAY_PAGE' }
        };

        const path = '/pg/v1/pay';
        const requestBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
        const xVerifyHash = crypto
            .createHash('sha256')
            .update(requestBase64 + path + saltKey)
            .digest('hex');
        const xVerify = `${xVerifyHash}###${saltIndex}`;

        const resp = await fetch(`${base}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
                'X-MERCHANT-ID': merchantId
            },
            body: JSON.stringify({ request: requestBase64 })
        });

        const json: unknown = await resp.json().catch(() => ({}));
        const isObj = json && typeof json === 'object';
        const jsonData = (isObj ? json : {}) as Record<string, unknown>;
        if (!resp.ok || jsonData['success'] !== true) {
            const code = (jsonData['code'] || jsonData['errorCode']) as string | undefined;
            const message = (jsonData['message'] || jsonData['error'] || 'PhonePe error') as string;
            let hint: string | undefined;
            if (code === 'KEY_NOT_CONFIGURED') {
                hint = 'Ensure PHONEPE_MERCHANT_ID is your merchant id (e.g., M23...) without TEST- prefix, PHONEPE_SALT_KEY is the Salt Key from PhonePe PG, and PHONEPE_SALT_INDEX matches the key version (often 1 in UAT).';
            } else if (code === 'INVALID_CHECKSUM') {
                hint = 'The X-VERIFY signature is invalid. Double-check PHONEPE_SALT_KEY and INDEX and avoid extra spaces.';
            } else if (code === 'INVALID_REDIRECT_URL') {
                hint = 'Set NEXT_PUBLIC_SITE_URL to a valid public/base URL so redirect/callback are absolute URLs.';
            }
            console.warn('PhonePe pay API error', resp.status, { code, message, json: jsonData });
            return NextResponse.json(
                { error: 'phonepe_error', code, message, hint, details: jsonData },
                { status: 400 }
            );
        }

        const phonepeOrderId = merchantTransactionId;
        const data = jsonData['data'] as Record<string, unknown> | undefined;
        const instrumentResponse = data?.['instrumentResponse'] as Record<string, unknown> | undefined;
        const redirectInfo = (instrumentResponse?.['redirectInfo'] || data?.['redirectInfo']) as Record<string, unknown> | undefined;
        const redirectTo = (redirectInfo?.['url'] || redirectInfo?.['redirectUrl'] || redirectUrl) as string;

        return NextResponse.json({ phonepeOrderId, redirectUrl: redirectTo });
    } catch (err) {
        console.error('Error in PhonePe create-order', err);
        return NextResponse.json({ error: 'internal' }, { status: 500 });
    }
}
