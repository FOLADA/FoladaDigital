import React, { useEffect, useRef } from 'react';

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const services = [
    {
      image: "/webdevelopmentservice.webp",
      title: "ვებსაიტის დამზადება",
      description: "შევქმნით თანამედროვე და მობილურ მოწყობილობებზე მორგებულ ვებსაიტს, რომელიც თქვენს ბიზნესს გამორჩეულად წარმოაჩენს და ვიზიტორებს კლიენტებად აქცევს"
    },
    {
      image: "/SMMservice.webp",
      title: "სოც. გვერდების მართვა",
      description: "ვმართავთ თქვენს ნაცვლად თქვენს ბრენდს ინტერნეტში – ვქმნით პოსტებს, ვმუშაობთ ვიზუალზე და ვზრუნავთ თქვენი გვერდების აუდიტორიის ზრდაზე"
    },
    {
      image: "/PaidAds.webp",
      title: "ფასიანი რეკლამები",
      description: "ვმართავთ Facebook და Instagram რეკლამებს, ვაოპტიმიზირებთ და ვნერგავთ თქვენს ბიზნესში გაყიდვების სისტემას"
    },
    {
      image: "/AIintegrationservice.webp",
      title: "AI ინტეგრაცია",
      description: "ვნერგავთ ხელოვნურ ინტელექტს თქვენს პროცესებში, რათა დაზოგოთ დრო, ავტომატიზიროთ და გაზარდოთ გაყიდვები"
    },
    {
      image: "/SEOService.webp",
      title: "SEO ოპტიმიზაცია",
      description: "ვაუმჯობესებთ თქვენს ვებსაიტს საძიებო სისტემის ოპტიმიზაციით, რათა გამოჩნდეთ Google-ის შედეგების პირველ გვერდზე და მიიღოთ ორგანული ტრაფიკი უფასოდ"
    },
    {
      image: "/GraphicDesign.webp",
      title: "გრაფიკული დიზაინი",
      description: "ვქმნით კრეატიული, ორიგინალურ და პროფესიონალურ ვიზუალებს, რომლებიც თქვენს ბრენდს გამორჩეულს გახდის – ლოგო, ქავერი, პოსტები და სხვა"
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

    // Observe each card
    cardRefs.current.forEach((card) => {
      if (card) {
        const cardElement = card as HTMLElement;
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(30px)';
        cardElement.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(cardElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="services" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16">
           <h2 className="text-7xl md:text-8xl font-bold text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-24">
          რას გთავაზობთ?
        </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={(el) => {
                if (el) {
                  cardRefs.current[index] = el as HTMLDivElement;
                }
              }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-lg p-8 rounded-2xl border border-slate-700 relative"
              style={{
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.1) inset',
              }}
            >
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full overflow-hidden border-4 border-red-500 bg-slate-900 shadow-lg">
                <picture>
                  <source srcset={service.image} type="image/webp" />
                  <img 
                    src={service.image.replace('.webp', '.png')} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </picture>
              </div>
              <h3 className="text-3xl font-bold mb-6 text-white pl-24">
                {service.title}
              </h3>
              <p className="text-[15px] text-slate-300 font-copy leading-relaxed pl-24">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;