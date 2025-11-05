import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalculator, FaPhoneAlt } from 'react-icons/fa';

const Pricing = () => {
  const pricingPlans = [
    {
      name: "სტანდარტული ვებსაიტი",
      price: "500₾",
      period: "ერთჯერადად",
      features: [
        "მობილურად მორგებული დიზაინი",
        "SEO ოპტიმიზაცია",
        "სოციალური ქსელების ინტეგრაცია",
        "კონტაქტის ფორმა",
        "Google Analytics",
        "3 თვის ხარვეზების გასწორება"
      ],
      popular: false
    },
    {
      name: "პრემიუმ პაკეტი",
      price: "1000₾",
      period: "ერთჯერადად",
      features: [
        "უნიკალური დიზაინი",
        "მობილურად მორგებული დიზაინი",
        "SEO ოპტიმიზაცია",
        "სოციალური ქსელების ინტეგრაცია",
        "კონტაქტის ფორმა",
        "Google Analytics",
        "მომხმარებლების ავტორიზაცია",
        "6 თვის ხარვეზების გასწორება",
        "ტექნიკური მხარდაჭერა"
      ],
      popular: true
    },
    {
      name: "ელ. კომერცია",
      price: "2000₾",
      period: "ერთჯერადად",
      features: [
        "უნიკალური დიზაინი",
        "მობილურად მორგებული დიზაინი",
        "SEO ოპტიმიზაცია",
        "სოციალური ქსელების ინტეგრაცია",
        "კონტაქტის ფორმა",
        "Google Analytics",
        "მომხმარებლების ავტორიზაცია",
        "პროდუქტების მართვა",
        "გადახდის სისტემა",
        "12 თვის ხარვეზების გასწორება",
        "ტექნიკური მხარდაჭერა"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-[rgb(255,0,0)] to-[rgb(255,0,0)] bg-clip-text text-transparent">
            ფასები
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-copy">
            აირჩიეთ თქვენთვის საუკეთესო პაკეტი და დაიწყეთ თქვენი ბიზნესის განვითარება
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-red-500 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl shadow-red-500/20' 
                  : 'border-slate-700 bg-gradient-to-b from-slate-900/50 to-slate-800/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-1 rounded-full text-sm font-bold">
                  ყველაზე პოპულარი
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-red-500">{plan.price}</span>
                  <span className="text-gray-400 block mt-2">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300 font-copy">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col gap-4">
                <Link to="/კალკულატორი">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <FaCalculator className="mr-2" /> გამოთვალე ფასი
                  </button>
                </Link>
                <button 
                  className="w-full border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <FaPhoneAlt className="mr-2" /> კონსულტაცია
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg font-copy">
            გსურთ ინდივიდუალური შეთავაზება? დაგვიკავშირდით პირდაპირ
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;