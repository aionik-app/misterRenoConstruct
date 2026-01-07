export interface BookingFormData {
	clientFirstName: string;
	clientLastName: string;
	clientEmail: string;
	clientPhone: string;
	startDate: Date;
	duration: number;
	title?: string;
	description?: string;
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
