import express from 'express';
import { addFeedback, getAllFeedbacks } from '../controllers/feedbackController.js';

const router = express.Router();

// Route to add feedback
router.post('/addFeedback', addFeedback);

// Route to get all feedbacks
router.get('/getAllFeedback', getAllFeedbacks);

export default router;
