import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createStories, getAllStories } from "../controllers/community/stories.controller.js";
import { createPost, getAllPosts } from "../controllers/community/posts.controller.js";

const router = express.Router();

router.post(
    "/createStory",
    upload.fields([
        { name: "uploadedVideo", maxCount: 1 },
    ]),
    createStories
);
router.get("/getAllStories", getAllStories);
router.post("/createPost", upload.fields([{ name: "postImages", maxCount: 1 }]), createPost);
router.get("/getAllPosts", getAllPosts);

export default router;