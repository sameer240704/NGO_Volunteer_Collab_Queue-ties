import Feedback from '../models/feedbackModel.js';

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
