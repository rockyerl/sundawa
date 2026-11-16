import { NextRequest, NextResponse } from 'next/server'
import {
    ADMIN_COOKIE_NAME,
    createAdminSessionToken,
    isAdminRequest,
} from '@/lib/adminAuth'
import { getPublicEnvironment } from '@/lib/env'

export async function POST(request: NextRequest) {
    const { adminPassword } = getPublicEnvironment()

    if (!adminPassword) {
        return NextResponse.json({ error: 'Admin not configured' }, { status: 503 })
    }

    const body = await request.json()
    const { password } = body

    if (typeof password === 'string' && password === adminPassword) {
        const response = NextResponse.json({ success: true })
        response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(adminPassword), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        })
        return response
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}

export async function GET(request: NextRequest) {
    if (isAdminRequest(request)) {
        return NextResponse.json({ authenticated: true })
    }
    return NextResponse.json({ authenticated: false }, { status: 401 })
}

export async function DELETE() {
    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_COOKIE_NAME, '', { path: '/', maxAge: 0 })
    response.cookies.set(ADMIN_COOKIE_NAME, '', { path: '/admin', maxAge: 0 })
    return response
}
