import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection';
import CompanyLogos from './components/CompanyLogos';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CalculatorPage from './pages/CalculatorPage';
import Pricing from './components/Pricing';

function App() {
  return (
    <div className="min-h-screen text-white">
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <CompanyLogos />
            <Services />
            <Pricing />
            <WhyUs />
            <FAQ />
            <Footer />
          </>
        } />
        <Route path="/კალკულატორი" element={<CalculatorPage />} />
      </Routes>
    </div>
  );
}

export default App;