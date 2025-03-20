
import { useState } from 'react';
import { X, Star, Check, Minus, MoreHorizontal, ArrowLeft, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Types
export interface PropertyComparisonItem {
  id: string;
  name: string;
  image: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  distance: string;
  amenities: Record<string, boolean>;
  roomType: string;
  availability: string;
  landlordResponseTime: string;
}

interface ComparisonTableProps {
  properties: PropertyComparisonItem[];
  onRemoveProperty: (id: string) => void;
}

const amenityGroups = {
  'Basic': ['Wifi', 'AC', 'Heating', 'Furnished'],
  'Kitchen': ['Kitchen Access', 'Refrigerator', 'Microwave', 'Stove'],
  'Services': ['Cleaning', 'Laundry', 'Security', 'Meals'],
  'Additional': ['Study Room', 'TV', 'Gym', 'Parking']
};

const ComparisonTable = ({ properties, onRemoveProperty }: ComparisonTableProps) => {
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Basic': true,
    'Kitchen': false,
    'Services': false,
    'Additional': false
  });
  
  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-medium mb-4">No properties to compare</h2>
        <p className="text-muted-foreground mb-6">
          Add properties to your comparison list to see how they stack up against each other.
        </p>
        <Button onClick={() => navigate('/explore')}>
          Explore Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6 -ml-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to results
      </Button>
      
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(180px,1fr))] gap-4">
          {/* Header Row - Property Cards */}
          <div className="pt-24 pr-6"> {/* Empty space for the header column */}</div>
          
          {properties.map((property) => (
            <div key={property.id} className="relative">
              <div className="h-full flex flex-col group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 z-10 opacity-60 hover:opacity-100"
                  onClick={() => onRemoveProperty(property.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <div className="relative aspect-[3/2] rounded-t-lg overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4 border border-t-0 border-border rounded-b-lg flex-1 flex flex-col">
                  <h3 className="font-medium line-clamp-1">{property.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{property.location}</p>
                  
                  <div className="flex items-center text-sm mb-2">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
                    <span>{property.rating.toFixed(1)}</span>
                    <span className="text-xs text-muted-foreground ml-1">({property.reviews})</span>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="text-lg font-semibold">${property.price}</div>
                    <p className="text-xs text-muted-foreground mb-3">/month</p>
                    
                    <Button className="w-full" size="sm" asChild>
                      <a href={`/property/${property.id}`}>View Details</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          {/* Basic Info Section */}
          <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(180px,1fr))] gap-4 py-3 border-y border-border">
            <div className="font-medium">Basic Information</div>
          </div>
          
          {/* Distance Row */}
          <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(180px,1fr))] gap-4 py-4 border-b border-border">
            <div className="text-muted-foreground">Distance from Campus</div>
            {properties.map((property) => (
              <div key={`${property.id}-distance`}>{property.distance}</div>
            ))}
          </div>
          
          {/* Room Type Row */}
          <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(180px,1fr))] gap-4 py-4 border-b border-border">
            <div className="text-muted-foreground">Room Type</div>
            {properties.map((property) => (
              <div key={`${property.id}-room`}>{property.roomType}</div>
            ))}
          </div>
          
          {/* Availability Row */}
          <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(180px,1fr))] gap-4 py-4 border-b border-border">
            <div className="text-muted-foreground">Availability</div>
            {properties.map((property) => (
              <div key={`${property.id}-availability`}>{property.availability}</div>
            ))}
          </div>
          
          {/* Response Time Row */}
          <div className="grid grid-cols-[250px_repeat(auto-fill,minmax(180px,1fr))] gap-4 py-4 border-b border-border">
            <div className="text-muted-foreground">Landlord Response</div>
            {properties.map((property) => (
              <div key={`${property.id}-response`} className="flex items-center">
                <User className="h-4 w-4 mr-1.5 text-muted-foreground" />
                {property.landlordResponseTime}
              </div>
            ))}
          </div>
          
          {/* Amenities Sections */}
          {Object.entries(amenityGroups).map(([group, amenities]) => (
            <div key={group}>
              <div 
                className="grid grid-cols-[250px_repeat(auto-fill,minmax(180px,1fr))] gap-4 py-3 border-b border-border cursor-pointer hover:bg-muted/30"
                onClick={() => toggleGroup(group)}
              >
                <div className="font-medium flex items-center">
                  {group} Amenities
                  <ChevronRight className={cn(
                    "h-4 w-4 ml-1 transition-transform duration-200",
                    expandedGroups[group] && "rotate-90"
                  )} />
                </div>
              </div>
              
              {expandedGroups[group] && (
                <>
                  {amenities.map((amenity) => (
                    <div 
                      key={amenity} 
                      className="grid grid-cols-[250px_repeat(auto-fill,minmax(180px,1fr))] gap-4 py-4 border-b border-border"
                    >
                      <div className="text-muted-foreground pl-4">{amenity}</div>
                      {properties.map((property) => (
                        <div key={`${property.id}-${amenity}`}>
                          {property.amenities[amenity] ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <Minus className="h-5 w-5 text-muted-foreground/60" />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
          
          {/* Additional Options Menu */}
          <div className="mt-8 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => window.print()}>
                  Print Comparison
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate('/explore')}>
                  Add More Properties
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => onRemoveProperty('all')}>
                  Clear All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
