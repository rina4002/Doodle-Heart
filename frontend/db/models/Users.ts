import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  // Metadata for your "various projects" logic later
  projects: [{ name: String, role: String }], 
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", UserSchema);