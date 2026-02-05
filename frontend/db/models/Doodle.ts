import mongoose from "mongoose";

const DoodleSchema = new mongoose.Schema({
  image: String,
  analysis: String,
  mood: { 
    type: String, 
    enum: ['Happy', 'Anxious', 'Energetic', 'Calm', 'Sad'],
    required: true 
  },
  sentimentScore: Number, // Scale of -1 to 1 for trend tracking
  colors: [String], // Predominant colors (red might = aggression, blue = calm)
  childId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Child', 
    required: false // Explicitly optional
  },
  guestId: { 
    type: String, 
    required: false
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.Doodle) {
  delete mongoose.models.Doodle;
}
export default mongoose.models.Doodle || mongoose.model("Doodle", DoodleSchema);