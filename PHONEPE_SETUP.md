# PhonePe Integration Setup

This app now supports a redirect-based PhonePe payment flow.

## Environment variables

Add these to your `.env.local`:

```
# PhonePe
PHONEPE_MERCHANT_ID=your_merchant_id
PHONEPE_SALT_KEY=your_salt_key
PHONEPE_SALT_INDEX=1
PHONEPE_ENV=uat # or production

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000 # your public URL in dev or prod

# Convex (optional, for server-initiated updates in callback)
CONVEX_URL= # or NEXT_PUBLIC_CONVEX_URL
CONVEX_SERVICE_ROLE_KEY= # service role key to call mutations from API routes
```

## Flow overview

- Client calls `POST /api/phonepe/create-order` with `{ orderId, amount }`.
  - The server:
    - Builds a `/pg/v1/pay` payload with `merchantTransactionId = orderId` and `amount` in paise.
    - Signs it using `X-VERIFY = sha256(base64(request) + "/pg/v1/pay" + SALT_KEY) + "###" + SALT_INDEX`.
    - Returns `{ phonepeOrderId, redirectUrl }`.
- Client redirects to `redirectUrl`.
- PhonePe calls back to `POST /api/phonepe/callback`.
  - The server verifies status via PhonePe `/pg/v1/status/{merchantId}/{merchantTransactionId}` and
    updates the Convex payment status using the new mutation
    `payments.updatePaymentStatusByTransactionId`.

## Endpoints

- `POST /api/phonepe/create-order` — Initiates the payment session, returns redirect URL.
- `POST /api/phonepe/callback` — Receives PhonePe callback and verifies payment via status API.
- `POST /api/phonepe/confirm` — Optional client confirmation stub (not used in PhonePe flow).

## Notes

- The checkout component already redirects the user to the URL returned by the create-order endpoint.
- The Convex mutation `payments.updatePaymentStatusByTransactionId` updates the payment record by the
  transaction ID (we use the `orderId` passed from the client for `merchantTransactionId`).
- Make sure your PhonePe account has the callback URL configured or pass it in the create-order payload.
- For production, set `PHONEPE_ENV=production`.
