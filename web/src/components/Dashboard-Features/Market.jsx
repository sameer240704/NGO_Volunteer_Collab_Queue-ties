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

  useEffect(() => {
    const fetchFilteredSellers = async () => {
      try {
        const response = await axios.get('http://localhost:4224/seller');
        const filteredSellers = response.data.filter((seller) => {
          const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesType = typeFilter === '' || seller.type === typeFilter;
          const matchesDonationType = donationTypeFilter === '' || seller.donationType === donationTypeFilter;
          return matchesSearch && matchesType && matchesDonationType;
        });
        setSellers(filteredSellers);
      } catch (error) {
        console.error('Error fetching filtered sellers:', error);
      }
    };

    fetchFilteredSellers();
  }, [searchTerm, typeFilter, donationTypeFilter]);

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

  const SellerCard = ({ seller, onViewDetails }) => (
    <div className="border rounded-lg p-4 shadow-md bg-white flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{seller.name}</h3>
        <p className="text-gray-600">{seller.type}</p>
        <div className="flex items-center mt-2">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="ml-1">{seller.rating}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">Donation: {seller.donationType}</p>
        <p className="text-sm mt-1">Amount: ₹{seller.donationAmount.toLocaleString('en-IN')}</p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <img src={seller.image} alt={seller.name} className="w-20 h-20 object-cover rounded-md" />
        <button
          className="mt-3 bg-primary hover:bg-blue-500 transition ease-in-out duration-150 text-white px-3 py-1 rounded-full flex items-center text-sm"
          onClick={() => onViewDetails(seller)}
        >
          View Details
        </button>
      </div>
    </div>
  );
  
  const SellerDetails = ({ seller, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-blue-500/50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className='flex items-center justify-between mb-4'>
        <h3 className="font-bold text-xl ml-4">{seller.name}</h3>
        <X className="text-red-500 fill-current mr-2 cursor-pointer hover:text-red-600 active:text-red-400  " size={28} onClick={onClose} />
        </div>
        
        <img src={seller.image} alt={seller.name} className="w-screen h-32 object-cover rounded-md mb-4 mx-auto" />
        <p className="text-gray-600 mb-2">{seller.type}</p>
        <div className="flex items-center mb-2">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="ml-1">{seller.rating}</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">Donation: {seller.donationType}</p>
        <p className="text-sm mb-2">Amount: ₹{seller.donationAmount.toLocaleString('en-IN')}</p>
        <p className="text-sm mb-2">Contact: {seller.contact}</p>
        <p className="text-sm mb-2">Email: {seller.email}</p>
        <p className="text-sm mb-2">Products: {seller.products.join(', ')}</p>
        <p className="text-sm mb-2">NGOs: {seller.ngoList.join(', ')}</p>
        <button
          className="mt-4 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-full w-full"
        >
          See Payment Options
        </button>
      </div>
    </div>
  );
  
  const [selectedSeller, setSelectedSeller] = useState(null);
  const SellerList = ({ sellers }) => {
    const handleViewDetails = (seller) => {
      setSelectedSeller(seller);
    };
  
    const handleCloseDetails = () => {
      setSelectedSeller(null);
    };

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} onViewDetails={handleViewDetails} />
          ))}
        </div>
  
        {selectedSeller && (
          <SellerDetails seller={selectedSeller} onClose={handleCloseDetails} />
        )}
      </div>
    );
  }

  return (
    <>
    {<div className="relative">
    <div className={`container mx-auto p-4 transition-all duration-300 ${selectedSeller ? '' : ''}`}>
      <div className="flex justify-end items-center mb-6">
        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus size={20} className="mr-2" />
          Add Seller
        </button>
      </div>
      
      {showAddForm && (
        <form onSubmit={handleAddSeller} className="grid grid-cols-2 gap-3 mb-6 p-5 border rounded-lg shadow-md bg-white space-y-4 max-w-screen mx-auto">
          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='text-lg'>Name</label>
            <input
              type="text"
              placeholder="Enter Seller Name"
              value={newSeller.name}
              onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              required
            />
          </div>
          
          <div className='flex flex-col gap-2'>
            <label htmlFor="type" className='text-lg'>Type</label>
            <select
              value={newSeller.type}
              onChange={(e) => setNewSeller({ ...newSeller, type: e.target.value })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              required
            >
              <option value="">Select Type</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Local Shop">Local Shop</option>
            </select>
          </div>
          
          <div className='flex flex-col gap-2'>
            <label htmlFor="rating" className='text-lg'>Rating</label>
            <input
              type="number"
              placeholder="Rate between 0-5"
              value={newSeller.rating}
              onChange={(e) => setNewSeller({ ...newSeller, rating: parseFloat(e.target.value) })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>
          
          <div className='flex flex-col gap-2'>
            <label htmlFor="donationType" className='text-lg'>Donation Type</label>
            <input
              type="text"
              placeholder="Enter Donation Type"
              value={newSeller.donationType}
              onChange={(e) => setNewSeller({ ...newSeller, donationType: e.target.value })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              required
            />
          </div>
          
          <div className='flex flex-col gap-2'>
            <label htmlFor="donationAmount" className='text-lg'>Donation Amount (INR)</label>
            <input
              type="number"
              placeholder="Enter Donation Amount"
              value={newSeller.donationAmount}
              onChange={(e) => setNewSeller({ ...newSeller, donationAmount: parseInt(e.target.value) })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              min="0"
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="contact" className='text-lg'>Contact Number</label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              value={newSeller.contact}
              onChange={(e) => setNewSeller({ ...newSeller, contact: e.target.value })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              required
            />
          </div>
          
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-lg'>Email Address</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={newSeller.email}
              onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="products" className='text-lg'>List of Products</label>
            <input
              type="text"
              placeholder="Comma-separated (e.g., apples, oranges, bread)"
              value={newSeller.products.join(', ')}
              onChange={(e) => setNewSeller({ ...newSeller, products: e.target.value.split(',').map(p => p.trim()) })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="ngoList" className='text-lg'>List of NGOs</label>
            <input
              type="text"
              placeholder="Comma-separated (e.g., NGO1, NGO2)"
              value={newSeller.ngoList.join(', ')}
              onChange={(e) => setNewSeller({ ...newSeller, ngoList: e.target.value.split(',').map(n => n.trim()) })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="image" className='text-lg'>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewSeller({ ...newSeller, image: e.target.files[0] })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-200"
              required
            />
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md transition duration-300">
            Add Seller
          </button>
        </form>
      )}

      <div className="mb-6 flex items-center flex-wrap gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">All Types</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Local Shop">Local Shop</option>
        </select>
        
        <select
          value={donationTypeFilter}
          onChange={(e) => setDonationTypeFilter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">All Donation Types</option>
          <option value="Food">Food</option>
          <option value="Money">Money</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>
      
      <SellerList sellers={sellers} />
      </div>
      {selectedSeller && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-0" onClick={() => setSelectedSeller(null)}></div>
      )}
    </div>}
    </>
  );
};

export default Market;