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

	return (
		<footer className="relative" style={{ background: '#ffffff' }}>
			{/* Back to top button */}
			<Button
				onClick={scrollToTop}
				size="sm"
				className="absolute -top-6 right-8 rounded-full shadow-lg"
				style={{
					background: 'linear-gradient(135deg, #86bc42 0%, #b8d97f 100%)',
					color: '#0f1f0a',
				}}
			>
				<ArrowUp className="h-4 w-4" />
			</Button>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					{/* Company Info */}
					<div className="lg:col-span-5">
						<div className="flex items-center mb-6">
							<div
								className="w-12 h-12 rounded-full flex items-center justify-center"
								style={{
									background: 'rgba(134,188,66,0.1)',
									border: '1px solid rgba(134,188,66,0.2)',
								}}
							>
								<span
									className="font-bold text-lg"
									style={{ color: '#86bc42', fontFamily: "'Cormorant Garamond', serif" }}
								>
									J
								</span>
							</div>
							<span
								className="ml-3 text-2xl font-bold"
								style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0c1a08' }}
							>
								{config.branding.companyName}
							</span>
						</div>

						<p
							className="mb-8 leading-relaxed text-lg"
							style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(12,26,8,0.6)' }}
						>
							{config.footer.description}
						</p>

						{/* Social Links */}
						{config.footer.socialLinks.length > 0 && (
							<div className="flex items-center gap-4">
								<span
									className="text-sm font-semibold uppercase tracking-wider"
									style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(12,26,8,0.5)' }}
								>
									Suivez-nous:
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
												className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
												style={{
													background: 'rgba(134,188,66,0.08)',
													border: '1px solid rgba(134,188,66,0.15)',
												}}
											>
												<IconComponent className="h-5 w-5" style={{ color: '#86bc42' }} />
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
							className="text-lg font-bold mb-6"
							style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0c1a08' }}
						>
							Navigation
						</h3>
						<ul className="space-y-3">
							{config.footer.quickLinks.map((link) => (
								<li key={link.url}>
									<a
										href={link.url}
										className="flex items-center gap-2 transition-colors duration-200"
										style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(12,26,8,0.6)' }}
									>
										<span className="w-1.5 h-1.5 rounded-full" style={{ background: '#86bc42' }}/>
										<span className="hover:text-[#86bc42]">{link.title}</span>
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="lg:col-span-4">
						<h3
							className="text-lg font-bold mb-6"
							style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0c1a08' }}
						>
							Contact
						</h3>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<Phone className="h-5 w-5 flex-shrink-0" style={{ color: '#86bc42' }} />
								<span
									className="text-base"
									style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(12,26,8,0.7)' }}
								>
									{config.contact.phone}
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="h-5 w-5 flex-shrink-0" style={{ color: '#86bc42' }} />
								<span
									className="text-base"
									style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(12,26,8,0.7)' }}
								>
									{config.contact.email}
								</span>
							</div>
							<div className="flex items-start gap-3">
								<MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#86bc42' }} />
								<span
									className="text-base"
									style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(12,26,8,0.7)' }}
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
					className="border-t mt-12 pt-8"
					style={{ borderColor: 'rgba(12,26,8,0.08)' }}
				>
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p
							className="text-sm"
							style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(12,26,8,0.4)' }}
						>
							© {currentYear} {config.branding.companyName}. Tous droits
							réservés.
						</p>
						<div className="flex items-center gap-6 text-sm"
							style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(12,26,8,0.4)' }}
						>
							<a
								href="/mentions-legales"
								className="transition-colors hover:text-[#86bc42]"
							>
								Mentions légales
							</a>
							<a
								href="/politique-confidentialite"
								className="transition-colors hover:text-[#86bc42]"
							>
								Politique de confidentialité
							</a>
							<a href="/cgv" className="transition-colors hover:text-[#86bc42]">
								CGV
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
