
import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
import PricingSection from '../components/PricingSection';
import FacilitiesSection from '../components/FacilitiesSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';
import WhatsAppFloat from '../components/WhatsAppFloat';
import EnquiryPopup from '../components/EnquiryPopup';
import Footer from '../components/Footer';
import { useEnquirySubmission } from '../hooks/useEnquirySubmission';
import Meta from '../components/Meta';

const Index = () => {
  const [showEnquiryPopup, setShowEnquiryPopup] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { hasSubmittedEnquiry, markEnquirySubmitted } = useEnquirySubmission();

  useEffect(() => {
    setIsPageLoaded(true);
    
    const interval = setInterval(() => {
      if (isPageLoaded && !hasSubmittedEnquiry) {
        setShowEnquiryPopup(true);
      }
    }, 30000); // Changed from 120000 (2 minutes) to 30000 (30 seconds)

    return () => clearInterval(interval);
  }, [isPageLoaded, hasSubmittedEnquiry]);

  const handleEnquirySubmit = () => {
    markEnquirySubmitted();
    setShowEnquiryPopup(false);
  };

  return (
    <>
      <Meta title="Prime World Spark - Home" description="Welcome to Prime World Spark. Discover premium amenities, facilities, and more." />
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <GallerySection />
        {/* Add proper spacing for sections */}
        <div id="pricing" style={{ paddingTop: '80px' }}>
          <PricingSection />
        </div>
        <div id="facilities" style={{ paddingTop: '80px' }}>
          <FacilitiesSection />
        </div>
        <div id="contact" style={{ paddingTop: '80px' }}>
          <ContactSection onEnquirySubmit={markEnquirySubmitted} />
        </div>
        <Footer />
        <WhatsAppFloat onEnquirySubmit={markEnquirySubmitted} />
        {isPageLoaded && !hasSubmittedEnquiry && (
          <EnquiryPopup 
            isOpen={showEnquiryPopup} 
            onClose={() => setShowEnquiryPopup(false)}
            onEnquirySubmit={handleEnquirySubmit}
          />
        )}
      </div>
    </>
  );
};

export default Index;
