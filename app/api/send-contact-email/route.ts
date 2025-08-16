import { Resend } from "resend";
import { z } from "zod";
import { ContactEmailTemplate } from "@/app/components/ContactEmailTemplate";
import React from "react";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

// ✅ Zod schema for validation
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().max(120, "Subject too long").optional(),
    message: z.string().min(10, "Message must be at least 10 characters")
});

// ✅ Simple in-memory rate limit store
const requestCounts = new Map<string, { count: number; time: number }>();

function rateLimit(ip: string, limit = 5, windowMs = 60_000) {
    const now = Date.now();
    const entry = requestCounts.get(ip) || { count: 0, time: now };

    if (now - entry.time > windowMs) {
        // Reset after window
        requestCounts.set(ip, { count: 1, time: now });
        return true;
    }

    if (entry.count >= limit) return false;

    entry.count += 1;
    requestCounts.set(ip, entry);
    return true;
}

// ✅ Basic HTML sanitization to prevent injection
function sanitize(input: string) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // ✅ Rate limiting check
    if (!rateLimit(ip)) {
        return jsonResponse({ error: "Too many requests. Please try again later." }, 429);
    }

    try {
        const body = await request.json();
        const { name, email, subject, message } = contactSchema.parse(body);

        // ✅ Send email with JSX template
        await resend.emails.send({
            from: "Website Contact Form <contact@puremelt.in>",
            to: "soniienterprises372@gmail.com",
            replyTo: email,
            subject: `${subject || "Website Contact Form Submission"} - From ${name} <${email}>`,
            html: `
                 <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", lineHeight: "1.4" }}>
                    <p><strong>Name:</strong> ${sanitize(name)}</p>
                    <p><strong>Email:</strong> ${sanitize(email)}</p>
                    <p><strong>Message:</strong></p>
                    <div style={{ padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
                        ${sanitize(message)}
                </div>
                </div>
            `,
        });

        logEvent("contact_form_submitted", { ip, name, email });
        return jsonResponse({ success: true }, 200);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return jsonResponse({ error: err.errors }, 400);
        }

        console.error("Email send error:", err);
        return jsonResponse({ error: "Failed to send email" }, 502);
    }
}

// ✅ JSON response helper
function jsonResponse(data: any, status: number) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}

// ✅ Simple logger (can be replaced with external logging service)
function logEvent(event: string, data: any) {
    console.log(`[${new Date().toISOString()}] ${event}:`, data);
}
