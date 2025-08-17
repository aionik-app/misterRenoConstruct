"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Star } from "lucide-react"
import type { SiteConfig, Testimonial } from "@/types/site-config"

interface TestimonialsEditorProps {
  config: SiteConfig
  onUpdate: (updates: Partial<SiteConfig>) => void
}

export function TestimonialsEditor({ config, onUpdate }: TestimonialsEditorProps) {
  const updateTestimonials = (field: string, value: string | Testimonial[]) => {
    onUpdate({
      testimonials: {
        ...config.testimonials,
        [field]: value,
      },
    })
  }

  const updateTestimonial = (index: number, field: string, value: string | number) => {
    const updatedTestimonials = [...config.testimonials.items]
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value,
    }
    updateTestimonials("items", updatedTestimonials)
  }

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: `testimonial-${Date.now()}`,
      name: "",
      location: "",
      rating: 5,
      comment: "",
      avatar: "",
    }
    updateTestimonials("items", [...config.testimonials.items, newTestimonial])
  }

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = config.testimonials.items.filter((_, i) => i !== index)
    updateTestimonials("items", updatedTestimonials)
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Témoignages</CardTitle>
              <CardDescription>Gérez les avis et témoignages de vos clients</CardDescription>
            </div>
            <Button onClick={addTestimonial} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un témoignage
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="testimonialsTitle">Titre de la section</Label>
            <Input
              id="testimonialsTitle"
              value={config.testimonials.title}
              onChange={(e) => updateTestimonials("title", e.target.value)}
              placeholder="Ce que disent nos clients"
            />
          </div>
        </CardContent>
      </Card>

      {config.testimonials.items.map((testimonial, index) => (
        <Card key={testimonial.id} className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Témoignage {index + 1}</CardTitle>
              <Button variant="destructive" size="sm" onClick={() => removeTestimonial(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom du client</Label>
                <Input
                  value={testimonial.name}
                  onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                  placeholder="Marie Dubois"
                />
              </div>

              <div className="space-y-2">
                <Label>Localisation</Label>
                <Input
                  value={testimonial.location}
                  onChange={(e) => updateTestimonial(index, "location", e.target.value)}
                  placeholder="Paris 16ème"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Commentaire</Label>
              <Textarea
                value={testimonial.comment}
                onChange={(e) => updateTestimonial(index, "comment", e.target.value)}
                placeholder="Témoignage du client..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Note (sur 5)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.rating}
                    onChange={(e) => updateTestimonial(index, "rating", Number.parseInt(e.target.value) || 5)}
                    className="w-20"
                  />
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Avatar (optionnel)</Label>
                <Input
                  value={testimonial.avatar || ""}
                  onChange={(e) => updateTestimonial(index, "avatar", e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt="Aperçu avatar"
                    className="w-12 h-12 rounded-full object-cover border border-border mt-2"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
