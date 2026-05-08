"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, MapPin, Calendar, Compass } from "lucide-react";

// Mock data for MVP
const mockTrips = [
  { id: "1", destination: "Kyoto, Japan", dates: "Oct 15 - Oct 22", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" },
  { id: "2", destination: "Amalfi Coast, Italy", dates: "Jul 10 - Jul 18", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1888&auto=format&fit=crop" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Trips</h1>
            <p className="text-gray-400">Manage and view your upcoming adventures.</p>
          </div>
          <Link 
            href="/planner"
            className="mt-4 md:mt-0 px-6 py-3 bg-white text-black rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
          >
            <Plus className="w-5 h-5" /> New Trip
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrips.map((trip, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={trip.id}
            >
              <Link href={`/trip/${trip.id}`}>
                <div className="group relative h-80 rounded-3xl overflow-hidden glass-dark border border-white/10 hover:border-white/30 transition-all cursor-pointer">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${trip.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{trip.destination}</h3>
                    <div className="flex items-center gap-4 text-gray-300 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {trip.dates}
                      </div>
                      <div className="flex items-center gap-1">
                        <Compass className="w-4 h-4" /> 7 days
                      </div>
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
              <div className="h-80 rounded-3xl border-2 border-dashed border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center text-gray-400 hover:text-white cursor-pointer">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium">Create New Trip</h3>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
