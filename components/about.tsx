import { Award, CheckCircle, Heart, Leaf } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { SiteConfig } from "@/types/site-config";

interface AboutV2Props {
	config: SiteConfig;
}

export function About({ config }: AboutV2Props) {
	const values = [
		{
			icon: Leaf,
			title: "Écologique",
			description: "Respect de l'environnement dans tous nos projets",
		},
		{
			icon: Award,
			title: "Excellence",
			description: "Qualité irréprochable et finitions soignées",
		},
		{
			icon: Heart,
			title: "Passion",
			description: "L'amour du jardinage guide chacune de nos actions",
		},
	];

	return (
		<section
			id="about"
			className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
			style={{ background: '#0c1a08' }}
		>
			{/* Subtle grid texture */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `linear-gradient(rgba(134,188,66,1) 1px, transparent 1px), linear-gradient(90deg, rgba(134,188,66,1) 1px, transparent 1px)`,
					backgroundSize: '60px 60px',
				}}
			/>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
					{/* Content */}
					<div className="lg:col-span-7">
						<div
							className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium mb-4 sm:mb-6"
							style={{
								background: 'rgba(134,188,66,0.15)',
								border: '1px solid rgba(134,188,66,0.3)',
								color: '#b8d97f',
								fontFamily: "'DM Sans', sans-serif",
								letterSpacing: '0.04em',
							}}
						>
							<Leaf className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
							<span className="hidden xs:inline">À Propos de Nous</span>
							<span className="xs:hidden">À Propos</span>
						</div>

						<h2
							className="text-white font-bold mb-4 sm:mb-6 leading-tight"
							style={{
								fontFamily: "'Cormorant Garamond', serif",
								fontSize: 'clamp(1.8rem, 6vw, 4rem)',
								letterSpacing: '-0.02em',
							}}
						>
							{config.about.title}
						</h2>

						<div
							className="h-[2px] w-16 sm:w-20 bg-gradient-to-r from-[#86bc42] to-[#b8d97f] rounded-full mb-6 sm:mb-8"
						/>

						<p
							className="text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed"
							style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
						>
							{config.about.description}
						</p>

						{/* Values */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
							{values.map((value) => (
								<div
									key={value.title}
									className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer border border-white/5 hover:border-[#86bc42]/30 transition-all duration-300 hover:-translate-y-1"
									style={{ background: 'rgba(255,255,255,0.03)' }}
								>
									<div className="p-4 sm:p-6 text-center">
										<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
											style={{ background: 'rgba(134,188,66,0.15)', border: '1px solid rgba(134,188,66,0.3)' }}
										>
											<value.icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#86bc42' }} />
										</div>
										<h3
											className="font-bold mb-2"
											style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#ffffff' }}
										>
											{value.title}
										</h3>
										<p
											className="text-xs sm:text-sm"
											style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}
										>
											{value.description}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Features List */}
						<div className="space-y-2.5 sm:space-y-3">
							{config.about.features.map((feature) => (
								<div key={feature} className="flex items-center gap-2.5 sm:gap-3">
									<CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{ color: '#86bc42' }} />
									<span className="text-sm sm:text-base text-white/80" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
										{feature}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Images - Asymmetric Layout */}
					<div className="lg:col-span-5">
						<div className="relative">
							{/* Main Image */}
							<div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
								<Image
									src={
										config.about.image ||
										"/placeholder.svg?height=500&width=400&query=gardening team at work"
									}
									alt="Notre équipe"
									className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl sm:rounded-3xl"
									width={400}
									height={500}
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#0c1a08]/40 to-transparent" />
							</div>

							{/* Floating Stats Card */}
							<Card
								className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 border-0 shadow-xl"
								style={{
									background: 'rgba(134,188,66,0.2)',
									border: '1px solid rgba(134,188,66,0.3)',
									backdropFilter: 'blur(10px)',
								}}
							>
								<CardContent className="p-4 sm:p-6">
									<div className="text-center">
										<div
											className="text-2xl sm:text-3xl font-bold mb-1"
											style={{ fontFamily: "'Cormorant Garamond', serif", color: '#b8d97f' }}
										>
											15+
										</div>
										<div
											className="text-xs sm:text-sm"
											style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(184,217,127,0.8)' }}
										>
											Années d'expérience
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
