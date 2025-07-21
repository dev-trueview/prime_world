
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-real-estate-navy text-white py-8 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-luxury-gradient rounded-full flex items-center justify-center p-1">
                <img 
                  src="/logo.jpg" 
                  alt="Pride World City Logo" 
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="text-real-estate-navy font-bold text-sm hidden">P</span>
              </div>
              <div>
                <h3 className="font-playfair font-bold text-lg">Pride World City</h3>
                <p className="text-white/80 text-sm">Premium Properties by TrueView Realty</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Experience luxury living at its finest with world-class amenities and premium location.
            </p>
          </div>

          {/* RERA Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-real-estate-gold">RERA Information</h4>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <p className="text-white font-mono text-lg tracking-wider">P52100056325</p>
              <p className="text-white/70 text-xs mt-2">Real Estate Regulatory Authority Registration</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-real-estate-gold">Contact Information</h4>
            <div className="space-y-2 text-sm text-white/80">
              <p>📍 Premium Location, Pride World City</p>
              <p>📞 Contact for Site Visit</p>
              <p>✉️ Get Brochure via WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Pride World City by TrueView Realty. All rights reserved. | RERA: P52100056325
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
