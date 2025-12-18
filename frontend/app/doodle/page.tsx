"use client";

import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Green', hex: '#008000' },
  { name: 'Eraser', hex: '#FFFFFF' }, // Just drawing in white, like a ghost
];

export default function DoodlePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sendToAI = async () => {
  if (!canvasRef.current) return;

  setIsAnalyzing(true);
  
  // 1. Convert the canvas to a Data URL (base64 string)
  // This is basically taking a digital Polaroid of your mess.
  const imageData = canvasRef.current.toDataURL('image/png');

  try {
    const response = await fetch('http://localhost:8000/ask-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text: "Analyze this drawing and its made by a kid, so now tell me how that kid might be feeling. Also give a json string array of what is drawn.",
        image: imageData // We'll update the backend to handle this next
      }),
    });

    const data = await response.json();
    alert("AI says: " + data.response);
  } catch (error) {
    console.error("The AI is ignoring you:", error);
  } finally {
    setIsAnalyzing(false);
  }
};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth - 80;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.lineCap = 'round';
      context.lineWidth = 5; // Slightly thicker so the eraser actually works
      setCtx(context);
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = color;
    // If it's white, make it thicker so erasing isn't a chore
    ctx.lineWidth = color === '#FFFFFF' ? 20 : 5; 
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

  return (
    <div className="flex h-screen w-full bg-gray-200 overflow-hidden">
      {/* Sidebar of Shame */}
      <div className="w-20 bg-white border-r border-gray-300 flex flex-col items-center py-8 gap-4 shadow-lg">
        {COLORS.map((c) => (
          <button
            key={c.hex}
            onClick={() => setColor(c.hex)}
            className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
              color === c.hex ? 'border-black scale-110 shadow-md' : 'border-gray-200'
            }`}
            style={{ backgroundColor: c.hex }}
            title={c.name}
          >
            {c.name === 'Eraser' && <span className="text-[10px] font-bold text-gray-400">ERASER</span>}
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
  {isAnalyzing ? 'Thinking...' : 'Analyze'}
</button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="cursor-crosshair bg-white"
      />
    </div>
  );
}