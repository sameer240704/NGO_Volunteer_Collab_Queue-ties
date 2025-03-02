import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackModal = ({ authUser }) => {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:4224/auth/admins");
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
      await axios.post(
        "http://localhost:4224/feedback/addFeedback",
        feedbackData
      );
      alert("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const onClear = () => {};

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-3xl mt-24">
      <h2 className="text-2xl font-semibold mb-6 text-black">
        Submit Feedback
      </h2>

      <div className="mb-4">
        <label className="block font-medium mb-2 text-black">Your Name</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2 text-black">
          Select NGO Admin
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        >
          <option value="">Select Admin</option>
          {admins.map((admin) => (
            <option key={admin._id} value={admin._id} className="text-black">
              {admin.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2 text-black">Feedback</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600 transition duration-200"
          onClick={onClear}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
