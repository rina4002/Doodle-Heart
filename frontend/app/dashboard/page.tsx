"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getOrSetGuestId } from "@/lib/auth-utils";
import { motion, AnimatePresence } from "framer-motion";

interface DoodleHistoryItem {
  _id: string;
  image: string;
  analysis: string;
  mood: string;
  sentimentScore: number;
  tags: string[];
  createdAt: string;
}

export default function ParentDashboard() { 
  const [history, setHistory] = useState<DoodleHistoryItem[]>([]);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoodle, setSelectedDoodle] = useState<DoodleHistoryItem | null>(null);

useEffect(() => {
    const fetchHistory = async () => {
      // 1. Get the ID
      const gId = getOrSetGuestId();
      
      if (!gId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/history/doodles?guestId=${gId}`);
        
        // 2. Check if the server actually returned a "success" status
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        // 3. Ensure the content type is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Expected JSON but got:", text);
          throw new Error("Server didn't send JSON");
        }

        const data = await res.json();
        setHistory(data.history || []);
        setInsight(data.insight || "");
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <p className="text-2xl font-black text-pink-400 animate-pulse">Loading Magic Memories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6 md:p-12">
      {/* HEADER SECTION */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black text-purple-700 tracking-tighter">
            Doodle <span className="text-pink-500">Heart</span>
          </h1>
          <p className="text-purple-400 font-bold uppercase tracking-widest text-sm">Parent Dashboard</p>
        </div>
        <Link 
          href="/doodle" 
          className="bg-white px-8 py-3 rounded-2xl font-black text-purple-600 shadow-[0_5px_0_rgb(233,213,255)] hover:translate-y-1 hover:shadow-none transition-all"
        >
          ← BACK TO DRAWING
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* INSIGHT CARD */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-4 border-purple-100 sticky top-12">
            <h2 className="text-2xl font-black text-purple-600 mb-4 flex items-center gap-2">
              <span>🧠</span> AI Insight
            </h2>
            <div className="bg-purple-50 p-6 rounded-3xl border-2 border-dashed border-purple-200 italic text-purple-800 font-medium">
              {insight || "No doodles analyzed yet! Go draw something magical."}
            </div>
            <div className="mt-8">
              <h3 className="font-black text-gray-400 uppercase text-xs tracking-widest mb-4">Current Mood Trend</h3>
              <div className="flex gap-2 flex-wrap">
                {Array.from(new Set(history.slice(0, 10).map(d => d.mood))).map(m => (
                  <span key={m} className="px-4 py-1 bg-pink-100 text-pink-600 rounded-full font-bold text-xs">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HISTORY GRID */}
        <div className="lg:col-span-2">
          {history.length === 0 ? (
            <div className="bg-white/50 border-4 border-dashed border-purple-200 rounded-[2.5rem] p-20 text-center">
              <p className="text-purple-300 font-bold text-xl">The gallery is empty... for now!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {history.map((item) => (
                <div key={item._id} 
                onClick={() => setSelectedDoodle(item)}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border-2 border-white">
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img src={item.image} alt="Doodle" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-black text-[10px] uppercase">
                        {item.mood}
                      </span>
                      <span className="text-gray-400 text-[10px] font-bold">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-snug line-clamp-3 font-medium">
                      {item.analysis}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>


          {/* DETAIL MODAL */}
<AnimatePresence>
  {selectedDoodle && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900/60 backdrop-blur-lg"
      onClick={() => setSelectedDoodle(null)} // Click outside to close
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Left Side: Big Image */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
          <img 
            src={selectedDoodle.image} 
            alt="Full Doodle" 
            className="max-w-full max-h-full rounded-2xl shadow-sm object-contain"
          />
        </div>

        {/* Right Side: Full Analysis */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="bg-pink-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase shadow-lg">
                Mood: {selectedDoodle.mood}
              </span>
              <button 
                onClick={() => setSelectedDoodle(null)}
                className="text-gray-300 hover:text-gray-500 text-2xl font-black"
              >
                ✕
              </button>
            </div>
            
            <h3 className="text-3xl font-black text-purple-700 mb-4 tracking-tighter">AI Memory</h3>
            <p className="text-gray-700 text-lg leading-relaxed font-medium mb-6 italic">
              "{selectedDoodle.analysis}"
            </p>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Tags Identified</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDoodle.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-500 border border-blue-100 rounded-lg text-xs font-bold">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedDoodle(null)}
            className="mt-8 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl text-lg transition-all shadow-[0_6px_0_rgb(126,34,206)] active:shadow-none active:translate-y-1"
          >
            CLOSE VIEW
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>



    </div>
  );
}