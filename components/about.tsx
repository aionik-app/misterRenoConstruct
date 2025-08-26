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
		<section id="about" className="py-24 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
					{/* Content */}
					<div className="lg:col-span-7">
						<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
							À Propos de Nous
						</div>

						<h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
							{config.about.title}
						</h2>

						<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
							{config.about.description}
						</p>

						{/* Values */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
							{values.map((value) => (
								<Card
									key={value.title}
									className="border-0 shadow-sm hover:shadow-md transition-shadow"
								>
									<CardContent className="p-6 text-center">
										<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
											<value.icon className="h-6 w-6 text-primary" />
										</div>
										<h3 className="font-bold text-foreground mb-2">
											{value.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											{value.description}
										</p>
									</CardContent>
								</Card>
							))}
						</div>

						{/* Features List */}
						<div className="space-y-3">
							{config.about.features.map((feature) => (
								<div key={feature} className="flex items-center gap-3">
									<CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
									<span className="text-foreground">{feature}</span>
								</div>
							))}
						</div>
					</div>

					{/* Images - Asymmetric Layout */}
					<div className="lg:col-span-5">
						<div className="relative">
							{/* Main Image */}
							<div className="relative overflow-hidden rounded-3xl shadow-2xl">
								<Image
									src={
										config.about.image ||
										"/placeholder.svg?height=500&width=400&query=gardening team at work"
									}
									alt="Notre équipe"
									className="w-full h-96 object-cover rounded-3xl"
									width={400}
									height={500}
									priority
								/>
							</div>

							{/* Floating Stats Card */}
							<Card className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground border-0 shadow-xl">
								<CardContent className="p-6">
									<div className="text-center">
										<div className="text-3xl font-bold mb-1">15+</div>
										<div className="text-sm opacity-90">
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
