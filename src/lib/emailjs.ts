import emailjs from '@emailjs/browser';

// Initialize EmailJS with your service ID, template ID, and public key
// You'll need to replace these with your actual EmailJS credentials
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

export interface EmailData {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  companyName?: string;
  phone: string;
  services?: string;
  message?: string;
  email?: string;
  company?: string;
  name?: string; // Add name property for calculator form
  answers?: string; // Add answers property for calculator form
}

export const sendConsultationEmail = async (data: EmailData) => {
  try {
    const templateParams = {
      to_name: "Folada Agency Team",
      from_name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Anonymous',
      business_name: data.businessName || 'Not provided',
      company_name: data.companyName || 'Not provided',
      phone: data.phone,
      services: data.services || 'Not selected',
      message: data.message || 'No additional message',
      reply_to: data.email || 'Not provided'
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    // Provide more detailed error information
    if (error && error.text) {
      return { success: false, error: error.text };
    }
    return { success: false, error: 'Unknown error occurred' };
  }
};

export const sendCalculatorEmail = async (data: EmailData) => {
  try {
    const templateParams = {
      to_name: "Folada Agency Team",
      from_name: data.name || 'Anonymous',
      phone: data.phone,
      email: data.email || 'Not provided',
      company: data.company || 'Not provided',
      message: data.message || 'No additional message',
      answers: data.answers || 'No answers provided',
      reply_to: data.email || 'Not provided'
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    // Provide more detailed error information
    if (error && error.text) {
      return { success: false, error: error.text };
    }
    return { success: false, error: 'Unknown error occurred' };
  }
};