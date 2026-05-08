"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, MapPin, Calendar, IndianRupee, Heart, Backpack } from "lucide-react";
import { Suspense } from "react";

// Popular Indian destinations for quick selection
const QUICK_DESTINATIONS = [
  "Kashmir", "Goa", "Kerala", "Ladakh", "Jaipur", "Varanasi", "Meghalaya", "Andaman", "Hyderabad"
];

const LOADING_STEPS = [
  "🔍 Analyzing your travel preferences...",
  "🗺️ Mapping the best routes across India...",
  "🍛 Curating local food recommendations...",
  "🌟 Finding hidden gems & local secrets...",
  "🚂 Optimizing transport connections...",
  "💰 Calculating INR budget breakdown...",
  "✨ Crafting your perfect Indian journey...",
];

function PlannerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [formData, setFormData] = useState({
    destination: searchParams.get("destination") || "",
    dates: "",
    budget: "Medium (₹5,000–₹12,000/day)",
    interests: "",
    style: "Balanced"
  });

  // Animate loading steps
  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= LOADING_STEPS.length - 1) return prev;
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setLoadingStep(0);
    setTimeout(() => {
      router.push("/trip/new");
    }, 4200);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12 px-6 flex items-center justify-center">
      {isGenerating ? (
        /* AI Generation Loading State */
        <div className="flex flex-col items-center justify-center space-y-8 max-w-md text-center">
          {/* Animated orb */}
          <div className="relative w-32 h-32">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{ border: "3px solid transparent", borderTopColor: "#FF9933", borderRightColor: "#f97316" }}
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-3 rounded-full"
              style={{ border: "2px solid transparent", borderTopColor: "#a78bfa", borderLeftColor: "#34d399" }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🇮🇳</div>
          </div>
          
          <motion.h2 className="text-2xl font-bold text-white">
            Crafting your Indian journey...
          </motion.h2>

          <div className="space-y-2 w-full">
            {LOADING_STEPS.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: i <= loadingStep ? 1 : 0.2, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-sm px-4 py-2 rounded-lg transition-all ${
                  i === loadingStep ? "glass border border-orange-500/40 text-orange-300" : 
                  i < loadingStep ? "text-gray-500" : "text-gray-600"
                }`}
              >
                {i < loadingStep ? "✅" : i === loadingStep ? "⏳" : "○"} {step}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Planning Form */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl glass-dark p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Top gradient bar — India flag colors */}
          <div className="absolute top-0 left-0 w-full h-1.5 flex">
            <div className="flex-1" style={{ background: "#FF9933" }} />
            <div className="flex-1 bg-white" />
            <div className="flex-1" style={{ background: "#138808" }} />
          </div>
          
          <div className="mb-10 text-center">
            <div className="text-4xl mb-3">🇮🇳</div>
            <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center justify-center gap-2">
              <Sparkles className="text-orange-400" /> AI Yatra Planner
            </h1>
            <p className="text-gray-400">Tell us where you&apos;d like to go across India — our AI will handle the rest.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" /> Destination in India
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. Kashmir, Goa, Kerala..." 
                className="w-full bg-black/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-orange-500 transition-colors"
                value={formData.destination}
                onChange={e => setFormData({...formData, destination: e.target.value})}
              />
              {/* Quick selection pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_DESTINATIONS.slice(0, 5).map(d => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setFormData({...formData, destination: d})}
                    className={`text-xs px-3 py-1 rounded-full transition-all ${
                      formData.destination === d 
                        ? "text-black font-semibold" 
                        : "glass text-gray-300 hover:bg-white/10"
                    }`}
                    style={formData.destination === d ? { background: "#FF9933" } : {}}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-400" /> Travel Dates
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Nov 15 – Nov 22" 
                  className="w-full bg-black/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-orange-500 transition-colors"
                  value={formData.dates}
                  onChange={e => setFormData({...formData, dates: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-orange-400" /> Budget (INR)
                </label>
                <select 
                  className="w-full bg-black/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-orange-500 transition-colors appearance-none"
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                >
                  <option>Budget (₹1,000–₹3,000/day)</option>
                  <option>Medium (₹5,000–₹12,000/day)</option>
                  <option>Premium (₹15,000–₹30,000/day)</option>
                  <option>Luxury (₹30,000+/day)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Heart className="w-4 h-4 text-orange-400" /> Interests
              </label>
              <input 
                type="text" 
                placeholder="e.g. Temples, Food, Trekking, Photography, Beaches..." 
                className="w-full bg-black/50 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-orange-500 transition-colors"
                value={formData.interests}
                onChange={e => setFormData({...formData, interests: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Backpack className="w-4 h-4 text-orange-400" /> Travel Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Relaxed 🧘", "Balanced 🎒", "Action 🏃"].map(style => {
                  const base = style.split(" ")[0];
                  return (
                    <button
                      type="button"
                      key={style}
                      onClick={() => setFormData({...formData, style: base})}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                        formData.style === base 
                          ? "text-black font-bold" 
                          : "glass hover:bg-white/10 text-gray-300"
                      }`}
                      style={formData.style === base ? { background: "linear-gradient(135deg, #FF9933, #f97316)" } : {}}
                    >
                      {style}
                    </button>
                  );
                })}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 mt-2 rounded-xl text-black font-bold text-lg transition-all flex items-center justify-center gap-2 glow-saffron"
              style={{ background: "linear-gradient(135deg, #FF9933, #f97316, #ef4444)" }}
            >
              <Sparkles className="w-5 h-5" /> Generate My Yatra Plan 🇮🇳
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}

export default function AIPlanner() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-white text-xl">Loading planner...</div>
    </Suspense>}>
      <PlannerContent />
    </Suspense>
  );
}
