'use client';

import { Award, CheckCircle, Shield, Ruler, HardHat } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { SiteConfig } from "@/types/site-config";

interface AboutV2Props {
	config: SiteConfig;
}

export function About({ config }: AboutV2Props) {
	// Nouvelles valeurs adaptées à la construction/rénovation
	const values = [
		{
			icon: Shield,
			title: "Fiabilité",
			description: "Respect strict des délais et des normes en vigueur",
		},
		{
			icon: Award,
			title: "Excellence",
			description: "Qualité irréprochable et finitions haut de gamme",
		},
		{
			icon: Ruler,
			title: "Sur Mesure",
			description: "Un accompagnement personnalisé pour chaque projet",
		},
	];

	return (
		<section
			id="about"
			className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-white" // Fond blanc
		>
			{/* Texture de grille subtile (couleur dorée/orange) */}
			<div
				className="absolute inset-0 opacity-[0.4] pointer-events-none"
				style={{
					backgroundImage: `linear-gradient(rgba(230,153,56,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(230,153,56,0.1) 1px, transparent 1px)`,
					backgroundSize: '40px 40px',
				}}
			/>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
					{/* Content */}
					<div className="lg:col-span-7">
						
						{/* Label / Pill */}
						<div
							className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold mb-4 sm:mb-6"
							style={{
								background: 'rgba(230,153,56,0.1)',
								border: '1px solid rgba(230,153,56,0.3)',
								color: '#e69938',
								fontFamily: "'DM Sans', sans-serif",
								letterSpacing: '0.04em',
							}}
						>
							<HardHat className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
							<span className="hidden xs:inline">À Propos de Nous</span>
							<span className="xs:hidden">À Propos</span>
						</div>

						{/* Heading */}
						<h2
							className="text-slate-900 font-bold mb-4 sm:mb-6 leading-[1.1]"
							style={{
								fontFamily: "'Cormorant Garamond', serif",
								fontSize: 'clamp(1.8rem, 6vw, 4rem)',
								letterSpacing: '-0.02em',
							}}
						>
							{config.about.title}
						</h2>

						{/* Ligne décorative */}
						<div
							className="h-[3px] w-16 sm:w-20 bg-gradient-to-r from-[#e69938] to-[#fcd288] rounded-full mb-6 sm:mb-8"
						/>

						{/* Description */}
						<p
							className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed text-slate-600"
							style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
						>
							{config.about.description}
						</p>

						{/* Values */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
							{values.map((value) => (
								<div
									key={value.title}
									className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-md hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1"
								>
									<div className="p-5 text-center">
										<div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-orange-50 text-[#e69938]">
											<value.icon className="h-6 w-6" />
										</div>
										<h3
											className="text-slate-900 font-bold mb-2"
											style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
										>
											{value.title}
										</h3>
										<p
											className="text-xs sm:text-sm text-slate-500 leading-relaxed"
											style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
										>
											{value.description}
										</p>
									</div>
								</div>
							))}
						</div>


					</div>

					{/* Images - Asymmetric Layout */}
					<div className="lg:col-span-5 mt-10 lg:mt-0">
						<div className="relative">
							{/* Main Image */}
							<div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-200/50 group">
								<Image
									src={
										config.about.image ||
										"/placeholder.svg?height=500&width=400&query=construction+renovation+team"
									}
									alt="L'équipe Mister RenoConstruct"
									className="w-full h-72 sm:h-80 lg:h-[450px] object-cover rounded-2xl sm:rounded-3xl transition-transform duration-700 group-hover:scale-105"
									width={400}
									height={500}
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
							</div>

							{/* Floating Stats Card (Contraste premium) */}
							<Card
								className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 border-0 shadow-2xl shadow-slate-300/60 bg-white"
								style={{
									backdropFilter: 'blur(10px)',
								}}
							>
								<CardContent className="p-5 sm:p-7">
									<div className="text-center">
										<div
											className="text-3xl sm:text-4xl font-extrabold mb-1 text-slate-900"
											style={{ fontFamily: "'Cormorant Garamond', serif" }}
										>
											10+
										</div>
										<div
											className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e69938]"
											style={{ fontFamily: "'DM Sans', sans-serif" }}
										>
											Années d'expertise
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}