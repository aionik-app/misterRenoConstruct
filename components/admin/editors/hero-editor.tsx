"use client";

import Image from "next/image";
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

interface HeroEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function HeroEditor({ config, onUpdate }: HeroEditorProps) {
	const updateHero = (field: string, value: string) => {
		onUpdate({
			hero: {
				...config.hero,
				[field]: value,
			},
		});
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardHeader>
				<CardTitle>Section Hero</CardTitle>
				<CardDescription>
					Configurez la section principale de votre page d'accueil
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="heroTitle">Titre principal</Label>
					<Input
						id="heroTitle"
						value={config.hero.title}
						onChange={(e) => updateHero("title", e.target.value)}
						placeholder="Transformez votre espace extérieur"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="heroSubtitle">Sous-titre</Label>
					<Input
						id="heroSubtitle"
						value={config.hero.subtitle}
						onChange={(e) => updateHero("subtitle", e.target.value)}
						placeholder="Services de jardinage professionnel"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="heroDescription">Description</Label>
					<Textarea
						id="heroDescription"
						value={config.hero.description}
						onChange={(e) => updateHero("description", e.target.value)}
						placeholder="Description détaillée de vos services..."
						rows={3}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="heroBackground">Image de fond</Label>
					<Input
						id="heroBackground"
						value={config.hero.backgroundImage}
						onChange={(e) => updateHero("backgroundImage", e.target.value)}
						placeholder="https://example.com/hero-image.jpg"
					/>
					<p className="text-sm text-muted-foreground">
						URL de l'image de fond (format recommandé: JPG, taille: 1920x1080px)
					</p>
					{config.hero.backgroundImage && (
						<div className="mt-2">
							<Image
								src={config.hero.backgroundImage}
								alt="Aperçu de l'image hero"
								width={640}
								height={180}
								className="w-full max-w-md h-32 object-cover border border-border rounded"
								onError={() => {}}
							/>
						</div>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label htmlFor="ctaText">Texte du bouton</Label>
						<Input
							id="ctaText"
							value={config.hero.ctaText}
							onChange={(e) => updateHero("ctaText", e.target.value)}
							placeholder="Devis Gratuit"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="ctaLink">Lien du bouton</Label>
						<Input
							id="ctaLink"
							value={config.hero.ctaLink}
							onChange={(e) => updateHero("ctaLink", e.target.value)}
							placeholder="#contact"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
