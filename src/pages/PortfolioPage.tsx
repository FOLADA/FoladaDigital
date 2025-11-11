import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid, List, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Portfolio items data
  const portfolioItems = [
    {
      id: 1,
      image: "/works/aphoria.png",
      title: "Aphoria Luxury Brand",
      description: "Modern e-commerce website for luxury brand with immersive product experiences",
      category: "web-design",
      client: "Aphoria",
      year: "2024",
      technologies: ["React", "Three.js", "GSAP"]
    },
    {
      id: 2,
      image: "/works/beerumuseum.png",
      title: "Beerru Museum",
      description: "Interactive museum experience with virtual tours and educational content",
      category: "web-development",
      client: "Beerru Museum",
      year: "2023",
      technologies: ["Next.js", "WebGL", "Node.js"]
    },
    {
      id: 3,
      image: "/works/coldemailerai.png",
      title: "Cold Emailer AI",
      description: "AI-powered email marketing platform with personalized content generation",
      category: "ai-integration",
      client: "TechStart",
      year: "2024",
      technologies: ["React", "Python", "OpenAI"]
    },
    {
      id: 4,
      image: "/works/energosunge.png",
      title: "EnergoSun GE",
      description: "Renewable energy company website with solar calculator and dashboard",
      category: "web-design",
      client: "EnergoSun",
      year: "2023",
      technologies: ["Vue.js", "D3.js", "Firebase"]
    },
    {
      id: 5,
      image: "/works/shushabanditseretelze.png",
      title: "Shusha Band",
      description: "Music band promotional website with streaming integration and tour dates",
      category: "branding",
      client: "Shusha Band",
      year: "2024",
      technologies: ["Svelte", "Web Audio API", "Stripe"]
    },
    {
      id: 6,
      image: "/works/tergiuni.png",
      title: "Tergi Uni",
      description: "University educational platform with course management and student portal",
      category: "web-development",
      client: "Tergi University",
      year: "2023",
      technologies: ["Angular", "NestJS", "MongoDB"]
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'ყველა ნამუშევრი' },
    { id: 'web-design', name: 'ვებ დიზაინი' },
    { id: 'web-development', name: 'ვებ განვითარება' },
    { id: 'ai-integration', name: 'AI ინტეგრაცია' },
    { id: 'branding', name: 'ბრენდინგი' }
  ];

  // Filter portfolio items based on category and search query
  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-black py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-300 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              უკან დაბრუნება
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[rgb(255,0,0)] to-[rgb(255,0,0)] bg-clip-text text-transparent">
              ჩვენი ნამუშევრები
            </h1>
            <p className="text-xl text-slate-400 font-copy max-w-3xl">
              გაეცანით ჩვენს უახლეს პროექტებს და გადახედეთ ჩვენს გამოცდილებას სხვადასხვა სფეროში
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-copy text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="ძებნა..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-copy pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full md:w-64"
              />
            </div>
            
            <div className="flex gap-1 bg-slate-800 rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full ${
                  viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full ${
                  viewMode === 'list' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-400">ვერ მოიძებნა ნამუშევრები მითითებული პარამეტრებით</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-8"
            }
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={item}
                className={`relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-lg transition-all duration-300 hover:border-red-500 ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
                style={{
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.1) inset',
                }}
              >
                <div className={`overflow-hidden relative ${viewMode === 'list' ? 'md:w-1/2' : ''}`}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className={`p-6 ${viewMode === 'list' ? 'md:w-1/2' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {item.year}
                    </span>
                  </div>
                  
                  <p className="text-[15px] text-slate-300 font-copy leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-copy text-slate-400 mb-1">კლიენტი: <span className="text-white">{item.client}</span></p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="w-full font-bold font-copy bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
                    დეტალურად ნახვა
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;