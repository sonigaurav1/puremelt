import { NextResponse } from 'next/server';

/**
 * PhonePe client confirm stub.
 *
 * In production, rely on PhonePe's callback/webhook to verify payment.
 * This endpoint is provided only for symmetry with the previous Paytm flow
 * and for optimistic client UX if you choose to use it.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('PhonePe confirm (client-reported):', body);
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Error in PhonePe confirm route', err);
        return NextResponse.json({ error: 'internal' }, { status: 500 });
    }
}
