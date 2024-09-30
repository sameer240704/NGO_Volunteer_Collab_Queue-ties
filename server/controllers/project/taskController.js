import Task from '../../models/project/taskModel.js';
import Project from '../../models/project/projectModel.js';

// export const createTask = async (req, res) => {
//     try {
//         const project = await Project.findById(req.body.projectId);
//         if (!project) return res.status(404).json({ message: 'Project not found' });

//         const newTask = new Task({
//             title: req.body.title,
//             description: req.body.description,
//             project: req.body.projectId
//         });

//         project.tasks.push(newTask);
//         await newTask.save();
//         await project.save();

//         res.status(201).json(newTask);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

export const createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignee } = req.body;

        // Find the project by ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Create a new task with the provided assignee
        const newTask = new Task({
            title,
            description,
            project: projectId,
            assignee: assignee || null // Optional: null if no assignee is provided
        });

        // Push the new task to the project's tasks array
        project.tasks.push(newTask);

        // Save the task and update the project
        await newTask.save();
        await project.save();

        // Populate the task with the assignee's details before sending the response
        const populatedTask = await Task.findById(newTask._id).populate('assignee', 'name');

        res.status(201).json(populatedTask);
    } catch (err) {
        console.error('Error creating task:', err);
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

export const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId).populate('assignee', 'name');
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};