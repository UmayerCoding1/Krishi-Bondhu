import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/provider/Providers";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/provider/auth-provider";


const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-bengali",
});



export const metadata: Metadata = {
  title: "কৃষি বন্ধু | স্মার্ট কৃষি সহকারী",
  description:
    "কৃষি বন্ধু একটি স্মার্ট কৃষি সহকারী যা কৃষকদের ফসলের পরামর্শ, আবহাওয়ার তথ্য, রোগ শনাক্তকরণ এবং বাজার দর সহজে জানতে সাহায্য করে।",

  keywords: [
    "কৃষি বন্ধু",
    "বাংলাদেশ কৃষি",
    "ফসল পরামর্শ",
    "কৃষি অ্যাপ",
    "weather bangladesh",
    "crop suggestion",
  ],

  authors: [{ name: "Krishi Bondhu Team" }],

  openGraph: {
    title: "কৃষি বন্ধু | স্মার্ট কৃষি সহকারী",
    description:
      "ফসল বাছাই, আবহাওয়া আর বাজার দর—সব তথ্য এখন এক জায়গায়। কৃষকদের জন্য সহজ সমাধান।",
    url: "https://krishibondhu.com", // change later
    siteName: "কৃষি বন্ধু",
    images: [
      {
        url: "/assets/light-logo.png", // add later
        width: 1200,
        height: 630,
        alt: "কৃষি বন্ধু",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "কৃষি বন্ধু | স্মার্ট কৃষি সহকারী",
    description:
      "কৃষকদের জন্য ফসল, আবহাওয়া ও বাজার তথ্য এক জায়গায়।",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  metadataBase: new URL("https://krishibondhu.com"), // update later
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn-BD"
      className={`${notoSansBengali.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full  font-display">
        <AuthProvider>

          <Providers>

            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
