"use client";

import { useEffect, useState } from "react";
import { About } from "@/components/about";
import { BookingForm } from "@/components/booking/booking-form";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { reloadSiteConfig } from "@/lib/site-data";
import type { SiteConfig } from "@/types/site-config";

export default function HomePage() {
	const [config, setConfig] = useState<SiteConfig | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadConfig = async () => {
			try {
				const siteConfig = await reloadSiteConfig();
				setConfig(siteConfig);
			} catch (error) {
				console.error("Failed to load site configuration:", error);
			} finally {
				setLoading(false);
			}
		};

		loadConfig();

		const handleFocus = () => {
			loadConfig();
		};

		window.addEventListener("focus", handleFocus);
		return () => window.removeEventListener("focus", handleFocus);
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"/>
			</div>
		);
	}

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-destructive mb-4">
						Erreur de configuration
					</h1>
					<p className="text-muted-foreground">
						Impossible de charger la configuration du site.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<Header config={config} />
			<main>
				<Hero config={config} />
				<Services config={config} />
				<About config={config} />
				<Gallery config={config} />
				<Contact config={config} />
				{config.booking?.enabled && (
					<section id="booking">
						<BookingForm config={config.booking} />
					</section>
				)}
			</main>
			<Footer config={config} />
		</div>
	);
}
