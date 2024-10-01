import Post from "../../models/community/posts.model.js";
import cloudinary from 'cloudinary';
import User from "../../models/user.model.js";

export const createPost = async (req, res) => {
    const { userId, caption } = req.body;

    if (!req.files || !req.files.postImages) {
        return res.status(400).json({ error: "Media file is required." });
    }

    try {
        let imageUrl;

        if (req.files && req.files.postImages) {
            const imageFile = req.files.postImages[0];

            try {
                const b64 = Buffer.from(imageFile.buffer).toString("base64");
                const dataURI = "data:" + imageFile.mimetype + ";base64," + b64;

                const cldRes = await cloudinary.uploader.upload(dataURI, {
                    resource_type: "auto",
                });

                imageUrl = cldRes.secure_url;
            } catch (uploadError) {
                console.error("Error uploading primary image to Cloudinary:", uploadError);
                return res.status(500).json({ error: "Error uploading primary image" });
            }
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newPost = new Post({
            uploadedBy: user.name,
            uploadedByImage: user.primaryImage,
            caption: caption,
            mediaUrl: imageUrl,
        });

        const savedPost = await newPost.save();

        return res.status(200).json(savedPost);
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Error creating post." });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const postsData = await Post.find();

        const formattedPosts = await Promise.all(postsData.map(async (post) => {
            return {
                name: post.uploadedBy,
                userImage: post.uploadedByImage,
                caption: post.caption,
                likeCount: post.likeCount,
                imageUrl: post.imageUrl,
                likedBy: post.likedBy,
                shareCount: post.shareCount,
                comments: post.comments,
                mediaUrl: post.mediaUrl
            };
        }));

        res.status(200).json({
            message: "Posts fetched successfully",
            posts: formattedPosts
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts: ", error });
    }
}