"use client";
import { useState } from "react";

export default function Step1Name({ data, update, onNext }: any) {
  const [errors, setErrors] = useState({ username: "", age: "" });

  const handleNext = () => {
    const usernameErr = data.username.trim() === "" ? "Please enter a name!" : "";
    const ageErr = (!data.age || data.age <= 0) ? "Please tell us your age!" : "";
    
    setErrors({ username: usernameErr, age: ageErr });
    if (!usernameErr && !ageErr) onNext();
  };

  return (
    <div className="text-center animate-pop-in">
      <span className="text-7xl mb-4 block">👋</span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-3">Let's Get Started!</h1>
      <p className="text-gray-600 text-lg mb-8">Tell us a little bit about yourself.</p>
      
      <input 
        type="text" 
        placeholder="Your Doodle Name" 
        value={data.username}
        onChange={(e) => update({ username: e.target.value })}
        className="w-full max-w-md mx-auto px-5 py-4 border-4 border-blue-300 rounded-2xl text-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
      />
      <div className="text-red-500 mt-2 h-6">{errors.username}</div>

      <input 
        type="number" 
        placeholder="Your Age" 
        value={data.age}
        onChange={(e) => update({ age: e.target.value })}
        className="mt-4 w-full max-w-md mx-auto px-5 py-4 border-4 border-green-300 rounded-2xl text-xl focus:outline-none focus:ring-4 focus:ring-green-300 transition-all"
      />
      <div className="text-red-500 mt-2 h-6">{errors.age}</div>
      
      <button onClick={handleNext} className="mt-6 bg-green-500 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-green-600 transition transform hover:scale-105">
        Next Step ➡️
      </button>
    </div>
  );
}