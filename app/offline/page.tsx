import Link from 'next/link'

export const metadata = {
    title: 'Offline - Sundawa Teknologi',
    robots: { index: false, follow: false },
}

export default function OfflinePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-navy text-cream px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#00F0FF] to-[#1E3A8A] flex items-center justify-center">
                        <span className="text-4xl font-black text-navy">S</span>
                    </div>
                    <h1 className="text-3xl font-black text-cream mb-4">You&apos;re Offline</h1>
                    <p className="text-lg text-cream/60 mb-8">
                        Sepertinya koneksi internetmu terputus. Halaman ini tidak dapat dimuat saat offline.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-[#00F0FF] to-[#1E3A8A] rounded-md text-navy text-sm font-extrabold tracking-[0.1em] uppercase no-underline hover:opacity-85 transition-opacity"
                    >
                        Coba Lagi
                    </Link>
                </div>
            </div>
        </div>
    )
}
