"use client";
import Link from "next/link";

export default function CalmCorner() {
  return (
    /* Added animate-gradient-flow here */
    <div className="min-h-screen animate-gradient-flow overflow-hidden relative flex flex-col items-center justify-center">
      {/* 1. Slow Moving Background Gradients (Kept your blurs for depth) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/30 blur-[120px] animate-drift"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-100/30 blur-[120px] animate-drift-slow"></div>
      </div>

      {/* 2. Main Breathing Orb */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 scale-110 animate-breathe"></div>
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-white/40 via-blue-100/40 to-purple-200/40 backdrop-blur-md shadow-[0_0_50px_rgba(255,255,255,0.4)] border-4 border-white/40 flex items-center justify-center animate-breathe">
            <span className="text-7xl animate-float-slow">🌸</span>
          </div>
        </div>

        <h1 className="mt-16 text-3xl font-medium text-blue-800/40 tracking-[0.2em] uppercase text-center px-4">
          Breathe With the Flower
        </h1>

        <Link
          href="/"
          className="mt-12 text-blue-600/60 hover:text-blue-800 transition-colors font-medium bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm"
        >
          Close my eyes and go back 🏠
        </Link>
      </div>

      <style jsx>{`
        /* The Moving Background Magic */
        .animate-gradient-flow {
          background: linear-gradient(
            -45deg,
            #f0f4ff,
            #e8f0ff,
            #fdf2f8,
            #f5f3ff
          );
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.15);
            filter: brightness(1.05);
          }
        }

        @keyframes drift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10%, 5%);
          }
        }

        @keyframes drift-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-10%, -5%);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
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
          animation: float-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
