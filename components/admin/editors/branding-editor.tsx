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
import type { SiteConfig } from "@/types/site-config";

interface BrandingEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function BrandingEditor({ config, onUpdate }: BrandingEditorProps) {
	const updateBranding = (field: string, value: string) => {
		onUpdate({
			branding: {
				...config.branding,
				[field]: value,
			},
		});
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardHeader>
				<CardTitle>Identité de marque</CardTitle>
				<CardDescription>
					Configurez le nom de votre entreprise et les éléments visuels
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="companyName">Nom de l'entreprise</Label>
					<Input
						id="companyName"
						value={config.branding.companyName}
						onChange={(e) => updateBranding("companyName", e.target.value)}
						placeholder="Nom de votre entreprise"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="logo">URL du logo</Label>
					<Input
						id="logo"
						value={config.branding.logo}
						onChange={(e) => updateBranding("logo", e.target.value)}
						placeholder="https://example.com/logo.png"
					/>
					<p className="text-sm text-muted-foreground">
						Lien vers votre logo (format recommandé: PNG ou SVG, taille:
						200x80px)
					</p>
					{config.branding.logo && (
						<div className="mt-2 h-12 w-auto relative">
							<Image
								src={config.branding.logo}
								alt="Aperçu du logo"
								fill
								className="object-contain"
								onError={(e) => {
									e.currentTarget.style.display = "none";
								}}
							/>
						</div>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="favicon">URL du favicon</Label>
					<Input
						id="favicon"
						value={config.branding.favicon}
						onChange={(e) => updateBranding("favicon", e.target.value)}
						placeholder="https://example.com/favicon.ico"
					/>
					<p className="text-sm text-muted-foreground">
						Icône affichée dans l'onglet du navigateur (format: ICO ou PNG,
						taille: 32x32px)
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
