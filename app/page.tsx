"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, LinkIcon, Palette, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Navigation from "@/components/shared/Navigation"
import Footer from "@/components/shared/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            One link to rule them all
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
          >
            Share Your Links
            <br />
            <span className="text-primary">All in One Place</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
          >
            Create a beautiful landing page for all your important links. Customize the design, track analytics, and
            share with your audience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register">
              <Button size="lg" className="gap-2 text-lg px-8">
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                View Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground">Powerful features to make your link page stand out</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: LinkIcon,
              title: "Unlimited Links",
              description: "Add as many links as you want. Organize them with drag-and-drop reordering.",
              delay: 0,
            },
            {
              icon: Palette,
              title: "Custom Design",
              description: "Choose from beautiful themes or create your own with custom colors and styles.",
              delay: 0.1,
            },
            {
              icon: BarChart3,
              title: "Analytics",
              description: "Track views, clicks, and engagement. Understand your audience better.",
              delay: 0.2,
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -8 }}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 border"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of creators sharing their links in style</p>
          <Link href="/register">
            <Button size="lg" className="gap-2 text-lg px-8">
              Create Your Page
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}