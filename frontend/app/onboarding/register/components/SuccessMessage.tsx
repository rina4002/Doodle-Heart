"use client";
import Link from "next/link";

export default function SuccessMessage({ username }: { username: string }) {
  return (
    <div className="text-center animate-pop-in">
      <span className="text-7xl mb-4 block animate-bounce">🎉</span>
      <h1 className="text-4xl font-extrabold text-green-600 mb-3">All Done!</h1>
      <p className="text-gray-700 text-xl">
        Welcome to Doodle Hearts,{" "}
        <span className="font-bold text-purple-600">{username}</span>! Your
        adventure is about to begin.
      </p>

      <Link href="/onboarding//login">
        <button className="mt-8 bg-blue-500 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-blue-600 transition transform hover:scale-105">
          Go to Login 🚀
        </button>
      </Link>
    </div>
  );
}
