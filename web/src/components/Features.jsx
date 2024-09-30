import React from 'react';
import ngo1 from '../assets/images/ngo1.png';
import ngo2 from '../assets/images/ngo2.png';
import ngo3 from '../assets/images/ngo3.png';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className='mx-4 md:mx-12 lg:mx-24 py-10'>
      <h1 className='text-3xl md:text-4xl lg:text-5xl font-normal mb-2 md:mb-6 font-poppins'>
      Empowering NGOs
      </h1>
      <h1 className='text-3xl md:text-4xl lg:text-5xl font-normal mb-10 md:mb-16 font-poppins'>
        with{' '}
        <span className='bg-primary px-4 md:px-5 rounded-full text-white'>
        Efficient
        </span> Management
      </h1>
      <div className='flex flex-col lg:flex-row gap-10 lg:gap-10 justify-left'>
        {/* Card 1 */}
        <div className='bg-[#F2F3ED] p-6 rounded-lg shadow-xl w-[100%] lg:w-[30%] h-[400px]'>
          <img
            src={ngo1}
            alt='Market Pricing'
            className='rounded-3xl w-full h-[40%] object-cover mb-4'
          />
          <div className='text-left'>
            <h1 className='text-xl font-semibold mb-2 font-poppins'>
              Match-Making
            </h1>
            <p className='text-gray-700 font-poppins'>
              Monitor the latest market trends and prices. Stay informed about current market conditions.
            </p>
          </div>
          <Link
            to='/login'
            className='font-poppins w-full md:w-[40%] hover:border-[#364423] hover:text-[#364423] mt-4 text-primary border text-lg md:text-xl border-primary rounded-full px-5 py-3 flex items-center'
          >
            Explore <ArrowRight size={20} className='ml-2' />
          </Link>
        </div>

        {/* Card 2 */}
        <div className='bg-[#F2F3ED] p-6 rounded-lg shadow-xl w-[100%] lg:w-[30%] h-[400px]'>
          <img
            src={ngo2}
            alt='Weather Forecasting'
            className='rounded-3xl w-full h-[40%] object-cover mb-4'
          />
          <div className='text-left'>
            <h1 className='text-xl font-semibold mb-2 font-poppins'>
              Market Place
            </h1>
            <p className='text-gray-700 font-poppins'>
              Stay updated on current and future weather conditions to optimize farming strategies.
            </p>
          </div>
          <Link
            to='/login'
            className='font-poppins w-full md:w-[40%] hover:border-[#364423] hover:text-[#364423] mt-4 text-primary border text-lg md:text-xl border-primary rounded-full px-5 py-3 flex items-center'
          >
            Explore <ArrowRight size={20} className='ml-2' />
          </Link>
        </div>

        {/* Card 3 */}
        <div className='bg-[#F2F3ED] p-6 rounded-lg shadow-xl w-[100%] lg:w-[30%] h-[400px]'>
          <img
            src={ngo3}
            alt='Crop Analysis'
            className='rounded-3xl w-full h-[40%] object-cover mb-4'
          />
          <div className='text-left'>
            <h1 className='text-xl font-semibold mb-2 font-poppins'>
              NGO Planner
            </h1>
            <p className='text-gray-700 font-poppins'>
              Analyze crop growth. Use data-driven insights to ensure maximum productivity for your crops.
            </p>
          </div>
          <Link
            to='/login'
            className='font-poppins w-full md:w-[40%] hover:border-[#364423] hover:text-[#364423] mt-4 text-primary border text-lg md:text-xl border-primary rounded-full px-5 py-3 flex items-center'
          >
            Explore <ArrowRight size={20} className='ml-2' />
          </Link>
        </div>
        {/* Card 3 */}
        <div className='bg-[#F2F3ED] p-6 rounded-lg shadow-xl w-[100%] lg:w-[30%] h-[400px]'>
          <img
            src={ngo3}
            alt='Crop Analysis'
            className='rounded-3xl w-full h-[40%] object-cover mb-4'
          />
          <div className='text-left'>
            <h1 className='text-xl font-semibold mb-2 font-poppins'>
              Community
            </h1>
            <p className='text-gray-700 font-poppins'>
              Analyze crop growth. Use data-driven insights to ensure maximum productivity for your crops.
            </p>
          </div>
          <Link
            to='/login'
            className='font-poppins w-full md:w-[40%] hover:border-[#364423] hover:text-[#364423] mt-4 text-primary border text-lg md:text-xl border-primary rounded-full px-5 py-3 flex items-center'
          >
            Explore <ArrowRight size={20} className='ml-2' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
