"use client";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { SiteConfig } from "@/types/site-config";

interface AboutEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function AboutEditor({ config, onUpdate }: AboutEditorProps) {
	const [newFeature, setNewFeature] = useState("");

	const updateAbout = (field: string, value: string | string[]) => {
		onUpdate({
			about: {
				...config.about,
				[field]: value,
			},
		});
	};

	const addFeature = () => {
		if (
			newFeature.trim() &&
			!config.about.features.includes(newFeature.trim())
		) {
			updateAbout("features", [...config.about.features, newFeature.trim()]);
			setNewFeature("");
		}
	};

	const removeFeature = (feature: string) => {
		updateAbout(
			"features",
			config.about.features.filter((f) => f !== feature),
		);
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardHeader>
				<CardTitle>Section À Propos</CardTitle>
				<CardDescription>
					Présentez votre entreprise et votre expertise
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="aboutTitle">Titre</Label>
					<Input
						id="aboutTitle"
						value={config.about.title}
						onChange={(e) => updateAbout("title", e.target.value)}
						placeholder="Notre Expertise à Votre Service"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="aboutDescription">Description</Label>
					<Textarea
						id="aboutDescription"
						value={config.about.description}
						onChange={(e) => updateAbout("description", e.target.value)}
						placeholder="Présentez votre entreprise, votre histoire et votre expertise..."
						rows={4}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="aboutImage">Image</Label>
					<Input
						id="aboutImage"
						value={config.about.image}
						onChange={(e) => updateAbout("image", e.target.value)}
						placeholder="https://example.com/about-image.jpg"
					/>
					<p className="text-sm text-muted-foreground">
						Image représentant votre équipe ou votre travail (format recommandé:
						JPG, taille: 600x400px)
					</p>
					{config.about.image && (
						<div className="mt-2 relative w-full max-w-md h-48">
							<Image
								src={config.about.image}
								alt="Aperçu de l'image à propos"
								fill
								className="object-cover rounded border border-border"
								onError={(e) => {
									e.currentTarget.style.display = "none";
								}}
							/>
						</div>
					)}
				</div>

				<div className="space-y-4">
					<Label>Points forts</Label>
					<div className="flex flex-wrap gap-2 mb-3">
						{config.about.features.map((feature) => (
							<Badge
								key={feature}
								variant="secondary"
								className="flex items-center gap-1"
							>
								{feature}
								<Button
									variant="ghost"
									size="sm"
									className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
									onClick={() => removeFeature(feature)}
								>
									<X className="h-3 w-3" />
								</Button>
							</Badge>
						))}
					</div>
					<div className="flex gap-2">
						<Input
							value={newFeature}
							onChange={(e) => setNewFeature(e.target.value)}
							placeholder="Ajouter un point fort"
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									addFeature();
								}
							}}
						/>
						<Button onClick={addFeature} size="sm">
							<Plus className="h-4 w-4" />
						</Button>
					</div>
					<p className="text-sm text-muted-foreground">
						Points forts et avantages de votre entreprise (ex: "15 ans
						d'expérience", "Équipe certifiée")
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
