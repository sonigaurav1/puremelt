// Reusable client-side helper to fetch shipping quotes
// and a deterministic fallback calculator for local/dev use.

export type ShippingServiceQuote = {
    amount: number; // in INR
    currency?: string; // default INR
    etaDays?: number; // estimated days
    serviceName?: string; // e.g., "Delhivery Standard"
};

export type ShippingQuote = {
    serviceable: boolean;
    currency: string; // e.g., INR
    standard?: ShippingServiceQuote;
    express?: ShippingServiceQuote;
    breakdown?: Record<string, unknown>;
    error?: string;
};

export type QuoteParams = {
    toPincode: string; // 6-digit Indian pincode
    weightKg: number; // total weight in kilograms
    cod?: boolean;
    orderValue?: number; // used for insurance/declared value
};

// Simple deterministic fallback when API token is missing on the server
// This mirrors real-world behavior but does not claim to be exact.
export function fallbackQuote({ toPincode, weightKg, orderValue }: QuoteParams): ShippingQuote {
    const currency = "INR";
    const serviceable = /^[1-9][0-9]{5}$/.test(toPincode);
    if (!serviceable) {
        return { serviceable: false, currency, error: "Invalid or unserviceable pincode." };
    }

    // Business rules (adjust as needed):
    const freeThreshold = 600; // free shipping at/above ₹600 order value
    if ((orderValue ?? 0) >= freeThreshold) {
        return {
            serviceable: true,
            currency,
            standard: { amount: 0, currency, etaDays: 4, serviceName: "Standard" },
            express: { amount: 99, currency, etaDays: 2, serviceName: "Express" },
        };
    }

    // Location factor: simplistic banding by first digit of pincode
    const firstDigit = Number(toPincode[0]);
    const locationFactor = firstDigit >= 7 ? 1.25 : firstDigit <= 2 ? 1.05 : 1.1;

    // Weight pricing
    const base = 49; // base fee
    const perKgStd = 60; // per kg standard
    const perKgExp = 120; // per kg express
    const w = Math.max(0.25, Number.isFinite(weightKg) ? weightKg : 0.25); // minimum billable weight 250g

    const std = Math.round((base + perKgStd * w) * locationFactor);
    const exp = Math.round((base + perKgExp * w) * locationFactor);

    return {
        serviceable: true,
        currency,
        standard: { amount: std, currency, etaDays: 3, serviceName: "Standard" },
        express: { amount: exp, currency, etaDays: 1, serviceName: "Express" },
        breakdown: { base, perKgStd, perKgExp, w, locationFactor },
    };
}

export async function fetchShippingQuote(params: QuoteParams, signal?: AbortSignal): Promise<ShippingQuote> {
    try {
        const res = await fetch("/api/shipping/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
            signal,
        });
        if (!res.ok) {
            // fall back client-side to deterministic estimate
            return fallbackQuote(params);
        }
        const data = (await res.json()) as ShippingQuote;
        // If server intentionally falls back or returns error, ensure we always have a usable quote
        if (!data?.serviceable) {
            return fallbackQuote(params);
        }
        return data;
    } catch {
        return fallbackQuote(params);
    }
}
