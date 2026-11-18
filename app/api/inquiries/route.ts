import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, company, topic, message, sourceUrl } = body

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

        // Attempt storing in Supabase inquiries table
        const { error } = await supabase.from('inquiries').insert([inquiryData])
        if (error) {
            console.warn('[Inquiry Supabase Warning] Could not insert into inquiries table:', error.message)
            // We still return 200 so the prospect sees their confirmation; the inquiry is captured in server logs.
        }

        return NextResponse.json({
            success: true,
            message: 'Inquiry received successfully',
        })
    } catch (err) {
        console.error('[Inquiry Error]', err)
        return NextResponse.json(
            { error: 'Internal server error processing inquiry' },
            { status: 500 }
        )
    }
}
