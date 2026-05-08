"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, MapPin, Calendar, DollarSign, Heart, Backpack } from "lucide-react";

export default function AIPlanner() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    dates: "",
    budget: "Medium",
    interests: "",
    style: "Balanced"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI generation time for the wow factor
    setTimeout(() => {
      // Navigate to a mock trip result page
      router.push("/trip/new");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-6 flex items-center justify-center">
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-24 h-24 rounded-full border-t-4 border-blue-500 border-r-4 border-purple-500 border-b-4 border-transparent border-l-4 border-transparent"
          />
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-white tracking-wide"
          >
            Crafting your perfect itinerary...
          </motion.h2>
          <div className="text-gray-400 max-w-sm text-center">
            <p>Analyzing weather, finding hidden gems, and optimizing routes with Gemini AI.</p>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl glass-dark p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center justify-center gap-2">
              <Sparkles className="text-blue-400" /> AI Trip Planner
            </h1>
            <p className="text-gray-400">Tell us what you want, and let our AI do the magic.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><MapPin className="w-4 h-4" /> Destination</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Tokyo, Japan" 
                className="w-full bg-black/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-blue-500 transition-colors"
                value={formData.destination}
                onChange={e => setFormData({...formData, destination: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><Calendar className="w-4 h-4" /> Travel Dates</label>
                <input 
                  type="text" 
                  placeholder="e.g. Oct 15 - Oct 22" 
                  className="w-full bg-black/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-blue-500 transition-colors"
                  value={formData.dates}
                  onChange={e => setFormData({...formData, dates: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Budget</label>
                <select 
                  className="w-full bg-black/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-blue-500 transition-colors appearance-none"
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                >
                  <option>Budget-Friendly</option>
                  <option>Medium</option>
                  <option>Luxury</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><Heart className="w-4 h-4" /> Interests</label>
              <input 
                type="text" 
                placeholder="e.g. Food, Temples, Nature, Nightlife" 
                className="w-full bg-black/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-blue-500 transition-colors"
                value={formData.interests}
                onChange={e => setFormData({...formData, interests: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><Backpack className="w-4 h-4" /> Travel Style</label>
              <div className="grid grid-cols-3 gap-3">
                {["Relaxed", "Balanced", "Action-Packed"].map(style => (
                  <button
                    type="button"
                    key={style}
                    onClick={() => setFormData({...formData, style})}
                    className={`py-2 rounded-xl text-sm font-medium transition-all ${
                      formData.style === style ? "bg-blue-600 text-white" : "glass hover:bg-white/10 text-gray-300"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Generate Dream Trip
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
