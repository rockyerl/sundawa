import { NextRequest, NextResponse } from 'next/server'
import { getPublicEnvironment } from '@/lib/env'

export async function POST(request: NextRequest) {
    const { adminPassword } = getPublicEnvironment()

    if (!adminPassword) {
        return NextResponse.json({ error: 'Admin not configured' }, { status: 503 })
    }

    const body = await request.json()
    const { password } = body

    if (password === adminPassword) {
        const response = NextResponse.json({ success: true })
        response.cookies.set('admin_auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/admin',
        })
        return response
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}

export async function GET(request: NextRequest) {
    const cookie = request.cookies.get('admin_auth')
    if (cookie?.value === 'true') {
        return NextResponse.json({ authenticated: true })
    }
    return NextResponse.json({ authenticated: false }, { status: 401 })
}

export async function DELETE() {
    const response = NextResponse.json({ success: true })
    response.cookies.delete('admin_auth')
    return response
}
