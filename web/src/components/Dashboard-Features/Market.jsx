import React, { useState, useEffect } from 'react';
import { Search, Star, Filter, Plus, Info } from 'lucide-react';

// Mock data for sellers (restaurants and local shops)
const mockSellers = [
  { id: 1, name: "Joe's Diner", type: 'Restaurant', rating: 4.5, donationType: 'Food', donationAmount: 38000 },
  { id: 2, name: 'Green Grocer', type: 'Local Shop', rating: 4.2, donationType: 'Money', donationAmount: 75000 },
  { id: 3, name: 'Pizza Palace', type: 'Restaurant', rating: 4.7, donationType: 'Food', donationAmount: 56000 },
  { id: 4, name: 'Community Bookstore', type: 'Local Shop', rating: 4.3, donationType: 'Books', donationAmount: 22500 },
  { id: 5, name: 'Organic Cafe', type: 'Restaurant', rating: 4.8, donationType: 'Money', donationAmount: 112500 },
  { id: 6, name: 'Local Bakery', type: 'Local Shop', rating: 4.6, donationType: 'Food', donationAmount: 45000 },
  { id: 7, name: 'Tech for Good', type: 'Local Shop', rating: 4.4, donationType: 'Electronics', donationAmount: 150000 },
  { id: 8, name: 'Veggie Delight', type: 'Restaurant', rating: 4.9, donationType: 'Food', donationAmount: 60000 },
];

const   Market = () => {
  const [sellers, setSellers] = useState(mockSellers);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [donationTypeFilter, setDonationTypeFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSeller, setNewSeller] = useState({
    name: '',
    type: '',
    rating: 0,
    donationType: '',
    donationAmount: 0
  });

  useEffect(() => {
    // Filter sellers based on search term and filters
    const filteredSellers = mockSellers.filter(seller => {
      const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === '' || seller.type === typeFilter;
      const matchesDonationType = donationTypeFilter === '' || seller.donationType === donationTypeFilter;
      
      return matchesSearch && matchesType && matchesDonationType;
    });

    setSellers(filteredSellers);
  }, [searchTerm, typeFilter, donationTypeFilter]);

  const handleViewDetails = (sellerId) => {
    // Placeholder function for viewing seller details
    console.log(`View details for seller with ID: ${sellerId}`);
    // In a real application, you might navigate to a new page or open a modal here
  };

  const SellerCard = ({ seller }) => (
    <div className="border rounded-lg p-4 shadow-md bg-white flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{seller.name}</h3>
        <p className="text-gray-600">{seller.type}</p>
        <div className="flex items-center mt-2">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="ml-1">{seller.rating}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">Donation: {seller.donationType}</p>
        <p className="text-sm font-semibold mt-1">Amount: ₹{seller.donationAmount.toLocaleString('en-IN')}</p>
        <button
          onClick={() => handleViewDetails(seller.id)}
          className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md flex items-center text-sm"
        >
          <Info size={16} className="mr-1" />
          View Details
        </button>
      </div>
      <img 
        src={seller.image} 
        alt={seller.name} 
        className="w-20 h-20 object-cover rounded-md" 
      />
    </div>
  );

  const handleAddSeller = (e) => {
    e.preventDefault();
    const id = sellers.length + 1;
    setSellers([...sellers, { ...newSeller, id }]);
    setNewSeller({ name: '', type: '', rating: 0, donationType: '', donationAmount: 0 });
    setShowAddForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end items-center mb-6">
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Seller
        </button>
      </div>
      
      {showAddForm && (
        <form onSubmit={handleAddSeller} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
          <input
            type="text"
            placeholder="Seller Name"
            value={newSeller.name}
            onChange={(e) => setNewSeller({...newSeller, name: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <select
            value={newSeller.type}
            onChange={(e) => setNewSeller({...newSeller, type: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Local Shop">Local Shop</option>
          </select>
          <input
            type="number"
            placeholder="Rating (0-5)"
            value={newSeller.rating}
            onChange={(e) => setNewSeller({...newSeller, rating: parseFloat(e.target.value)})}
            className="w-full p-2 mb-2 border rounded"
            min="0"
            max="5"
            step="0.1"
            required
          />
          <input
            type="text"
            placeholder="Donation Type"
            value={newSeller.donationType}
            onChange={(e) => setNewSeller({...newSeller, donationType: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Donation Amount (INR)"
            value={newSeller.donationAmount}
            onChange={(e) => setNewSeller({...newSeller, donationAmount: parseInt(e.target.value)})}
            className="w-full p-2 mb-2 border rounded"
            min="0"
            required
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
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
      
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map(seller => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  );
};

export default Market;