"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Coffee, Sun, Camera, CloudSun } from "lucide-react";
import Link from "next/link";
import ExpenseEstimator from "@/components/ExpenseEstimator";
import InteractiveMap from "@/components/InteractiveMap";

export default function TripResults() {
  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 mb-6 w-fit transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Trips
        </Link>

        {/* Header Hero */}
        <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden mb-10 group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              7 Days in Kyoto, Japan
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-4 text-sm font-medium"
            >
              <div className="glass px-4 py-2 rounded-full text-white flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-yellow-400" /> 22°C (72°F)
              </div>
              <div className="glass px-4 py-2 rounded-full text-white">
                Medium Budget
              </div>
              <div className="glass px-4 py-2 rounded-full text-white">
                Culture & Nature
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Itinerary */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Your AI-Generated Itinerary
            </h2>

            {/* Day 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-dark rounded-[2rem] p-6 md:p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">D1</span>
                Arrival & Exploration
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-purple-500">
                
                {/* Event 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-blue-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-4 rounded-xl ml-4 md:ml-0 group-hover:bg-white/10 transition-colors">
                    <div className="text-sm text-blue-400 font-bold mb-1">09:00 AM</div>
                    <h4 className="text-white font-bold mb-1">Breakfast at Nishiki Market</h4>
                    <p className="text-gray-400 text-sm">Explore the vibrant stalls and try local street food delicacies.</p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-purple-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-4 rounded-xl ml-4 md:ml-0 group-hover:bg-white/10 transition-colors">
                    <div className="text-sm text-purple-400 font-bold mb-1">01:00 PM</div>
                    <h4 className="text-white font-bold mb-1">Fushimi Inari Taisha</h4>
                    <p className="text-gray-400 text-sm">Hike through the iconic thousands of vermilion torii gates.</p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Day 2 Skeleton Placeholder for Demo */}
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-dark rounded-[2rem] p-6 md:p-8 border border-white/10 opacity-75"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">D2</span>
                Temples & Bamboo Forest
              </h3>
              <div className="h-20 glass rounded-xl animate-pulse mb-4"></div>
              <div className="h-20 glass rounded-xl animate-pulse w-3/4"></div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <InteractiveMap />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ExpenseEstimator />
            </motion.div>

            {/* Travel Tips */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-dark rounded-[2rem] p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-4">AI Travel Tips</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-gray-300">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  Buy an IC card (Suica/Pasmo) for easy transit.
                </li>
                <li className="flex gap-3 text-sm text-gray-300">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  Many small restaurants only accept cash, bring Yen.
                </li>
                <li className="flex gap-3 text-sm text-gray-300">
                  <div className="mt-1 w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                  Learn basic phrases like "Arigatou" (Thank you).
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
