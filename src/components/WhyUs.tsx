import React, { useState, useEffect } from 'react';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const WhyUs = () => {
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    guarantee: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      quote:
        "Folada-მ სრულიად ნულიდან ამიწყო Edutech სტარტაპი. ჯერ 1 თვე გავიდა და უკვე 400 მომხმარებელი გვყავს.",
      name: "Saba Foladasvhili",
      designation: "CEO at Tergi",
      src: "./SabaFoladashvili.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-ac93c696e10c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('why-us');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames per second
    const interval = duration / steps;

    const experienceTarget = 8;
    const projectsTarget = 180;
    const guaranteeTarget = 100;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        experience: Math.min(Math.floor(experienceTarget * progress), experienceTarget),
        projects: Math.min(Math.floor(projectsTarget * progress), projectsTarget),
        guarantee: Math.min(Math.floor(guaranteeTarget * progress), guaranteeTarget)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({
          experience: experienceTarget,
          projects: projectsTarget,
          guarantee: guaranteeTarget
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="clients" className="py-16 md:py-32 bg-black w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-[rgb(255,0,0)] to-[rgb(255,0,0)] bg-clip-text text-transparent">
          რატომ ჩვენ?
        </h2>
        
        {/* Small divider */}
        <div className="flex justify-center my-8 md:my-12">
          <div className="w-24 md:w-48 h-1 bg-[rgb(255,0,0)] rounded-full"></div>
        </div>
        
        <div className="flex flex-col items-center gap-12 md:gap-16 max-w-6xl mx-auto">
          {/* Badges - in a row for desktop, column for mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 w-full">
            {/* Experience Badge */}
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <div className="w-16 h-16 md:w-32 md:h-32 flex items-center justify-center">
                <img 
                  src="/Badge/baadgewingleft.png" 
                  alt="Left Badge"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-red-500">
                  {counters.experience}+
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-white">
                  წელი გამოცდილება
                </h3>
              </div>
              <div className="w-16 h-16 md:w-32 md:h-32 flex items-center justify-center">
                <img 
                  src="/Badge/baadgewingright.png" 
                  alt="Right Badge"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Projects Badge */}
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <div className="w-16 h-16 md:w-32 md:h-32 flex items-center justify-center">
                <img 
                  src="/Badge/baadgewingleft.png" 
                  alt="Left Badge"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-red-500">
                  {counters.projects}+
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-white">
                  შესრულებული პროექტი
                </h3>
              </div>
              <div className="w-16 h-16 md:w-32 md:h-32 flex items-center justify-center">
                <img 
                  src="/Badge/baadgewingright.png" 
                  alt="Right Badge"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <div className="w-16 h-16 md:w-32 md:h-32 flex items-center justify-center">
                <img 
                  src="/Badge/baadgewingleft.png" 
                  alt="Left Badge"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-red-500">
                  {counters.guarantee}%
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-white">
                  იანი გარანტია
                </h3>
              </div>
              <div className="w-16 h-16 md:w-32 md:h-32 flex items-center justify-center">
                <img 
                  src="/Badge/baadgewingright.png" 
                  alt="Right Badge"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
          
          {/* Text and Testimonials side by side below badges */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
            {/* Georgian text */}
            <div className="md:w-1/2 flex items-center justify-start">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-start">
                საუკეთესოები
                <br/> ირჩევენ 
                <br/><span className='bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent'>საუკეთესოს.</span>
              </h3>
            </div>
            
            {/* Testimonials */}
            <div className="md:w-1/2 w-full">
              <AnimatedTestimonials testimonials={testimonials} />
            </div>
          </div>
          
         {/* Money Back Guarantee Section - Enhanced */}
<div className="relative w-full max-w-5xl mx-auto mt-12 md:mt-16 px-4">
  <div className="relative bg-gradient-to-br from-black via-red-950 to-black rounded-3xl p-1 overflow-hidden shadow-2xl">
    {/* Animated gradient border effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-50 blur-xl animate-pulse"></div>
    
    {/* Inner container */}
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-6 md:p-8 lg:p-12 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
      
      {/* Glow effect behind badge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 bg-red-600/20 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="md:w-2/3 space-y-4 md:space-y-6">
          
          {/* Main heading */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            30 დღიანი
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600"> გარანტია
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-gray-300 font-copy text-sm md:text-base lg:text-xl leading-relaxed">
            თუ ნებისმიერი მიზეზით არ დარჩებით კმაყოფილი, უბრალოდ მოგვწერეთ და <span className="text-white font-semibold">სრულად დაგიბრუნებთ თანხას</span> — ყოველგვარი კითხვის გარეშე.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
            <div className="flex items-center gap-1 md:gap-2 text-gray-400">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-lg">ავტომატური დაბრუნება</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2 text-gray-400">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-lg">კითხვების გარეშე</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2 text-gray-400">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-lg">100% უსაფრთხო</span>
            </div>
          </div>
          
          {/* Legal disclaimer */}
          <p className="text-sm md:text-sm text-gray-500 pt-2 border-t border-gray-800">
            * გარანტია მოქმედებს და რეგულირდება საქართველოს კანონმდებლობის შესაბამისად
          </p>
        </div>
        
        {/* Badge Image */}
        <div className="md:w-1/3 flex justify-center relative mt-6 md:mt-0">
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 bg-red-600/30 rounded-full blur-2xl animate-pulse"></div>
          
          {/* Badge container with subtle animation */}
          <div className="relative transform transition-transform duration-300 hover:scale-105">
            <img 
              src="/30moneybackguaranteed.png" 
              alt="30 დღიანი თანხის დაბრუნების გარანტია" 
              className="w-128 h-128 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px] object-contain drop-shadow-2xl"
            />
            {/* Decorative ring */}
            <div className="absolute inset-0 border-4 border-red-600/20 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;