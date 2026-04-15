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

    const companyInitial = config.branding.companyName.charAt(0).toUpperCase();

    return (
        <footer className="relative bg-white border-t border-slate-200 overflow-visible">
            {/* Back to top button */}
            <Button
                onClick={scrollToTop}
                size="icon"
                className="absolute -top-6 right-8 rounded-full shadow-2xl bg-[#e69938] hover:bg-[#d68928] text-white border-4 border-white w-12 h-12 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 z-20"
                aria-label="Retour en haut"
            >
                <ArrowUp className="h-5 w-5" />
            </Button>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* Infos Entreprise */}
                    <div className="lg:col-span-5 pr-0 lg:pr-12">
                        <div className="flex items-center mb-8">
                            <div
                                className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xl border border-slate-800"
                            >
                                <span
                                    className="font-black text-2xl italic"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    {companyInitial}
                                </span>
                            </div>
                            <span
                                className="ml-4 text-2xl font-black text-slate-900 uppercase tracking-tighter"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                {config.branding.companyName}
                            </span>
                        </div>

                        <p
                            className="mb-10 leading-relaxed text-slate-600 font-light text-lg"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {config.footer.description}
                        </p>

                        {/* Social Links */}
                        {config.footer.socialLinks.length > 0 && (
                            <div className="flex flex-col gap-4">
                                <span
                                    className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e69938]"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    Réseaux Sociaux
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
                                                className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-900 transition-all duration-300 hover:bg-[#e69938] hover:text-white hover:border-[#e69938] hover:shadow-lg hover:shadow-orange-500/20"
                                            >
                                                <IconComponent className="h-5 w-5" />
                                            </a>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Rapide */}
                    <div className="lg:col-span-3">
                        <h3
                            className="font-black mb-8 text-slate-900 uppercase tracking-widest text-xs"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Navigation
                        </h3>
                        <ul className="space-y-4">
                            {config.footer.quickLinks.map((link, index) => (
                                <li key={`${link.url}-${index}`}>
                                    <a
                                        href={link.url}
                                        className="group flex items-center gap-3 transition-colors duration-200"
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        <span className="w-5 h-[1px] bg-slate-200 group-hover:w-8 group-hover:bg-[#e69938] transition-all duration-300" />
                                        <span className="text-slate-500 font-medium group-hover:text-slate-900 text-sm">
                                            {link.title}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Direct */}
                    <div className="lg:col-span-4">
                        <h3
                            className="font-black mb-8 text-slate-900 uppercase tracking-widest text-xs"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Coordonnées
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-5 group">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-orange-50 group-hover:border-orange-200 transition-all">
                                    <Phone className="h-5 w-5 text-[#e69938]" />
                                </div>
                                <span
                                    className="text-slate-900 font-bold text-lg"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {config.contact.phone}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-5 group">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-orange-50 group-hover:border-orange-200 transition-all">
                                    <Mail className="h-5 w-5 text-[#e69938]" />
                                </div>
                                <span
                                    className="text-slate-600 font-medium break-all"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {config.contact.email}
                                </span>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-orange-50 group-hover:border-orange-200 transition-all">
                                    <MapPin className="h-5 w-5 text-[#e69938]" />
                                </div>
                                <span
                                    className="text-slate-600 font-medium leading-relaxed"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {config.contact.address}
                                    <br />
                                    <span className="text-slate-900 font-bold">
                                        {config.contact.postalCode} {config.contact.city}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal Section */}
                <div
                    className="border-t border-slate-100 mt-20 pt-10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p
                            className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            © {currentYear} {config.branding.companyName} — Excellence en Construction.
                        </p>
                        <div
                            className="flex flex-wrap justify-center md:justify-end items-center gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest text-slate-400"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            <a href="/mentions-legales" className="hover:text-[#e69938] transition-colors">Mentions légales</a>
                            <a href="/politique-confidentialite" className="hover:text-[#e69938] transition-colors">Confidentialité</a>
                            <a href="/cgv" className="hover:text-[#e69938] transition-colors">CGV</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}