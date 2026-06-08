import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientThemeProvider } from "@/components/ClientThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sargamkeys.in"),
  title: {
    default: "SargamKeys - Premium Piano Notes & Music Theory Library",
    template: "%s | SargamKeys",
  },
  description:
    "Master the piano with free, accurate notes for Bollywood, Pop, and Classical songs. Explore comprehensive music theory guides, scales, chords, and keyboard notations at SargamKeys.",
  keywords: [
    "piano notes",
    "keyboard notes",
    "hindi piano notes",
    "bollywood piano notes",
    "easy keyboard notes",
    "sargam notes",
    "music theory",
    "piano scales",
    "bollywood song notes",
    "free piano sheet music",
  ],
  authors: [{ name: "Sathvik KV", url: "https://sargamkeys.in/about" }],
  creator: "Sathvik KV",
  publisher: "SargamKeys",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.jpg" },
    ],
    apple: "/logo.jpg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "SargamKeys - Premium Piano Notes & Music Theory",
    description:
      "Learn piano notes and keyboard notes for Bollywood and Hindi songs. Comprehensive guides for beginners.",
    url: "https://sargamkeys.in",
    siteName: "SargamKeys",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "SargamKeys - Piano Notes Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SargamKeys - Piano Notes & Music Theory",
    description: "Learn piano notes and keyboard notes for Hindi songs.",
    images: ["/logo.jpg"],
    creator: "@Sathvik_Keys",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://sargamkeys.in",
    types: {
      'application/rss+xml': 'https://sargamkeys.in/feed.xml',
    },
  },
  verification: {
    google: "google8b4339d916b3e2c7", 
  },
  category: "music",
  other: {
    "google-adsense-account": "ca-pub-7760317183284359",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SargamKeys",
    "url": "https://sargamkeys.in",
    "description": "Premium Piano Notes & Music Theory Library",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sargamkeys.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SargamKeys",
    "url": "https://sargamkeys.in",
    "logo": "https://sargamkeys.in/logo.jpg",
    "image": "https://sargamkeys.in/logo.jpg",
    "description": "Learn piano notes, keyboard notes, Bollywood songs, Hindi songs, and music theory with SargamKeys.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "ksathvik485@gmail.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.youtube.com/@Sathvik_Keys"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="SargamKeys - Latest Piano Notes"
          href="/feed.xml"
        />
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7760317183284359"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <AuthProvider>
          <ClientThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster richColors closeButton position="top-right" />
          </ClientThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

