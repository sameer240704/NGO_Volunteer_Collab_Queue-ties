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
    // <div className="p-4">
    //   {/* Conditionally render project details or project list */}
    //   {selectedProject ? (
    //     <ProjectDetails projectId={selectedProject} key={selectedProject} onBack={() => setSelectedProject(null)} />
    //   ) : (
    //     <>
    //       <h1 className="text-2xl font-semibold mb-4">All Projects</h1>
    //       <table className="min-w-full border-separate border-spacing-2">
    //         <thead>
    //           <tr className='bg-white'>
    //             <th className="py-3 px-4 border-b-2 border-gray-300 font-semibold text-left rounded-lg">Project Name</th>
    //             <th className="py-3 px-4 border-b-2 border-gray-300 font-semibold text-left rounded-lg">Admin</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {projects.map(project => (
    //             <tr key={project._id} className="border-t hover:bg-gray-100 cursor-pointer">
    //               <td 
    //                 className="py-2 px-4 border-b border-gray-300 bg-white rounded-lg"
    //                 onClick={() => handleProjectClick(project)}
    //               >
    //                 <span className="text-black-500 font-bold">{project.title}</span>
    //               </td>
    //               <td className="py-2 px-4 border-b border-gray-300 bg-white rounded-lg">{project.createdBy.name}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </>
    //   )}
    // </div>
    <div className="p-4">
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
                <th className="py-3 px-4 border-b-2 border-gray-300 font-semibold text-left rounded-lg">Join</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-t hover:bg-gray-100">
                  <td
                    className="py-2 px-4 border-b border-gray-300 bg-white rounded-lg cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <span className="text-black-500 font-bold">{project.title}</span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 bg-white rounded-lg">
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
          </table>
        </>
      )}
    </div>
  );
};

export default Projects;
