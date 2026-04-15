"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cat, X, Send } from "lucide-react";

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

interface AICompanionProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const AICompanion: React.FC<AICompanionProps> = ({ chatHistory, setChatHistory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (chatHistory.length === 0) {
      setTimeout(() => {
        setIsOpen(true);
        setChatHistory([
          { role: "assistant", text: "Hi! I saw you drawing! Want to tell me about it?" }
        ]);
      }, 3000); // Pops up after 3 seconds softly
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newHistory: ChatMessage[] = [...chatHistory, { role: "user", text }];
    setChatHistory(newHistory);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: chatHistory,
          message: text
        })
      });

      const data = await response.json();
      if (data.success) {
        setChatHistory([...newHistory, { role: "assistant", text: data.reply }]);
      } else {
        setChatHistory([...newHistory, { role: "assistant", text: "*purrs happily*" }]);
      }
    } catch (e) {
      console.error(e);
      setChatHistory([...newHistory, { role: "assistant", text: "*purrs happily*" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickOptions = [
    "I used my favorite colors!",
    "It's a happy drawing!",
    "I'm just playing!"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl p-4 w-80 mb-4 pointer-events-auto border-4 border-pink-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-pink-600 text-[16px] flex items-center gap-2">
                <Cat size={20} /> Pip the Cat
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex flex-col gap-2 max-h-56 overflow-y-auto mb-3 scrollbar-hide text-[15px] font-medium leading-tight">
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-2xl max-w-[85%] shadow-sm ${
                    msg.role === 'assistant' 
                      ? 'bg-pink-100 text-pink-900 rounded-tl-none self-start border border-pink-200' 
                      : 'bg-blue-100 text-blue-900 rounded-tr-none self-end border border-blue-200'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-pink-100 border border-pink-200 rounded-2xl rounded-tl-none p-3 w-16 self-start flex justify-center items-center gap-1 shadow-sm h-10">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-2 bg-pink-400 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-2 h-2 bg-pink-400 rounded-full" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-2 h-2 bg-pink-400 rounded-full" />
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Quick Options */}
            <div className="flex flex-wrap gap-2 mb-3">
              {quickOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleSend(opt)}
                  className="bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-semibold text-[13px] py-1.5 px-3 rounded-full transition-all active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
              className="flex gap-2 relative"
            >
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Talk to Pip..."
                className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-full pl-4 pr-10 py-2.5 text-[15px] outline-none focus:border-pink-300 transition-colors font-medium text-gray-700"
              />
              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="absolute right-1 top-1 bottom-1 aspect-square bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-full transition-colors flex items-center justify-center shrink-0"
              >
                <Send size={16} className="ml-[-2px] mt-[1px]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floatie Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-tr from-pink-400 to-orange-400 hover:from-pink-500 hover:to-orange-500 rounded-full shadow-[0_10px_25px_rgba(244,114,182,0.5)] flex items-center justify-center pointer-events-auto border-4 border-white transition-colors"
      >
        <div className="relative">
          <Cat className="text-white" size={30} strokeWidth={2.5} />
          {/* Subtle playful bounce animation on the icon itself */}
          <motion.div 
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
             <Cat className="text-white opacity-0" size={30} strokeWidth={2.5} />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};
