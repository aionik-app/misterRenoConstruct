import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Jardins & Espaces Verts - Services de Jardinage Professionnel",
  description:
    "Spécialiste en aménagement extérieur, tonte de pelouse, création de terrasses, plantation et entretien de jardins. Devis gratuit.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <style>{`
html {
  font-family: ${openSans.style.fontFamily};
  --font-sans: ${openSans.variable};
  --font-serif: ${workSans.variable};
}
        `}</style>
      </head>
      <body className={`${workSans.variable} ${openSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
