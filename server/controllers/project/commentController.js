import Comment from '../../models/project/commentModel.js';
import Task from '../../models/project/taskModel.js';

export const addComment = async (req, res) => {
    try {
        const task = await Task.findById(req.body.taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const newComment = new Comment({
            content: req.body.content,
            user: req.body.userId,
            task: req.body.taskId
        });

        task.comments.push(newComment);
        await newComment.save();
        await task.save();

        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
