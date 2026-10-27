import { Link } from '@/src/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { BlogCard, getPosts } from '@/src/features/blog'

export default async function BlogSection() {
    const t = await getTranslations('blog')
    const posts = await getPosts()

    // Cuma tampilin 3 post terbaru di landing page
    const latestPosts = posts.slice(0, 3)

    return (
        <section id="blog" className="relative py-16 md:py-28">
            <div className="container-main">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10 md:mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#DBC977]/40" />
                        <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#DBC977]/60">
                            {t('eyebrow')}
                        </span>
                        <div className="h-px w-8 bg-[#DBC977]/40" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#F8F8F8]">
                        {t('title')}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm md:text-base text-[#F8F8F8]/60">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Grid Blog Cards / Empty State */}
                {!latestPosts.length ? (
                    <div
                        className="flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                        style={{
                            background: 'rgba(248,248,248,0.03)',
                            border: '1px dashed rgba(219,201,119,0.2)',
                        }}
                    >
                        <p className="text-sm text-[#F8F8F8]/50">
                            {t('empty')}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {latestPosts.map((post) => (
                            <BlogCard
                                key={post._id}
                                post={post}
                                readMoreLabel={t('readMore')}
                            />
                        ))}
                    </div>
                )}

                {/* CTA lihat semua blog — cuma muncul kalau ada post */}
                {latestPosts.length > 0 && (
                    <div className="flex justify-center mt-12">
                        <Link
                            href="/blog"
                            className="px-8 py-3 rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                            style={{
                                border: '1px solid rgba(219,201,119,0.3)',
                                color: '#DBC977',
                            }}
                        >
                            {t('viewAll')}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
