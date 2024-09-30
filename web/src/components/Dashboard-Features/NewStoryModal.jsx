import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext.jsx'; 

const NewStoryModal = ({ isOpen, onClose, onAddStory }) => {
  // State to store the selected image file
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState([]);
  const { authUser } = useAuthContext();

  // Function to handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set the selected file in state
  };

  console.log(selectedFile);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4224/auth/getUser/${authUser.userId}`);
        const data = response.data;
        setUser(data);
        if (data.error) throw new Error(data.error);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [authUser.userId]);
  
  // console.log(user.user.name);
  const userName = user.user?.name;
  
  // Function to handle story submission
  const handleAddStory = async () => {
    if (!selectedFile) {
      alert("Please select an image to upload!");
      return;
    }

    // Prepare the form data for file upload
    const formData = {
      image: selectedFile,
      uploadedBy: userName,
    }; // Replace with the actual username or fetch from the state

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:4224/stories/create ", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newStory = response.data;

      // Call the parent component to update the story list with the new story
      onAddStory(newStory);

      // Close the modal after the upload is successful
      onClose();
    } catch (error) {
      console.error("Error uploading story:", error);
    } finally {
      setUploading(false); // Reset uploading state after the operation is complete
    }
  };

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center fixed inset-0 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-2xl font-semibold mb-4">Add New Story</h3>
        {/* File Input for Image Selection */}
        <input
          type="file"
          className="mb-4 w-full border p-2 rounded"
          accept="image/*"
          onChange={handleFileChange} // Attach the file change handler
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-blue-300 text-blue-900 rounded hover:bg-blue-100"
            onClick={onClose}
            disabled={uploading} // Disable button during upload
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAddStory} // Attach the form submit handler
            disabled={uploading} // Disable button during upload
          >
            {uploading ? 'Uploading...' : 'Add Story'} {/* Show upload status */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewStoryModal;
