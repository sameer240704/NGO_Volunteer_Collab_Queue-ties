import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackModal = ({ onClose, authUser }) => {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [adminId, setAdminId] = useState('');
  const [feedback, setFeedback] = useState('');

  // Fetch the list of admins when the modal is opened
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:4224/auth/admins');
        setAdmins(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdmins();
  }, []);

  // Handle feedback submission
  const handleSubmit = async () => {
    const feedbackData = { name, adminId, feedback };
    try {
      await axios.post('http://localhost:4224/feedback/addFeedback', feedbackData);
      alert('Feedback submitted successfully');
      onClose(); // Close the modal after submitting feedback
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="fixed z-[999999999] inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">Submit Feedback</h2>
        
        <div className="mb-4">
          <label className="block font-medium mb-1 text-black">Your Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 text-black">Select NGO Admin</label>
          <select
            className="w-full p-2 border rounded text-black"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          >
            <option value="">Select Admin</option>
            {admins.map((admin) => (
              <option key={admin._id} value={admin._id} className='text-black'>
                {admin.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 text-black">Feedback</label>
          <textarea
            className="w-full p-2 border rounded text-black"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
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
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
