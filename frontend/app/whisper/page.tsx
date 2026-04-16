"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, CheckCircle, MousePointerClick, Star, ArrowRight } from "lucide-react";

// The 25 gentle words
const WORDS = [
  "hello", "sun", "moon", "star", "cat",
  "dog", "tree", "bird", "fish", "happy",
  "blue", "red", "jump", "play", "smile",
  "flower", "water", "bear", "apple", "book",
  "car", "train", "hug", "love", "green"
];

export default function WhisperPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [success, setSuccess] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase().trim();
          // Remove punctuation like periods that Speech API might add
          const cleanTranscript = transcript.replace(/[.,!?]/g, "");
          const targetWord = WORDS[currentIndex];

          if (cleanTranscript.includes(targetWord)) {
            triggerSuccess();
          }
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      } else {
        setSpeechSupported(false);
      }
    }
  }, [currentIndex]);

  const speakWord = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(word);
      // Extremely low rates (like 0.5) can cause the Windows TTS engine to stretch audio and sound muffled or distorted. 
      utterance.rate = 0.7;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Try to find a high-quality voice. Wait for voices to be available.
      const voices = window.speechSynthesis.getVoices();
      // On Windows, Microsoft Zira or Mark are usually clearest. Google voices if in Chrome.
      const bestVoice = voices.find(v =>
        v.name.includes("Google US English") ||
        v.name.includes("Zira") ||
        v.name.includes("Samantha")
      ) || voices.find(v => v.lang === "en-US");

      if (bestVoice) utterance.voice = bestVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const triggerSuccess = () => {
    setSuccess(true);
    // Auto-advance after 2 seconds
    setTimeout(() => {
      setSuccess(false);
      const nextIdx = (currentIndex + 1) % WORDS.length;
      setCurrentIndex(nextIdx);
      setTimeout(() => speakWord(WORDS[nextIdx]), 500); // Speak the new word
    }, 2500);
  };

  // Initial trigger
  const handleStart = () => {
    setHasStarted(true);
    speakWord(WORDS[0]);
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-10 max-w-lg text-center shadow-2xl border-8 border-blue-200"
        >
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Volume2 className="text-blue-500" size={48} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">Whisper & Repeat</h1>
          <p className="text-xl text-gray-600 mb-8">
            A quiet place to practice words. The app will whisper a word softly, and you can whisper it back or just tap along!
          </p>
          <button
            onClick={handleStart}
            className="w-full py-4 text-2xl font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg shadow-blue-200 transition-transform active:scale-95"
          >
            Let's Go! ✨
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6 overflow-hidden">

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="practice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md flex flex-col items-center gap-10"
          >
            <div className="text-center font-semibold text-gray-400 uppercase tracking-widest text-sm">
              Word {currentIndex + 1} of {WORDS.length}
            </div>

            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => speakWord(WORDS[currentIndex])}
              className="bg-white px-12 py-16 rounded-[3rem] shadow-xl border-4 border-blue-100 flex flex-col items-center gap-6 cursor-pointer hover:shadow-2xl transition-all w-full relative"
            >
              <div className="absolute top-4 right-4 text-blue-200 animate-pulse">
                <Volume2 size={32} />
              </div>
              <h2 className="text-7xl font-black tracking-tighter text-blue-600 capitalize">
                "{WORDS[currentIndex]}"
              </h2>
              <span className="text-blue-400 font-medium">Tap card to hear it again</span>
            </motion.div>

            <div className="flex flex-col w-full gap-4">
              {speechSupported && (
                <button
                  onClick={startListening}
                  className={`relative flex items-center justify-center gap-3 py-6 rounded-3xl text-2xl font-bold transition-all ${isListening
                    ? "bg-red-100 text-red-600 border-4 border-red-200 shadow-inner"
                    : "bg-white text-gray-700 border-4 border-gray-200 shadow-md hover:border-blue-300"
                    }`}
                >
                  {isListening ? (
                    <>
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute inset-0 bg-red-200 rounded-3xl opacity-20" />
                      <Mic size={28} className="animate-pulse" /> Listening...
                    </>
                  ) : (
                    <>
                      <Mic size={28} /> Say it back
                    </>
                  )}
                </button>
              )}

              <button
                onClick={triggerSuccess}
                className="flex items-center justify-center gap-3 py-6 rounded-3xl text-2xl font-bold bg-white text-gray-700 border-4 border-gray-200 shadow-md hover:border-purple-300 transition-all active:bg-gray-100"
              >
                <MousePointerClick size={28} /> I tapped it!
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-[4rem] shadow-2xl border-8 border-green-300 max-w-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="text-green-500 mb-6"
            >
              <CheckCircle size={100} />
            </motion.div>
            <h2 className="text-5xl font-black text-green-600 mb-2">Great Job!</h2>
            <div className="flex gap-2 text-yellow-400">
              <Star fill="currentColor" size={32} />
              <Star fill="currentColor" size={32} />
              <Star fill="currentColor" size={32} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          const nextIdx = (currentIndex + 1) % WORDS.length;
          setCurrentIndex(nextIdx);
          setSuccess(false);
          setIsListening(false);
          speakWord(WORDS[nextIdx]);
        }}
        className="fixed bottom-8 right-8 bg-black/5 hover:bg-black/10 text-gray-500 px-6 py-3 rounded-full font-bold flex gap-2 items-center transition-colors"
      >
        Skip <ArrowRight size={20} />
      </button>
    </div>
  );
}
