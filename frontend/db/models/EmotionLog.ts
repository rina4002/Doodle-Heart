import mongoose from "mongoose";

const EmotionLogSchema = new mongoose.Schema({
  guestId: { 
    type: String, 
    required: false
  },
  targetEmotion: { 
    type: String, 
    required: true 
  },
  detectedEmotion: { 
    type: String, 
    required: true 
  },
  success: { 
    type: Boolean, 
    required: true 
  },
  notes: { 
    type: String 
  },
  image: {
    type: String, // To show parents the face they made!
    required: false
  },
  createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.EmotionLog) {
  delete mongoose.models.EmotionLog;
}
export default mongoose.models.EmotionLog || mongoose.model("EmotionLog", EmotionLogSchema);
