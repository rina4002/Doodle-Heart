import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from "@/db";
import Doodle from "@/db/models/Doodle";
import mongoose from "mongoose";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    await connectDB(); 
    const { text, image, childId, guestId } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 1. The "Don't mess up my JSON" Prompt
    const prompt = `
      Analyze this child's drawing. Provide the following in STRICT JSON format:
      {
        "description": "summary",
        "mood": "Happy|Sad|Anxious|Energetic|Calm",
        "sentimentScore": number between -1 and 1,
        "colors": ["hex1", "hex2"],
        "items": ["tag1", "tag2"]
      }
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: image.split(",")[1], mimeType: "image/png" } }
    ]);

    const aiData = JSON.parse(result.response.text().replace(/```json|```/g, ""));

    // 2. Save with optional IDs
    const newDoodle = await Doodle.create({
      image,
      analysis: aiData.description,
      mood: aiData.mood,
      sentimentScore: aiData.sentimentScore,
      colors: aiData.colors,
      tags: aiData.items,
      childId: childId || null,
      guestId: guestId || null, 
    });

    return NextResponse.json({ success: true, data: newDoodle });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}