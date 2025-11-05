import React from 'react';
import { motion } from 'framer-motion';

const CompanyLogos = () => {
  // List of company logos
  const logos = [
    { id: 1, src: '/companies/AscendGlobal.png', alt: 'Ascend Global' },
    { id: 2, src: '/companies/CosmosVentures.png', alt: 'Cosmos Ventures' },
    { id: 3, src: '/companies/EnergoSunGeorgia.png', alt: 'Energo Sun Georgia' },
    { id: 4, src: '/companies/Random.png', alt: 'Random' },
    { id: 5, src: '/companies/Thecrafthouse.png', alt: 'The Craft House' },
    { id: 6, src: '/companies/Weihenstephan.PNG', alt: 'Weihenstephan' },
    { id: 7, src: '/companies/meorerandom.png', alt: 'Meore Random' },
    { id: 8, src: '/companies/shushabandi.PNG', alt: 'Shushabandi' },
    { id: 9, src: '/companies/tergi.png', alt: 'Tergi' },
  ];

  return (
    <section className="bg-black w-full">
      <div className="px-4">
        
        {/* Infinite scrolling logo carousel */}
        <div className="relative overflow-hidden py-6 sm:py-8 mx-0 px-0">
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-black to-transparent z-10"></div>
          
          <motion.div 
            className="flex"
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {/* First set of logos */}
            {logos.map((logo) => (
              <div 
                key={`first-${logo.id}`} 
                className="flex-shrink-0 mx-4 sm:mx-8 flex items-center justify-center"
                style={{ width: '80px', height: '60px', minWidth: '80px' }}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            
            {/* Duplicate set of logos for seamless loop */}
            {logos.map((logo) => (
              <div 
                key={`second-${logo.id}`} 
                className="flex-shrink-0 mx-4 sm:mx-8 flex items-center justify-center"
                style={{ width: '80px', height: '60px', minWidth: '80px' }}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;