import { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, Users, Zap, Target, BarChart3, Globe, CheckCircle, Quote, ChevronDown, Sparkles, Award, TrendingUp, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/ContactForm';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '500%', label: 'Average ROI Increase', icon: <TrendingUp className="w-5 h-5" /> },
    { number: '28+', label: 'Websites Delivered', icon: <Globe className="w-5 h-5" /> },
    { number: '72H', label: 'Project Launch Time', icon: <Zap className="w-5 h-5" /> },
    { number: '99.2%', label: 'Client Satisfaction', icon: <Award className="w-5 h-5" /> }
  ];

  const services = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: '3D Interactive Websites',
      description: 'Cutting-edge 3D websites that captivate and convert visitors',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Modern Web Design',
      description: 'Responsive, fast-loading websites with stunning visual appeal',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'E-commerce Solutions',
      description: 'Complete online stores with advanced functionality',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Custom Development',
      description: 'Tailored web applications with unique features',
      gradient: 'from-emerald-500 via-green-500 to-lime-500'
    }
  ];

  const testimonials = [
    {
      quote: "Folada created an absolutely stunning photography website for us. The 3D gallery effects and smooth animations have impressed every client. Our booking rate increased by 300% since launch!",
      author: "Alex Turner",
      role: "Professional Photographer",
      website: "photographysf.com",
      href:"https://photography-sf.vercel.app",
      rating: 5
    },
    {
      quote: "The website Folada built is a starter startup. If anyone sees it and it's not working, the problem isn't by Folada, but me :DD. I didn;t have enought resources to make it as I wanted, but they did their best to make it look good. I am very happy with the result.",
      author: "Saba Foladashvili",
      role: "Startuper",
      website: "tergi.ge",
      href:"https://tergi-for-generations.vercel.app",
      rating: 5
    }
  ];


  const portfolioItems = [
    {
      title: "3D Photography Showcase",
      description: "Interactive 3D gallery with stunning visual effects and seamless navigation",
      url: "https://photography-sf.vercel.app/",
      category: "Photography",
      features: ["3D Gallery", "Interactive UI", "Mobile Optimized"],
      image: "/photography.png"
    },
    {
      title: "Education Platform",
      description: "Modern website honoring family legacy with interactive storytelling elements",
      url: "https://tergi-for-generations.vercel.app/",
      category: "Startup",
      features: ["Interactive Stories", "Heritage Design", "Modern UX"],
      image: "/tergi.png"
    },
    {
      title: "Movie Catalog Platform",
      description: "High-performance online movie catalog with advanced search and filtering",
      url: "https://movixgeo.netlify.app/",
      category: "Entertainment",
      features: ["Advanced Search", "High Performance", "Responsive Design"],
      image: "/movix.png"
    },
    {
      title: "Sun Panels Platform",
      description: "Interactive platform for solar panel solutions with modern design and user-friendly interface",
      url: "https://energosun.ge/",
      category: "Energy",
      features: ["Interactive Solutions", "Modern Design", "User-Friendly"],
      image: "/energosun.png"
    },
    {
      title: "Car Rental Service",
      description: "Dynamic car rental platform with vehicle previews and booking system",
      url: "https://primesdrive.vercel.app/",
      category: "Transportation",
      features: ["Dynamic Booking", "Vehicle Previews", "User-Friendly"],
      image: "/primedrive.png"
    },
    {
      title: "Hotel Website",
      description: "Dynamic hotel booking platform with room previews and booking system",
      url: "https://clever-kashata-ae744e.netlify.app/",
      category: "Hospitality",
      features: ["Dynamic Booking", "Room Previews", "User-Friendly"],
      image: "/hotel.png"
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white overflow-x-hidden cursor-none">
      <CustomCursor mousePosition={mousePosition} />
      
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
            Folada
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="hover:text-amber-400 transition-colors cursor-pointer text-sm font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-amber-400 transition-colors cursor-pointer text-sm font-medium">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-amber-400 transition-colors cursor-pointer text-sm font-medium">
              About
            </button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-amber-400 transition-colors cursor-pointer text-sm font-medium">
              Pricing
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 cursor-pointer font-medium">
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Contact Folada
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Geometric Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10 hover:opacity-20 transition-opacity duration-1000"
              style={{
                left: `${15 + (i * 10)}%`,
                top: `${20 + (i * 8)}%`,
                transform: `translateY(${Math.sin(scrollY * 0.002 + i) * 30}px) rotate(${i * 45}deg)`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${i % 2 === 0 ? 'from-amber-400 to-orange-500' : 'from-violet-400 to-purple-500'} ${i % 3 === 0 ? 'rounded-full' : 'rounded-lg'} shadow-xl`} />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full border border-amber-400/20 mb-12 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
              <span className="text-sm font-medium">Crafting Digital Masterpieces</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-light mb-8 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent font-extralight">
                Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent font-bold">
                Luxury
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              We craft bespoke digital experiences that 
              <span className="text-amber-400 font-medium"> transcend expectations</span>, 
              blending artistry with cutting-edge technology
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-12 py-4 text-lg group cursor-pointer font-medium">
                    Begin Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      Start Your Project
                    </DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              <Button onClick={() => scrollToSection('portfolio')} size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-12 py-4 text-lg group cursor-pointer font-medium">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Explore Our Work
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="flex items-center justify-center mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-light bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-amber-400/60" />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Forward-Thinking Businesses</h2>
            <p className="text-slate-400 text-lg">Join the elite circle of brands we've elevated with 3D web experiences</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {['EnergoSun', 'PhotographySF', 'Tergi', 'Coolstack', 'PrimeDrive'].map((brand, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-white/40 hover:text-white/60 transition-colors cursor-pointer">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Our Craft
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Precision-engineered solutions that elevate your digital presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="bg-slate-900/40 border-slate-700/50 hover:border-amber-500/30 transition-all duration-500 group cursor-pointer backdrop-blur-sm">
                <CardContent className="p-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-white group-hover:text-amber-400 transition-colors">{service.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex items-center text-amber-400 group-hover:text-orange-400 cursor-pointer font-medium">
                        <span className="mr-2">Discover More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-700 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                          {service.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div>
                        <p className="text-slate-300">{service.description}</p>
                        <ContactForm />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Section with Image Previews */}
      <section id="portfolio" className="py-32 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light mb-6">
              <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                Featured Work
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-light">
              Discover our latest digital masterpieces
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {portfolioItems.map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border-slate-700/50 overflow-hidden group cursor-pointer transform hover:scale-[1.02] transition-all duration-500 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden">
                    {/* Portfolio Image Preview */}
                    <div className="absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                        <span className="text-sm font-medium text-white/90">{item.category}</span>
                      </div>
                      <h3 className="text-2xl font-light text-white mb-2">{item.title}</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {item.features.map((feature, i) => (
                          <span key={i} className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white/80">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-light mb-3 text-white group-hover:text-amber-400 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{item.description}</p>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-amber-400 hover:text-orange-400 transition-colors font-medium"
                    >
                      View Live Project
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Folada</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              We are a cutting-edge web development agency specializing in 3D interactive websites and modern web experiences. 
              Our team combines creativity with technical expertise to deliver websites that not only look amazing but also perform exceptionally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-slate-400">Pushing the boundaries of web technology with 3D elements and interactive features</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Precision</h3>
                <p className="text-slate-400">Every pixel, animation, and interaction is carefully crafted for maximum impact</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                <p className="text-slate-400">Creating websites that work seamlessly across all devices and platforms</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* New Pricing Section */}
<section id="pricing" className="py-32 bg-gradient-to-b from-slate-900/50 to-slate-950">
  <div className="container mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-light mb-6">
        <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Pricing Packages
        </span>
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
        Choose the perfect solution for your online presence
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Static Package */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Static Package</h3>
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              650₾
            </div>
            <p className="text-slate-400 mt-4">
              Perfect for personal brands or small businesses that need a simple, clean, and professional online presence.
            </p>
          </div>
          
          <div className="mb-8">
            <h4 className="font-bold text-lg text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-amber-400 mr-2" />
              What's Included:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Up to 5 beautifully designed pages</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Fully responsive layout</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Fast-loading pages</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Option for three languages</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Simple contact form or booking system</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Basic Google visibility setup (Basic SEO)</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Website published and ready to go live</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg mb-6">
            <p className="text-slate-400 italic">
              Note: Content updates require an update request and an extra fee
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Static Package - 650₾
                </DialogTitle>
              </DialogHeader>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Dynamic Package */}
      <div className="bg-gradient-to-br from-amber-900/20 to-amber-800/30 border border-amber-500/50 rounded-xl overflow-hidden relative">
        <div className="absolute mt-7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold">
          MOST POPULAR
        </div>
        
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl mt-4 font-bold text-white mb-2">Dynamic Package</h3>
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              900₾
            </div>
            <p className="text-slate-400 mt-4">
              Great for businesses that want flexibility and control over their website content.
            </p>
          </div>
          
          <div className="mb-8">
            <h4 className="font-bold text-lg text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-amber-400 mr-2" />
              What's Included:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Everything in Static Package, plus:</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Content management system (CMS)</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Up to 8 pages + blog</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Interactive design elements</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Option for five languages</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Google Analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Advanced Google visibility setup (Advanced SEO)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-amber-900/20 p-4 rounded-lg mb-6">
            <p className="text-amber-200">
              Make content updates anytime without technical help
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Dynamic Package - 900₾
                </DialogTitle>
              </DialogHeader>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Super Package */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Super Package</h3>
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              2000₾
            </div>
            <p className="text-slate-400 mt-4">
              For businesses that want a standout, high-performance website with advanced features.
            </p>
          </div>
          
          <div className="mb-8">
            <h4 className="font-bold text-lg text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-amber-400 mr-2" />
              What's Included:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Everything in Dynamic Package, plus:</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Custom design tailored to your brand</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Online store setup (up to 10 products)</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Booking/appointment system</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Email marketing integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Performance & security optimization</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">One-on-one training</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">•</span>
                <span className="text-slate-300">Three months free support</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-lg mb-6">
            <p className="text-amber-400 font-medium">
              Perfect solution to attract more customers and build a strong online presence
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Get Premium Website
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Super Package - 2000₾
                </DialogTitle>
              </DialogHeader>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>

   <div className="text-center mt-16">
  <p className="text-slate-400 max-w-3xl mx-auto text-lg">
    Have special requirements? 
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-amber-400 mr-1 hover:text-orange-400 underline ml-1 cursor-pointer">
          Contact us 
        </button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Contact Folada
          </DialogTitle>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
     for a custom quote tailored to your business needs.
  </p>
</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-slate-400 text-lg">Real results from our 3D website projects</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-400 mb-4" />
                  <p className="text-slate-300 mb-6 text-lg italic">{testimonial.quote}</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-slate-400">{testimonial.role}</div>
                    <div className="text-blue-400 text-sm mt-1">{testimonial.website}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Wow</span> Your Audience?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's create a 3D website that sets you apart from the competition and drives real results
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 text-lg cursor-pointer">
                  Get Free Strategy Session
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Get Your Free Strategy Session
                  </DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg cursor-pointer" onClick={() => scrollToSection('portfolio')}>
              View Our Portfolio
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Skyrocket your online presence
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Contracts depended on your needs
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Satisfaction Guarantee
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    <footer className="py-16 bg-gradient-to-br from-slate-900 to-slate-950 border-t border-slate-800">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {/* Brand Column */}
      <div className="lg:col-span-2">
        <div className="flex items-center mb-6">
          <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
            Folada
          </div>
          <div className="ml-4 w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-600"></div>
        </div>
        <p className="text-slate-400 mb-6 max-w-md text-lg">
          Creating immersive 3D web experiences that captivate audiences and drive measurable results.
        </p>
        
        {/* Social Links */}
        <div className="flex space-x-5">
          {['twitter', 'linkedin', 'dribbble', 'github'].map((platform) => (
            <a 
              key={platform}
              href="#" 
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
            >
              <div className="bg-gray-300 border-2 border-dashed rounded-xl w-6 h-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Services Column */}
      <div>
        <h4 className="font-bold text-lg mb-6 pb-2 border-b border-slate-800/50 text-white flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-amber-400" />
          Services
        </h4>
        <div className="space-y-4">
          {services.slice(0, 4).map((service, index) => (
            <a 
              key={index}
              href="#services"
              className="block text-slate-400 hover:text-amber-400 transition-colors group"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {service.title}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Column */}
      <div>
        <h4 className="font-bold text-lg mb-6 pb-2 border-b border-slate-800/50 text-white flex items-center">
          <Zap className="w-5 h-5 mr-2 text-amber-400" />
          Get in Touch
        </h4>
        <div className="space-y-5">
          <div className="flex items-start">
            <div className="bg-slate-800 p-2 rounded-lg mr-4">
              <Mail className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Email us</p>
              <a href="mailto:contact@folada.com" className="text-white hover:text-amber-400 transition-colors">
                contact@folada.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-slate-800 p-2 rounded-lg mr-4">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Based in</p>
              <p className="text-white">Tbilisi, Georgia</p>
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 hover:from-amber-500/20 hover:to-orange-500/20 hover:text-white transition-all">
                Schedule a Call
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Schedule a Consultation
                </DialogTitle>
              </DialogHeader>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
    
    {/* Divider */}
    <div className="border-t border-slate-800/50 my-10"></div>
    
    {/* Bottom Row */}
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Folada. All rights reserved.
      </p>
      
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
          Terms of Service
        </a>
        <a href="#" className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
          Cookies
        </a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Index;