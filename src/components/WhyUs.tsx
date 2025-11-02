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
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    <section id="why-us" className="py-32 bg-black w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-7xl md:text-8xl font-bold text-center mb-16 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
          რატომ ჩვენ?
        </h2>
        
        {/* Small divider */}
        <div className="flex justify-center my-12">
          <div className="w-48 h-1 bg-red-600 rounded-full"></div>
        </div>
        
        <div className="flex flex-col items-center gap-16 max-w-6xl mx-auto">
          {/* Badges - in a row for desktop, column for mobile */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full">
            {/* Experience Badge */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-32 h-32 flex items-center justify-center">
                <picture>
                  <source srcSet="/Badge/baadgewingleft.webp" type="image/webp" />
                  <img 
                    src="/Badge/baadgewingleft.png" 
                    alt="Left Badge"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-red-500">
                  {counters.experience}+
                </div>
                <h3 className="text-3xl font-bold text-white">
                  წელი გამოცდილება
                </h3>
              </div>
              <div className="w-32 h-32 flex items-center justify-center">
                <picture>
                  <source srcSet="/Badge/baadgewingright.webp" type="image/webp" />
                  <img 
                    src="/Badge/baadgewingright.png" 
                    alt="Right Badge"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>

            {/* Projects Badge */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-32 h-32 flex items-center justify-center">
                <picture>
                  <source srcSet="/Badge/baadgewingleft.webp" type="image/webp" />
                  <img 
                    src="/Badge/baadgewingleft.png" 
                    alt="Left Badge"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-red-500">
                  {counters.projects}+
                </div>
                <h3 className="text-3xl font-bold text-white">
                  შესრულებული პროექტი
                </h3>
              </div>
              <div className="w-32 h-32 flex items-center justify-center">
                <picture>
                  <source srcSet="/Badge/baadgewingright.webp" type="image/webp" />
                  <img 
                    src="/Badge/baadgewingright.png" 
                    alt="Right Badge"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-32 h-32 flex items-center justify-center">
                <picture>
                  <source srcSet="/Badge/baadgewingleft.webp" type="image/webp" />
                  <img 
                    src="/Badge/baadgewingleft.png" 
                    alt="Left Badge"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-red-500">
                  {counters.guarantee}%
                </div>
                <h3 className="text-3xl font-bold text-white">
                  იანი გარანტია
                </h3>
              </div>
              <div className="w-32 h-32 flex items-center justify-center">
                <picture>
                  <source srcSet="/Badge/baadgewingright.webp" type="image/webp" />
                  <img 
                    src="/Badge/baadgewingright.png" 
                    alt="Right Badge"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </div>
          
          {/* Text and Testimonials side by side below badges */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            {/* Georgian text */}
            <div className="md:w-1/2 flex items-center justify-start">
              <h3 className="text-6xl font-bold text-white text-start">
                საუკეთესოები
                <br/> ირჩევენ 
                <br/><span className='bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent'>საუკეთესოს.</span>
              </h3>
            </div>
            
            {/* Testimonials */}
            <div className="md:w-1/2 w-full transform scale-125">
              <AnimatedTestimonials testimonials={testimonials} />
            </div>
          </div>
          
          {/* Money Back Guarantee Section */}
          <div className="relative w-full max-w-4xl mx-auto mt-16">
            <div className="relative bg-gradient-to-r from-black via-black to-red-900 rounded-3xl p-8 md:p-12 border border-red-900 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 bg-cover bg-center opacity-10"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-2/3">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    დაგვიკვეთეთ პროექტი — 30 დღიანი თანხის დაბრუნების გარანტიით
                  </h3>
                  <p className="text-gray-300 text-lg md:text-xl">
                    თუ 100%-ით კმაყოფილი არ დარჩებით, თანხას სრულად დაგიბრუნებთ — ყოველგვარი დამატებითი კითხვის გარეშე. მოცემული გარანტია მოქმედებს და რეგულირდება საქართველოს კანონმდებლობის შესაბამისად.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <picture>
                    <source srcSet="/30moneybackguaranteed.webp" type="image/webp" />
                    <img 
                      src="/30moneybackguaranteed.png" 
                      alt="30 Day Money Back Guarantee" 
                      className="w-80 h-80 md:w-64 md:h-64 object-contain"
                      loading="lazy"
                    />
                  </picture>
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