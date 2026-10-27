import { Skeleton } from '@/src/shared/ui'

export default function PortfolioLoading() {
    return (
        <div className="container-main py-16 md:py-20">
            <div className="flex items-center gap-4 mb-10">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-px flex-1" />
            </div>
            <Skeleton className="h-8 w-72 mb-4" />
            <Skeleton className="h-4 w-80 mb-12" />
            <div className="grid grid-cols-2 gap-[1px] bg-gold/10 border border-gold/10">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-navy">
                        <Skeleton className="h-34 w-full rounded-none" />
                        <div className="p-4 space-y-2">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
