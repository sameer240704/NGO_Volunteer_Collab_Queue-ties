import Feedback from '../models/feedbackModel.js';
import { Parser } from 'json2csv';
import { response } from 'express';

// Controller for adding feedback
export const addFeedback = async (req, res) => {
    try {
        const { name, adminId, feedback } = req.body;
        const newFeedback = new Feedback({
            name,
            admin: adminId,
            feedback
        });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully.', feedback: newFeedback });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller for viewing all feedbacks
export const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('admin', 'name');
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getFeedbackCSVbyAdminId = async (req, res) => {
    const { adminId } = req.params; // Get the admin ID from the request parameters

    try {
        // Find all feedback for the given admin
        const feedbacks = await Feedback.find({ admin: adminId }).populate('admin', 'name');

        // Check if feedbacks exist
        if (!feedbacks.length) {
            return res.status(404).json({ message: 'No feedback found for this admin.' });
        }

        // Transform feedback data into a format suitable for CSV
        const feedbackData = feedbacks.map(feedback => ({
            Name: feedback.name,
            Feedback: feedback.feedback,
        }));

        // Convert to CSV
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(feedbackData);

        // Set the headers for the response
        res.header('Content-Type', 'text/csv');
        res.attachment(`feedbacks_${adminId}.csv`);
        res.send(csv); // Send the CSV file as a response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};