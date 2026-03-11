"use client";

import React, { useState } from "react";
import {
  Brain,
  Heart,
  MessageCircle,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- Types ---
interface QuizData {
  [key: string]: string | undefined;
}

interface Option {
  label: string;
  val: number;
}

// --- Sub-Components ---

const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
    <div className="bg-white text-center p-8 rounded-3xl shadow-2xl max-w-sm w-full border-4 border-green-400 animate-in zoom-in duration-300">
      <div className="text-6xl mb-4">
        <PartyPopper className="inline text-green-500 w-16 h-16" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 font-fredoka">
        Thank You!
      </h2>
      <p className="text-gray-600 mt-2">
        We've received your answers. This will help us create a wonderful
        experience for your child.
      </p>
      <button
        onClick={onClose}
        className="mt-6 bg-green-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-600 transition-all active:scale-95"
      >
        Close
      </button>
    </div>
  </div>
);

const RadioGroup = ({
  name,
  question,
  colorTheme,
  options,
  value,
  onChange,
}: {
  name: string;
  question: string;
  colorTheme: "blue" | "pink" | "teal" | "amber";
  options: Option[];
  value?: string;
  onChange: (name: string, val: string) => void;
}) => {
  const themes = {
    blue: "peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-800 hover:border-blue-300",
    pink: "peer-checked:border-pink-500 peer-checked:bg-pink-50 peer-checked:text-pink-800 hover:border-pink-300",
    teal: "peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:text-teal-800 hover:border-teal-300",
    amber:
      "peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:text-amber-800 hover:border-amber-300",
  };

  const bgThemes = {
    blue: "bg-blue-50/70 border-blue-100",
    pink: "bg-pink-50/70 border-pink-100",
    teal: "bg-teal-50/70 border-teal-100",
    amber: "bg-amber-50/70 border-amber-100",
  };

  return (
    <div
      className={`${bgThemes[colorTheme]} p-5 rounded-2xl border-2 transition-all`}
    >
      <p className="text-lg font-semibold text-gray-800 mb-4">{question}</p>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {options.map((opt) => (
          <div key={`${name}-${opt.val}`}>
            <input
              type="radio"
              id={`${name}-${opt.val}`}
              name={name}
              value={opt.val}
              checked={value === String(opt.val)}
              onChange={(e) => onChange(name, e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor={`${name}-${opt.val}`}
              className={`block text-center p-3 rounded-xl border-2 bg-white cursor-pointer transition-all duration-200 
              peer-checked:transform peer-checked:-translate-y-1 peer-checked:scale-105 peer-checked:shadow-md
              ${themes[colorTheme]}`}
            >
              {opt.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page ---

export default function DoodleHeartsQuiz() {
  const router = useRouter(); // Initialize the router
  const [formData, setFormData] = useState<QuizData>({});
  const [showModal, setShowModal] = useState(false);

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseAndRedirect = () => {
    setShowModal(false);
    // Redirect to homepage
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // High-leverage move: Actually sending data to your Go API
    console.log("Submitting Payload:", JSON.stringify(formData));
    setShowModal(true);
  };

  const commonOptions: Option[] = [
    { label: "Yes, always", val: 5 },
    { label: "Most times", val: 4 },
    { label: "Sometimes", val: 3 },
    { label: "Rarely", val: 2 },
    { label: "Not really", val: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#F0F9FF] relative flex items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-pink-200 rounded-full blur-3xl" />
      </div>
      <main className="relative z-10 bg-white/80 backdrop-blur-lg p-6 sm:p-10 rounded-[2.5rem] shadow-2xl max-w-4xl w-full border-4 border-white">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 tracking-tight font-fredoka">
            Doodle Hearts
          </h1>
          <p className="text-xl text-gray-600 mt-3 font-medium">
            Let's get to know your little one a bit better!
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-600 flex items-center gap-3 font-fredoka">
              <Brain className="w-8 h-8" /> Daily Life
            </h2>
            <RadioGroup
              name="q1"
              question="My child has a consistent daily routine."
              colorTheme="blue"
              options={commonOptions}
              value={formData.q1}
              onChange={handleRadioChange}
            />
            <RadioGroup
              name="q2"
              question="My child enjoys going to school/daycare."
              colorTheme="blue"
              options={commonOptions}
              value={formData.q2}
              onChange={handleRadioChange}
            />
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-pink-500 flex items-center gap-3 font-fredoka">
              <Heart className="w-8 h-8" /> Emotions
            </h2>
            <RadioGroup
              name="q3"
              question="My child expresses emotions in noticeable ways."
              colorTheme="pink"
              options={commonOptions}
              value={formData.q3}
              onChange={handleRadioChange}
            />
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-teal-600 flex items-center gap-3 font-fredoka">
              <MessageCircle className="w-8 h-8" /> Communication
            </h2>
            <RadioGroup
              name="q5"
              question="My child communicates clearly using words or gestures."
              colorTheme="teal"
              options={commonOptions}
              value={formData.q5}
              onChange={handleRadioChange}
            />
          </section>

          {/* Submit */}
          <div className="text-center pt-8">
            <button
              type="submit"
              className="bg-green-500 text-white text-2xl font-bold py-5 px-12 rounded-full shadow-xl hover:bg-green-600 transition-all hover:scale-105 active:scale-95 font-fredoka"
            >
              Submit Answers
            </button>
          </div>
        </form>
      </main>
      {showModal && <SuccessModal onClose={handleCloseAndRedirect} />}{" "}
    </div>
  );
}
