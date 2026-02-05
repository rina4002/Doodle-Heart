import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db";
import Doodle from "@/models/Doodle";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const guestId = searchParams.get("guestId");

    if (!guestId) {
      return NextResponse.json({ error: "No Guest ID provided" }, { status: 400 });
    }

    // Fetch doodles, sorted by newest first
    const history = await Doodle.find({ guestId }).sort({ createdAt: -1 });

    // Calculate "Current Mood" (Aggregated insight)
    const recentMoods = history.slice(0, 5).map(d => d.mood);
    const moodInsight = recentMoods.length > 0 ? `Most recent vibes: ${recentMoods.join(", ")}` : "No data yet.";

    return NextResponse.json({ success: true, history, insight: moodInsight });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}