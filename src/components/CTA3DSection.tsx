import React from 'react';
import { motion } from 'framer-motion';

const CTA3DSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 3D Card Container */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* 3D Depth Effect - Multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 rounded-3xl transform translate-x-2 translate-y-2 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl transform translate-x-1 translate-y-1 opacity-60"></div>
            
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500 rounded-tl-lg"></div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500 rounded-tr-lg"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-24 h-24">
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500 rounded-bl-lg"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24">
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500 rounded-br-lg"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    მზად ხართ თქვენი ბიზნესის აღორძინებისთვის?
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-gray-300 font-copy"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    დავიწყოთ თანამშრომლობა დღესვე
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <a 
                    href="https://api.whatsapp.com/send?phone=995557412922&text&context=AfcBBS9lBPm_n7MG_hNUSN6ljAZAgbTa-pGfSssu9xOaHDUBFCqT3MyXknGcQ9knr1rjjozb8X6cokJlUmDADBKZoVvyj4x1aXuIUvxutok4-HE0FA8UIxn0kd4yyt7mJTRM0df7EwiTGsPMPJ6uBJ9LtQ&source&app=facebook" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block group"
                  >
                    <div className="relative">
                      {/* 3D Button Depth Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                      
                      {/* Main Button */}
                      <div className="relative bg-gradient-to-br from-red-600 to-red-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex items-center">
                        <span className="mr-2">დავიწყოთ</span>
                        <svg 
                          className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA3DSection;