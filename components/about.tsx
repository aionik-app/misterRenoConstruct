import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Users, Clock } from "lucide-react"
import type { SiteConfig } from "@/types/site-config"

interface AboutProps {
  config: SiteConfig
}

export function About({ config }: AboutProps) {
  const stats = [
    { icon: Award, label: "Années d'expérience", value: "15+" },
    { icon: Users, label: "Clients satisfaits", value: "500+" },
    { icon: Clock, label: "Projets réalisés", value: "1000+" },
  ]

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">{config.about.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{config.about.description}</p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {config.about.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={config.about.image || "/placeholder.svg"}
                alt="Notre équipe au travail"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating card */}
            <Card className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm opacity-90">Satisfaction client</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
