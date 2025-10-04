import { memo, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Globe2,
  Code2,
  Smartphone,
  BarChart3,
  PenTool,
  Type,
  MessageCircle,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";
import { useTranslation } from 'react-i18next';

// Memoized TiltCard component to prevent unnecessary re-renders
const TiltCard = memo(({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 1], [4, -4]); // Reduced tilt effect for better performance
  const rotateY = useTransform(x, [0, 1], [-4, 4]); // Reduced tilt effect for better performance

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={(e) => {
        // Throttle mouse move events for better performance
        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => {
            const bounds = e.currentTarget.getBoundingClientRect();
            const px = (e.clientX - bounds.left) / bounds.width;
            const py = (e.clientY - bounds.top) / bounds.height;
            x.set(px);
            y.set(py);
          }, { timeout: 100 });
        } else {
          // Fallback for browsers that don't support requestIdleCallback
          const bounds = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - bounds.left) / bounds.width;
          const py = (e.clientY - bounds.top) / bounds.height;
          x.set(px);
          y.set(py);
        }
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
});

TiltCard.displayName = "TiltCard";

// Memoized ServiceCard component
const ServiceCard = memo(({ 
  service, 
  index, 
  icons, 
  gradients,
  t
}: { 
  service: { title: string; description: string }; 
  index: number; 
  icons: JSX.Element[];
  gradients: string[];
  t: (key: string) => string;
}) => {
  // Function to get icon by index (cycles through if more services than icons)
  const getIcon = (index: number) => {
    return icons[index % icons.length];
  };

  // Function to get gradient by index (cycles through if more services than gradients)
  const getGradient = (index: number) => {
    return gradients[index % gradients.length];
  };

  return (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }} // Trigger animation earlier
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }} // Faster animations
      className={`relative ${index % 2 === 0 ? "md:-mt-3" : "md:mt-3"}`} // Reduced vertical offset
    >
      <TiltCard>
        <Card className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-slate-700/50 hover:border-amber-500/50 rounded-2xl shadow-xl group transform transition-transform duration-300">
          <div
            aria-hidden
            className={`pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl z-0`} // Reduced blur and opacity for better performance
          />
          <CardContent className="relative p-8 z-10"> {/* Reduced padding */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getGradient(index)} flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`} // Smaller icon container
            >
              {getIcon(index)}
            </div>
            <h3 className="text-xl font-light mb-3 text-white group-hover:text-amber-400 transition-colors"> {/* Smaller text */}
              {service.title}
            </h3>
            <p className="text-gray-400 mb-5 leading-relaxed text-sm"> {/* Smaller text */}
              {service.description}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center text-amber-400 group-hover:text-orange-400 font-medium text-sm"> {/* Smaller text */}
                  <span className="mr-2">{t('servicesSection.discoverMore')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border border-slate-700 text-white max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
                    {service.title}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-slate-300 mb-8">{service.description}</p>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </TiltCard>
    </motion.div>
  );
});

ServiceCard.displayName = "ServiceCard";

export default function ServicesSection() {
  const { t, i18n } = useTranslation();
  
  // Get translated services
  let translatedServices = t('servicesSection.services', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;
  
  // Fallback to English if translation is missing or empty
  if (!Array.isArray(translatedServices) || translatedServices.length === 0) {
    translatedServices = i18n.getResource('en', 'translation', 'servicesSection.services') || [];
  }
  
  // Memoize icons and gradients arrays
  const icons = useMemo(() => [
    <Code2 className="w-7 h-7 text-white" />, // Web Development
    <Smartphone className="w-7 h-7 text-white" />, // Mobile Apps
    <MessageCircle className="w-7 h-7 text-white" />, // AI Automations
    <Globe2 className="w-7 h-7 text-white" />, // SMM
  ], []);
  
  const gradients = useMemo(() => [
    "from-violet-600 to-purple-700",
    "from-indigo-500 to-blue-600",
    "from-cyan-500 to-blue-600",
    "from-amber-400 to-orange-500",
  ], []);

  return (
    <section
      id="services"
      className="py-32 bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {t('servicesSection.heading')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            {t('servicesSection.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 relative z-10">
          {translatedServices.map((service, index) => (
            <ServiceCard 
              key={service.title}
              service={service}
              index={index}
              icons={icons}
              gradients={gradients}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}