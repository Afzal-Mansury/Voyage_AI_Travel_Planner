"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Train, Plane, Utensils, Star } from "lucide-react";
import { INDIA_DESTINATIONS } from "@/lib/destinations";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <span className="text-lg">🗺️</span>
            <span className="text-sm font-semibold text-orange-300">India Destination Hub</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Explore <span className="text-gradient">Incredible India</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            From snow-capped Himalayan peaks to tropical island shores — discover India&apos;s most breathtaking destinations.
          </motion.p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDIA_DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="group glass-dark rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all card-hover"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${dest.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${dest.gradient}`} />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="glass px-2.5 py-1 rounded-full text-xs text-white font-medium">{dest.region}</span>
                </div>
                
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{dest.emoji}</span>
                    <h3 className="text-2xl font-extrabold text-white">{dest.name}</h3>
                  </div>
                  <p className="text-sm font-medium" style={{ color: dest.color }}>{dest.tagline}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                
                {/* Best Time & Budget */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="glass rounded-xl px-3 py-2">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-0.5">
                      <Clock className="w-3 h-3" /> Best Time
                    </div>
                    <p className="text-white text-xs font-semibold">{dest.bestTime}</p>
                  </div>
                  <div className="glass rounded-xl px-3 py-2">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-0.5">
                      <span className="text-xs">₹</span> Budget
                    </div>
                    <p className="text-white text-xs font-semibold">{dest.budgetRange}</p>
                  </div>
                </div>

                {/* Famous Food */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                    <Utensils className="w-3 h-3" /> Must Try Food
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.famousFood.slice(0, 3).map(f => (
                      <span key={f} className="glass px-2 py-0.5 rounded-full text-xs text-gray-300">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Hidden Gem */}
                <div className="glass rounded-xl px-3 py-2.5 mb-4 border-l-2" style={{ borderColor: dest.color }}>
                  <div className="flex items-center gap-1.5 text-xs font-semibold mb-1" style={{ color: dest.color }}>
                    <Star className="w-3 h-3" /> Hidden Gem
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">{dest.hiddenGem}</p>
                </div>

                {/* Transport */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Plane className="w-3 h-3 shrink-0" />
                    <span className="truncate">{dest.transport.airport.split(",")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Train className="w-3 h-3 shrink-0" />
                    <span className="truncate">{dest.transport.duration}</span>
                  </div>
                </div>

                {/* Tags & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {dest.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full glass text-gray-300">{t}</span>
                    ))}
                  </div>
                  <Link
                    href={`/planner?destination=${encodeURIComponent(dest.name)}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-black transition-all hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${dest.color}, ${dest.color}cc)` }}
                  >
                    Plan Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
