"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SiteConfig } from "@/types/site-config";

interface ContactEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function ContactEditor({ config, onUpdate }: ContactEditorProps) {
	const updateContact = (field: string, value: string) => {
		onUpdate({
			contact: {
				...config.contact,
				[field]: value,
			},
		});
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardHeader>
				<CardTitle>Informations de contact</CardTitle>
				<CardDescription>
					Configurez vos coordonnées et informations de contact
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label htmlFor="phone">Téléphone</Label>
						<Input
							id="phone"
							value={config.contact.phone}
							onChange={(e) => updateContact("phone", e.target.value)}
							placeholder="+33 1 23 45 67 89"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={config.contact.email}
							onChange={(e) => updateContact("email", e.target.value)}
							placeholder="contact@example.com"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="address">Adresse complète</Label>
					<Input
						id="address"
						value={config.contact.address}
						onChange={(e) => updateContact("address", e.target.value)}
						placeholder="123 Rue des Jardins"
					/>
					<p className="text-sm text-muted-foreground">
						Saisissez l'adresse complète de votre entreprise
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label htmlFor="city">Ville</Label>
						<Input
							id="city"
							value={config.contact.city}
							onChange={(e) => updateContact("city", e.target.value)}
							placeholder="Paris"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="postalCode">Code postal</Label>
						<Input
							id="postalCode"
							value={config.contact.postalCode}
							onChange={(e) => updateContact("postalCode", e.target.value)}
							placeholder="75001"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
