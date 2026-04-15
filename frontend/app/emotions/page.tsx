"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { getOrSetGuestId } from "@/lib/auth-utils";

const EMOTIONS = ["Happy", "Sad", "Shy", "Excited", "Surprised", "Silly"];

export default function EmotionsPage() {
  const [currentEmotionIdx, setCurrentEmotionIdx] = useState(0);
  const [cameraAccess, setCameraAccess] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
      setCameraAccess(true);
    } catch (err) {
      console.error("Camera access denied", err);
      setCameraAccess(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (!result && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [result, stream]);

  const takeSnapshot = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Draw the current video frame onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get base64 string
    const base64Image = canvas.toDataURL("image/jpeg", 0.8);
    
    // Send to API
    await analyzeEmotion(base64Image);
  }, [currentEmotionIdx]);

  const analyzeEmotion = async (image: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/emotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          targetEmotion: EMOTIONS[currentEmotionIdx],
          guestId: getOrSetGuestId()
        })
      });
      const data = await res.json();
      setResult(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const nextEmotion = () => {
    setResult(null);
    setCurrentEmotionIdx((prev) => (prev + 1) % EMOTIONS.length);
  };

  if (cameraAccess === false) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Camera Needed! 📸</h1>
        <p className="text-gray-600">Please allow camera access to play this game.</p>
        <button onClick={startCamera} className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full font-bold">Try Again</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col items-center py-12 px-6">
      <div className="max-w-2xl w-full flex flex-col items-center">
        
        <h1 className="text-4xl md:text-5xl font-black text-orange-600 mb-2 tracking-tighter text-center">
          Act the Emotion!
        </h1>
        <p className="text-gray-600 text-lg mb-8 font-medium">Show us your best face.</p>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="camera"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center bg-white p-6 md:p-8 rounded-[3rem] shadow-xl border-4 border-orange-100"
            >
              <div className="bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-black text-xl mb-6 uppercase tracking-wider">
                Show me: {EMOTIONS[currentEmotionIdx]}
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-inner border-4 border-gray-100 bg-gray-900 w-full aspect-[4/3] flex items-center justify-center">
                {/* Fallback while camera loads */}
                {!cameraAccess && <div className="absolute animate-pulse text-gray-500 font-bold">Warming up camera...</div>}
                
                {/* Mirror the video feed using CSS scale-x-[-1] */}
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover transform scale-x-[-1]" 
                />
                <canvas ref={canvasRef} className="hidden" />

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-all">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                      <RefreshCw className="text-orange-500 mb-4" size={48} />
                    </motion.div>
                    <p className="text-xl font-bold text-orange-600">Looking at your face...</p>
                  </div>
                )}
              </div>

              <button 
                onClick={takeSnapshot}
                disabled={isAnalyzing || !cameraAccess}
                className="mt-8 flex items-center gap-3 w-full justify-center py-5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black text-2xl rounded-2xl shadow-[0_6px_0_rgb(194,65,12)] active:shadow-none active:translate-y-[6px] transition-all disabled:opacity-50"
              >
                <Camera size={28} /> {isAnalyzing ? "Snapping..." : "SNAP!"}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-white p-8 rounded-[3rem] shadow-2xl border-4 border-pink-100 text-center flex flex-col items-center"
            >
              {result.success ? (
                <div className="text-green-500 mb-4 animate-bounce">
                  <CheckCircle size={80} />
                </div>
              ) : (
                <div className="text-red-400 mb-4">
                  <XCircle size={80} />
                </div>
              )}
              
              <h2 className={`text-4xl font-black mb-4 ${result.success ? 'text-green-600' : 'text-red-500'}`}>
                {result.success ? "Perfect!" : "Almost!"}
              </h2>
              
              <div className="bg-gray-50 rounded-2xl p-6 w-full mb-8">
                <p className="text-lg font-bold text-gray-700 mb-2">We saw: <span className="text-pink-500 uppercase">{result.detectedEmotion}</span></p>
                <p className="text-gray-500 italic">"{result.notes}"</p>
              </div>

              <div className="flex gap-4 w-full">
                {!result.success && (
                  <button 
                    onClick={() => setResult(null)}
                    className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl transition-colors cursor-pointer"
                  >
                    Try Again
                  </button>
                )}
                <button 
                  onClick={nextEmotion}
                  className="flex-1 py-4 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-2xl shadow-[0_4px_0_rgb(219,39,119)] active:shadow-none active:translate-y-1 transition-all cursor-pointer"
                >
                  Next Emotion ➔
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
