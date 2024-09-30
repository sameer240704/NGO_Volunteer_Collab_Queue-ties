import React, { useEffect, useState } from 'react';
import "./stepper.css";
import { TiTick } from "react-icons/ti";
import { useAuthContext } from '../../context/AuthContext.jsx'; // Importing auth context
import CreateTaskModal from './CreateTaskModal';
import TaskDetailsModal from './TaskDetailsModal'; 

const ProjectDetails = ({ projectId }) => {
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [volunteers, setVolunteers] = useState([]);
    const steps = ["Planning", "Before Event", "Event Day", "Post Event"];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    const [progress, setProgress] = useState(0);
    const { authUser } = useAuthContext(); // Access user role from context
    const [showModal, setShowModal] = useState(false); 

    const openTaskModal = (taskId) => {
        setSelectedTaskId(taskId);
    };

    const closeTaskModal = () => {
        setSelectedTaskId(null);
    };

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4224/project/${projectId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if(data.project.status == "Planning"){
                    setProgress(25);
                    setCurrentStep(1);
                } else if(data.project.status == "Before Event") {
                    setProgress(50);
                    setCurrentStep(2);
                } else if(data.project.status == "On Event Day") {
                    setProgress(75);
                    setCurrentStep(3);
                } else {
                    setCurrentStep(4);
                    setProgress(100);
                }
                setProject(data.project);
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

        // const fetchVolunteers = async (projectId) => {
        //     try {
        //         const response = await fetch(`http://localhost:4224/project/${projectId}/volunteers`);
        //         if (!response.ok) throw new Error('Failed to fetch volunteers');
        //         const volunteersData = await response.json();
        //         setVolunteers(volunteersData);
        //     } catch (error) {
        //         console.error('Error fetching volunteers:', error);
        //     }
        // };

        const fetchVolunteers = async (projectId) => {
            try {
                const response = await fetch(`http://localhost:4224/project/${projectId}/volunteers`);
                if (!response.ok) throw new Error('Failed to fetch volunteers');
                const volunteersData = await response.json();
                setVolunteers(volunteersData); // This will now be an array of objects with id and name
                console.log(volunteers);
            } catch (error) {
                console.error('Error fetching volunteers:', error);
            }
        };

        fetchProjectDetails();
    }, [projectId, showModal]);

    if (!project) {
        return <div className="text-center">Loading...</div>;
    }

    const getAssigneeName = (assigneeId) => {
        for (let i = 0; i < volunteers.length; i++){
            if(volunteers[i]._id == assigneeId)return volunteers[i].name;
        }
        return "Unassigned";
        // const volunteer = volunteers.find(vol => vol._id === assigneeId);
        // return volunteer ? volunteer.name : 'Unassigned';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'To Do':
                return 'text-blue-500'; // Blue for 'To Do'
            case 'In Progress':
                return 'text-yellow-500'; // Yellow for 'In Progress'
            case 'Done':
                return 'text-green-500'; // Green for 'Done'
            default:
                return 'text-gray-500';  // Default color for unknown status
        }
    };

    return (
        <div className='mt-0'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className="text-4xl font-bold">{project.title}</h1>
                <p className="mt-2 text-lg text-gray-600">{project.description}</p>
                <div class="w-[40%] bg-gray-200 rounded-full h-[20px] dark:bg-gray-700">
                    <div class="bg-blue-600 h-[20px] rounded-full" style={{width: `${progress}%`}}></div>
                </div>
            </div>

            <div className="mb-6 mt-6">
                <div className="flex justify-between">
                    {steps?.map((step, i) => (
                        <div
                            key={i}
                            className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
                                } `}
                        >
                            <div className="step">
                                {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
                            </div>
                            <p className="text-gray-500">{step}</p>
                        </div>
                    ))}
                </div>
                {/* {authUser?.role === 'admin' && !complete && (
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 ml-[47%]"
                        onClick={() => {
                            currentStep === steps.length
                                ? setComplete(true)
                                : setCurrentStep((prev) => prev + 1);
                        }}
                    >
                        {(currentStep === steps.length) ? "Finish" : "Next"}
                    </button>
                )} */}
                {authUser?.role === 'admin' && !complete && (
                    <div className="flex justify-center items-center gap-4 mt-4">
                        {/* Next Button */}
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg transition duration-200 text-[18px] hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 font-semibold"
                            onClick={() => {
                                currentStep === steps.length
                                    ? setComplete(true)
                                    : setCurrentStep((prev) => prev + 1);
                            }}
                        >
                            {currentStep === steps.length ? "Finish" : "Next"}
                        </button>

                        {/* Add Ticket Button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center bg-green-500 text-white px-4 py-2 text-[18px] rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                        >
                            Add Ticket
                        </button>
                    </div>
                )}
            </div>

            {/* Add Ticket Button for Admins
            {authUser?.role === 'admin' && (
                <div className="text-right mt-4">
                    <button 
                        onClick={() => setShowModal(true)} 
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        Add Ticket
                    </button>
                </div>
            )} */}

            {/* Task Modal */}
            {showModal && (
                <CreateTaskModal projectId={projectId} volunteers={volunteers} onClose={() => setShowModal(false)} />
            )}

            <div className="grid grid-cols-3 gap-6 mt-2">
                {/* <div className={ authUser?.role == 'admin' ? "col-span-2 h-[280px] pr-2 overflow-y-scroll" : "col-span-2 h-[380px] pr-2 overflow-y-scroll" }>
                    <h2 className="font-semibold text-lg mb-4">Tickets</h2>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <div key={task._id} className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer" onClick={() => openTaskModal(task._id)}>
                                <h3 className="font-bold text-md">{task.title}</h3>
                                <p className="text-sm text-gray-600">Assigned to: {task.assignee?.name || 'Unassigned'}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tasks available</p>
                    )}
                </div> */}

<div className={authUser?.role == 'admin' ? "col-span-2 h-[280px] pr-2 overflow-y-scroll custom-scrollbar" : "col-span-2 h-[380px] pr-2 overflow-y-scroll custom-scrollbar"}>
    <h2 className="font-semibold text-[22px] mb-4" style={{ letterSpacing: '1.5px' }}>Tickets</h2>
    <div className="grid grid-cols-2 gap-4">
        {tasks.length > 0 ? (
            tasks.map(task => (
                <div
                    key={task._id}
                    className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => openTaskModal(task._id)}
                >
                    {/* Task Title with Icon */}
                    <h3 className="font-semibold text-md mb-2 font-harmonique">
                        📝 {task.title}
                    </h3>
                    {/* Assigned To */}
                    <p className="text-sm text-gray-600 mb-2">
                        Assigned to: {task.assignee?.name || 'Unassigned'}
                    </p>
                    {/* Task Status with Color */}
                    <p className={`text-sm font-semibold ${getStatusColor(task.status)}`}>
                        Status: {task.status}
                    </p>
                </div>
            ))
        ) : (
            <p>No tasks available</p>
        )}
    </div>
</div>

                {/* Task Details Modal */}
                {selectedTaskId && (
                    <TaskDetailsModal
                        taskId={selectedTaskId}
                        onClose={closeTaskModal}
                    />
                )}

                <div className={ authUser?.role == 'admin' ? "col-span-1 h-[280px] pr-2 overflow-y-scroll custom-scrollbar" : "col-span-1 h-[380px] pr-2 overflow-y-scroll custom-scrollbar"}>
                    <h2 className="font-semibold text-[22px] mb-4" style={{ letterSpacing: "1.5px" }}>Volunteers</h2>
                    {volunteers.length > 0 ? (
                        volunteers.map(volunteer => (
                            <div key={volunteer._id} className="bg-white shadow-md flex items-center gap-2 rounded-lg p-4 mb-4">
                                <img src={volunteer.primaryImage} className='w-9 h-9 rounded-[50%]' />
                                <h3 className="font-semibold text-md">{volunteer.name}</h3>
                            </div>
                        ))
                    ) : (
                        <p>No volunteers available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
