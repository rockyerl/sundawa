'use client'

import { useState } from 'react'
import { ArrowUpRight, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { buildMailtoUrl, buildWhatsAppUrl, COMPANY_CONTACT } from '@/lib/contact'
import SubpageNav from '@/src/shared/ui/SubpageNav'

export default function ContactPage() {
    const t = useTranslations('contactPage')
    const topics = t.raw('topics') as string[]

    const [selectedTopic, setSelectedTopic] = useState<string>(topics[0] ?? '')
    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const buildBriefText = () => {
        const lines = [
            `Halo ${COMPANY_CONTACT.shortName},`,
            selectedTopic ? `Topik: ${selectedTopic}` : '',
            `Nama: ${formData.name}`,
            `Email: ${formData.email}`,
            formData.company ? `Perusahaan/Instansi: ${formData.company}` : '',
            '',
            formData.message,
        ].filter((line, index, arr) => line !== '' || (index > 0 && arr[index - 1] !== ''))
        return lines.join('\n')
    }

    const handleSubmitWhatsApp = (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        const waUrl = buildWhatsAppUrl(buildBriefText())
        setTimeout(() => {
            window.open(waUrl, '_blank', 'noopener,noreferrer')
            setStatus('success')
        }, 250)
    }

    const handleSendEmail = () => {
        const subject = selectedTopic
            ? `[${selectedTopic}] ${formData.company || formData.name || 'Konsultasi Sundawa'}`
            : 'Konsultasi Sundawa Teknologi'
        window.location.href = buildMailtoUrl(subject, buildBriefText())
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const contactInfo = [
        {
            icon: Mail,
            label: t('emailLabel'),
            value: COMPANY_CONTACT.email,
            desc: t('emailDesc'),
            href: COMPANY_CONTACT.emailHref,
        },
        {
            icon: Phone,
            label: t('phoneLabel'),
            value: COMPANY_CONTACT.phoneDisplay,
            desc: t('phoneDesc'),
            href: COMPANY_CONTACT.telHref,
        },
        {
            icon: ArrowUpRight,
            label: t('linkedinLabel'),
            value: t('linkedinDesc'),
            desc: 'linkedin.com/company/sundawa-teknologi-indonesia',
            href: COMPANY_CONTACT.linkedinUrl,
        },
        {
            icon: MapPin,
            label: t('addressLabel'),
            value: t('addressValue'),
            desc: COMPANY_CONTACT.name,
            href: undefined,
        },
    ]

    return (
        <>
            <SubpageNav backLabel={t('navBack')} titleLabel={t('navTitle')} backHref="/" />

            <section className="py-14 md:py-20">
                <div className="container-main">
                    <div className="mb-12">
                        <p className="mb-4 text-xs font-extrabold tracking-[0.24em] text-gold uppercase">
                            — {t('eyebrow')}
                        </p>
                        <h1 className="mb-4 text-[clamp(2rem,3.6vw,3rem)] leading-tight font-black text-cream">
                            {t('title')}
                        </h1>
                        <p className="max-w-2xl text-base leading-relaxed font-light text-cream/65">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        {/* Inquiry Brief Form */}
                        <div className="border border-gold/15 bg-gold/[0.02] p-6 sm:p-8 lg:col-span-7">
                            <form onSubmit={handleSubmitWhatsApp} className="grid gap-6">
                                {/* Topic Pills */}
                                <div>
                                    <div className="mb-2.5 text-xs font-bold tracking-[0.12em] text-cream/60 uppercase">
                                        {t('topicLabel')}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {topics.map((topic) => {
                                            const active = selectedTopic === topic
                                            return (
                                                <button
                                                    key={topic}
                                                    type="button"
                                                    onClick={() => setSelectedTopic(topic)}
                                                    aria-pressed={active}
                                                    className={`cursor-pointer border px-3.5 py-2 text-[0.7rem] font-bold transition-colors ${
                                                        active
                                                            ? 'border-gold bg-gold text-navy'
                                                            : 'border-gold/20 bg-navy text-cream/70 hover:border-gold/45 hover:text-cream'
                                                    }`}
                                                >
                                                    {topic}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="contact-name"
                                            className="mb-2 block text-xs font-bold tracking-[0.1em] text-cream/60 uppercase"
                                        >
                                            {t('name')}
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={t('namePlaceholder')}
                                            className="w-full border border-gold/15 bg-navy p-3 text-sm text-cream outline-none transition-colors focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-email"
                                            className="mb-2 block text-xs font-bold tracking-[0.1em] text-cream/60 uppercase"
                                        >
                                            {t('email')}
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t('emailPlaceholder')}
                                            className="w-full border border-gold/15 bg-navy p-3 text-sm text-cream outline-none transition-colors focus:border-gold"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact-company"
                                        className="mb-2 block text-xs font-bold tracking-[0.1em] text-cream/60 uppercase"
                                    >
                                        {t('company')}
                                    </label>
                                    <input
                                        id="contact-company"
                                        type="text"
                                        name="company"
                                        autoComplete="organization"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder={t('companyPlaceholder')}
                                        className="w-full border border-gold/15 bg-navy p-3 text-sm text-cream outline-none transition-colors focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact-message"
                                        className="mb-2 block text-xs font-bold tracking-[0.1em] text-cream/60 uppercase"
                                    >
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
                                        className="w-full resize-y border border-gold/15 bg-navy p-3 font-sans text-sm text-cream outline-none transition-colors focus:border-gold"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className={`inline-flex flex-1 cursor-pointer items-center justify-center gap-2 bg-gold px-6 py-3.5 text-xs font-black tracking-[0.16em] text-navy uppercase transition-shadow hover:shadow-[0_0_24px_rgba(219,201,119,0.4)] ${
                                            status === 'submitting' ? 'cursor-not-allowed opacity-60' : ''
                                        }`}
                                    >
                                        <Send size={14} aria-hidden="true" />
                                        <span>{status === 'submitting' ? t('submitting') : t('submit')}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSendEmail}
                                        className="inline-flex cursor-pointer items-center justify-center gap-2 border border-gold/35 bg-transparent px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-gold uppercase transition-colors hover:border-gold hover:bg-gold/10"
                                    >
                                        <Mail size={14} aria-hidden="true" />
                                        <span>{t('submitEmail')}</span>
                                    </button>
                                </div>

                                {status === 'success' && (
                                    <p className="border border-gold/30 bg-gold/10 p-4 text-xs leading-relaxed text-gold">
                                        {t('success')}
                                    </p>
                                )}

                                {status === 'error' && (
                                    <p className="border border-red-500/25 bg-red-500/5 p-4 text-xs text-red-400">
                                        {t('error')}
                                    </p>
                                )}
                            </form>
                        </div>

                        {/* Official Channels */}
                        <div className="flex flex-col gap-4 lg:col-span-5">
                            {contactInfo.map((item) => {
                                const cardContent = (
                                    <div className="flex items-start gap-4 border border-gold/15 bg-navy p-5 transition-colors duration-200 hover:border-gold/40 hover:bg-dark-slate/40">
                                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-gold/25 bg-gold/10 text-gold">
                                            <item.icon size={18} aria-hidden="true" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="mb-1 text-[0.65rem] font-extrabold tracking-[0.18em] text-gold/75 uppercase">
                                                {item.label}
                                            </p>
                                            <p className="break-words text-sm font-bold text-cream">
                                                {item.value}
                                            </p>
                                            <p className="mt-0.5 text-xs text-cream/45">{item.desc}</p>
                                        </div>
                                    </div>
                                )

                                return item.href ? (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="no-underline"
                                    >
                                        {cardContent}
                                    </a>
                                ) : (
                                    <div key={item.label}>{cardContent}</div>
                                )
                            })}

                            <div className="border border-gold/20 bg-dark-slate/30 p-6">
                                <p className="mb-3 text-xs leading-relaxed text-cream/65">
                                    {t('whatsapp')}
                                </p>
                                <a
                                    href={buildWhatsAppUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border border-[#25D366]/35 bg-[#25D366]/10 px-5 py-3 text-xs font-bold tracking-[0.06em] text-[#25D366] no-underline transition-colors hover:bg-[#25D366]/20"
                                >
                                    <Send size={14} aria-hidden="true" />
                                    <span>{t('whatsappButton')}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
