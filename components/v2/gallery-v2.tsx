"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye } from "lucide-react"
import type { SiteConfig } from "@/types/site-config"

interface GalleryV2Props {
  config: SiteConfig
}

export function GalleryV2({ config }: GalleryV2Props) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "Tous nos projets" },
    { id: "amenagement", label: "Aménagement" },
    { id: "terrasse", label: "Terrasses" },
    { id: "tonte", label: "Entretien" },
    { id: "plantation", label: "Plantation" },
  ]

  const filteredImages =
    selectedCategory === "all"
      ? config.gallery.images
      : config.gallery.images.filter((img) => img.category === selectedCategory)

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Portfolio
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{config.gallery.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Chaque projet est unique et reflète notre passion pour l'art du jardinage
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full px-6"
                size="sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Masonry-style Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image, index) => (
            <Card
              key={image.id}
              className="group break-inside-avoid border-0 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.url || "/placeholder.svg?height=400&width=300&query=garden project"}
                  alt={image.alt}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                    index % 3 === 0 ? "h-80" : index % 3 === 1 ? "h-64" : "h-72"
                  }`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">
                        {categories.find((cat) => cat.id === image.category)?.label}
                      </span>
                      <Button size="sm" variant="secondary" className="rounded-full">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Aucun projet trouvé pour cette catégorie.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
            Voir tous nos projets
          </Button>
        </div>
      </div>
    </section>
  )
}
