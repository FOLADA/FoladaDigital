import React, { useState, useEffect } from 'react';
import { FaPhoneAlt } from 'react-icons/fa'
import ConsultationModal from './ConsultationModal'

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'მთავარი', href: '/' },
    { name: 'სერვისები', href: '#services' },
    { name: 'ფასები', href: '/კალკულატორი' },
    { name: 'კლიენტები', href: '#clients' },
    { name: 'FAQ', href: '#faq' },
    { name: 'ბლოგი', href: '#blog' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const id = href.substring(1);
      scrollToSection(id);
    } else {
      window.location.href = href;
    }
  };

  return (
    <nav 
      className={`sticky max-w-[1200px] rounded-full top-5 z-50 transition-all duration-300 border border-white/10 mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] ${ // Added width constraints to prevent overflow
        scrolled 
          ? 'bg-transparent backdrop-blur-sm shadow-2xl' 
          : 'bg-transparent backdrop-blur-sm'
      }`}
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between mx-auto px-4 sm:px-6 py-2">
        <a href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Elevo Logo" 
            className="h-12 sm:h-16 md:h-20 w-auto" // Reduced logo size to prevent overflow
          />
        </a>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex list-none m-0 p-0">
          {navLinks.map((link, index) => (
            <li key={index} className="mx-2 lg:mx-3"> {/* Reduced margins to prevent overflow */}
              <a 
                href={link.href} 
                className="text-sm md:text-base font-copy text-white no-underline transition-all duration-300 hover:text-[rgb(255,0,0)] hover:scale-105 block py-3"
                onClick={(e) => handleNavClick(link.href, e)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        <button 
          className="hidden md:block bg-[rgb(255,0,0)] text-white border-rounded rounded-full mr-2 md:mr-4 px-4 py-2 text-sm font-copy font-semibold cursor-pointer transition-all duration-300 hover:bg-red-500 hover:-translate-y-0.5 hover:shadow-lg"
          role="button"
          aria-label="Book a call"
          onClick={() => setIsModalOpen(true)}
        >
           <FaPhoneAlt className='inline-block ml-1'/> კონსულტაცია
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col justify-between w-6 h-5 bg-transparent border-none cursor-pointer p-0"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${
            mobileMenuOpen ? 'rotate-45 translate-x-1 translate-y-1' : ''
          }`}></span>
          <span className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${
            mobileMenuOpen ? '-rotate-45 translate-x-1 -translate-y-1' : ''
          }`}></span>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 sm:left-5 sm:right-5 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 mt-2">
          <ul className="list-none p-0 m-0">
            {navLinks.map((link, index) => (
              <li key={index} className="my-2">
                <a 
                  href={link.href} 
                  className="block text-lg sm:text-2xl font-copy text-white no-underline py-2 sm:py-3 transition-all duration-300 hover:text-[rgb(255,0,0)]"
                  onClick={(e) => handleNavClick(link.href, e)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button 
                className="w-full bg-[rgb(255, 0, 0)] text-white border-none rounded-full px-4 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-copy font-semibold cursor-pointer transition-all duration-300 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg mt-2"
                onClick={() => setIsModalOpen(true)}
              >
                დაჯავშნე შეხვედრა
              </button>
            </li>
          </ul>
        </div>
      )}
      
      <ConsultationModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;