export interface SiteConfig {
  version: "v1" | "v2"
  metadata: {
    title: string
    description: string
    keywords: string[]
  }
  branding: {
    companyName: string
    logo: string
    favicon: string
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    backgroundColor: string
    textColor: string
  }
  contact: {
    phone: string
    email: string
    address: string
    city: string
    postalCode: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  hero: {
    title: string
    subtitle: string
    description: string
    backgroundImage: string
    ctaText: string
    ctaLink: string
  }
  services: Service[]
  about: {
    title: string
    description: string
    image: string
    features: string[]
  }
  gallery: {
    title: string
    images: GalleryImage[]
  }
  testimonials: {
    title: string
    items: Testimonial[]
  }
  footer: {
    description: string
    socialLinks: SocialLink[]
    quickLinks: QuickLink[]
  }
}

export interface Service {
  id: string
  title: string
  description: string
  image: string
  price?: string
  features: string[]
  icon: string
}

export interface GalleryImage {
  id: string
  url: string
  alt: string
  category: string
  title?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  avatar?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface QuickLink {
  title: string
  url: string
}

export interface AdminConfig {
  adminCode: string
  lastUpdated: string
  sessionTimeout: number // in minutes
  maxLoginAttempts: number
  lockoutDuration: number // in minutes
  allowedIPs?: string[]
}

export interface LoginAttempt {
  ip: string
  timestamp: string
  success: boolean
}

export interface AdminSession {
  token: string
  createdAt: string
  expiresAt: string
  ip: string
}
