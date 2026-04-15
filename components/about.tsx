'use client';

import { Award, Shield, Ruler, HardHat } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { SiteConfig } from "@/types/site-config";
import { motion } from "framer-motion";

interface AboutV2Props {
    config: SiteConfig;
}

export function About({ config }: AboutV2Props) {
    const values = [
        {
            icon: Shield,
            title: "Fiabilité",
            description: "Respect strict des délais et des normes de sécurité en vigueur.",
        },
        {
            icon: Award,
            title: "Excellence",
            description: "Qualité irréprochable et finitions artisanales haut de gamme.",
        },
        {
            icon: Ruler,
            title: "Sur Mesure",
            description: "Un accompagnement d'architecte pour chaque projet unique.",
        },
    ];

    return (
        <section
            id="about"
            className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-[#050505]"
        >
            {/* Gradient pour adoucir les bords */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    
                    {/* ── CONTENU TEXTUEL ── */}
                    <div className="lg:col-span-7">
                        
                        {/* Label Badge */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] sm:text-xs font-black mb-6 border bg-white/5 border-white/10 backdrop-blur-md"
                            style={{
                                color: '#e69938',
                                fontFamily: "'DM Sans', sans-serif",
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase'
                            }}
                        >
                            <HardHat className="h-3.5 w-3.5" />
                            <span>À Propos de Nous</span>
                        </div>

                        {/* Titre Principal (Blanc) */}
                        <h2
                            className="text-white font-bold mb-6 leading-[1.1]"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {config.about.title}
                        </h2>

                        {/* Ligne décorative orange */}
                        <div className="h-[3px] w-24 bg-[#e69938] rounded-full mb-8" />

                        {/* Description (Gris clair) */}
                        <p
                            className="text-slate-300 text-lg sm:text-xl mb-10 leading-relaxed font-light"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {config.about.description}
                        </p>

                        {/* Cartes de Valeurs (Style Dark Glass) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 transition-all duration-500 hover:border-[#e69938]/50 hover:bg-white/[0.04]"
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#e69938]/15 border border-[#e69938]/20 text-[#e69938] transition-transform group-hover:scale-110">
                                        <value.icon className="h-6 w-6" />
                                    </div>
                                    <h3
                                        className="text-white font-bold mb-3"
                                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem' }}
                                    >
                                        {value.title}
                                    </h3>
                                    <p
                                        className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── IMAGES (Asymmetric & Coloré) ── */}
                    <div className="lg:col-span-5 relative mt-12 lg:mt-0">
                        <div className="relative z-10">
                            {/* Main Image : 100% Couleur */}
                            <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 group">
                                <Image
                                    src={
                                        config.about.image ||
                                        "/placeholder.svg?height=600&width=500"
                                    }
                                    alt="L'équipe"
                                    className="w-full h-80 sm:h-[450px] lg:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-105"
                                    width={500}
                                    height={600}
                                    priority
                                />
                                {/* Overlay léger pour donner du cachet */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>

                            {/* Floating Stats Card (Dark & Orange Contrast) */}
                            <Card
                                className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-10 border border-white/10 shadow-2xl bg-[#0a0a0a]/90 backdrop-blur-xl"
                            >
                                <CardContent className="p-6 sm:p-10">
                                    <div className="text-center">
                                        <div
                                            className="text-4xl sm:text-6xl font-black mb-2 text-white italic"
                                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                        >
                                            15+
                                        </div>
                                        <div
                                            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-[#e69938]"
                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        >
                                            Années d'expertise
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Elément décoratif derrière l'image */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-[#e69938]/30 rounded-tr-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#e69938]/10 blur-3xl rounded-full pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}