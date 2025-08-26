"use client";

import { useEffect, useState } from "react";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLogin } from "@/components/admin/admin-login";

export default function AdminPage() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await fetch("/api/admin/verify", {
					method: "POST",
					credentials: "include",
				});

				if (response.ok) {
					setIsAuthenticated(true);
				}
			} catch (error) {
				console.error("Auth check failed:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	const handleLogin = async (code: string) => {
		try {
			const response = await fetch("/api/admin/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code }),
				credentials: "include",
			});

			const data = await response.json();

			if (response.ok) {
				setIsAuthenticated(true);
				return { success: true };
			} else {
				return { success: false, message: data.error };
			}
		} catch {
			return { success: false, message: "Erreur de connexion" };
		}
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			{!isAuthenticated ? (
				<AdminLogin onLogin={handleLogin} />
			) : (
				<AdminDashboard onLogout={handleLogout} />
			)}
		</div>
	);
}
