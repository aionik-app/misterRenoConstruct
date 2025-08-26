import { promises as fs } from "fs";
import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import type { SiteConfig } from "@/types/site-config";

const CONFIG_PATH = path.join(process.cwd(), "data", "site-config.json");

export async function GET() {
	try {
		const fileContents = await fs.readFile(CONFIG_PATH, "utf8");
		const config: SiteConfig = JSON.parse(fileContents);
		return NextResponse.json(config);
	} catch (error) {
		console.error("Error reading site config:", error);
		return NextResponse.json(
			{ error: "Failed to load site configuration" },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const config: SiteConfig = await request.json();

		if (!config.branding?.companyName) {
			return NextResponse.json(
				{ error: "Invalid configuration data" },
				{ status: 400 },
			);
		}

		const validateImageUrl = (url: string) => {
			try {
				new URL(url);
				return true;
			} catch {
				return false;
			}
		};

		// Validation des images dans la galerie
		if (config.gallery?.images) {
			for (const image of config.gallery.images) {
				if (!validateImageUrl(image.url)) {
					return NextResponse.json(
						{
							error: `URL d'image invalide: ${image.url}`,
						},
						{ status: 400 },
					);
				}
			}
		}

		config.lastModified = new Date().toISOString();

		// Sauvegarde du fichier avec formatage propre
		await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf8");

		return NextResponse.json({
			success: true,
			message: "Configuration sauvegardée avec succès",
			lastModified: config.lastModified,
		});
	} catch (error) {
		console.error("Error saving site config:", error);
		return NextResponse.json(
			{
				error: "Failed to save site configuration",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
