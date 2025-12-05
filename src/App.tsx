import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection';
import CompanyLogos from './components/CompanyLogos';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import CTA3DSection from './components/CTA3DSection';
import Footer from './components/Footer';
import CalculatorPage from './pages/CalculatorPage';
import Portfolio from './components/Portfolio';
import PortfolioPage from './pages/PortfolioPage';
import PackagesPage from './pages/PackagesPage';

function App() {
  return (
    <div className="min-h-screen text-white">
      <Navbar/>
      <Analytics />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <CompanyLogos />
            <Services />
            <Portfolio />
            <WhyUs />
            <FAQ />
            <CTA3DSection />
            <Footer />
          </>
        } />
        <Route path="/კალკულატორი" element={
          <>
            <CalculatorPage />
            <Footer />
          </>
        } />
        <Route path="/portfolio" element={
          <>
            <PortfolioPage />
            <Footer />
          </>
        } />
        <Route path="/packages" element={
          <>
            <PackagesPage />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;