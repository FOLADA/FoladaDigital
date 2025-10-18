import { useEffect, useState, memo, useMemo, useCallback, useRef } from 'react';
import { ArrowRight, Play, Star, Users, Zap, Target, BarChart3, Globe, CheckCircle, Quote, ChevronDown, Sparkles, Award, TrendingUp, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import PortfolioSection from '@/components/Portfolio';
import ServicesSection from '@/components/Services';
import AboutSection from '@/components/About';
import PricingSection from '@/components/Pricing';
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

// Memoized TestimonialItem component
const TestimonialItem = memo(({ testimonial }: { testimonial: { quote: string; author: string; role: string; website: string; rating: number } }) => {
  return (
    <CarouselItem>
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 shadow-xl rounded-2xl p-1">
        <CardContent className="p-10 flex flex-col items-center text-center">
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <Quote className="w-10 h-10 text-blue-400 mb-4" />
          <p className="text-slate-200 mb-6 text-xl italic font-light">{testimonial.quote}</p>
          <div>
            <div className="font-bold text-white text-lg">{testimonial.author}</div>
            <div className="text-slate-400">{testimonial.role}</div>
            <div className="text-blue-400 text-sm mt-1">{testimonial.website}</div>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
});

TestimonialItem.displayName = "TestimonialItem";

// Memoized StatItem component
const StatItem = memo(({ stat, index }: { stat: { number: string; label: string; icon: JSX.Element }; index: number }) => {
  return (
    <div key={index} className="text-center group cursor-pointer">
      <div className="flex items-center justify-center mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
        {stat.icon}
      </div>
      <div className="text-3xl md:text-4xl font-light bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
        {stat.number}
      </div>
      <div className="text-gray-400 text-sm font-light">{stat.label}</div>
    </div>
  );
});

StatItem.displayName = "StatItem";

const Index = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Optimize scroll handler with useCallback and throttling
  const handleScroll = useCallback(() => {
    // Throttle scroll events for better performance
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = 0;
      });
    }
  }, []);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Update ref immediately for the most recent position
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    
    // Throttle state updates to prevent excessive re-renders
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Clean up animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, handleMouseMove]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Load testimonials from translations
  const testimonials = t('testimonials.testimonialsList', { returnObjects: true }) as Array<{
    quote: string;
    author: string;
    role: string;
    website: string;
    rating: number;
  }>;

  // Memoize stats data
  const stats = useMemo(() => [
    { number: '500%', label: t('stats.roi'), icon: <TrendingUp className="w-5 h-5" /> },
    { number: '36', label: t('stats.identities'), icon: <Globe className="w-5 h-5" /> },
    { number: '24', label: t('stats.campaigns'), icon: <Zap className="w-5 h-5" /> },
    { number: '99.2%', label: t('stats.satisfaction'), icon: <Award className="w-5 h-5" /> }
  ], [t]);

  // Memoize stat items
  const statItems = useMemo(() => stats.map((stat, index) => (
    <StatItem key={index} stat={stat} index={index} />
  )), [stats]);

  // Memoize testimonial items
  const testimonialItems = useMemo(() => testimonials.map((testimonial, index) => (
    <TestimonialItem key={index} testimonial={testimonial} />
  )), [testimonials]);

  // Memoize floating elements - reduced from 8 to 4 for better performance
  const floatingElements = useMemo(() => (
    [...Array(4)].map((_, i) => (
      <div
        key={i}
        className="absolute opacity-5 hover:opacity-10 transition-opacity duration-1000"
        style={{
          left: `${20 + (i * 15)}%`,
          top: `${30 + (i * 10)}%`,
          transform: `translateY(${Math.sin(scrollY * 0.001 + i) * 15}px) rotate(${i * 45}deg)`, // Reduced animation intensity
          animationDelay: `${i * 0.3}s`
        }}
      >
        <div className={`w-8 h-8 bg-gradient-to-br ${i % 2 === 0 ? 'from-amber-400 to-orange-500' : 'from-violet-400 to-purple-500'} ${i % 3 === 0 ? 'rounded-full' : 'rounded-lg'} shadow-lg`} /> {/* Smaller elements */}
      </div>
    ))
  ), [scrollY]);

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
      {/* Sophisticated Gradient Background - expanded black at top */}
      <div className="fixed inset-0 z-0 bg-black">
        {/* Base layer - deep red concentrated at bottom with expanded black at top */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,_#DC143C_0%,_#8B0000_15%,_#4A0E0E_30%,_#2B0808_50%,_#0D0404_70%)]"></div>
        
        {/* Secondary layer - enhance the black at top */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,_rgba(220,20,60,0.4)_0%,_rgba(139,0,0,0.2)_20%,_transparent_40%)]"></div>
        
        {/* Vignette effect - dark edges with stronger top darkness */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(13,4,4,0.9)_100%)]"></div>
        
        {/* Top darkening layer - expands black area at top */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#000000_0%,_transparent_30%)]"></div>
      </div>
      
      {/* Content container with higher z-index */}
      <div className="relative z-10">
        {/* <CustomCursor mousePosition={mousePosition} /> */}
        
        {/* Enhanced Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-400 via-red-600 to-red-900 bg-clip-text text-transparent">
              {t('brand')}
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('services')} className="hover:text-red-400 transition-colors cursor-pointer text-sm font-medium">
                {t('nav.services')}
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="hover:text-red-400 transition-colors cursor-pointer text-sm font-medium">
                {t('nav.portfolio')}
              </button>
              <button onClick={() => scrollToSection('about')} className="hover:text-red-400 transition-colors cursor-pointer text-sm font-medium">
                {t('nav.about')}
              </button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-red-400 transition-colors cursor-pointer text-sm font-medium">
                {t('nav.pricing')}
              </button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 py-2 cursor-pointer font-medium">
                    {t('nav.get_started')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-red-900/50 text-white backdrop-blur-xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      {t('contact.schedule_consultation')}
                    </DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </nav>

        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
          {/* Minimalist Background Elements */}
          <div className="absolute inset-0">
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-900/20 to-red-700/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-800/20 to-red-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-red-900/15 to-red-800/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Geometric Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {floatingElements}
          </div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-full border border-red-800/30 mb-12 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2 text-red-400" />
                <span className="text-sm font-medium">{t('hero.subtitle')}</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-light mb-8 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-red-100 via-red-200 to-red-100 bg-clip-text text-transparent font-extralight">
                  {t('hero.title1')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-400 via-red-600 to-red-800 bg-clip-text text-transparent font-bold">
                  {t('hero.title2')}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-red-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                {t('hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-12 py-4 text-lg group cursor-pointer font-medium">
                      {t('hero.btn_start')}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/90 border-red-900/50 text-white backdrop-blur-xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        {t('contact.schedule_consultation')}
                      </DialogTitle>
                    </DialogHeader>
                    <ContactForm />
                  </DialogContent>
                </Dialog>
                <Button onClick={() => scrollToSection('portfolio')} size="lg" variant="outline" className="border-red-800/30 text-red-200 hover:bg-red-900/20 px-12 py-4 text-lg group cursor-pointer font-medium">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {t('hero.btn_explore')}
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {statItems}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-red-400/60" />
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-red-100">{t('social_proof.heading')}</h2>
              <p className="text-red-200 text-lg">{t('social_proof.description')}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
              {['EnergoSun', 'PhotographySF', 'Tergi', 'Coolstack', 'PrimeDrive'].map((brand, index) => (
                <div key={index} className="text-center transform hover:scale-105 transition-transform">
                  <div className="text-2xl font-bold text-red-300/40 hover:text-red-300/60 transition-colors cursor-pointer">{brand}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServicesSection/>
        <PortfolioSection/>
        <AboutSection/>
        <PricingSection/>

        {/* Testimonials Section */}
        <section className="py-20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-red-100">{t('testimonials.heading')}</h2>
              <p className="text-red-200 text-lg">{t('testimonials.description')}</p>
            </div>

            <div className="relative max-w-3xl mx-auto">
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {testimonialItems}
                </CarouselContent>
                <CarouselPrevious className="-left-6 top-1/2 -translate-y-1/2 border-red-800/50 text-red-400 hover:bg-red-900/30" />
                <CarouselNext className="-right-6 top-1/2 -translate-y-1/2 border-red-800/50 text-red-400 hover:bg-red-900/30" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-900/20 to-red-950/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6 text-red-100">
              {t('cta.heading')}
            </h2>
            <p className="text-xl text-red-200 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white px-8 py-4 text-lg cursor-pointer">
                    {t('cta.btn_strategy')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-red-900/50 text-white backdrop-blur-xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      {t('contact.schedule_consultation')}
                    </DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="border-red-800/30 text-red-200 hover:bg-red-900/20 px-8 py-4 text-lg cursor-pointer" onClick={() => scrollToSection('portfolio')}>
                {t('cta.btn_portfolio')}
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-red-300">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-red-400" />
                {t('cta.benefits.presence')}
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-red-400" />
                {t('cta.benefits.contracts')}
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-red-400" />
                {t('cta.benefits.guarantee')}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-gradient-to-br from-black to-red-950/20 border-t border-red-900/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Brand Column */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-red-400 via-red-600 to-red-800 bg-clip-text text-transparent">
                    {t('brand')}
                  </div>
                  <div className="ml-4 w-1 h-8 bg-gradient-to-b from-red-500 to-red-700"></div>
                </div>
                <p className="text-red-200 mb-6 max-w-md text-lg">
                  {t('footer.description')}
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-5">
                  {['twitter', 'linkedin', 'dribbble', 'github'].map((platform) => (
                    <a 
                      key={platform}
                      href="#" 
                      className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-gradient-to-r from-red-600 to-red-800 transition-all duration-300"
                    >
                      <div className="bg-red-300/20 border-2 border-dashed rounded-xl w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Column */}
              <div>
                <h4 className="font-bold text-lg mb-6 pb-2 border-b border-red-900/50 text-red-100 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-red-400" />
                  {t('contactfoot.schedule_consultation')}
                </h4>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="bg-black/50 p-2 rounded-lg mr-4">
                      <Mail className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-red-300 text-sm">{t('contactfoot.email_label')}</p>
                      <a href="mailto:contact@folada.com" className="text-red-100 hover:text-red-400 transition-colors">
                        {t('contactfoot.email')}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-black/50 p-2 rounded-lg mr-4">
                      <MapPin className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-red-300 text-sm">{t('contactfoot.location_label')}</p>
                      <p className="text-red-100">{t('contactfoot.location')}</p>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4 bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-800/30 text-red-300 hover:from-red-800/30 hover:to-red-700/30 hover:text-red-100 transition-all">
                        {t('contactfoot.schedule_call')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border-red-900/50 text-white backdrop-blur-xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                          {t('contact.schedule_consultation')}
                        </DialogTitle>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="border-t border-red-900/30 my-10"></div>
            
            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-red-400 text-sm">
                {t('copyright', { year: new Date().getFullYear() })}
              </p>
              
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-red-500 hover:text-red-300 text-sm transition-colors">
                  {t('policy.privacy')}
                </a>
                <a href="#" className="text-red-500 hover:text-red-300 text-sm transition-colors">
                  {t('policy.terms')}
                </a>
                <a href="#" className="text-red-500 hover:text-red-300 text-sm transition-colors">
                  {t('policy.cookies')}
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
