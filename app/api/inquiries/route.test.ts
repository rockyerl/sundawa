import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET, POST } from './route'

const mockInquiries = [
    {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Arief Setiawan',
        email: 'arief@example.com',
        company: 'PT Maju Bersama',
        topic: 'Integrasi Sistem & API',
        message: 'Kami ingin menjadwalkan Diskusi Integrasi ERP 30 Menit.',
        source_url: '/id/services/integrasi-sistem',
        status: 'new',
        created_at: new Date().toISOString(),
    },
]

vi.mock('@/lib/supabase', () => ({
    supabase: {
        from: vi.fn(() => ({
            insert: vi.fn().mockResolvedValue({ error: null }),
            select: vi.fn(() => ({
                order: vi.fn().mockResolvedValue({ data: mockInquiries, error: null }),
            })),
        })),
    },
}))

vi.mock('@/lib/adminAuth', () => ({
    requireAdminAuth: vi.fn((req: NextRequest) => {
        const authHeader = req.headers.get('authorization')
        if (authHeader === 'Bearer mock-valid-token') return null
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }),
}))

describe('POST /api/inquiries', () => {
    it('returns 400 when required fields are missing', async () => {
        const req = new Request('http://localhost:3000/api/inquiries', {
            method: 'POST',
            body: JSON.stringify({ name: 'Arief' }),
            headers: { 'Content-Type': 'application/json' },
        })

        const res = await POST(req)
        expect(res.status).toBe(400)
        const json = await res.json()
        expect(json.error).toBe('Name, email, and message are required')
    })

    it('returns 400 when email format is invalid', async () => {
        const req = new Request('http://localhost:3000/api/inquiries', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Arief',
                email: 'not-an-email',
                message: 'Halo, saya mau diskusi integrasi ERP.',
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        const res = await POST(req)
        expect(res.status).toBe(400)
        const json = await res.json()
        expect(json.error).toBe('Invalid email address')
    })

    it('silently ignores spam submission when honeypot field is filled', async () => {
        const req = new Request('http://localhost:3000/api/inquiries', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Spam Bot',
                email: 'bot@spam.com',
                message: 'Buy our fake crypto service now.',
                hp: 'im-a-bot-filled-honeypot',
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        const res = await POST(req)
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json.success).toBe(true)
        expect(json.message).toBe('Inquiry received successfully')
    })

    it('returns 200 with success: true and inquiry object when payload is valid', async () => {
        const req = new Request('http://localhost:3000/api/inquiries', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Arief Setiawan',
                email: 'arief@example.com',
                company: 'PT Maju Bersama',
                topic: 'Otomatisasi & Integrasi Data',
                message: 'Kami ingin menjadwalkan Diskusi Integrasi ERP 30 Menit.',
                sourceUrl: '/id/services/integrasi-sistem',
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        const res = await POST(req)
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json.success).toBe(true)
        expect(json.message).toBe('Inquiry received successfully')
        expect(json.inquiry.name).toBe('Arief Setiawan')
        expect(json.inquiry.topic).toBe('Otomatisasi & Integrasi Data')
    })

    it('normalizes email casing and accepts optional marketingConsent flag cleanly', async () => {
        const req = new Request('http://localhost:3000/api/inquiries', {
            method: 'POST',
            body: JSON.stringify({
                name: '  Budi Santoso  ',
                email: '  Budi.Santoso@Enterprise.CO.ID  ',
                company: 'PT Industri Nusantara',
                topic: 'System Health Assessment',
                message: 'Hasil diagnostik 54/100.',
                marketingConsent: true,
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        const res = await POST(req)
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json.success).toBe(true)
        expect(json.inquiry.name).toBe('Budi Santoso')
        expect(json.inquiry.email).toBe('budi.santoso@enterprise.co.id')
    })
})

describe('GET /api/inquiries', () => {
    it('returns 401 when request is unauthorized', async () => {
        const req = new NextRequest('http://localhost:3000/api/inquiries', {
            headers: { 'Content-Type': 'application/json' },
        })

        const res = await GET(req)
        expect(res.status).toBe(401)
    })

    it('returns 200 and data when admin authorized', async () => {
        const req = new NextRequest('http://localhost:3000/api/inquiries', {
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer mock-valid-token',
            },
        })

        const res = await GET(req)
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json.data).toHaveLength(1)
        expect(json.data[0].name).toBe('Arief Setiawan')
    })
})
