import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/db/"; // Your DB helper
import { User } from "@/db/models/Users";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Success! 
    return NextResponse.json({ 
        message: "Logged in successfully",
        user: { id: user._id, email: user.email } 
    });
  } catch (err) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}