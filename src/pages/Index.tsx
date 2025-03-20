import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Star, BookOpen, Coffee, Users, Building, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { cn } from '@/lib/utils';

// Sample property data with Indian context
const featuredProperties = [
  {
    id: '1',
    name: 'Sharma Residence Hall',
    location: 'North Campus, Delhi University',
    distance: '0.3 km',
    price: 12500,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    badges: ['popular', 'new'],
    amenities: ['wifi', 'meals', 'coffee']
  },
  {
    id: '2',
    name: 'Laxmi Nagar PG',
    location: 'East Delhi, Near IP University',
    distance: '0.5 km',
    price: 9500,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    badges: ['verified'],
    amenities: ['wifi', 'roommates']
  },
  {
    id: '3',
    name: 'IIT Bombay Campus Lodge',
    location: 'Powai, Mumbai',
    distance: '0.2 km',
    price: 14000,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
    badges: ['top rated'],
    amenities: ['wifi', 'coffee', 'meals']
  }
];

const featureData = [
  {
    icon: <MapPin className="h-8 w-8" />,
    title: 'Location-Based Search',
    description: 'Find PGs based on their proximity to your college or university across India.'
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Verified Reviews',
    description: 'Read authentic reviews from students who have lived in the accommodations.'
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Detailed Information',
    description: 'Get comprehensive details about amenities, rules, and pricing.'
  },
  {
    icon: <Coffee className="h-8 w-8" />,
    title: 'Amenities Filter',
    description: 'Filter PGs based on amenities like AC, geyser, food options, and more.'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Roommate Matching',
    description: 'Find compatible roommates based on preferences and lifestyle.'
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: 'Property Comparison',
    description: 'Compare multiple PGs side by side to make informed decisions.'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    navigate(`/explore?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8 lg:px-12 hero-section overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <Badge className="mb-4 animate-fade-in" variant="outline">
              Student Living Made Simple
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight animate-fade-in">
              Find Your Perfect College <span className="text-gradient">Accommodation</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 mx-auto max-w-2xl text-balance animate-fade-in">
              Discover and compare student-friendly PGs near your campus with verified reviews, 
              amenities, and direct connections to property owners.
            </p>
          </div>

          <div className="animate-fade-in-up">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in">
            <Badge variant="secondary" className="text-xs">10,000+ Listings</Badge>
            <Badge variant="secondary" className="text-xs">5,000+ Reviews</Badge>
            <Badge variant="secondary" className="text-xs">500+ Campuses</Badge>
            <Badge variant="secondary" className="text-xs">Trusted by 50,000+ Students</Badge>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Featured Accommodations</h2>
              <p className="text-muted-foreground mt-1">
                Handpicked properties near popular campuses
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/explore')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                className="animate-fade-in"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent opacity-70"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Our Features</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Everything You Need for Student Housing
            </h2>
            <p className="text-muted-foreground text-balance">
              CozyCollege provides all the tools and information you need to make informed decisions 
              about your student accommodation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featureData.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "glass-card p-6 rounded-xl hover:shadow-md transition-all duration-300",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              How CozyCollege Works
            </h2>
            <p className="text-muted-foreground text-balance">
              Finding your ideal student accommodation is just a few clicks away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {[
              {
                step: '01',
                title: 'Search',
                description: 'Enter your college name or location to find nearby accommodations.'
              },
              {
                step: '02',
                title: 'Compare',
                description: 'Browse properties, read reviews, and compare amenities and prices.'
              },
              {
                step: '03',
                title: 'Connect',
                description: 'Contact property owners directly or book a viewing through our platform.'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center text-2xl font-semibold mb-6">
                  {item.step}
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 border-t-2 border-dashed border-border" />
                )}
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-in">
            <Shield className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Ready to Find Your Perfect Student Accommodation?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-3xl mx-auto text-balance">
              Join thousands of students who have found their ideal living space through CozyCollege.
              Start your search today and make your college experience unforgettable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => navigate('/explore')}
              >
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent hover:bg-primary-foreground/10 text-primary-foreground"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
