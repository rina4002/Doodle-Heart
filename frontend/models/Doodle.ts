import mongoose from "mongoose";

const DoodleSchema = new mongoose.Schema({
  image: String,
  analysis: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Doodle || mongoose.model("Doodle", DoodleSchema);
