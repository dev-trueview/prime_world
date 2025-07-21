import { useState, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { openWhatsApp, getWhatsAppMessage } from '../config/whatsapp';

interface WhatsAppFloatProps {
  onEnquirySubmit?: () => void;
}

const WhatsAppFloat = ({ onEnquirySubmit }: WhatsAppFloatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const sanitizePhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      cleaned = cleaned.substring(2);
    }
    return cleaned;
  };

  const validatePhoneNumber = (phone: string) => {
    const sanitized = sanitizePhoneNumber(phone);
    return sanitized.length === 10 && /^[6-9]\d{9}$/.test(sanitized);
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both name and phone number.",
        variant: "destructive"
      });
      return;
    }

    const sanitizedPhone = sanitizePhoneNumber(formData.phone);
    
    if (!validatePhoneNumber(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create WhatsApp message with personal details
      const baseMessage = getWhatsAppMessage('whatsapp-float');
      const personalizedMessage = `${baseMessage}

Name: ${formData.name.trim()}
Phone: ${sanitizedPhone}`;
      
      // Use centralized WhatsApp function
      openWhatsApp(personalizedMessage);
      
      toast({
        title: "Message Sent!",
        description: "We'll contact you shortly.",
      });

      onEnquirySubmit?.();
      setFormData({ name: '', phone: '' });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, toast, onEnquirySubmit]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setFormData({ name: '', phone: '' });
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpen}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500/30"
          aria-label="Open WhatsApp enquiry form"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>

      {/* WhatsApp Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-gray-900">
                    Quick Enquiry
                  </h3>
                  <p className="text-sm text-gray-600">Get instant assistance via WhatsApp</p>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Close enquiry form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="whatsapp-name" className="block text-sm font-medium text-gray-900 mb-1">
                  Full Name
                </label>
                <Input
                  id="whatsapp-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 text-gray-900 bg-gray-50 border-gray-300 rounded-xl focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="whatsapp-phone" className="block text-sm font-medium text-gray-900 mb-1">
                  Phone Number
                </label>
                <Input
                  id="whatsapp-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 text-gray-900 bg-gray-50 border-gray-300 rounded-xl focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20"
                  required
                  disabled={isSubmitting}
                  maxLength={13}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter 10-digit Indian mobile number (6/7/8/9 series)
                </p>
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message on WhatsApp'}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 We'll respond within minutes during business hours (9 AM - 8 PM)
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppFloat;
