"use client";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
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
import type { GalleryImage, SiteConfig } from "@/types/site-config";

interface GalleryEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function GalleryEditor({ config, onUpdate }: GalleryEditorProps) {
	const updateGallery = (field: string, value: any) => {
		onUpdate({
			gallery: {
				...config.gallery,
				[field]: value,
			},
		});
	};

	// -------- Gestion des catégories dynamiques ----------
	const addCategory = () => {
		updateGallery("categories", [
			...(config.gallery.categories || []),
			"Nouvelle catégorie",
		]);
	};

	const updateCategory = (index: number, value: string) => {
		const updated = [...(config.gallery.categories || [])];
		updated[index] = value;
		updateGallery("categories", updated);
	};

	const removeCategory = (index: number) => {
		const updated = (config.gallery.categories || []).filter(
			(_, i) => i !== index,
		);
		updateGallery("categories", updated);

		// On supprime aussi cette catégorie des images si elles l’utilisaient
		const updatedImages = config.gallery.images.map((img) =>
			img.category === config.gallery.categories[index]
				? { ...img, category: "" }
				: img,
		);
		updateGallery("images", updatedImages);
	};

	// -------- Gestion des images ----------
	const updateImage = (index: number, field: string, value: string) => {
		const updatedImages = [...config.gallery.images];
		updatedImages[index] = {
			...updatedImages[index],
			[field]: value,
		};
		updateGallery("images", updatedImages);
	};

	const addImage = () => {
		const newImage: GalleryImage = {
			id: `image-${Date.now()}`,
			url: "",
			alt: "",
			category: "",
			title: "",
		};
		updateGallery("images", [...config.gallery.images, newImage]);
	};

	const removeImage = (index: number) => {
		const updatedImages = config.gallery.images.filter((_, i) => i !== index);
		updateGallery("images", updatedImages);
	};

	return (
		<div className="space-y-6">
			{/* Section Titre Galerie */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<div className="flex justify-between items-center">
						<div>
							<CardTitle>Galerie</CardTitle>
							<CardDescription>
								Gérez les images et les catégories de vos réalisations
							</CardDescription>
						</div>
						<Button onClick={addImage} className="flex items-center gap-2">
							<Plus className="h-4 w-4" />
							Ajouter une image
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Label htmlFor="galleryTitle">Titre de la section</Label>
						<Input
							id="galleryTitle"
							value={config.gallery.title}
							onChange={(e) => updateGallery("title", e.target.value)}
							placeholder="Nos Réalisations"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Section Catégories */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle>Catégories</CardTitle>
						<Button onClick={addCategory} className="flex items-center gap-2">
							<Plus className="h-4 w-4" />
							Ajouter une catégorie
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{(config.gallery.categories || []).map((cat, index) => (
						<div key={index} className="flex items-center gap-2">
							<Input
								value={cat}
								onChange={(e) => updateCategory(index, e.target.value)}
								placeholder="Nom de la catégorie"
							/>
							<Button
								variant="destructive"
								size="sm"
								onClick={() => removeCategory(index)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Section Images */}
			{config.gallery.images.map((image, index) => (
				<Card key={image.id} className="border-0 shadow-lg">
					<CardHeader>
						<div className="flex justify-between items-center">
							<CardTitle className="text-lg">Image {index + 1}</CardTitle>
							<Button
								variant="destructive"
								size="sm"
								onClick={() => removeImage(index)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>URL de l'image</Label>
							<Input
								value={image.url}
								onChange={(e) => updateImage(index, "url", e.target.value)}
								placeholder="https://example.com/image.jpg"
							/>
							{image.url && (
								<div className="w-full max-w-sm h-32 relative border border-border rounded mt-2 overflow-hidden">
									<Image
										src={image.url}
										alt={image.alt || "Aperçu"}
										fill
										style={{ objectFit: "cover" }}
										onError={() =>
											console.warn("Erreur de chargement de l'image")
										}
										sizes="(max-width: 640px) 100vw, 640px"
									/>
								</div>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Titre</Label>
								<Input
									value={image.title || ""}
									onChange={(e) => updateImage(index, "title", e.target.value)}
									placeholder="Titre de l'image"
								/>
							</div>

							<div className="space-y-2">
								<Label>Catégorie</Label>
								<select
									value={image.category || ""}
									onChange={(e) =>
										updateImage(index, "category", e.target.value)
									}
									className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
								>
									<option value="">— Aucune —</option>
									{(config.gallery.categories || []).map((cat, i) => (
										<option key={i} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="space-y-2">
							<Label>Texte alternatif</Label>
							<Input
								value={image.alt}
								onChange={(e) => updateImage(index, "alt", e.target.value)}
								placeholder="Description de l'image pour l'accessibilité"
							/>
							<p className="text-sm text-muted-foreground">
								Description de l'image pour les lecteurs d'écran et le SEO
							</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
