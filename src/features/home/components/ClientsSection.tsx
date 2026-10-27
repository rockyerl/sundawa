'use client'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { INITIAL_VISIBLE_CLIENTS } from '../clients'
import type { PortfolioProject } from '@/lib/types'
import ClientProjectDialog from './ClientProjectDialog'
import ClientsStats from './ClientsStats'
import ClientsGrid from './ClientsGrid'

export default function ClientsSection() {
    const t = useTranslations('clients')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [active, setActive] = useState<number | null>(null)
    const [selected, setSelected] = useState<number | null>(null)
    const [expanded, setExpanded] = useState(false)
    const [projects, setProjects] = useState<PortfolioProject[]>([])

    const stats = t.raw('stats') as { num: string; label: string }[]

    // Fetch portfolio data from Supabase
    const loadProjects = useCallback(async () => {
        try {
            const res = await fetch('/api/blog/portfolio?page=1&per_page=50')
            if (!res.ok) {
                console.error('Portfolio API returned status:', res.status)
                return
            }
            const text = await res.text()
            if (!text) {
                console.error('Portfolio API returned empty response')
                return
            }
            const result = JSON.parse(text)
            if (result.data && Array.isArray(result.data)) {
                setProjects(result.data)
            }
        } catch (err) {
            console.error('Failed to fetch portfolio for clients section:', err)
        }
    }, [])

    useEffect(() => {
        // Schedule fetch asynchronously to avoid synchronous setState in effect
        Promise.resolve().then(() => loadProjects())
    }, [loadProjects])

    // Poll for portfolio changes every 30 seconds to keep homepage in sync
    const loadProjectsRef = useRef(loadProjects)
    useEffect(() => {
        loadProjectsRef.current = loadProjects
    }, [loadProjects])
    useEffect(() => {
        const interval = setInterval(() => {
            loadProjectsRef.current()
        }, 30000)
        return () => clearInterval(interval)
    }, [])

    const visibleClients = expanded ? projects : projects.slice(0, INITIAL_VISIBLE_CLIENTS)
    const hasMore = projects.length > INITIAL_VISIBLE_CLIENTS

    const selectedClient = selected !== null ? projects[selected] : null

    // 4 kolom detail, selalu tampil untuk setiap proyek
    const detailSections = selectedClient
        ? [
            { key: 'challenge', label: t('detailLabels.challenge'), text: selectedClient.challenge },
            { key: 'architecture', label: t('detailLabels.architecture'), text: selectedClient.architecture },
            { key: 'role', label: t('detailLabels.role'), text: selectedClient.role },
            { key: 'impact', label: t('detailLabels.impact'), text: selectedClient.impact },
        ]
        : []

    // Tutup popup dengan Escape + kunci scroll body saat popup terbuka
    useEffect(() => {
        if (selected === null) return
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
        window.addEventListener('keydown', onKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = prevOverflow
        }
    }, [selected])

    return (
        <section id="clients" ref={ref} style={{ position: 'relative' }}>
            <div className="container-main">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#DBC977' }}>— {t('label')}</span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </motion.div>

                <div className="clients-layout">
                    {/* Left */}
                    <div className="clients-left">
                        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                                   style={{ fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F8F8F8', lineHeight: 1.1, marginBottom: '1rem' }}>
                            {t('heading1')}<br /><span className="gold-gradient">{t('heading2')}</span>
                        </motion.h2>

                        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                                  style={{ color: 'rgba(248,248,248,0.4)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.85rem', marginBottom: '2rem' }}>
                            {t('sub')}
                        </motion.p>

                        <ClientsStats stats={stats} confidentialNotice={t('confidentialNotice')} inView={inView} />
                    </div>

                    {/* Right */}
                    <ClientsGrid
                        clients={visibleClients}
                        inView={inView}
                        activeIndex={active}
                        expanded={expanded}
                        hasMore={hasMore}
                        showLessLabel={t('showLess')}
                        showAllLabel={t('showAll', { count: projects.length })}
                        viewProjectLabel={t('viewProject')}
                        confidentialLabel={t('confidential')}
                        onHover={setActive}
                        onSelect={setSelected}
                        onToggleExpanded={() => setExpanded(value => !value)}
                    />
                </div>
            </div>

            {/* Detail Popup */}
            <AnimatePresence>
                {selectedClient && (
                    <ClientProjectDialog
                        client={selectedClient}
                        details={detailSections}
                        confidentialLabel={t('confidential')}
                        closeLabel={t('close')}
                        onClose={() => setSelected(null)}
                    />
                )}
            </AnimatePresence>

            <style>{`
                .clients-layout { display: flex; flex-direction: column; gap: 3rem; align-items: flex-start; }
                .clients-left { width: 100%; }
                .clients-right { width: 100%; }
                @media (min-width: 1024px) { .clients-layout { display: grid !important; grid-template-columns: 260px 1fr !important; gap: 5rem !important; align-items: start !important; } }
                @media (max-width: 640px) { .clients-grid { grid-template-columns: 1fr !important; } }
            `}</style>
        </section>
    )
}