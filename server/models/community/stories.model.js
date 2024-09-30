// models/story.js
import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  uploadedBy: { type: String, required: true },
  uploadedVideo: { type: String, required: true }, // Ensure this matches your frontend expectations
  uploadedImage: { type: String, required: true }, // Ensure this matches your frontend expectations
});

const Story = mongoose.model('Story', StorySchema);
export default Story;
