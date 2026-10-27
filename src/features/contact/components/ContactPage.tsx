"use client"

import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import SubpageNav from '@/src/shared/ui/SubpageNav'

export default function ContactPage() {
    const t = useTranslations('contactPage')
    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        const waMessage = `Halo Sundawa Teknologi,%0A%0ASaya ${encodeURIComponent(formData.name)} (${encodeURIComponent(formData.email)})${formData.company ? ` dari ${encodeURIComponent(formData.company)}` : ''}.%0A%0A${encodeURIComponent(formData.message)}`
        const waUrl = `https://wa.me/6287893355332?text=${waMessage}`

        setTimeout(() => {
            window.open(waUrl, '_blank')
            setStatus('success')
            setFormData({ name: '', email: '', company: '', message: '' })
        }, 500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const contactInfo = [
        { icon: Mail, label: t('emailLabel'), value: 'sundawateknologi@gmail.com', href: 'mailto:sundawateknologi@gmail.com' },
        { icon: Phone, label: t('phoneLabel'), value: '+62 878-9335-5332', href: 'https://wa.me/6287893355332' },
        { icon: MapPin, label: t('addressLabel'), value: t('addressValue'), href: '#' },
    ]

    return (
        <>
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} backHref="/" />
            <section className="py-16 md:py-20">
                <div className="container-main">
                    <div className="mb-12">
                        <p className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-gold mb-4">
                            {t('eyebrow')}
                        </p>
                        <h1 className="font-black text-[clamp(2rem,3.5vw,2.8rem)] text-cream leading-tight mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-cream/60 max-w-[600px] leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <div>
                            <form onSubmit={handleSubmit} className="grid gap-6">
                                <div>
                                    <label htmlFor="contact-name" className="block text-xs font-bold tracking-[0.1em] uppercase text-cream/55 mb-2">
                                        {t('name')}
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t('namePlaceholder')}
                                        className="w-full p-3 bg-gold/[0.03] border border-gold/15 rounded-md text-cream text-base outline-none focus:border-gold/40 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-email" className="block text-xs font-bold tracking-[0.1em] uppercase text-cream/55 mb-2">
                                        {t('email')}
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t('emailPlaceholder')}
                                        className="w-full p-3 bg-gold/[0.03] border border-gold/15 rounded-md text-cream text-base outline-none focus:border-gold/40 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-company" className="block text-xs font-bold tracking-[0.1em] uppercase text-cream/55 mb-2">
                                        {t('company')}
                                    </label>
                                    <input
                                        id="contact-company"
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder={t('companyPlaceholder')}
                                        className="w-full p-3 bg-gold/[0.03] border border-gold/15 rounded-md text-cream text-base outline-none focus:border-gold/40 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-xs font-bold tracking-[0.1em] uppercase text-cream/55 mb-2">
                                        {t('message')}
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t('messagePlaceholder')}
                                        rows={5}
                                        className="w-full p-3 bg-gold/[0.03] border border-gold/15 rounded-md text-cream text-base outline-none resize-vertical font-sans focus:border-gold/40 transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-br from-[#00F0FF] to-[#1E3A8A] border-none rounded-md text-[#0A192F] text-sm font-extrabold tracking-[0.1em] uppercase transition-opacity ${status === 'submitting' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                                >
                                    <Send size={16} />
                                    {status === 'submitting' ? t('submitting') : t('submit')}
                                </button>

                                {status === 'success' && (
                                    <p className="p-4 bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded-md text-[#00F0FF] text-sm">
                                        {t('success')}
                                    </p>
                                )}

                                {status === 'error' && (
                                    <p className="p-4 bg-red-500/5 border border-red-500/20 rounded-md text-[#FF6B6B] text-sm">
                                        {t('error')}
                                    </p>
                                )}
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <div className="grid gap-6 mb-8">
                                {contactInfo.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="flex items-start gap-4 p-5 bg-gold/[0.03] border border-gold/10 rounded-lg no-underline hover:border-gold/30 hover:bg-gold/[0.06] transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gold/8 flex items-center justify-center flex-shrink-0">
                                            <item.icon size={18} color="#DBC977" />
                                        </div>
                                        <div>
                                            <p className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-cream/40 mb-1">
                                                {item.label}
                                            </p>
                                            <p className="text-[0.95rem] text-cream leading-snug">
                                                {item.value}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="p-6 bg-gold/[0.03] border border-gold/10 rounded-lg">
                                <p className="text-sm text-cream/50 mb-3">
                                    {t('whatsapp')}
                                </p>
                                <a
                                    href="https://wa.me/6287893355332"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-md text-[#25D366] text-xs font-bold no-underline tracking-[0.05em]"
                                >
                                    <Send size={14} />
                                    Chat via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
