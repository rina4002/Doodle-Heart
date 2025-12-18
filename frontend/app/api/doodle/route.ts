import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Doodle from "@/models/Doodle";

// Database connection utility
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  const connString = process.env.MONODB_URI_KEY ?? "NONE";
  // console.log(connString);
  await mongoose.connect(connString);
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { text, image } = await req.json();

    // 1. Call your microservice (Must use await and JSON.stringify)
    const response = await fetch("http://localhost:8000/ask-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, text }),
    });

    if (!response.ok) {
      const newDoodle = await Doodle.create(response);
      throw new Error(`Microservice error: ${response.statusText}`);
    }
    console.log("hi");

    const aiData = await response.json();

    // 2. Store in MongoDB
    // Mapping the microservice response fields to your Schema
    const newDoodle = await Doodle.create({
      image: image,
      analysis: aiData.feeling, // Adjust these keys based on what your Python/service returns
      tags: aiData.items,
    });

    // --- LOG THE RETURNED ITEM ---
    console.log("✅ Successfully saved to MongoDB:", newDoodle);

    // 3. Send response back to Frontend
    return NextResponse.json(
      {
        success: true,
        data: newDoodle,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error in /api/doodle:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
