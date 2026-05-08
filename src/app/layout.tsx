import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YatraVerse AI | Discover India Intelligently",
  description: "India's first AI-powered travel planning & experience engine. Explore famous destinations, discover hidden gems, and get personalized itineraries powered by Gemini AI.",
  keywords: "India travel, AI travel planner, Incredible India, trip planning, Gemini AI, Kashmir, Goa, Kerala, Rajasthan",
  openGraph: {
    title: "YatraVerse AI | Discover India Intelligently",
    description: "Plan your perfect Indian journey with AI-powered itineraries, local insights, and INR budgeting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col relative`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
