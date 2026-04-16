import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { history, message } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are a soft, gentle, and friendly cartoon cat companion for a young child playing in a drawing app. Your goal is to be a positive, non-judgmental friend. \n1. Keep responses very short (1-2 sentences at most). \n2. Be extremely encouraging about their art or whatever they say.\n3. Never force the child to talk or ask too many questions. \n4. Use simple, child-friendly language.\n5. If they say nothing or just press a button, respond with a happy purr or soft compliment.",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ]
    });

    // Formatting history for Gemini: { role: 'user' | 'model', parts: [{ text: string }] }
    // Our frontend history format is { role: 'user' | 'assistant', text: string }
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Gemini API requires the first message in the history to be from the 'user'
    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.unshift({
        role: 'user',
        parts: [{ text: "Hi, Pip!" }]
      });
    }

    const chat = model.startChat({
        history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ success: true, reply: responseText }, { status: 200 });

  } catch (error: any) {
    console.error("AI Companion Error:", error);
    return NextResponse.json({ success: false, error: "*purrs softly* I'm a bit sleepy right now. We can talk later!" }, { status: 500 });
  }
}
