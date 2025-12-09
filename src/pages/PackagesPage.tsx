import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PackageCard from '../components/PackageCard';


interface PackageData {
  id: string;
  featured: boolean;
  title: string;
  icon: string;
  price: number;
  originalPrice?: number;
  monthly: number;
  popular: boolean;
  featuresHeader: string;
  features: string[];
  urgency: string[];
  bonus?: string[];
}

const PackagesPage: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);

  // Initialize Calendly widget after component mounts
  useEffect(() => {
    // Check if Calendly is already loaded
    const win = window as any;
    if (win.Calendly) {
      win.Calendly.initInlineWidget({
        url: 'https://calendly.com/giokevkh-kd_4/democall',
        parentElement: document.querySelector('.calendly-inline-widget')
      });
      return;
    }

    // Load Calendly script if not already loaded
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up only if we added the script
      const win = window as any;
      if (!win.Calendly) {
        document.body.removeChild(script);
      }
    };
  }, []);
  const handleQuizAnswer = (question: string, answer: string) => {
    if (quizStep < 2) {
      setQuizStep(quizStep + 1);
    } else {
      setShowQuiz(false);
      setQuizStep(0);
    }
  };

  const packages: PackageData[] = [
    {
      id: 'basic',
      featured: false,
      title: 'საბაზისო',
      icon: '🌿',
      price: 800,
      monthly: 30,
      popular: false,
      featuresHeader: 'შედის პაკეტში:',
      features: [
        'თანამედროვე სამედიცინო დიზაინი',
        '1-4 გვერდი',
        'საბაზისო SEO',
        'საკონტაქტო ფორმა',
        'Google Maps',
        'სამუშაო საათები',
        'სოცქსელების დართვა',
        'SSL დაცვა'
      ],
      urgency: []
    },
    {
      id: 'premium',
      featured: true,
      title: 'პრემიუმი',
      icon: '🚀',
      price: 2000,
      originalPrice: 2500,
      monthly: 70,
      popular: true,
      featuresHeader: 'ყველაფერი საბაზისოდან + დამატებით:',
      features: [
        'უმაღლესი კლასის დიზაინი',
        '8+ გვერდი',
        'დეტალური სერვისები + ექიმების პროფილები',
        'ბლოგი / სტატიები',
        'SEO ოპტიმიზაცია',
        'ანიმაციები & micro-interactions',
        'გაძლიერებული უსაფრთხოება',
        'Search Console ინტეგრაცია',
        'დამატებითი შეფასებები + 24/7 საიტის მხარდაჭერა'
      ],
      urgency: [
        '⏰ მხოლოდ 3 ადგილი დარჩა თებერვალში'
      ]
    }
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              გმადლობთ რომ გვირჩევთ!
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            აირჩიეთ თქვენთვის სასურველი პაკეტი
          </motion.p>
        
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {/* Render BASIC package first */}
            <div className="w-full max-w-md">
              <PackageCard 
                packageData={packages[0]} 
                isReversed={false}
                onQuizAnswer={handleQuizAnswer}
              />
            </div>
            
            {/* Render PREMIUM package second */}
            <div className="w-full max-w-md">
              <PackageCard 
                packageData={packages[1]} 
                isReversed={false}
                onQuizAnswer={handleQuizAnswer}
              />
            </div>
          </div>
          
        </div>
        <div className="container mx-auto px-4 text-center mt-8">
          <a
            href="https://calendly.com/giokevkh-kd_4/democall"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-red-500/30 inline-block"
          >
            → არ ვარ დარწმუნებული რომელი ავირჩიო
          </a>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">მზად ხართ დასაწყებად?</h3>
          <p className="text-gray-300 text-xl mb-8">15 წუთიანი უფასო კონსულტაცია</p>
          
          {/* Calendly inline widget begin */}
          <div className="calendly-inline-widget" data-url="https://calendly.com/giokevkh-kd_4/democall" style={{minWidth: '320px', height: '700px', margin: '0 auto'}}></div>
          {/* Calendly inline widget end */}
        </div>
      </section>

      

      {/* Quiz Modal */}      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 md:p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">რომელი პაკეტი გჭირდებათ?</h3>
              <button 
                onClick={() => setShowQuiz(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>
            
            {quizStep === 0 && (
              <div>
                <p className="text-gray-300 mb-6">რამდენი პაციენტი გყავთ თვეში?</p>
                <div className="space-y-3">
                  <button 
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => handleQuizAnswer('patients', '< 50')}
                  >
                    &lt; 50
                  </button>
                  <button 
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => handleQuizAnswer('patients', '50-200')}
                  >
                    50-200
                  </button>
                  <button 
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => handleQuizAnswer('patients', '200+')}
                  >
                    200+
                  </button>
                </div>
              </div>
            )}
            
            {quizStep === 1 && (
              <div>
                <p className="text-gray-300 mb-6">გაქვთ დიზაინერი გუნდში?</p>
                <div className="space-y-3">
                  <button 
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => handleQuizAnswer('designer', 'Yes')}
                  >
                    დიახ
                  </button>
                  <button 
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => handleQuizAnswer('designer', 'No')}
                  >
                    არა
                  </button>
                </div>
              </div>
            )}
            
            {quizStep === 2 && (
              <div>
                <p className="text-gray-300 mb-6">გჭირდებათ blog/articles?</p>
                <div className="space-y-3">
                  <button 
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => handleQuizAnswer('blog', 'Yes')}
                  >
                    დიახ
                  </button>
                  <button 
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => handleQuizAnswer('blog', 'No')}
                  >
                    არა
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;