"use client";
import { useState } from "react";

export default function Step2Email({ data, update, onNext, onBack }: any) {
  const [error, setError] = useState("");

  const handleNext = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(data.email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      onNext();
    }
  };

  return (
    <div className="text-center animate-pop-in">
      <span className="text-7xl mb-4 block">💌</span>
      <h1 className="text-4xl font-extrabold text-purple-700 mb-3">A Note for a Grown-Up</h1>
      <p className="text-gray-600 text-lg mb-8">Please ask a parent to enter their email.</p>

      <input 
        type="email" 
        placeholder="Parent's Magic Email" 
        value={data.email}
        onChange={(e) => update({ email: e.target.value })}
        className="w-full max-w-md mx-auto px-5 py-4 border-4 border-pink-300 rounded-2xl text-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all"
      />
      <div className="text-red-500 mt-2 h-6">{error}</div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={onBack} className="bg-gray-300 text-gray-800 font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-gray-400 transition transform hover:scale-105">⬅️ Back</button>
        <button onClick={handleNext} className="bg-green-500 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-green-600 transition transform hover:scale-105">Next Step ➡️</button>
      </div>
    </div>
  );
}