export const AnalyticsPreview = () => (
  <div className="w-full md:w-1/2 bg-white p-8 rounded-3xl shadow-2xl border border-zinc-200">
    <div className="h-48 w-full bg-zinc-100 rounded-lg flex items-end justify-between p-4 gap-2">
      <div className="w-full bg-pink-400 rounded-t" style={{ height: '40%' }}></div>
      <div className="w-full bg-blue-400 rounded-t" style={{ height: '70%' }}></div>
      <div className={`w-full bg-green-400 rounded-t animate-pulse`} style={{ height: '55%' }}></div>
      <div className="w-full bg-yellow-400 rounded-t" style={{ height: '90%' }}></div>
      <div className="w-full bg-pink-600 rounded-t" style={{ height: '30%' }}></div>
    </div>
    <p className="mt-4 text-center text-sm font-medium text-zinc-400 italic">Example: Weekly Happiness Index</p>
  </div>
);