import React, { useState } from 'react';
import ngo1 from '../../assets/images/ngo1.png';
import ngo2 from '../../assets/images/ngo2.png';
import ngo3 from '../../assets/images/ngo3.png';

// Simulated data for posts and groups
const posts = [
  {
    id: 1,
    author: 'John Doe',
    content: 'Just planted a new batch of tomatoes! 🍅 #OrganicFarming',
    likes: 15,
    comments: 3,
    image: {ngo1}
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'Our community garden is thriving! Check out these beautiful sunflowers 🌻',
    likes: 24,
    comments: 7,
    image: {ngo2}
  },
  {
    id: 3,
    author: 'Jane Smith',
    content: 'Our community garden is thriving! Check out these beautiful sunflowers 🌻',
    likes: 24,
    comments: 7,
    image: {ngo3}
  },
  {
    id: 3,
    author: 'Jane Smith',
    content: 'Our community garden is thriving! Check out these beautiful sunflowers 🌻',
    likes: 24,
    comments: 7,
    image: {ngo3}
  },
  {
    id: 3,
    author: 'Jane Smith',
    content: 'Our community garden is thriving! Check out these beautiful sunflowers 🌻',
    likes: 24,
    comments: 7,
    image: {ngo3}
  },
  {
    id: 3,
    author: 'Jane Smith',
    content: 'Our community garden is thriving! Check out these beautiful sunflowers 🌻',
    likes: 24,
    comments: 7,
    image: {ngo3}
  },

];

const groups = [
  { id: 1, name: 'Organic Farmers United', members: 1250 },
  { id: 2, name: 'Sustainable Agriculture', members: 980 },
  { id: 3, name: 'Urban Gardeners', members: 567 }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [newPost, setNewPost] = useState({ content: '', image: null });
  const [isPosting, setIsPosting] = useState(false);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setIsPosting(true);
    // Simulate posting process
    setTimeout(() => {
      setIsPosting(false);
      setNewPost({ content: '', image: null });
      alert('Post submitted successfully! (This is a simulation)');
    }, 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" bg-blue-100 overflow-hidden">
      <div className="flex justify-between">
        <h2 className="text-5xl font-harmonique font-semibold text-primary mb-8">Community ygfrieuewoihejhd</h2>
        <div className="">
            <div className="flex space-x-2">
            <button 
                onClick={() => setActiveTab('posts')} 
                className={`px-7 py-3 text-lg font-harmonique rounded-full font-medium shadow-lg shadow-blue-500/50 transition-colors ${
                activeTab === 'posts' 
                    ? 'bg-accent text-white' 
                    : 'bg-secondary text-gray-700 hover:bg-gray-300'
                }`}
            >
                Posts
            </button>
            <button 
                onClick={() => setActiveTab('groups')} 
                className={`px-7 py-3 text-lg font-harmonique rounded-full shadow-lg shadow-blue-500/50 font-medium transition-colors ${
                activeTab === 'groups' 
                    ? 'bg-accent text-white' 
                    : 'bg-secondary text-gray-700 hover:bg-gray-300'
                }`}
            >
                Groups
            </button>
            <button 
                onClick={() => setActiveTab('create')} 
                className={`px-7 py-3 text-lg font-harmonique rounded-full font-medium shadow-lg shadow-blue-500/50 transition-colors ${
                activeTab === 'create' 
                    ? 'bg-accent text-white' 
                    : 'bg-secondary text-gray-700 hover:bg-gray-300'
                }`}
            >
                Create Post
            </button>
            </div>
        </div>
      </div>

      <div className="flex-grow overflow-x-auto p-4">
        {activeTab === 'create' && (
          <form onSubmit={handlePostSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              placeholder="What's on your mind?"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              rows="4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />
            {newPost.image && (
              <img src={newPost.image} alt="Preview" className="w-full max-h-60 object-cover rounded-md mb-4" />
            )}
            <button
              type="submit"
              disabled={isPosting}
              className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
                isPosting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isPosting ? 'Posting...' : 'Post to Instagram'}
            </button>
          </form>
        )}

{activeTab === 'posts' && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {posts.map(post => (
      <div key={post.id} className="bg-white border border-gray-200 rounded-lg shadow-lg shadow-blue-500/50 overflow-hidden">
        <div className="p-4">
          <h3 className="font-semibold text-2xl font-harmonique text-blue-900 mb-2">{post.author}</h3>
          <p className="text-gray-600 text-lg mb-4">{post.content}</p>
          <img src={ngo2} alt="Post image" className="w-full rounded-md mb-4" />
          <div className="flex justify-between items-center">
            <div className="space-x-2 text-lg">
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                ❤️ Like ({post.likes})
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              💬 Comment ({post.comments})
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              ➤ Share
              </button>
            </div>
            <button 
              onClick={() => window.open(`https://instagram.com/p/placeholder-${post.id}`, '_blank')}
              className="px-4 py-2 bg-accent text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              View More
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}


        {activeTab === 'groups' && (
          <div className="space-y-4">
            {groups.map(group => (
              <div key={group.id} className="bg-white border border-gray-200 rounded-lg p-7 shadow-lg shadow-blue-500/50">
                <h3 className="font-semibold text-2xl mb-2">{group.name}</h3>
                <p className="text-gray-600 mb-4">{group.members} members</p>
                <button className="px-6 py-3 bg-accent text-lg text-white rounded-full hover:bg-blue-600 transition-colors">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;