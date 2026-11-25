import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/adminAuth'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, company, topic, message, sourceUrl, hp, marketingConsent } = body
        const hasMarketingConsent = Boolean(marketingConsent)

        // Anti-spam honeypot verification
        if (hp) {
            return NextResponse.json({
                success: true,
                message: 'Inquiry received successfully',
            })
        }

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            )
        }

        // Email basic validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            )
        }

        const inquiryData = {
            name: String(name).trim(),
            email: String(email).trim().toLowerCase(),
            company: company ? String(company).trim() : null,
            topic: topic ? String(topic).trim() : 'Konsultasi Umum',
            message: String(message).trim(),
            source_url: sourceUrl ? String(sourceUrl).trim() : null,
            status: 'new',
            created_at: new Date().toISOString(),
        }

        console.log('[Inquiry Received]', inquiryData)

        // Store in Supabase inquiries table
        const { error } = await supabase.from('inquiries').insert([inquiryData])
        if (error) {
            console.warn('[Inquiry Supabase Warning] Could not insert into inquiries table:', error.message)
        }

        // Optional: Dispatch email via Resend if RESEND_API_KEY is configured
        if (process.env.RESEND_API_KEY) {
            try {
                await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: 'Sundawa Inquiries <inquiries@sundawa.net>',
                        to: [process.env.INQUIRY_NOTIFICATION_EMAIL || 'contact@sundawa.net'],
                        subject: `[Lead Baru] ${inquiryData.topic} - ${inquiryData.name}`,
                        text: `Ada inquiry baru dari website:\n\nNama: ${inquiryData.name}\nEmail: ${inquiryData.email}\nPerusahaan: ${inquiryData.company || '-'}\nTopik: ${inquiryData.topic}\nHalaman Asal: ${inquiryData.source_url || '-'}\nIzin Marketing Opt-In: ${hasMarketingConsent ? 'Ya' : 'Tidak'}\n\nPesan:\n${inquiryData.message}`,
                    }),
                })
            } catch (mailErr) {
                console.warn('[Inquiry Mail Warning] Could not dispatch email via Resend:', mailErr)
            }
        }

        // Optional: Dispatch webhook if INQUIRY_WEBHOOK_URL is configured
        if (process.env.INQUIRY_WEBHOOK_URL) {
            try {
                await fetch(process.env.INQUIRY_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `**[Lead Baru]** ${inquiryData.topic}\n**Nama:** ${inquiryData.name}\n**Email:** ${inquiryData.email}\n**Perusahaan:** ${inquiryData.company || '-'}\n**Source:** ${inquiryData.source_url || '-'}\n**Pesan:**\n${inquiryData.message}`,
                        inquiry: inquiryData,
                    }),
                })
            } catch (webhookErr) {
                console.warn('[Inquiry Webhook Warning] Could not dispatch to webhook:', webhookErr)
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Inquiry received successfully',
            inquiry: inquiryData,
        })
    } catch (err) {
        console.error('[Inquiry Error]', err)
        return NextResponse.json(
            { error: 'Internal server error processing inquiry' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    const unauthorized = requireAdminAuth(request)
    if (unauthorized) return unauthorized

    const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [] })
}
