import Stories from "../../models/community/stories.model.js";
import User from "../../models/user.model.js";
import cloudinary from "cloudinary";

export const createStories = async (req, res) => {
    const { uploadedBy } = req.body;

    if (!req.files || !req.files.uploadedVideo) {
        return res.status(400).json({ message: "No video file uploaded" });
    }

    const videoFile = req.files.uploadedVideo[0];

    try {
        const user = await User.findById(uploadedBy);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userName = user.name;
        const userImage = user.primaryImage;

        const uploadPromise = new Promise((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                {
                    resource_type: "video",
                    folder: "community_stories",
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(videoFile.buffer);
        });

        const result = await uploadPromise;

        const story = new Stories({
            uploadedBy: userName,
            imageUrl: userImage,
            videoUrl: result.secure_url,
        });

        await story.save();

        res.status(200).json({ message: "Story created successfully", story });
    } catch (error) {
        console.error("Error creating story:", error);
        res.status(500).json({ message: "Error creating story", error });
    }
};

export const getAllStories = async (req, res) => {
    try {
        const stories = await Stories.find();

        const formattedStories = await Promise.all(stories.map(async (story) => {
            return {
                userName: story.uploadedBy,
                imageUrl: story.imageUrl,
                videoUrl: story.videoUrl
            };
        }));

        console.log(stories);

        res.status(200).json({
            message: "Stories fetched successfully",
            stories: formattedStories
        });
    } catch (error) {
        console.error("Error fetching stories:", error);
        res.status(500).json({ message: "Error fetching stories", error });
    }
};