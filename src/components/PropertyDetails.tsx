
import { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Heart, 
  Share2, 
  ArrowLeft, 
  Info, 
  Users, 
  Wifi, 
  UtensilsCrossed, 
  ShowerHead, 
  Car, 
  Phone, 
  Mail, 
  Clock,
  Tv,
  BookOpen,
  Ruler,
  HandCoins,
  Building,
  Bed,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export interface PropertyDetailsProps {
  id: string;
  name: string;
  description: string;
  location: string;
  distance: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  badges: string[];
  amenities: Array<{
    category: string;
    items: string[];
  }>;
  rules: string[];
  landlord: {
    name: string;
    photo: string;
    responseTime: string;
    phone: string;
    email: string;
  };
  roomDetails: {
    type: string;
    size: string;
    occupancy: string;
    furnished: boolean;
  };
}

const PropertyDetails = ({
  id,
  name,
  description,
  location,
  distance,
  price,
  rating,
  reviews,
  images,
  badges,
  amenities,
  rules,
  landlord,
  roomDetails,
}: PropertyDetailsProps) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const amenityIcons: Record<string, JSX.Element> = {
    wifi: <Wifi className="h-5 w-5" />,
    meals: <UtensilsCrossed className="h-5 w-5" />,
    bathroom: <ShowerHead className="h-5 w-5" />,
    parking: <Car className="h-5 w-5" />,
    tv: <Tv className="h-5 w-5" />,
    study: <BookOpen className="h-5 w-5" />,
    roommates: <Users className="h-5 w-5" />,
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4 -ml-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to results
      </Button>

      {/* Property Name */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">{name}</h1>
          <div className="flex items-center flex-wrap gap-2">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
              <span className="mx-2">•</span>
              <span>{distance} from campus</span>
            </div>
            <div className="flex items-center bg-primary/10 text-primary rounded-md px-2 py-1">
              <Star className="h-4 w-4 fill-primary mr-1" />
              <span className="font-medium">{rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground ml-1">({reviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={cn("h-4 w-4", isLiked ? "fill-red-500 text-red-500" : "")} />
            {isLiked ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative rounded-xl overflow-hidden mb-8 bg-muted">
        <div className="aspect-[16/9] relative">
          <img
            src={images[currentImageIndex]}
            alt={`${name} - image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {/* Image Navigation */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={handlePreviousImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge 
                key={badge} 
                className="capitalize bg-background/80 backdrop-blur-sm hover:bg-background/90"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex overflow-x-auto py-2 px-1 gap-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition duration-200",
                index === currentImageIndex ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
              )}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Price and Room Quick Facts */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 p-5 rounded-xl glass-card">
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-lg font-medium mb-1">Price</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold">${price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Includes utilities and maintenance</p>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-lg font-medium mb-1">Room</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{roomDetails.type}</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{roomDetails.size}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{roomDetails.occupancy}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{roomDetails.furnished ? "Furnished" : "Unfurnished"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for Details, Amenities, Rules */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="rules">House Rules</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="animate-fade-in">
              <div className="prose prose-sm max-w-none">
                <p className="text-balance leading-relaxed">{description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="amenities" className="animate-fade-in">
              <div className="space-y-6">
                {amenities.map(category => (
                  <div key={category.category}>
                    <h3 className="text-lg font-medium mb-3">{category.category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.items.map(item => (
                        <div 
                          key={item} 
                          className="flex items-center p-3 rounded-lg bg-secondary/50"
                        >
                          {amenityIcons[item.toLowerCase()] || <Info className="h-5 w-5" />}
                          <span className="ml-2">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="rules" className="animate-fade-in">
              <div className="space-y-4">
                <ul className="space-y-3">
                  {rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Contact and Booking */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="p-5 rounded-xl glass-card">
            <h3 className="text-lg font-medium mb-4">Property Manager</h3>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={landlord.photo} 
                alt={landlord.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">{landlord.name}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Responds in {landlord.responseTime}</span>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={`tel:${landlord.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {landlord.phone}
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={`mailto:${landlord.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  {landlord.email}
                </a>
              </Button>
              <Button className="w-full">Book a viewing</Button>
            </div>
          </div>

          {/* Payment Details */}
          <div className="p-5 rounded-xl glass-card">
            <h3 className="text-lg font-medium mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly rent</span>
                <span className="font-medium">${price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Security deposit</span>
                <span className="font-medium">${price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Application fee</span>
                <span className="font-medium">$50</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Move-in cost</span>
                <span className="font-semibold">${price * 2 + 50}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/compare?add=${id}`}>
                  <HandCoins className="h-4 w-4 mr-2" />
                  Add to comparison
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
