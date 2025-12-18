"use client";

import React, { useState } from "react";

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
  const size = 500;
  const center = size / 2;
  const innerRadius = 60;
  const middleRadius = 140;
  const outerRadius = 220;

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
          {EMOTIONS.map((emp, i) => {
            const startAngle = i * (360 / EMOTIONS.length);
            const endAngle = (i + 1) * (360 / EMOTIONS.length);
            const midAngle = startAngle + (endAngle - startAngle) / 2;
            const textPos = getCoordinates(
              midAngle,
              (innerRadius + middleRadius) / 2
            );

            return (
              <g
                key={emp.label}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelected(emp.label)}
              >
                {/* Inner Slice */}
                <path
                  onClick={() => {
                    setSelected(emp.label);
                    speakFeeling(emp.label); // Add this
                  }}
                  d={describeArc(
                    startAngle,
                    endAngle,
                    innerRadius,
                    middleRadius
                  )}
                  fill={emp.color}
                  stroke="white"
                  strokeWidth="1"
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                  textAnchor="middle"
                  className="text-[12px] font-bold fill-gray-800 pointer-events-none"
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
                    <g
                      key={`${emp.label}-${subIndex}`}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(subLabel);
                      }}
                    >
                      <path
                        d={describeArc(sStart, sEnd, middleRadius, outerRadius)}
                        fill={emp.color}
                        opacity="0.8"
                        stroke="white"
                        strokeWidth="1"
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
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Central Hub */}
          <circle cx={center} cy={center} r={innerRadius - 5} fill="white" />
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            className="italic font-serif text-xl"
          >
            I feel {selected}
          </text>
        </svg>
      </div>
    </div>
  );
}
