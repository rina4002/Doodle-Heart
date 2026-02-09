"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Your logic from the script
    const VALID_USER = "NIT";
    const VALID_PASS = "NIT";

    if (username === VALID_USER && password === VALID_PASS) {
      router.push("/"); // Redirects to index.html equivalent
    } else {
      alert("Oops! That secret code isn't right. Please try again!");
    }
  };

  return (
    <div className="mx-auto bg-white bg-opacity-95 p-8 md:p-14 rounded-3xl shadow-2xl max-w-lg w-full border-8 border-yellow-400 animate-pop-in backdrop-blur-sm">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-600 mb-4 tracking-wider">Doodle Hearts</h2>
        <span className="text-7xl mb-4 block animate-bounce-slow">🌈</span>
        <h1 className="text-5xl font-extrabold text-purple-700 mb-3">Welcome, Little Hero!</h1>
      </div>

      <form onSubmit={handleLogin} className="space-y-8">
        <div>
          <label className="block text-2xl font-bold text-gray-800 mb-3">Your Super Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-5 py-4 border-4 border-blue-300 rounded-2xl text-xl focus:outline-none"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-2xl font-bold text-gray-800">Your Secret Code:</label>
            <Link href="/forgot-password" className="text-purple-600 font-semibold">Forgot Code?</Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 border-4 border-blue-300 rounded-2xl text-xl focus:outline-none"
            required
          />
        </div>

        <div className="flex justify-center pt-6">
          <button type="submit" className="btn-gradient text-white font-extrabold py-5 px-10 rounded-full text-3xl">
            Continue ! 🚀
          </button>
        </div>
      </form>

      <div className="mt-10 text-center text-gray-700 text-lg">
        <p>New to the realm? <Link href="/onboarding/register" className="text-purple-600 font-bold">Create your Account!</Link></p>
      </div>
    </div>
  );
}