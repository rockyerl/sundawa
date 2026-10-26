export default function LocaleLoading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0E1E30] px-6 text-center text-[#F8F8F8]">
            <div aria-label="Loading" className="flex items-center gap-3" role="status">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#DBC977]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#DBC977] [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#DBC977] [animation-delay:300ms]" />
            </div>
        </main>
    )
}
