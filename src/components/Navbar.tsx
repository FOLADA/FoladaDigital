import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa'

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'სერვისები', href: '/#services' },
    { name: 'ფასები', href: '/კალკულატორი' },
    { name: 'კლიენტები', href: '/#clients' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'ბლოგი', href: '/#blog' },
  ];

  return (
    <nav 
      className={`sticky max-w-[1200px] rounded-full top-5 z-50 transition-all duration-300 border border-white/10 mx-4 sm:mx-auto ${
        scrolled 
          ? 'bg-transparent backdrop-blur-sm shadow-2xl' 
          : 'bg-transparent backdrop-blur-sm'
      }`}
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between mx-auto px-4 sm:px-6 py-2">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Elevo Logo" 
            className="h-16 sm:h-20 w-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex list-none m-0 p-0">
          {navLinks.map((link, index) => (
            <li key={index} className="mx-3 lg:mx-5">
              {link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link 
                  to={link.href}
                  className="text-sm lg:text-base font-copy text-white no-underline transition-all duration-300 hover:text-red-500 hover:scale-105 block py-3"
                >
                  {link.name}
                </Link>
              ) : (
                <a 
                  href={link.href} 
                  className="text-sm lg:text-base font-copy text-white no-underline transition-all duration-300 hover:text-red-500 hover:scale-105 block py-3"
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>
        
        <a 
          href="#contact" 
          className="hidden md:block bg-[rgb(255,0,0)] text-white border-rounded rounded-full mr-2 sm:mr-4 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-copy font-semibold cursor-pointer transition-all duration-300 hover:bg-red-500 hover:-translate-y-0.5 hover:shadow-lg"
          role="button"
          aria-label="Book a call"
        >
           <FaPhoneAlt className='inline-block ml-1'/> კონსულტაცია
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col justify-between w-6 h-5 sm:w-8 sm:h-6 bg-transparent border-none cursor-pointer p-0"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`block h-0.5 sm:h-0.75 w-full bg-white rounded transition-all duration-300 ${
            mobileMenuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''
          }`}></span>
          <span className={`block h-0.5 sm:h-0.75 w-full bg-white rounded transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block h-0.5 sm:h-0.75 w-full bg-white rounded transition-all duration-300 ${
            mobileMenuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''
          }`}></span>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 mt-2 mx-4">
          <ul className="list-none p-0 m-0">
            {navLinks.map((link, index) => (
              <li key={index} className="my-2 sm:my-3">
                {link.href.startsWith('/') && !link.href.includes('#') ? (
                  <Link 
                    to={link.href}
                    className="block text-lg sm:text-2xl font-copy text-white no-underline py-2 sm:py-3 transition-all duration-300 hover:text-red-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    href={link.href} 
                    className="block text-lg sm:text-2xl font-copy text-white no-underline py-2 sm:py-3 transition-all duration-300 hover:text-red-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a 
                href="#contact"
                className="w-full bg-[rgb(255, 0, 0)] text-white border-none rounded-full px-4 py-3 sm:px-8 sm:py-4 text-base sm:text-xl font-copy font-semibold cursor-pointer transition-all duration-300 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg mt-3 block text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                დაჯავშნე შეხვედრა
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;