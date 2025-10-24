"use client"

import Navigation from "@/components/shared/Navigation"
import Footer from "@/components/shared/Footer"
import GetStartedSection from "@/components/home/GetStartedSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import HomeSection from "@/components/home/HomeSection"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />

      <HomeSection />

      <FeaturesSection />

      <GetStartedSection />

      <Footer />
    </div>
  )
}