"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Map, Sparkles, Star, Sun } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Video / Animated Gradient Fallback */}
      <div className="absolute inset-0 z-0 bg-gradient-animated opacity-30"></div>
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-gray-200">Powered by Gemini 2.5 Flash</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6"
        >
          Design Your <span className="text-gradient">Dream Trip</span> <br /> in Seconds
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
        >
          Experience the future of travel planning. Enter your preferences and let our AI craft the perfect itinerary, tailored just for you.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/planner" className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2">
            Start Planning <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/dashboard" className="px-8 py-4 rounded-full glass text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            View My Trips
          </Link>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl"
        >
          <div className="glass-dark p-8 rounded-3xl text-left border border-white/10 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Map className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Itineraries</h3>
            <p className="text-gray-400">Day-by-day planning optimized for location, timing, and your personal travel style.</p>
          </div>

          <div className="glass-dark p-8 rounded-3xl text-left border border-white/10 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Star className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Hidden Gems</h3>
            <p className="text-gray-400">Discover local secrets and highly-rated spots that traditional planners miss.</p>
          </div>

          <div className="glass-dark p-8 rounded-3xl text-left border border-white/10 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Seamless Maps</h3>
            <p className="text-gray-400">Visualize your entire journey on an interactive, beautiful Google Map integration.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
