import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import type { SiteConfig } from "@/types/site-config"

interface HeroProps {
  config: SiteConfig
}

export function Hero({ config }: HeroProps) {
  const features = ["Devis gratuit sous 24h", "Équipe professionnelle", "Matériaux de qualité", "Garantie travaux"]

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.hero.backgroundImage || "/placeholder.svg"}
          alt="Jardin aménagé"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {config.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">{config.hero.subtitle}</p>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">{config.hero.description}</p>

          {/* Features list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <a href={config.hero.ctaLink} className="flex items-center gap-2">
                {config.hero.ctaText}
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <a href="#services">Nos Services</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
