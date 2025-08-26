import { type NextRequest, NextResponse } from "next/server";
import { changeAdminCode, validateAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
	try {
		const token = request.cookies.get("admin-token")?.value;
		const ip =
			request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
			"unknown";
		const { currentCode, newCode } = await request.json();

		if (!token) {
			return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
		}

		// Validate session
		const isValidSession = await validateAdminSession(token, ip);
		if (!isValidSession) {
			return NextResponse.json({ error: "Session expirée" }, { status: 401 });
		}

		if (!currentCode || !newCode) {
			return NextResponse.json({ error: "Codes requis" }, { status: 400 });
		}

		if (newCode.length < 6) {
			return NextResponse.json(
				{ error: "Le nouveau code doit contenir au moins 6 caractères" },
				{ status: 400 },
			);
		}

		const success = await changeAdminCode(currentCode, newCode, ip);

		if (success) {
			const response = NextResponse.json({
				success: true,
				message: "Code d'accès modifié avec succès",
			});
			response.cookies.delete("admin-token"); // Force re-login
			return response;
		} else {
			return NextResponse.json(
				{ error: "Code actuel incorrect" },
				{ status: 400 },
			);
		}
	} catch (error) {
		console.error("Error changing admin code:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
