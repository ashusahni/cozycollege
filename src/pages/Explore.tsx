
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, Map as MapIcon, List, X, ChevronDown, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import SearchBar from '@/components/SearchBar';
import PropertyCard, { PropertyCardProps } from '@/components/PropertyCard';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Sample property data
const allProperties: Omit<PropertyCardProps, 'className'>[] = [
  {
    id: '1',
    name: 'Sunset Residence Hall',
    location: 'North Campus, Berkeley',
    distance: '0.3 miles',
    price: 850,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    badges: ['popular', 'new'],
    amenities: ['wifi', 'meals', 'coffee']
  },
  {
    id: '2',
    name: 'College View Apartments',
    location: 'West Village, Davis',
    distance: '0.5 miles',
    price: 750,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    badges: ['verified'],
    amenities: ['wifi', 'roommates']
  },
  {
    id: '3',
    name: 'Campus Corner Lodge',
    location: 'Southside, Berkeley',
    distance: '0.2 miles',
    price: 920,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
    badges: ['top rated'],
    amenities: ['wifi', 'coffee', 'meals']
  },
  {
    id: '4',
    name: 'University Square PG',
    location: 'Downtown, Stanford',
    distance: '0.4 miles',
    price: 790,
    rating: 4.3,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=2070&auto=format&fit=crop',
    badges: [],
    amenities: ['wifi', 'meals']
  },
  {
    id: '5',
    name: 'Academy Heights',
    location: 'Westwood, UCLA',
    distance: '0.7 miles',
    price: 880,
    rating: 4.5,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop',
    badges: ['popular'],
    amenities: ['wifi', 'coffee', 'roommates']
  },
  {
    id: '6',
    name: 'Ivy Gardens',
    location: 'East Village, NYU',
    distance: '0.3 miles',
    price: 950,
    rating: 4.7,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?q=80&w=2076&auto=format&fit=crop',
    badges: ['top rated'],
    amenities: ['wifi', 'coffee', 'meals', 'roommates']
  },
  {
    id: '7',
    name: 'Student Haven',
    location: 'Midtown, Columbia',
    distance: '0.6 miles',
    price: 820,
    rating: 4.2,
    reviews: 91,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    badges: ['verified'],
    amenities: ['wifi', 'roommates']
  },
  {
    id: '8',
    name: 'Campus Bridge Residences',
    location: 'University District, UW',
    distance: '0.2 miles',
    price: 780,
    rating: 4.4,
    reviews: 103,
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2084&auto=format&fit=crop',
    badges: ['new'],
    amenities: ['wifi', 'coffee', 'meals']
  },
  {
    id: '9',
    name: 'Scholar\'s Retreat',
    location: 'Hyde Park, UChicago',
    distance: '0.4 miles',
    price: 870,
    rating: 4.5,
    reviews: 115,
    image: 'https://images.unsplash.com/photo-1494203484021-3c454daf695d?q=80&w=2070&auto=format&fit=crop',
    badges: [],
    amenities: ['wifi', 'meals', 'roommates']
  }
];

const filters = {
  amenities: [
    { id: 'wifi', label: 'WiFi' },
    { id: 'meals', label: 'Meals Included' },
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'laundry', label: 'Laundry' },
    { id: 'furnished', label: 'Furnished' },
    { id: 'tv', label: 'TV' },
    { id: 'parking', label: 'Parking' },
    { id: 'security', label: 'Security' },
  ],
  roomTypes: [
    { id: 'single', label: 'Single Room' },
    { id: 'shared', label: 'Shared Room' },
    { id: 'studio', label: 'Studio Apartment' },
    { id: '1bhk', label: '1 BHK' },
    { id: '2bhk', label: '2 BHK' },
  ]
};

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [properties, setProperties] = useState(allProperties);
  const [searchParams, setSearchParams] = useState({
    query: queryParams.get('q') || '',
    location: queryParams.get('location') || '',
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([600, 1200]);
  const [minDistance, setMinDistance] = useState<number>(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('relevance');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [comparisonList, setComparisonList] = useState<string[]>([]);

  const toggleComparisonItem = (id: string) => {
    if (comparisonList.includes(id)) {
      setComparisonList(comparisonList.filter(item => item !== id));
    } else {
      if (comparisonList.length < 3) {
        setComparisonList([...comparisonList, id]);
      }
    }
  };

  const handleSearch = (query: string, locationStr: string) => {
    setSearchParams({
      query,
      location: locationStr,
    });
    
    // Update URL without refreshing the page
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (locationStr) params.set('location', locationStr);
    navigate({ search: params.toString() }, { replace: true });
    
    // In a real app, we would fetch data based on query and location
    // For this demo, we'll just filter the existing data
    filterProperties();
  };

  const filterProperties = () => {
    // In a real app, this would be a server-side filter
    // For demonstration, we're doing client-side filtering
    let filtered = [...allProperties];
    
    // Filter by search terms (mocked)
    if (searchParams.query || searchParams.location) {
      filtered = filtered.filter(property => 
        property.name.toLowerCase().includes((searchParams.query || '').toLowerCase()) ||
        property.location.toLowerCase().includes((searchParams.location || '').toLowerCase())
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      property => property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    
    // Filter by distance
    filtered = filtered.filter(
      property => parseFloat(property.distance.split(' ')[0]) <= minDistance
    );
    
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(
        property => selectedAmenities.every(amenity => 
          property.amenities.includes(amenity.toLowerCase())
        )
      );
    }
    
    // Sort properties based on selection
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        filtered.sort((a, b) => 
          parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0])
        );
        break;
      // 'relevance' is default, no sorting needed
    }
    
    setProperties(filtered);
  };

  const resetFilters = () => {
    setPriceRange([600, 1200]);
    setMinDistance(1);
    setSelectedAmenities([]);
    setSelectedRoomTypes([]);
    setSortOption('relevance');
  };

  const viewComparisons = () => {
    if (comparisonList.length > 0) {
      navigate(`/compare?properties=${comparisonList.join(',')}`);
    }
  };

  // Apply filters whenever they change
  useEffect(() => {
    filterProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, priceRange, minDistance, selectedAmenities, selectedRoomTypes, sortOption]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters Header */}
        <div className="py-6 sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-4">
            <h1 className="text-2xl font-semibold">Find Accommodations</h1>
            <SearchBar 
              onSearch={handleSearch} 
              variant="minimal" 
              className="md:max-w-md" 
            />
          </div>
          
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[85vh]">
                  <DrawerHeader className="border-b border-border pb-4">
                    <DrawerTitle>Filter Options</DrawerTitle>
                  </DrawerHeader>
                  
                  <div className="p-4 overflow-y-auto">
                    <Accordion type="single" collapsible defaultValue="price" className="w-full">
                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="px-1 py-4">
                            <div className="flex justify-between mb-4">
                              <span>${priceRange[0]}</span>
                              <span>${priceRange[1]}</span>
                            </div>
                            <Slider
                              defaultValue={priceRange}
                              min={500}
                              max={1500}
                              step={50}
                              onValueChange={(value) => setPriceRange(value as [number, number])}
                              className="mb-2"
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="distance">
                        <AccordionTrigger>Distance from Campus</AccordionTrigger>
                        <AccordionContent>
                          <div className="px-1 py-4">
                            <div className="flex justify-between mb-4">
                              <span>Up to {minDistance} mile{minDistance > 1 ? 's' : ''}</span>
                            </div>
                            <Slider
                              defaultValue={[minDistance]}
                              min={0.1}
                              max={5}
                              step={0.1}
                              onValueChange={(value) => setMinDistance(value[0])}
                              className="mb-2"
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="amenities">
                        <AccordionTrigger>Amenities</AccordionTrigger>
                        <AccordionContent>
                          <div className="px-1 py-2 grid grid-cols-2 gap-2">
                            {filters.amenities.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`amenity-${item.id}`} 
                                  checked={selectedAmenities.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedAmenities([...selectedAmenities, item.id]);
                                    } else {
                                      setSelectedAmenities(
                                        selectedAmenities.filter((id) => id !== item.id)
                                      );
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor={`amenity-${item.id}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {item.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="roomType">
                        <AccordionTrigger>Room Type</AccordionTrigger>
                        <AccordionContent>
                          <div className="px-1 py-2 space-y-2">
                            {filters.roomTypes.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`room-${item.id}`} 
                                  checked={selectedRoomTypes.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedRoomTypes([...selectedRoomTypes, item.id]);
                                    } else {
                                      setSelectedRoomTypes(
                                        selectedRoomTypes.filter((id) => id !== item.id)
                                      );
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor={`room-${item.id}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {item.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <DrawerFooter className="border-t border-border pt-4">
                    <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
                    <DrawerClose asChild>
                      <Button>Apply Filters</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            
              <div className="flex items-center rounded-md border border-border">
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-l-md rounded-r-none border-r border-border h-9 px-3", 
                    viewMode === 'list' ? "bg-muted" : ""
                  )}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-r-md rounded-l-none h-9 px-3",
                    viewMode === 'map' ? "bg-muted" : ""
                  )}
                  onClick={() => setViewMode('map')}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Applied Filters */}
              {(selectedAmenities.length > 0 || selectedRoomTypes.length > 0 || priceRange[0] !== 600 || priceRange[1] !== 1200 || minDistance !== 1) && (
                <div className="flex flex-wrap items-center gap-2 ml-2">
                  {selectedAmenities.map(amenity => {
                    const amenityLabel = filters.amenities.find(a => a.id === amenity)?.label;
                    return (
                      <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                        {amenityLabel}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))}
                        />
                      </Badge>
                    );
                  })}
                  
                  {selectedRoomTypes.map(roomType => {
                    const roomTypeLabel = filters.roomTypes.find(r => r.id === roomType)?.label;
                    return (
                      <Badge key={roomType} variant="secondary" className="flex items-center gap-1">
                        {roomTypeLabel}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => setSelectedRoomTypes(selectedRoomTypes.filter(r => r !== roomType))}
                        />
                      </Badge>
                    );
                  })}
                  
                  {(priceRange[0] !== 600 || priceRange[1] !== 1200) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      ${priceRange[0]} - ${priceRange[1]}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setPriceRange([600, 1200])}
                      />
                    </Badge>
                  )}
                  
                  {minDistance !== 1 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Within {minDistance} mile{minDistance > 1 ? 's' : ''}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setMinDistance(1)}
                      />
                    </Badge>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={resetFilters}
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline-block">Sort By:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{properties.length}</span> results
                {searchParams.query && (
                  <> for <span className="font-medium text-foreground">"{searchParams.query}"</span></>
                )}
                {searchParams.location && (
                  <> in <span className="font-medium text-foreground">"{searchParams.location}"</span></>
                )}
              </p>
            </div>
            
            {comparisonList.length > 0 && (
              <Button size="sm" onClick={viewComparisons}>
                Compare ({comparisonList.length})
              </Button>
            )}
          </div>
          
          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.length > 0 ? (
                properties.map((property) => (
                  <div key={property.id} className="relative group">
                    <PropertyCard {...property} />
                    <button
                      className={cn(
                        "absolute top-3 right-12 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200 z-10",
                        comparisonList.includes(property.id) 
                          ? "text-primary bg-white" 
                          : "text-foreground hover:bg-white"
                      )}
                      onClick={() => toggleComparisonItem(property.id)}
                    >
                      {comparisonList.includes(property.id) ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-muted-foreground mb-4">No properties found matching your criteria.</p>
                  <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-muted h-[600px] rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Map view is not available in this preview.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
