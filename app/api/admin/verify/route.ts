import { type NextRequest, NextResponse } from "next/server";
import { validateAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
	try {
		const token = request.cookies.get("admin-token")?.value;
		const ip =
			request.headers.get("x-forwarded-for") ||
			request.headers.get("x-real-ip") ||
			"unknown";

		if (!token) {
			return NextResponse.json({ error: "No token provided" }, { status: 401 });
		}

		const isValid = await validateAdminSession(token, ip);

		if (isValid) {
			return NextResponse.json({ valid: true });
		}

		return NextResponse.json(
			{ error: "Invalid or expired session" },
			{ status: 401 },
		);
	} catch (error) {
		console.error("Error verifying admin session:", error);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
