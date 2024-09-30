import express from 'express';
import { createTask, updateTaskStatus, assignVolunteerToTask, getTaskById } from '../controllers/project/taskController.js';

const router = express.Router();

router.post('/create', createTask);

router.patch('/:taskId/status', updateTaskStatus);

router.patch('/:taskId/assign', assignVolunteerToTask);

router.get('/:taskId', getTaskById);

export default router;