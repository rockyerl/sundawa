'use client'

interface SkeletonProps {
    className?: string
}

export default function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse rounded bg-gold/10 ${className}`}
            role="status"
            aria-label="Loading"
        />
    )
}
