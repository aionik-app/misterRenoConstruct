import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { SiteConfig } from "@/types/site-config"

interface ServicesV2Props {
  config: SiteConfig
}

export function ServicesV2({ config }: ServicesV2Props) {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Nos Expertises
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Services de Jardinage</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De la conception à l'entretien, nous transformons vos espaces extérieurs en véritables œuvres d'art
            naturelles
          </p>
        </div>

        {/* Services Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Service - Large Card */}
          <div className="lg:col-span-8">
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
              <div className="relative h-80 lg:h-96 overflow-hidden">
                <img
                  src={config.services[0]?.image || "/placeholder.svg?height=400&width=600&query=lawn mowing service"}
                  alt={config.services[0]?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                    {config.services[0]?.price}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{config.services[0]?.title}</h3>
                  <p className="text-white/90 mb-4">{config.services[0]?.description}</p>
                  <Button variant="secondary" size="sm" className="rounded-full">
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Services */}
          <div className="lg:col-span-4 space-y-6">
            {config.services.slice(1, 3).map((service) => (
              <Card key={service.id} className="group border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{service.description}</p>
                      <div className="text-primary font-semibold text-sm">{service.price}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Remaining Services - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {config.services.slice(3).map((service) => (
            <Card key={service.id} className="group border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={service.image || "/placeholder.svg?height=200&width=300&query=gardening service"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {service.price}
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{service.icon}</span>
                  <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
                <Button variant="outline" size="sm" className="rounded-full w-full bg-transparent">
                  Découvrir
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="rounded-full px-8">
            <a href="#contact" className="flex items-center gap-2">
              Obtenir un devis personnalisé
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
