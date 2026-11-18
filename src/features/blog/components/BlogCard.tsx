import Image from 'next/image'
import { Link } from '@/src/i18n/navigation'
import { useLocale } from 'next-intl'
import type { Post } from '@/lib/types'
import { isPostTranslated } from '../pinnedPosts'

interface BlogCardProps {
    post: Post
    readMoreLabel: string
}

export default function BlogCard({ post, readMoreLabel }: BlogCardProps) {
    const locale = useLocale()
    const translated = isPostTranslated(post.slug)
    const isUntranslatedInEn = locale === 'en' && !translated

    return (
        <Link
            href={`/blog/${post.slug}`}
            {...(isUntranslatedInEn ? { locale: 'id' as const } : {})}
            className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 min-w-0"
            style={{ background: 'rgba(248,248,248,0.03)', border: '1px solid rgba(219,201,119,0.12)' }}
        >
            {post.main_image_url && (
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                        src={post.main_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QCMRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAADlAAIAAAASAAAMAAAVAAAAAABSAAAAMAAAEAAQAAAAAADaAAUAAAABAAAASgAAAAATkaQAAAABAAAAAAAAAAAAAQAgAAAMAAADAAEAAAAAAAEAAAAAAAEAAAAAAAB//9s="
                    />
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(14,30,48,0.8) 100%)' }}
                    />
                </div>
            )}

            <div className="flex flex-col flex-1 p-5 md:p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                    {post.published_at ? (
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#DBC977]/50">
                            {new Date(post.published_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    ) : <span />}
                    <span className="inline-flex items-center border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-extrabold tracking-[0.14em] text-gold uppercase">
                        {translated && locale === 'en' ? 'English' : 'Bahasa Indonesia'}
                    </span>
                </div>

                <h2 className="text-lg font-bold text-[#F8F8F8] leading-snug mb-3 break-words group-hover:text-[#DBC977] transition-colors duration-300">
                    {post.title}
                </h2>

                {post.excerpt && (
                    <p className="text-sm text-[#F8F8F8]/55 leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                    </p>
                )}

                <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#DBC977]">
                    {readMoreLabel}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
            </div>
        </Link>
    )
}
