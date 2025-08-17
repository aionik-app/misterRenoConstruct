"use client"

import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SiteConfig } from "@/types/site-config"

interface FooterV2Props {
  config: SiteConfig
}

export function FooterV2({ config }: FooterV2Props) {
  const currentYear = new Date().getFullYear()

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-foreground text-background relative">
      {/* Back to top button */}
      <Button onClick={scrollToTop} size="sm" className="absolute -top-6 right-8 rounded-full shadow-lg">
        <ArrowUp className="h-4 w-4" />
      </Button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="ml-3 text-2xl font-bold">{config.branding.companyName}</span>
            </div>

            <p className="text-background/80 mb-8 leading-relaxed text-lg">{config.footer.description}</p>

            {/* Social Links */}
            {config.footer.socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-background/80">Suivez-nous:</span>
                <div className="flex gap-3">
                  {config.footer.socialLinks.map((social, index) => {
                    const IconComponent = socialIcons[social.icon as keyof typeof socialIcons]
                    return IconComponent ? (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    ) : null
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {config.footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-background/80 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-background/90">{config.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-background/90">{config.contact.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/90">
                  {config.contact.address}
                  <br />
                  {config.contact.postalCode} {config.contact.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {currentYear} {config.branding.companyName}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/60">
              <a href="#" className="hover:text-primary transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
