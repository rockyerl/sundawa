import { createHmac, timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPublicEnvironment } from './env'

export const ADMIN_COOKIE_NAME = 'admin_auth'

export function createAdminSessionToken(secret: string): string {
    return createHmac('sha256', secret).update('sundawa-admin-session-v1').digest('hex')
}

export function verifyAdminSessionToken(token: string | undefined, secret: string | undefined): boolean {
    if (!token || !secret) return false
    const expected = createAdminSessionToken(secret)
    const tokenBuf = Buffer.from(token)
    const expectedBuf = Buffer.from(expected)
    if (tokenBuf.length !== expectedBuf.length) return false
    return timingSafeEqual(tokenBuf, expectedBuf)
}

export function isAdminRequest(request: NextRequest): boolean {
    const { adminPassword } = getPublicEnvironment()
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
    return verifyAdminSessionToken(token, adminPassword)
}

export function requireAdminAuth(request: NextRequest): NextResponse | null {
    if (!isAdminRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return null
}
