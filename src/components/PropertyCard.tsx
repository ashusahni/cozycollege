
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Heart, Users, Wifi, Coffee, UtensilsCrossed, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  distance: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badges: string[];
  amenities: string[];
  className?: string;
}

const PropertyCard = ({
  id,
  name,
  location,
  distance,
  price,
  rating,
  reviews,
  image,
  badges,
  amenities,
  className,
}: PropertyCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  // Map of amenity names to icons
  const amenityIcons: Record<string, JSX.Element> = {
    wifi: <Wifi className="h-4 w-4" />,
    meals: <UtensilsCrossed className="h-4 w-4" />,
    coffee: <Coffee className="h-4 w-4" />,
    roommates: <Users className="h-4 w-4" />,
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300 border border-border/50 hover:border-border hover:shadow-md bg-card",
        className
      )}
    >
      {/* Card Header - Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        <img
          src={image}
          alt={name}
          className={cn(
            "h-full w-full object-cover transition-all duration-700",
            isImageLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
            "group-hover:scale-105"
          )}
          onLoad={() => setIsImageLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Like Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-foreground shadow-sm hover:bg-white transition-all duration-200 z-10"
        >
          <Heart className={cn("h-5 w-5 transition-colors duration-200", isLiked ? "fill-red-500 text-red-500" : "")} />
        </button>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {badges.map((badge) => (
            <Badge 
              key={badge} 
              className="capitalize bg-white/80 backdrop-blur-sm text-foreground hover:bg-white/90"
            >
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{location}</span>
              <span className="mx-2">•</span>
              <span>{distance} from campus</span>
            </div>
          </div>
          <div className="flex items-center bg-primary/10 text-primary rounded-md px-2 py-1">
            <Star className="h-3.5 w-3.5 fill-primary mr-1" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-3 my-3">
          {amenities.map((amenity) => (
            <div 
              key={amenity} 
              className="flex items-center text-sm text-muted-foreground bg-secondary/50 rounded-md px-2 py-1"
            >
              {amenityIcons[amenity.toLowerCase()] || null}
              <span className="ml-1 capitalize">{amenity}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-xl font-semibold">${price}</span>
            <span className="text-muted-foreground ml-1">/month</span>
          </div>
          <Button asChild size="sm" className="gap-1">
            <Link to={`/property/${id}`}>
              Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
