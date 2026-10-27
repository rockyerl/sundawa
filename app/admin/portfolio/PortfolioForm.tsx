'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { showToast, refreshData } from '../components/Toast'

interface PortfolioFormProps {
    project?: {
        id: string
        name: string
        slug: string
        num: string
        initials: string
        type: string
        desc: string
        confidential: boolean
        challenge: string
        architecture: string
        role: string
        impact: string
        main_image_url?: string
    }
}

export default function PortfolioForm({ project }: PortfolioFormProps) {
    const router = useRouter()
    const isEdit = !!project

    const [name, setName] = useState(project?.name || '')
    const [slug, setSlug] = useState(project?.slug || '')
    const [num, setNum] = useState(project?.num || '')
    const [initials, setInitials] = useState(project?.initials || '')

    // Auto-generate num for new projects
    useEffect(() => {
        if (isEdit) return
        async function loadNextNum() {
            try {
                const res = await fetch('/api/blog/portfolio')
                if (res.ok) {
                    const projects = await res.json()
                    const nextNum = String(projects.length + 1).padStart(2, '0')
                    if (!num) setNum(nextNum)
                }
            } catch {
                // Silently fail, user can still type manually
            }
        }
        loadNextNum()
    }, [isEdit, num])
    const [type, setType] = useState(project?.type || '')
    const [desc, setDesc] = useState(project?.desc || '')
    const [confidential, setConfidential] = useState(project?.confidential || false)
    const [challenge, setChallenge] = useState(project?.challenge || '')
    const [architecture, setArchitecture] = useState(project?.architecture || '')
    const [role, setRole] = useState(project?.role || '')
    const [impact, setImpact] = useState(project?.impact || '')
    const [mainImageUrl, setMainImageUrl] = useState(project?.main_image_url || '')
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    // Auto-generate slug from name
    const handleNameForSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setName(val)
        if (!project && !slug) {
            setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error')
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size must be under 5MB', 'error')
            return
        }
        setUploading(true)
        setError('')
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('/api/blog/upload', { method: 'POST', body: formData })
            if (!res.ok) throw new Error('Upload failed')
            const data = await res.json()
            setMainImageUrl(data.url)
            showToast('Image uploaded successfully')
        } catch (err) {
            showToast(err instanceof Error ? err.message : 'Upload failed', 'error')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !slug || !type || !desc || !challenge || !architecture || !role || !impact) {
            setError('All fields are required')
            return
        }

        setLoading(true)
        setError('')

        try {
            const url = isEdit ? `/api/blog/portfolio?id=${project.id}` : '/api/blog/portfolio'
            const res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    slug,
                    num,
                    initials: initials || name.slice(0, 2).toUpperCase(),
                    type,
                    desc,
                    confidential,
                    challenge,
                    architecture,
                    role,
                    impact,
                    main_image_url: mainImageUrl || null,
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                if (res.status === 404) {
                    showToast('Project no longer exists', 'error')
                    setTimeout(() => router.push('/admin/portfolio'), 800)
                    return
                }
                if (res.status === 409) {
                    showToast(data.error || 'Slug already exists', 'error')
                    setLoading(false)
                    return
                }
                showToast(data.error || 'Failed to save project', 'error')
                console.error('[PortfolioForm] API error:', res.status, data)
                setLoading(false)
                return
            }

            console.log('[PortfolioForm] Project saved successfully, redirecting...')
            showToast(isEdit ? 'Project updated successfully' : 'Project created successfully')
            refreshData('portfolio')
            setTimeout(() => router.push('/admin/portfolio'), 800)
        } catch (err) {
            showToast(err instanceof Error ? err.message : 'Failed to save project', 'error')
        } finally {
            setLoading(false)
        }
    }

    const inputClass = 'w-full px-4 py-2 rounded-lg bg-[#0A192F] text-[#F8F8F8] border border-[#DBC977]/20 focus:border-[#DBC977] outline-none'
    const labelClass = 'block text-sm font-medium text-[#F8F8F8]/70 mb-1'

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-[#F8F8F8]">
                {isEdit ? 'Edit Project' : 'New Project'}
            </h2>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div>
                <label className={labelClass}>Project Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameForSlug}
                    className={inputClass}
                    placeholder="e.g. E-Commerce Platform"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className={labelClass}>Slug</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className={inputClass}
                        placeholder="e-commerce-platform"
                    />
                </div>
                <div>
                    <label className={labelClass}>Number</label>
                    <input
                        type="text"
                        value={num}
                        onChange={e => setNum(e.target.value)}
                        className={inputClass}
                        placeholder="01"
                    />
                </div>
                <div>
                    <label className={labelClass}>Initials</label>
                    <input
                        type="text"
                        value={initials}
                        onChange={e => setInitials(e.target.value.toUpperCase().slice(0, 3))}
                        className={inputClass}
                        placeholder="EP"
                    />
                </div>
            </div>

            <div>
                <label className={labelClass}>Project Type</label>
                <input
                    type="text"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Web Application"
                />
            </div>

            <div>
                <label className={labelClass}>Description</label>
                <textarea
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    className={`${inputClass} min-h-[80px]`}
                    placeholder="Short description of the project..."
                />
            </div>

            <div>
                <label className={labelClass}>Cover Image</label>
                {mainImageUrl ? (
                    <div className="relative h-48 overflow-hidden rounded-xl border border-[#DBC977]/20">
                        <Image
                            src={mainImageUrl}
                            alt="Cover preview"
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                        <button
                            type="button"
                            onClick={() => setMainImageUrl('')}
                            className="absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-[#DBC977]/20 hover:border-[#DBC977]/50 cursor-pointer transition-colors">
                        {uploading ? (
                            <span className="text-sm text-[#F8F8F8]/50">Uploading...</span>
                        ) : (
                            <>
                                <svg className="w-8 h-8 text-[#F8F8F8]/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-[#F8F8F8]/50">Click to upload cover image</span>
                                <span className="text-xs text-[#F8F8F8]/30 mt-1">PNG, JPG up to 5MB</span>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                    </label>
                )}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="confidential"
                    checked={confidential}
                    onChange={e => setConfidential(e.target.checked)}
                    className="rounded bg-[#0A192F] border-[#DBC977]/20 text-[#DBC977] focus:ring-[#DBC977]"
                />
                <label htmlFor="confidential" className="text-sm text-[#F8F8F8]/70">
                    Confidential Project
                </label>
            </div>

            <div className="border-t border-[#DBC977]/10 pt-6">
                <h3 className="text-lg font-bold text-[#DBC977] mb-4">Project Details</h3>

                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Challenge</label>
                        <textarea
                            value={challenge}
                            onChange={e => setChallenge(e.target.value)}
                            className={`${inputClass} min-h-[100px]`}
                            placeholder="What was the main challenge..."
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Architecture</label>
                        <textarea
                            value={architecture}
                            onChange={e => setArchitecture(e.target.value)}
                            className={`${inputClass} min-h-[100px]`}
                            placeholder="Technical architecture and stack..."
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Our Role</label>
                        <textarea
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className={`${inputClass} min-h-[100px]`}
                            placeholder="What Sundawa did..."
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Impact</label>
                        <textarea
                            value={impact}
                            onChange={e => setImpact(e.target.value)}
                            className={`${inputClass} min-h-[100px]`}
                            placeholder="Results and impact..."
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-lg font-bold text-sm transition-colors"
                    style={{
                        background: 'linear-gradient(135deg, #DBC977, #F59E0B)',
                        color: '#0A192F',
                    }}
                >
                    {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/admin/portfolio')}
                    className="px-6 py-2.5 rounded-lg font-bold text-sm text-[#F8F8F8]/70 border border-[#DBC977]/20 hover:border-[#DBC977]/40 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
