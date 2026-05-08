"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Coffee, Sun, Camera, CloudSun, Utensils, Train, Plane, Shield } from "lucide-react";
import Link from "next/link";
import ExpenseEstimator from "@/components/ExpenseEstimator";
import InteractiveMap from "@/components/InteractiveMap";

// India-specific mock trip data (Goa example)
const tripData = {
  destination: "Kashmir, Jammu & Kashmir",
  duration: "7 Days",
  weather: "12°C (54°F)",
  budget: "Medium",
  tags: ["Mountains", "Nature", "Adventure"],
  heroImage: "https://images.unsplash.com/photo-1562462181-9a5f3c2a36bc?q=80&w=2070&auto=format&fit=crop",
  
  days: [
    {
      day: 1,
      title: "Arrival in Srinagar & Dal Lake",
      color: "#FF9933",
      events: [
        { time: "10:00 AM", icon: Coffee, color: "bg-orange-500", title: "Breakfast at Lal Chowk", desc: "Try Kashmiri kahwa tea and naan at a local bakery in the heart of Srinagar.", cost: "₹200" },
        { time: "01:00 PM", icon: Camera, color: "bg-blue-500", title: "Shikara Ride on Dal Lake", desc: "A classic 2-hour shikara boat ride through the famous floating gardens and houseboats.", cost: "₹600" },
        { time: "07:00 PM", icon: Sun, color: "bg-purple-500", title: "Sunset Dinner at Houseboat", desc: "Enjoy Rogan Josh and Wazwan cuisine on your houseboat while watching the sunset over Dal.", cost: "₹1,200" },
      ]
    },
    {
      day: 2,
      title: "Gulmarg Snow Adventure",
      color: "#60a5fa",
      events: [
        { time: "07:00 AM", icon: CloudSun, color: "bg-sky-500", title: "Drive to Gulmarg (56 km)", desc: "Early morning drive through scenic mountain roads to reach the famous ski resort town.", cost: "₹800 (taxi)" },
        { time: "10:00 AM", icon: Camera, color: "bg-green-500", title: "Gondola Cable Car Ride", desc: "Take the Gulmarg Gondola — one of the highest cable cars in the world with breathtaking views.", cost: "₹900/person" },
      ]
    }
  ],

  // How to Reach
  transport: {
    nearest_airport: "Sheikh ul-Alam International Airport, Srinagar (SXR)",
    flight_from_delhi: "~1 hour 30 min | ₹2,500 – ₹8,000 one-way",
    train: "Train to Udhampur, then 4h road via Jammu. Scenic but long.",
    bus: "JKSRTC buses from Delhi (18-20h), around ₹1,200–2,000",
    local: "Auto-rickshaws, shared autos, and taxis are reliable within Srinagar",
  },

  // Food Guide
  food: [
    { name: "Rogan Josh", type: "🍖 Non-Veg", desc: "Slow-cooked lamb in a rich Kashmiri spice gravy. A must-try.", veg: false },
    { name: "Yakhni", type: "🍲 Non-Veg", desc: "Lamb cooked in yogurt-based gravy with fennel seeds. Light yet flavorful.", veg: false },
    { name: "Kashmiri Pulao", type: "🍚 Veg", desc: "Fragrant rice with dry fruits, saffron, and whole spices. Absolutely divine.", veg: true },
    { name: "Kahwa Tea", type: "☕ Drink", desc: "Green tea with saffron, cardamom, cinnamon and almonds — the soul of Kashmir.", veg: true },
  ],

  // Travel Like a Local Tips
  localTips: [
    { emoji: "✅", type: "tip", text: "Hire a local guide for Gulmarg — they know shortcuts and less-crowded spots." },
    { emoji: "⚠️", type: "warn", text: "Avoid unofficial shikara operators near Dal Lake — always negotiate and agree on price before boarding." },
    { emoji: "🗣️", type: "phrase", text: "Say 'Shukriya' (شکریہ) for thank you in Kashmiri — locals will love you for it!" },
    { emoji: "👗", type: "culture", text: "Dress modestly when visiting Dargahs and mosques — cover your head if female." },
    { emoji: "📱", type: "tip", text: "Download BSNL/Airtel maps offline — internet can be patchy in mountain areas." },
  ],

  packingList: ["Warm layers (even in summer)", "Waterproof jacket", "Trekking shoes", "Sunscreen (SPF 50+)", "Cash in INR (ATMs limited)", "Power bank"],
};

export default function TripResults() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 mb-6 w-fit transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to My Trips
        </Link>

        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden mb-10 group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url(${tripData.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* India flag stripe at top */}
          <div className="absolute top-0 left-0 w-full h-1.5 flex">
            <div className="flex-1" style={{ background: "#FF9933" }} />
            <div className="flex-1 bg-white" />
            <div className="flex-1" style={{ background: "#138808" }} />
          </div>

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-3"
            >
              🏔️ {tripData.destination}
            </motion.h1>
            <div className="flex flex-wrap gap-3">
              <div className="glass px-4 py-1.5 rounded-full text-white text-sm flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-yellow-400" /> {tripData.weather}
              </div>
              <div className="glass px-4 py-1.5 rounded-full text-white text-sm">{tripData.duration}</div>
              <div className="glass px-4 py-1.5 rounded-full text-white text-sm">{tripData.budget} Budget</div>
              {tripData.tags.map(t => (
                <div key={t} className="glass px-4 py-1.5 rounded-full text-orange-300 text-sm">{t}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Itinerary + Food + Local Tips */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* === ITINERARY DAYS === */}
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              📅 AI-Generated Itinerary
            </h2>

            {tripData.days.map((day, dayIdx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIdx * 0.15 }}
                key={day.day}
                className="glass-dark rounded-[2rem] p-6 md:p-8 border border-white/10"
              >
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                  <span 
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-black"
                    style={{ background: day.color }}
                  >D{day.day}</span>
                  {day.title}
                </h3>

                <div className="space-y-5">
                  {day.events.map((event, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`w-10 h-10 rounded-full ${event.color} flex items-center justify-center shrink-0 mt-1`}>
                        <event.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="glass p-4 rounded-xl flex-1 hover:bg-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <div className="text-xs font-bold text-orange-400">{event.time}</div>
                          <span className="text-xs glass px-2 py-0.5 rounded-full text-green-400 font-semibold">{event.cost}</span>
                        </div>
                        <h4 className="text-white font-bold mb-1">{event.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Day 3 Skeleton */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-dark rounded-[2rem] p-6 md:p-8 border border-white/10 opacity-70"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-sm">D3</span>
                Pahalgam Valley Trek
              </h3>
              <div className="space-y-3">
                <div className="skeleton h-16 rounded-xl" />
                <div className="skeleton h-16 rounded-xl w-5/6" />
              </div>
            </motion.div>

            {/* === FOOD GUIDE === */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-dark rounded-[2rem] p-6 md:p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-orange-400" /> Local Food Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tripData.food.map(f => (
                  <div key={f.name} className="glass p-4 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-bold">{f.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${f.veg ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"}`}>
                        {f.veg ? "🟢 Veg" : "🔴 Non-Veg"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{f.type}</p>
                    <p className="text-sm text-gray-300 mt-1">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* === HOW TO REACH === */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-dark rounded-[2rem] p-6 md:p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Train className="w-5 h-5 text-blue-400" /> How To Reach
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Plane, label: "Nearest Airport", value: tripData.transport.nearest_airport, color: "text-blue-400 bg-blue-500/20" },
                  { icon: Plane, label: "Flight from Delhi", value: tripData.transport.flight_from_delhi, color: "text-orange-400 bg-orange-500/20" },
                  { icon: Train, label: "By Train", value: tripData.transport.train, color: "text-green-400 bg-green-500/20" },
                  { icon: MapPin, label: "Local Transport", value: tripData.transport.local, color: "text-purple-400 bg-purple-500/20" },
                ].map(item => (
                  <div key={item.label} className="glass p-4 rounded-xl flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                      <div className="text-sm text-white font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* === TRAVEL LIKE A LOCAL === */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-dark rounded-[2rem] p-6 md:p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-400" /> Travel Like a Local
              </h3>
              <div className="space-y-3">
                {tripData.localTips.map((tip, i) => (
                  <div key={i} className={`p-4 rounded-xl border text-sm ${
                    tip.type === "warn" ? "bg-red-900/20 border-red-500/30 text-red-200" :
                    tip.type === "phrase" ? "bg-blue-900/20 border-blue-500/30 text-blue-200" :
                    "glass border-white/10 text-gray-200"
                  }`}>
                    <span className="mr-2 text-base">{tip.emoji}</span>
                    {tip.text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* === PACKING LIST === */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-dark rounded-[2rem] p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-4">🎒 Packing Checklist</h3>
              <div className="flex flex-wrap gap-2">
                {tripData.packingList.map(item => (
                  <span key={item} className="glass px-3 py-1.5 rounded-full text-sm text-gray-300 flex items-center gap-1.5">
                    <span className="text-green-400">✓</span> {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar: Map + Budget */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-400" /> Trip Map
              </h3>
              <InteractiveMap />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                💰 Budget Breakdown (INR)
              </h3>
              <ExpenseEstimator />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
