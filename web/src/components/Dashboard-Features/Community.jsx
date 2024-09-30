import React from 'react'
import ngo3 from '../../assets/images/ngo3.png'

const Community = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <img src={ngo3} alt="Weather Image" className="rounded-3xl w-full object-cover mb-6"/>
      <h2 className="text-2xl font-bold text-primary">Community</h2>
      <p className="text-gray-600 mt-2">
        Analyze crop growth, yield, and optimal conditions. Use data-driven insights to ensure maximum productivity for your crops.
      </p>
    </div>
  )
}

export default Community