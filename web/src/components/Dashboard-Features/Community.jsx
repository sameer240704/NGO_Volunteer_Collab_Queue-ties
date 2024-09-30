import React, { useState, useEffect } from 'react';
import { Search, Star, Plus, X } from 'lucide-react';
import axios from 'axios';

const Market = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [donationTypeFilter, setDonationTypeFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSeller, setNewSeller] = useState({
    name: '',
    type: '',
    rating: 0,
    donationType: '',
    donationAmount: 0,
    contact: '',
    email: '',
    products: [],
    ngoList: [],
    image: null
  });

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:4224/seller');
        setSellers(response.data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, []);

  const handleAddSeller = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newSeller).forEach(key => {
      if (key === 'products' || key === 'ngoList') {
        formData.append(key, JSON.stringify(newSeller[key]));
      } else {
        formData.append(key, newSeller[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:4224/seller/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSellers([...sellers, response.data]);
      setNewSeller({
        name: '',
        type: '',
        rating: 0,
        donationType: '',
        donationAmount: 0,
        contact: '',
        email: '',
        products: [],
        ngoList: [],
        image: null
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding seller:', error);
    }
  };

  return (
    <>
      <div className="relative -mt-7">
        <div className="container mx-auto p-4 transition-all duration-300">
          <div className="flex justify-end items-center mb-6">
            <button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary text-white px-6 py-4 rounded-full flex items-center">
              <Plus size={20} className="mr-2" />
              {showAddForm ? "Close Form" : "Add Seller"}
            </button>
          </div>

          {showAddForm ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg max-w-lg w-full space-y-6">
                <form onSubmit={handleAddSeller} className="grid grid-cols-1 gap-4">
                  <div className='flex flex-col'>
                    <label htmlFor="name" className='text-lg font-semibold text-blue-900'>Name</label>
                    <input
                      type="text"
                      placeholder="Enter Seller Name"
                      value={newSeller.name}
                      onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
                      className="w-full p-3 rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      required
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="type" className='text-lg font-semibold text-blue-900'>Type</label>
                    <select
                      value={newSeller.type}
                      onChange={(e) => setNewSeller({ ...newSeller, type: e.target.value })}
                      className="w-full p-3 border rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Local Shop">Local Shop</option>
                    </select>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="rating" className='text-lg font-semibold text-blue-900'>Rating</label>
                    <input
                      type="number"
                      placeholder="Rate between 0-5"
                      value={newSeller.rating}
                      onChange={(e) => setNewSeller({ ...newSeller, rating: parseFloat(e.target.value) })}
                      className="w-full p-3 rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      min="0"
                      max="5"
                      step="0.1"
                      required
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="donationType" className='text-lg font-semibold text-blue-900'>Donation Type</label>
                    <input
                      type="text"
                      placeholder="Enter Donation Type"
                      value={newSeller.donationType}
                      onChange={(e) => setNewSeller({ ...newSeller, donationType: e.target.value })}
                      className="w-full p-3 rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      required
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="donationAmount" className='text-lg font-semibold text-blue-900'>Donation Amount (INR)</label>
                    <input
                      type="number"
                      placeholder="Enter Donation Amount"
                      value={newSeller.donationAmount}
                      onChange={(e) => setNewSeller({ ...newSeller, donationAmount: parseInt(e.target.value) })}
                      className="w-full p-3 rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      min="0"
                      required
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="contact" className='text-lg font-semibold text-blue-900'>Contact Number</label>
                    <input
                      type="text"
                      placeholder="Enter Contact Number"
                      value={newSeller.contact}
                      onChange={(e) => setNewSeller({ ...newSeller, contact: e.target.value })}
                      className="w-full p-3 rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      required
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="email" className='text-lg font-semibold text-blue-900'>Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      value={newSeller.email}
                      onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
                      className="w-full p-3 rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      required
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="products" className='text-lg font-semibold text-blue-900'>List of Products</label>
                    <input
                      type="text"
                      placeholder="Comma-separated (e.g., apples, oranges, bread)"
                      value={newSeller.products.join(', ')}
                      onChange={(e) => setNewSeller({ ...newSeller, products: e.target.value.split(',').map(p => p.trim()) })}
                      className="w-full p-3 rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      required
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="ngoList" className='text-lg font-semibold text-blue-900'>List of NGOs</label>
                    <input
                      type="text"
                      placeholder="Comma-separated (e.g., NGO1, NGO2)"
                      value={newSeller.ngoList.join(', ')}
                      onChange={(e) => setNewSeller({ ...newSeller, ngoList: e.target.value.split(',').map(n => n.trim()) })}
                      className="w-full p-3 rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      required
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="image" className='text-lg font-semibold text-blue-900'>Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewSeller({ ...newSeller, image: e.target.files[0] })}
                      className="w-full p-3 rounded-lg bg-gray-100 shadow-md shadow-blue-500/50 focus:ring focus:ring-green-200"
                      required
                    />
                  </div>

                  <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md transition duration-300">
                    Add Seller
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center flex-wrap gap-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search sellers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 pl-10 border rounded-lg font-harmonique"
                  />
                  <Search className="absolute left-3 top-4 text-gray-400" size={20} />
                </div>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="p-4 border rounded-full"
                >
                  <option value="">All Types</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Local Shop">Local Shop</option>
                </select>

                <select
                  value={donationTypeFilter}
                  onChange={(e) => setDonationTypeFilter(e.target.value)}
                  className="p-4 border rounded-full"
                >
                  <option value="">All Donation Types</option>
                  <option value="Food">Food</option>
                  <option value="Money">Money</option>
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>
              <SellerList sellers={sellers} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Market;
