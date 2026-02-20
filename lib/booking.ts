import type { AvailabilityResponse, BookingFormData, BookingResponse } from '@/types/booking';

/**
 * Résout l'URL de l'API Aionik.
 * NEXT_PUBLIC_BOOKING_API_URL (env) prend le dessus sur la valeur issue de site-config.json.
 * Permet d'utiliser une URL locale en dev sans toucher à la config de production.
 */
export function resolveApiUrl(configApiUrl: string): string {
  return process.env.NEXT_PUBLIC_BOOKING_API_URL || configApiUrl;
}

/**
 * Vérifier la disponibilité d'un créneau
 */
export async function checkAvailability(
  apiUrl: string,
  apiKey: string,
  date: Date,
  duration: number
): Promise<AvailabilityResponse> {
  try {
    const response = await fetch(`${resolveApiUrl(apiUrl)}/api/public/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'check-availability',
        apiKey,
        date: date.toISOString(),
        duration,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to check availability');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
}

/**
 * Créer un rendez-vous
 */
export async function createBooking(
  apiUrl: string,
  apiKey: string,
  formData: BookingFormData
): Promise<BookingResponse> {
  try {
    const response = await fetch(`${resolveApiUrl(apiUrl)}/api/public/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create',
        apiKey,
        clientFirstName: formData.clientFirstName,
        clientLastName: formData.clientLastName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        clientAddress: formData.clientAddress || undefined,
        startDate: formData.startDate.toISOString(),
        duration: formData.duration,
        title: formData.title,
        description: formData.description,
        note: formData.note || undefined,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to create booking',
      };
    }

    return {
      success: true,
      eventId: data.eventId,
      message: data.message,
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Vérifier la disponibilité de plusieurs créneaux en parallèle pour une journée
 * Retourne un objet clé = ISO string du slot, valeur = disponible ou non
 */
export async function checkDayAvailability(
  apiUrl: string,
  apiKey: string,
  slots: Date[],
  duration: number
): Promise<Record<string, boolean>> {
  const results = await Promise.allSettled(
    slots.map((slot) => checkAvailability(apiUrl, apiKey, slot, duration))
  );

  const availability: Record<string, boolean> = {};
  for (let i = 0; i < slots.length; i++) {
    const key = slots[i].toISOString();
    const result = results[i];
    availability[key] = result.status === 'fulfilled' && result.value.available;
  }

  return availability;
}

/**
 * Générer les créneaux horaires disponibles pour une journée
 */
export function generateTimeSlots(
  date: Date,
  startHour: string,
  endHour: string,
  intervalMinutes = 30
): Date[] {
  const slots: Date[] = [];
  const [startH, startM] = startHour.split(':').map(Number);
  const [endH, endM] = endHour.split(':').map(Number);

  const startTime = new Date(date);
  startTime.setHours(startH, startM, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(endH, endM, 0, 0);

  const currentTime = new Date(startTime);

  while (currentTime < endTime) {
    slots.push(new Date(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  return slots;
}

/**
 * Formater une date pour l'affichage
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Formater une heure pour l'affichage
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Vérifier si une date est un jour ouvrable
 */
export function isWorkingDay(date: Date, workingDays: number[]): boolean {
  const day = date.getDay();
  return workingDays.includes(day);
}
