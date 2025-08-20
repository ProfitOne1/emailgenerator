import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Email Ad Generator - Create Realistic Email Ads | Adsone",
  description:
    "Generate high-quality email-style advertisements with our professional marketing tool. Create realistic Gmail-style ads for your campaigns with customizable content, sender details, and export to PNG.",
  keywords:
    "email marketing, ad generator, gmail ads, email advertisements, marketing tool, adsone, email campaigns, social media ads",
  authors: [{ name: "Adsone" }],
  creator: "Adsone",
  publisher: "Adsone",
  openGraph: {
    title: "Email Ad Generator - Create Realistic Email Ads",
    description:
      "Professional marketing tool to generate Gmail-style advertisements. Customize content, export high-quality images for your campaigns.",
    type: "website",
    siteName: "Adsone Email Ad Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Ad Generator - Create Realistic Email Ads",
    description:
      "Generate professional Gmail-style advertisements for your marketing campaigns with Adsone's email ad generator.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
