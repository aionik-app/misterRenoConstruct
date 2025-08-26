import { type NextRequest, NextResponse } from "next/server";
import { cleanupExpiredSessions, verifyAdminCode } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
	try {
		const { code } = await request.json();
		const ip =
			request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
			"unknown";

		if (!code) {
			return NextResponse.json({ error: "Code is required" }, { status: 400 });
		}

		// Cleanup expired sessions
		await cleanupExpiredSessions();

		const result = await verifyAdminCode(code, ip);

		if (result.success) {
			const response = NextResponse.json({
				success: true,
				message: "Connexion réussie",
			});

			// Set secure HTTP-only cookie
			response.cookies.set("admin-token", result.token!, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 60 * 60, // 1 hour
			});

			return response;
		} else {
			return NextResponse.json(
				{
					error: result.message || "Code d'accès invalide",
				},
				{ status: 401 },
			);
		}
	} catch (error) {
		console.error("Error in admin login:", error);
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
