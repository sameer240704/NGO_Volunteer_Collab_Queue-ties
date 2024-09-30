import React, { useEffect, useState } from 'react';
import "./stepper.css";
import { TiTick } from "react-icons/ti";

const ProjectDetails = ({ projectId }) => {
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const steps = ["Planning", "Before Event", "Event Day", "Post Event"];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    const [progress, setProgress] = useState(0);

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
    }, [projectId]);

    if (!project) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
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
                {!complete && (
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                        onClick={() => {
                            currentStep === steps.length
                                ? setComplete(true)
                                : setCurrentStep((prev) => prev + 1);
                        }}
                    >
                        {currentStep === steps.length ? "Finish" : "Next"}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <h2 className="font-semibold text-lg mb-4">Tasks</h2>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <div key={task._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                <h3 className="font-bold text-md">{task.title}</h3>
                                <p className="text-sm text-gray-600">Assigned to: {task.assignee || 'Unassigned'}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tasks available</p>
                    )}
                </div>

                <div className="col-span-1">
                    <h2 className="font-semibold text-lg mb-4">Volunteers</h2>
                    {volunteers.length > 0 ? (
                        volunteers.map(volunteer => (
                            <div key={volunteer._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                <h3 className="font-bold text-md">{volunteer}</h3>
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
