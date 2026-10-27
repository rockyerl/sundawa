'use client'

import { useEffect } from 'react'

type GlobalErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html lang="id" suppressHydrationWarning>
            <body className="bg-[#0E1E30] text-[#F8F8F8]">
                <div className="flex min-h-screen items-center justify-center px-6 text-center">
                    <div className="max-w-md">
                        <h1 className="text-3xl font-black">Something went wrong</h1>
                        <p className="mt-4 text-sm leading-7 text-[#F8F8F8]/60">Please try again to continue.</p>
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="mt-8 border border-[#DBC977]/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#DBC977]"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}
