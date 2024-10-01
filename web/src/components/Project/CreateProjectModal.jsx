import React, { useState } from 'react';

const CreateProjectModal = ({ onClose, onCreate, authUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  // Handle adding a skill
  const handleAddSkill = () => {
    if (skillInput) {
      setSkills([...skills, skillInput]);
      setSkillInput(''); // Clear the input
    }
  };

  // Handle creating the project
  const handleCreateProject = async () => {
    const newProject = {
      title,
      description,
      createdBy: authUser.userId, // Use logged-in user as admin
      skills,
    };
    await onCreate(newProject); // Pass new project data to parent for creation
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Project Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Project Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Skills</label>
          <div className="flex">
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={handleAddSkill}
            >
              Add Skill
            </button>
          </div>
          <div className="mt-2">
            {skills.map((skill, index) => (
              <span key={index} className="inline-block bg-gray-200 text-sm px-3 py-1 rounded-full mr-2 mb-2">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleCreateProject}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
