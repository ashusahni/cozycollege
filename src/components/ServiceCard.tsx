
import React from 'react';
import { Star, ExternalLink, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface ServiceCardProps {
  id: string;
  name: string;
  type: 'laundry' | 'meal';
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  distance: string;
  address: string;
  hours: string;
  features: string[];
  contactNumber?: string;
}

const ServiceCard = ({
  name,
  type,
  description,
  image,
  rating,
  reviews,
  price,
  distance,
  address,
  hours,
  features,
  contactNumber,
}: ServiceCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge 
          className="absolute top-3 left-3 capitalize" 
          variant={type === 'laundry' ? 'default' : 'secondary'}
        >
          {type === 'laundry' ? 'Laundry' : 'Tiffin Service'}
        </Badge>
      </div>
      
      <CardContent className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center bg-primary/10 text-primary rounded-md px-2 py-1">
            <Star className="h-3.5 w-3.5 fill-primary mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-muted-foreground">{distance} • {address}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{hours}</p>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="font-medium">
            {type === 'laundry' ? 'Services from' : 'Meals from'} <span className="text-primary">{price.replace('$', '₹')}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {features.slice(0, 3).map((feature, i) => (
              <Badge key={i} variant="outline" className="text-xs font-normal">
                {feature}
              </Badge>
            ))}
            {features.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{features.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t flex justify-between">
        {contactNumber && (
          <Button variant="outline" size="sm" className="text-xs">
            Call
          </Button>
        )}
        <Button size="sm" className="ml-auto text-xs">
          <span>View Details</span>
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
