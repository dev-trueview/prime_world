
export const WHATSAPP_CONFIG = {
  phoneNumber: '917620658446',
  baseUrl: 'https://wa.me',
} as const;

export const createWhatsAppUrl = (message: string): string => {
  return `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (message: string): void => {
  const url = createWhatsAppUrl(message);
  // Use window.location.href for direct navigation to avoid popup flicker
  window.location.href = url;
};

// Dynamic message templates based on origin
export const getWhatsAppMessage = (origin: string, additionalInfo?: string): string => {
  const baseMessages = {
    'hero-visit': `🏠 Site Visit Request - Pride World City

I would like to schedule a site visit to Pride World City. Please arrange a convenient time.

Source: Hero Section`,
    
    'hero-brochure': `📋 Brochure Request - Pride World City

Hello, I would like to download the Pride World City brochure. Please share the details.

Source: Hero Section`,
    
    'gallery-visit': `🖼️ Gallery Interest - Pride World City

I'm interested in Pride World City after viewing the gallery. Please arrange a site visit.

${additionalInfo ? `Interest: ${additionalInfo}` : ''}

Source: Gallery Section`,
    
    'enquiry-popup': `🎁 Exclusive Offer Enquiry - Pride World City

I'm interested in the exclusive launch offers for Pride World City. Please share details about:
• Current pricing and payment plans
• Available floor plans

Source: Enquiry Popup`,
    
    'whatsapp-float': `🏠 Quick Enquiry - Pride World City

I'm interested in Pride World City apartments. Please get in touch with details and pricing information.

Source: WhatsApp Float`,
    
    'contact-form': `📞 Contact Form Enquiry - Pride World City

I'm interested in Pride World City. Please contact me with more information.

Source: Contact Form`,
    
    'default': `🏠 Pride World City Enquiry

I'm interested in Pride World City. Please get in touch with details and pricing information.`
  };

  return baseMessages[origin as keyof typeof baseMessages] || baseMessages.default;
};
