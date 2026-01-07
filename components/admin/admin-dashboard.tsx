"use client";

import {
	Calendar,
	Eye,
	FileText,
	ImageIcon,
	Key,
	LogOut,
	Palette,
	Phone,
	Save,
	Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reloadSiteConfig, saveSiteConfig } from "@/lib/site-data";
import type { SiteConfig } from "@/types/site-config";
import { AboutEditor } from "./editors/about-editor";
import { BookingEditor } from "./editors/booking-editor";
import { BrandingEditor } from "./editors/branding-editor";
import { ContactEditor } from "./editors/contact-editor";
import { FooterEditor } from "./editors/footer-editor";
import { GalleryEditor } from "./editors/gallery-editor";
import { HeroEditor } from "./editors/hero-editor";
import { MetadataEditor } from "./editors/metadata-editor";
import { SecurityEditor } from "./editors/security-editor";
import { ServicesEditor } from "./editors/services-editor";
import { ThemeEditor } from "./editors/theme-editor";

interface AdminDashboardProps {
	onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
	const [config, setConfig] = useState<SiteConfig | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [saveMessage, setSaveMessage] = useState("");
	const [activeTab, setActiveTab] = useState("metadata");

	useEffect(() => {
		const fetchConfig = async () => {
			try {
				const siteConfig = await reloadSiteConfig();
				setConfig(siteConfig);
			} catch (error) {
				console.error("Failed to load config:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchConfig();
	}, []);

	const handleSave = async () => {
		if (!config) return;

		setIsSaving(true);
		setSaveMessage("");

		try {
			const success = await saveSiteConfig(config);
			if (success) {
				setSaveMessage("Configuration sauvegardée avec succès !");
				setTimeout(() => setSaveMessage(""), 3000);
			} else {
				setSaveMessage("Erreur lors de la sauvegarde");
			}
		} catch {
			setSaveMessage("Erreur lors de la sauvegarde");
		} finally {
			setIsSaving(false);
		}
	};

	const handleLogout = async () => {
		try {
			await fetch("/api/admin/logout", { method: "POST" });
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			onLogout();
		}
	};

	const updateConfig = (updates: Partial<SiteConfig>) => {
		if (!config) return;
		setConfig({ ...config, ...updates });
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"/>
			</div>
		);
	}

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Alert variant="destructive" className="max-w-md">
					<AlertDescription>
						Impossible de charger la configuration
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	const tabs = [
		{ id: "metadata", label: "Métadonnées", icon: FileText },
		{ id: "branding", label: "Marque", icon: Settings },
		{ id: "theme", label: "Thème", icon: Palette },
		{ id: "contact", label: "Contact", icon: Phone },
		{ id: "hero", label: "Hero", icon: ImageIcon },
		{ id: "services", label: "Services", icon: Settings },
		{ id: "about", label: "À Propos", icon: FileText },
		{ id: "gallery", label: "Galerie", icon: ImageIcon },
		{ id: "footer", label: "Footer", icon: Settings },
		{ id: "booking", label: "Réservations", icon: Calendar },
		{ id: "security", label: "Sécurité", icon: Key },
	];

	return (
		<div className="min-h-screen bg-muted/30">
			{/* Header */}
			<header className="bg-background border-b border-border sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<div>
							<h1 className="text-2xl font-bold text-foreground">
								Administration
							</h1>
							<p className="text-muted-foreground">
								Gestion du contenu du site
							</p>
						</div>

						<div className="flex items-center gap-4">
							<Button variant="outline" asChild>
								<a
									href="/"
									target="_blank"
									className="flex items-center gap-2"
									rel="noreferrer"
								>
									<Eye className="h-4 w-4" />
									Voir le site
								</a>
							</Button>
							<Button
								onClick={handleSave}
								disabled={isSaving}
								className="flex items-center gap-2"
							>
								<Save className="h-4 w-4" />
								{isSaving ? "Sauvegarde..." : "Sauvegarder"}
							</Button>
							<Button
								variant="outline"
								onClick={handleLogout}
								className="flex items-center gap-2 bg-transparent"
							>
								<LogOut className="h-4 w-4" />
								Déconnexion
							</Button>
						</div>
					</div>
				</div>
			</header>

			{/* Save Message */}
			{saveMessage && (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
					<Alert
						className={
							saveMessage.includes("succès")
								? "border-green-200 bg-green-50"
								: "border-red-200 bg-red-50"
						}
					>
						<AlertDescription
							className={
								saveMessage.includes("succès")
									? "text-green-800"
									: "text-red-800"
							}
						>
							{saveMessage}
						</AlertDescription>
					</Alert>
				</div>
			)}

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="space-y-6"
				>
					{/* Tabs Navigation */}
					<Card className="border-0 shadow-sm">
						<CardContent className="p-6">
							<TabsList className="grid grid-cols-6 lg:grid-cols-11 gap-2 h-auto bg-transparent">
								{tabs.map((tab) => (
									<TabsTrigger
										key={tab.id}
										value={tab.id}
										className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
									>
										<tab.icon className="h-4 w-4" />
										<span className="text-xs">{tab.label}</span>
									</TabsTrigger>
								))}
							</TabsList>
						</CardContent>
					</Card>

					{/* Tab Contents */}
					<TabsContent value="metadata">
						<MetadataEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="branding">
						<BrandingEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="theme">
						<ThemeEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="contact">
						<ContactEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="hero">
						<HeroEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="services">
						<ServicesEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="about">
						<AboutEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="gallery">
						<GalleryEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="footer">
						<FooterEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="booking">
						<BookingEditor config={config} onUpdate={updateConfig} />
					</TabsContent>

					<TabsContent value="security">
						<SecurityEditor />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
