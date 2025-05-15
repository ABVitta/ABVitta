
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "AB Vitta Clínica Médica - Compromisso com sua saúde",
    template: "%s | AB Vitta Clínica Médica",
  },
  description: "AB Vitta Clínica Médica: Atendimento humanizado e especializado. Agende sua consulta online ou presencial. Diversas especialidades disponíveis.",
  keywords: ["clínica médica", "AB Vitta", "saúde", "telemedicina", "consulta online", "agendamento médico", "especialistas", "bem-estar"],
  authors: [{ name: "AB Vitta Clínica Médica" }],
  openGraph: {
    title: "AB Vitta Clínica Médica",
    description: "Compromisso com sua saúde. Agende sua consulta.",
    url: "https://ab-vitta-clinica.com.br", // Replace with actual URL
    siteName: "AB Vitta Clínica Médica",
    images: [
      {
        url: "https://ab-vitta-clinica.com.br/og-image.jpg", // Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: "AB Vitta Clínica Médica",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AB Vitta Clínica Médica",
    description: "Compromisso com sua saúde. Agende sua consulta.",
    // site: "@yourtwitterhandle", // Replace with actual Twitter handle
    // creator: "@creatorhandle", // Replace if applicable
    images: ["https://ab-vitta-clinica.com.br/twitter-image.jpg"], // Replace with actual Twitter image URL
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
  // manifest: "/site.webmanifest", // If you have a manifest file
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#004E64" }, // Petroleum Blue
    { media: "(prefers-color-scheme: dark)", color: "#1C1C1C" },  // Elegant Black
  ],
  colorScheme: "light dark",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn(inter.variable, "scroll-smooth")}>
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
