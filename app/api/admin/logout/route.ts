import { type NextRequest, NextResponse } from "next/server";
import { revokeAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
	try {
		const token = request.cookies.get("admin-token")?.value;

		if (token) {
			await revokeAdminSession(token);
		}

		const response = NextResponse.json({ success: true });
		response.cookies.delete("admin-token");

		return response;
	} catch (error) {
		console.error("Error in admin logout:", error);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
