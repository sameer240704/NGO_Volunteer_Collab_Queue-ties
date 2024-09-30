import express from 'express';
import { addComment, getCommentsByTask } from '../controllers/project/commentController.js';

const router = express.Router();

router.post('/create', addComment);
router.get('/task/:taskId', getCommentsByTask);

export default router;
