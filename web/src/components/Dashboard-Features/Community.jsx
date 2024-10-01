import React, { useState, useEffect } from "react";
import axios from "axios";
import ngo1 from "../../assets/images/ngo1.png";
import ngo2 from "../../assets/images/ngo2.png";
import ngo3 from "../../assets/images/ngo3.png";
import NewStoryModal from "./NewStoryModal";

const initialStories = [
  { id: 1, username: "x_ae_23b", image: ngo1 },
  { id: 2, username: "maisenpai", image: ngo2 },
  { id: 3, username: "saylorwitf", image: ngo3 },
  { id: 4, username: "johndoe", image: ngo1 },
  { id: 5, username: "maryjane2", image: ngo2 },
];

const initialPosts = [
  {
    id: 1,
    author: "John Doe",
    content: "Just planted a new batch of tomatoes! 🍅 #OrganicFarming",
    likes: 15,
    comments: 3,
    image: ngo2,
  },
  {
    id: 2,
    author: "Jane Smith",
    content: "Our community garden is thriving! Check out these beautiful sunflowers 🌻",
    likes: 24,
    comments: 7,
    image: ngo2,
  },
  {
    id: 3,
    author: "Mike Johnson",
    content: "Excited to start my vertical garden project this weekend! 🌱",
    likes: 18,
    comments: 5,
    image: ngo1,
  },
  {
    id: 4,
    author: "Emily Brown",
    content: "Just harvested my first batch of organic strawberries! So delicious! 🍓",
    likes: 30,
    comments: 9,
    image: ngo3,
  },
];

const groups = [
  { id: 1, name: "Organic Farmers United", members: 1250 },
  { id: 2, name: "Sustainable Agriculture", members: 980 },
  { id: 3, name: "Urban Gardeners", members: 567 },
];

const Community = () => {
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState(initialPosts);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:4224/stories");
        const data = response.data;
        
        // Check if the response is an array, if not, use the initial stories
        setStories(Array.isArray(data) ? data : initialStories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setError("Failed to fetch stories. Using initial data.");
        setStories(initialStories);
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleCreateStoryClick = () => {
    setIsStoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsStoryModalOpen(false);
  };

  const handleAddStory = (newStory) => {
    setStories((prevStories) => [newStory, ...prevStories]);
  };

  return (
    <div className="flex h-full overflow-hidden text-lg">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Stories Section */}
        <div className="flex space-x-4 mb-6 overflow-x-auto scrollbar-hide">
          {/* Create New Story */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={handleCreateStoryClick}
          >
            <div className="w-24 h-24 rounded-full bg-secondary border-2 border-blue-500 flex items-center justify-center">
              <span className="text-blue-500 text-3xl font-semibold">+</span>
            </div>
            <p className="mt-2 text-sm text-gray-700">Create Story</p>
          </div>

          {/* Existing Stories */}
          {isLoading ? (
            <p>Loading stories...</p>
          ) : error ? (
            <p className="text-blue-500">{error}</p>
          ) : (
            stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                  <img
                    src={story.image}
                    alt={story.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-700">{story.username}</p>
              </div>
            ))
          )}
        </div>

        {/* Posts */}
        <div className="grid grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-4 rounded-lg shadow-lg shadow-blue-500/50 overflow-hidden"
            >
              <div className="p-4">
                <h3 className="font-semibold text-2xl text-primary mb-2">
                  {post.author}
                </h3>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full rounded-md mb-4"
                />
                <div className="flex justify-between items-center">
                  <div className="space-x-4">
                    <button className="text-red-500">
                      ❤ Like ({post.likes})
                    </button>
                    <button className="text-gray-500">
                      💬 Comment ({post.comments})
                    </button>
                    <button className="text-gray-500">➤ Share</button>
                  </div>
                  <button className="px-4 py-2 bg-accent text-white rounded-full hover:bg-blue-600 transition-colors">
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 sticky top-4 h-screen overflow-y-auto">
        {/* Create New Post */}
        <div className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 rounded-lg shadow-lg shadow-blue-500/50 p-4 mb-6">
          <h3 className="font-semibold text-xl text-primary mb-2">
            Create New Post
          </h3>
          <input
            type="file"
            className="mb-4 w-full border p-2 rounded"
            accept="image/*"
            placeholder="Upload your post image"
          />
          <textarea
            placeholder="What's on your mind?"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            rows="3"
          ></textarea>
          <button className="w-full bg-accent text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
            Post
          </button>
        </div>

        {/* Groups */}
        <div className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-40 p-6 rounded-lg shadow-lg shadow-blue-500/50">
          <h3 className="font-semibold text-xl text-primary mb-4">Groups</h3>
          {groups.map((group) => (
            <div key={group.id} className="mb-4 last:mb-0">
              <h4 className="font-semibold">{group.name}</h4>
              <p className="text-sm text-gray-500">{group.members} members</p>
              <button className="mt-2 px-4 py-1 bg-accent text-white text-lg rounded-full hover:bg-blue-600 transition-colors">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* New Story Modal */}
      <NewStoryModal
        isOpen={isStoryModalOpen}
        onClose={handleCloseModal}
        onAddStory={handleAddStory}
      />
    </div>
  );
};

export default Community;