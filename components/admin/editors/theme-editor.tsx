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

interface ThemeEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function ThemeEditor({ config, onUpdate }: ThemeEditorProps) {
	const updateTheme = (field: string, value: string) => {
		onUpdate({
			theme: {
				...config.theme,
				[field]: value,
			},
		});
	};

	const colorFields = [
		{
			key: "primaryColor",
			label: "Couleur principale",
			description: "Couleur des boutons et éléments importants",
		},
		{
			key: "secondaryColor",
			label: "Couleur secondaire",
			description: "Couleur des éléments secondaires",
		},
		{
			key: "accentColor",
			label: "Couleur d'accent",
			description: "Couleur pour les highlights et détails",
		},
		{
			key: "backgroundColor",
			label: "Couleur de fond",
			description: "Couleur de fond principale du site",
		},
		{
			key: "textColor",
			label: "Couleur du texte",
			description: "Couleur du texte principal",
		},
	];

	return (
		<Card className="border-0 shadow-lg">
			<CardHeader>
				<CardTitle>Thème et couleurs</CardTitle>
				<CardDescription>
					Personnalisez l'apparence visuelle de votre site
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{colorFields.map((field) => (
						<div key={field.key} className="space-y-2">
							<Label htmlFor={field.key}>{field.label}</Label>
							<div className="flex gap-2">
								<Input
									id={field.key}
									type="color"
									value={config.theme[field.key as keyof typeof config.theme]}
									onChange={(e) => updateTheme(field.key, e.target.value)}
									className="w-16 h-10 p-1 border-2"
								/>
								<Input
									value={config.theme[field.key as keyof typeof config.theme]}
									onChange={(e) => updateTheme(field.key, e.target.value)}
									placeholder="#000000"
									className="flex-1"
								/>
							</div>
							<p className="text-sm text-muted-foreground">
								{field.description}
							</p>
						</div>
					))}
				</div>

				{/* Color Preview */}
				<div className="mt-8">
					<Label>Aperçu des couleurs</Label>
					<div className="grid grid-cols-5 gap-4 mt-2">
						{colorFields.map((field) => (
							<div key={field.key} className="text-center">
								<div
									className="w-full h-16 rounded-lg border border-border mb-2"
									style={{
										backgroundColor:
											config.theme[field.key as keyof typeof config.theme],
									}}
								></div>
								<p className="text-xs text-muted-foreground">{field.label}</p>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
