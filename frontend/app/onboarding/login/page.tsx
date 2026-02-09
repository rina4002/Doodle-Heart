"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Changed from username to email to match your API
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // You'll likely want to store the token/user data in a context or cookie here later
        router.push("/");
      } else {
        setError(
          data.error || "Oops! That secret code isn't right. Please try again!",
        );
      }
    } catch (err) {
      setError(
        "The realm seems a bit sleepy right now. Try again in a moment!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white bg-opacity-95 p-8 md:p-14 rounded-3xl shadow-2xl max-w-lg w-full border-8 border-yellow-400 animate-pop-in backdrop-blur-sm">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-600 mb-4 tracking-wider">
          Doodle Hearts
        </h2>
        <span className="text-7xl mb-4 block animate-bounce-slow">🌈</span>
        <h1 className="text-5xl font-extrabold text-purple-700 mb-3">
          Welcome, Little Hero!
        </h1>
      </div>

      <form onSubmit={handleLogin} className="space-y-8">
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl text-center font-bold animate-shake">
            {error}
          </div>
        )}

        <div>
          <label className="block text-2xl font-bold text-gray-800 mb-3">
            Your Super Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 border-4 border-blue-300 rounded-2xl text-xl focus:outline-none focus:border-purple-400 transition-colors"
            placeholder="hero@doodle.com"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-2xl font-bold text-gray-800">
              Your Secret Code:
            </label>
            <Link
              href="/forgot-password"
              virtual-link="true"
              className="text-purple-600 font-semibold"
            >
              Forgot Code?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 border-4 border-blue-300 rounded-2xl text-xl focus:outline-none focus:border-purple-400 transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-gradient text-white font-extrabold py-5 px-10 rounded-full text-3xl transition-all ${isLoading ? "opacity-70 scale-95 cursor-not-allowed" : "hover:scale-105 active:scale-95"}`}
          >
            {isLoading ? "Teleporting... ⚡" : "Continue ! 🚀"}
          </button>
        </div>
      </form>

      <div className="mt-10 text-center text-gray-700 text-lg">
        <p>
          New to the realm?{" "}
          <Link
            href="/onboarding/register"
            className="text-purple-600 font-bold hover:underline"
          >
            Create your Account!
          </Link>
        </p>
      </div>
    </div>
  );
}
