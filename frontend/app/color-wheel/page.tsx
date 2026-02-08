"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// SECTION 1: DATA & CONSTANTS
// Description: Defines colors, labels, and emoji mapping.
// ==========================================

const EMOTIONS = [
  { label: "Happy 😊", color: "#FFF59D", sub: ["🌅", "🎊", "❤️"] },
  { label: "Trust 🤝", color: "#A5D6A7", sub: ["🙏", "✅", "🌱"] },
  { label: "Fear 😨", color: "#90CAF9", sub: ["⚠️", "😟", "😰"] },
  { label: "Surprise 😲", color: "#80DEEA", sub: ["❓", "🤩", "😞"] },
  { label: "Sad 😢", color: "#9FA8DA", sub: ["😔", "🖤", "🚶‍♂️"] },
  { label: "Disgust 🤢", color: "#CE93D8", sub: ["👎", "😖", "🙄"] },
  { label: "Anger 😡", color: "#EF9A9A", sub: ["💢", "😤", "😠"] },
  { label: "Anticipation ⏳", color: "#FFCC80", sub: ["😫", "🤔", "🤩"] },
];

export default function EmotionWheel() {
  const [selected, setSelected] = useState("...");
  const [hovered, setHovered] = useState<string | null>(null);
  const size = 600; // Increased base size
  const center = size / 2;
  const innerRadius = 80; // Increased from 60 to give text more space
  const middleRadius = 160;
  const outerRadius = 240;

  const saveMoodToDB = async (label: string, color: string, parent: string) => {
  await fetch("/api/history/color-wheel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      emotion: label, 
      color: color,
      parentCategory: parent 
    }),
  });
};

  // ==========================================
  // SECTION 2: AUDIO & SPEECH LOGIC
  // Description: Handles text-to-speech and voice selection.
  // ==========================================

  const speakFeeling = (text: string) => {
    const cleanText = text
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      )
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Get all available voices
    const voices = window.speechSynthesis.getVoices();

    // Try to find a female voice (this varies by browser/OS)
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes("Female") ||
        voice.name.includes("Google UK English Female") ||
        voice.name.includes("Samantha") ||
        voice.name.includes("Microsoft Zira")
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // ==========================================
  // SECTION 3: SVG MATH & GEOMETRY
  // Description: Helper functions for polar coordinates and SVG path strings.
  // ==========================================

  const getCoordinates = (angle: number, radius: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  const describeArc = (
    startAngle: number,
    endAngle: number,
    innerR: number,
    outerR: number
  ) => {
    const startInner = getCoordinates(startAngle, innerR);
    const endInner = getCoordinates(endAngle, innerR);
    const startOuter = getCoordinates(startAngle, outerR);
    const endOuter = getCoordinates(endAngle, outerR);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
      "Z",
    ].join(" ");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-tighter text-black">
        Working with Emotions
      </h1>

      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-xl"
        >
          {/* ==========================================
              SECTION 4: MAIN WHEEL RENDERING
              Description: Maps through EMOTIONS to create inner and outer slices.
              ========================================== */}
          {EMOTIONS.map((emp, i) => {
            const startAngle = i * (360 / EMOTIONS.length);
            const endAngle = (i + 1) * (360 / EMOTIONS.length);
            const midAngle = startAngle + (endAngle - startAngle) / 2;
            const textPos = getCoordinates(
              midAngle,
              (innerRadius + middleRadius) / 2
            );

            return (
              <motion.g
                key={emp.label}
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="cursor-pointer"
              >
                {/* Inner Slice */}
                <motion.path
                  whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelected(emp.label);
                    speakFeeling(emp.label);
                  }}
                  d={describeArc(
                    startAngle,
                    endAngle,
                    innerRadius,
                    middleRadius
                  )}
                  fill={emp.color}
                  stroke="white"
                  strokeWidth="2"
                  style={{ originX: `${center}px`, originY: `${center}px` }}
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                  textAnchor="middle"
                  className="text-[12px] font-bold fill-gray-800 pointer-events-none select-none"
                >
                  {emp.label}
                </text>

                {/* Sub Slices */}
                {emp.sub.map((subLabel, subIndex) => {
                  const subStep = (endAngle - startAngle) / emp.sub.length;
                  const sStart = startAngle + subIndex * subStep;
                  const sEnd = sStart + subStep;
                  const sMid = sStart + subStep / 2;
                  const sTextPos = getCoordinates(
                    sMid,
                    (middleRadius + outerRadius) / 2
                  );

                  return (
                    <motion.g
                      key={`${emp.label}-${subIndex}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) + (subIndex * 0.05) }}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(subLabel);
                        speakFeeling(subLabel);
                      }}
                    >
                      <motion.path
                        whileHover={{ scale: 1.03, opacity: 1 }}
                        whileTap={{ scale: 0.97 }}
                        d={describeArc(sStart, sEnd, middleRadius, outerRadius)}
                        fill={emp.color}
                        opacity="0.8"
                        stroke="white"
                        strokeWidth="1"
                        style={{ originX: `${center}px`, originY: `${center}px` }}
                      />
                      <text
                        x={sTextPos.x}
                        y={sTextPos.y}
                        transform={`rotate(${sMid}, ${sTextPos.x}, ${sTextPos.y})`}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[20px] pointer-events-none select-none"
                      >
                        {subLabel}
                      </text>
                    </motion.g>
                  );
                })}
              </motion.g>
            );
          })}


          {/* ==========================================
              SECTION 5: CENTRAL HUB & STATUS
              Description: The center circle and "I feel..." text display.
              ========================================== */}
          
          <motion.circle 
            cx={center} 
            cy={center} 
            r={innerRadius - 5} 
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
          />
          
          {/* We use a foreignObject to allow for easy text wrapping within the SVG circle */}
          <foreignObject
            x={center - innerRadius + 10}
            y={center - innerRadius + 10}
            width={(innerRadius - 10) * 2}
            height={(innerRadius - 10) * 2}
          >
            <div className="flex flex-col items-center justify-center h-full w-full text-center p-2">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">I feel</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={selected}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-bold text-gray-800 leading-tight block break-words w-full"
                >
                  {selected}
                </motion.span>
              </AnimatePresence>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}
