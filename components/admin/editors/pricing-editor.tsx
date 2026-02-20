'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { PricingTier, SiteConfig } from '@/types/site-config';

interface PricingEditorProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function PricingEditor({ config, onUpdate }: PricingEditorProps) {
  const uid = useId();
  const pricingConfig = config.pricing || {
    enabled: false,
    title: 'Nos Tarifs',
    subtitle: '',
    tiers: [],
  };

  const updateField = (field: string, value: unknown) => {
    onUpdate({
      pricing: {
        ...pricingConfig,
        [field]: value,
      },
    });
  };

  const updateTier = (index: number, field: keyof PricingTier, value: unknown) => {
    const updated = [...pricingConfig.tiers];
    updated[index] = { ...updated[index], [field]: value };
    updateField('tiers', updated);
  };

  const updateTierFeature = (tierIndex: number, featureIndex: number, value: string) => {
    const updated = [...pricingConfig.tiers];
    const features = [...updated[tierIndex].features];
    features[featureIndex] = value;
    updated[tierIndex] = { ...updated[tierIndex], features };
    updateField('tiers', updated);
  };

  const addFeature = (tierIndex: number) => {
    const updated = [...pricingConfig.tiers];
    updated[tierIndex] = {
      ...updated[tierIndex],
      features: [...updated[tierIndex].features, ''],
    };
    updateField('tiers', updated);
  };

  const removeFeature = (tierIndex: number, featureIndex: number) => {
    const updated = [...pricingConfig.tiers];
    updated[tierIndex] = {
      ...updated[tierIndex],
      features: updated[tierIndex].features.filter((_, i) => i !== featureIndex),
    };
    updateField('tiers', updated);
  };

  const addTier = () => {
    const newTier: PricingTier = {
      id: `tier-${Date.now()}`,
      name: '',
      description: '',
      price: '',
      features: [],
      ctaText: 'Demander un devis',
      ctaLink: '#contact',
    };
    updateField('tiers', [...pricingConfig.tiers, newTier]);
  };

  const removeTier = (index: number) => {
    updateField(
      'tiers',
      pricingConfig.tiers.filter((_, i) => i !== index)
    );
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Tarifs</CardTitle>
        <CardDescription>Présentez vos formules et tarifs à vos visiteurs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor={`${uid}-enabled`} className="text-base">
              Activer les tarifs
            </Label>
            <p className="text-sm text-muted-foreground">Afficher la section tarifs sur le site</p>
          </div>
          <Switch
            id={`${uid}-enabled`}
            checked={pricingConfig.enabled}
            onCheckedChange={(checked) => updateField('enabled', checked)}
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Label htmlFor={`${uid}-title`}>Titre de la section</Label>
            <Input
              id={`${uid}-title`}
              value={pricingConfig.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${uid}-subtitle`}>Sous-titre</Label>
            <Input
              id={`${uid}-subtitle`}
              value={pricingConfig.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Formules ({pricingConfig.tiers.length})</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addTier}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter une formule
            </Button>
          </div>

          {pricingConfig.tiers.map((tier, tierIndex) => (
            <Card key={tier.id} className="border shadow-sm">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Formule #{tierIndex + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`highlighted-${tier.id}`} className="text-xs">
                        Mise en avant
                      </Label>
                      <Switch
                        id={`highlighted-${tier.id}`}
                        checked={tier.highlighted || false}
                        onCheckedChange={(checked) => updateTier(tierIndex, 'highlighted', checked)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTier(tierIndex)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom *</Label>
                    <Input
                      value={tier.name}
                      onChange={(e) => updateTier(tierIndex, 'name', e.target.value)}
                      placeholder="Ex: Entretien"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prix *</Label>
                    <Input
                      value={tier.price}
                      onChange={(e) => updateTier(tierIndex, 'price', e.target.value)}
                      placeholder="Ex: 35€ ou Sur devis"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Période (optionnel)</Label>
                    <Input
                      value={tier.period || ''}
                      onChange={(e) => updateTier(tierIndex, 'period', e.target.value)}
                      placeholder="Ex: par mois"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Texte du bouton</Label>
                    <Input
                      value={tier.ctaText || ''}
                      onChange={(e) => updateTier(tierIndex, 'ctaText', e.target.value)}
                      placeholder="Demander un devis"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={tier.description}
                    onChange={(e) => updateTier(tierIndex, 'description', e.target.value)}
                    placeholder="Brève description de la formule"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Fonctionnalités ({tier.features.length})</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addFeature(tierIndex)}
                      className="h-8"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  {tier.features.map((feature, featureIndex) => (
                    <div
                      key={`${tier.id}-feat-${featureIndex}`}
                      className="flex items-center gap-2"
                    >
                      <Input
                        value={feature}
                        onChange={(e) => updateTierFeature(tierIndex, featureIndex, e.target.value)}
                        placeholder="Ex: Tonte de pelouse"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(tierIndex, featureIndex)}
                        className="text-destructive hover:text-destructive flex-shrink-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
