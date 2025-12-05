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
  discount?: number;
  popular: boolean;
  description: string;
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
      id: 'standard',
      featured: false,
      title: 'STANDART',
      icon: '💎',
      price: 1500,
      monthly: 50,
      popular: false,
      description: 'კარგი სავიზიტო ბარათი ციფრულ სამყაროში. თქვენი კლინიკა გამოჩნდება ონლაინ სივრცეში.',
      featuresHeader: 'შედის პაკეტში:',
      features: [
        '✔ 4 გვერდი → პაციენტებს 30 წამში აქვთ ყველა ინფორმაცია',
        '✔ SSL დაცვა → პაციენტების მონაცემები 100% უსაფრთხოდ',
        '✔ Responsive Design → საიტი იდეალულად გამოიყურება ნებისმიერ მოწყობილობაზე',
        '✔ საძიებო სისტემების ოპტიმიზაცია → თქვენი კლინიკა გამოჩნდება Google-ში',
        '✔ საკონტაქტო ფორმა → პაციენტები მარტივად დაგიკავშირდებიან',
        '✔ სოციალური ქსელების ბმულები → თქვენი კლინიკა ყველგან იქნება ხილული'
      ],
      urgency: []
    },
    {
      id: 'pro',
      featured: true,
      title: 'PRO',
      icon: '🚀',
      price: 2500,
      originalPrice: 3200,
      monthly: 70,
      discount: 20,
      popular: true,
      description: 'არა მხოლოდ საიტი - მარკეტინგის ძრავა. მუშაობს 24/7, როცა თქვენ სძინავთ.',
      featuresHeader: 'ყველაფერი STANDART-იდან + დამატებით:',
      features: [
        '✔ Full Custom Premium დიზაინი → უნიკალური, მაღალი ნდობის სამედიცინო UI/UX',
        '✔ 8 გვერდი → პაციენტებს 30 წამში აქვთ ყველა ინფორმაცია',
        '✔ პროფესიონალური დიზაინი → თქვენი კლინიკა გამოჩნდება პრემიუმ სივრცეში',
        '✔ Online ჩატი → პაციენტები მომენტალურად მიიღებენ პასუხს',
        '✔ მობილური აპლიკაცია → თქვენი კლინიკა ყველას ხელთან იქნება',
        '✔ ელ.ფოსტის მარკეტინგი → ავტომატურად გადავუგზავნით შეთავაზებებს',
        '✔ სოციალური ქსელების ინტეგრაცია → თქვენი კლინიკა ყველგან იქნება ხილული'
      ],
      bonus: [
        'პირველი 3 ბლოგის სტატიის დაწერა',
        'Google My Business ოპტიმიზაცია',
        '2 სოციალური მედიის post template'
      ],
      urgency: [
        '⏰ მხოლოდ 3 ადგილი დარჩა თებერვალში',
        '🎁 ამ თვის შეკვეთაზე - ფასების გვერდი უფასოდ'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              გმადლობთ, რომ გვირჩევთ
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
          
          <motion.button
            className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-red-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => setShowQuiz(true)}
          >
            → არ ვარ დარწმუნებული რომელი ავირჩიო
          </motion.button>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
            {/* Render STANDARD package first (left side) */}
            <PackageCard 
              packageData={packages[0]} 
              isReversed={false}
              onQuizAnswer={handleQuizAnswer}
            />
            
            {/* Render PRO package second (right side) */}
            <PackageCard 
              packageData={packages[1]} 
              isReversed={true}
              onQuizAnswer={handleQuizAnswer}
            />
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">მზად ხართ დასაწყებად?</h3>
          <p className="text-gray-300 text-xl mb-8">15 წუთიანი უფასო კონსულტაცია</p>
          
          {/* Calendly inline widget begin */}
          <div className="calendly-inline-widget" data-url="https://calendly.com/giokevkh-kd_4/democall" style={{minWidth: '320px', height: '700px', margin: '0 auto'}}></div>
          {/* Calendly inline widget end */}
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">❓</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">ჯერ კიდევ ფიქრობთ?</h3>
            <p className="text-gray-300 text-lg mb-6">
              უფასო PDF: "როგორ ამოიცნოთ ცუდი ვებ სააგენტო - 7 Red Flag"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="თქვენი ელ. ფოსტა" 
                className="flex-grow bg-gray-800 border border-gray-700 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 font-copy"
              />
              <button className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3 px-6 rounded-full whitespace-nowrap hover:scale-105 transition-transform duration-300">
                გამოგზავნა
              </button>
            </div>
          </div>
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