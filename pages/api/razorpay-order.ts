export const runtime = 'edge';
import Razorpay from 'razorpay';

const hasKeys = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_KEY_ID !== 'your_key_id_here' && process.env.RAZORPAY_KEY_SECRET !== 'your_key_secret_here');
const razorpay = hasKeys
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })
    : null;

export default async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, currency, receipt, notes } = body;
        if (!amount || !currency) {
            return new Response(JSON.stringify({ error: 'Missing amount or currency' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (!hasKeys) {
            // Mock response for local development if keys are missing
            return new Response(
                JSON.stringify({
                    id: `order_mock_${Date.now()}`,
                    entity: 'order',
                    amount,
                    currency,
                    receipt: receipt || `rcptid_${Date.now()}`,
                    status: 'created',
                    notes: notes || {},
                    created_at: Math.floor(Date.now() / 1000),
                }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }
        const order = await razorpay!.orders.create({
            amount,
            currency,
            receipt: receipt || `rcptid_${Date.now()}`,
            notes: notes || {},
        });
        return new Response(JSON.stringify(order), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || 'Order creation failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
