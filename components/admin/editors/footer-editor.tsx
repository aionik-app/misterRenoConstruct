"use client";
import { Plus, Trash2 } from "lucide-react";
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
import type { QuickLink, SiteConfig, SocialLink } from "@/types/site-config";

interface FooterEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function FooterEditor({ config, onUpdate }: FooterEditorProps) {
	const updateFooter = (
		field: string,
		value: string | SocialLink[] | QuickLink[],
	) => {
		onUpdate({
			footer: {
				...config.footer,
				[field]: value,
			},
		});
	};

	const updateSocialLink = (index: number, field: string, value: string) => {
		const updatedLinks = [...config.footer.socialLinks];
		updatedLinks[index] = {
			...updatedLinks[index],
			[field]: value,
		};
		updateFooter("socialLinks", updatedLinks);
	};

	const addSocialLink = () => {
		const newLink: SocialLink = {
			platform: "",
			url: "",
			icon: "facebook",
		};
		updateFooter("socialLinks", [...config.footer.socialLinks, newLink]);
	};

	const removeSocialLink = (index: number) => {
		const updatedLinks = config.footer.socialLinks.filter(
			(_, i) => i !== index,
		);
		updateFooter("socialLinks", updatedLinks);
	};

	const updateQuickLink = (index: number, field: string, value: string) => {
		const updatedLinks = [...config.footer.quickLinks];
		updatedLinks[index] = {
			...updatedLinks[index],
			[field]: value,
		};
		updateFooter("quickLinks", updatedLinks);
	};

	const addQuickLink = () => {
		const newLink: QuickLink = {
			title: "",
			url: "",
		};
		updateFooter("quickLinks", [...config.footer.quickLinks, newLink]);
	};

	const removeQuickLink = (index: number) => {
		const updatedLinks = config.footer.quickLinks.filter((_, i) => i !== index);
		updateFooter("quickLinks", updatedLinks);
	};

	const socialIcons = [
		{ value: "facebook", label: "Facebook" },
		{ value: "instagram", label: "Instagram" },
		{ value: "linkedin", label: "LinkedIn" },
		{ value: "twitter", label: "Twitter" },
		{ value: "youtube", label: "YouTube" },
	];

	return (
		<div className="space-y-6">
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<CardTitle>Footer</CardTitle>
					<CardDescription>
						Configurez le pied de page de votre site
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="footerDescription">Description</Label>
						<Textarea
							id="footerDescription"
							value={config.footer.description}
							onChange={(e) => updateFooter("description", e.target.value)}
							placeholder="Description de votre entreprise dans le footer"
							rows={3}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Social Links */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<div className="flex justify-between items-center">
						<div>
							<CardTitle>Réseaux sociaux</CardTitle>
							<CardDescription>
								Liens vers vos profils sur les réseaux sociaux
							</CardDescription>
						</div>
						<Button
							onClick={addSocialLink}
							size="sm"
							className="flex items-center gap-2"
						>
							<Plus className="h-4 w-4" />
							Ajouter
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{config.footer.socialLinks.map((link, index) => (
						<div key={index} className="flex gap-4 items-end">
							<div className="flex-1 space-y-2">
								<Label>Plateforme</Label>
								<select
									value={link.icon}
									onChange={(e) =>
										updateSocialLink(index, "icon", e.target.value)
									}
									className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
								>
									{socialIcons.map((icon) => (
										<option key={icon.value} value={icon.value}>
											{icon.label}
										</option>
									))}
								</select>
							</div>
							<div className="flex-2 space-y-2">
								<Label>URL</Label>
								<Input
									value={link.url}
									onChange={(e) =>
										updateSocialLink(index, "url", e.target.value)
									}
									placeholder="https://facebook.com/votre-page"
								/>
							</div>
							<Button
								variant="destructive"
								size="sm"
								onClick={() => removeSocialLink(index)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Quick Links */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<div className="flex justify-between items-center">
						<div>
							<CardTitle>Liens rapides</CardTitle>
							<CardDescription>
								Liens de navigation dans le footer
							</CardDescription>
						</div>
						<Button
							onClick={addQuickLink}
							size="sm"
							className="flex items-center gap-2"
						>
							<Plus className="h-4 w-4" />
							Ajouter
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{config.footer.quickLinks.map((link, index) => (
						<div key={index} className="flex gap-4 items-end">
							<div className="flex-1 space-y-2">
								<Label>Titre</Label>
								<Input
									value={link.title}
									onChange={(e) =>
										updateQuickLink(index, "title", e.target.value)
									}
									placeholder="Nos Services"
								/>
							</div>
							<div className="flex-1 space-y-2">
								<Label>Lien</Label>
								<Input
									value={link.url}
									onChange={(e) =>
										updateQuickLink(index, "url", e.target.value)
									}
									placeholder="#services"
								/>
							</div>
							<Button
								variant="destructive"
								size="sm"
								onClick={() => removeQuickLink(index)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
