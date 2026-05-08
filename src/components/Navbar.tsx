"use client";

import Link from "next/link";
import { Plane, Compass, Map as MapIcon, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass-dark border-b border-white/10"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
            <Plane className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">VoyageAI</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
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
            className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            Start Planning
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
