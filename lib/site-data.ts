import type { SiteConfig } from "@/types/site-config";

// Fonction pour charger la configuration du site
export async function loadSiteConfig(): Promise<SiteConfig> {
	try {
		const response = await fetch("/api/site-config");
		if (!response.ok) {
			throw new Error("Failed to load site configuration");
		}
		return await response.json();
	} catch (error) {
		console.error("Error loading site config:", error);
		// Fallback vers la configuration par défaut
		return await import("@/data/site-config.json").then(
			(module) => module.default,
		);
	}
}

// Fonction pour sauvegarder la configuration du site
export async function saveSiteConfig(config: SiteConfig): Promise<boolean> {
	try {
		const response = await fetch("/api/site-config", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(config),
		});
		return response.ok;
	} catch (error) {
		console.error("Error saving site config:", error);
		return false;
	}
}

// Fonction pour vérifier le code admin
export async function verifyAdminCode(code: string): Promise<boolean> {
	try {
		const response = await fetch("/api/admin/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ code }),
		});
		return response.ok;
	} catch (error) {
		console.error("Error verifying admin code:", error);
		return false;
	}
}

// Fonction pour générer une configuration par défaut
export function generateDefaultConfig(
	companyName: string,
	colors: { primary: string; secondary: string; accent: string },
): SiteConfig {
	return {
		version: "v1",
		theme: {
			primary: colors.primary,
			secondary: colors.secondary,
			accent: colors.accent,
		},
		metadata: {
			title: `${companyName} - Services de Jardinage Professionnel`,
			description: `Spécialiste en aménagement extérieur, tonte de pelouse, création de terrasses avec ${companyName}. Devis gratuit.`,
			keywords: [
				"jardinage",
				"tonte pelouse",
				"terrasse bois",
				"aménagement extérieur",
				"plantation",
				"gazon",
				"klinkers",
				"dalle romaine",
			],
		},
		branding: {
			companyName,
			logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=80&fit=crop",
			favicon:
				"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=32&h=32&fit=crop",
		},
		contact: {
			phone: "+33 1 23 45 67 89",
			email: `contact@${companyName.toLowerCase().replace(/\s+/g, "-")}.fr`,
			address: "123 Rue des Jardins",
			city: "Paris",
			postalCode: "75001",
		},
		hero: {
			title: "Transformez votre espace extérieur",
			subtitle: "Services de jardinage professionnel",
			description:
				"Nous créons et entretenons vos jardins avec passion. Tonte, aménagement, terrasses, plantation - Votre satisfaction est notre priorité.",
			backgroundImage:
				"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop",
			ctaText: "Devis Gratuit",
			ctaLink: "#contact",
		},
		services: [
			{
				id: "tonte-pelouse",
				title: "Tonte de Pelouse",
				description:
					"Entretien régulier de votre pelouse pour un gazon parfait toute l'année.",
				image:
					"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
				price: "À partir de 35€",
				features: [
					"Tonte professionnelle",
					"Ramassage des déchets",
					"Bordures nettes",
					"Conseils d'entretien",
				],
				icon: "🌱",
			},
			// ... autres services par défaut
		],
		about: {
			title: "Notre Expertise à Votre Service",
			description: `Avec ${companyName}, bénéficiez d'une expertise reconnue dans l'aménagement paysager.`,
			image:
				"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
			features: [
				"15 ans d'expérience",
				"Équipe certifiée",
				"Matériaux de qualité",
				"Devis gratuit",
			],
		},
		gallery: {
			title: "Nos Réalisations",
			images: [],
			categories: ["Aménagement", "Terrasses", "Pelouse", "Plantation"], // ✅ ajout
		},
		footer: {
			description:
				"Votre partenaire de confiance pour tous vos projets d'aménagement extérieur.",
			socialLinks: [],
			quickLinks: [
				{ title: "Nos Services", url: "#services" },
				{ title: "À Propos", url: "#about" },
				{ title: "Contact", url: "#contact" },
			],
		},
	};
}

// Fonction pour forcer le rechargement de la configuration du site
export async function reloadSiteConfig(): Promise<SiteConfig> {
	try {
		const response = await fetch("/api/site-config", {
			cache: "no-store",
			headers: {
				"Cache-Control": "no-cache",
			},
		});
		if (!response.ok) {
			throw new Error("Failed to reload site configuration");
		}
		return await response.json();
	} catch (error) {
		console.error("Error reloading site config:", error);
		// Fallback vers la configuration par défaut
		return await import("@/data/site-config.json").then(
			(module) => module.default,
		);
	}
}
