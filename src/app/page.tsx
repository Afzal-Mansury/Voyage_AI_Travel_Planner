"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Map, Sparkles, Star, Utensils, Train, Shield } from "lucide-react";

// India destination quick previews for hero scroll
const heroDestinations = [
  { name: "Kashmir", emoji: "🏔️", tag: "Heaven on Earth" },
  { name: "Goa", emoji: "🏖️", tag: "Sun & Surf" },
  { name: "Kerala", emoji: "🌴", tag: "God's Own Country" },
  { name: "Ladakh", emoji: "🏜️", tag: "Land of High Passes" },
  { name: "Varanasi", emoji: "🛕", tag: "City of Light" },
  { name: "Jaipur", emoji: "🏰", tag: "Pink City" },
];

const features = [
  { icon: Map, color: "text-orange-400", bg: "bg-orange-500/20", title: "AI Itineraries", desc: "Day-by-day plans for every Indian destination, tailored to your style and budget." },
  { icon: Utensils, color: "text-green-400", bg: "bg-green-500/20", title: "Local Food Guide", desc: "From Dal Baati to Masala Dosa — discover the best local food at every stop." },
  { icon: Train, color: "text-blue-400", bg: "bg-blue-500/20", title: "How To Reach", desc: "Smart transport recommendations — trains, flights, buses with estimated costs in ₹." },
  { icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/20", title: "Hidden Gems", desc: "Go beyond tourist traps and discover local secrets curated by AI." },
  { icon: Shield, color: "text-purple-400", bg: "bg-purple-500/20", title: "Travel Like a Local", desc: "Cultural etiquette, scam alerts, local phrases and insider tips." },
  { icon: Sparkles, color: "text-pink-400", bg: "bg-pink-500/20", title: "INR Budgeting", desc: "All costs in ₹ with realistic Indian travel estimates for every budget tier." },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Background animated gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-animated opacity-20" />
      
      {/* Hero cinematic background */}
      <div className="absolute inset-0 z-0 opacity-35"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0a0a0f]" />

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-36 pb-12 flex flex-col items-center justify-center min-h-screen text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="text-lg">🇮🇳</span>
          <span className="text-sm font-semibold text-orange-300">India&apos;s First AI Travel Experience Engine</span>
          <Sparkles className="w-4 h-4 text-orange-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 leading-tight"
        >
          Discover India
          <br />
          <span className="text-gradient">Intelligently</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        >
          From the peaks of Ladakh to the backwaters of Kerala — YatraVerse AI crafts your perfect Indian journey in seconds, powered by Gemini AI.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link 
            href="/planner" 
            className="px-8 py-4 rounded-full font-bold text-lg text-black flex items-center justify-center gap-2 glow-saffron transition-all"
            style={{ background: "linear-gradient(135deg, #FF9933, #f97316)" }}
          >
            Plan My Yatra <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/destinations" 
            className="px-8 py-4 rounded-full glass text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            Explore Destinations 🗺️
          </Link>
        </motion.div>

        {/* Scrolling destination pills */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center mb-24"
        >
          {heroDestinations.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <Link href="/destinations" className="glass px-4 py-2 rounded-full text-sm text-gray-200 hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer">
                <span>{d.emoji}</span>
                <span className="font-medium">{d.name}</span>
                <span className="text-gray-400 hidden sm:inline">· {d.tag}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.07 }}
              className="glass-dark p-6 rounded-3xl text-left border border-white/10 hover:border-orange-500/30 transition-all card-hover"
            >
              <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-5`}>
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-gray-500 text-sm"
        >
          Powered by Google Gemini AI · Built for Incredible India 🇮🇳
        </motion.p>
      </div>
    </div>
  );
}
