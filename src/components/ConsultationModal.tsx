import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Phone, 
  Building,
} from 'lucide-react';
import { sendConsultationEmail } from '@/lib/emailjs';

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
}

// Define available services
const SERVICES = [
  { id: 'web-development', label: 'ვებსაიტის დამზადება' },
  { id: 'smm', label: 'სოც. გვერდების მართვა' },
  { id: 'paid-ads', label: 'ფასიანი რეკლამები' },
  { id: 'ai-integration', label: 'AI ინტეგრაცია' },
  { id: 'seo', label: 'SEO ოპტიმიზაცია' },
  { id: 'graphic-design', label: 'გრაფიკული დიზაინი' }
];

const ConsultationModal: React.FC<ConsultationModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    companyName: '',
    phone: '',
    services: '', // Changed to single service selection
    email: '',
    message: ''
  });
  
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      services: value
    }));
    
    // Clear error when user selects a service
    if (errors.services) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.services;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'სახელი სავალდებულოა';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'გვარი სავალდებულოა';
    }
    
    if (!formData.services) {
      newErrors.services = 'აირჩიეთ სერვისი';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'ტელეფონის ნომერი სავალდებულოა';
    }
    
    if (!consent) {
      newErrors.consent = 'გთხოვთ, დაეთანხმოთ კონფიდენციალურობის პოლიტიკას';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const result = await sendConsultationEmail(formData);
      
      if (result.success) {
        console.log('Consultation form submitted:', formData);
        setSubmitSuccess(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            businessName: '',
            companyName: '',
            phone: '',
            services: '',
            email: '',
            message: ''
          });
          setConsent(false);
          setSubmitSuccess(false);
          onClose();
        }, 3000);
      } else {
        setErrors({ submit: 'დაფიქსირდა შეცდომა გაგზავნისას. გთხოვთ, სცადოთ ხელახლა.' });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      setErrors({ submit: 'დაფიქსირდა შეცდომა გაგზავნისას. გთხოვთ, სცადოთ ხელახლა.' });
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form state when closing
    setFormData({
      firstName: '',
      lastName: '',
      businessName: '',
      companyName: '',
      phone: '',
      services: '',
      email: '',
      message: ''
    });
    setConsent(false);
    setErrors({});
    setSubmitSuccess(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            უფასო კონსულტაცია
          </DialogTitle>
        </DialogHeader>
        
        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-copy">გმადლობთ!</h3>
            <p className="text-gray-300 font-copy">
              თქვენი მოთხოვნა წარმატებით გაიგზავნა. ჩვენი გუნდი დაგიკავშირდება 24 საათში.
            </p>
            <p className="text-gray-400 text-sm mt-4 font-copy">
              ფანჯარა დაიხურება ავტომატურად...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-lg font-copy text-white">სახელი *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <Input
                      id="firstName"
                      placeholder="შეიყვანეთ თქვენი სახელი"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500 font-copy"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-sm font-copy">{errors.firstName}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="services" className="text-lg font-copy text-white">რა სერვისებით ხართ დაინტერესებული? *</Label>
                <Select onValueChange={handleServiceChange} value={formData.services}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white font-copy">
                    <SelectValue placeholder="აირჩიეთ სერვისი" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {SERVICES.map(service => (
                      <SelectItem 
                        key={service.id} 
                        value={service.id}
                        className="font-copy text-white hover:bg-slate-700"
                      >
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.services && <p className="text-red-500 text-sm font-copy">{errors.services}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-lg font-copy text-white">რა ბიზნესი გაქვთ</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <Input
                    id="businessName"
                    placeholder="შეიყვანეთ თქვენი ბიზნესის ტიპი"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500 font-copy"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-lg font-copy text-white">თქვენი ტელ. ნომერი *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="შეიყვანეთ თქვენი ტელეფონის ნომერი"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500 font-copy"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm font-copy">{errors.phone}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-lg font-copy text-white">დამატებითი ინფორმაცია</Label>
                <textarea
                  id="message"
                  placeholder="გვიყევით თქვენი პროექტის შესახებ, მიზნებს და სპეციფიკურ მოთხოვნებს..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full min-h-[100px] bg-slate-800 border border-slate-700 rounded-md pl-3 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-copy"
                />
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
                  className="mt-1 border-slate-700 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <Label htmlFor="consent" className="text-gray-300 font-copy text-sm">
                  ვეთანხმები კონფიდენციალურობის პოლიტიკას და თანხმობას გაძლევთ ჩემი პერსონალური მონაცემების დამუშავებაზე
                </Label>
              </div>
              {errors.consent && <p className="text-red-500 text-sm font-copy">{errors.consent}</p>}
              
              {errors.submit && <p className="text-red-500 text-sm font-copy">{errors.submit}</p>}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-slate-700 text-white hover:bg-slate-800 font-copy py-6"
                disabled={isSubmitting}
              >
                გაუქმება
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-copy py-6 flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    იგზავნება...
                  </>
                ) : (
                  'კონსულტაციის მიღება'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;