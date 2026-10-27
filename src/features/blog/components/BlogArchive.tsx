'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import type { Post } from '@/lib/types'
import { SubpageNav } from '@/src/shared/ui'
import BlogCard from './BlogCard'

interface BlogArchiveProps {
    posts: Post[]
    initialQuery: string
    translations: {
        navBack: string
        navTitle: string
        eyebrow: string
        title: string
        subtitle: string
        empty: string
        readMore: string
        searchPlaceholder: string
        searchNoResults: string
        searchResultsCount: string
    }
}

export default function BlogArchive({ posts, initialQuery, translations }: BlogArchiveProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(initialQuery)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    // Debounced URL update on query change
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams)
            if (query.trim()) {
                params.set('q', query.trim())
            } else {
                params.delete('q')
            }
            router.replace(`${pathname}?${params.toString()}`, { scroll: false })
        }, 300)
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [query, pathname, router, searchParams])

    const effectiveQuery = query.trim()
    const isSearching = effectiveQuery.length > 0

    const filteredPosts = useMemo(() => {
        if (!effectiveQuery) return posts
        const q = effectiveQuery.toLowerCase()
        return posts.filter((post) => {
            const titleMatch = post.title.toLowerCase().includes(q)
            const excerptMatch = post.excerpt?.toLowerCase().includes(q) ?? false
            // Strip HTML tags for body search
            const bodyText = post.body_html.replace(/<[^>]*>/g, '').toLowerCase()
            const bodyMatch = bodyText.includes(q)
            return titleMatch || excerptMatch || bodyMatch
        })
    }, [posts, effectiveQuery])

    return (
        <main className="relative min-h-screen pb-16 md:pb-24" style={{ background: '#0E1E30' }}>
            <SubpageNav
                backLabel={translations.navBack}
                titleLabel={translations.navTitle}
                backHref="/"
            />
            <div className="container-main pt-10 md:pt-14">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10 md:mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#DBC977]/40" />
                        <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#DBC977]/60">
                            {translations.eyebrow}
                        </span>
                        <div className="h-px w-8 bg-[#DBC977]/40" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#F8F8F8] break-words">
                        {translations.title}
                    </h1>
                    <p className="mt-4 max-w-xl text-sm md:text-base text-[#F8F8F8]/60">
                        {translations.subtitle}
                    </p>
                </div>

                {/* Search Input */}
                <div className="max-w-xl mx-auto mb-8 md:mb-10">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={translations.searchPlaceholder}
                            className="w-full rounded-xl px-5 py-3.5 text-sm text-[#F8F8F8] outline-none transition-colors focus:ring-2 focus:ring-[#DBC977]/60"
                            style={{
                                background: 'rgba(248,248,248,0.05)',
                                border: '1px solid rgba(219,201,119,0.2)',
                            }}
                        />
                        {query.trim() && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8F8F8]/40 hover:text-[#F8F8F8]/80 transition-colors text-lg leading-none"
                                aria-label="Clear search"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    {isSearching && (
                        <p className="mt-3 text-xs text-[#F8F8F8]/40 text-center">
                            {filteredPosts.length > 0
                                ? translations.searchResultsCount
                                    .replace('{{count}}', String(filteredPosts.length))
                                    .replace('{{query}}', query.trim())
                                : ''}
                        </p>
                    )}
                </div>

                {!filteredPosts.length ? (
                    <div
                        className="flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                        style={{ background: 'rgba(248,248,248,0.03)', border: '1px dashed rgba(219,201,119,0.2)' }}
                    >
                        <p className="text-sm text-[#F8F8F8]/50">
                            {isSearching
                                ? translations.searchNoResults.replace('{{query}}', query.trim())
                                : translations.empty}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {filteredPosts.map((post) => (
                            <BlogCard
                                key={post.id}
                                post={post}
                                readMoreLabel={translations.readMore}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
