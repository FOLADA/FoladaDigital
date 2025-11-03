import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { BsGlobe } from "react-icons/bs";
import { FaCalculator, FaPhoneAlt, FaStar } from "react-icons/fa";

const HeroSection = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-start justify-center pt-24 md:pt-32 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/background.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 mt-8 w-full max-w-6xl">
        <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
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
              className="border-[rgb(255,255,255)] rounded-[6px] border-2 text-white px-6 py-4 text-lg md:px-9 md:py-6 md:text-3xl w-full sm:w-auto"
            >
              <FaCalculator className="inline-block mr-2" /> ფასების გამოთვლა
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-[rgb(255,0,0)] text-white border-[rgb(255,0,0)] border-2 hover:bg-[rgb(255,0,0)] hover:text-white px-6 py-4 text-lg md:px-12 md:py-6 md:text-3xl rounded-[6px] w-full sm:w-auto"
          >
            <FaPhoneAlt className="inline-block mr-2" /> კონსულტაცია
          </Button>
        </div>

        {/* Xalxi Image below buttons */}
        <div className="mt-8 flex flex-col items-center">
          <picture>
            <source srcSet="/xalxi.webp" type="image/webp" />
            <img src="/xalxi.png" alt="xalxi" className="w-40 md:w-48 h-auto" loading="lazy" />
          </picture>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-400 text-lg md:text-xl" />
            <FaStar className="text-yellow-400 text-lg md:text-xl" />
            <FaStar className="text-yellow-400 text-lg md:text-xl" />
            <FaStar className="text-yellow-400 text-lg md:text-xl" />
            <FaStar className="text-yellow-400 text-lg md:text-xl" />
            <span className="text-white text-base md:text-xl ml-1">4.7 შეფასება</span>
          </div>
          
          {/* Vimeo Video Container with Sophisticated Border */}
          <div className="mt-8 md:mt-12 mb-8 md:mb-10 relative w-full max-w-4xl">
            {/* Decorative border elements */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-75"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-700 via-red-900 to-red-700 rounded-lg"></div>
            
            {/* Vimeo Video container with sophisticated border */}
            <div className="relative bg-black rounded-lg overflow-hidden border-2 border-red-800 shadow-2xl" style={{paddingTop: '56.25%', position: 'relative'}}>
              <iframe 
                src="https://player.vimeo.com/video/1133191320?badge=0&autopause=0&player_id=0&app_id=58479" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                title="vslvideo"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;