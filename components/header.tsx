"use client";

import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/types/site-config";

interface HeaderProps {
	config: SiteConfig;
}

export function Header({ config }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navigation = [
		{ name: "Accueil", href: "#hero" },
		{ name: "Services", href: "#services" },
		{ name: "À Propos", href: "#about" },
		{ name: "Portfolio", href: "#gallery" },
		{ name: "Contact", href: "#contact" },
	];

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled ? "bg-white shadow-sm" : "bg-white"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					{/* Logo avec lien */}
					<a href="/" className="flex items-center">
						<Image
							src={config.branding.logo || "/placeholder.svg"}
							alt={config.branding.companyName}
							width={48}
							height={48}
							className="h-12 w-auto"
							priority
						/>
						<span className="ml-3 text-xl font-serif font-bold text-foreground">
							{config.branding.companyName}
						</span>
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navigation.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
							>
								{item.name}
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"/>
							</a>
						))}
					</nav>

					{/* Contact Info & CTA */}
					<div className="hidden lg:flex items-center gap-6">
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Phone className="h-4 w-4" />
								<span>{config.contact.phone}</span>
							</div>
						</div>
						<Button size="sm" className="rounded-full">
							Devis Gratuit
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden py-4 border-t border-border bg-white">
						<nav className="flex flex-col space-y-4">
							{navigation.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</a>
							))}
							<div className="pt-4 border-t border-border">
								<Button
									className="w-full rounded-full"
									onClick={() => setIsMenuOpen(false)}
								>
									Devis Gratuit
								</Button>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
