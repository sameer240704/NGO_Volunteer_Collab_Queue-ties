import React, { useState } from 'react';

// Simulated data for posts and groups
const posts = [
  {
    id: 1,
    author: 'John Doe',
    content: 'Just planted a new batch of tomatoes! 🍅 #OrganicFarming',
    likes: 15,
    comments: 3,
    image: '/api/placeholder/400/300'
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'Our community garden is thriving! Check out these beautiful sunflowers 🌻',
    likes: 24,
    comments: 7,
    image: '/api/placeholder/400/300'
  },
  {
    id: 3,
    author: 'Jane Smith',
    content: 'Our community garden is thriving! Check out these beautiful sunflowers 🌻',
    likes: 24,
    comments: 7,
    image: '/api/placeholder/400/300'
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'Our community garden is thriving! Check out these beautiful sunflowers 🌻',
    likes: 24,
    comments: 7,
    image: '/api/placeholder/400/300'
  },
  {
    id: 5,
    author: 'Jane Smith',
    content: 'Our community garden is thriving! Check out these beautiful sunflowers 🌻',
    likes: 24,
    comments: 7,
    image: '/api/placeholder/400/300'
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
    <div className="h-full w-full flex flex-col bg-gray-100 overflow-hidden">
      <div className="flex justify-be">
        <h2 className="text-4xl font-harmonique font-semibold text-primary mb-8">Community</h2>
        <div className="flex-shrink-0">
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('posts')} 
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'posts' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Posts
          </button>
          <button 
            onClick={() => setActiveTab('groups')} 
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'groups' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Groups
          </button>
          <button 
            onClick={() => setActiveTab('create')} 
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'create' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Create Post
          </button>
        </div>
      </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
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
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{post.author}</h3>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  <img src={post.image} alt="Post image" className="w-full rounded-md mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="space-x-2">
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        Like ({post.likes})
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        Comment ({post.comments})
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        Share
                      </button>
                    </div>
                    <button 
                      onClick={() => window.open(`https://instagram.com/p/placeholder-${post.id}`, '_blank')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
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
              <div key={group.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                <p className="text-gray-600 mb-4">{group.members} members</p>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
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