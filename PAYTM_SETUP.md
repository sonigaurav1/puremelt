# Paytm Integration Setup (Production-ready)

This project contains Paytm integration scaffolding. The code will run in demo mode when credentials are not set, but to enable production/sandbox Paytm flows do the following.

## Required environment variables

- `PAYTM_MERCHANT_ID` — your Paytm merchant ID (MID)
- `PAYTM_MERCHANT_KEY` — your Paytm merchant key (secret)
- `PAYTM_ENV` — `staging` or `production` (defaults to `staging`)
- `NEXT_PUBLIC_SITE_URL` — public site URL (used for Paytm callback URL), e.g. `https://example.com` or `http://localhost:3000`
- `CONVEX_SERVICE_ROLE_KEY` — Convex service role key (server-side only) to let the server call Convex mutations for verification and persistence
- (Optional) `PAYTM_CONFIRM_SECRET` — a one-time secret you can use for the `/api/paytm/confirm` route if you don't use Clerk server auth. Keep this secret server-side only.

Do NOT commit these values to the repository.

## Install dependencies

After pulling the changes, install the new dependency:

```bash
npm install
# or
# pnpm install
# yarn install
```

This installs `paytmchecksum` used by the server to sign/verify Paytm requests.

## Quick checklist (copy & paste)

1. Install dependencies:

```bash
npm install
# or: pnpm install
# or: yarn install
```

2. Create a `.env.local` file at the project root with the example values below (do NOT commit it):

```env
# Paytm
PAYTM_MERCHANT_ID=your_mid_here
PAYTM_MERCHANT_KEY=your_merchant_key_here
PAYTM_ENV=staging

# App / Dev
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Convex (server-side only)
CONVEX_SERVICE_ROLE_KEY=your_convex_service_role_key_here

# Optional quick confirm secret (if not using Clerk server auth)
PAYTM_CONFIRM_SECRET=some_local_secret
```

3. Restart the dev server:

```bash
npm run dev
```

4. (Optional) Regenerate Convex types after changing any `convex/` server functions:

```bash
npx convex codegen
```

## Test flows locally (no Paytm credentials required)

- Use the built-in demo fallbacks. If `PAYTM_MERCHANT_ID` / `PAYTM_MERCHANT_KEY` are missing the server returns demo `paytmOrderId` and `txnToken` values so the frontend and simulator can continue.
- To simulate the full flow (create-order, confirm, webhook) run:

```bash
npm run simulate:paytm
```

This script posts to `/api/paytm/create-order`, `/api/paytm/confirm`, and `/api/paytm/webhook` with demo payloads and logs the responses. Use `PAYTM_CONFIRM_SECRET` in `.env.local` if you've set it so the confirm endpoint accepts the simulated confirm.

## Enabling sandbox / staging Paytm end-to-end

1. Obtain Paytm staging credentials from Paytm (MID and merchant key).
2. Set `PAYTM_MERCHANT_ID` and `PAYTM_MERCHANT_KEY` in `.env.local` and restart the dev server.
3. Ensure `NEXT_PUBLIC_SITE_URL` is set to your dev host (e.g., `http://localhost:3000`).
4. Visit the checkout page in the app, choose the Paytm payment method, and place an order — the server will attempt to call Paytm's InitiateTransaction endpoint to return a real `txnToken` for CheckoutJS.

Notes:

- The server signs the InitiateTransaction request using `paytmchecksum`. If you change the package or upgrade the SDK, verify the signature logic still matches Paytm's expectations.
- Paytm's webhook callbacks are the authoritative events for transaction completion; the client-side `/api/paytm/confirm` is an optimistic UX step.

## Convex service role key (server calls)

To enable server-side persistence/verification from webhook and confirm endpoints you must provide a Convex service role key:

1. Open your Convex dashboard at https://www.convex.dev/ and select the project.
2. Go to Project Settings → API Keys (or Service Role Keys).
3. Create or copy the Service Role Key and set it as `CONVEX_SERVICE_ROLE_KEY` in `.env.local`.

Security: keep this key private. It allows server-side code to call Convex mutations with elevated privileges.

## Troubleshooting

- "Paytm create-order returns demo token even after setting credentials":
  - Double-check `PAYTM_MERCHANT_ID` and `PAYTM_MERCHANT_KEY` are set in the environment where the Next.js server runs (dev server inherits `.env.local`).
  - Confirm `PAYTM_ENV` is `staging` or `production` and that the correct Paytm endpoint is being used.

- "Webhook verification failing":
  - Ensure `PAYTM_MERCHANT_KEY` is set. The handler attempts to use `paytmchecksum` first; if that fails it falls back to an HMAC check. For production, prefer `paytmchecksum` verification.
  - Inspect server logs for the printed payload and signature values and compare with Paytm docs.

- "Convex calls from server failing":
  - Confirm `CONVEX_SERVICE_ROLE_KEY` is configured and that `NEXT_PUBLIC_CONVEX_URL` or `CONVEX_URL` points to your Convex project URL.
  - Run `npx convex codegen` after changing server functions so the generated client is up-to-date.

## Next steps I can help with

- Wire your Paytm staging credentials and run a live sandbox payment end-to-end.
- Add an automated integration test that signs and posts a webhook using `paytmchecksum`.
- Add stricter request validation and logging for the webhook and confirm endpoints.

Let me know which of these you'd like me to implement next and I will proceed.

## Local development

1. Add the env vars to `.env.local` (do not commit):

```env
PAYTM_MERCHANT_ID=
PAYTM_MERCHANT_KEY=
PAYTM_ENV=staging
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONVEX_SERVICE_ROLE_KEY=
PAYTM_CONFIRM_SECRET=some_local_secret # optional
```

2. Start the dev server:

```bash
npm run dev
```

3. If you change Convex server-side functions, regenerate the client types:

```bash
npx convex codegen
```

## Testing the flow locally

- The client calls `POST /api/paytm/create-order` to obtain a `txnToken` and `paytmOrderId`.
- The client will open Paytm CheckoutJS (sandbox or production domain depending on `PAYTM_ENV`) when `txnToken` is returned.
- On CheckoutJS success the client will call `POST /api/paytm/confirm` to ask the server to verify/update Convex. Paytm will also call the webhook at `/api/paytm/webhook` for authoritative notification.

To simulate Paytm calls locally, see `scripts/simulate-paytm.js` and run:

```bash
npm run simulate:paytm
```

## Convex service role key

To obtain the Convex service role key:

1. Open your Convex project dashboard (https://www.convex.dev/) and select the project.
2. Go to Project Settings → API Keys (or Service Role Keys).
3. Create or copy the Service Role Key and set it as `CONVEX_SERVICE_ROLE_KEY` in your environment.

The service role key must be kept secret. It allows server-side code to call Convex mutations with elevated privileges.

## Security notes

- Do not expose merchant keys or the Convex service role key to the browser.
- The `/api/paytm/confirm` route requires either a valid Clerk session (preferred) or the `PAYTM_CONFIRM_SECRET` header. This prevents unauthorized clients from calling the confirm route.
- The webhook is the authoritative source for payment confirmation; the confirm route is an optimistic shortcut for UX.

## Next steps after you obtain credentials

1. Add credentials to environment and restart server.
2. Run integration tests against Paytm staging credentials.
3. Optionally, adjust the `websiteName` and `callbackUrl` in `src/app/api/paytm/create-order/route.ts` for account-specific settings.

If you want, I can help wire your staging credentials once you have them and perform a sandbox end-to-end test.
