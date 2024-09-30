// Import your story model (assuming you're using something like Mongoose)
import Story from "../../models/community/stories.model.js"; 

// Create a new story
import cloudinary from 'cloudinary';
// import Story from '../models/Story.js'; // Adjust the path based on your project structure

export const createStories = async (req, res) => {
  try {
    const { uploadedBy } = req.body;
    console.log(req.file); // Log the uploaded file for debugging
    const uploadImage = req.file;
    let imgUrl = '';
    if (req.file) {
      try {
        // Use req.file.buffer instead of uploadedImage.buffer
        const b64 = Buffer.from(uploadImage.buffer).toString("base64");
        const dataURI = "data:" + uploadImage.mimetype + ";base64," + b64;

        // Upload to Cloudinary
        const cldRes = await cloudinary.uploader.upload(dataURI, {
          resource_type: "auto",
        });

        imgUrl = cldRes.secure_url; // Get the URL of the uploaded image
      } catch (uploadError) {
        console.error("Error uploading primary image to Cloudinary:", uploadError);
        return res.status(500).json({ error: "Error uploading primary image" });
      }
    }

    // Validate the incoming request
    if (!uploadedBy) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Create a new story
    const newStory = new Story({
        uploadedBy,
        uploadedImage: imgUrl,
    });

    // Save the story to the database
    await newStory.save();

    return res.status(201).json({ message: "Story created successfully!", story: newStory });
  } catch (error) {
    console.error("Error creating story:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// Get all stories
export const getAllStories = async (req, res) => {
  try {
    // Fetch all stories from the database
    const stories = await Story.find().sort({ createdAt: -1 }); // Sort by newest first

    return res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
