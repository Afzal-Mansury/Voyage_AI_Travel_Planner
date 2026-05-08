"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Calendar, Compass } from "lucide-react";

// India-specific mock trips for the dashboard
const mockTrips = [
  { 
    id: "1", 
    destination: "Kashmir, Jammu & Kashmir", 
    dates: "Oct 15 – Oct 22", 
    duration: "7 days",
    budget: "₹65,000 total",
    image: "https://images.unsplash.com/photo-1562462181-9a5f3c2a36bc?q=80&w=2070&auto=format&fit=crop",
    tag: "🏔️ Mountains",
  },
  { 
    id: "2", 
    destination: "Goa, West Coast", 
    dates: "Dec 22 – Dec 28", 
    duration: "6 days",
    budget: "₹42,000 total",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2074&auto=format&fit=crop",
    tag: "🏖️ Beach",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🧳</span>
              <h1 className="text-3xl font-bold text-white">My Yatras</h1>
            </div>
            <p className="text-gray-400">Your AI-planned Indian adventures, all in one place.</p>
          </div>
          <Link 
            href="/planner"
            className="mt-4 md:mt-0 px-6 py-3 rounded-full font-semibold text-black flex items-center gap-2 transition-all glow-saffron"
            style={{ background: "linear-gradient(135deg, #FF9933, #f97316)" }}
          >
            <Plus className="w-5 h-5" /> Plan New Trip
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Trips Planned", value: "2", emoji: "🗺️" },
            { label: "Destinations", value: "2", emoji: "📍" },
            { label: "Days Traveled", value: "13", emoji: "📅" },
            { label: "Total Spent", value: "₹1.07L", emoji: "💰" },
          ].map(stat => (
            <div key={stat.label} className="glass-dark rounded-2xl p-5 border border-white/10 text-center">
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-2xl font-extrabold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrips.map((trip, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={trip.id}
            >
              <Link href={`/trip/${trip.id}`}>
                <div className="group relative h-80 rounded-3xl overflow-hidden glass-dark border border-white/10 hover:border-orange-500/40 transition-all cursor-pointer card-hover">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${trip.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Tag badge */}
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs text-white font-medium">
                    {trip.tag}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">{trip.destination}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-gray-300 text-sm mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {trip.dates}
                      </div>
                      <div className="flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5" /> {trip.duration}
                      </div>
                    </div>
                    <div className="inline-flex px-3 py-1 rounded-full glass text-xs font-semibold text-orange-300">
                      {trip.budget}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Create New Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mockTrips.length * 0.1 }}
          >
            <Link href="/planner">
              <div className="h-80 rounded-3xl border-2 border-dashed border-orange-500/30 hover:border-orange-500/60 bg-orange-500/5 hover:bg-orange-500/10 transition-all flex flex-col items-center justify-center text-gray-400 hover:text-white cursor-pointer card-hover">
                <div className="text-5xl mb-4">🗺️</div>
                <div className="w-14 h-14 rounded-full glass flex items-center justify-center mb-3">
                  <Plus className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-orange-300">Plan a New Yatra</h3>
                <p className="text-xs text-gray-500 mt-1">Powered by Gemini AI</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
