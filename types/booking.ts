export interface BookingFormData {
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress?: string;
  startDate: Date;
  duration: number;
  title: string;
  description: string;
  note?: string;
}

export interface TimeSlot {
  startDate: string;
  endDate: string;
}

export interface AvailabilityResponse {
  available: boolean;
  message?: string;
  suggestedSlots?: TimeSlot[];
}

export interface BookingResponse {
  success: boolean;
  eventId?: string;
  message?: string;
  error?: string;
}
