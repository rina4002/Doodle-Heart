import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from "@/db"; 
import Doodle from "@/models/Doodle";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { text, image, guestId } = await req.json();

    if (!image) throw new Error("Image is required for analysis");

    // 1. Initialize Gemini Model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 2. Craft a Prompt for Structured JSON
    const prompt = `
      Analyze this child's drawing. Provide the response in strict JSON format:
      {
        "description": "What is in the drawing",
        "mood": "Happy, Sad, Anxious, Energetic, or Calm",
        "sentimentScore": -1.0 to 1.0,
        "colors": ["list of hex codes"],
        "items": ["list of objects"]
      }
    `;

    // Extract base64 content
    const base64Data = image.includes(",") ? image.split(",")[1] : image;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Data, mimeType: "image/png" } }
    ]);

    // 3. Parse AI Response
    const responseText = result.response.text();
    const aiData = JSON.parse(responseText.replace(/```json|```/g, ""));

    const newDoodle = await Doodle.create({
      image,
      analysis: aiData.description,
      mood: aiData.mood,
      sentimentScore: aiData.sentimentScore,
      colors: aiData.colors,
      tags: aiData.items,
      guestId: guestId || null, // Keeping it flexible as requested
      childId: null             // Explicitly null for now
    });

// Return the response so the frontend can actually see it
    return NextResponse.json({ 
      success: true, 
      data: newDoodle,
      response: aiData.description // Added this key just to stop your alerts from being undefined
    }, { status: 201 });

  } catch (error: any) {
console.error(">> API Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message.includes("429") ? "AI Quota Exceeded. Try again in 1 minute." : error.message 
    }, { status: 500 });  }
}