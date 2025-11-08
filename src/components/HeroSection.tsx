import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BsGlobe } from "react-icons/bs";
import { FaCalculator, FaPhoneAlt, FaStar } from "react-icons/fa";
import { useState } from "react";
import ConsultationModal from "./ConsultationModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-start justify-center pt-16 md:pt-24 lg:pt-32 relative overflow-hidden z-0">
      {/* Background Image - Fixed to prevent horizontal overflow */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{ 
          backgroundImage: "url('/background.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll' // Changed from fixed to scroll to prevent overflow issues
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content - Added max-width constraint to prevent overflow */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 mt-8 w-full max-w-6xl mx-auto">
        {/* Reduced heading size to prevent overflow on smaller screens */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="text-[rgb(255,0,0)] block">
            წარმოაჩინე <span className="text-white">შენი ბიზნესი ინტერნეტში</span>
          </span>
          <span className="text-[rgb(255,0,0)] block mt-2">
            <span className="text-white">და</span> გაზარდე გაყიდვები! <BsGlobe className="inline-block text-black bg-gradient-to-t from-black via-red-500 to-[rgb(255,0,0)] border-none rounded-full p-1 align-middle" />
          </span>
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mt-8">
          <Link to="/კალკულატორი">
            <Button 
              size="lg" 
              className="border-[rgb(255,255,255)] rounded-[6px] border-2 text-white px-6 py-4 text-lg md:px-9 md:py-6 md:text-2xl w-full sm:w-auto"
            >
              <FaCalculator className="inline-block mr-2" /> ფასების გამოთვლა
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-[rgb(255,0,0)] text-white border-[rgb(255,0,0)] border-2 hover:bg-[rgb(255,0,0)] hover:text-white px-6 py-4 text-lg md:px-12 md:py-6 md:text-2xl rounded-[6px] w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPhoneAlt className="inline-block mr-2" /> კონსულტაცია
          </Button>
        </div>

        {/* Xalxi Image below buttons */}
        <div className="mt-8 flex flex-col items-center">
          <picture>
            <source srcSet="/xalxi.webp" type="image/webp" />
            <img src="/xalxi.png" alt="xalxi" className="w-48 xs:w-56 sm:w-64 md:w-64 h-auto" loading="lazy" />
          </picture>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-400 text-lg xs:text-xl md:text-2xl" />
            <FaStar className="text-yellow-400 text-lg xs:text-xl md:text-2xl" />
            <FaStar className="text-yellow-400 text-lg xs:text-xl md:text-2xl" />
            <FaStar className="text-yellow-400 text-lg xs:text-xl md:text-2xl" />
            <FaStar className="text-yellow-400 text-lg xs:text-xl md:text-2xl" />
            <span className="text-white text-base xs:text-lg md:text-xl ml-1">4.7 შეფასება</span>
          </div>
          
          {/* Vimeo Video Container - Reduced max-width to prevent overflow */}
          <div className="mt-8 md:mt-12 mb-8 md:mb-10 w-full max-w-3xl mx-auto">
            {/* Decorative border wrapper */}
            <div className="relative p-1 rounded-lg bg-gradient-to-br from-red-600 via-red-500 to-red-700">
              {/* Corner accents - Reduced size to prevent overflow */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-red-600 rounded-tl-md z-20 hidden sm:block"></div>
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-red-600 rounded-tr-md z-20 hidden sm:block"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-red-600 rounded-bl-md z-20 hidden sm:block"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-red-600 rounded-br-md z-20 hidden sm:block"></div>
              
              {/* Video container */}
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-black w-full">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://player.vimeo.com/video/1133191320?title=0&byline=0&portrait=0&badge=0&autopause=0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="vslvideo"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ConsultationModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default HeroSection;