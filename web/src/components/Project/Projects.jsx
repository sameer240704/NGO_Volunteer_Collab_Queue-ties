import React, { useEffect, useState } from 'react';
import ProjectDetails from './ProjectDetails.jsx'; // Component for individual project details

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project

  useEffect(() => {
    fetch('http://localhost:4224/project/')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project._id); // Set the selected project ID
  };

  return (
    <div className="p-4 ">
      {/* Conditionally render project details or project list */}
      {selectedProject ? (
        <ProjectDetails projectId={selectedProject} key={selectedProject} onBack={() => setSelectedProject(null)} />
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">All Projects</h1>
          <table className="min-w-full border-separate border-spacing-2">
            <thead>
              <tr className='bg-white'>
                <th className="py-3 px-4 border-b-2 border-gray-300 font-semibold text-left rounded-lg">Project Name</th>
                <th className="py-3 px-4 border-b-2 border-gray-300 font-semibold text-left rounded-lg">Admin</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-t hover:bg-gray-100 cursor-pointer">
                  <td 
                    className="py-2 px-4 border-b border-gray-300 bg-white rounded-lg"
                    onClick={() => handleProjectClick(project)}
                  >
                    <span className="text-black-500 font-bold">{project.title}</span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-white rounded-lg">{project.createdBy.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Projects;
