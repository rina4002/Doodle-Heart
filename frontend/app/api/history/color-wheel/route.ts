import { NextResponse } from 'next/server';
import connectDB from '@/db'; // Your DB connection helper
import Mood from '@/db/models/Moods';

// GET: Retrieve the last 20 moods for the history log
export async function GET() {
await connectDB();
  try {
    const history = await Mood.find({}).sort({ createdAt: -1 }).limit(20);
    return NextResponse.json(history, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

// POST: Save a new mood click
export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { emotion, color, parentCategory } = body;

    const newMood = await Mood.create({
      emotion,
      color,
      parentCategory,
    });

    return NextResponse.json(newMood, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save mood" }, { status: 400 });
  }
}