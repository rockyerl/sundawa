import Image from 'next/image'
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/src/i18n/navigation'
import { COMPANY_CONTACT } from '@/lib/contact'

const FOOTER_PRODUCTS = [
    { slug: 'sewaka', label: 'Sewaka' },
    { slug: 'laku-pandai', label: 'LAKUPANDAI' },
    { slug: 'vellumia', label: 'Vellumia' },
    { slug: 'si-geomedik', label: 'SI-GEOMEDIK' },
    { slug: 'nawasanga', label: 'Nawasanga' },
    { slug: 'abo-rentcar', label: 'Abo Rent Car' },
    { slug: 'sundawa-people', label: 'SUNDAWA People' },
] as const

export default async function Footer() {
    const t = await getTranslations('footer')
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative z-10 border-t border-gold/15 bg-[#081320]">
            <div className="container-main py-14 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
                    {/* Corporate Identity Column */}
                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3 no-underline"
                        >
                            <div className="relative h-9 w-9">
                                <Image
                                    src="/assets/logo2.png"
                                    alt="Sundawa Teknologi"
                                    fill
                                    className="object-contain p-0.5"
                                    sizes="36px"
                                />
                            </div>
                            <div>
                                <div className="text-sm leading-none font-black tracking-[0.25em] text-cream transition-colors group-hover:text-gold">
                                    SUNDAWA
                                </div>
                                <div className="-mt-0.5 text-[9px] font-light tracking-[0.4em] text-gold/55 uppercase">
                                    Teknologi
                                </div>
                            </div>
                        </Link>

                        <p className="mt-4 text-xs font-extrabold tracking-[0.16em] text-gold uppercase">
                            {t('legalName')}
                        </p>
                        <p className="mt-1 text-xs italic text-gold/85">
                            &ldquo;{t('motto')}&rdquo;
                        </p>
                        <p className="mt-4 max-w-md text-xs leading-relaxed font-light text-cream/80">
                            {t('summary')}
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-xs text-cream/75">
                            <MapPin size={13} className="flex-shrink-0 text-gold/80" aria-hidden="true" />
                            <span>{t('location')}</span>
                        </div>
                    </div>

                    {/* Solutions Column */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-4 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                            {t('columns.solutions')}
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-xs">
                            <li>
                                <Link href="/services" className="text-cream/80 no-underline transition-colors hover:text-gold">
                                    {t('links.services')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/proses-kerja" className="text-cream/80 no-underline transition-colors hover:text-gold">
                                    {t('links.process')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/outsource" className="text-cream/80 no-underline transition-colors hover:text-gold">
                                    {t('links.outsource')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="text-cream/80 no-underline transition-colors hover:text-gold">
                                    {t('links.portfolio')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Ecosystem Products Column */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-4 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                            {t('columns.products')}
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-xs">
                            <li>
                                <Link href="/products" className="font-semibold text-cream/90 no-underline transition-colors hover:text-gold">
                                    {t('links.allProducts')}
                                </Link>
                            </li>
                            {FOOTER_PRODUCTS.map((product) => (
                                <li key={product.slug}>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="text-cream/75 no-underline transition-colors hover:text-gold"
                                    >
                                        {product.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company & Direct Official Contact */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-4 text-[0.65rem] font-black tracking-[0.2em] text-gold uppercase">
                            {t('columns.company')}
                        </h3>
                        <ul className="mb-5 flex flex-col gap-2.5 text-xs">
                            <li>
                                <Link href="/about" className="text-cream/80 no-underline transition-colors hover:text-gold">
                                    {t('links.about')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-cream/80 no-underline transition-colors hover:text-gold">
                                    {t('links.blog')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-cream/80 no-underline transition-colors hover:text-gold">
                                    {t('links.contact')}
                                </Link>
                            </li>
                        </ul>

                        <div className="flex flex-col gap-2 border-t border-cream/10 pt-4 text-xs">
                            <a
                                href={COMPANY_CONTACT.emailHref}
                                className="inline-flex items-center gap-2 text-cream/85 no-underline transition-colors hover:text-gold"
                            >
                                <Mail size={13} className="text-gold/85" aria-hidden="true" />
                                <span>{COMPANY_CONTACT.email}</span>
                            </a>
                            <a
                                href={COMPANY_CONTACT.telHref}
                                className="inline-flex items-center gap-2 text-cream/85 no-underline transition-colors hover:text-gold"
                            >
                                <Phone size={13} className="text-gold/85" aria-hidden="true" />
                                <span>{COMPANY_CONTACT.phoneDisplay}</span>
                            </a>
                            <a
                                href={COMPANY_CONTACT.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-cream/75 no-underline transition-colors hover:text-gold"
                            >
                                <span>LinkedIn</span>
                                <ArrowUpRight size={12} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Legal Bottom Strip */}
                <div className="mt-12 flex flex-col justify-between gap-3 border-t border-gold/10 pt-6 text-[0.68rem] text-cream/70 sm:flex-row sm:items-center">
                    <p className="m-0">{t('copyright', { year: currentYear })}</p>
                    <p className="m-0 tracking-[0.08em] text-gold/85 uppercase">{t('assurances')}</p>
                </div>
            </div>
        </footer>
    )
}
