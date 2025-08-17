"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import type { SiteConfig, GalleryImage } from "@/types/site-config"

interface GalleryEditorProps {
  config: SiteConfig
  onUpdate: (updates: Partial<SiteConfig>) => void
}

export function GalleryEditor({ config, onUpdate }: GalleryEditorProps) {
  const updateGallery = (field: string, value: string | GalleryImage[]) => {
    onUpdate({
      gallery: {
        ...config.gallery,
        [field]: value,
      },
    })
  }

  const updateImage = (index: number, field: string, value: string) => {
    const updatedImages = [...config.gallery.images]
    updatedImages[index] = {
      ...updatedImages[index],
      [field]: value,
    }
    updateGallery("images", updatedImages)
  }

  const addImage = () => {
    const newImage: GalleryImage = {
      id: `image-${Date.now()}`,
      url: "",
      alt: "",
      category: "amenagement",
      title: "",
    }
    updateGallery("images", [...config.gallery.images, newImage])
  }

  const removeImage = (index: number) => {
    const updatedImages = config.gallery.images.filter((_, i) => i !== index)
    updateGallery("images", updatedImages)
  }

  const categories = [
    { value: "amenagement", label: "Aménagement" },
    { value: "terrasse", label: "Terrasses" },
    { value: "tonte", label: "Pelouse" },
    { value: "plantation", label: "Plantation" },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Galerie</CardTitle>
              <CardDescription>Gérez les images de vos réalisations</CardDescription>
            </div>
            <Button onClick={addImage} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter une image
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="galleryTitle">Titre de la section</Label>
            <Input
              id="galleryTitle"
              value={config.gallery.title}
              onChange={(e) => updateGallery("title", e.target.value)}
              placeholder="Nos Réalisations"
            />
          </div>
        </CardContent>
      </Card>

      {config.gallery.images.map((image, index) => (
        <Card key={image.id} className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Image {index + 1}</CardTitle>
              <Button variant="destructive" size="sm" onClick={() => removeImage(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>URL de l'image</Label>
              <Input
                value={image.url}
                onChange={(e) => updateImage(index, "url", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {image.url && (
                <img
                  src={image.url || "/placeholder.svg"}
                  alt="Aperçu"
                  className="w-full max-w-sm h-32 object-cover border border-border rounded mt-2"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input
                  value={image.title || ""}
                  onChange={(e) => updateImage(index, "title", e.target.value)}
                  placeholder="Titre de l'image"
                />
              </div>

              <div className="space-y-2">
                <Label>Catégorie</Label>
                <select
                  value={image.category}
                  onChange={(e) => updateImage(index, "category", e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Texte alternatif</Label>
              <Input
                value={image.alt}
                onChange={(e) => updateImage(index, "alt", e.target.value)}
                placeholder="Description de l'image pour l'accessibilité"
              />
              <p className="text-sm text-muted-foreground">
                Description de l'image pour les lecteurs d'écran et le SEO
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
