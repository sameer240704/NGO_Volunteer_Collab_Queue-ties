import express from 'express';
import { createProject, getAllProjects, joinProject, getProjectById, getTasksForProject, getVolunteersForProject } from '../controllers/project/projectController.js';

const router = express.Router();

router.post('/create', createProject);

router.get('/', getAllProjects);

router.post('/:projectId/join', joinProject);

router.get('/:projectId', getProjectById);

router.get('/:projectId/tasks', getTasksForProject);

router.get('/:projectId/volunteers', getVolunteersForProject);

export default router;
