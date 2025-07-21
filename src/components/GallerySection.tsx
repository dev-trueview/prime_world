import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { openWhatsApp, getWhatsAppMessage } from '../config/whatsapp';

interface PropertyImage {
  url: string;
  alt: string;
}

interface PropertyCard {
  id: number;
  images: PropertyImage[];
  title: string;
  description: string;
  category: string;
}

const GallerySection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupCard, setPopupCard] = useState<PropertyCard | null>(null);
  const [popupImageIndex, setPopupImageIndex] = useState(0);

  const propertyImages: PropertyCard[] = [
    {
      id: 1,
      images: [
        { url: '/interior.jpg', alt: "Modern Living Room" },
        { url: '/interior1.jpg', alt: "Luxury Bedroom" },
        { url: '/interior2.jpg', alt: "Designer Kitchen" },
        { url: '/interior3.jpg', alt: "Premium Bathroom" },
        { url: '/interior4.jpg', alt: "Elegant Dining Area" }
      ],
      title: "Luxury Living Spaces",
      description: "Spacious 2 & 3 BHK apartments with premium interiors",
      category: "Interior"
    },
    {
      id: 2,
      images: [
        { url: '/architecture.jpg', alt: "Modern Architecture" },
        { url: '/architecture1.jpg', alt: "Contemporary Design" }
      ],
      title: "Modern Architecture",
      description: "Contemporary design with earthquake-resistant structure",
      category: "Architecture"
    },
    {
      id: 3,
      images: [
        { url: '/exterior.jpg', alt: "Tower Complex View" },
        { url: '/exterior.jpg', alt: "Building Facade" }
      ],
      title: "Premium Tower Complex",
      description: "G+20 floors with high-speed elevators",
      category: "Exterior"
    },
    {
      id: 4,
      images: [
        { url: '/amenities.jpg', alt: "Rooftop Pool" },
        { url: '/amenities1.jpg', alt: "Tennis Court" },
        { url: '/amenities2.jpg', alt: "Cricket Pitch" }
      ],
      title: "Rooftop Amenities",
      description: "Premium amenities like a swimming pool, tennis court, and cricket pitch and many more.",
      category: "Amenities"
    },
    {
      id: 5,
      images: [
        { url: '/entrance.jpg', alt: "Grand Entrance" },
        { url: '/entrance1.jpg', alt: "Lobby Area" }
      ],
      title: "Grand Entrance",
      description: "Impressive lobby with 24/7 security",
      category: "Entrance"
    },
    {
      id: 6,
      images: [
        { url: '/landscape.jpg', alt: "Garden Landscape" }
      ],
      title: "Landscaped Gardens",
      description: "Central courtyard with walking paths and seating",
      category: "Landscape"
    }
  ];

  const handleCardHover = (cardId: number) => {
    setHoveredCard(cardId);
    setHoveredImageIndex(0);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
    setHoveredImageIndex(0);
  };

  const navigateHoverImage = (cardId: number, direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation();
    const card = propertyImages.find(c => c.id === cardId);
    if (!card || card.images.length <= 1) return;

    setHoveredImageIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % card.images.length;
      } else {
        return prev === 0 ? card.images.length - 1 : prev - 1;
      }
    });
  };

  const openPopup = (card: PropertyCard, imageIndex = 0) => {
    setPopupCard(card);
    setPopupImageIndex(imageIndex);
    setPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupCard(null);
    setPopupImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const navigatePopupImage = (direction: 'prev' | 'next') => {
    if (!popupCard) return;

    setPopupImageIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % popupCard.images.length;
      } else {
        return prev === 0 ? popupCard.images.length - 1 : prev - 1;
      }
    });
  };

  const handleSiteVisit = (cardTitle?: string) => {
    const message = getWhatsAppMessage('gallery-visit', cardTitle);
    openWhatsApp(message);
  };

  return (
    <>
      <section id="gallery" className="py-20 bg-gradient-to-b from-white to-real-estate-champagne/20" style={{ paddingTop: '100px' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-real-estate-navy mb-4">
              Experience <span className="luxury-text-gradient">Pride World City</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover thoughtfully designed spaces that blend modern architecture with premium amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertyImages.map((card, index) => {
              const currentImageIndex = hoveredCard === card.id ? hoveredImageIndex : 0;
              const currentImage = card.images[currentImageIndex];
              
              return (
                <div 
                  key={card.id} 
                  className="group relative overflow-hidden rounded-2xl hover-lift animate-scale-in bg-white shadow-lg cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => handleCardHover(card.id)}
                  onMouseLeave={handleCardLeave}
                  onClick={() => openPopup(card, currentImageIndex)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={currentImage.url} 
                      alt={currentImage.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      key={`${card.id}-${currentImageIndex}`}
                    />
                    
                    {hoveredCard === card.id && card.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => navigateHoverImage(card.id, 'prev', e)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="w-4 h-4 text-real-estate-navy" />
                        </button>
                        <button
                          onClick={(e) => navigateHoverImage(card.id, 'next', e)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="w-4 h-4 text-real-estate-navy" />
                        </button>
                      </>
                    )}

                    {card.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1">
                        {card.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === currentImageIndex
                                ? 'bg-white scale-125'
                                : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-real-estate-navy text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {card.category}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-real-estate-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-playfair text-xl font-semibold mb-2">{card.title}</h3>
                      <p className="text-sm text-real-estate-platinum">{card.description}</p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-luxury-gradient text-real-estate-navy px-3 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-real-estate-navy mb-2">2000+</div>
              <div className="text-gray-600">Premium Apartments</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-real-estate-navy mb-2">20+</div>
              <div className="text-gray-600">Floors</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-real-estate-navy mb-2">400</div>
              <div className="text-gray-600">Acres Land</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => handleSiteVisit()}
              className="bg-real-estate-navy text-white px-8 py-3 rounded-full font-semibold hover-lift"
            >
              Schedule Site Visit
            </button>
          </div>
        </div>
      </section>

      {popupOpen && popupCard && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-full">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="relative">
              <img
                src={popupCard.images[popupImageIndex].url}
                alt={popupCard.images[popupImageIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                key={`popup-${popupCard.id}-${popupImageIndex}`}
              />

              {popupCard.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigatePopupImage('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors duration-300"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => navigatePopupImage('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors duration-300"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 text-center text-white">
              <h3 className="font-playfair text-2xl font-semibold mb-2">{popupCard.title}</h3>
              <p className="text-lg text-gray-300">{popupCard.description}</p>
              {popupCard.images.length > 1 && (
                <p className="text-sm text-gray-400 mt-2">
                  {popupImageIndex + 1} of {popupCard.images.length}
                </p>
              )}
            </div>

            {popupCard.images.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
                {popupCard.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPopupImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      idx === popupImageIndex
                        ? 'border-white scale-110'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
