import ParticleField from '@/components/ParticleFieldClient'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import AboutSection from '@/components/AboutSection'
import ValuesSection from '@/components/ValuesSection'
import ServicesSection from '@/components/ServicesSection'
import TechSection from '@/components/TechSection'
import ClientsSection from '@/components/ClientsSection'
import ObjectionsSection from '@/components/ObjectionsSection'
import FinalCtaSection from '@/components/FinalCtaSection'
import ContactSection from '@/components/ContactSection'
import BlogSection from '@/components/Blogsection'

export default function Home() {
    return (
        <main className="relative noise-bg">
            <ParticleField />
            <div className="relative z-10">
                <Navbar />
                <HeroSection />
                <div className="section-line" />
                <ProblemSection />
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
                <div className="section-line" />
                <ObjectionsSection />
                <div className="section-line" />
                <BlogSection />
                <div className="section-line" />
                <FinalCtaSection />
                <ContactSection />
            </div>
        </main>
    )
}