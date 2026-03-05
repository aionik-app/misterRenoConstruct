'use client';

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarCheck,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RotateCcw,
  User,
} from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { checkAvailability, createBooking, formatDate, formatTime } from '@/lib/booking';
import type { BookingFormData } from '@/types/booking';
import type { BookingConfig } from '@/types/site-config';
import { DateTimePicker } from './date-time-picker';

interface BookingFormProps {
  config: BookingConfig;
}

type BookingStep = 'datetime' | 'details' | 'confirmation' | 'success';

const STEPS: { key: BookingStep; label: string; icon: typeof Calendar }[] = [
  { key: 'datetime', label: 'Date & Heure', icon: Calendar },
  { key: 'details', label: 'Vos informations', icon: User },
  { key: 'confirmation', label: 'Confirmation', icon: CheckCircle },
];

export function BookingForm({ config }: BookingFormProps) {
  const uid = useId();
  const [step, setStep] = useState<BookingStep>('datetime');
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [error]);

  const [formData, setFormData] = useState<Omit<BookingFormData, 'startDate' | 'duration'>>({
    clientFirstName: '',
    clientLastName: '',
    clientEmail: '',
    clientPhone: '',
    title: '',
    description: '',
    note: '',
  });

  const [addressParts, setAddressParts] = useState({
    street: '',
    streetNumber: '',
    postalCode: '',
    city: '',
  });

  const currentStepIndex = STEPS.findIndex((s) => s.key === step);

  const handleDateTimeChange = (date: Date) => {
    setSelectedDateTime(date);
    setError(null);
  };

  const handleContinueToDetails = async () => {
    if (!selectedDateTime) {
      setError('Veuillez sélectionner une date et un créneau horaire.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const availability = await checkAvailability(
        config.apiUrl,
        config.apiKey,
        selectedDateTime,
        config.defaultDuration
      );

      if (availability.available) {
        setStep('details');
      } else {
        setError(
          availability.message || "Ce créneau n'est plus disponible. Veuillez en choisir un autre."
        );
      }
    } catch {
      setError('Impossible de vérifier la disponibilité. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const updateAddressPart = (
    field: 'street' | 'streetNumber' | 'postalCode' | 'city',
    value: string
  ) => {
    setAddressParts((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const validateDetails = (): boolean => {
    if (!formData.clientFirstName.trim() || !formData.clientLastName.trim()) {
      setError('Le prénom et le nom sont obligatoires.');
      return false;
    }
    if (!formData.clientEmail.trim()) {
      setError("L'adresse email est obligatoire.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.clientEmail)) {
      setError('Veuillez entrer une adresse email valide.');
      return false;
    }
    if (!formData.clientPhone.trim()) {
      setError('Le numéro de téléphone est obligatoire.');
      return false;
    }
    if (!formData.title.trim()) {
      setError('Veuillez indiquer le motif du rendez-vous.');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Veuillez décrire brièvement votre demande.');
      return false;
    }
    return true;
  };

  const handleContinueToConfirmation = () => {
    if (validateDetails()) {
      setError(null);
      setStep('confirmation');
    }
  };

  const handleSubmit = async () => {
    if (!selectedDateTime) return;

    setLoading(true);
    setError(null);

    try {
      const result = await createBooking(config.apiUrl, config.apiKey, {
        ...formData,
        clientAddress: {
          street: addressParts.street,
          streetNumber: addressParts.streetNumber,
          postalCode: addressParts.postalCode,
          city: addressParts.city,
        },
        startDate: selectedDateTime,
        duration: config.defaultDuration,
      });

      if (result.success && result.eventId) {
        setEventId(result.eventId);
        setStep('success');
      } else {
        setError(result.error || 'Une erreur est survenue lors de la création du rendez-vous.');
      }
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('datetime');
    setSelectedDateTime(null);
    setFormData({
      clientFirstName: '',
      clientLastName: '',
      clientEmail: '',
      clientPhone: '',
      title: '',
      description: '',
      note: '',
    });
    setAddressParts({ street: '', streetNumber: '', postalCode: '', city: '' });
    setError(null);
    setEventId(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <CalendarCheck className="h-4 w-4" />
          Réservation en ligne
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Prendre rendez-vous
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Réservez un créneau directement en ligne. Nous vous confirmerons votre rendez-vous par
          email.
        </p>
      </div>

      {step !== 'success' && (
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const isActive = i === currentStepIndex;
            const isDone = i < currentStepIndex;
            const StepIcon = s.icon;
            return (
              <div key={s.key} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={`hidden sm:block w-12 h-px ${isDone ? 'bg-primary' : 'bg-border'}`}
                  />
                )}
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : isDone
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <StepIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          {error && (
            <Alert ref={errorRef} variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Step 1: Date & Time */}
          {step === 'datetime' && (
            <div className="space-y-8">
              <DateTimePicker
                config={config}
                selectedDateTime={selectedDateTime}
                onDateTimeChange={handleDateTimeChange}
              />

              {selectedDateTime && (
                <div className="space-y-3">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {formatDate(selectedDateTime)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(selectedDateTime)} — {config.defaultDuration} min
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleContinueToDetails}
                      disabled={loading}
                      className="w-full sm:w-auto"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Vérification...
                        </>
                      ) : (
                        <>
                          Continuer
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 'details' && (
            <div className="space-y-6">
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Modifier la date
              </button>

              {selectedDateTime && (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {formatDate(selectedDateTime)} à {formatTime(selectedDateTime)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({config.defaultDuration} min)
                  </span>
                </div>
              )}

              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Coordonnées
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${uid}-firstName`}>
                      Prénom <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`${uid}-firstName`}
                        value={formData.clientFirstName}
                        onChange={(e) => updateField('clientFirstName', e.target.value)}
                        placeholder="Jean"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${uid}-lastName`}>
                      Nom <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`${uid}-lastName`}
                        value={formData.clientLastName}
                        onChange={(e) => updateField('clientLastName', e.target.value)}
                        placeholder="Dupont"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${uid}-email`}>
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`${uid}-email`}
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => updateField('clientEmail', e.target.value)}
                        placeholder="jean.dupont@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${uid}-phone`}>
                      Téléphone <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`${uid}-phone`}
                        type="tel"
                        value={formData.clientPhone}
                        onChange={(e) => updateField('clientPhone', e.target.value)}
                        placeholder="+32 470 00 00 00"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Adresse du lieu d'intervention
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3 space-y-2">
                      <Label htmlFor={`${uid}-street`} className="text-xs text-muted-foreground">
                        Rue
                      </Label>
                      <Input
                        id={`${uid}-street`}
                        value={addressParts.street}
                        onChange={(e) => updateAddressPart('street', e.target.value)}
                        placeholder="Rue de la Paix"
                      />
                    </div>
                    <div className="sm:col-span-1 space-y-2">
                      <Label
                        htmlFor={`${uid}-streetNumber`}
                        className="text-xs text-muted-foreground"
                      >
                        Numéro
                      </Label>
                      <Input
                        id={`${uid}-streetNumber`}
                        value={addressParts.streetNumber}
                        onChange={(e) => updateAddressPart('streetNumber', e.target.value)}
                        placeholder="12"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`${uid}-postalCode`}
                        className="text-xs text-muted-foreground"
                      >
                        Code postal
                      </Label>
                      <Input
                        id={`${uid}-postalCode`}
                        value={addressParts.postalCode}
                        onChange={(e) => updateAddressPart('postalCode', e.target.value)}
                        placeholder="1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${uid}-city`} className="text-xs text-muted-foreground">
                        Ville
                      </Label>
                      <Input
                        id={`${uid}-city`}
                        value={addressParts.city}
                        onChange={(e) => updateAddressPart('city', e.target.value)}
                        placeholder="Bruxelles"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adresse du lieu d'intervention (si différente de votre domicile)
                  </p>
                </div>
              </div>

              <div className="space-y-5 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Détails du rendez-vous
                </h3>

                <div className="space-y-2">
                  <Label htmlFor={`${uid}-title`}>
                    Motif du rendez-vous <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id={`${uid}-title`}
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Ex: Devis tonte de pelouse, Aménagement terrasse..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${uid}-description`}>
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id={`${uid}-description`}
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Décrivez votre projet ou votre demande en détail : surface, type de travaux, contraintes particulières..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${uid}-note`}>Note (optionnel)</Label>
                  <Textarea
                    id={`${uid}-note`}
                    value={formData.note}
                    onChange={(e) => updateField('note', e.target.value)}
                    placeholder="Ajoutez une note : accès au jardin, code portail, horaires de préférence..."
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep('datetime')} className="sm:flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <Button onClick={handleContinueToConfirmation} className="sm:flex-[2]">
                  Vérifier et confirmer
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirmation' && selectedDateTime && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <h3 className="text-xl font-bold text-foreground">Récapitulatif</h3>
                <p className="text-sm text-muted-foreground">
                  Vérifiez les informations avant de confirmer votre rendez-vous
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Rendez-vous
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">
                      {formatDate(selectedDateTime)}
                    </span>
                    <span className="text-muted-foreground">Heure</span>
                    <span className="font-medium text-foreground">
                      {formatTime(selectedDateTime)}
                    </span>
                    <span className="text-muted-foreground">Durée</span>
                    <span className="font-medium text-foreground">
                      {config.defaultDuration} minutes
                    </span>
                    <span className="text-muted-foreground">Motif</span>
                    <span className="font-medium text-foreground">{formData.title}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Vos coordonnées
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Nom complet</span>
                    <span className="font-medium text-foreground">
                      {formData.clientFirstName} {formData.clientLastName}
                    </span>
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-foreground">{formData.clientEmail}</span>
                    <span className="text-muted-foreground">Téléphone</span>
                    <span className="font-medium text-foreground">{formData.clientPhone}</span>
                    {(addressParts.street ||
                      addressParts.streetNumber ||
                      addressParts.postalCode ||
                      addressParts.city) && (
                      <>
                        <span className="text-muted-foreground">Adresse</span>
                        <span className="font-medium text-foreground">
                          {[
                            addressParts.street,
                            addressParts.streetNumber,
                            addressParts.postalCode,
                            addressParts.city,
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Description
                  </h4>
                  <p className="text-sm text-muted-foreground">{formData.description}</p>
                  {formData.note && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground font-medium mb-1">Note :</p>
                      <p className="text-sm text-muted-foreground">{formData.note}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="outline" onClick={() => setStep('details')} className="sm:flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button onClick={handleSubmit} disabled={loading} className="sm:flex-[2]">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Confirmation en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirmer le rendez-vous
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Rendez-vous confirmé !</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Votre rendez-vous a été enregistré. Vous recevrez une confirmation par email à{' '}
                  <strong className="text-foreground">{formData.clientEmail}</strong>.
                </p>
              </div>

              {selectedDateTime && (
                <div className="inline-flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">{formatDate(selectedDateTime)}</span>
                  </div>
                  <div className="w-px h-5 bg-border" />
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{formatTime(selectedDateTime)}</span>
                  </div>
                </div>
              )}

              {eventId && (
                <p className="text-xs text-muted-foreground">
                  Référence : <span className="font-mono">{eventId}</span>
                </p>
              )}

              <Button onClick={handleReset} variant="outline" className="mt-4">
                <RotateCcw className="h-4 w-4 mr-2" />
                Prendre un autre rendez-vous
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
