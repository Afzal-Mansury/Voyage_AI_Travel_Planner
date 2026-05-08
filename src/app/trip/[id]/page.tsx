"use client";

import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Coffee, Sun, Camera, CloudSun, Utensils, Train, Plane, Shield, Share, Download } from "lucide-react";
import Link from "next/link";
import ExpenseEstimator from "@/components/ExpenseEstimator";
import InteractiveMap from "@/components/InteractiveMap";
import { useSearchParams } from "next/navigation";
import { INDIA_DESTINATIONS } from "@/lib/destinations";

// Per-destination mock itinerary data
const DESTINATION_DATA: Record<string, any> = {
  kashmir: {
    emoji: "🏔️",
    weather: "12°C (54°F)",
    days: [
      {
        day: 1, title: "Arrival in Srinagar & Dal Lake", color: "#FF9933",
        events: [
          { time: "10:00 AM", icon: Coffee, color: "bg-orange-500", title: "Breakfast at Lal Chowk", desc: "Try Kashmiri kahwa tea and naan at a local bakery in the heart of Srinagar.", cost: "₹200" },
          { time: "01:00 PM", icon: Camera, color: "bg-blue-500", title: "Shikara Ride on Dal Lake", desc: "A classic 2-hour shikara boat ride through the famous floating gardens and houseboats.", cost: "₹600" },
          { time: "07:00 PM", icon: Sun, color: "bg-purple-500", title: "Sunset Dinner at Houseboat", desc: "Enjoy Rogan Josh and Wazwan cuisine on your houseboat while watching the sunset.", cost: "₹1,200" },
        ]
      },
      {
        day: 2, title: "Gulmarg Snow Adventure", color: "#60a5fa",
        events: [
          { time: "07:00 AM", icon: CloudSun, color: "bg-sky-500", title: "Drive to Gulmarg (56 km)", desc: "Scenic mountain road drive to the famous ski resort town.", cost: "₹800 (taxi)" },
          { time: "10:00 AM", icon: Camera, color: "bg-green-500", title: "Gondola Cable Car Ride", desc: "One of the highest cable cars in the world with breathtaking Himalayan views.", cost: "₹900/person" },
        ]
      },
      {
        day: 3, title: "Pahalgam Valley & Betaab Valley", color: "#a78bfa",
        events: [
          { time: "07:30 AM", icon: Coffee, color: "bg-purple-500", title: "Drive to Pahalgam (95 km)", desc: "Scenic 2.5h drive through the Lidder Valley — one of the prettiest drives in all of India.", cost: "₹1,200 (taxi)" },
          { time: "11:00 AM", icon: Camera, color: "bg-green-500", title: "Betaab Valley Exploration", desc: "Famous filming location for Bollywood. Lush green meadows, crystal streams, and snow peaks.", cost: "₹200 (entry)" },
          { time: "03:00 PM", icon: Sun, color: "bg-yellow-500", title: "Aru Valley Trek", desc: "A moderate 3km trek to Aru Valley — perfect alpine meadows ideal for photography.", cost: "₹500 (horse ride optional)" },
        ]
      }
    ],
    food: [
      { name: "Rogan Josh", type: "🍖 Non-Veg", desc: "Slow-cooked lamb in rich Kashmiri spice gravy.", veg: false },
      { name: "Yakhni", type: "🍲 Non-Veg", desc: "Lamb in yogurt-based gravy with fennel seeds.", veg: false },
      { name: "Kashmiri Pulao", type: "🍚 Veg", desc: "Fragrant rice with dry fruits, saffron and whole spices.", veg: true },
      { name: "Kahwa Tea", type: "☕ Drink", desc: "Green tea with saffron, cardamom, cinnamon and almonds.", veg: true },
    ],
    localTips: [
      { emoji: "✅", type: "tip", text: "Hire a local guide for Gulmarg — they know shortcuts and less-crowded spots." },
      { emoji: "⚠️", type: "warn", text: "Avoid unofficial shikara operators near Dal Lake — always agree on price before boarding." },
      { emoji: "🗣️", type: "phrase", text: "Say 'Shukriya' (شکریہ) for thank you in Kashmiri — locals will love you for it!" },
      { emoji: "👗", type: "culture", text: "Dress modestly when visiting Dargahs and mosques — cover your head if female." },
    ],
    packingList: ["Warm layers", "Waterproof jacket", "Trekking shoes", "Sunscreen SPF 50+", "Cash in INR", "Power bank"],
  },
  goa: {
    emoji: "🏖️",
    weather: "28°C (82°F)",
    days: [
      {
        day: 1, title: "Arrival & North Goa Beaches", color: "#f97316",
        events: [
          { time: "11:00 AM", icon: Coffee, color: "bg-yellow-500", title: "Breakfast at Baga Shack", desc: "Start with fresh coconut water, prawn omelette, and Goan sausage toast.", cost: "₹400" },
          { time: "02:00 PM", icon: Sun, color: "bg-blue-500", title: "Baga & Calangute Beach", desc: "The most popular stretch of beach in North Goa, vibrant with water sports.", cost: "₹600 (parasailing)" },
          { time: "08:00 PM", icon: Camera, color: "bg-orange-500", title: "Tito's Lane Nightlife", desc: "Experience Goa's famous nightlife at Tito's street with live music and food stalls.", cost: "₹1,500" },
        ]
      },
      {
        day: 2, title: "Old Goa Heritage & South Goa", color: "#34d399",
        events: [
          { time: "09:00 AM", icon: Camera, color: "bg-purple-500", title: "Basilica of Bom Jesus", desc: "UNESCO World Heritage church housing the relics of St. Francis Xavier. Stunning colonial architecture.", cost: "Free" },
          { time: "03:00 PM", icon: Sun, color: "bg-sky-500", title: "Palolem Beach, South Goa", desc: "A crescent-shaped paradise with crystal-clear water, much quieter than North Goa.", cost: "₹500 (kayak)" },
        ]
      },
      {
        day: 3, title: "Dudhsagar Falls & Spice Plantation", color: "#f472b6",
        events: [
          { time: "07:00 AM", icon: CloudSun, color: "bg-pink-500", title: "Dudhsagar Waterfall Jeep Safari", desc: "Dramatic 4-tier waterfall on the Goa-Karnataka border. The jeep safari through the jungle is thrilling.", cost: "₹1,200 (jeep)" },
          { time: "01:00 PM", icon: Coffee, color: "bg-green-500", title: "Spice Plantation Lunch Tour", desc: "Guided tour of a Goan spice farm followed by an authentic Goan lunch served on a banana leaf.", cost: "₹800" },
          { time: "06:00 PM", icon: Camera, color: "bg-yellow-500", title: "Anjuna Flea Market", desc: "Goa's iconic Wednesday flea market with crafts, clothes, and street food from across India.", cost: "₹300" },
        ]
      }
    ],
    food: [
      { name: "Fish Curry Rice", type: "🐟 Non-Veg", desc: "Goa's soul food — tangy red curry with fresh local fish and steamed rice.", veg: false },
      { name: "Prawn Balchão", type: "🍤 Non-Veg", desc: "Spicy pickled prawn masala — a bold Goan classic.", veg: false },
      { name: "Bebinca", type: "🍰 Dessert", desc: "Traditional Goan layered coconut pudding — the queen of Goan desserts.", veg: true },
      { name: "Feni", type: "🍶 Drink", desc: "Goa's iconic cashew spirit. Try it at a local taverna!", veg: true },
    ],
    localTips: [
      { emoji: "🛵", type: "tip", text: "Rent a scooter (₹300–500/day) — it's the best way to explore Goa at your own pace." },
      { emoji: "⚠️", type: "warn", text: "Be wary of taxi overcharging from the airport. Use Goa Miles app instead." },
      { emoji: "🗣️", type: "phrase", text: "Say 'Devu borem korum' (God bless you) — Konkani greeting locals adore." },
      { emoji: "🌊", type: "culture", text: "Swim only at lifeguard-patrolled beaches — the sea can be rough during shoulder season." },
    ],
    packingList: ["Light cotton clothes", "Sunscreen SPF 50+", "Flip flops", "Waterproof bag", "Driving licence (for scooter)", "Cash (many shacks are cash-only)"],
  },
  kerala: {
    emoji: "🌴",
    weather: "27°C (81°F)",
    days: [
      {
        day: 1, title: "Arrival in Kochi & Fort Kochi Walk", color: "#4ade80",
        events: [
          { time: "09:00 AM", icon: Camera, color: "bg-green-500", title: "Chinese Fishing Nets at Sunrise", desc: "Watch the iconic cantilever fishing nets at Fort Kochi beach — a photographers' dream.", cost: "Free" },
          { time: "01:00 PM", icon: Coffee, color: "bg-yellow-500", title: "Lunch at a Kerala Sadhya", desc: "A traditional banana-leaf feast with 20+ vegetarian dishes — an unforgettable experience.", cost: "₹350" },
          { time: "07:00 PM", icon: Sun, color: "bg-orange-500", title: "Kathakali Performance", desc: "Kerala's classical dance-drama with elaborate costumes and expressive storytelling.", cost: "₹400" },
        ]
      },
      {
        day: 2, title: "Alleppey Houseboat Experience", color: "#06b6d4",
        events: [
          { time: "10:00 AM", icon: CloudSun, color: "bg-blue-500", title: "Board Your Houseboat (Kettuvallam)", desc: "Cruise through the famous Kerala backwaters on a traditional wooden houseboat.", cost: "₹8,000 (per night)" },
          { time: "03:00 PM", icon: Camera, color: "bg-teal-500", title: "Village Life Along Backwaters", desc: "Watch toddy tappers, coir weavers, and duck farms along the quiet canals.", cost: "Included" },
        ]
      },
      {
        day: 3, title: "Munnar Tea Gardens & Eravikulam", color: "#34d399",
        events: [
          { time: "06:30 AM", icon: CloudSun, color: "bg-emerald-500", title: "Sunrise at Munnar Viewpoint", desc: "Watch the sun rise over endless rolling tea estates — one of the most magical sights in South India.", cost: "Free" },
          { time: "10:00 AM", icon: Camera, color: "bg-teal-500", title: "Eravikulam National Park", desc: "Home to the endangered Nilgiri Tahr. Stunning plateau views and wildlife sightings.", cost: "₹430 (entry)" },
          { time: "03:00 PM", icon: Coffee, color: "bg-green-600", title: "Tea Factory Visit & Tasting", desc: "Tour a working Munnar tea factory, learn the production process, and sample fresh brews.", cost: "₹200" },
        ]
      }
    ],
    food: [
      { name: "Appam & Stew", type: "🥞 Veg/Non-Veg", desc: "Lacy rice hoppers with a coconut milk-based vegetable or chicken stew.", veg: false },
      { name: "Karimeen Pollichathu", type: "🐟 Non-Veg", desc: "Pearl spot fish marinated and grilled in banana leaf — a Kerala delicacy.", veg: false },
      { name: "Puttu & Kadala", type: "🍚 Veg", desc: "Steamed rice cylinders with spiced black chickpea curry — a traditional breakfast.", veg: true },
      { name: "Kerala Chai", type: "☕ Drink", desc: "Spiced tea with ginger and cardamom — perfect with a view of the backwaters.", veg: true },
    ],
    localTips: [
      { emoji: "⛵", type: "tip", text: "Book your houseboat well in advance — they fill up fast, especially Dec–Jan." },
      { emoji: "⚠️", type: "warn", text: "Don't swim in backwater canals — they look calm but have strong currents." },
      { emoji: "🗣️", type: "phrase", text: "Say 'Nandi' for thank you in Malayalam — pronounced 'Nan-di'." },
      { emoji: "🌿", type: "culture", text: "Ayurvedic massages are authentic in Kerala — book a proper centre, not tourist traps." },
    ],
    packingList: ["Light breathable clothes", "Mosquito repellent", "Sunscreen", "Rain jacket (monsoon)", "Comfortable walking shoes", "Power bank"],
  },
};

// Fallback generic data for destinations not in the map above
function getGenericData(destName: string) {
  const dest = INDIA_DESTINATIONS.find(d => d.name.toLowerCase() === destName.toLowerCase());
  return {
    emoji: dest?.emoji || "🗺️",
    weather: "25°C (77°F)",
    days: [
      {
        day: 1, title: `Arrival & Exploration of ${destName}`, color: "#FF9933",
        events: [
          { time: "10:00 AM", icon: Coffee, color: "bg-orange-500", title: `Morning in ${destName}`, desc: `Arrive and check in. Freshen up and head out for a local breakfast near your hotel.`, cost: "₹300" },
          { time: "02:00 PM", icon: Camera, color: "bg-blue-500", title: "Key Attractions Visit", desc: `Explore the most famous landmarks and sights that make ${destName} special.`, cost: "₹500" },
          { time: "07:00 PM", icon: Sun, color: "bg-purple-500", title: "Local Market & Dinner", desc: `Dive into the local bazaar and enjoy authentic regional cuisine for dinner.`, cost: "₹600" },
        ]
      },
      {
        day: 2, title: "Day Trip & Hidden Gems", color: "#60a5fa",
        events: [
          { time: "08:00 AM", icon: CloudSun, color: "bg-sky-500", title: "Hidden Gem Discovery", desc: dest?.hiddenGem || `Explore the lesser-known corners of ${destName} that most tourists miss.`, cost: "₹400" },
          { time: "03:00 PM", icon: Camera, color: "bg-green-500", title: "Photography & Culture", desc: "Capture the local culture, street life, and scenic landscapes.", cost: "₹200" },
        ]
      },
      {
        day: 3, title: `Local Life & Departure Prep`, color: "#a78bfa",
        events: [
          { time: "09:00 AM", icon: Coffee, color: "bg-violet-500", title: "Morning Walk & Local Breakfast", desc: `Start your final day with a leisurely walk through ${destName}'s neighbourhood streets and a local breakfast.`, cost: "₹250" },
          { time: "12:00 PM", icon: Sun, color: "bg-pink-500", title: "Shopping & Souvenirs", desc: "Pick up local handicrafts and authentic souvenirs to take home — support local artisans.", cost: "₹1,000" },
          { time: "06:00 PM", icon: Camera, color: "bg-orange-400", title: "Farewell Sunset & Dinner", desc: `End your ${destName} yatra with a beautiful sunset and a special farewell dinner at a top local restaurant.`, cost: "₹800" },
        ]
      }
    ],
    day3title: `Day 3 in ${destName} — More Exploration`,
    food: dest?.famousFood.map((f, i) => ({
      name: f, type: i % 2 === 0 ? "🍴 Local Special" : "☕ Must Try",
      desc: `A famous local dish from ${destName} that you absolutely cannot miss.`,
      veg: i % 2 === 0,
    })) || [],
    localTips: [
      { emoji: "✅", type: "tip", text: `Hire a local guide to unlock the best experiences in ${destName}.` },
      { emoji: "⚠️", type: "warn", text: "Always negotiate prices before taking local transport." },
      { emoji: "🗣️", type: "phrase", text: "Learning a few words in the local language always wins hearts." },
      { emoji: "💵", type: "tip", text: "Carry cash — many local places don't accept cards." },
    ],
    packingList: ["Comfortable walking shoes", "Sunscreen", "Cash in INR", "Power bank", "Camera", "Light layers"],
  };
}

function TripContent() {
  const searchParams = useSearchParams();

  // Read form data from URL params
  const destParam = searchParams.get("destination") || "Kashmir";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const budget = searchParams.get("budget") || "Medium";
  const interests = searchParams.get("interests") || "";
  const style = searchParams.get("style") || "Balanced";

  // Calculate trip duration
  const days = startDate && endDate
    ? Math.max(1, Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000))
    : 7;

  const dateLabel = startDate && endDate
    ? `${new Date(startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${new Date(endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
    : "7 Days";

  // Match destination to data
  const destKey = destParam.toLowerCase().replace(/,.*/, "").trim();
  const destInfo = INDIA_DESTINATIONS.find(d => d.name.toLowerCase() === destKey) || INDIA_DESTINATIONS[0];

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const aiStr = sessionStorage.getItem("yatraverse_ai_trip");
    if (aiStr) {
      try {
        const parsed = JSON.parse(aiStr);
        const iconMap: Record<string, any> = { Coffee, Camera, Sun, CloudSun, Utensils, MapPin };
        
        parsed.days.forEach((day: any) => {
          day.events.forEach((event: any) => {
            event.icon = iconMap[event.icon] || MapPin;
          });
        });
        
        parsed.emoji = destInfo?.emoji || "🗺️";
        setData(parsed);
        return;
      } catch (e) {
        console.error("AI Parse error", e);
      }
    }
    setData(DESTINATION_DATA[destKey] || getGenericData(destParam));
  }, [destKey, destParam, destInfo]);

  if (!data) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 w-fit transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to My Trips
          </Link>
          <div className="flex gap-3">
            <button onClick={() => window.print()} className="glass px-4 py-2 rounded-xl text-white text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4 text-orange-400" /> Save PDF
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden mb-10 group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url(${destInfo.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
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
              {data.emoji} {destParam}
            </motion.h1>
            <div className="flex flex-wrap gap-3">
              <div className="glass px-4 py-1.5 rounded-full text-white text-sm flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-yellow-400" /> {data.weather}
              </div>
              <div className="glass px-4 py-1.5 rounded-full text-white text-sm">📅 {dateLabel}</div>
              <div className="glass px-4 py-1.5 rounded-full text-white text-sm">⏱ {days} Days</div>
              <div className="glass px-4 py-1.5 rounded-full text-orange-300 text-sm">{budget}</div>
              {style && <div className="glass px-4 py-1.5 rounded-full text-blue-300 text-sm">🎒 {style}</div>}
              {interests && interests.split(",").slice(0, 2).map(i => (
                <div key={i} className="glass px-4 py-1.5 rounded-full text-green-300 text-sm">{i.trim()}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Itinerary + Food + Local Tips */}
          <div className="lg:col-span-2 space-y-8">
            
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              📅 AI-Generated Itinerary
            </h2>

            {data.days.map((day: any, dayIdx: number) => (
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
                  {day.events.map((event: any, i: number) => (
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

            {/* Day 3 — real content, no skeleton */}
            {days > 2 && data.days[2] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                key={data.days[2].day}
                className="glass-dark rounded-[2rem] p-6 md:p-8 border border-white/10"
              >
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-black"
                    style={{ background: data.days[2].color }}
                  >D3</span>
                  {data.days[2].title}
                </h3>
                <div className="space-y-5">
                  {data.days[2].events.map((event: any, i: number) => (
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
            )}

            {/* Food Guide */}
            {data.food.length > 0 && (
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
                  {data.food.map((f: any) => (
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
            )}

            {/* How To Reach */}
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
                  { icon: Plane, label: "Nearest Airport", value: destInfo.transport.airport, color: "text-blue-400 bg-blue-500/20" },
                  { icon: Train, label: "By Train", value: destInfo.transport.train, color: "text-green-400 bg-green-500/20" },
                  { icon: MapPin, label: "Travel Duration", value: destInfo.transport.duration, color: "text-orange-400 bg-orange-500/20" },
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

            {/* Travel Like a Local */}
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
                {data.localTips.map((tip: any, i: number) => (
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

            {/* Packing Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-dark rounded-[2rem] p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-4">🎒 Packing Checklist</h3>
              <div className="flex flex-wrap gap-2">
                {data.packingList.map((item: string) => (
                  <span key={item} className="glass px-3 py-1.5 rounded-full text-sm text-gray-300 flex items-center gap-1.5">
                    <span className="text-green-400">✓</span> {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-400" /> Trip Map
              </h3>
              <InteractiveMap destination={destParam} />
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

export default function TripResults() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white text-xl">Loading your trip...</div>
      </div>
    }>
      <TripContent />
    </Suspense>
  );
}
