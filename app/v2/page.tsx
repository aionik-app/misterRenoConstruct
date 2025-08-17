"use client"

import { useEffect, useState } from "react"
import { HeaderV2 } from "@/components/v2/header-v2"
import { HeroV2 } from "@/components/v2/hero-v2"
import { ServicesV2 } from "@/components/v2/services-v2"
import { AboutV2 } from "@/components/v2/about-v2"
import { GalleryV2 } from "@/components/v2/gallery-v2"
import { TestimonialsV2 } from "@/components/v2/testimonials-v2"
import { ContactV2 } from "@/components/v2/contact-v2"
import { FooterV2 } from "@/components/v2/footer-v2"
import { reloadSiteConfig } from "@/lib/site-data"
import type { SiteConfig } from "@/types/site-config"

export default function HomePageV2() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const siteConfig = await reloadSiteConfig()
        siteConfig.version = "v2"
        setConfig(siteConfig)
      } catch (error) {
        console.error("Failed to load site configuration:", error)
      } finally {
        setLoading(false)
      }
    }

    loadConfig()

    const handleFocus = () => {
      loadConfig()
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Erreur de configuration</h1>
          <p className="text-muted-foreground">Impossible de charger la configuration du site.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderV2 config={config} />
      <main>
        <HeroV2 config={config} />
        <ServicesV2 config={config} />
        <AboutV2 config={config} />
        <GalleryV2 config={config} />
        <TestimonialsV2 config={config} />
        <ContactV2 config={config} />
      </main>
      <FooterV2 config={config} />
    </div>
  )
}
