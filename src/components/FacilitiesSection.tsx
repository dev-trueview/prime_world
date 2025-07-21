
import { Waves, Dumbbell, TreePine, Building2, Car, Shield, Wifi , Zap, Utensils, Users } from 'lucide-react';

const FacilitiesSection = () => {
  const premiumAmenities = [
    {
      icon: Waves,
      title: "Swimming Pool",
      description: "Temperature-controlled pool with kids' section and deck area"
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "Fully equipped gym with cardio and strength training equipment"
    },
    {
      icon: TreePine,
      title: "Landscaped Gardens",
      description: "Central courtyard with jogging track and meditation zone"
    },
    {
      icon: Building2,
      title: "Clubhouse",
      description: "Multi-purpose hall for events and community gatherings"
    },
    {
      icon: Car,
      title: "Covered Parking",
      description: "Dedicated parking spaces with 24/7 CCTV surveillance"
    },
    {
      icon: Shield,
      title: "24/7 Security",
      description: "Gated community with biometric access and security guards"
    },
    {
      icon: Building2,
      title: "Luxury mall ",
      description: "Luxury mall with branded stores and entertainment options"  
    },
    {
      icon: Zap,
      title: "Power Backup",
      description: "100% power backup for lifts, common areas, and emergency lighting"
    },
    {
      icon: Utensils,
      title: "Food Court",
      description: "On-site restaurants and café for convenience"
    }
  ];

  return (
    <section id="facilities" className="py-20 bg-gradient-to-b from-real-estate-champagne/20 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-real-estate-navy mb-4">
            World-Class <span className="luxury-text-gradient">Amenities</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience resort-style living with premium facilities designed for your comfort and convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumAmenities.map((amenity, index) => (
            <div 
              key={index}
              className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift animate-scale-in border border-real-estate-platinum/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-luxury-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <amenity.icon className="w-8 h-8 text-real-estate-navy" />
              </div>
              
              <h3 className="font-playfair text-xl font-semibold text-real-estate-navy mb-3">
                {amenity.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm">
                {amenity.description}
              </p>

              <div className="mt-4 w-12 h-1 bg-luxury-gradient rounded-full group-hover:w-20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Additional Lifestyle Amenities */}
        <div className="mt-16">
          <div className="bg-real-estate-navy rounded-3xl p-8 md:p-12">
            <h3 className="font-playfair text-3xl font-bold text-white mb-8 text-center">
              Lifestyle Amenities
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-real-estate-platinum">
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl mb-3">🎯</span>
                <span className="text-sm">Kids Play Area</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl mb-3">🏃</span>
                <span className="text-sm">Jogging Track</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl mb-3">🧘</span>
                <span className="text-sm">Yoga Deck</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl mb-3">🎮</span>
                <span className="text-sm">Indoor Games</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl mb-3">📚</span>
                <span className="text-sm">Library</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl mb-3">🚌</span>
                <span className="text-sm">Gov bus Service</span>
              </div>
            </div>

            {/* Amenity Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-real-estate-gold mb-2">40+</div>
                <div className="text-real-estate-platinum text-sm">Premium Amenities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-real-estate-gold mb-2">40%</div>
                <div className="text-real-estate-platinum text-sm">Green Space</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-real-estate-gold mb-2">24/7</div>
                <div className="text-real-estate-platinum text-sm">Security</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
