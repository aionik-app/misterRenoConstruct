import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { SiteConfig } from "@/types/site-config"

interface ServicesProps {
  config: SiteConfig
}

export function Services({ config }: ServicesProps) {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Nos Services de Jardinage</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une gamme complète de services pour l'entretien et l'aménagement de vos espaces verts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {service.price}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{service.icon}</span>
                  <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full group bg-transparent">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <a href="#contact" className="flex items-center gap-2">
              Demander un devis gratuit
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
