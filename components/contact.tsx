"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteConfig } from "@/types/site-config";

interface ContactV2Props {
	config: SiteConfig;
}

export function Contact({ config }: ContactV2Props) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<section id="contact" className="py-24 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
						Contact
					</div>
					<h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
						Parlons de votre projet
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Prêt à transformer votre espace extérieur ? Contactez-nous pour un
						devis personnalisé et gratuit
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					{/* Contact Form */}
					<div className="lg:col-span-8">
						<Card className="border-0 shadow-xl">
							<CardContent className="p-8 lg:p-12">
								<h3 className="text-2xl font-bold text-foreground mb-8">
									Demande de devis gratuit
								</h3>

								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<Label htmlFor="name" className="text-sm font-medium">
												Nom complet *
											</Label>
											<Input
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												required
												className="rounded-xl border-0 bg-muted/50 focus:bg-background transition-colors"
												placeholder="Votre nom"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email" className="text-sm font-medium">
												Email *
											</Label>
											<Input
												id="email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
												required
												className="rounded-xl border-0 bg-muted/50 focus:bg-background transition-colors"
												placeholder="votre@email.com"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<Label htmlFor="phone" className="text-sm font-medium">
												Téléphone
											</Label>
											<Input
												id="phone"
												name="phone"
												type="tel"
												value={formData.phone}
												onChange={handleChange}
												className="rounded-xl border-0 bg-muted/50 focus:bg-background transition-colors"
												placeholder="06 12 34 56 78"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="service" className="text-sm font-medium">
												Service souhaité
											</Label>
											<select
												id="service"
												name="service"
												value={formData.service}
												onChange={handleChange}
												className="w-full px-4 py-3 rounded-xl border-0 bg-muted/50 focus:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
											>
												<option value="">Sélectionnez un service</option>
												{config.services.map((service) => (
													<option key={service.id} value={service.title}>
														{service.title}
													</option>
												))}
											</select>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="message" className="text-sm font-medium">
											Décrivez votre projet *
										</Label>
										<Textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											required
											rows={6}
											className="rounded-xl border-0 bg-muted/50 focus:bg-background transition-colors resize-none"
											placeholder="Décrivez votre projet en détail : surface, type d'aménagement souhaité, budget approximatif..."
										/>
									</div>

									<Button type="submit" size="lg" className="w-full rounded-xl">
										<Send className="mr-2 h-5 w-5" />
										Envoyer ma demande
									</Button>

									<p className="text-sm text-muted-foreground text-center">
										* Champs obligatoires - Réponse garantie sous 24h
									</p>
								</form>
							</CardContent>
						</Card>
					</div>

					{/* Contact Info */}
					<div className="lg:col-span-4 space-y-6">
						{/* Contact Cards */}
						<Card className="border-0 shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
										<Phone className="h-6 w-6 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold text-foreground">Téléphone</h4>
										<p className="text-muted-foreground text-sm">
											Appelez-nous directement
										</p>
									</div>
								</div>
								<p className="text-foreground font-medium text-lg">
									{config.contact.phone}
								</p>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
										<Mail className="h-6 w-6 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold text-foreground">Email</h4>
										<p className="text-muted-foreground text-sm">
											Écrivez-nous
										</p>
									</div>
								</div>
								<p className="text-foreground font-medium">
									{config.contact.email}
								</p>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
										<MapPin className="h-6 w-6 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold text-foreground">Adresse</h4>
										<p className="text-muted-foreground text-sm">
											Venez nous voir
										</p>
									</div>
								</div>
								<p className="text-foreground font-medium">
									{config.contact.address}
									<br />
									{config.contact.postalCode} {config.contact.city}
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
