import Task from '../../models/project/taskModel.js';
import Project from '../../models/project/projectModel.js';

export const createTask = async (req, res) => {
    try {
        const project = await Project.findById(req.body.projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            project: req.body.projectId
        });

        project.tasks.push(newTask);
        await newTask.save();
        await project.save();

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.status = req.body.status;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const assignVolunteerToTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        const project = await Project.findById(task.project);

        if (!project.volunteers.includes(req.body.volunteerId)) {
            return res.status(400).json({ message: 'Volunteer is not part of this project' });
        }

        task.assignee = req.body.volunteerId;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
