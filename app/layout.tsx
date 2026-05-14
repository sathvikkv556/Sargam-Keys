import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Montserrat } from "next/font/google";
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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sargamkeys.in"),
  title: {
    default: "SargamKeys - Piano Notes & Keyboard Notes",
    template: "%s | SargamKeys",
  },
  description:
    "Learn piano notes, keyboard notes, Bollywood songs, Hindi songs, and music theory with SargamKeys.",
  keywords: [
    "piano notes",
    "keyboard notes",
    "hindi piano notes",
    "bollywood piano notes",
    "easy keyboard notes",
  ],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "SargamKeys",
    description:
      "Learn piano notes and keyboard notes for Bollywood and Hindi songs.",
    url: "https://sargamkeys.in",
    siteName: "SargamKeys",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SargamKeys",
    description: "Learn piano notes and keyboard notes for Hindi songs.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${montserrat.variable} antialiased`}
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
