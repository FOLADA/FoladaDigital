import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  Building, 
  MessageSquare, 
  Calculator,
  Sparkles,
  CheckCircle,
  X,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { sendCalculatorEmail } from '@/lib/emailjs';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  basePrice: number;
}

interface Question {
  id: string;
  text: string;
  type: 'radio' | 'checkbox' | 'range' | 'number' | 'text';
  options?: { label: string; value: number | string; priceModifier?: number }[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string;
  placeholder?: string;
  required?: boolean;
}

interface ServiceWithQuestions extends Service {
  questions: Question[];
}

const CalculatorPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Define services based on the existing services data
  const services: Service[] = [
    {
      id: 'web-development',
      title: 'ვებსაიტის დამზადება',
      description: 'შევქმნით თანამედროვე და მობილურ მოწყობილობებზე მორგებულ ვებსაიტს, რომელიც თქვენს ბიზნესს გამორჩეულად წარმოაჩენს და ვიზიტორებს კლიენტებად აქცევს',
      image: '/webdevelopmentservice.png',
      basePrice: 2000
    },
    {
      id: 'smm',
      title: 'სოც. გვერდების მართვა',
      description: 'ვმართავთ თქვენს ნაცვლად თქვენს ბრენდს ინტერნეტში – ვქმნით პოსტებს, ვმუშაობთ ვიზუალზე და ვზრუნავთ თქვენი გვერდების აუდიტორიის ზრდაზე',
      image: '/SMMservice.png',
      basePrice: 1500
    },
    {
      id: 'paid-ads',
      title: 'ფასიანი რეკლამები',
      description: 'ვმართავთ Facebook და Instagram რეკლამებს, ვაოპტიმიზირებთ და ვნერგავთ თქვენს ბიზნესში გაყიდვების სისტემას',
      image: '/PaidAds.png',
      basePrice: 1200
    },
    {
      id: 'ai-integration',
      title: 'AI ინტეგრაცია',
      description: 'ვნერგავთ ხელოვნურ ინტელექტს თქვენს პროცესებში, რათა დაზოგოთ დრო, ავტომატიზიროთ და გაზარდოთ გაყიდვები',
      image: '/AIintegrationservice.png',
      basePrice: 2500
    },
    {
      id: 'seo',
      title: 'SEO ოპტიმიზაცია',
      description: 'ვაუმჯობესებთ თქვენს ვებსაიტს საძიებო სისტემის ოპტიმიზაციით, რათა გამოჩნდეთ Google-ის შედეგების პირველ გვერდზე და მიიღოთ ორგანული ტრაფიკი უფასოდ',
      image: '/SEOService.png',
      basePrice: 1800
    },
    {
      id: 'graphic-design',
      title: 'გრაფიკული დიზაინი',
      description: 'ვქმნით კრეატიული, ორიგინალურ და პროფესიონალურ ვიზუალებს, რომლებიც თქვენს ბრენდს გამორჩეულს გახდის – ლოგო, ქავერი, პოსტები და სხვა',
      image: '/GraphicDesign.png',
      basePrice: 1000
    }
  ];

  // Define questions for each service
  const serviceQuestions: Record<string, Question[]> = {
    'web-development': [
      {
        id: 'complexity',
        text: 'რა ტიპის ვებსაიტი გინდათ?',
        type: 'radio',
        options: [
          { label: 'საინფორმაციო ვებსაიტი', value: 'basic', priceModifier: 0 },
          { label: 'ელ. კომერცია', value: 'ecommerce', priceModifier: 2000 },
          { label: 'კომპლექსური სისტემა', value: 'complex', priceModifier: 4000 }
        ]
      },
      {
        id: 'design',
        text: 'უნიკალური დიზაინი გსურთ?',
        type: 'radio',
        options: [
          { label: 'უკვე გვაქვს დიზაინი', value: 'existing', priceModifier: 0 },
          { label: 'არა, არ გვინდა', value: 'template', priceModifier: 300 },
          { label: 'კი, გვინდა', value: 'custom', priceModifier: 1000 }
        ]
      },
      {
        id: 'domain',
        text: 'გაქვთ თუ არა ნაყიდი დომეინი?',
        type: 'radio',
        options: [
          { label: 'კი', value: 'yes', priceModifier: 0 },
          { label: 'არა', value: 'no', priceModifier: 0 },
          { label: 'არ ვიცი', value: 'unknown', priceModifier: 0 }
        ]
      }
    ],
    'smm': [
      {
        id: 'platforms',
        text: 'რომელი სოც. გვერდების მართვა გსურთ?',
        type: 'checkbox',
        options: [
          { label: 'Facebook', value: 'facebook', priceModifier: 300 },
          { label: 'Instagram', value: 'instagram', priceModifier: 300 },
          { label: 'LinkedIn', value: 'linkedin', priceModifier: 300 },
          { label: 'TikTok', value: 'tiktok', priceModifier: 400 }
        ]
      },
      {
        id: 'posts-per-week',
        text: 'რამდენი პოსტი გსურთ კვირაში?',
        type: 'radio',
        options: [
          { label: '1-2 პოსტი', value: 'few', priceModifier: 0 },
          { label: '3-5 პოსტი', value: 'medium', priceModifier: 500 },
          { label: '6+ პოსტი', value: 'many', priceModifier: 1000 }
        ]
      },
      {
        id: 'content-creation',
        text: 'საჭიროა თუ არა პროფესიონალური კონტენტის შექმნა?',
        type: 'radio',
        options: [
          { label: 'მხოლოდ განთავსება', value: 'posting', priceModifier: 0 },
          { label: 'სრული მართვა (პოსტების დაწერა/დიზაინი)', value: 'full', priceModifier: 800 }
        ]
      }
    ],
    'paid-ads': [
      {
        id: 'platforms',
        text: 'რომელი სოც. გვერდების დარეკლამება გსურთ?',
        type: 'checkbox',
        options: [
          { label: 'Facebook', value: 'facebook', priceModifier: 200 },
          { label: 'Instagram', value: 'instagram', priceModifier: 200 },
          { label: 'Google', value: 'google', priceModifier: 300 },
          { label: 'TikTok', value: 'tiktok', priceModifier: 300 }
        ]
      },
      {
        id: 'budget',
        text: 'რა ბიუჯეტი გაქვთ?',
        type: 'radio',
        options: [
          { label: '100-500₾', value: 'small', priceModifier: 200 },
          { label: '500-1500₾', value: 'medium', priceModifier: 500 },
          { label: '1500₾+', value: 'large', priceModifier: 1000 }
        ]
      },
      {
        id: 'duration',
        text: 'რამდენ ხანს გსურთ რეკლამების გაშვება?',
        type: 'radio',
        options: [
          { label: '1 თვე', value: 'month', priceModifier: 0 },
          { label: '3 თვე', value: 'quarter', priceModifier: 300 },
          { label: '6 თვე ან მეტი', value: 'long', priceModifier: 800 }
        ]
      }
    ],
    'ai-integration': [
      {
        id: 'integration-type',
        text: 'რომელი სახის AI ინტეგრაცია გჭირდებათ?',
        type: 'radio',
        options: [
          { label: 'ჩატბოტი ვებსაიტზე', value: 'chatbot', priceModifier: 500 },
          { label: 'ავტომოპასუხე', value: 'content', priceModifier: 800 },
          { label: 'პროცესების ავტომატიზაცია', value: 'automation', priceModifier: 1500 }
        ]
      },
    ],
    'seo': [
      {
        id: 'website-size',
        text: 'რამდენი გვერდია თქვენს ვებსაიტზე?',
        type: 'radio',
        options: [
          { label: '1-10 გვერდი', value: 'small', priceModifier: 0 },
          { label: '11-50 გვერდი', value: 'medium', priceModifier: 500 },
          { label: '50+ გვერდი', value: 'large', priceModifier: 1200 }
        ]
      },
      {
        id: 'competitors',
        text: 'რამდენად მკაცრია კონკურენცია თქვენს სფეროში?',
        type: 'radio',
        options: [
          { label: 'დაბალი კონკურენცია', value: 'low', priceModifier: 0 },
          { label: 'საშუალო კონკურენცია', value: 'medium', priceModifier: 500 },
          { label: 'მაღალი კონკურენცია', value: 'high', priceModifier: 1000 }
        ]
      }
    ],
    'graphic-design': [
      {
        id: 'design-type',
        text: 'რომელი გჭირდებათ?',
        type: 'checkbox',
        options: [
          { label: 'ლოგო', value: 'logo', priceModifier: 200 },
          { label: 'ბრენდის სტილი', value: 'branding', priceModifier: 500 },
          { label: 'სოციალური ქსელის პოსტები', value: 'social', priceModifier: 150 },
          { label: 'ბანერები/რეკლამები', value: 'banners', priceModifier: 300 }
        ]
      },
    ]
  };

  // Combine services with their questions
  const servicesWithQuestions: ServiceWithQuestions[] = services.map(service => ({
    ...service,
    questions: serviceQuestions[service.id] || []
  }));

  // State management
  const [step, setStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceAnswers, setServiceAnswers] = useState<Record<string, Record<string, any>>>({});
  const [packageType, setPackageType] = useState<'individual' | 'unified'>('individual');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [consent, setConsent] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Log when submitSuccess changes
  useEffect(() => {
    console.log('submitSuccess changed to:', submitSuccess);
  }, [submitSuccess]);

  // Calculate total price whenever selections change
  useEffect(() => {
    let price = 0;
    let totalBasePrice = 0;
    
    // Calculate price for individual services
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        totalBasePrice += service.basePrice;
        price += service.basePrice;
        
        // Add price modifiers from answers
        const answers = serviceAnswers[serviceId] || {};
        const questions = serviceQuestions[serviceId] || [];
        
        questions.forEach(question => {
          const answer = answers[question.id];
          if (answer !== undefined) {
            if (question.type === 'checkbox' && Array.isArray(answer)) {
              // For checkbox, add price for each selected option
              answer.forEach(selectedValue => {
                const option = question.options?.find(opt => opt.value === selectedValue);
                if (option && option.priceModifier) {
                  price += option.priceModifier;
                }
              });
            } else if (question.type === 'radio' || question.type === 'range' || question.type === 'number') {
              // For radio, range, and number types
              if (question.options) {
                const option = question.options.find(opt => opt.value === answer);
                if (option && option.priceModifier) {
                  price += option.priceModifier;
                }
              }
            }
          }
        });
      }
    });
    
    // Apply discount for unified package
    if (packageType === 'unified' && selectedServices.length > 1) {
      const discountPercentage = Math.min(20, selectedServices.length * 3); // Up to 20% discount
      setDiscount(discountPercentage);
      price = price * (1 - discountPercentage / 100);
    } else {
      setDiscount(0);
    }
    
    setTotalPrice(price);
  }, [selectedServices, serviceAnswers, packageType, services]);

  // Handle service selection
  const toggleService = (serviceId: string) => {
    if (packageType === 'individual') {
      // For individual package, only allow one service selection
      if (selectedServices.includes(serviceId)) {
        setSelectedServices([]);
      } else {
        setSelectedServices([serviceId]);
      }
    } else {
      // For unified package, allow multiple selections
      setSelectedServices(prev => 
        prev.includes(serviceId) 
          ? prev.filter(id => id !== serviceId) 
          : [...prev, serviceId]
      );
    }
  };

  // Handle answer changes
  const handleAnswerChange = (serviceId: string, questionId: string, value: any) => {
    setServiceAnswers(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [questionId]: value
      }
    }));
  };

  // Navigation functions
  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Reset calculator
  const resetCalculator = () => {
    setStep(1);
    setSelectedServices([]);
    setServiceAnswers({});
    setPackageType('individual');
    setTotalPrice(0);
    setDiscount(0);
    setCurrentServiceIndex(0);
    setCurrentQuestionIndex(0);
    setContactInfo({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
    setConsent(false);
    setErrors({});
    setIsSubmitting(false);
    setSubmitSuccess(false);
  };

  // Handle contact info changes
  const handleContactChange = (field: string, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate contact form
  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!contactInfo.name.trim()) {
      newErrors.name = 'სახელი სავალდებულოა';
    }
    
    if (!contactInfo.email.trim()) {
      newErrors.email = 'ელ. ფოსტა სავალდებულოა';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      newErrors.email = 'გთხოვთ, შეიყვანოთ სწორი ელ. ფოსტა';
    }
    
    if (!contactInfo.phone.trim()) {
      newErrors.phone = 'ტელეფონის ნომერი სავალდებულოა';
    }
    
    if (!consent) {
      newErrors.consent = 'გთხოვთ, დაეთანხმოთ კონფიდენციალურობის პოლიტიკას';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format user answers for email
  const formatUserAnswers = () => {
    let answersText = '';
    
    // Add selected services
    answersText += 'შერჩეული სერვისები:\n';
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        answersText += `- ${service.title}\n`;
        
        // Add answers for this service
        const answers = serviceAnswers[serviceId];
        if (answers) {
          const serviceWithQuestions = servicesWithQuestions.find(s => s.id === serviceId);
          if (serviceWithQuestions) {
            serviceWithQuestions.questions.forEach(question => {
              const answer = answers[question.id];
              if (answer !== undefined) {
                answersText += `  ${question.text}: `;
                
                if (question.type === 'checkbox' && Array.isArray(answer)) {
                  // For checkbox, list all selected options
                  const selectedLabels = question.options
                    ?.filter(option => answer.includes(option.value))
                    .map(option => option.label) || [];
                  answersText += selectedLabels.join(', ') + '\n';
                } else {
                  // For radio, find the label of the selected option
                  const selectedOption = question.options?.find(option => option.value === answer);
                  answersText += (selectedOption?.label || answer) + '\n';
                }
              }
            });
          }
        }
        answersText += '\n';
      }
    });
    
    // Add package type
    answersText += `პაკეტის ტიპი: ${packageType === 'individual' ? 'ინდივიდუალური სერვისები' : 'გაერთიანებული პაკეტი'}\n`;
    
    // Add discount if applicable
    if (discount > 0) {
      answersText += `ფასდაკლება: ${discount}%\n`;
    }
    
    return answersText;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContactForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors
    
    // Set a timeout to prevent infinite loading state
    const timeoutId = setTimeout(() => {
      if (isSubmitting) {
        setErrors({ submit: 'გაგზავნა ვადაზე გადაცილებულია. გთხოვთ, შეამოწმოთ თქვენი ინტერნეტ კავშირი და სცადოთ ხელახლა.' });
        setIsSubmitting(false);
      }
    }, 15000); // 15 seconds timeout
    
    try {
      // Format user answers
      const answersText = formatUserAnswers();
      
      // Send email using EmailJS with answers included
      const result = await sendCalculatorEmail({
        ...contactInfo,
        answers: answersText
      });
      
      // Clear the timeout since we got a response
      clearTimeout(timeoutId);
      
      if (result.success) {
        console.log('Calculator form submitted:', contactInfo);
        console.log('Setting submitSuccess to true');
        setSubmitSuccess(true);
        console.log('submitSuccess state set to true');
        console.log('Current step:', step);
        // Make sure we're on the results step
        if (step !== 5) {
          console.log('Advancing to results step');
          setStep(5);
        }
      } else {
        console.error('Email sending failed:', result.error);
        setErrors({ submit: `დაფიქსირდა შეცდომა გაგზავნისას: ${result.error}. გთხოვთ, სცადოთ ხელახლა.` });
        setIsSubmitting(false);
      }
    } catch (error: any) {
      // Clear the timeout since we got a response
      clearTimeout(timeoutId);
      
      console.error('Failed to send email:', error);
      const errorMessage = error.message || error.toString() || 'უცნობი შეცდომა';
      setErrors({ submit: `დაფიქსირდა შეცდომა გაგზავნისას: ${errorMessage}. გთხოვთ, სცადოთ ხელახლა.` });
      setIsSubmitting(false);
    }
  };

  // Render welcome screen
  const renderWelcomeScreen = () => (
    <div className="max-w-3xl mx-auto text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          გამოთვალეთ ფასი
        </h1>
        <p className="text-xl text-gray-300 mb-8 font-copy">
          პასუხების გაცემით რამდენიმე კითხვაზე, მიიღებთ პერსონალიზებულ ფასს თქვენი პროექტისთვის
        </p>
        <Button 
          size="lg" 
          className="bg-red-600 hover:bg-red-700 text-white mx-5 px-8 py-6 text-xl rounded-full font-copy"
          onClick={nextStep}
        >
          დაწყება
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );

  // Render service selection step
  const renderServiceSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-copy">რით შეგვიძლია დაგეხმაროთ?</h2>
        <p className="text-xl text-gray-300 font-copy">
          აირჩიეთ სერვისები, რომლებიც გჭირდებათ
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-slate-800 rounded-full p-1 flex">
          <button
            className={`px-6 py-3 rounded-full transition-all font-copy ${
              packageType === 'individual'
                ? 'bg-red-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => {
              setPackageType('individual');
              // Clear selections when switching to individual package
              setSelectedServices([]);
            }}
          >
            ინდივიდუალური სერვისები
          </button>
          <button
            className={`px-6 py-3 rounded-full transition-all font-copy ${
              packageType === 'unified'
                ? 'bg-red-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setPackageType('unified')}
          >
            გაერთიანებული პაკეტი
          </button>
        </div>
      </div>

      {packageType === 'unified' && selectedServices.length > 1 && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 text-center mb-6">
          <h3 className="text-lg font-bold text-white mb-1 font-copy">უნიფიცირებული პაკეტი</h3>
          <p className="text-gray-300 text-sm font-copy">
            ყველა შერჩეული სერვისის კომბინირება და სპეციალური ფასდაკლება
            <span className="block text-lg font-bold mt-1 text-green-500">{discount}% ფასდაკლება</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesWithQuestions.map((service) => (
          <motion.div
            key={service.id}
            className={`rounded-2xl border-2 p-6 cursor-pointer transition-all h-full flex flex-col ${
              selectedServices.includes(service.id)
                ? 'border-red-500 bg-slate-800/50 shadow-lg shadow-red-500/20'
                : 'border-slate-700 bg-slate-900/50'
            }`}
            onClick={() => toggleService(service.id)}
          >
            <div className="flex items-start flex-grow">
              <div className="bg-slate-800 rounded-lg p-3 mr-4">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex-1 flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold mb-2 font-copy">{service.title}</h3>
                  {selectedServices.includes(service.id) && (
                    <Check className="text-red-500 w-6 h-6" />
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-3 font-copy flex-grow">{service.description}</p>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-400 font-copy">საწყისი ფასი: {service.basePrice}₾</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-xl rounded-full font-copy"
            onClick={nextStep}
          >
            შემდეგი კითხვა
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );

  // Render questionnaire step
  const renderQuestionnaire = () => {
    if (selectedServices.length === 0) return null;
    
    const currentServiceId = selectedServices[currentServiceIndex];
    const currentService = servicesWithQuestions.find(s => s.id === currentServiceId);
    
    if (!currentService) return null;
    
    const questions = currentService.questions;
    const currentQuestion = questions[currentQuestionIndex];
    
    if (!currentQuestion) return null;

    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-copy">{currentService.title}</h2>
          <p className="text-xl text-gray-300 font-copy">{currentQuestion.text}</p>
        </div>

        <Card className="bg-slate-900/50 border-slate-800 mb-8">
          <CardContent className="p-6">
            {currentQuestion.type === 'radio' && currentQuestion.options && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={`${currentQuestion.id}-${option.value}`}
                    className={`p-4 rounded-xl border-2 text-left transition-all font-copy ${
                      serviceAnswers[currentServiceId]?.[currentQuestion.id] === option.value
                        ? 'border-red-500 bg-red-900/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                    onClick={() => handleAnswerChange(currentServiceId, currentQuestion.id, option.value)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option.label}</span>
                      {option.priceModifier !== undefined && option.priceModifier !== 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {option.priceModifier > 0 ? '+' : ''}{option.priceModifier}₾
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {currentQuestion.type === 'checkbox' && currentQuestion.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <div 
                    key={`${currentQuestion.id}-${option.value}`}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all font-copy ${
                      serviceAnswers[currentServiceId]?.[currentQuestion.id]?.includes(option.value)
                        ? 'border-red-500 bg-red-900/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                    onClick={() => {
                      const currentAnswers = serviceAnswers[currentServiceId]?.[currentQuestion.id] || [];
                      const newAnswers = currentAnswers.includes(option.value)
                        ? currentAnswers.filter((v: string) => v !== option.value)
                        : [...currentAnswers, option.value];
                      handleAnswerChange(currentServiceId, currentQuestion.id, newAnswers);
                    }}
                  >
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      serviceAnswers[currentServiceId]?.[currentQuestion.id]?.includes(option.value)
                        ? 'border-red-500 bg-red-500'
                        : 'border-slate-500'
                    }`}>
                      {serviceAnswers[currentServiceId]?.[currentQuestion.id]?.includes(option.value) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="flex-1">{option.label}</span>
                    {option.priceModifier !== undefined && option.priceModifier !== 0 && (
                      <Badge variant="secondary">
                        {option.priceModifier > 0 ? '+' : ''}{option.priceModifier}₾
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {currentQuestion.type === 'range' && (
              <div className="space-y-6">
                <input
                  type="range"
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  step={currentQuestion.step}
                  value={serviceAnswers[currentServiceId]?.[currentQuestion.id] || currentQuestion.defaultValue || currentQuestion.min}
                  onChange={(e) => handleAnswerChange(currentServiceId, currentQuestion.id, Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{currentQuestion.min}</span>
                  <span className="text-lg font-bold text-white">
                    {serviceAnswers[currentServiceId]?.[currentQuestion.id] || currentQuestion.defaultValue || currentQuestion.min}
                  </span>
                  <span>{currentQuestion.max}</span>
                </div>
              </div>
            )}
            
            {currentQuestion.type === 'number' && (
              <div className="flex items-center">
                <Button
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 font-copy"
                  onClick={() => {
                    const currentValue = serviceAnswers[currentServiceId]?.[currentQuestion.id] || 0;
                    handleAnswerChange(currentServiceId, currentQuestion.id, Math.max(0, currentValue - 1));
                  }}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="0"
                  value={serviceAnswers[currentServiceId]?.[currentQuestion.id] || 0}
                  onChange={(e) => handleAnswerChange(currentServiceId, currentQuestion.id, Number(e.target.value))}
                  className="mx-2 text-center font-copy"
                />
                <Button
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 font-copy"
                  onClick={() => {
                    const currentValue = serviceAnswers[currentServiceId]?.[currentQuestion.id] || 0;
                    handleAnswerChange(currentServiceId, currentQuestion.id, currentValue + 1);
                  }}
                >
                  +
                </Button>
              </div>
            )}
            
            {currentQuestion.type === 'text' && (
              <Input
                type="text"
                placeholder={currentQuestion.placeholder || "შეიყვანეთ თქვენი პასუხი..."}
                value={serviceAnswers[currentServiceId]?.[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentServiceId, currentQuestion.id, e.target.value)}
                className="w-full font-copy"
              />
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <div className="text-lg font-medium font-copy">
            კითხვა {currentQuestionIndex + 1} / {questions.length}
          </div>
          
          <div className="flex gap-4">
            {currentQuestionIndex > 0 && (
              <Button 
                variant="outline" 
                className="border-slate-700 text-white hover:bg-slate-800 font-copy"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                უკან
              </Button>
            )}
            
            {currentQuestionIndex < questions.length - 1 ? (
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white font-copy"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              >
                შემდეგი კითხვა
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white font-copy"
                onClick={() => {
                  if (currentServiceIndex < selectedServices.length - 1) {
                    setCurrentServiceIndex(currentServiceIndex + 1);
                    setCurrentQuestionIndex(0);
                  } else {
                    nextStep();
                  }
                }}
              >
                {currentServiceIndex < selectedServices.length - 1 ? 'შემდეგი სერვისი' : 'შედეგების ნახვა'}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render contact information step
  const renderContactInfo = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-copy">დაგვიტოვეთ თქვენი კონტაქტი</h2>
        <p className="text-2xl text-gray-300 font-copy">
          რომ შევძლოთ თქვენთან დაკავშირება და უფრო დეტალურად განვიხილოთ თქვენი პროექტი
        </p>
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mt-8 inline-block">
          <h3 className="text-xl font-bold mb-2 font-copy">ფასი ხელმისაწვდომია ფორმის შევსების შემდეგ</h3>
          <div className="text-3xl font-bold text-gray-500">***</div>
        </div>
      </div>

      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-copy">სახელი და გვარი *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="თქვენი სრული სახელი"
                    value={contactInfo.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    className="pl-10 font-copy"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm font-copy">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-copy">ელ. ფოსტა *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={contactInfo.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="pl-10 font-copy"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm font-copy">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-lg font-copy">ტელეფონის ნომერი *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+995 XXX XXX XXX"
                    value={contactInfo.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="pl-10 font-copy"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm font-copy">{errors.phone}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-lg font-copy">კომპანია</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="კომპანიის დასახელება"
                    value={contactInfo.company}
                    onChange={(e) => handleContactChange('company', e.target.value)}
                    className="pl-10 font-copy"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-lg font-copy">დამატებითი ინფორმაცია</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  id="message"
                  placeholder="ინფორმაცია თქვენი პროექტის შესახებ სურვილისამებრ"
                  value={contactInfo.message}
                  onChange={(e) => handleContactChange('message', e.target.value)}
                  className="w-full min-h-[120px] bg-slate-800 border border-slate-700 rounded-md pl-10 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-copy"
                />
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => {
                  setConsent(checked as boolean);
                  if (checked && errors.consent) {
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.consent;
                      return newErrors;
                    });
                  }
                }}
                className="mt-1"
              />
              <Label htmlFor="consent" className="text-gray-300 font-copy">
                ვეთანხმები კონფიდენციალურობის პოლიტიკას და თანხმობას გაძლევთ ჩემი პერსონალური მონაცემების დამუშავებაზე
              </Label>
            </div>
            {errors.consent && <p className="text-red-500 text-sm font-copy">{errors.consent}</p>}
            
            {errors.submit && <p className="text-red-500 text-sm font-copy">{errors.submit}</p>}
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                className="border-slate-700 text-white hover:bg-slate-800 font-copy"
                onClick={prevStep}
                type="button"
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                უკან
              </Button>
              
              <Button 
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-full font-copy"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'იგზავნება...' : 'ფასის გაგება'}
                <Calculator className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  // Render results step
  const renderResults = () => (
    <div className="max-w-3xl mx-auto text-center">
      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-copy">გმადლობთ!</h2>
          <p className="text-xl text-gray-300 mb-8 font-copy">
            თქვენი ინფორმაცია წარმატებით გაიგზავნა. ჩვენი გუნდი დაგიკავშირდება 24 საათში.
          </p>
          <div className="bg-slate-800 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold mb-4 font-copy">თქვენი პროექტის დაახლოებითი ფასი</h3>
            <div className="text-5xl font-bold text-red-500 mb-2">{Math.round(totalPrice)}₾</div>
            {discount > 0 && (
              <p className="text-green-400 font-copy">
                ფასდაკლება: {discount}%
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-full font-copy"
              onClick={() => window.location.href = '#contact'}
            >
              დაჯავშნე შეხვედრა
            </Button>
            <Button 
              variant="outline" 
              className="border-slate-700 text-white hover:bg-slate-800 px-8 py-6 rounded-full font-copy"
              onClick={resetCalculator}
            >
              ახალი გამოთვლა
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold font-copy">თქვენი პროექტის ფასი</h2>
          <p className="text-xl text-gray-300 font-copy">
            ფასი ხელმისაწვდომია ფორმის შევსების შემდეგ
          </p>
          
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gray-500 mb-2">***</div>
                <p className="text-gray-400 font-copy">ფასი ხელმისაწვდომია ფორმის შევსების შემდეგ</p>
              </div>

              {discount > 0 && (
                <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-copy">ფასდაკლება ({discount}%)</span>
                    <span className="font-bold text-red-400">-{Math.round((totalPrice / (1 - discount/100)) * (discount/100))}₾</span>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold font-copy">შერჩეული სერვისები:</h3>
                <ul className="space-y-2">
                  {selectedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return service ? (
                      <li key={serviceId} className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="font-copy">{service.title}</span>
                        <span className="font-medium">{service.basePrice}₾</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>

              <div className="mt-8">
                <p className="text-gray-400 mb-4 font-copy">გსურთ განსაკუთრებული შეთავაზება?</p>
                <Button 
                  className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-full font-bold text-lg font-copy"
                  onClick={() => window.location.href = '#contact'}
                >
                  დაგვიკავშირდით პირდაპირ
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-slate-700 text-white hover:bg-slate-800 font-copy"
              onClick={resetCalculator}
            >
              ახალი გამოთვლა
            </Button>
            <Button 
              variant="outline" 
              className="border-slate-700 text-white hover:bg-slate-800 font-copy"
              onClick={prevStep}
            >
              <ChevronLeft className="mr-2 w-5 h-5" />
              უკან დაბრუნება
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  // Calculate progress percentage
  const calculateProgress = () => {
    if (step === 1) return 0;
    if (step === 2) return 20;
    if (step === 3) {
      if (selectedServices.length === 0) return 20;
      const serviceProgress = (currentServiceIndex / selectedServices.length) * 40;
      const questionProgress = (currentQuestionIndex / (servicesWithQuestions.find(s => s.id === selectedServices[currentServiceIndex])?.questions.length || 1)) * 40;
      return 20 + serviceProgress + questionProgress / selectedServices.length;
    }
    if (step === 4) return 80;
    if (step === 5) return 90;
    return 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            className="border-slate-700 text-white hover:bg-slate-800 font-copy"
            onClick={() => navigate('/')}
          >
            <Home className="mr-2 w-5 h-5" />
            მთავარი გვერდი
          </Button>
        </div>
        
        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -translate-y-1/2 -z-10"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-red-500 -translate-y-1/2 -z-10 transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
            
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  step >= stepNumber 
                    ? 'bg-red-500 border-red-500' 
                    : 'bg-slate-900 border-slate-700'
                }`}>
                  {step > stepNumber ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-lg font-bold">{stepNumber}</span>
                  )}
                </div>
                <span className="mt-2 text-sm font-medium hidden md:block font-copy">
                  {stepNumber === 1 && 'დაწყება'}
                  {stepNumber === 2 && 'სერვისები'}
                  {stepNumber === 3 && 'კითხვები'}
                  {stepNumber === 4 && 'კონტაქტი'}
                  {stepNumber === 5 && 'შედეგი'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && renderWelcomeScreen()}
            {step === 2 && renderServiceSelection()}
            {step === 3 && renderQuestionnaire()}
            {step === 4 && renderContactInfo()}
            {step === 5 && renderResults()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CalculatorPage;