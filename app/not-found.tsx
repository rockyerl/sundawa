import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0E1E30] px-6 text-center text-[#F8F8F8]">
            <div className="max-w-md">
                <p className="text-6xl font-black text-[#DBC977]">404</p>
                <h1 className="mt-4 text-3xl font-black">Page not found</h1>
                <p className="mt-4 text-sm leading-7 text-[#F8F8F8]/60">The page you requested does not exist.</p>
                <Link
                    href="/"
                    className="mt-8 inline-flex border border-[#DBC977]/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#DBC977]"
                >
                    Back home
                </Link>
            </div>
        </main>
    )
}
