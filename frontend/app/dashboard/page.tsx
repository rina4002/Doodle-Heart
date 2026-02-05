"use client";
import { useEffect, useState } from 'react';

export default function ParentDashboard() {
  const [data, setData] = useState({ history: [], insight: "" });

  useEffect(() => {
    const id = localStorage.getItem("doodle_guest_id");
    if (id) {
      fetch(`/api/history?guestId=${id}`)
        .then(res => res.json())
        .then(res => setData(res));
    }
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Doodle Heart Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold">Current Mood Insight</h2>
        <p className="text-gray-600">{data.insight}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.history.map((item: any) => (
          <div key={item._id} className="border rounded-lg overflow-hidden bg-white">
            <img src={item.image} alt="Doodle" className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {item.mood}
              </span>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">{item.analysis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}