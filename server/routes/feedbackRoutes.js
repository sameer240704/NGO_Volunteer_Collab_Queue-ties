import express from 'express';
import { addFeedback, getAllFeedbacks, getFeedbackCSVbyAdminId } from '../controllers/feedbackController.js';

const router = express.Router();

// Route to add feedback
router.post('/addFeedback', addFeedback);

// Route to get all feedbacks
router.get('/getAllFeedback', getAllFeedbacks);

router.get('/getFeedbackCSV/:adminId', getFeedbackCSVbyAdminId);

export default router;
