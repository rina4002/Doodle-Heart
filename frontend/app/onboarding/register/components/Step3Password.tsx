"use client";
import { useState } from "react";

export default function Step3Password({ data, update, onNext, onBack }: any) {
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleNext = () => {
    if (data.password.length < 6) {
      setError("Secret code must be at least 6 characters long.");
    } else if (data.password !== confirm) {
      setError("The secret codes do not match!");
    } else {
      setError("");
      onNext();
    }
  };

  return (
    <div className="text-center animate-pop-in">
      <span className="text-7xl mb-4 block">🤫</span>
      <h1 className="text-4xl font-extrabold text-purple-700 mb-3">Create a Secret Code</h1>
      <p className="text-gray-600 text-lg mb-8">This is your key to the Doodle Hearts world.</p>
      
      <div className="space-y-4 max-w-md mx-auto">
        <input 
          type="password" 
          placeholder="Your Secret Code" 
          value={data.password}
          onChange={(e) => update({ password: e.target.value })}
          className="w-full px-5 py-4 border-4 border-purple-300 rounded-2xl text-xl focus:outline-none"
        />
        <input 
          type="password" 
          placeholder="Type it one more time" 
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-5 py-4 border-4 border-purple-300 rounded-2xl text-xl focus:outline-none"
        />
      </div>
      <div className="text-red-500 mt-2 h-6">{error}</div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={onBack} className="bg-gray-300 text-gray-800 font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-gray-400 transition transform hover:scale-105">⬅️ Back</button>
        <button onClick={handleNext} className="bg-green-500 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-green-600 transition transform hover:scale-105">Next Step ➡️</button>
      </div>
    </div>
  );
}