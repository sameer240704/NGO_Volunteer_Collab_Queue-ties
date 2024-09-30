import Project from '../../models/project/projectModel.js';
import User from '../../models/user.model.js';

export const createProject = async (req, res) => {
    try {
        const newProject = new Project({
            title: req.body.title,
            description: req.body.description,
            createdBy: req.body.createdBy
        });
        await newProject.save();
        console.log('New project created successfully.');
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('volunteers');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const joinProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (!project.volunteers.includes(req.body.volunteerId)) {
            project.volunteers.push(req.body.volunteerId);
            await project.save();
        }
        res.json({ message: 'Volunteer added to project', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
