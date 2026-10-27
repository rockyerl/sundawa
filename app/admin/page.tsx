'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { showToast, refreshData, onDataRefresh } from './components/Toast'

interface Post {
    id: string
    title: string
    slug: string
    published_at: string | null
    created_at: string
}

interface PortfolioProject {
    id: string
    num: string
    name: string
    type: string
    desc: string
    confidential: boolean
    slug: string
}

export default function AdminDashboard() {
    const [tab, setTab] = useState<'blog' | 'portfolio'>('blog')
    const [posts, setPosts] = useState<Post[]>([])
    const [projects, setProjects] = useState<PortfolioProject[]>([])
    const [loading, setLoading] = useState(true)

    const loadAll = useCallback(async () => {
        try {
            const [postsRes, projectsRes] = await Promise.all([
                fetch('/api/blog/posts'),
                fetch('/api/blog/portfolio?page=1&per_page=50')
            ])
            if (postsRes.ok) {
                const data = await postsRes.json()
                setPosts(data)
            }
            if (projectsRes.ok) {
                const result = await projectsRes.json()
                setProjects(result.data)
            }
        } catch (err) {
            console.error('Failed to fetch data:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        // Schedule fetch asynchronously to avoid synchronous setState in effect
        Promise.resolve().then(() => loadAll())
    }, [loadAll])

    // Listen for data refresh events from other admin pages (e.g., after create/edit)
    useEffect(() => {
        return onDataRefresh(() => {
            loadAll()
        })
    }, [loadAll])

    const handleDeletePost = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return
        try {
            console.log('[AdminDashboard] Deleting post:', id)
            const res = await fetch(`/api/blog/posts?id=${id}`, { method: 'DELETE' })
            const result = await res.json()
            console.log('[AdminDashboard] Delete post response:', res.status, result)

            if (res.ok) {
                showToast('Post deleted successfully')
                setPosts(prev => prev.filter(p => p.id !== id))
                refreshData('blog')
            } else {
                showToast(result.error || 'Failed to delete post', 'error')
            }
        } catch (err) {
            console.error('[AdminDashboard] Failed to delete post:', err)
            showToast('Failed to delete post', 'error')
        }
    }

    const handleDeleteProject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return
        try {
            console.log('[AdminDashboard] Deleting project:', id)
            const res = await fetch(`/api/blog/portfolio?id=${id}`, { method: 'DELETE' })
            const result = await res.json()
            console.log('[AdminDashboard] Delete project response:', res.status, result)

            if (res.ok) {
                showToast('Project deleted successfully')
                setProjects(prev => prev.filter(p => p.id !== id))
                refreshData('portfolio')
            } else {
                showToast(result.error || 'Failed to delete project', 'error')
            }
        } catch (err) {
            console.error('[AdminDashboard] Failed to delete project:', err)
            showToast('Failed to delete project', 'error')
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-[#F8F8F8]">Admin Dashboard</h1>
                <Link
                    href="/"
                    className="text-sm text-[#F8F8F8]/50 hover:text-[#F8F8F8] transition-colors"
                >
                    ← Back to Home
                </Link>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8 border-b border-[#DBC977]/10">
                <button
                    onClick={() => setTab('blog')}
                    className={`px-4 py-2 text-sm font-bold transition-colors border-b-2 ${
                        tab === 'blog'
                            ? 'text-[#DBC977] border-[#DBC977]'
                            : 'text-[#F8F8F8]/50 border-transparent hover:text-[#F8F8F8]/70'
                    }`}
                >
                    Blog Posts
                </button>
                <button
                    onClick={() => setTab('portfolio')}
                    className={`px-4 py-2 text-sm font-bold transition-colors border-b-2 ${
                        tab === 'portfolio'
                            ? 'text-[#DBC977] border-[#DBC977]'
                            : 'text-[#F8F8F8]/50 border-transparent hover:text-[#F8F8F8]/70'
                    }`}
                >
                    Portfolio
                </button>
            </div>

            {tab === 'blog' ? (
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-[#F8F8F8]">Blog Posts</h2>
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
                                            onClick={() => handleDeletePost(post.id)}
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
            ) : (
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-[#F8F8F8]">Portfolio Projects</h2>
                        <Link
                            href="/admin/portfolio/new"
                            className="px-4 py-2 rounded-lg font-bold text-sm"
                            style={{ background: '#DBC977', color: '#0E1E30' }}
                        >
                            + New Project
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-[#F8F8F8]/50">Loading...</div>
                    ) : projects.length === 0 ? (
                        <div className="text-[#F8F8F8]/50">No portfolio projects yet. Create your first project!</div>
                    ) : (
                        <div className="space-y-3">
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    className="flex items-center justify-between p-4 rounded-xl"
                                    style={{ background: 'rgba(248,248,248,0.03)', border: '1px solid rgba(219,201,119,0.12)' }}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-[#DBC977]">{project.num}</span>
                                            <h3 className="text-[#F8F8F8] font-semibold truncate">{project.name}</h3>
                                            {project.confidential && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-400/20 text-red-300 font-bold">CONFIDENTIAL</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-[#F8F8F8]/50 truncate">
                                            {project.type} — /portfolio/{project.slug}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Link
                                            href={`/admin/portfolio/${project.id}/edit`}
                                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#DBC977] border border-[#DBC977]/30 hover:border-[#DBC977] transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
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
            )}
        </div>
    )
}
