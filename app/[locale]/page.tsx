import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/lib/Seo'
import {
    AboutSection,
    BlogSection,
    FeaturedProjectsSection,
    FinalCtaSection,
    HeroSection,
    ParticleField,
    ProblemSection,
    ServicesSection,
    ValuesSection,
} from '@/src/features/home'
import { ProductsSection } from '@/src/features/products'

// Defer non-critical JavaScript for below-the-fold sections to optimize mobile LCP & TBT
const TechSection = dynamic(() => import('@/src/features/home/components/TechSection'))
const ClientsSection = dynamic(() => import('@/src/features/home/components/ClientsSection'))
const ObjectionsSection = dynamic(() => import('@/src/features/home/components/ObjectionsSection'))
const ContactSection = dynamic(() => import('@/src/features/home/components/ContactSection'))

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'home', '')
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <main className="relative noise-bg">
            <ParticleField />
            <div className="relative z-10">
                <HeroSection />
                <FeaturedProjectsSection />
                <div className="section-line" />
                <ProblemSection />
                <div className="section-line" />
                <ServicesSection />
                <ProductsSection />
                <div className="section-line" />
                <AboutSection />
                <ValuesSection />
                <div className="section-line" />
                <TechSection />
                <ClientsSection />
                <div className="section-line" />
                <ObjectionsSection />
                <BlogSection />
                <div className="section-line" />
                <FinalCtaSection />
                <ContactSection />
            </div>
        </main>
    )
}
