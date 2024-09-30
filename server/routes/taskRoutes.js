import express from 'express';
import { createTask, updateTaskStatus, assignVolunteerToTask } from '../controllers/project/taskController.js';

const router = express.Router();

router.post('/create', createTask);

router.patch('/:taskId/status', updateTaskStatus);

router.patch('/:taskId/assign', assignVolunteerToTask);

export default router;
