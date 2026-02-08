import mongoose, { Schema, model, models } from 'mongoose';

const MoodSchema = new Schema({
  emotion: {
    type: String,
    required: true,
  },
  // Helps group "❤️" or "🌅" under the main "Happy" category
  parentCategory: {
    type: String,
    required: false, 
  },
  color: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// This prevents Mongoose from creating the model twice during Next.js Hot reloads
const Mood = models.Mood || model('Mood', MoodSchema);

export default Mood;