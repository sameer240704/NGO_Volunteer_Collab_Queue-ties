import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext.jsx';
import Cookies from "js-cookie";

const TaskDetailsModal = ({ taskId, onClose }) => {
    const [task, setTask] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authUser } = useAuthContext();
    const userId = Cookies.get('userId');
    
    // Fetch task details when the modal opens
    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4224/task/${taskId}`);
                if (!response.ok) throw new Error('Failed to fetch task details');
                const taskData = await response.json();
                setTask(taskData);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:4224/comment/task/${taskId}`);
                if (!response.ok) throw new Error('Failed to fetch comments');
                const commentsData = await response.json();
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchTaskDetails();
        fetchComments();
    }, [taskId, newComment]);

    // Add new comment
    const handleAddComment = async () => {
        try {
            const response = await fetch(`http://localhost:4224/comment/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newComment,
                    userId: Cookies.get('userId'),  // You need to pass the current logged-in user's ID here
                    taskId: taskId,
                }),
            });

            if (!response.ok) throw new Error('Failed to add comment');
            const newCommentData = await response.json();
            setComments([...comments, newCommentData]);
            setNewComment("");  // Clear the input box
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Done':
                return 'text-green-500';
            case 'In Progress':
                return 'text-yellow-500';
            case 'To Do':
                return 'text-blue-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="z-[99999999] fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">X</button>
                
                {/* Task Details */}
                <h2 className="text-2xl w-full text-center font-bold mb-4 font-harmonique">📝 {task.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">
                        Assigned to: {task.assignee?.name || 'Unassigned'}
                    </p>
                    <p className={`text-sm font-semibold mb-4 ${getStatusColor(task.status)}`}>
                        Status: {task.status}
                    </p>
                    <div className="text-gray-700 mb-4">
                        <h4 className="font-semibold text-sm mb-2">Description:</h4>
                        <p className="text-sm">{task.description}</p>
                    </div>
                        <h3 className="font-semibold font-harmonique text-lg mb-2 mt-8 text-center">Comments</h3>
                        <div className="mb-4 w-full text-center">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full border rounded px-2 py-1 mb-2"
                                placeholder="Add a comment"
                            />
                            <button
                                onClick={handleAddComment}
                                className="bg-blue-500 text-white px-3 py-1 font-harmonique rounded hover:bg-blue-600 text-center"
                            >
                                Comment
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className='max-h-[250px] overflow-y-scroll pr-2 custom-scrollbar'>

                        {/* List of comments */}
                        {/* {comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment._id} className="border-b border-gray-300 bg-slate-100 py-2 px-2 rounded-md my-2">
                                    <p className="text-sm">
                                        <strong>{comment.user.username}</strong> {comment.content}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )} */}
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment._id} className="border-b border-gray-300 bg-slate-100 py-2 px-2 rounded-md my-2">
                                    <div className="flex items-center">
                                        {/* Display user's primaryImage if available */}
                                        {comment.user.primaryImage && (
                                            <img
                                                src={comment.user.primaryImage}
                                                alt="User"
                                                className="w-9 h-9 rounded-full mr-2 border-[1px] border-slate-300"
                                            />
                                        )}
                                        {/* Display comment content */}
                                        <p className="text-sm font-harmonique">
                                            {/* Assuming you want to show the comment content */}
                                            <p>{comment.content}</p>
                                        </p>
                                    </div>
                                    {/* Optionally show createdAt */}
                                    <p className="text-xs mt-1 text-gray-500 font-harmonique">{new Date(comment.createdAt).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className='mt-8'>No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal;    
