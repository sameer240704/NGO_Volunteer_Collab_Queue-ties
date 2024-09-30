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
    console.log(project);
    setSelectedProject(project._id); // Set the selected project ID
  };

  return (
    <div>
      {/* Conditionally render project details or project list */}
      {selectedProject ? (
        <ProjectDetails projectId={selectedProject} key={selectedProject} onBack={() => setSelectedProject(null)} /> 
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">All Projects</h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Project Name</th>
                <th className="py-2">Admin</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-t">
                  <td className="py-2">
                    <span
                      onClick={() => handleProjectClick(project)}
                      className="text-blue-500 cursor-pointer"
                    >
                      {project.title}
                    </span>
                  </td>
                  <td className="py-2">{project.createdBy.name}</td>
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
