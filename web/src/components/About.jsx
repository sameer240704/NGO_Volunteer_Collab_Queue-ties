import React from 'react';
import ngo1 from '../assets/images/ngo1.png';
import ngo2 from '../assets/images/ngo2.png';
import ngo3 from '../assets/images/ngo3.png';
// import farmimg from '../assets/images/farmabt.jpg'; // Uncomment if you use this image

const About = () => {

  return (
    <div className='mx-auto text-center w-[80vw] font-poppins text-4xl text-slate-900 leading-relaxed my-40'>
  THIS PLATFORM
  <span className='inline-block align-middle mx-1 relative'>
    <img src={ngo1} alt="NGO 1" className='w-28 h-16 rounded-full inline align-middle'/>
    <div className='bg-black absolute top-0 left-0 bg-opacity-40 hover:bg-opacity-0 transition ease-in-out duration-200 size-full rounded-full'></div>
  </span>
  PROVIDES NGOs WITH THE TOOLS TO STREAMLINE OPERATIONS, SUCH AS VOLUNTEER MATCHING, RESOURCE TRACKING, AND CAMPAIGN MANAGEMENT.
  <span className='inline-block align-middle mx-1 relative'>
    <img src={ngo2} alt="NGO 2" className='w-28 h-16 rounded-full inline align-middle'/>
    <div className='bg-black absolute top-0 left-0 bg-opacity-40 hover:bg-opacity-0 transition ease-in-out duration-200 size-full rounded-full'></div>
  </span>
  IT ENABLES NGOs TO RUN FUNDRAISING CAMPAIGNS AND PROMOTE THEIR PROJECTS EFFECTIVELY THROUGH SOCIAL MEDIA INTEGRATION,
  <span className='inline-block align-middle mx-1 relative'>
    <img src={ngo3} alt="NGO 3" className='w-28 h-16 rounded-full inline align-middle'/>
    <div className='bg-black absolute top-0 left-0 bg-opacity-40 hover:bg-opacity-0 transition ease-in-out duration-200 size-full rounded-full'></div>
  </span>
  MAKING IT EASIER FOR THEM TO COORDINATE EFFORTS AND DRIVE GREATER SOCIAL IMPACT.
</div>

  );
};

export default About;
