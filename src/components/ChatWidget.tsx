"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "Best time to visit Kashmir? 🏔️",
  "Budget for 7 days in Goa? 🏖️",
  "Train from Delhi to Varanasi? 🚂",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Namaste! 🙏 I'm YatraVerse AI. Ask me anything about traveling across India!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text?: string) => {
    const userMsg = (text || input).trim();
    if (!userMsg) return;
    
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsLoading(true);

    // Mock responses based on keyword matching for demo
    setTimeout(() => {
      let reply = "That's a great question! I can help you plan an incredible trip. Could you share your budget range in ₹ and how many days you have?";
      
      if (userMsg.toLowerCase().includes("kashmir")) {
        reply = "Kashmir is best visited April–June for flowers, or September–November for autumn colors. Budget around ₹8,000–₹15,000/day. Must-do: Shikara ride on Dal Lake and Gulmarg Gondola! 🏔️";
      } else if (userMsg.toLowerCase().includes("goa")) {
        reply = "Goa is perfect from November to February. Budget ₹3,000–₹8,000/day. Head to South Goa (Palolem, Agonda) for a quieter experience. 🏖️";
      } else if (userMsg.toLowerCase().includes("train") || userMsg.toLowerCase().includes("varanasi")) {
        reply = "The Shiv Ganga Express (12559) from Delhi to Varanasi takes ~12 hours and costs ₹350–₹2,400 depending on class. Book on IRCTC.co.in 🚂";
      } else if (userMsg.toLowerCase().includes("budget") || userMsg.toLowerCase().includes("cost")) {
        reply = "A mid-range India trip costs ₹4,000–₹8,000/day including hotel, food, and local transport. Budget backpackers can do it for ₹1,500/day! Want a detailed breakdown? 💰";
      }

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setIsLoading(false);
    }, 1400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 sm:w-96 glass-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #FF9933, #f97316)" }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">🇮🇳</span>
                <div>
                  <h3 className="font-bold text-black text-sm">YatraVerse AI</h3>
                  <p className="text-black/70 text-xs">India Travel Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-black/70 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "text-black font-medium" 
                      : "glass text-gray-200"
                  }`} style={msg.role === "user" ? { background: "linear-gradient(135deg, #FF9933, #f97316)" } : {}}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl glass flex gap-1 items-center">
                    <motion.div className="w-2 h-2 rounded-full bg-orange-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                    <motion.div className="w-2 h-2 rounded-full bg-orange-500" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 rounded-full bg-red-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-col gap-1.5">
                {SUGGESTED_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="glass text-left text-xs text-gray-300 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about any Indian destination..."
                  className="w-full bg-black/50 text-white rounded-full pl-4 pr-12 py-3 outline-none border border-white/10 focus:border-orange-500 transition-colors text-sm"
                />
                <button 
                  onClick={() => handleSend()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-black transition-colors"
                  style={{ background: "linear-gradient(135deg, #FF9933, #f97316)" }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-black shadow-lg glow-saffron"
        style={{ background: "linear-gradient(135deg, #FF9933, #f97316)" }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
      {!isOpen && (
        <span className="text-xs text-orange-400 mt-1 font-medium">Ask AI 🇮🇳</span>
      )}
    </div>
  );
}
