import { Paintbrush, BookOpen, BarChart3, Palette, Heart } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { AnalyticsPreview } from "@/components/AnalyticsPreview";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      title: "Emotional Color Wheel",
      description: "Kids learn to map feelings to colors. Yellow for happy, blue for calm.",
      Icon: Palette,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      link: "/color-wheel"
    },
    {
      title: "AI Magic Stories",
      description: "Our AI turns their doodles into narrated adventures in real-time.",
      Icon: BookOpen,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      link: "/doodle"
    },
    {
      title: "Parental Insights",
      description: "Stored safely in MongoDB, we track mood trends and creativity.",
      Icon: BarChart3,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      link: "/insights"
    },
  ];

  return (
        <div className="flex flex-col min-h-screen bg-white text-zinc-900">
            <section className="px-6 pt-20 pb-16 text-center bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Where Every Scribble <br />
            <span className="text-pink-600">Tells a Story.</span>
          </h1>
          <p className="text-xl text-zinc-600 mb-10 max-w-2xl mx-auto">
            Doodle Heart helps your little ones express emotions through art, 
            listens to their imagination, and gives you the insights to watch them grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/draw" className="px-8 py-4 bg-pink-600 text-white rounded-full font-bold text-lg hover:bg-pink-700 transition-all shadow-lg shadow-pink-200">
              Start Doodling
            </Link>
            <Link href="/parent-dashboard" className="px-8 py-4 bg-white border-2 border-zinc-200 rounded-full font-bold text-lg hover:border-pink-300 transition-all">
              Parent Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </section>

      <section className="py-20 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="inline-block px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4">
              Data Driven Care
            </div>
            <h2 className="text-4xl font-bold mb-6">Turn art into an emotional logbook.</h2>
            <ul className="space-y-4">
              {["Track frequent color choices.", "Save every masterpiece.", "Weekly reports delivered."].map((text, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Heart className="text-pink-500 mt-1 shrink-0" size={20} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <AnalyticsPreview />
        </div>
      </section>
    </div>
  );
}