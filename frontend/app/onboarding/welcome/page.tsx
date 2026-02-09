"use client";
import { useState } from "react";
import Link from "next/link";
import "./welcome.css"; // Or keep in app/onboarding/style.css

export default function WelcomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container relative overflow-hidden">
      {/* 1. Background Animations */}
      <div className="floating-doodles pointer-events-none">
        {["💖", "⭐", "🌟", "✨", "☁️", "🌸", "💫"].map((emoji, i) => (
          <span key={i} className={`floating-doodle doodle-${i + 1}`}>
            {emoji}
          </span>
        ))}
      </div>

      {/* 2. Header Section */}
      <header className="header text-center py-10">
        <div className="greeting mb-6">
          <h1 className="greeting-title text-5xl font-black text-purple-700">
            Hi Jamie!
          </h1>
          <p className="greeting-subtitle text-xl text-gray-600">
            Welcome to your Doodle World 🌈
          </p>
        </div>

        {/* Simplified Character Placeholder */}
        <div className="doodle-characters flex justify-center gap-8 my-8">
          <div className="character teddy-bear">🧸</div>
          <div className="character pink-bunny">🐰</div>
          <div className="character white-cloud">☁️</div>
        </div>

        <Link href="/doodle">
          <button className="btn btn--primary journey-btn bg-yellow-400 hover:bg-yellow-500 px-8 py-4 rounded-full font-bold text-2xl shadow-xl transition-transform hover:scale-105 flex items-center justify-center mx-auto">
            <span className="btn-doodle mr-2">⭐</span>
            Start My Doodle Journey
            <span className="btn-doodle ml-2">✨</span>
          </button>
        </Link>
      </header>

      {/* 3. Parent Zone */}
      <section className="parent-zone mt-12">
        <h2 className="section-title text-3xl font-bold text-purple-600 mb-6">
          Parent Zone
        </h2>
        <div className="parent-zone-grid grid md:grid-cols-3 gap-6">
          <ParentCard
            title="Progress Tracker"
            icon="🌱"
            items={["Emotional Growth", "Communication", "Focus Time"]}
          />
          <QuestionnaireCard progress={60} current={12} total={20} />
          <ParentCard
            title="Daily Journal"
            icon="📚"
            description="Log mood, sleep, and behavior quickly."
          />
        </div>
      </section>

      {/* 4. Child Zone */}
      <section className="child-zone mt-16 pb-20">
        <h2 className="section-title text-3xl font-bold text-blue-600 mb-6">
          Child Zone
        </h2>
        <div className="child-zone-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActivityTile title="Sound Garden" emoji="🎵" />
          <ActivityTile title="Doodle Pad" emoji="✏️" />
          <ActivityTile title="Story Cloud" emoji="☁️" />
          <ActivityTile title="Calm Corner" emoji="🌸" />
        </div>
      </section>

      {/* Modal - Conditional Rendering instead of 'hidden' class */}
      {isModalOpen && (
        <div className="modal cute-modal fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="modal-content bg-white p-10 rounded-3xl text-center animate-pop-in">
            <h3>✨ Magical Message ✨</h3>
            <button onClick={() => setIsModalOpen(false)}>Close 💖</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components to keep the code tidy
function ParentCard({ title, icon, items, description }: any) {
  return (
    <div className="parent-card bg-white p-6 rounded-2xl shadow-lg border-b-8 border-green-400">
      <span className="text-4xl">{icon}</span>
      <h3 className="font-bold text-xl my-2">{title}</h3>
      {items && (
        <ul className="text-sm text-gray-500">
          {items.map((it: any) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      )}
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}

function ActivityTile({ title, emoji }: any) {
  return (
    <div className="activity-tile bg-blue-50 p-8 rounded-3xl text-center cursor-pointer hover:bg-blue-100 transition-colors border-4 border-dashed border-blue-200">
      <span className="text-5xl block mb-2">{emoji}</span>
      <h3 className="font-bold text-blue-800">{title}</h3>
    </div>
  );
}

function QuestionnaireCard({ progress, current, total }: any) {
  return (
    <div className="parent-card bg-white p-6 rounded-2xl shadow-lg border-b-8 border-purple-400 text-center">
      <div className="text-2xl font-bold mb-2">
        {current}/{total}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-purple-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <h3 className="font-bold">Questionnaire</h3>
      <button className="text-purple-600 font-bold mt-2">Continue</button>
    </div>
  );
}
