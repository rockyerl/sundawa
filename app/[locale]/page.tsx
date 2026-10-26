import {
    AboutSection,
    BlogSection,
    ClientsSection,
    ContactSection,
    FinalCtaSection,
    HeroSection,
    Navbar,
    ObjectionsSection,
    ParticleField,
    ProblemSection,
    ServicesSection,
    TechSection,
    ValuesSection,
} from '@/src/features/home'

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