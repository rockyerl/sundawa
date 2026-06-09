"use client";

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ValuesSection from '@/components/ValuesSection'
import ServicesSection from '@/components/ServicesSection'
import TechSection from '@/components/TechSection'
import ClientsSection from '@/components/ClientsSection'
import ContactSection from '@/components/ContactSection'

const ParticleField = dynamic(() => import('@/components/ParticleField'), { ssr: false })

export default function Home() {
    return (
        <main className="relative noise-bg">
            <ParticleField />
            <div className="relative z-10">
                <Navbar />
                <HeroSection />
                <div className="section-line" />
                <AboutSection />
                <div className="section-line" />
                <ValuesSection />
                <div className="section-line" />
                <ServicesSection />
                <div className="section-line" />
                <TechSection />
                <div className="section-line" />
                <ClientsSection />
                <ContactSection />
            </div>
        </main>
    )
}