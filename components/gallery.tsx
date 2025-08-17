"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { SiteConfig } from "@/types/site-config"

interface GalleryProps {
  config: SiteConfig
}

export function Gallery({ config }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "Tous" },
    { id: "amenagement", label: "Aménagement" },
    { id: "terrasse", label: "Terrasses" },
    { id: "tonte", label: "Pelouse" },
    { id: "plantation", label: "Plantation" },
  ]

  const filteredImages =
    selectedCategory === "all"
      ? config.gallery.images
      : config.gallery.images.filter((img) => img.category === selectedCategory)

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{config.gallery.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Découvrez quelques-unes de nos plus belles réalisations
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-2">{image.title}</h3>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {categories.find((cat) => cat.id === image.category)?.label}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune image trouvée pour cette catégorie.</p>
          </div>
        )}
      </div>
    </section>
  )
}
