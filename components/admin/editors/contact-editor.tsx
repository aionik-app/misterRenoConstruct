"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SiteConfig } from "@/types/site-config"

interface ContactEditorProps {
  config: SiteConfig
  onUpdate: (updates: Partial<SiteConfig>) => void
}

export function ContactEditor({ config, onUpdate }: ContactEditorProps) {
  const updateContact = (field: string, value: string | number) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      onUpdate({
        contact: {
          ...config.contact,
          [parent]: {
            ...config.contact[parent as keyof typeof config.contact],
            [child]: value,
          },
        },
      })
    } else {
      onUpdate({
        contact: {
          ...config.contact,
          [field]: value,
        },
      })
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Informations de contact</CardTitle>
        <CardDescription>Configurez vos coordonnées et informations de contact</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={config.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
              placeholder="+33 1 23 45 67 89"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={config.contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
              placeholder="contact@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            value={config.contact.address}
            onChange={(e) => updateContact("address", e.target.value)}
            placeholder="123 Rue des Jardins"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">Ville</Label>
            <Input
              id="city"
              value={config.contact.city}
              onChange={(e) => updateContact("city", e.target.value)}
              placeholder="Paris"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Code postal</Label>
            <Input
              id="postalCode"
              value={config.contact.postalCode}
              onChange={(e) => updateContact("postalCode", e.target.value)}
              placeholder="75001"
            />
          </div>
        </div>

        {/* Coordinates (optional) */}
        <div className="space-y-4">
          <Label>Coordonnées GPS (optionnel)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                type="number"
                step="any"
                value={config.contact.coordinates?.lat || ""}
                onChange={(e) => updateContact("coordinates.lat", Number.parseFloat(e.target.value) || 0)}
                placeholder="48.8566"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                type="number"
                step="any"
                value={config.contact.coordinates?.lng || ""}
                onChange={(e) => updateContact("coordinates.lng", Number.parseFloat(e.target.value) || 0)}
                placeholder="2.3522"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Coordonnées pour afficher votre localisation sur une carte (optionnel)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
