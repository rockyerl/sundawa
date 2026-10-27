'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import TipTapEditor from '../components/TipTapEditor'
import { showToast, refreshData } from '../components/Toast'

interface PostFormProps {
    post?: {
        id: string
        title: string
        slug: string
        body_html: string
        excerpt?: string
        main_image_url?: string
        published_at?: string
    }
}

export default function PostForm({ post }: PostFormProps) {
    const router = useRouter()
    const isEdit = !!post

    const [title, setTitle] = useState(post?.title || '')
    const [slug, setSlug] = useState(post?.slug || '')
    const [excerpt, setExcerpt] = useState(post?.excerpt || '')
    const [bodyHtml, setBodyHtml] = useState(post?.body_html || '')
    const [imageUrl, setImageUrl] = useState(post?.main_image_url || '')
    const [published, setPublished] = useState(!!post?.published_at)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !slug || !bodyHtml) {
            setError('Title, slug, and body are required')
            return
        }

        setLoading(true)
        setError('')

        try {
            const url = isEdit ? `/api/blog/posts?id=${post.id}` : '/api/blog/posts'
            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    slug,
                    excerpt,
                    body_html: bodyHtml,
                    main_image_url: imageUrl || null,
                    published_at: published ? new Date().toISOString() : null,
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                showToast(data.error || 'Failed to save post', 'error')
                setLoading(false)
                return
            }

            showToast(isEdit ? 'Post updated successfully' : 'Post created successfully')
            refreshData('blog')
            setTimeout(() => router.push('/admin'), 800)
        } catch (err) {
            showToast(err instanceof Error ? err.message : 'Failed to save post', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/blog/upload', {
                method: 'POST',
                body: formData,
            })
            if (res.ok) {
                const data = await res.json()
                setImageUrl(data.url)
                showToast('Image uploaded successfully')
            } else {
                showToast('Failed to upload image', 'error')
            }
        } catch (err) {
            console.error('Failed to upload image:', err)
            showToast('Failed to upload image', 'error')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-[#F8F8F8]">
                {isEdit ? 'Edit Post' : 'New Post'}
            </h2>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div>
                <label className="block text-sm font-medium text-[#F8F8F8]/70 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[#0A192F] text-[#F8F8F8] border border-[#DBC977]/20 focus:border-[#DBC977] outline-none"
                    placeholder="Post title"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#F8F8F8]/70 mb-1">Slug</label>
                <input
                    type="text"
                    value={slug}
                    onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="w-full px-4 py-2 rounded-lg bg-[#0A192F] text-[#F8F8F8] border border-[#DBC977]/20 focus:border-[#DBC977] outline-none"
                    placeholder="post-url-slug"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#F8F8F8]/70 mb-1">Excerpt</label>
                <textarea
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg bg-[#0A192F] text-[#F8F8F8] border border-[#DBC977]/20 focus:border-[#DBC977] outline-none resize-none"
                    placeholder="Short summary"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#F8F8F8]/70 mb-1">
                    Cover Image
                </label>
                {imageUrl ? (
                    <div className="relative inline-block">
                        <div className="relative w-64 h-40 rounded-lg overflow-hidden border border-[#DBC977]/20">
                            <Image
                                src={imageUrl}
                                alt="Cover preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setImageUrl('')}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                            title="Remove image"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-64 h-40 rounded-lg border-2 border-dashed border-[#DBC977]/20 cursor-pointer hover:border-[#DBC977]/40 transition-colors">
                        <span className="text-sm text-[#F8F8F8]/50">Click to upload cover image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-[#F8F8F8]/70 mb-1">
                    Body Content
                </label>
                <TipTapEditor value={bodyHtml} onChange={setBodyHtml} />
            </div>

            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={e => setPublished(e.target.checked)}
                    className="rounded border-[#DBC977]/20 bg-[#0A192F] text-[#DBC977] focus:ring-[#DBC977]"
                />
                <label htmlFor="published" className="text-sm text-[#F8F8F8]/70">
                    Publish now
                </label>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-lg font-bold text-sm disabled:opacity-50"
                    style={{ background: '#DBC977', color: '#0E1E30' }}
                >
                    {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/admin')}
                    className="px-6 py-2 rounded-lg font-bold text-sm text-[#F8F8F8]/50 hover:text-[#F8F8F8] transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
