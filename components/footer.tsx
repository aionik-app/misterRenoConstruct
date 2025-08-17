import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"
import type { SiteConfig } from "@/types/site-config"

interface FooterProps {
  config: SiteConfig
}

export function Footer({ config }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src={config.branding.logo || "/placeholder.svg"}
                alt={config.branding.companyName}
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="ml-3 text-xl font-serif font-bold">{config.branding.companyName}</span>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">{config.footer.description}</p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-background/90">{config.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-background/90">{config.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-background/90">
                  {config.contact.address}, {config.contact.postalCode} {config.contact.city}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              {config.footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-background/80 hover:text-primary transition-colors duration-200">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Nos services</h3>
            <ul className="space-y-2">
              {config.services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <span className="text-background/80 text-sm">{service.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {currentYear} {config.branding.companyName}. Tous droits réservés.
            </p>

            {/* Social Links */}
            {config.footer.socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-background/80 text-sm">Suivez-nous:</span>
                <div className="flex gap-3">
                  {config.footer.socialLinks.map((social, index) => {
                    const IconComponent = socialIcons[social.icon as keyof typeof socialIcons]
                    return IconComponent ? (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-background/60 hover:text-primary transition-colors duration-200"
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    ) : null
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
