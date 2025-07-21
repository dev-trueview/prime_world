import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  onEnquirySubmit?: () => void;
}

const ContactSection = ({ onEnquirySubmit }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const sanitizePhoneNumber = (phone: string) => {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    
    // If it starts with +91 or 91, remove it
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      cleaned = cleaned.substring(2);
    }
    
    return cleaned;
  };

  const validatePhoneNumber = (phone: string) => {
    const sanitized = sanitizePhoneNumber(phone);
    return sanitized.length === 10 && /^[6-9]\d{9}$/.test(sanitized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number.",
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
      // Create WhatsApp message
      const message = `🏠 Pride World City Enquiry
      
Name: ${formData.name}
Phone: ${sanitizedPhone}
${formData.email ? `Email: ${formData.email}` : ''}
${formData.message ? `Message: ${formData.message}` : 'Interested in learning more about Pride World City.'}

Please contact me with details and arrange a site visit.`;
      
      const whatsappUrl = `https://wa.me/917620658446?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Enquiry Sent Successfully!",
        description: "Our team will contact you within 10 minutes.",
      });

      // Mark enquiry as submitted
      onEnquirySubmit?.();

      // Reset form
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-real-estate-navy/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-real-estate-navy mb-4">
              Ready to Make <span className="luxury-text-gradient">Pride World City</span> Your Home?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with our expert team for personalized assistance and exclusive offers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Enhanced Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-real-estate-platinum/20">
              <h3 className="font-playfair text-2xl font-semibold text-real-estate-navy mb-6">
                📞 Book Your Site Visit
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-real-estate-navy font-medium mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 text-real-estate-navy bg-gray-50 border-2 border-real-estate-platinum/50 rounded-xl focus:border-real-estate-gold focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-real-estate-navy font-medium mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-4 text-real-estate-navy bg-gray-50 border-2 border-real-estate-platinum/50 rounded-xl focus:border-real-estate-gold focus:bg-white transition-all duration-300"
                    required
                    maxLength={13}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter 10-digit Indian mobile number (6/7/8/9 series)
                  </p>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-real-estate-navy font-medium mb-2">
                    Email Address (Optional)
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 text-real-estate-navy bg-gray-50 border-2 border-real-estate-platinum/50 rounded-xl focus:border-real-estate-gold focus:bg-white transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-real-estate-navy font-medium mb-2">
                    Message (Optional)
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Any specific requirements or questions about Pride World City?"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-4 text-real-estate-navy bg-gray-50 border-2 border-real-estate-platinum/50 rounded-xl focus:border-real-estate-gold focus:bg-white transition-all duration-300 min-h-[100px] resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-luxury-gradient text-real-estate-navy hover:bg-real-estate-gold text-lg py-4 rounded-xl font-semibold hover-lift transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : '📱 Send Enquiry via WhatsApp'}
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 Your information is secure and will only be used to contact you about Pride World City
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-real-estate-navy rounded-3xl p-8 text-white">
                <h3 className="font-playfair text-2xl font-semibold mb-6">
                  📞 Get In Touch
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-real-estate-navy font-bold text-lg">📱</span>
                    </div>
                    <div>
                      <p className="text-real-estate-platinum text-sm">Call us directly</p>
                      <a href="tel:+917620658446" className="font-semibold text-lg hover:text-real-estate-gold transition-colors">
                        +91 7620658446
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-real-estate-navy font-bold text-lg">📧</span>
                    </div>
                    <div>
                      <p className="text-real-estate-platinum text-sm">Email us</p>
                      <a href="mailto:info@trueviewrealty.com" className="font-semibold hover:text-real-estate-gold transition-colors">
                        trueviewrealty.in@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-real-estate-navy font-bold text-lg">📍</span>
                    </div>
                    <div>
                      <p className="text-real-estate-platinum text-sm">Visit our sales office</p>
                      <p className="font-semibold">Pride World City Sales Office</p>
                      <p className="text-sm text-real-estate-platinum">Open Daily: 10 AM - 8 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exclusive Launch Offers */}
              <div className="bg-luxury-gradient rounded-3xl p-8 text-real-estate-navy">
                <h4 className="font-playfair text-xl font-semibold mb-4">
                  🎁 Exclusive Launch Benefits
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-real-estate-navy rounded-full mr-3"></span>
                    Early Bird Pricing (Limited Time)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-real-estate-navy rounded-full mr-3"></span>
                    Home Loan Assistance
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-real-estate-navy rounded-full mr-3"></span>
                    Flexible Payment Plans Available
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-real-estate-navy rounded-full mr-3"></span>
                    Special Gifts for spot bookings
                  </li>
                </ul>
                
                <div className="mt-4 p-3 bg-real-estate-navy/10 rounded-xl">
                  <p className="text-xs font-semibold">⏰ Early access comes with exclusive benefits — limited-time interest rates on offer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
