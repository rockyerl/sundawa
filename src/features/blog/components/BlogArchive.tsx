import type { Post } from '@/lib/types'
import { SubpageNav } from '@/src/shared/ui'
import BlogCard from './BlogCard'

interface BlogArchiveProps {
    posts: Post[]
    translations: {
        navBack: string
        navTitle: string
        eyebrow: string
        title: string
        subtitle: string
        empty: string
        readMore: string
    }
}

export default function BlogArchive({ posts, translations }: BlogArchiveProps) {
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

                {!posts.length ? (
                    <div
                        className="flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                        style={{ background: 'rgba(248,248,248,0.03)', border: '1px dashed rgba(219,201,119,0.2)' }}
                    >
                        <p className="text-sm text-[#F8F8F8]/50">{translations.empty}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {posts.map((post) => (
                            <BlogCard
                                key={post._id}
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
