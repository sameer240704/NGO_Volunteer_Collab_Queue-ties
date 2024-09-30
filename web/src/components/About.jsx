import React from 'react';
import ngo1 from '../assets/images/ngo1.png';
import ngo2 from '../assets/images/ngo2.png';
import ngo3 from '../assets/images/ngo3.png';
// import farmimg from '../assets/images/farmabt.jpg'; // Uncomment if you use this image

const About = () => {

  return (
    <div className='py-56'>
      <div className='mx-auto text-center w-[80vw] font-poppins text-4xl text-slate-900 leading-relaxed'>
        KRISHAK SAATHI
        <span className='inline-block align-middle mx-1 relative'>
          <img src={ngo1} alt="Farm 1" className='w-28 h-16 rounded-full inline align-middle'/>
          <div className='bg-black absolute top-0 left-0 bg-opacity-40 hover:bg-opacity-0 transition ease-in-out duration-200 size-full rounded-full'></div>
        </span> 
        PROVIDES ACCURATE WEATHER FORECASTING, EFFICIENT CROP MANAGEMENT TOOLS, AND REAL-TIME MARKET PRICING DATA.
        <span className='inline-block align-middle mx-1 relative'>
          <img src={ngo2} alt="Farm 2" className='w-28 h-16 rounded-full inline align-middle'/>
          <div className='bg-black absolute top-0 left-0 bg-opacity-40 hover:bg-opacity-0 transition ease-in-out duration-200 size-full rounded-full'></div>
        </span>
        OUR PLATFORM EMPOWERS FARMERS TO MAKE INFORMED DECISIONS, AND ACHIEVE GREATER PRODUCTIVITY,
        <span className='inline-block align-middle mx-1 relative'>
          <img src={ngo3} alt="Farm 3" className='w-28 h-16 rounded-full inline align-middle'/>
          <div className='bg-black absolute top-0 left-0 bg-opacity-40 hover:bg-opacity-0 transition ease-in-out duration-200 size-full rounded-full'></div>
        </span>
        ALL WHILE SUPPORTING SUSTAINABLE AGRICULTURAL PRACTICES.
        {/* <img src={farmimg} alt="" className='mt-28 w-[80vw] h-[70vh] rounded-2xl'/> */}
      </div>
    </div>
  );
};

export default About;
