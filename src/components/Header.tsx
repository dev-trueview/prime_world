
import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset to account for fixed header
      const headerOffset = 80; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* RERA Information Banner */}
      <div className="bg-real-estate-navy text-white py-1 px-6 text-center text-xs">
        <span className="font-medium">RERA Information:</span> P52100056325
      </div>
      
      <header 
        className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-morphism backdrop-blur-lg shadow-lg' 
            : 'bg-transparent'
        }`}
        style={{ height: '80px' }} // Fixed height for consistent spacing
      >
        <div className="container mx-auto px-6 py-4 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center p-1 hover:scale-110 transition-transform duration-300">
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
                <span className="text-real-estate-navy font-bold text-lg hidden">P</span>
              </div>
              <div>
                <h1 className="font-playfair font-bold text-xl text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] filter drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.3)' }}>Pride World City</h1>
                <p className="text-white/90 text-xs drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Premium Properties by TrueView Realty</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('gallery')} className="text-white hover:text-real-estate-gold transition-colors font-medium drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Gallery</button>
              <button onClick={() => scrollToSection('pricing')} className="text-white hover:text-real-estate-gold transition-colors font-medium drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Pricing</button>
              <button onClick={() => scrollToSection('facilities')} className="text-white hover:text-real-estate-gold transition-colors font-medium drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Amenities</button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-real-estate-gold transition-colors font-medium drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Contact</button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
