'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
    id: string
    title: string
    slug: string
    published_at: string | null
    created_at: string
}

export default function AdminDashboard() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let ignored = false

        async function load() {
            try {
                const res = await fetch('/api/blog/posts')
                if (res.ok) {
                    const data = await res.json()
                    if (!ignored) setPosts(data)
                }
            } catch (err) {
                console.error('Failed to fetch posts:', err)
            } finally {
                if (!ignored) setLoading(false)
            }
        }

        load()

        return () => {
            ignored = true
        }
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return
        try {
            const res = await fetch(`/api/blog/posts?id=${id}`, { method: 'DELETE' })
            if (res.ok) {
                const refreshRes = await fetch('/api/blog/posts')
                if (refreshRes.ok) {
                    setPosts(await refreshRes.json())
                }
            }
        } catch (err) {
            console.error('Failed to delete post:', err)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#F8F8F8]">Blog Posts</h2>
                <Link
                    href="/admin/posts/new"
                    className="px-4 py-2 rounded-lg font-bold text-sm"
                    style={{ background: '#DBC977', color: '#0E1E30' }}
                >
                    + New Post
                </Link>
            </div>

            {loading ? (
                <div className="text-[#F8F8F8]/50">Loading...</div>
            ) : posts.length === 0 ? (
                <div className="text-[#F8F8F8]/50">No posts yet. Create your first post!</div>
            ) : (
                <div className="space-y-3">
                    {posts.map(post => (
                        <div
                            key={post.id}
                            className="flex items-center justify-between p-4 rounded-xl"
                            style={{ background: 'rgba(248,248,248,0.03)', border: '1px solid rgba(219,201,119,0.12)' }}
                        >
                            <div className="min-w-0">
                                <h3 className="text-[#F8F8F8] font-semibold truncate">{post.title}</h3>
                                <p className="text-sm text-[#F8F8F8]/50">
                                    /blog/{post.slug}
                                    {post.published_at ? ` · ${new Date(post.published_at).toLocaleDateString('id-ID')}` : ' · Draft'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <Link
                                    href={`/admin/posts/${post.id}/edit`}
                                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#DBC977] border border-[#DBC977]/30 hover:border-[#DBC977] transition-colors"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 border border-red-400/30 hover:border-red-400 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
