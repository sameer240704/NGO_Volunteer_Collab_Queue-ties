// routes/storyRoutes.js
import express from 'express';
import { getAllStories, createStories } from '../controllers/community/stories.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

// Route to get all stories
router.get('/', getAllStories);

// Route to create a new story
router.post('/create', upload.single('image') ,createStories);

export default router;
