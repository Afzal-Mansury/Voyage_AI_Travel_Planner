"use client";

import Link from "next/link";
import { Compass, Map as MapIcon, User, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass-dark border-b border-white/10"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo - YatraVerse AI */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: "linear-gradient(135deg, #FF9933, #c2410c)" }}>
            🇮🇳
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold text-white tracking-tight">YatraVerse</span>
            <span className="text-[10px] font-semibold tracking-widest" style={{ color: "#FF9933" }}>AI · DISCOVER INDIA</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/destinations" className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <Globe className="w-4 h-4" /> Destinations
          </Link>
          <Link href="/planner" className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <Compass className="w-4 h-4" /> AI Planner
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <MapIcon className="w-4 h-4" /> My Trips
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full glass hover:bg-white/10 transition">
            <User className="w-5 h-5 text-white" />
          </Link>
          <Link 
            href="/planner" 
            className="px-5 py-2.5 rounded-full font-semibold text-sm text-black transition-all glow-saffron"
            style={{ background: "linear-gradient(135deg, #FF9933, #f97316)" }}
          >
            Plan My Yatra ✨
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
