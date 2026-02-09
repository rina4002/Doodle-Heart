"use client";

const avatars = [
  { id: "avatar1", value: "happy-monster", label: "Doodle 1", color: "34D399" },
  { id: "avatar2", value: "calm-cloud", label: "Doodle 2", color: "60A5FA" },
  { id: "avatar3", value: "brave-star", label: "Doodle 3", color: "FBBF24" },
];

// Added isLoading to the props
export default function Step4Avatar({
  data,
  update,
  onNext,
  onBack,
  isLoading,
}: any) {
  return (
    <div className="text-center animate-pop-in">
      <span className="text-7xl mb-4 block">🎨</span>
      <h1 className="text-4xl font-extrabold text-purple-700 mb-3">
        Choose Your Doodle!
      </h1>

      <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap py-4">
        {avatars.map((av) => (
          <div key={av.id}>
            <input
              type="radio"
              name="avatar"
              id={av.id}
              className="avatar-radio"
              checked={data.avatar === av.value}
              onChange={() => update({ avatar: av.value })}
              disabled={isLoading} // Lock it during submission
            />
            <label
              htmlFor={av.id}
              className="avatar-label p-2 border-4 border-transparent rounded-full block cursor-pointer transition-transform hover:scale-110"
            >
              <img
                src={`https://placehold.co/100x100/${av.color}/FFFFFF?text=${av.label}&font=comic-sans`}
                className="rounded-full shadow-md"
                alt={av.value}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="bg-gray-300 text-gray-800 font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-gray-400 transition transform hover:scale-105 disabled:opacity-50"
        >
          ⬅️ Back
        </button>
        <button
          onClick={onNext}
          disabled={isLoading}
          className="bg-purple-600 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-lg hover:bg-purple-700 transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Magic... ✨" : "Create My Doodle Heart! ✨"}
        </button>
      </div>
    </div>
  );
}
