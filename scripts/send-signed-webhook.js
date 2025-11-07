#!/usr/bin/env node
// Send a signed (if possible) Paytm webhook payload to the local server.
// Usage: SITE_URL=http://localhost:3001 PAYTM_MERCHANT_KEY=... node scripts/send-signed-webhook.js

const fetch = globalThis.fetch || require('node-fetch');

const BASE =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000';
const merchantKey = process.env.PAYTM_MERCHANT_KEY;

async function main() {
  const payload = {
    orderId: `TEST_${Date.now()}`,
    txnId: `TXN_${Date.now()}`,
    status: 'TXN_SUCCESS',
    amount: 100.0,
    timestamp: Date.now()
  };

  let signature = null;

  if (merchantKey) {
    try {
      // dynamic import to support CJS/ESM
      // @ts-ignore
      const paytmMod = await import('paytmchecksum');
      const paytm = paytmMod && (paytmMod.default || paytmMod);
      if (paytm && typeof paytm.generateSignature === 'function') {
        const bodyString = JSON.stringify(payload);
        signature = await paytm.generateSignature(bodyString, merchantKey);
        // Common Paytm field name
        payload.CHECKSUMHASH = signature;
      } else {
        console.warn('paytmchecksum loaded but generateSignature missing');
      }
    } catch (e) {
      console.warn(
        'paytmchecksum not available or failed to generate signature:',
        String(e)
      );
    }
  } else {
    console.log('PAYTM_MERCHANT_KEY not set; sending unsigned webhook payload');
  }

  const headers = { 'Content-Type': 'application/json' };
  if (signature) headers['x-paytm-signature'] = signature;

  const url = `${BASE.replace(/\/$/, '')}/api/paytm/webhook`;
  console.log('POST', url, 'payload:', payload);

  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  let data;
  try {
    data = await resp.json();
  } catch (e) {
    data = { status: resp.status, text: await resp.text() };
  }

  console.log('Webhook response:', data);
}

main().catch((e) => {
  console.error('Failed to send signed webhook', e);
  process.exit(1);
});
