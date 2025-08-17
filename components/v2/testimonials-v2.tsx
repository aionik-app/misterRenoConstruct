import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import type { SiteConfig } from "@/types/site-config"

interface TestimonialsV2Props {
  config: SiteConfig
}

export function TestimonialsV2({ config }: TestimonialsV2Props) {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Témoignages
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{config.testimonials.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez pourquoi nos clients nous font confiance pour leurs projets de jardinage
          </p>
        </div>

        {/* Testimonials Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Testimonial */}
          <div className="lg:col-span-8">
            <Card className="border-0 shadow-lg bg-primary text-primary-foreground h-full">
              <CardContent className="p-8 lg:p-12">
                <Quote className="h-12 w-12 opacity-50 mb-6" />
                <blockquote className="text-2xl lg:text-3xl font-medium leading-relaxed mb-8">
                  "{config.testimonials.items[0]?.comment}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={
                      config.testimonials.items[0]?.avatar ||
                      "/placeholder.svg?height=60&width=60&query=customer avatar"
                    }
                    alt={config.testimonials.items[0]?.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-foreground/20"
                  />
                  <div>
                    <div className="font-bold text-lg">{config.testimonials.items[0]?.name}</div>
                    <div className="opacity-80">{config.testimonials.items[0]?.location}</div>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(config.testimonials.items[0]?.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Testimonials */}
          <div className="lg:col-span-4 space-y-6">
            {config.testimonials.items.slice(1).map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.comment}"</p>

                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg?height=40&width=40&query=customer avatar"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                      <div className="text-muted-foreground text-xs">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Recommandations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Années d'expérience</div>
          </div>
        </div>
      </div>
    </section>
  )
}
