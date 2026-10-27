import { Skeleton } from '@/src/shared/ui'

export default function BlogLoading() {
    return (
        <div className="container-main py-16 md:py-20">
            <div className="flex items-center gap-4 mb-10">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-px flex-1" />
            </div>
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-96 mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ))}
            </div>
        </div>
    )
}
