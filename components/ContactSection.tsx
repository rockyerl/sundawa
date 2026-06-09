'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Phone, ArrowUpRight, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

const LinkedInIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
)

const WhatsAppIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
)

const WA_NUMBER = '6287893355332'

type IconComponent = React.ComponentType<{ size?: number; strokeWidth?: number }>

export default function ContactSection() {
    const t = useTranslations('contact')
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const contacts: { icon: IconComponent; label: string; value: string; href: string; desc: string }[] = [
        { icon: Phone, label: 'Phone', value: '0878 9335 5332', href: 'tel:087893355332', desc: t('phoneDesc') },
        { icon: Mail, label: 'Email', value: 'sundawateknologi@gmail.com', href: 'mailto:sundawateknologi@gmail.com', desc: t('emailDesc') },
        { icon: LinkedInIcon, label: 'LinkedIn', value: 'Sundawa Teknologi Indonesia', href: 'https://www.linkedin.com/company/sundawa-teknologi-indonesia', desc: t('linkedinDesc') },
    ]

    return (
        <>
            <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(219,201,119,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(219,201,119,0.04) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,86,170,0.12) 0%, transparent 70%)', border: '1px solid rgba(219,201,119,0.06)' }} />
                <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(219,201,119,0.06) 0%, transparent 70%)' }} />

                <div className="container-main relative z-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="flex items-center gap-4 mb-20">
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#DBC977]">— {t('label')}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#DBC977]/40 to-transparent" />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* LEFT */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
                                <div className="relative">
                                    <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#DBC977]/60 mb-4 block">{t('readyToStart')}</span>
                                    <div style={{ lineHeight: 1.1 }}>
                                        <span className="block font-black" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', color: '#F8F8F8', letterSpacing: '-0.02em' }}>{t('line1')}</span>
                                        <span className="block font-black" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#DBC977', letterSpacing: '-0.03em', textShadow: '0 0 60px rgba(219,201,119,0.25)' }}>{t('line2')}</span>
                                        <span className="block font-black" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', color: '#F8F8F8', letterSpacing: '-0.02em' }}>{t('line3')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-5">
                                        <div className="w-12 h-[2px] bg-[#DBC977]" />
                                        <div className="w-1.5 h-1.5 bg-[#DBC977] rotate-45" />
                                        <div className="flex-1 h-px bg-gradient-to-r from-[#DBC977]/20 to-transparent" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }} className="mt-8">
                                <a href="mailto:sundawateknologi@gmail.com" className="inline-flex items-center gap-4 group"
                                   style={{ padding: '16px 36px', background: '#DBC977', color: '#0E1E30', fontWeight: 900, fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'background 0.25s, color 0.25s, box-shadow 0.25s', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                                   onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = '#F8F8F8'; e.currentTarget.style.boxShadow = '0 0 40px rgba(219,201,119,0.35)' }}
                                   onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = '#DBC977'; e.currentTarget.style.boxShadow = 'none' }}>
                                    <span>{t('label')}</span>
                                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                </a>
                            </motion.div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col gap-4">
                            {contacts.map((c, i) => (
                                <motion.a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                                          initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.12 }}
                                          className="group relative flex items-center gap-6 p-6 transition-all duration-500 hover:-translate-y-0.5"
                                          style={{ background: 'rgba(29,52,81,0.35)', backdropFilter: 'blur(16px)', border: '1px solid rgba(219,201,119,0.12)', clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))', textDecoration: 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(219,201,119,0.06) 0%, transparent 60%)' }} />
                                    <div className="relative flex-shrink-0">
                                        <div className="w-14 h-14 flex items-center justify-center text-[#DBC977] transition-all duration-300 group-hover:scale-110"
                                             style={{ background: 'rgba(219,201,119,0.08)', border: '1px solid rgba(219,201,119,0.25)', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                                            <c.icon size={18} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#F8F8F8]/30 mb-1">{c.label}</div>
                                        <div className="text-sm font-semibold text-[#F8F8F8]/75 group-hover:text-[#DBC977] transition-colors duration-300 truncate">{c.value}</div>
                                        <div className="text-[11px] text-[#F8F8F8]/25 mt-0.5">{c.desc}</div>
                                    </div>
                                    <ArrowUpRight size={14} className="flex-shrink-0 text-[#DBC977]/0 group-hover:text-[#DBC977]/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, rgba(219,201,119,0.4), transparent)' }} />
                                </motion.a>
                            ))}

                            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="flex items-center gap-2 mt-2 pl-2">
                                <MapPin size={11} className="text-[#DBC977]/40" />
                                <span className="text-[11px] text-[#F8F8F8]/20 tracking-widest uppercase">{t('location')}</span>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: 0.7, duration: 0.8 }} className="mt-24 h-px origin-left" style={{ background: 'linear-gradient(90deg, rgba(219,201,119,0.3), rgba(219,201,119,0.05), transparent)' }} />
                </div>
            </section>

            {/* Sticky WhatsApp Button */}
            <motion.a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t('waMessage'))}`} target="_blank" rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 0.4 }}
                      className="fixed bottom-8 right-8 z-50 group flex items-center gap-3" style={{ textDecoration: 'none' }}>
                <span className="hidden md:block text-[11px] font-bold tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: '#0E1E30', background: '#DBC977', padding: '6px 14px', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                    {t('waTooltip')}
                </span>
                <div className="relative w-14 h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                     style={{ background: '#25D366', clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))', boxShadow: '0 0 30px rgba(37,211,102,0.35)' }}>
                    <span className="absolute inset-0 animate-ping opacity-30" style={{ background: '#25D366', clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }} />
                    <span className="relative text-white"><WhatsAppIcon /></span>
                </div>
            </motion.a>
        </>
    )
}