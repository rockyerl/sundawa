'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Phone, Globe, ArrowUpRight, MapPin } from 'lucide-react'

const contacts = [
    { icon: Phone, label: 'Phone', value: '0878 9335 5332', href: 'tel:087893355332', desc: 'Mon–Fri, 9am–6pm WIB' },
    { icon: Mail, label: 'Email', value: 'sundawateknologi@gmail.com', href: 'mailto:sundawateknologi@gmail.com', desc: 'Respon dalam 24 jam' },
    { icon: Globe, label: 'Website', value: 'sundawateknologi.com', href: 'https://www.sundawateknologi.com', desc: 'Portfolio & services' },
]

export default function ContactSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="contact" ref={ref} className="relative py-32 overflow-hidden">

            {/* Decorative background grid lines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(219,201,119,0.04) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(219,201,119,0.04) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Large decorative circle top-right */}
            <div
                className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(0,86,170,0.12) 0%, transparent 70%)',
                    border: '1px solid rgba(219,201,119,0.06)',
                }}
            />

            {/* Small circle bottom-left */}
            <div
                className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(219,201,119,0.06) 0%, transparent 70%)',
                }}
            />

            <div className="container-main relative z-10">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    className="flex items-center gap-4 mb-20"
                >
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#DBC977]">
                        {'— Contact'}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#DBC977]/40 to-transparent" />
                </motion.div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* LEFT: CTA Text */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="relative">
                                <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#DBC977]/60 mb-4 block">
                                    Ready to start?
                                </span>

                                <div style={{ lineHeight: 1.1 }}>
                                    <span
                                        className="block font-black"
                                        style={{
                                            fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                                            color: '#F8F8F8',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        {'LET\'S'}
                                    </span>

                                    <span
                                        className="block font-black"
                                        style={{
                                            fontSize: 'clamp(3rem, 6vw, 5rem)',
                                            color: '#DBC977',
                                            letterSpacing: '-0.03em',
                                            textShadow: '0 0 60px rgba(219,201,119,0.25)',
                                        }}
                                    >
                                        WORK
                                    </span>

                                    <span
                                        className="block font-black"
                                        style={{
                                            fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                                            color: '#F8F8F8',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        TOGETHER
                                    </span>
                                </div>

                                {/* Divider accent */}
                                <div className="flex items-center gap-3 mt-5">
                                    <div className="w-12 h-[2px] bg-[#DBC977]" />
                                    <div className="w-1.5 h-1.5 bg-[#DBC977] rotate-45" />
                                    <div className="flex-1 h-px bg-gradient-to-r from-[#DBC977]/20 to-transparent" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.25 }}
                            className="mt-8"
                        >
                            <p className="text-[#F8F8F8]/50 font-light text-sm leading-relaxed mb-8 max-w-xs">
                                Siap mengembangkan bisnis Anda dengan solusi teknologi terbaik? Tim kami siap membantu Anda setiap langkah.
                            </p>

                            <a
                                href="mailto:sundawateknologi@gmail.com"
                                className="inline-flex items-center gap-4 group"
                                style={{
                                    padding: '16px 36px',
                                    background: '#DBC977',
                                    color: '#0E1E30',
                                    fontWeight: 900,
                                    fontSize: '13px',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase' as const,
                                    transition: 'background 0.25s, color 0.25s, box-shadow 0.25s',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                }}
                                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.background = '#F8F8F8'
                                    e.currentTarget.style.boxShadow = '0 0 40px rgba(219,201,119,0.35)'
                                }}
                                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.background = '#DBC977'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                <span>Hubungi Kami</span>
                                <ArrowUpRight
                                    size={18}
                                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                />
                            </a>
                        </motion.div>
                    </div>

                    {/* RIGHT: Contact cards */}
                    <div className="flex flex-col gap-4">
                        {contacts.map((c, i) => (
                            <motion.a
                                key={c.label}
                                href={c.href}
                                target={c.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.12 }}
                                className="group relative flex items-center gap-6 p-6 transition-all duration-500 hover:-translate-y-0.5"
                                style={{
                                    background: 'rgba(29,52,81,0.35)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(219,201,119,0.12)',
                                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                                    textDecoration: 'none',
                                }}
                            >
                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(219,201,119,0.06) 0%, transparent 60%)',
                                    }}
                                />

                                {/* Icon */}
                                <div className="relative flex-shrink-0">
                                    <div
                                        className="w-14 h-14 flex items-center justify-center text-[#DBC977] transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            background: 'rgba(219,201,119,0.08)',
                                            border: '1px solid rgba(219,201,119,0.25)',
                                            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                                        }}
                                    >
                                        <c.icon size={18} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#F8F8F8]/30 mb-1">
                                        {c.label}
                                    </div>
                                    <div className="text-sm font-semibold text-[#F8F8F8]/75 group-hover:text-[#DBC977] transition-colors duration-300 truncate">
                                        {c.value}
                                    </div>
                                    <div className="text-[11px] text-[#F8F8F8]/25 mt-0.5">
                                        {c.desc}
                                    </div>
                                </div>

                                {/* Arrow */}
                                <ArrowUpRight
                                    size={14}
                                    className="flex-shrink-0 text-[#DBC977]/0 group-hover:text-[#DBC977]/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />

                                {/* Bottom border accent */}
                                <div
                                    className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: 'linear-gradient(90deg, transparent, rgba(219,201,119,0.4), transparent)' }}
                                />
                            </motion.a>
                        ))}

                        {/* Location tag */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-2 mt-2 pl-2"
                        >
                            <MapPin size={11} className="text-[#DBC977]/40" />
                            <span className="text-[11px] text-[#F8F8F8]/20 tracking-widest uppercase">
                                Bandung, Jawa Barat, Indonesia
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom horizontal line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="mt-24 h-px origin-left"
                    style={{ background: 'linear-gradient(90deg, rgba(219,201,119,0.3), rgba(219,201,119,0.05), transparent)' }}
                />
            </div>
        </section>
    )
}