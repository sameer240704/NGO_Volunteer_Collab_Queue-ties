import express from 'express';
import { addComment } from '../controllers/project/commentController.js';

const router = express.Router();

router.post('/create', addComment);

export default router;
