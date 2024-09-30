import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createStories, getAllStories } from "../controllers/community/stories.controller.js";

const router = express.Router();

router.post(
    "/createStory",
    upload.fields([
        { name: "uploadedVideo", maxCount: 1 },
    ]),
    createStories
);
router.get("/getAllStories", getAllStories);

export default router;