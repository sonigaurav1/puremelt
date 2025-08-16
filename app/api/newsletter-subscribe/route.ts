import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    if (!email) {
        return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // Brevo API details
    const API_KEY = process.env.BREVO_API_KEY!;
    const LIST_ID = process.env.BREVO_LIST_ID!;

    try {
        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": API_KEY,
            },
            body: JSON.stringify({
                email,
                listIds: [LIST_ID],
                updateEnabled: true,
            }),
        });

        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            const data = await response.json();
            return NextResponse.json({ error: data.message || "Failed to subscribe." }, { status: 400 });
        }
    } catch (err) {
        return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
    }
}
