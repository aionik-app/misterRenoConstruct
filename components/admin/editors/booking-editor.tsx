'use client';

import { CheckCircle, Eye, EyeOff, Loader2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { BookingConfig, SiteConfig } from '@/types/site-config';

interface BookingEditorProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
}

const DAYS_OF_WEEK = [
  { value: 0, label: 'Dimanche' },
  { value: 1, label: 'Lundi' },
  { value: 2, label: 'Mardi' },
  { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' },
  { value: 5, label: 'Vendredi' },
  { value: 6, label: 'Samedi' },
];

const DURATION_OPTIONS = [30, 45, 60, 90, 120];

type ConnectionStatus = 'idle' | 'testing' | 'success' | 'error';

export function BookingEditor({ config, onUpdate }: BookingEditorProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [connectionMessage, setConnectionMessage] = useState('');

  const testConnection = async () => {
    const booking = config.booking;
    if (!booking?.apiUrl || !booking?.apiKey) {
      setConnectionStatus('error');
      setConnectionMessage("Veuillez renseigner l'URL de l'API et la clé API avant de tester.");
      return;
    }

    setConnectionStatus('testing');
    setConnectionMessage('');

    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);

      const response = await fetch(`${booking.apiUrl}/api/public/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'check-availability',
          apiKey: booking.apiKey,
          date: tomorrow.toISOString(),
          duration: booking.defaultDuration || 60,
        }),
      });

      if (response.ok) {
        setConnectionStatus('success');
        setConnectionMessage('Connexion réussie ! Votre site est bien connecté à Aionik.');
      } else if (response.status === 401 || response.status === 403) {
        setConnectionStatus('error');
        setConnectionMessage('Clé API invalide. Vérifiez votre clé API Aionik.');
      } else {
        const data = await response.json().catch(() => null);
        setConnectionStatus('error');
        setConnectionMessage(
          data?.error || `Erreur serveur (${response.status}). Vérifiez l'URL de l'API.`
        );
      }
    } catch {
      setConnectionStatus('error');
      setConnectionMessage(
        "Impossible de joindre l'API. Vérifiez l'URL et votre connexion internet."
      );
    }
  };

  const bookingConfig = config.booking || {
    enabled: false,
    apiUrl: '',
    apiKey: '',
    defaultDuration: 60,
    workingHours: {
      start: '09:00',
      end: '18:00',
    },
    workingDays: [1, 2, 3, 4, 5],
  };

  const updateBooking = (field: keyof BookingConfig, value: any) => {
    onUpdate({
      booking: {
        ...bookingConfig,
        [field]: value,
      },
    });
  };

  const updateWorkingHours = (field: 'start' | 'end', value: string) => {
    onUpdate({
      booking: {
        ...bookingConfig,
        workingHours: {
          ...bookingConfig.workingHours,
          [field]: value,
        },
      },
    });
  };

  const toggleWorkingDay = (day: number) => {
    const currentDays = bookingConfig.workingDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day].sort();

    updateBooking('workingDays', newDays);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Configuration du système de réservation</CardTitle>
        <CardDescription>
          Permettez à vos clients de prendre rendez-vous directement depuis votre site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Toggle activation */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="booking-enabled" className="text-base">
              Activer les réservations
            </Label>
            <p className="text-sm text-muted-foreground">
              Afficher le formulaire de réservation sur votre site
            </p>
          </div>
          <Switch
            id="booking-enabled"
            checked={bookingConfig.enabled}
            onCheckedChange={(checked) => updateBooking('enabled', checked)}
          />
        </div>

        {/* Configuration API */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium">Configuration de l'API Aionik</h3>

          <div className="space-y-2">
            <Label htmlFor="apiUrl">URL de l'API *</Label>
            <Input
              id="apiUrl"
              type="url"
              value={bookingConfig.apiUrl}
              onChange={(e) => updateBooking('apiUrl', e.target.value)}
              placeholder="https://votre-api.com"
            />
            <p className="text-xs text-muted-foreground">
              L'URL de votre API Aionik (sans / à la fin)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Clé API *</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? 'text' : 'password'}
                value={bookingConfig.apiKey}
                onChange={(e) => updateBooking('apiKey', e.target.value)}
                placeholder="aionik_..."
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Votre clé API fournie par Aionik</p>
          </div>

          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={testConnection}
              disabled={connectionStatus === 'testing'}
              className="flex items-center gap-2"
            >
              {connectionStatus === 'testing' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : connectionStatus === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : connectionStatus === 'error' ? (
                <XCircle className="h-4 w-4 text-destructive" />
              ) : null}
              {connectionStatus === 'testing' ? 'Test en cours...' : 'Tester la connexion'}
            </Button>

            {connectionMessage && (
              <Alert
                className={`mt-3 ${
                  connectionStatus === 'success'
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <AlertDescription
                  className={connectionStatus === 'success' ? 'text-green-800' : 'text-red-800'}
                >
                  {connectionMessage}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Durée par défaut */}
        <div className="space-y-2 pt-4 border-t">
          <Label htmlFor="defaultDuration">Durée des rendez-vous</Label>
          <select
            id="defaultDuration"
            value={bookingConfig.defaultDuration}
            onChange={(e) => updateBooking('defaultDuration', Number(e.target.value))}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {DURATION_OPTIONS.map((duration) => (
              <option key={duration} value={duration}>
                {duration} minutes
              </option>
            ))}
          </select>
        </div>

        {/* Heures de travail */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium">Heures de travail</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Heure de début</Label>
              <Input
                id="startTime"
                type="time"
                value={bookingConfig.workingHours.start}
                onChange={(e) => updateWorkingHours('start', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">Heure de fin</Label>
              <Input
                id="endTime"
                type="time"
                value={bookingConfig.workingHours.end}
                onChange={(e) => updateWorkingHours('end', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Jours de travail */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium">Jours ouvrables</h3>
          <p className="text-sm text-muted-foreground">
            Sélectionnez les jours où vous acceptez les rendez-vous
          </p>
          <div className="grid grid-cols-2 gap-3">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day.value} className="flex items-center space-x-2 rounded-lg border p-3">
                <input
                  type="checkbox"
                  id={`day-${day.value}`}
                  checked={bookingConfig.workingDays?.includes(day.value)}
                  onChange={() => toggleWorkingDay(day.value)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor={`day-${day.value}`} className="flex-1 cursor-pointer">
                  {day.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Informations */}
        <div className="rounded-lg bg-muted p-4 text-sm">
          <p className="font-medium mb-2">ℹ️ Information</p>
          <p className="text-muted-foreground">
            Pour obtenir votre clé API, contactez l'administrateur de votre système Aionik. La clé
            API permet de créer des rendez-vous dans votre calendrier depuis votre site vitrine.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
