import React from 'react'
import Logo from '../assets/images/logo_light.png'

const Footer = () => {
  return (
    <div id='footer' className='mt-24'>
      <footer className="bg-primary py-8 mx-12 mb-10 rounded-2xl font-poppins text-xl">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start">
        <div className="mb-4 sm:mb-0">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-16 -mr-3 mb-2" />
          <span className="text-2xl font-poppins font-semibold text-white ml-5">Samarpit</span>
        </div>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
        A platform to streamline NGO operations by matching volunteers to projects, tracking resources, managing campaigns, and enhancing visibility through social media integration.
        </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white font-medium mb-2">Company</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-white hover:text-gray-800 text-lg">About us</a></li>
              <li><a href="#" className="text-white hover:text-gray-800 text-lg">Dashboard</a></li>
              <li><a href="#" className="text-white hover:text-gray-800 text-lg">Explore</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Resources</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-white hover:text-gray-800 text-lg">Contact us</a></li>
              <li><a href="#" className="text-white hover:text-gray-800 text-lg">FAQs</a></li>
              <li><a href="#" className="text-white hover:text-gray-800 text-lg">Support</a></li>
            </ul>
          </div>        
          <div>
            <h3 className="text-white font-medium mb-2">General Info</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-white hover:text-gray-800 text-lg">Contact</a></li>
              <li><a href="#" className="text-white hover:text-gray-800 text-lg">Terms</a></li>
              <li><a href="#" className="text-white hover:text-gray-800 text-lg">Privacy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-white text-lg mt-4">
        <p>Team Queue-Ties</p>
      </div>
    </footer>
    </div>
  )
}

export default Footer
