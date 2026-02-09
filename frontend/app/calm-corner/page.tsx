"use client";
import Link from "next/link";

export default function CalmCorner() {
  return (
    <div className="min-h-screen bg-[#F0F4FF] overflow-hidden relative flex flex-col items-center justify-center">
      {/* 1. Slow Moving Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[120px] animate-drift"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-100/50 blur-[120px] animate-drift-slow"></div>
        <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] rounded-full bg-pink-100/40 blur-[100px] animate-drift"></div>
      </div>

      {/* 2. Main Breathing Orb */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 scale-110 animate-breathe"></div>

          {/* The Orb */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-cyan-100 via-blue-200 to-purple-200 shadow-[0_0_50px_rgba(255,255,255,0.8)] border-4 border-white/40 flex items-center justify-center animate-breathe">
            <span className="text-7xl animate-float-slow">🌸</span>
          </div>
        </div>

        <h1 className="mt-16 text-3xl font-medium text-blue-400/80 tracking-[0.2em] uppercase transition-all">
          Breathe With the Flower
        </h1>

        <Link
          href="/onboarding/welcome"
          className="mt-12 text-blue-300 hover:text-blue-500 transition-colors font-medium"
        >
          Close my eyes and go back 🏠
        </Link>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.2);
            filter: brightness(1.1);
          }
        }
        @keyframes drift {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(100px, 50px) rotate(10deg);
          }
        }
        @keyframes drift-slow {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-80px, -40px) rotate(-15deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-breathe {
          animation: breathe 8s ease-in-out infinite;
        }
        .animate-drift {
          animation: drift 20s ease-in-out infinite alternate;
        }
        .animate-drift-slow {
          animation: drift-slow 25s ease-in-out infinite alternate;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
