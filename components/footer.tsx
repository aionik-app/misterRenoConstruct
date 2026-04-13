"use client";

import {
	ArrowUp,
	Facebook,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/types/site-config";

interface FooterV2Props {
	config: SiteConfig;
}

export function Footer({ config }: FooterV2Props) {
	const currentYear = new Date().getFullYear();

	const socialIcons = {
		facebook: Facebook,
		instagram: Instagram,
		linkedin: Linkedin,
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Récupère la première lettre du nom de l'entreprise pour le logo de secours
	const companyInitial = config.branding.companyName.charAt(0).toUpperCase();

	return (
		<footer className="relative bg-slate-50 border-t border-slate-100">
			{/* Back to top button */}
			<Button
				onClick={scrollToTop}
				size="icon"
				className="absolute -top-6 right-8 rounded-full shadow-lg shadow-orange-500/20 bg-[#e69938] hover:bg-[#d68928] text-white border-0 w-12 h-12 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 z-10"
				aria-label="Retour en haut"
			>
				<ArrowUp className="h-5 w-5" />
			</Button>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
					{/* Company Info */}
					<div className="lg:col-span-5 pr-0 lg:pr-8">
						<div className="flex items-center mb-6">
							<div
								className="w-12 h-12 rounded-xl bg-orange-100 text-[#e69938] flex items-center justify-center shadow-sm border border-orange-200"
							>
								<span
									className="font-bold text-2xl"
									style={{ fontFamily: "'Cormorant Garamond', serif" }}
								>
									{companyInitial}
								</span>
							</div>
							<span
								className="ml-4 text-2xl font-bold text-slate-900 tracking-tight"
								style={{ fontFamily: "'Cormorant Garamond', serif" }}
							>
								{config.branding.companyName}
							</span>
						</div>

						<p
							className="mb-8 leading-relaxed text-slate-500 font-light"
							style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem' }}
						>
							{config.footer.description}
						</p>

						{/* Social Links */}
						{config.footer.socialLinks.length > 0 && (
							<div className="flex items-center gap-5">
								<span
									className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400"
									style={{ fontFamily: "'DM Sans', sans-serif" }}
								>
									Suivez-nous
								</span>
								<div className="flex gap-3">
									{config.footer.socialLinks.map((social) => {
										const IconComponent =
											socialIcons[social.icon as keyof typeof socialIcons];
										return IconComponent ? (
											<a
												key={social.icon}
												href={social.url}
												target="_blank"
												rel="noopener noreferrer"
												className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#e69938] transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:shadow-orange-500/10 hover:-translate-y-1"
											>
												<IconComponent className="h-4 w-4" />
											</a>
										) : null;
									})}
								</div>
							</div>
						)}
					</div>

					{/* Quick Links */}
					<div className="lg:col-span-3">
						<h3
							className="font-bold mb-6 text-slate-900"
							style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem' }}
						>
							Navigation
						</h3>
						<ul className="space-y-3.5">
							{config.footer.quickLinks.map((link, index) => (
								<li key={`${link.url}-${index}`}>
									<a
										href={link.url}
										className="group flex items-center gap-3 transition-colors duration-200"
										style={{ fontFamily: "'DM Sans', sans-serif" }}
									>
										<span className="w-1.5 h-1.5 rounded-full bg-[#e69938] opacity-60 group-hover:opacity-100 transition-opacity" />
										<span className="text-slate-500 font-light group-hover:text-[#e69938]">
											{link.title}
										</span>
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="lg:col-span-4">
						<h3
							className="font-bold mb-6 text-slate-900"
							style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem' }}
						>
							Coordonnées
						</h3>
						<div className="space-y-5">
							<div className="flex items-center gap-4 group">
								<div className="w-10 h-10 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 group-hover:border-orange-200 transition-colors">
									<Phone className="h-4 w-4 text-[#e69938]" />
								</div>
								<span
									className="text-slate-500 font-light"
									style={{ fontFamily: "'DM Sans', sans-serif" }}
								>
									{config.contact.phone}
								</span>
							</div>
							<div className="flex items-center gap-4 group">
								<div className="w-10 h-10 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 group-hover:border-orange-200 transition-colors">
									<Mail className="h-4 w-4 text-[#e69938]" />
								</div>
								<span
									className="text-slate-500 font-light break-all"
									style={{ fontFamily: "'DM Sans', sans-serif" }}
								>
									{config.contact.email}
								</span>
							</div>
							<div className="flex items-start gap-4 group">
								<div className="w-10 h-10 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 group-hover:border-orange-200 transition-colors">
									<MapPin className="h-4 w-4 text-[#e69938]" />
								</div>
								<span
									className="text-slate-500 font-light pt-1"
									style={{ fontFamily: "'DM Sans', sans-serif" }}
								>
									{config.contact.address}
									<br />
									{config.contact.postalCode} {config.contact.city}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div
					className="border-t border-slate-200 mt-16 pt-8"
				>
					<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
						<p
							className="text-sm text-slate-400 font-light"
							style={{ fontFamily: "'DM Sans', sans-serif" }}
						>
							© {currentYear} {config.branding.companyName}. Tous droits réservés.
						</p>
						<div
							className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2 text-sm text-slate-400 font-light"
							style={{ fontFamily: "'DM Sans', sans-serif" }}
						>
							<a
								href="/mentions-legales"
								className="transition-colors hover:text-[#e69938]"
							>
								Mentions légales
							</a>
							<a
								href="/politique-confidentialite"
								className="transition-colors hover:text-[#e69938]"
							>
								Confidentialité
							</a>
							<a
								href="/cgv"
								className="transition-colors hover:text-[#e69938]"
							>
								CGV
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}