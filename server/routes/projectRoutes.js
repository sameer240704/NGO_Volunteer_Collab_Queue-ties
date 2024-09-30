import express from 'express';
import { createProject, getAllProjects, joinProject } from '../controllers/project/projectController.js';

const router = express.Router();

router.post('/create', createProject);

router.get('/', getAllProjects);

router.post('/:projectId/join', joinProject);

export default router;
