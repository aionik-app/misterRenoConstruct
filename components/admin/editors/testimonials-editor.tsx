'use client';

import { Plus, Star, Trash2 } from 'lucide-react';
import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { SiteConfig, Testimonial } from '@/types/site-config';

interface TestimonialsEditorProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function TestimonialsEditor({ config, onUpdate }: TestimonialsEditorProps) {
  const uid = useId();
  const testimonialsConfig = config.testimonials || {
    enabled: false,
    title: 'Ce Que Disent Nos Clients',
    subtitle: '',
    items: [],
  };

  const updateField = (field: string, value: unknown) => {
    onUpdate({
      testimonials: {
        ...testimonialsConfig,
        [field]: value,
      },
    });
  };

  const updateItem = (index: number, field: keyof Testimonial, value: unknown) => {
    const updated = [...testimonialsConfig.items];
    updated[index] = { ...updated[index], [field]: value };
    updateField('items', updated);
  };

  const addItem = () => {
    const newItem: Testimonial = {
      id: `t${Date.now()}`,
      name: '',
      role: '',
      content: '',
      rating: 5,
    };
    updateField('items', [...testimonialsConfig.items, newItem]);
  };

  const removeItem = (index: number) => {
    updateField(
      'items',
      testimonialsConfig.items.filter((_, i) => i !== index)
    );
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Témoignages clients</CardTitle>
        <CardDescription>
          Affichez les avis de vos clients satisfaits pour renforcer la confiance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor={`${uid}-enabled`} className="text-base">
              Activer les témoignages
            </Label>
            <p className="text-sm text-muted-foreground">
              Afficher la section témoignages sur le site
            </p>
          </div>
          <Switch
            id={`${uid}-enabled`}
            checked={testimonialsConfig.enabled}
            onCheckedChange={(checked) => updateField('enabled', checked)}
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Label htmlFor={`${uid}-title`}>Titre de la section</Label>
            <Input
              id={`${uid}-title`}
              value={testimonialsConfig.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${uid}-subtitle`}>Sous-titre</Label>
            <Input
              id={`${uid}-subtitle`}
              value={testimonialsConfig.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Avis ({testimonialsConfig.items.length})</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addItem}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un avis
            </Button>
          </div>

          {testimonialsConfig.items.map((item, index) => (
            <Card key={item.id} className="border shadow-sm">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Avis #{index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom *</Label>
                    <Input
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      placeholder="Marie Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rôle / Localisation</Label>
                    <Input
                      value={item.role || ''}
                      onChange={(e) => updateItem(index, 'role', e.target.value)}
                      placeholder="Propriétaire à Bruxelles"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Témoignage *</Label>
                  <Textarea
                    value={item.content}
                    onChange={(e) => updateItem(index, 'content', e.target.value)}
                    placeholder="Décrivez l'expérience du client..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Note</Label>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={`rating-${item.id}-${i}`}
                        type="button"
                        onClick={() => updateItem(index, 'rating', i + 1)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-5 w-5 cursor-pointer ${
                            i < item.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>URL de l'avatar (optionnel)</Label>
                  <Input
                    value={item.avatar || ''}
                    onChange={(e) => updateItem(index, 'avatar', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
