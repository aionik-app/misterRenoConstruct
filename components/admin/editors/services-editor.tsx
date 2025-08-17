"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from "lucide-react"
import type { SiteConfig, Service } from "@/types/site-config"

interface ServicesEditorProps {
  config: SiteConfig
  onUpdate: (updates: Partial<SiteConfig>) => void
}

export function ServicesEditor({ config, onUpdate }: ServicesEditorProps) {
  const [newFeature, setNewFeature] = useState<{ [key: string]: string }>({})

  const updateService = (index: number, field: string, value: string | string[]) => {
    const updatedServices = [...config.services]
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    }
    onUpdate({ services: updatedServices })
  }

  const addService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: "Nouveau service",
      description: "Description du service",
      image: "",
      price: "Sur devis",
      features: [],
      icon: "🌱",
    }
    onUpdate({ services: [...config.services, newService] })
  }

  const removeService = (index: number) => {
    const updatedServices = config.services.filter((_, i) => i !== index)
    onUpdate({ services: updatedServices })
  }

  const addFeature = (serviceIndex: number) => {
    const feature = newFeature[serviceIndex]?.trim()
    if (feature) {
      const updatedServices = [...config.services]
      updatedServices[serviceIndex].features.push(feature)
      onUpdate({ services: updatedServices })
      setNewFeature({ ...newFeature, [serviceIndex]: "" })
    }
  }

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const updatedServices = [...config.services]
    updatedServices[serviceIndex].features.splice(featureIndex, 1)
    onUpdate({ services: updatedServices })
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Services</CardTitle>
              <CardDescription>Gérez les services proposés par votre entreprise</CardDescription>
            </div>
            <Button onClick={addService} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un service
            </Button>
          </div>
        </CardHeader>
      </Card>

      {config.services.map((service, index) => (
        <Card key={service.id} className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Service {index + 1}</CardTitle>
              <Button variant="destructive" size="sm" onClick={() => removeService(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input
                  value={service.title}
                  onChange={(e) => updateService(index, "title", e.target.value)}
                  placeholder="Nom du service"
                />
              </div>

              <div className="space-y-2">
                <Label>Prix</Label>
                <Input
                  value={service.price || ""}
                  onChange={(e) => updateService(index, "price", e.target.value)}
                  placeholder="À partir de 35€"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={service.description}
                onChange={(e) => updateService(index, "description", e.target.value)}
                placeholder="Description détaillée du service"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image</Label>
                <Input
                  value={service.image}
                  onChange={(e) => updateService(index, "image", e.target.value)}
                  placeholder="https://example.com/service-image.jpg"
                />
                {service.image && (
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt="Aperçu"
                    className="w-full h-24 object-cover border border-border rounded mt-2"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Icône (emoji)</Label>
                <Input
                  value={service.icon}
                  onChange={(e) => updateService(index, "icon", e.target.value)}
                  placeholder="🌱"
                  className="text-2xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Caractéristiques</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {service.features.map((feature, featureIndex) => (
                  <Badge key={featureIndex} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeFeature(index, featureIndex)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newFeature[index] || ""}
                  onChange={(e) => setNewFeature({ ...newFeature, [index]: e.target.value })}
                  placeholder="Nouvelle caractéristique"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature(index))}
                />
                <Button onClick={() => addFeature(index)} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
