#!/usr/bin/env node
// Simple simulator to exercise Paytm create-order, confirm, and webhook endpoints.
// Usage: node scripts/simulate-paytm.js

const fetch = globalThis.fetch || require('node-fetch');

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'http://localhost:3000';

async function createOrder() {
  const url = `${BASE}/api/paytm/create-order`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: `sim-${Date.now()}`, amount: 100.0 })
  });
  const data = await resp.json();
  console.log('create-order response:', data);
  return data;
}

async function confirm(orderId, txnId) {
  const url = `${BASE}/api/paytm/confirm`;
  const headers = { 'Content-Type': 'application/json' };
  if (process.env.PAYTM_CONFIRM_SECRET)
    headers['x-paytm-confirm-secret'] = process.env.PAYTM_CONFIRM_SECRET;
  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      orderId,
      transactionId: txnId,
      payload: { simulated: true }
    })
  });
  const data = await resp.json();
  console.log('confirm response:', data);
  return data;
}

async function webhook(orderId, txnId) {
  const url = `${BASE}/api/paytm/webhook`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, txnId, status: 'TXN_SUCCESS' })
  });
  const data = await resp.json();
  console.log('webhook response:', data);
  return data;
}

(async () => {
  try {
    const created = await createOrder();
    const paytmOrderId = created?.paytmOrderId || `SIM_${Date.now()}`;
    const txnToken = created?.txnToken || `SIMTOKEN_${Date.now()}`;
    console.log('Simulating confirm and webhook for', paytmOrderId, txnToken);
    await confirm(paytmOrderId, txnToken);
    await webhook(paytmOrderId, txnToken);
    console.log('Simulation complete');
  } catch (e) {
    console.error('Simulation failed', e);
    process.exit(1);
  }
})();
