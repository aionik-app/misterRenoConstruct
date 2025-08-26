"use client";

import { Plus, X } from "lucide-react";
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

interface MetadataEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function MetadataEditor({ config, onUpdate }: MetadataEditorProps) {
	const [newKeyword, setNewKeyword] = useState("");

	const updateMetadata = (field: string, value: string) => {
		onUpdate({
			metadata: {
				...config.metadata,
				[field]: value,
			},
		});
	};

	const addKeyword = () => {
		if (
			newKeyword.trim() &&
			!config.metadata.keywords.includes(newKeyword.trim())
		) {
			onUpdate({
				metadata: {
					...config.metadata,
					keywords: [...config.metadata.keywords, newKeyword.trim()],
				},
			});
			setNewKeyword("");
		}
	};

	const removeKeyword = (keyword: string) => {
		onUpdate({
			metadata: {
				...config.metadata,
				keywords: config.metadata.keywords.filter((k) => k !== keyword),
			},
		});
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardHeader>
				<CardTitle>Métadonnées SEO</CardTitle>
				<CardDescription>
					Configurez les informations de base du site pour le référencement et
					les réseaux sociaux
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="title">Titre du site</Label>
					<Input
						id="title"
						value={config.metadata.title}
						onChange={(e) => updateMetadata("title", e.target.value)}
						placeholder="Titre principal du site"
					/>
					<p className="text-sm text-muted-foreground">
						Affiché dans l'onglet du navigateur et les résultats de recherche
					</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						value={config.metadata.description}
						onChange={(e) => updateMetadata("description", e.target.value)}
						placeholder="Description du site pour les moteurs de recherche"
						rows={3}
					/>
					<p className="text-sm text-muted-foreground">
						Résumé du site affiché dans les résultats de recherche (150-160
						caractères recommandés)
					</p>
				</div>

				<div className="space-y-4">
					<Label>Mots-clés SEO</Label>
					<div className="flex flex-wrap gap-2 mb-3">
						{config.metadata.keywords.map((keyword) => (
							<Badge
								key={keyword}
								variant="secondary"
								className="flex items-center gap-1"
							>
								{keyword}
								<Button
									variant="ghost"
									size="sm"
									className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
									onClick={() => removeKeyword(keyword)}
								>
									<X className="h-3 w-3" />
								</Button>
							</Badge>
						))}
					</div>
					<div className="flex gap-2">
						<Input
							value={newKeyword}
							onChange={(e) => setNewKeyword(e.target.value)}
							placeholder="Ajouter un mot-clé"
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									addKeyword();
								}
							}}
						/>
						<Button onClick={addKeyword} size="sm">
							<Plus className="h-4 w-4" />
						</Button>
					</div>
					<p className="text-sm text-muted-foreground">
						Mots-clés importants pour le référencement de votre site
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
