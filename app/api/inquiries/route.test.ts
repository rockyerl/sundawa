import { describe, expect, it, vi } from 'vitest'
import { POST } from './route'

vi.mock('@/lib/supabase', () => ({
    supabase: {
        from: vi.fn(() => ({
            insert: vi.fn().mockResolvedValue({ error: null }),
        })),
    },
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

    it('returns 200 with success: true when payload is valid', async () => {
        const req = new Request('http://localhost:3000/api/inquiries', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Arief Setiawan',
                email: 'arief@example.com',
                company: 'PT Maju Bersama',
                topic: 'Integrasi Sistem & API',
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
    })
})
