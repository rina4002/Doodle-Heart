"use client";
import { useState } from "react";
import Link from "next/link";
import "./welcome.css";

// 1. Move your data here so the component can read it
const CHILD_ACTIVITIES = [
  {
    name: "Sound Garden",
    emoji: "🎵",
    cuteMessage:
      "🎵 Welcome to your magical Sound Garden! \n\n Create beautiful melodies and discover enchanting sounds!",
  },
  {
    name: "Doodle Pad",
    emoji: "✏️",
    cuteMessage:
      "🎨 Time to unleash your creativity! \n\n Grab your magical pencils and create amazing artwork!",
  },
  {
    name: "Story Cloud",
    emoji: "☁️",
    cuteMessage:
      "☁️ Float away on clouds of imagination! \n\n Create wonderful stories and magical adventures!",
  },
  {
    name: "Calm Corner",
    emoji: "🌸",
    cuteMessage:
      "🧘 Welcome to your peaceful Calm Corner \n\n Take deep breaths and find your inner peace!",
  },
];

export default function WelcomePage() {
  // 2. Define state for both the Open status AND the Content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const handleActivityClick = (activity: any) => {
    setModalContent({
      title: `✨ ${activity.name} ✨`,
      message: activity.cuteMessage,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="container relative overflow-hidden">
      {/* Background Animations */}
      <div className="floating-doodles pointer-events-none">
        {["💖", "⭐", "🌟", "✨", "☁️", "🌸", "💫"].map((emoji, i) => (
          <span key={i} className={`floating-doodle doodle-${i + 1}`}>
            {emoji}
          </span>
        ))}
      </div>

      <header className="header text-center py-10">
        <div className="greeting mb-6">
          <h1 className="greeting-title text-5xl font-black text-purple-700">
            Hi Jamie!
          </h1>
          <p className="greeting-subtitle text-xl text-gray-600">
            Welcome to your Doodle World 🌈
          </p>
        </div>

        <div className="doodle-characters flex justify-center gap-8 my-8">
          <div className="character teddy-bear text-6xl">🧸</div>
          <div className="character pink-bunny text-6xl">🐰</div>
          <div className="character white-cloud text-6xl">☁️</div>
        </div>

        <Link href="/doodle">
          <button className="btn btn--primary journey-btn bg-yellow-400 hover:bg-yellow-500 px-8 py-4 rounded-full font-bold text-2xl shadow-xl transition-transform hover:scale-105 flex items-center justify-center mx-auto">
            <span className="btn-doodle mr-2">⭐</span>
            Start My Doodle Journey
            <span className="btn-doodle ml-2">✨</span>
          </button>
        </Link>
      </header>

      {/* Parent Zone */}
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

      {/* Child Zone - Now mapping through data correctly */}
      <section className="child-zone mt-16 pb-20">
        <h2 className="section-title text-3xl font-bold text-blue-600 mb-6">
          Child Zone
        </h2>
        <div className="child-zone-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHILD_ACTIVITIES.map((activity) => (
            <ActivityTile
              key={activity.name}
              title={activity.name}
              emoji={activity.emoji}
              onClick={() => handleActivityClick(activity)} // Pass the specific activity here
            />
          ))}
        </div>
      </section>

      {/* Modal - Using dynamic content */}
      {isModalOpen && (
        <div className="modal cute-modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="modal-content bg-white p-8 md:p-12 rounded-3xl text-center shadow-2xl max-w-lg animate-pop-in border-8 border-purple-100">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">
              {modalContent.title}
            </h3>
            <p className="text-gray-600 text-lg whitespace-pre-line mb-8">
              {modalContent.message}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Close 💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components
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

function ActivityTile({ title, emoji, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="activity-tile bg-blue-50 p-8 rounded-3xl text-center cursor-pointer hover:bg-blue-100 transition-all border-4 border-dashed border-blue-200"
    >
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
          className="bg-purple-500 h-4 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <h3 className="font-bold">Questionnaire</h3>
      <button className="text-purple-600 font-bold mt-2 hover:underline">
        Continue
      </button>
    </div>
  );
}
