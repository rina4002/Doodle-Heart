import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from "@/db"; 
import EmotionLog from "@/db/models/EmotionLog";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { image, targetEmotion, guestId } = await req.json(); 
    
    if (!image) throw new Error("Image is required to act the emotion.");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a gentle evaluator for a children's game. The child was asked to show a "${targetEmotion}" face.
      Look strictly at their facial expression. Provide the response in strict JSON format:
      {
        "success": boolean (true if their expression generally matches "${targetEmotion}", false otherwise),
        "detectedEmotion": "What emotion do they actually look like they are showing?",
        "notes": "A very short, encouraging sentence like 'You look so happy!' or 'That looks a bit more silly than shy!'"
      }
    `;

    const base64Data = image.includes(",") ? image.split(",")[1] : image;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
    ]);

    const responseText = result.response.text();
    const aiData = JSON.parse(responseText.replace(/```json|```/g, ""));

    const newLog = await EmotionLog.create({
      image,
      targetEmotion,
      detectedEmotion: aiData.detectedEmotion,
      success: aiData.success,
      notes: aiData.notes,
      guestId: guestId || null
    });

    return NextResponse.json({ 
      success: true, 
      data: newLog
    }, { status: 201 });

  } catch (error: any) {
    console.error(">> API Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: "Camera magic is sleeping. Try again later!" 
    }, { status: 500 });  
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const guestId = searchParams.get('guestId');

    const query = guestId ? { guestId } : {};
    const logs = await EmotionLog.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch logs" }, { status: 500 });
  }
}
