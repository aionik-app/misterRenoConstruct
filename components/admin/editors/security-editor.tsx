"use client";

import { AlertTriangle, CheckCircle, Key, Shield } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

export function SecurityEditor() {
	const [currentCode, setCurrentCode] = useState("");
	const [newCode, setNewCode] = useState("");
	const [confirmCode, setConfirmCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState<"success" | "error" | "">("");

	const handleChangeCode = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newCode !== confirmCode) {
			setMessage("Les nouveaux codes ne correspondent pas");
			setMessageType("error");
			return;
		}

		if (newCode.length < 6) {
			setMessage("Le nouveau code doit contenir au moins 6 caractères");
			setMessageType("error");
			return;
		}

		setIsLoading(true);
		setMessage("");

		try {
			const response = await fetch("/api/admin/change-code", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					currentCode,
					newCode,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setMessage(
					"Code d'accès modifié avec succès. Vous allez être déconnecté.",
				);
				setMessageType("success");
				setCurrentCode("");
				setNewCode("");
				setConfirmCode("");

				// Redirect to login after 2 seconds
				setTimeout(() => {
					window.location.href = "/admin";
				}, 2000);
			} else {
				setMessage(data.error || "Erreur lors du changement de code");
				setMessageType("error");
			}
		} catch {
			setMessage("Erreur de connexion");
			setMessageType("error");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Shield className="h-5 w-5" />
						Paramètres de sécurité
					</CardTitle>
					<CardDescription>
						Gérez les paramètres de sécurité de votre interface d'administration
					</CardDescription>
				</CardHeader>
			</Card>

			{/* Change Admin Code */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Key className="h-5 w-5" />
						Changer le code d'accès
					</CardTitle>
					<CardDescription>
						Modifiez votre code d'accès administrateur pour renforcer la
						sécurité
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleChangeCode} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="currentCode">Code actuel</Label>
							<Input
								id="currentCode"
								type="password"
								value={currentCode}
								onChange={(e) => setCurrentCode(e.target.value)}
								placeholder="Saisissez votre code actuel"
								disabled={isLoading}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="newCode">Nouveau code</Label>
							<Input
								id="newCode"
								type="password"
								value={newCode}
								onChange={(e) => setNewCode(e.target.value)}
								placeholder="Nouveau code (min. 6 caractères)"
								disabled={isLoading}
								required
								minLength={6}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmCode">Confirmer le nouveau code</Label>
							<Input
								id="confirmCode"
								type="password"
								value={confirmCode}
								onChange={(e) => setConfirmCode(e.target.value)}
								placeholder="Confirmez le nouveau code"
								disabled={isLoading}
								required
								minLength={6}
							/>
						</div>

						{message && (
							<Alert
								variant={messageType === "error" ? "destructive" : "default"}
							>
								{messageType === "success" ? (
									<CheckCircle className="h-4 w-4" />
								) : (
									<AlertTriangle className="h-4 w-4" />
								)}
								<AlertDescription>{message}</AlertDescription>
							</Alert>
						)}

						<Button type="submit" disabled={isLoading} className="w-full">
							{isLoading
								? "Modification en cours..."
								: "Changer le code d'accès"}
						</Button>
					</form>

					<div className="mt-6 p-4 bg-muted/50 rounded-lg">
						<h4 className="font-semibold text-sm mb-2">
							Conseils de sécurité :
						</h4>
						<ul className="text-sm text-muted-foreground space-y-1">
							<li>• Utilisez un code d'au moins 8 caractères</li>
							<li>• Mélangez lettres, chiffres et caractères spéciaux</li>
							<li>• Ne partagez jamais votre code d'accès</li>
							<li>• Changez régulièrement votre code</li>
						</ul>
					</div>
				</CardContent>
			</Card>

			{/* Security Information */}
			<Card className="border-0 shadow-lg">
				<CardHeader>
					<CardTitle>Informations de sécurité</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="p-4 bg-muted/50 rounded-lg">
							<h4 className="font-semibold text-sm mb-2">
								Protection contre les attaques
							</h4>
							<p className="text-sm text-muted-foreground">
								Limitation à 5 tentatives de connexion par IP, avec blocage
								temporaire de 15 minutes.
							</p>
						</div>
						<div className="p-4 bg-muted/50 rounded-lg">
							<h4 className="font-semibold text-sm mb-2">
								Sessions sécurisées
							</h4>
							<p className="text-sm text-muted-foreground">
								Les sessions expirent automatiquement après 1 heure
								d'inactivité.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
