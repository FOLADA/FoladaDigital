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
  description: string;
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
      className={`relative rounded-2xl p-1 w-full max-w-md ${
        packageData.featured 
          ? 'border-4 border-red-600 shadow-2xl shadow-red-500/20' 
          : 'border-2 border-gray-700 shadow-xl'
      }`}
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
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
      <div className={`rounded-xl p-6 h-full ${
        packageData.featured 
          ? 'bg-gradient-to-br from-gray-900 to-black' 
          : 'bg-gradient-to-br from-gray-900 to-gray-950'
      }`}>
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className={`text-4xl w-16 h-16 flex items-center justify-center rounded-full ${
              packageData.featured 
                ? 'bg-gradient-to-br from-red-600 to-red-500 text-white' 
                : 'bg-gray-800 text-white'
            }`}>
              {packageData.icon}
            </div>
          </div>
          <h3 className={`font-extrabold mb-2 font-copy ${
            packageData.featured 
              ? 'text-5xl bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent' 
              : 'text-4xl text-white'
          }`}>
            {packageData.title}
          </h3>
        </div>
        
        {/* Price Display */}
        <div className={`rounded-2xl p-6 mb-6 text-center ${
          packageData.featured ? 'bg-black/30' : 'bg-gray-800/50'
        }`}>
          {packageData.originalPrice && (
            <div className="text-gray-500 line-through text-2xl font-medium mb-2 font-copy">
              {packageData.originalPrice}₾
            </div>
          )}
          
          <div className="text-6xl font-extrabold text-white mb-4 font-copy">
            {packageData.price}₾
            {packageData.discount && (
              <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full ml-2 animate-pulse font-copy">
                {packageData.discount}% OFF
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center mb-2 font-copy">
            <div className="text-white font-semibold text-lg">
              + {packageData.monthly}₾/თვე
            </div>
            <div className="text-green-400 text-sm">
              ☕ ({(packageData.monthly/30).toFixed(2)}₾/დღე)
            </div>
          </div>
          
          <div className="text-gray-400 text-xs italic font-copy">
            ერთი კაპუჩინოს ფასად
          </div>
        </div>
        
        {/* Emotional Hook */}
        <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/20 rounded-xl p-5 mb-6 text-center backdrop-blur-sm">
          <p className="text-red-300 text-base font-medium leading-relaxed font-copy">
            {packageData.description}
          </p>
        </div>
        
        {/* Features */}
        <div className="mb-8">
          <h4 className="text-lg font-bold mb-5 text-red-400 font-copy">
            {packageData.featuresHeader}
          </h4>
          
          <ul className="space-y-3">
            {packageData.features.map((feature, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-lg font-copy"
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  packageData.featured ? 'bg-green-400/10 text-green-400' : 'bg-blue-400/10 text-blue-400'
                }`}>
                  ✓
                </div>
                <span className="text-white text-sm font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Bonus Section (only for PRO) */}
        {packageData.bonus && packageData.bonus.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-2 border-dashed border-yellow-500/30 rounded-xl p-5 mb-6">
            <div className="text-gold-400 font-bold text-base mb-3 font-copy">
              🎁 BONUS (ღირებულება: 400₾)
            </div>
            <ul className="space-y-2">
              {packageData.bonus.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm font-copy">
                  <span className="text-yellow-400">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Urgency Indicators (only for PRO package) */}
        {packageData.urgency.length > 0 && (
          <div className="flex flex-wrap gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-6">
            {packageData.urgency.map((item, index) => (
              <div 
                key={index} 
                className={`px-3 py-1 rounded-full text-xs font-semibold font-copy ${
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
        <motion.button 
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 mb-4 font-copy ${
            packageData.featured
              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30 hover:from-red-500 hover:to-red-600 h-14'
              : 'bg-white text-gray-900 border-2 border-white hover:bg-gray-100 h-13'
          }`}
          whileHover={{ scale: packageData.featured ? 1.02 : 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          პაკეტის არჩევა {packageData.featured && '→'}
        </motion.button>
        
        {/* Social Proof */}
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm font-medium font-copy">
            {packageData.popular 
              ? '✓ 23 კლინიკამ ამოირჩია PRO' 
              : '✓ 47 კლინიკამ ამოირჩია STANDART'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;