import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Award, Users } from "lucide-react"
import type { SiteConfig } from "@/types/site-config"

interface HeroV2Props {
  config: SiteConfig
}

export function HeroV2({ config }: HeroV2Props) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with asymmetric layout */}
      <div className="absolute inset-0">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-7 relative">
            <img
              src={
                config.hero.backgroundImage ||
                "/placeholder.svg?height=1080&width=1400&query=beautiful garden landscape"
              }
              alt="Jardin moderne"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/60"></div>
          </div>
          <div className="col-span-5 bg-background"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-12 items-center min-h-[80vh]">
          {/* Left side - Image area (hidden on mobile) */}
          <div className="hidden lg:block col-span-6"></div>

          {/* Right side - Content */}
          <div className="col-span-12 lg:col-span-6 lg:pl-12">
            <div className="bg-background/95 backdrop-blur-sm p-8 lg:p-12 rounded-2xl shadow-xl lg:bg-transparent lg:backdrop-blur-none lg:shadow-none">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                Experts en jardinage depuis 15 ans
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">{config.hero.title}</h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{config.hero.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2 mx-auto">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">15+</div>
                  <div className="text-sm text-muted-foreground">Années</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2 mx-auto">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Clients</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2 mx-auto">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Bio</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full text-lg px-8">
                  <a href={config.hero.ctaLink} className="flex items-center gap-2">
                    {config.hero.ctaText}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 bg-transparent">
                  <a href="#services">Découvrir nos services</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
