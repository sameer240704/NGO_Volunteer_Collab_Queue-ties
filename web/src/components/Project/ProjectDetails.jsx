import React, { useEffect, useState } from 'react';
import { TiTick } from "react-icons/ti";
import { useAuthContext } from '../../context/AuthContext.jsx';
import CreateTaskModal from './CreateTaskModal';
import TaskDetailsModal from './TaskDetailsModal';
import "./stepper.css";

const ProjectDetails = ({ projectId }) => {
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [volunteers, setVolunteers] = useState([]);
    const steps = ['Planning', 'Before Event', 'On Event Day', 'After Event'];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    const { authUser } = useAuthContext();
    const [showModal, setShowModal] = useState(false);

    const openTaskModal = (taskId) => {
        setSelectedTaskId(taskId);
    };

    const closeTaskModal = () => {
        setSelectedTaskId(null);
    };

    useEffect(() => {
        const updateProjectStage = async () => {
            try {
                const response = await fetch(`http://localhost:4224/project/${projectId}/status`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: steps[currentStep - 1] }),
                });
        
                if (!response.ok) throw new Error('Failed to update project status');
                const data = await response.json();
                console.log(data.message);
            } catch (error) {
                console.error('Error updating project status:', error);
            }
        };

        if (project) {
            updateProjectStage();
        }
    }, [currentStep, projectId, project, steps]);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4224/project/${projectId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProject(data.project);
                setCurrentStep(steps.indexOf(data.project.status) + 1);
                await fetchTasks(data.project._id);
                await fetchVolunteers(data.project._id);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        const fetchTasks = async (projectId) => {
            try {
                const response = await fetch(`http://localhost:4224/project/${projectId}/tasks`);
                if (!response.ok) throw new Error('Failed to fetch tasks');
                const tasksData = await response.json();
                setTasks(tasksData);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const fetchVolunteers = async (projectId) => {
            try {
                const response = await fetch(`http://localhost:4224/project/${projectId}/volunteers`);
                if (!response.ok) throw new Error('Failed to fetch volunteers');
                const volunteersData = await response.json();
                setVolunteers(volunteersData);
            } catch (error) {
                console.error('Error fetching volunteers:', error);
            }
        };

        fetchProjectDetails();
    }, [projectId, showModal, steps]);

    const getAssigneeName = (assigneeId) => {
        const volunteer = volunteers.find(vol => vol._id === assigneeId);
        return volunteer ? volunteer.name : 'Unassigned';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'To Do': return 'bg-blue-100 text-blue-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Done': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const TaskColumn = ({ title, tasks }) => (
        <div className="flex-1 min-w-[300px] p-4 border-r border-gray-200 last:border-r-0">
            <h2 className="font-semibold text-lg mb-4">{title}</h2>
            <div className="space-y-4">
                {tasks.map(task => (
                    <div key={task._id} 
                        className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 rounded-lg shadow-lg shadow-blue-500/50 p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => openTaskModal(task._id)}>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-gray-600">Assigned to: {getAssigneeName(task.assignee)}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full mt-2 inline-block ${getStatusColor(task.status)}`}>
                            {task.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen ">
            <div className="">
                <h1 className="text-3xl font-harmonique font-bold">{project?.title}</h1>
                <p className="mt-2 text-gray-600">{project?.description}</p>
            </div>

            {authUser?.role === 'admin' && (
                <div className=" flex justify-end gap-5 items-center -mt-10">
                    <button
                        className="text-lg px-4 py-2 bg-accent text-white rounded-md shadow-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                        onClick={() => {
                            currentStep === steps.length ? setComplete(true) : setCurrentStep(prev => prev + 1);
                        }}
                    >
                        {currentStep === steps.length ? "Finish" : "Next Stage"}
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 text-lg bg-green-500 text-white rounded-md shadow-lg transition duration-200 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                    >
                        Add Task+
                    </button>
                </div>
            )}

            <div className="mb-6 mt-6">
                <div className="flex justify-between">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className={`step-item ${currentStep === i + 1 && "active"} ${
                                (i + 1 < currentStep || complete) && "complete"
                            }`}
                        >
                            <div className="step">
                                {i + 1 < currentStep || complete ? (
                                    <TiTick size={24} />
                                ) : (
                                    i + 1
                                )}
                            </div>
                            <p className="text-gray-500">{step}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex overflow-x-auto text-primary text-xl">
                    <TaskColumn title="To Do" tasks={tasks.filter(task => task.status === 'To Do')} />
                    <TaskColumn title="Doing" tasks={tasks.filter(task => task.status === 'In Progress')} />
                    <TaskColumn title="Done" tasks={tasks.filter(task => task.status === 'Done')} />
                </div>

                <div className="w-64 bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 rounded-lg shadow-lg shadow-blue-500/50 overflow-y-auto p-4">
                    <h2 className="font-semibold text-lg mb-4">Volunteers</h2>
                    <div className="space-y-4">
                        {volunteers.map(volunteer => (
                            <div key={volunteer._id} className="flex items-center space-x-3 bg-white rounded-lg p-3">
                                <img src={volunteer.primaryImage} alt={volunteer.name} className="w-10 h-10 rounded-full" />
                                <span className="font-medium">{volunteer.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {showModal && (
                <CreateTaskModal projectId={projectId} volunteers={volunteers} stage={project.status} onClose={() => setShowModal(false)} />
            )}
            {selectedTaskId && (
                <TaskDetailsModal taskId={selectedTaskId} onClose={closeTaskModal} />
            )}
        </div>
    );
};

export default ProjectDetails;