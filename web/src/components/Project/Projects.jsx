import React, { useEffect, useState } from 'react';
import ProjectDetails from './ProjectDetails.jsx'; // Component for individual project details
import { useAuthContext } from '../../context/AuthContext.jsx'; // Import the Auth context to get the user info
import { TiTick, TiUserAdd } from 'react-icons/ti';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project
  const { authUser } = useAuthContext(); // Get authUser from AuthContext
  const [joinedProjects, setJoinedProjects] = useState([]); // Track joined projects

  useEffect(() => {
    fetch('http://localhost:4224/project/')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  console.log(projects);

  const handleProjectClick = (project) => {
    setSelectedProject(project._id); // Set the selected project ID
  };

  const handleJoinProject = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:4224/project/${projectId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          volunteerId: authUser.userId, // Get volunteerId from authUser
        }),
      });

      if (!response.ok) throw new Error('Failed to join project');
      const data = await response.json();
      console.log(data.message);

      // Add project ID to the list of joined projects to reflect UI changes
      setJoinedProjects(prev => [...prev, projectId]);
    } catch (error) {
      console.error('Error joining project:', error);
    }
  };

  const isProjectJoined = (projectId) => {
    return joinedProjects.includes(projectId);
  };

  return (
    <div className="">
      {/* Conditionally render project details or project list */}
      {selectedProject ? (
        <ProjectDetails projectId={selectedProject} key={selectedProject} onBack={() => setSelectedProject(null)} />
      ) : (
        <>
          <table className="min-w-full border-separate border-spacing-2 text-xl font-harmonique">
  <thead>
    <tr className='bg-white'>
      <th className="py-3 pl-4 border-b-2 border-gray-300 font-medium text-left rounded-lg">Sr. No.</th>
      <th className="py-3 px-4 border-b-2 border-gray-300 font-medium text-left rounded-lg"><span className='text-[18px]'>📋</span> Project Name</th>
      <th className="py-3 px-4 border-b-2 border-gray-300 font-medium text-left rounded-lg bg-white">Admin</th>
      <th className="py-3 px-4 border-b-2 border-gray-300 font-medium text-left rounded-lg bg-white">Join</th>
    </tr>
  </thead>
  <tbody>
    {projects.map((project, index) => (
      <tr key={project._id} className="border-t hover:bg-gray-100">
        <td className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-2 rounded-lg shadow-lg shadow-blue-500/50">
          {index + 1}
        </td>
        <td
          className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-2 rounded-lg shadow-lg shadow-blue-500/50"
          onClick={() => handleProjectClick(project)}
        >
          <span className="text-black-500 font-medium" style={{ letterSpacing: "1px" }}>{project.title}</span>
        </td>
        <td className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-2 rounded-lg shadow-lg shadow-blue-500/50">
          <img src={project.createdBy.primaryImage} className='w-9 h-9 rounded-[50%]' />
          {project.createdBy.name}
        </td>
        <td className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-2 rounded-lg shadow-lg shadow-blue-500/50r">
          {isProjectJoined(project._id) ? (
            <button
              className="flex items-center gap-2 text-green-500 font-bold cursor-not-allowed"
              disabled
            >
              <TiTick size={20} /> Joined
            </button>
          ) : (
            <button
              className="flex items-center gap-2 text-blue-500 font-bold cursor-pointer hover:underline"
              onClick={() => handleJoinProject(project._id)}
            >
              <TiUserAdd size={20} /> Join
            </button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>
          {/* <table className="min-w-full border-separate border-spacing-2">
            <thead>
              <tr className='bg-white'>
                <th className="py-3 px-4 border-b-2 border-gray-300 font-medium text-left rounded-lg"><span className='text-[18px]'>📋</span> Project Name</th>
                <th className="py-3 px-4 border-b-2 border-gray-300 font-semibold text-left rounded-lg bg-white">Admin</th>
                <th className="py-3 px-4 border-b-2 border-gray-300 font-semibold text-left rounded-lg bg-white">Join</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-t hover:bg-gray-100">
                  <td
                    className="py-2 px-4 border-b border-gray-30 bg-white rounded-lg cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <span className="text-black-500 font-semibold" style={{ letterSpacing: "1px" }}>{project.title}</span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-white rounded-lg flex gap-2 items-center">
                    <img src={project.createdBy.primaryImage} className='w-9 h-9 rounded-[50%]' />
                    {project.createdBy.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-white rounded-lg text-center">
                    {isProjectJoined(project._id) ? (
                      <button
                        className="flex items-center gap-2 text-green-500 font-bold cursor-not-allowed"
                        disabled
                      >
                        <TiTick size={20} /> Joined
                      </button>
                    ) : (
                      <button
                        className="flex items-center gap-2 text-blue-500 font-bold cursor-pointer hover:underline"
                        onClick={() => handleJoinProject(project._id)}
                      >
                        <TiUserAdd size={20} /> Join
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </>
      )}
    </div>
  );
};

export default Projects;
