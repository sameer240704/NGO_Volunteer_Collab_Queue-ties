import Comment from '../../models/project/commentModel.js';
import Task from '../../models/project/taskModel.js';
import User from '../../models/user.model.js';

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

export const getCommentsByTask = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Get taskId from request parameters
        const comments = await Comment.find({ task: taskId }).populate('user', 'username primaryImage'); // Populate user field for better response

        if (!comments.length) {
            return res.status(404).json({ message: 'No comments found for this task' });
        }

        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// export const getCommentsByTask = async (req, res) => {
//     try {
//         const taskId = req.params.taskId; // Get taskId from request parameters
//         const comments = await Comment.find({ task: taskId })
//             .populate('user', 'username primaryImage'); // Populate user field with username and primaryImage

//         if (!comments.length) {
//             return res.status(404).json({ message: 'No comments found for this task' });
//         }

//         // Map comments to include the primary image URL
//         const commentsWithImages = comments.map(comment => ({
//             content: comment.content,
//             createdAt: comment.createdAt,
//             user: {
//                 username: comment.user.username,
//                 primaryImage: comment.user.primaryImage
//             }
//         }));

//         res.status(200).json({ comments: commentsWithImages }); // Return comments as an object
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };