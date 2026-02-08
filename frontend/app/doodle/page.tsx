"use client";

import { getOrSetGuestId } from "@/lib/auth-utils";
import React, { useRef, useEffect, useState } from "react";

const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Eraser", hex: "#FFFFFF" }, // Just drawing in white, like a ghost
];

// --- TYPES & INTERFACES ---

interface DoodleAnalysis {
  analysis: string;
  mood: string;
  sentimentScore?: number;
  colors?: string[];
  tags?: string[];
}

export default function DoodlePage() {
  // --- STATE & REFS ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState<DoodleAnalysis | null>(null);
  
  // --- AI & API LOGIC ---
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

// --- CANVAS ENGINE ---
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

  // --- PAGE COMPONENT ---
  return (
    <div className="flex h-screen w-full bg-gray-200 overflow-hidden">
      {/* --- UI: SIDEBAR --- */}
      <div className="w-20 bg-white border-r border-gray-300 flex flex-col items-center py-8 gap-4 shadow-lg">
        {COLORS.map((c) => (
          <button
            key={c.hex}
            onClick={() => setColor(c.hex)}
            className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
              color === c.hex
                ? "border-black scale-1 10 shadow-md"
                : "border-gray-200"
            }`}
            style={{ backgroundColor: c.hex }}
            title={c.name}
          >
            {c.name === "Eraser" && (
              <span className="text-[10px] font-bold text-gray-400">
                ERASER
              </span>
            )}
          </button>
        ))}

        <button
          onClick={clearCanvas}
          className="mt-10 p-2 text-[10px] bg-red-100 text-red-600 rounded hover:bg-red-200 font-bold uppercase"
        >
          Nuke It
        </button>

        <button
          onClick={sendToAI}
          disabled={isAnalyzing}
          className="mt-4 p-2 text-[10px] bg-blue-100 text-blue-600 rounded hover:bg-blue-200 font-bold uppercase disabled:opacity-50"
        >
          {isAnalyzing ? "Thinking..." : "Analyze"}
        </button>
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

// --- COMPONENT: FANCY MODAL ---
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