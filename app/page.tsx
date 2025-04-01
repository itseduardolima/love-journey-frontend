"use client"
import Header from "@/components/layout/header"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import PlansSection from "@/components/sections/plans-section"
import ExamplesSection from "@/components/sections/examples-section"
import FAQSection from "@/components/sections/faq-section"
import CTASection from "@/components/sections/cta-section"
import Footer from "@/components/layout/footer"
import HowItWorksSection from "@/components/sections/how-it-works-section"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-secondary-dark text-gray-100">
      <Header />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <PlansSection />
      <ExamplesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default HomePage