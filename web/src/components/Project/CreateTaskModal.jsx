import React, { useState } from 'react';

const CreateTaskModal = ({ projectId, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateTask = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4224/task/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, projectId }),
            });

            if (response.ok) {
                // Task created successfully
                onClose(); // Close modal after successful creation
            } else {
                console.error('Failed to create task');
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-1/3 relative">
                <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>X</button>
                <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
                <div>
                    <label className="block mb-2 font-semibold">Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full border rounded-lg px-3 py-2 mb-4"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={handleCreateTask} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Task'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;
