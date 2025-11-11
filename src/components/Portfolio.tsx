import React, { useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const portfolioItems = [
    {
      id: 1,
      image: "/works/aphoria.png",
      title: "Aphoria",
      description: "თანამედროვე ვებსაიტი კომპლექსური სისტემით"
    },
    {
      id: 2,
      image: "/works/beerumuseum.png",
      title: "ვეინშტეფანი",
      description: "ვებსაიტი რესტორნისთვის"
    },
    {
      id: 3,
      image: "/works/coldemailerai.png",
      title: "Cold Emailer AI",
      description: "ვებსაიტი ხელოვნური ინტელექტით"
    },
    {
      id: 4,
      image: "/works/energosunge.png",
      title: "EnergoSun",
      description: "განახლებადი ენერგიის წყაროს კომპანიის ვებსაიტი"
    },
    {
      id: 5,
      image: "/works/shushabanditseretelze.png",
      title: "შუშაბანდი წერეთელზე",
      description: "რესტორნის ვებსაიტი"
    },
    {
      id: 6,
      image: "/works/tergiuni.png",
      title: "თერგი",
      description: "University educational platform"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe the section header
    if (sectionRef.current) {
      const sectionElement = sectionRef.current as HTMLElement;
      sectionElement.style.opacity = '0';
      sectionElement.style.transform = 'translateY(20px)';
      sectionElement.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(sectionElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="portfolio" className="py-16 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-[rgb(255,0,0)] to-[rgb(255,0,0)] bg-clip-text text-transparent mb-6">
            ჩვენი ნამუშევრები
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-copy">
            გაეცანით ჩვენს უახლეს პროექტებს და გადახედეთ ჩვენს გამოცდილებას სხვადასხვა სფეროში
          </p>
        </div>

        {/* Portfolio Carousel */}
        <div className="relative px-4 md:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {portfolioItems.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-lg h-full"
                    style={{
                      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.1) inset',
                    }}>
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                      <p className="text-[15px] text-slate-300 font-copy leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/80 text-white border-none rounded-full w-12 h-12" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-black/50 hover:bg-black/80 text-white border-none rounded-full w-12 h-12" />
          </Carousel>
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => navigate('/portfolio')}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30"
          >
            ყველა პროექტის ნახვა
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;