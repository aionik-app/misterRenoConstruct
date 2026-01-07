"use client";

import { useState } from "react";
import { DateTimePicker } from "./date-time-picker";
import {
	checkAvailability,
	createBooking,
	formatDate,
	formatTime,
} from "@/lib/booking";
import type { BookingConfig } from "@/types/site-config";
import type { BookingFormData } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BookingFormProps {
	config: BookingConfig;
}

type BookingStep = "datetime" | "form" | "confirmation" | "success";

export function BookingForm({ config }: BookingFormProps) {
	const [step, setStep] = useState<BookingStep>("datetime");
	const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [eventId, setEventId] = useState<string | null>(null);

	const [formData, setFormData] = useState<Partial<BookingFormData>>({
		clientFirstName: "",
		clientLastName: "",
		clientEmail: "",
		clientPhone: "",
		description: "",
	});

	// Gérer le changement de date/heure
	const handleDateTimeChange = (date: Date) => {
		setSelectedDateTime(date);
		setError(null);
	};

	// Passer à l'étape du formulaire
	const handleContinueToForm = async () => {
		if (!selectedDateTime) {
			setError("Veuillez sélectionner une date et une heure");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			// Vérifier la disponibilité
			const availability = await checkAvailability(
				config.apiUrl,
				config.apiKey,
				selectedDateTime,
				config.defaultDuration,
			);

			if (availability.available) {
				setStep("form");
			} else {
				setError(availability.message || "Ce créneau n'est pas disponible");
			}
		} catch (err) {
			setError("Erreur lors de la vérification de disponibilité");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// Gérer les changements du formulaire
	const handleFormChange = (field: keyof BookingFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	// Valider le formulaire
	const validateForm = (): boolean => {
		if (
			!formData.clientFirstName ||
			!formData.clientLastName ||
			!formData.clientEmail ||
			!formData.clientPhone
		) {
			setError("Veuillez remplir tous les champs obligatoires");
			return false;
		}

		// Validation email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.clientEmail)) {
			setError("Veuillez entrer une adresse email valide");
			return false;
		}

		return true;
	};

	// Passer à l'étape de confirmation
	const handleContinueToConfirmation = () => {
		if (validateForm()) {
			setError(null);
			setStep("confirmation");
		}
	};

	// Soumettre la réservation
	const handleSubmit = async () => {
		if (!selectedDateTime) return;

		setLoading(true);
		setError(null);

		try {
			const result = await createBooking(config.apiUrl, config.apiKey, {
				...formData,
				startDate: selectedDateTime,
				duration: config.defaultDuration,
			} as BookingFormData);

			if (result.success && result.eventId) {
				setEventId(result.eventId);
				setStep("success");
			} else {
				setError(result.error || "Erreur lors de la création du rendez-vous");
			}
		} catch (err) {
			setError("Erreur lors de la création du rendez-vous");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// Réinitialiser le formulaire
	const handleReset = () => {
		setStep("datetime");
		setSelectedDateTime(null);
		setFormData({
			clientFirstName: "",
			clientLastName: "",
			clientEmail: "",
			clientPhone: "",
			description: "",
		});
		setError(null);
		setEventId(null);
	};

	return (
		<div className="max-w-2xl mx-auto px-4 py-12">
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Prendre rendez-vous</CardTitle>
				</CardHeader>
				<CardContent>
					{error && (
						<Alert variant="destructive" className="mb-4">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{/* Étape 1: Sélection date/heure */}
					{step === "datetime" && (
						<div>
							<DateTimePicker
								config={config}
								selectedDateTime={selectedDateTime}
								onDateTimeChange={handleDateTimeChange}
							/>

							{selectedDateTime && (
								<div className="mt-6">
									<p className="text-sm mb-4">
										Créneau sélectionné:{" "}
										<strong>{formatDate(selectedDateTime)}</strong> à{" "}
										<strong>{formatTime(selectedDateTime)}</strong>
									</p>
									<Button
										onClick={handleContinueToForm}
										disabled={loading}
										className="w-full"
									>
										{loading ? "Vérification..." : "Continuer"}
									</Button>
								</div>
							)}
						</div>
					)}

					{/* Étape 2: Formulaire */}
					{step === "form" && (
						<div className="space-y-4">
							<Button
								variant="ghost"
								onClick={() => setStep("datetime")}
								className="mb-4"
							>
								← Changer la date
							</Button>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="firstName">Prénom *</Label>
									<Input
										id="firstName"
										type="text"
										value={formData.clientFirstName}
										onChange={(e) =>
											handleFormChange("clientFirstName", e.target.value)
										}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">Nom *</Label>
									<Input
										id="lastName"
										type="text"
										value={formData.clientLastName}
										onChange={(e) =>
											handleFormChange("clientLastName", e.target.value)
										}
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email *</Label>
								<Input
									id="email"
									type="email"
									value={formData.clientEmail}
									onChange={(e) =>
										handleFormChange("clientEmail", e.target.value)
									}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="phone">Téléphone *</Label>
								<Input
									id="phone"
									type="tel"
									value={formData.clientPhone}
									onChange={(e) =>
										handleFormChange("clientPhone", e.target.value)
									}
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Message (optionnel)</Label>
								<Textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										handleFormChange("description", e.target.value)
									}
									rows={4}
								/>
							</div>

							<Button
								onClick={handleContinueToConfirmation}
								className="w-full"
							>
								Confirmer les informations
							</Button>
						</div>
					)}

					{/* Étape 3: Confirmation */}
					{step === "confirmation" && selectedDateTime && (
						<div className="space-y-4">
							<h3 className="text-xl font-semibold mb-4">
								Récapitulatif de votre rendez-vous
							</h3>

							<div className="bg-muted p-4 rounded space-y-2">
								<p>
									<strong>Date:</strong> {formatDate(selectedDateTime)}
								</p>
								<p>
									<strong>Heure:</strong> {formatTime(selectedDateTime)}
								</p>
								<p>
									<strong>Durée:</strong> {config.defaultDuration} minutes
								</p>
								<p>
									<strong>Nom:</strong> {formData.clientFirstName}{" "}
									{formData.clientLastName}
								</p>
								<p>
									<strong>Email:</strong> {formData.clientEmail}
								</p>
								<p>
									<strong>Téléphone:</strong> {formData.clientPhone}
								</p>
								{formData.description && (
									<p>
										<strong>Message:</strong> {formData.description}
									</p>
								)}
							</div>

							<div className="flex gap-4">
								<Button
									variant="outline"
									onClick={() => setStep("form")}
									className="flex-1"
								>
									Modifier
								</Button>
								<Button
									onClick={handleSubmit}
									disabled={loading}
									className="flex-1"
								>
									{loading ? "Confirmation..." : "Confirmer le rendez-vous"}
								</Button>
							</div>
						</div>
					)}

					{/* Étape 4: Succès */}
					{step === "success" && (
						<div className="text-center py-8">
							<div className="text-6xl mb-4">✅</div>
							<h3 className="text-2xl font-bold mb-4">Rendez-vous confirmé !</h3>
							<p className="text-muted-foreground mb-6">
								Votre rendez-vous a été enregistré avec succès. Vous recevrez
								une confirmation par email à {formData.clientEmail}.
							</p>
							<p className="text-sm text-muted-foreground mb-6">
								Référence: {eventId}
							</p>
							<Button onClick={handleReset}>
								Prendre un nouveau rendez-vous
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
