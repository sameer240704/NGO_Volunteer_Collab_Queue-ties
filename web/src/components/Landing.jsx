import React, { useEffect, useState, useRef } from 'react';
import { Facebook, Twitter, Instagram, ArrowRight, Shield } from 'lucide-react';
import gsap from 'gsap'; 
import ngo1 from '../assets/images/ngo1.png';
import ngo2 from '../assets/images/ngo2.png';
import ngo3 from '../assets/images/ngo3.png';
import ngo5 from '../assets/images/ngo5.png';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import About from './About';
import Features from './Features';
import Footer from './Footer';

const Landing = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [percent, setPercent] = useState(0);
  const [farm, setFarm] = useState(0);


  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    footer.scrollIntoView({ behavior: 'smooth' });
  };

  // Refs for text animations
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  // Update percentage progress
  useEffect(() => {
    if (percent < 57) {
      const interval = setInterval(() => {
        setPercent((prev) => prev + 1);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [percent]);

  // Update farm progress
  useEffect(() => {
    if (farm < 687) {
      const interval = setInterval(() => {
        setFarm((prev) => prev + 1);
      }, 1);
      return () => clearInterval(interval);
    }
  }, [farm]);

  // GSAP animation for text
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top center", // Trigger the animation when the element hits the center of the screen
        toggleActions: "play pause resume reset",
      },
    });

    tl.fromTo(
      headingRef.current,
      { x: -100, opacity: 0 }, // Start with text off-screen to the left
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' } // Animate to the right
    )
      .fromTo(
        subheadingRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.5" // Offset to start the animation slightly earlier
      );
  }, []);

  return (
    <section className="pt-40 font-poppins">
      <Navigation />
      <div className="mx-11 text-center">
        <h1 ref={headingRef} className="text-6xl font-semibold mb-6 font-harmonique">
        Together, We Build  <span className="bg-primary px-5 rounded-full text-secondary">
        Stronger
          </span>
        </h1>
        <h2 ref={subheadingRef} className="text-6xl font-semibold mb-8 font-harmonique">
        Communities Through Service
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Krishak Saathi is dedicated to revolutionizing agriculture through cutting-edge technology and data-driven solutions.
        </p>

        <div className="flex justify-center space-x-4">
          <Link to='/login' className="bg-primary text-lg text-white font-poppins px-10 py-4 rounded-full hover:bg-blue-800 transition duration-300 mb-5">
            Explore
          </Link>
          <button onClick={scrollToFooter} className="bg-[#dfeaf8] text-lg text-gray-800 font-poppins px-10 py-4 rounded-full hover:bg-blue-100 transition duration-300 mb-5">
            Contact Us
          </button>
        </div>

        <div className="flex gap-6">
          <div className='w-[400px] -mt-20'>
            <div className="bg-[#cddff6] p-6 rounded-full custom-shape1 h-[350px]">
              <h3 className="text-6xl font-semibold mb-2 text-primary] text-left">{percent}%</h3>
              <p className="text-lg text-left">
                Agriculture encompasses crop and livestock production, aquaculture, fisheries, and forestry for food and non-food purposes.
              </p>
              <Link to="/login" className="mt-4 text-xl bg-accent hover:bg-blue-500 text-blue-900 px-8 py-3 rounded-full flex items-center">
                Explore more <ArrowRight size={28} className="ml-6 rounded-full" />
              </Link>
            </div>
            <div className="bg-primary text-white p-6 rounded-full flex items-center mt-4">
              <div className="mr-4">
                <Shield size={32} />
              </div>
              <div>
                <p className="font-semibold">+{farm} farms were protected</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-full overflow-hidden custom-shape1 w-[400px] h-[400px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
            <img src={ngo1} alt="Farmer" className="w-full h-full object-cover" />
            <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 transition-all duration-300 ease-in-out ${isHovering ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}>
              <p className="text-lg">
                Insuring a climate-resilient future for farmers by providing insurance & technology to protect and improve their livelihoods.
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden w-[400px] h-[350px] mt-20">
            <img src={ngo2} alt="Farm Field" className="w-full h-full object-cover" />
          </div>

          <div className="relative overflow-hidden rounded-lg flex items-center justify-center custom-shape2 w-[400px] h-[400px]">
            <img src={ngo5} alt="Farm Field" className="relative w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-16">
              <p className="mb-2 font-poppins text-2xl text-white">'Connect with us on social media'</p>
              <div className="flex space-x-4 mt-2">
                <a href="*" target='_blank'><Facebook size={32} className='text-white' /></a>
                <a href="*" target='_blank'><Twitter size={32} className='text-white' /></a>
                <a href="*" target='_blank'><Instagram size={32} className='text-white' /></a>
              </div>
            </div>
          </div>

          <div className='w-[400px] h-[350px] -mt-20'>
            <div className="relative overflow-hidden rounded-lg custom-shape2">
              <img src={ngo3} alt="Hands holding plant" className="w-[400px] h-[350px] object-cover" />
            </div>
            <div className="bg-primary text-white p-6 rounded-full flex items-center mt-4">
              <div className="mr-4">
                <Shield size={32} />
              </div>
              <div>
                <p className="font-semibold">+{farm} farms were protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <About/>
      <Features/>
      <Footer/>
    </section>
  );
};

export default Landing;
