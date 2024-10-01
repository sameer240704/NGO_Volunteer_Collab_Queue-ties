import Project from '../../models/project/projectModel.js';
import User from '../../models/user.model.js';
import Task from "../../models/project/taskModel.js";

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
        const projects = await Project.find().populate('createdBy', 'name');
        res.status(200).json(projects);
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

export const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId).populate('createdBy', 'name');
        // const tickets = await Task.find({ projectId }).populate('assignee', 'name');
        // const volunteers = await Volunteer.find({ _id: { $in: project.volunteers } });

        res.status(200).json({ project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// export const getTasksForProject = async (req, res) => {
//     try {
//         const { projectId } = req.params;
//         const project = await Project.findById(projectId).populate('tasks');

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         res.status(200).json(project.tasks);
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         res.status(500).json({ message: error.message });
//     }
// };

export const getTasksForProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId).populate({
            path: 'tasks',  // Populate tasks first
            populate: {
                path: 'assignee',  // Then, populate the 'assignee' field within tasks
                select: 'name'  // Select only the 'name' field from User model
            }
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project.tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: error.message });
    }
};

// export const getVolunteersForProject = async (req, res) => {
//     try {
//         const { projectId } = req.params;

//         // Find the project and populate its volunteers
//         const project = await Project.findById(projectId).populate('volunteers', 'name');

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         // Extract volunteer names
//         const volunteerNames = project.volunteers.map(volunteer => volunteer.name);

//         // Send back the volunteer names
//         res.status(200).json(volunteerNames);
//     } catch (error) {
//         console.error('Error fetching volunteers:', error);
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getVolunteersForProject = async (req, res) => {
//     try {
//         const { projectId } = req.params;

//         // Find the project and populate its volunteers
//         const project = await Project.findById(projectId).populate('volunteers', 'name');

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         // Extract volunteer IDs and names
//         const volunteerInfo = project.volunteers.map(volunteer => ({
//             id: volunteer._id, // Add the volunteer ID
//             name: volunteer.name // Add the volunteer name
//         }));

//         // Send back the volunteer information
//         res.status(200).json(volunteerInfo);
//     } catch (error) {
//         console.error('Error fetching volunteers:', error);
//         res.status(500).json({ message: error.message });
//     }
// };

export const getVolunteersForProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Find the project and populate its volunteers with name and primaryImage fields
        const project = await Project.findById(projectId).populate('volunteers', 'name primaryImage');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Extract volunteer IDs, names, and primary images
        const volunteerInfo = project.volunteers.map(volunteer => ({
            id: volunteer._id,         // Add the volunteer ID
            name: volunteer.name,      // Add the volunteer name
            primaryImage: volunteer.primaryImage // Add the volunteer primaryImage
        }));

        // Send back the volunteer information
        res.status(200).json(volunteerInfo);
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).json({ message: error.message });
    }
};