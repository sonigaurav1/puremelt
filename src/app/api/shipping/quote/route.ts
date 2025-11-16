import { NextRequest, NextResponse } from 'next/server'

// IMPORTANT: This route proxies shipping quote requests.
// If DELHIVERY_API_TOKEN is not set, it returns a deterministic fallback estimate
// to keep local/dev flows unblocked.

const DELHIVERY_TOKEN = process.env.DELHIVERY_API_TOKEN
const DELHIVERY_BASE = process.env.DELHIVERY_API_BASE_URL || 'https://track.delhivery.com'
// Many Delhivery charge APIs expect both pickup and delivery pincodes to compute the zone.
// Without pickup pincode, Delhivery may assume a default origin and return a higher charge.
const DELHIVERY_PICKUP_PINCODE = process.env.DELHIVERY_PICKUP_PINCODE

// Sanity: 6-digit Indian pincodes only
function isValidPincode(pin: string) {
    return /^[1-9][0-9]{5}$/.test(pin)
}

function parseNumber(n: unknown, d = 0) {
    const v = typeof n === 'number' ? n : Number(n)
    return Number.isFinite(v) ? v : d
}

function fallbackQuote(toPincode: string, weightKg: number, orderValue?: number) {
    const currency = 'INR'
    const serviceable = isValidPincode(toPincode)
    if (!serviceable) {
        return { serviceable: false, currency, error: 'Invalid or unserviceable pincode.' }
    }
    const freeThreshold = 600
    if ((orderValue ?? 0) >= freeThreshold) {
        return {
            serviceable: true,
            currency,
            standard: { amount: 0, currency, etaDays: 4, serviceName: 'Standard' },
            express: { amount: 99, currency, etaDays: 2, serviceName: 'Express' }
        }
    }
    const firstDigit = Number(toPincode[0])
    const locationFactor = firstDigit >= 7 ? 1.25 : firstDigit <= 2 ? 1.05 : 1.1
    const base = 49
    const perKgStd = 60
    const perKgExp = 120
    const w = Math.max(0.25, Number.isFinite(weightKg) ? weightKg : 0.25)
    const std = Math.round((base + perKgStd * w) * locationFactor)
    const exp = Math.round((base + perKgExp * w) * locationFactor)
    return {
        serviceable: true,
        currency,
        standard: { amount: std, currency, etaDays: 3, serviceName: 'Standard' },
        express: { amount: exp, currency, etaDays: 1, serviceName: 'Express' },
        breakdown: { base, perKgStd, perKgExp, w, locationFactor }
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}))
        const toPincode = String(body?.toPincode || '').trim()
        const weightKg = parseNumber(body?.weightKg, 0)
        const cod = Boolean(body?.cod)
        const orderValue = parseNumber(body?.orderValue, 0)

        // Debug: incoming raw request parameters
        if (process.env.NODE_ENV !== 'production') {
            console.log('[shipping/quote] incoming', { body, toPincode, weightKg, cod, orderValue, hasToken: Boolean(DELHIVERY_TOKEN), pickup: DELHIVERY_PICKUP_PINCODE })
        }

        if (!isValidPincode(toPincode)) {
            return NextResponse.json(
                { serviceable: false, currency: 'INR', error: 'Invalid pincode. Use a 6-digit Indian pincode.' },
                { status: 400 }
            )
        }

        if (!DELHIVERY_TOKEN) {
            const fb = fallbackQuote(toPincode, weightKg, orderValue)
            if (process.env.NODE_ENV !== 'production') {
                console.log('[shipping/quote] fallback:no-token', fb)
            }
            return NextResponse.json(fb)
        }

        // Attempt Delhivery API call. If it fails, fall back gracefully.
        // NOTE: Delhivery accounts differ: some accept GET with query params (recommended),
        // others may accept POST. We'll try a sequence of request variants before falling back.
        try {
            // Helper to try multiple request shapes
            const attempts: Array<{
                label: string
                url: URL
                init: RequestInit
                debugPayload: Record<string, unknown>
            }> = []

            const basePath = '/api/kinko/v1/invoice/charges/'
            const basePathJson = '/api/kinko/v1/invoice/charges.json'
            const grams = Math.max(250, Math.round(Math.max(0, weightKg) * 1000))
            const paymentMode = cod ? 'cod' : 'pre-paid'
            const pickup = DELHIVERY_PICKUP_PINCODE || ''

            // Attempt 1: GET with cgm (grams)
            {
                const u = new URL(basePath, DELHIVERY_BASE)
                const params: Record<string, string | number> = {
                    md: 'F', // Forward
                    pt: paymentMode,
                    delivery_pincode: toPincode,
                    cgm: grams,
                }
                if (pickup) params['pickup_pincode'] = pickup
                Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)))
                attempts.push({
                    label: 'GET:cgm',
                    url: u,
                    init: {
                        method: 'GET',
                        headers: { Authorization: `Token ${DELHIVERY_TOKEN}`, Accept: 'application/json' },
                    },
                    debugPayload: params,
                })
            }

            // Attempt 2: GET with cgm and explicit service SURFACE/EXPRESS (two requests)
            for (const ss of ['Surface', 'SURFACE', 'Express', 'EXPRESS']) {
                const u = new URL(basePath, DELHIVERY_BASE)
                const params: Record<string, string | number> = {
                    md: 'F',
                    pt: paymentMode,
                    delivery_pincode: toPincode,
                    cgm: grams,
                    ss,
                }
                if (pickup) params['pickup_pincode'] = pickup
                Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)))
                attempts.push({
                    label: `GET:cgm:ss=${ss}`,
                    url: u,
                    init: {
                        method: 'GET',
                        headers: { Authorization: `Token ${DELHIVERY_TOKEN}`, Accept: 'application/json' },
                    },
                    debugPayload: params,
                })
            }

            // Attempt 3: GET with weight in kg (some accounts accept this)
            {
                const u = new URL(basePath, DELHIVERY_BASE)
                const params: Record<string, string | number> = {
                    md: 'F',
                    pt: paymentMode,
                    delivery_pincode: toPincode,
                    weight: Math.max(0.25, weightKg),
                }
                if (pickup) params['pickup_pincode'] = pickup
                Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)))
                attempts.push({
                    label: 'GET:weight',
                    url: u,
                    init: {
                        method: 'GET',
                        headers: { Authorization: `Token ${DELHIVERY_TOKEN}`, Accept: 'application/json' },
                    },
                    debugPayload: params,
                })
            }

            // Attempt 4: GET .json path with cgm
            {
                const u = new URL(basePathJson, DELHIVERY_BASE)
                const params: Record<string, string | number> = {
                    md: 'F',
                    pt: paymentMode,
                    delivery_pincode: toPincode,
                    cgm: grams,
                }
                if (pickup) params['pickup_pincode'] = pickup
                Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)))
                attempts.push({
                    label: 'GET:cgm:.json',
                    url: u,
                    init: { method: 'GET', headers: { Authorization: `Token ${DELHIVERY_TOKEN}`, Accept: 'application/json' } },
                    debugPayload: params,
                })
            }

            // Attempt 5: legacy POST JSON (what we used earlier)
            {
                const u = new URL(basePath, DELHIVERY_BASE)
                const payload = {
                    ...(pickup ? { pickup_pincode: pickup } : {}),
                    delivery_pincode: toPincode,
                    weight: Math.max(0.25, weightKg),
                    cod: cod ? 1 : 0,
                    declared_value: Math.max(0, orderValue),
                }
                attempts.push({
                    label: 'POST:json',
                    url: u,
                    init: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${DELHIVERY_TOKEN}`,
                            Accept: 'application/json',
                        },
                        body: JSON.stringify(payload),
                    },
                    debugPayload: payload,
                })
            }

            // Execute attempts in order until one returns 2xx and a parsable body
            let data: Record<string, unknown> | null = null
            let used: { label: string; url: string; payload: Record<string, unknown>; status: number; ms: number } | null = null
            for (const attempt of attempts) {
                const t0 = Date.now()
                const res = await fetch(attempt.url.toString(), attempt.init)
                const ms = Date.now() - t0
                if (process.env.NODE_ENV !== 'production') {
                    console.log('[shipping/quote] request', {
                        variant: attempt.label,
                        url: attempt.url.toString(),
                        payload: attempt.debugPayload,
                        status: res.status,
                        ms,
                    })
                }
                if (!res.ok) continue
                try {
                    data = (await res.json()) as Record<string, unknown>
                    used = {
                        label: attempt.label,
                        url: attempt.url.toString(),
                        payload: attempt.debugPayload,
                        status: 200,
                        ms,
                    }
                    break
                } catch (err) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log('[shipping/quote] json parse error', String(err))
                    }
                }
            }

            if (!data) {
                const fb = fallbackQuote(toPincode, weightKg, orderValue)
                if (process.env.NODE_ENV !== 'production') {
                    console.log('[shipping/quote] all-attempts-failed -> fallback', fb)
                }
                return NextResponse.json(fb)
            }

            // Try to map typical fields; safely default if missing
            // Example imagined structure:
            // {
            //   rates: {
            //     standard: { total_amount: 120, eta_days: 3 },
            //     express: { total_amount: 220, eta_days: 1 }
            //   },
            //   currency: 'INR',
            //   serviceable: true
            // }
            const currency = (data?.currency as string) || 'INR'
            const serviceable = Boolean((data as Record<string, unknown>)?.serviceable ?? true)

            type UnknownRecord = Record<string, unknown>
            const rates = (data?.['rates'] as UnknownRecord | undefined) || (data as UnknownRecord)
            const stdRec =
                (rates?.['standard'] as UnknownRecord | undefined) ||
                (rates?.['surface'] as UnknownRecord | undefined) ||
                undefined
            const expRec = (rates?.['express'] as UnknownRecord | undefined) || undefined

            // Be liberal in what we accept for amount
            const pickAmount = (rec?: UnknownRecord): number => {
                if (!rec) return NaN
                return [
                    rec['total_amount'],
                    rec['total_charge'],
                    rec['amount'],
                    rec['net_amount'],
                    rec['charge'],
                ]
                    .map((v) => parseNumber(v))
                    .find((v) => Number.isFinite(v)) as number
            }
            let stdAmount = pickAmount(stdRec)
            let expAmount = pickAmount(expRec)
            if (!Number.isFinite(stdAmount)) {
                stdAmount = parseNumber((data as UnknownRecord)['total_amount'])
            }
            if (!Number.isFinite(expAmount)) {
                expAmount = NaN
            }
            // If the chosen request variant targeted a specific service (via ss),
            // map the top-level amount to the appropriate bucket.
            if (used?.label?.includes('ss=')) {
                const topAmt = parseNumber((data as UnknownRecord)['total_amount'])
                if (Number.isFinite(topAmt)) {
                    if (/ss=express/i.test(used.label)) {
                        expAmount = topAmt
                    } else {
                        stdAmount = topAmt
                    }
                }
            }
            const stdEta =
                parseNumber((stdRec?.['eta_days'] as unknown) as number) ||
                parseNumber((stdRec?.['eta'] as unknown) as number) ||
                undefined
            const expEta =
                parseNumber((expRec?.['eta_days'] as unknown) as number) ||
                parseNumber((expRec?.['eta'] as unknown) as number) ||
                undefined

            const responseObj = {
                serviceable,
                currency,
                standard: Number.isFinite(stdAmount)
                    ? { amount: Math.round(stdAmount), currency, etaDays: stdEta, serviceName: 'Standard' }
                    : undefined,
                express: Number.isFinite(expAmount)
                    ? { amount: Math.round(expAmount), currency, etaDays: expEta, serviceName: 'Express' }
                    : undefined,
                breakdown: {
                    ...(data || {}),
                    _request: used || undefined,
                },
            }
            if (process.env.NODE_ENV !== 'production') {
                console.log('[shipping/quote] success', responseObj)
            }
            return NextResponse.json(responseObj)
        } catch {
            // Network/parse errors => fallback
            const fb = fallbackQuote(toPincode, weightKg, orderValue)
            if (process.env.NODE_ENV !== 'production') {
                console.log('[shipping/quote] error fallback', fb)
            }
            return NextResponse.json(fb)
        }
    } catch {
        return NextResponse.json(
            { serviceable: false, currency: 'INR', error: 'Bad request' },
            { status: 400 }
        )
    }
}
