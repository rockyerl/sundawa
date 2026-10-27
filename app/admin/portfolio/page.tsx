'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { showToast, refreshData, onDataRefresh } from '../components/Toast'

interface Project {
    id: string
    num: string
    name: string
    slug: string
    type: string
    desc: string
    confidential: boolean
}

interface Pagination {
    page: number
    per_page: number
    total: number
    total_pages: number
}

export default function PortfolioDashboard() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<Pagination>({ page: 1, per_page: 10, total: 0, total_pages: 1 })
    const [currentPage, setCurrentPage] = useState(1)
    const mountedRef = useRef(true)
    const currentPageRef = useRef(currentPage)

    // Keep ref in sync with state
    useEffect(() => {
        currentPageRef.current = currentPage
    }, [currentPage])

    const loadProjects = useCallback(async (page: number) => {
        if (!mountedRef.current) return
        setLoading(true)
        try {
            const res = await fetch(`/api/blog/portfolio?page=${page}&per_page=10`)
            if (res.ok) {
                const result = await res.json()
                if (mountedRef.current) {
                    setProjects(result.data)
                    setPagination(result.pagination)
                }
            }
        } catch (err) {
            console.error('Failed to fetch portfolio:', err)
        } finally {
            if (mountedRef.current) setLoading(false)
        }
    }, [])

    useEffect(() => {
        mountedRef.current = true
        // Schedule fetch asynchronously to avoid synchronous setState in effect
        Promise.resolve().then(() => loadProjects(currentPage))
        return () => {
            mountedRef.current = false
        }
    }, [currentPage, loadProjects])

    // Listen for data refresh events from create/edit pages
    useEffect(() => {
        return onDataRefresh((resource) => {
            if (resource === 'portfolio') {
                loadProjects(currentPageRef.current)
            }
        })
    }, [loadProjects])

    const fetchProjects = (page: number) => {
        setCurrentPage(page)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return
        try {
            console.log('[PortfolioDashboard] Deleting project:', id)
            const res = await fetch(`/api/blog/portfolio?id=${id}`, { method: 'DELETE' })
            const result = await res.json()
            console.log('[PortfolioDashboard] Delete response:', res.status, result)

            if (res.ok) {
                showToast('Project deleted successfully')
                // Immediately remove from local state for instant UI feedback
                setProjects(prev => prev.filter(p => p.id !== id))
                // Reload from server to get fresh pagination
                const pageToReload = (projects.length === 1 && currentPageRef.current > 1)
                    ? currentPageRef.current - 1
                    : currentPageRef.current
                if (pageToReload !== currentPageRef.current) {
                    setCurrentPage(pageToReload)
                } else {
                    await loadProjects(pageToReload)
                }
                refreshData('portfolio')
            } else {
                showToast(result.error || 'Failed to delete project', 'error')
            }
        } catch (err) {
            console.error('[PortfolioDashboard] Failed to delete:', err)
            showToast('Failed to delete project', 'error')
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="text-[#F8F8F8]/50 hover:text-[#F8F8F8] transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold text-[#F8F8F8]">Portfolio Projects</h1>
                </div>
                <Link
                    href="/admin/portfolio/new"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                    style={{
                        background: 'linear-gradient(135deg, #DBC977, #F59E0B)',
                        color: '#0A192F',
                    }}
                >
                    <Plus size={16} />
                    New Project
                </Link>
            </div>

            {loading ? (
                <p className="text-[#F8F8F8]/50">Loading...</p>
            ) : projects.length === 0 ? (
                <div className="text-center py-16 rounded-2xl" style={{ background: 'rgba(248,248,248,0.03)', border: '1px dashed rgba(219,201,119,0.2)' }}>
                    <p className="text-sm text-[#F8F8F8]/50">No portfolio projects yet. Create your first project.</p>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between p-4 rounded-xl"
                                style={{ background: 'rgba(248,248,248,0.03)', border: '1px solid rgba(219,201,119,0.12)' }}
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-[#DBC977]">{project.num}</span>
                                        <h3 className="font-bold text-[#F8F8F8] truncate">{project.name}</h3>
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
                                        onClick={() => handleDelete(project.id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 border border-red-400/30 hover:border-red-400 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.total_pages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: '1px solid rgba(219,201,119,0.12)' }}>
                            <p className="text-sm text-[#F8F8F8]/50">
                                Showing {(pagination.page - 1) * pagination.per_page + 1}–{Math.min(pagination.page * pagination.per_page, pagination.total)} of {pagination.total} projects
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => fetchProjects(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg text-[#F8F8F8]/50 hover:text-[#F8F8F8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => fetchProjects(page)}
                                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${
                                            page === currentPage
                                                ? 'bg-[#DBC977] text-[#0E1E30]'
                                                : 'text-[#F8F8F8]/50 hover:text-[#F8F8F8] hover:bg-[#F8F8F8]/5'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => fetchProjects(currentPage + 1)}
                                    disabled={currentPage === pagination.total_pages}
                                    className="p-2 rounded-lg text-[#F8F8F8]/50 hover:text-[#F8F8F8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Next page"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
