import React from 'react';
import { motion } from 'framer-motion';

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
  featuresHeader: string;
  features: string[];
  urgency: string[];
  bonus?: string[];
}

interface PackageCardProps {
  packageData: PackageData;
  isReversed: boolean;
  onQuizAnswer: (question: string, answer: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageData, isReversed, onQuizAnswer }) => {
  return (
    <motion.div
      className={`relative rounded-2xl p-1 w-full h-full flex flex-col ${
        packageData.featured 
          ? 'border-4 border-red-600 shadow-2xl shadow-red-500/20' 
          : 'border-2 border-gray-700 shadow-xl'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Popular Badge */}
      {packageData.popular && (
        <motion.div 
          className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 font-copy"
          animate={{ 
            y: [0, -4, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🔥 ყველაზე პოპულარული
        </motion.div>
      )}
      
      {/* Card Content */}
      <div className={`rounded-xl p-4 sm:p-6 h-full flex flex-col ${
        packageData.featured 
          ? 'bg-gradient-to-br from-gray-900 to-black' 
          : 'bg-gradient-to-br from-gray-900 to-gray-950'
      }`}>
        {/* Header */}
        <div className="mb-4 sm:mb-6 text-center flex-shrink-0">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className={`text-3xl sm:text-4xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full ${
              packageData.featured 
                ? 'bg-gradient-to-br from-red-600 to-red-500 text-white' 
                : packageData.popular 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white' 
                  : 'bg-gray-800 text-white'
            }`}>
              {packageData.icon}
            </div>
          </div>
          <h3 className={`font-extrabold mb-2 font-copy ${
            packageData.featured 
              ? 'text-3xl sm:text-5xl bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent' 
              : 'text-3xl sm:text-4xl text-white'
          }`}>
            {packageData.title}
          </h3>
        </div>
        
        {/* Price Display */}
        <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-center flex-shrink-0 ${
          packageData.featured ? 'bg-black/30' : 'bg-gray-800/50'
        }`}>
          {packageData.originalPrice && (
            <div className="text-gray-500 line-through text-xl sm:text-2xl font-medium mb-1 sm:mb-2 font-copy">
              {packageData.originalPrice}₾
            </div>
          )}
          
          <div className="flex items-end justify-center mb-3 sm:mb-4">
            <div className="text-5xl sm:text-6xl font-extrabold text-white font-copy">
              {packageData.price}₾
            </div>
            {packageData.discount && (
              <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full ml-2 animate-pulse font-copy">
                {packageData.discount}% OFF
              </span>
            )}
            <div className="text-white font-semibold text-lg sm:text-lg ml-3 mb-2 font-copy">
              + {packageData.monthly}₾/თვე
            </div>
          </div>          
          {/* Removed the daily cost calculation and coffee icon as per request */}
        </div>
        
        {/* Features - This will grow to fill remaining space */}
        <div className="mb-6 sm:mb-8 flex-grow">
          <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-5 text-red-400 font-copy">
            {packageData.featuresHeader}
          </h4>
          
          <ul className="space-y-2 sm:space-y-3 overflow-y-auto max-h-64 sm:max-h-96">
            {packageData.features.map((feature, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg font-copy"
              >
                <div className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center ${
                  packageData.featured ? 'bg-green-400/10 text-green-400' : 'bg-blue-400/10 text-blue-400'
                }`}>
                  ✓
                </div>
                <span className="text-white text-xs sm:text-sm font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Bonus Section - REMOVED AS PER REQUEST */}
        
        {/* Urgency Indicators */}
        {packageData.urgency.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4 sm:mb-6 flex-shrink-0">
            {packageData.urgency.map((item, index) => (
              <div 
                key={index} 
                className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold font-copy ${
                  item.includes('მხოლოდ') 
                    ? 'bg-red-500/20 text-red-300 animate-pulse' 
                    : 'bg-green-500/20 text-green-300'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
        
        {/* CTA Button */}
        <button 
          className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 mb-3 sm:mb-4 font-copy flex-shrink-0 ${
            packageData.featured
              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30 hover:from-red-500 hover:to-red-600 h-12 sm:h-14'
              : packageData.popular
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:from-blue-500 hover:to-blue-600 h-12 sm:h-14'
                : 'bg-white text-gray-900 border-2 border-white hover:bg-gray-100 h-11 sm:h-13'
          }`}
        >
          პაკეტის არჩევა {packageData.featured && '→'}
        </button>
        
        {/* Social Proof */}
        <div className="text-center py-3 sm:py-4 flex-shrink-0">
          <p className="text-gray-400 text-xs sm:text-sm font-medium font-copy">
            {packageData.id === 'basic' 
              ? '✓ 15 კლინიკამ ამოირჩია საბაზისო' 
              : packageData.id === 'standard'
                ? '✓ 32 კლინიკამ ამოირჩია სტანდარტული' 
                : '✓ 18 კლინიკამ ამოირჩია პრემიუმი'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;