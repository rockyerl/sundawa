'use client'

import { useEffect } from 'react'

type LocaleErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function LocaleError({ error, reset }: LocaleErrorProps) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0E1E30] px-6 text-center text-[#F8F8F8]">
            <div className="max-w-md">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#DBC977]">Sundawa Teknologi</p>
                <h1 className="text-3xl font-black">Something went wrong</h1>
                <p className="mt-4 text-sm leading-7 text-[#F8F8F8]/60">The page could not be loaded. Please try again.</p>
                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-8 border border-[#DBC977]/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#DBC977] transition-colors hover:bg-[#DBC977] hover:text-[#0E1E30]"
                >
                    Try again
                </button>
            </div>
        </main>
    )
}
