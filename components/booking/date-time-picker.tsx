"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";
import { addMonths } from "date-fns";
import { formatTime, generateTimeSlots, isWorkingDay } from "@/lib/booking";
import type { BookingConfig } from "@/types/site-config";
import { Label } from "@/components/ui/label";

interface DateTimePickerProps {
	config: BookingConfig;
	selectedDateTime: Date | null;
	onDateTimeChange: (date: Date) => void;
}

export function DateTimePicker({
	config,
	selectedDateTime,
	onDateTimeChange,
}: DateTimePickerProps) {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		selectedDateTime || undefined,
	);
	const [selectedTime, setSelectedTime] = useState<Date | null>(
		selectedDateTime || null,
	);

	const workingDays = config.workingDays || [1, 2, 3, 4, 5]; // Lun-Ven par défaut

	// Filtrer les jours non ouvrables
	const disabledDays = (date: Date) => {
		return !isWorkingDay(date, workingDays);
	};

	// Gérer la sélection de date
	const handleDateChange = (date: Date | undefined) => {
		if (date) {
			setSelectedDate(date);
			setSelectedTime(null); // Réinitialiser l'heure
		}
	};

	// Gérer la sélection d'heure
	const handleTimeChange = (time: Date) => {
		setSelectedTime(time);
		onDateTimeChange(time);
	};

	// Générer les créneaux horaires
	const timeSlots = selectedDate
		? generateTimeSlots(
				selectedDate,
				config.workingHours.start,
				config.workingHours.end,
				30,
			)
		: [];

	return (
		<div className="space-y-6">
			{/* Sélecteur de date */}
			<div>
				<Label className="block text-sm font-medium mb-2">
					Sélectionnez une date
				</Label>
				<div className="flex justify-center">
					<DayPicker
						mode="single"
						selected={selectedDate}
						onSelect={handleDateChange}
						disabled={disabledDays}
						fromDate={new Date()}
						toDate={addMonths(new Date(), 3)}
						locale={fr}
						className="border rounded-lg p-3"
						classNames={{
							months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
							month: "space-y-4",
							caption: "flex justify-center pt-1 relative items-center",
							caption_label: "text-sm font-medium",
							nav: "space-x-1 flex items-center",
							nav_button:
								"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
							nav_button_previous: "absolute left-1",
							nav_button_next: "absolute right-1",
							table: "w-full border-collapse space-y-1",
							head_row: "flex",
							head_cell:
								"text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
							row: "flex w-full mt-2",
							cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
							day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
							day_range_end: "day-range-end",
							day_selected:
								"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
							day_today: "bg-accent text-accent-foreground",
							day_outside:
								"day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
							day_disabled: "text-muted-foreground opacity-50",
							day_range_middle:
								"aria-selected:bg-accent aria-selected:text-accent-foreground",
							day_hidden: "invisible",
						}}
					/>
				</div>
			</div>

			{/* Sélecteur d'heure */}
			{selectedDate && (
				<div>
					<Label className="block text-sm font-medium mb-2">
						Sélectionnez une heure
					</Label>
					<div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
						{timeSlots.map((slot, index) => {
							const isSelected =
								selectedTime && slot.getTime() === selectedTime.getTime();
							return (
								<button
									key={index}
									type="button"
									onClick={() => handleTimeChange(slot)}
									className={`
										px-4 py-2 rounded border transition-colors text-sm
										${
											isSelected
												? "bg-primary text-primary-foreground border-primary"
												: "bg-background border-input hover:border-primary hover:bg-accent"
										}
									`}
								>
									{formatTime(slot)}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
