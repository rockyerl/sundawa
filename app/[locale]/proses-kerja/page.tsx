import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import ProcessSection from '@/components/ProcessSection'
import { pageMetadata } from '@/lib/Seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    return pageMetadata(locale, 'process', '/proses-kerja')
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)
    return <ProcessSection />
}