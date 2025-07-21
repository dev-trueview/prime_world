import { useState, useCallback } from 'react';
import { X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { openWhatsApp, getWhatsAppMessage } from '../config/whatsapp';

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onEnquirySubmit?: () => void;
}

const EnquiryPopup = ({ isOpen, onClose, onEnquirySubmit }: EnquiryPopupProps) => {
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
      const baseMessage = getWhatsAppMessage('enquiry-popup');
      const personalizedMessage = `${baseMessage}

Name: ${formData.name.trim()}
Phone: ${sanitizedPhone}

Looking forward to hearing from you soon!`;
      
      // Use centralized WhatsApp function
      openWhatsApp(personalizedMessage);
      
      toast({
        title: "Enquiry Sent!",
        description: "We'll contact you shortly with exclusive offers.",
      });

      onEnquirySubmit?.();
      setFormData({ name: '', phone: '' });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, toast, onClose, onEnquirySubmit]);

  const handleClose = useCallback(() => {
    setFormData({ name: '', phone: '' });
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center mr-3">
              <Gift className="w-6 h-6 text-real-estate-navy" />
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-semibold text-gray-900">
                Exclusive Offer!
              </h3>
              <p className="text-sm text-gray-600">Limited time opportunity</p>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close offer popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-luxury-gradient rounded-2xl p-6 mb-6 text-real-estate-navy">
          <h4 className="font-playfair text-xl font-semibold mb-3">
            🎁 Special Launch Benefits
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-real-estate-navy rounded-full mr-3"></span>
              Instant Price Lock (Current Rates)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-real-estate-navy rounded-full mr-3"></span>
              Priority Floor Selection
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-real-estate-navy rounded-full mr-3"></span>
               Home Loan Assistance
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="popup-name" className="block text-sm font-medium text-gray-900 mb-1">
              Full Name
            </label>
            <Input
              id="popup-name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 text-gray-900 bg-gray-50 border-gray-300 rounded-xl focus:border-real-estate-gold focus:bg-white focus:ring-2 focus:ring-real-estate-gold/20"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="popup-phone" className="block text-sm font-medium text-gray-900 mb-1">
              Phone Number
            </label>
            <Input
              id="popup-phone"
              type="tel"
              name="phone"
              placeholder="Enter 10-digit mobile number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-4 text-gray-900 bg-gray-50 border-gray-300 rounded-xl focus:border-real-estate-gold focus:bg-white focus:ring-2 focus:ring-real-estate-gold/20"
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
            className="w-full bg-real-estate-navy hover:bg-real-estate-navy/90 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Claiming Offer...' : 'Claim Your Exclusive Offer'}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            ⏰ Early access comes with exclusive benefits   — limited-time interest rates on offer.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            🔒 Our team will contact you within 30 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnquiryPopup;
