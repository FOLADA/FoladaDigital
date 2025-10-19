import { useState, useEffect } from 'react';
import { Facebook, MessageCircle } from 'lucide-react';

const UnderConstruction = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
      </div>
      
      {/* Main content without frame/box */}
      <div className={`relative z-10 text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
          ვებსაიტი დამუშავების პროცესშია
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <a 
            href="https://facebook.com/folada.ge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 w-full sm:w-auto"
          >
            <Facebook className="w-5 h-5" />
            <span>Facebook</span>
          </a>
          
          <a 
            href="https://wa.me/995557412922" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-green-500/30 w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>
        
        {/* Bigger Construction.png image */}
        <div className="mt-8 flex justify-center">
          <img 
            src="/Construction.png" 
            alt="Under Construction" 
            className="max-w-full h-auto max-h-96 object-contain animate-pulse"
          />
        </div>
      </div>
      
      {/* Floating elements for depth */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-amber-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-amber-300 rounded-full opacity-50 animate-float animation-delay-4000"></div>
    </div>
  );
};

export default UnderConstruction;