"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getOrSetGuestId } from "@/lib/auth-utils";

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

  useEffect(() => {
    const fetchHistory = async () => {
      const gId = localStorage.getItem("doodle_guest_id");
      if (!gId) {
        setLoading(false);
        return;
      }

      try {
        const gId = getOrSetGuestId();
        if (gId) {
        fetch(`/api/history/doodles?guestId=${gId}`)
          .then(res => res.json())
          .then(data => {
              setHistory(data.history);
              setInsight(data.insight);
            }
          );
        }
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
                <div key={item._id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border-2 border-white">
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
    </div>
  );
}