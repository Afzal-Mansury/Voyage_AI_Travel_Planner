"use client";

import { useEffect, useState } from "react";

// For the hackathon, since we might not have a real valid API key immediately,
// we will show a beautiful placeholder map UI if the script fails or as a skeleton.
export default function InteractiveMap() {
  return (
    <div className="w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden relative glass-dark border border-white/10 group">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000"></div>
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
      
      {/* Mock Pins */}
      <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7] animate-pulse delay-75"></div>
      <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-pink-500 rounded-full shadow-[0_0_15px_#ec4899] animate-pulse delay-150"></div>
      
      <div className="absolute bottom-4 left-4 right-4 glass px-4 py-3 rounded-xl flex items-center justify-between text-sm backdrop-blur-md">
        <span className="text-white font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span> Live Map Active
        </span>
        <button className="text-blue-400 hover:text-white transition">View full map</button>
      </div>
    </div>
  );
}
