"use client";
import Link from "next/link";

interface SuccessMessageProps {
  username: string;
  onFinish?: () => void; // Add this to satisfy the RegisterPage parent
}

export default function SuccessMessage({
  username,
  onFinish,
}: SuccessMessageProps) {
  return (
    <div className="text-center animate-pop-in">
      <span className="text-7xl mb-4 block animate-bounce">🎉</span>
      <h1 className="text-4xl font-extrabold text-green-600 mb-3">All Done!</h1>
      <p className="text-gray-700 text-xl">
        Welcome to Doodle Hearts,{" "}
        <span className="font-bold text-purple-600">{username}</span>! Your
        adventure into the grain is about to begin.
      </p>

      {/* If onFinish is provided (from our redirect logic), use the button.
          Otherwise, fall back to the manual Link.
      */}
      <button
        onClick={onFinish}
        className="mt-8 bg-purple-600 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
      >
        Start the Path Quiz !!
      </button>

      <div className="mt-4">
        <Link
          href="/onboarding/login"
          className="text-sm text-gray-400 underline"
        >
          Already have an account? Log in instead.
        </Link>
      </div>
    </div>
  );
}
