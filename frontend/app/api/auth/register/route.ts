import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/db/"; // Your DB helper
import { User } from "@/db/models/Users";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return NextResponse.json({ message: "User created!" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}