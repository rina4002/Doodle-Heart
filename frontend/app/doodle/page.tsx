"use client";

import { getOrSetGuestId } from "@/lib/auth-utils";
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


// ==========================================
// SECTION 1: CONSTANTS & TYPES
// Description: UI configuration and TypeScript definitions.
// ==========================================

const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Eraser", hex: "#FFFFFF" }, // Just drawing in white, like a ghost
];

interface DoodleAnalysis {
  analysis: string;
  mood: string;
  sentimentScore?: number;
  colors?: string[];
  tags?: string[];
}

export default function DoodlePage() {
  // ==========================================
  // SECTION 2: STATE & REFS
  // Description: Core state management for the drawing app.
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState<DoodleAnalysis | null>(null);
  
  // ==========================================
  // SECTION 3: AI API LOGIC
  // Description: Handles image conversion and server-side analysis calls.
  // ==========================================
  const sendToAI = async () => {
    if (!canvasRef.current) return;

    setIsAnalyzing(true);
    setIsModalOpen(true);
    setAnalysisData(null); // Clear old data

    try {
      const imageData = canvasRef.current.toDataURL("image/png");
      const currentGuestId = getOrSetGuestId();

      const response = await fetch("/api/doodle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestId: currentGuestId, image: imageData }),
      });

      if (!response.ok) {
        // Handle 429 (Rate Limit) or 500 (Server Error)
        throw new Error(response.status === 429 ? "RATE_LIMIT" : "SERVER_ERROR");
      }

      const result = await response.json();
      setAnalysisData(result.data);

    } catch (error: any) {
      console.error("AI Error:", error);
      
      // Provide user-friendly feedback based on the error
      setAnalysisData({
        analysis: error.message === "RATE_LIMIT" 
          ? "The Magic Sun is tired from all the art! Take a little break and try again in a minute." 
          : "Oh no! A storm cloud blocked the Magic Sun. Try sending your doodle again!",
        mood: "Cloudy",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ==========================================
  // SECTION 4: CANVAS ENGINE (DPI & Interaction)
  // Description: Handles Canvas initialization, scaling, and drawing events.
  // ==========================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // 1. Get the device pixel ratio (usually 2 or 3)
    const dpr = window.devicePixelRatio || 1;
    
    // 2. Set the visual size (CSS pixels)
    const displayWidth = window.innerWidth - 80;
    const displayHeight = window.innerHeight;

    // 3. Set the internal resolution (Physical pixels)
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    // 4. Force the canvas back to the correct visual size
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // 5. Scale all future drawing operations by the DPR
    context.scale(dpr, dpr);
    
    context.lineCap = "round";
    context.lineWidth = 5;
    setCtx(context);
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = color;
    // If it's white, make it thicker so erasing isn't a chore
    ctx.lineWidth = color === "#FFFFFF" ? 20 : 5;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  // ==========================================
  // SECTION 5: MAIN PAGE LAYOUT
  // Description: The Sidebar, Canvas container, and parent layout.
  // ==========================================

  return (
    <div className="flex h-screen w-full bg-gray-200 overflow-hidden">
{/* --- UI: SIDEBAR (THE ART BOX) --- */}
      <div className="w-28 bg-white border-r-4 border-yellow-400 flex flex-col items-center py-6 gap-6 shadow-2xl z-10 relative">
{/* Crayon Container */}
<div className="flex flex-col gap-4 w-full items-start">
  {COLORS.filter(c => c.name !== "Eraser").map((c) => (
    <motion.button
      key={c.hex}
      onClick={() => setColor(c.hex)}
      // Use initial to force the starting position deep to the left
      initial={{ x: -45 }} 
      whileHover={{ x: -35 }} // Pulls out slightly on hover
      animate={{ 
        // When selected, it pops out to show the tip. 
        // When not selected, it stays mostly hidden (-45)
        x: color === c.hex ? -5 : -45, 
      }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      className="relative group flex items-center"
      // This ensures the button itself is positioned off-canvas to the left
      style={{ position: 'relative', left: '0px' }} 
    >
      {/* Crayon Body */}
      <div 
        className="w-24 h-10 rounded-r-full rounded-l-none shadow-lg border-r-8 border-black/10 relative overflow-hidden"
        style={{ 
          backgroundColor: c.hex,
          // This shadow makes it look like it's coming out of a slot
          boxShadow: "inset 10px 0 10px rgba(0,0,0,0.2)" 
        }}
      >
        {/* 3D Shine & Shadow */}
        <div className="absolute top-1.5 left-0 w-full h-1.5 bg-white/30 rounded-full" />
        <div className="absolute bottom-1.5 left-0 w-full h-2.5 bg-black/10 rounded-full" />
        
        {/* Crayon Wrapper Detail */}
        <div className="absolute inset-y-2 left-10 w-6 border-x-2 border-black/10 flex items-center justify-center">
           <div className="w-full h-[2px] bg-black/5" />
        </div>
      </div>

      {/* Label - Adjusted position so it doesn't move too much with the crayon */}
      <span className="ml-4 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none font-black uppercase tracking-tighter transition-opacity">
        {c.name}
      </span>
    </motion.button>
  ))}
</div>
        {/* The Pink Eraser - Also Horizontal */}
        <motion.button
          onClick={() => setColor("#FFFFFF")}
          whileHover={{ x: 10 }}
          animate={{ 
            x: color === "#FFFFFF" ? 20 : 0,
            boxShadow: color === "#FFFFFF" ? "0px 4px 15px rgba(236, 72, 153, 0.4)" : "none"
          }}
          className="w-16 h-10 bg-pink-300 border-r-4 border-pink-400 rounded-r-lg rounded-l-sm flex items-center justify-center mt-4 shadow-sm"
        >
          <span className="text-[9px] font-black text-pink-600 select-none rotate-0">ERASER</span>
        </motion.button>

        <hr className="w-full border-gray-100 my-4" />

        {/* The Magic Sun (AI Analysis) - NOW IN THE MIDDLE */}
        <motion.button
          onClick={sendToAI}
          disabled={isAnalyzing}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isAnalyzing ? { rotate: 360 } : {}}
          transition={isAnalyzing ? { repeat: Infinity, duration: 2, ease: "linear" } : {}}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-200">
            <span className="text-4xl">{isAnalyzing ? "⌛" : "☀️"}</span>
          </div>
          <span className="text-[10px] font-black text-yellow-600 uppercase">Magic Sun</span>
        </motion.button>

        {/* Start Over (Trash Can) - NOW AT THE BOTTOM */}
        <motion.button
          onClick={clearCanvas}
          whileTap={{ scale: 0.8, rotate: -10 }}
          className="mt-auto mb-4 flex flex-col items-center gap-1 group"
        >
          <div className="text-3xl transition-transform group-hover:scale-110 group-hover:rotate-12">🗑️</div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Start Over</span>
        </motion.button>
      </div>
      
      
      {/* --- UI: CANVAS AREA --- */}
      <canvas
        ref={canvasRef}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerLeave={stopDrawing}
        className="cursor-crosshair bg-white"
      />

    {/* --- UI: MODAL LAYER --- */}
    <FancyResultBox 
      isOpen={isModalOpen}
      isAnalyzing={isAnalyzing}
      data={analysisData}
      onClose={() => setIsModalOpen(false)}
    />
    </div>
  );
}

// ==========================================
// SECTION 6: FANCY MODAL COMPONENT
// Description: The visual result box using Framer Motion or Tailwind animations.
// ==========================================
const FancyResultBox = ({ isOpen, isAnalyzing, data, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900/20 backdrop-blur-md">
      <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-lg border-[12px] border-yellow-400 overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="p-10 flex flex-col items-center text-center">
          
          {isAnalyzing ? (
            <>
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center animate-bounce mb-6">
                <span className="text-5xl">✨</span>
              </div>
              <h2 className="text-3xl font-black text-blue-600 italic">Thinking...</h2>
              <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest">The Magic Sun is looking at your art!</p>
            </>
          ) : (
            <>
              <div className="w-full flex justify-between items-center mb-6">
                <span className="text-4xl">🌟</span>
                <h2 className="text-4xl font-black text-purple-600 uppercase tracking-tighter">Result!</h2>
                <span className="text-4xl">🌟</span>
              </div>

              <div className="bg-yellow-50 rounded-3xl p-6 border-4 border-dashed border-yellow-200 mb-6">
                <p className="text-xl font-medium text-gray-800 leading-tight">
                  "{data?.analysis}"
                </p>
              </div>

              <div className="flex gap-4 mb-8">
                <div className="bg-pink-500 text-white px-6 py-2 rounded-full font-black text-sm shadow-lg">
                  MOOD: {data?.mood?.toUpperCase()}
                </div>
                <div className="bg-green-500 text-white px-6 py-2 rounded-full font-black text-sm shadow-lg">
                  KID SCORE: ✨ 10/10
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-5 bg-blue-500 hover:bg-blue-600 text-white font-black rounded-2xl text-2xl transition-all shadow-[0_8px_0_rgb(29,78,216)] active:shadow-none active:translate-y-2"
              >
                COOL!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};