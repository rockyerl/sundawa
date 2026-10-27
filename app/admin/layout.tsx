'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/api/admin/auth')
            .then(res => {
                if (res.ok) return res.json()
                throw new Error('Not authenticated')
            })
            .then(data => {
                if (data.authenticated) {
                    setAuthenticated(true)
                }
            })
            .catch(() => {
                // Not authenticated
            })
            .finally(() => setLoading(false))
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })
            if (res.ok) {
                setAuthenticated(true)
            } else {
                const data = await res.json()
                setError(data.error || 'Login failed')
            }
        } catch {
            setError('Login failed')
        }
    }

    const handleLogout = async () => {
        await fetch('/api/admin/auth', { method: 'DELETE' })
        setAuthenticated(false)
        window.location.href = '/admin'
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: '#0E1E30' }}>
                <div className="text-[#F8F8F8]/50">Loading...</div>
            </div>
        )
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: '#0E1E30' }}>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#DBC977]/70 hover:text-[#DBC977] transition-colors"
                >
                    ← Back to Home
                </Link>
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-4 p-8 rounded-2xl w-full max-w-sm"
                    style={{ background: 'rgba(248,248,248,0.03)', border: '1px solid rgba(219,201,119,0.12)' }}
                >
                    <h1 className="text-xl font-bold text-[#F8F8F8]">Admin Login</h1>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        className="px-4 py-2 rounded-lg bg-[#0A192F] text-[#F8F8F8] border border-[#DBC977]/20 focus:border-[#DBC977] outline-none"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg font-bold text-sm"
                        style={{ background: '#DBC977', color: '#0E1E30' }}
                    >
                        Login
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{ background: '#0E1E30' }}>
            <header
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: 'rgba(219,201,119,0.12)' }}
            >
                <h1 className="text-lg font-bold text-[#F8F8F8]">Admin Panel</h1>
                <button
                    onClick={handleLogout}
                    className="text-xs font-bold tracking-wider uppercase text-[#DBC977]/70 hover:text-[#DBC977] transition-colors"
                >
                    Logout
                </button>
            </header>
            <main className="container-main max-w-5xl mx-auto px-4 py-8 min-w-0">
                {children}
            </main>
        </div>
    )
}
