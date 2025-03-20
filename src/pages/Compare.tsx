
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ComparisonTable, { PropertyComparisonItem } from '@/components/ComparisonTable';

// Dummy data for comparison
const propertyData: Record<string, PropertyComparisonItem> = {
  '1': {
    id: '1',
    name: 'Sunset Residence Hall',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    location: 'North Campus, Berkeley',
    price: 850,
    rating: 4.8,
    reviews: 124,
    distance: '0.3 miles',
    amenities: {
      'WiFi': true,
      'AC': true,
      'Heating': true,
      'Furnished': true,
      'Kitchen Access': true,
      'Refrigerator': true,
      'Microwave': true,
      'Stove': false,
      'Cleaning': true,
      'Laundry': true,
      'Security': true,
      'Meals': true,
      'Study Room': true,
      'TV': true,
      'Gym': false,
      'Parking': false
    },
    roomType: 'Single Room',
    availability: 'Available Now',
    landlordResponseTime: 'Within 2 hours'
  },
  '2': {
    id: '2',
    name: 'College View Apartments',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    location: 'West Village, Davis',
    price: 750,
    rating: 4.6,
    reviews: 89,
    distance: '0.5 miles',
    amenities: {
      'WiFi': true,
      'AC': true,
      'Heating': true,
      'Furnished': true,
      'Kitchen Access': true,
      'Refrigerator': true,
      'Microwave': true,
      'Stove': true,
      'Cleaning': false,
      'Laundry': true,
      'Security': true,
      'Meals': false,
      'Study Room': true,
      'TV': false,
      'Gym': true,
      'Parking': true
    },
    roomType: 'Studio Apartment',
    availability: 'From Aug 1, 2023',
    landlordResponseTime: 'Within a day'
  },
  '3': {
    id: '3',
    name: 'Campus Corner Lodge',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
    location: 'Southside, Berkeley',
    price: 920,
    rating: 4.9,
    reviews: 156,
    distance: '0.2 miles',
    amenities: {
      'WiFi': true,
      'AC': true,
      'Heating': true,
      'Furnished': true,
      'Kitchen Access': false,
      'Refrigerator': true,
      'Microwave': true,
      'Stove': false,
      'Cleaning': true,
      'Laundry': true,
      'Security': true,
      'Meals': true,
      'Study Room': true,
      'TV': true,
      'Gym': true,
      'Parking': false
    },
    roomType: 'Premium Single',
    availability: 'Available Now',
    landlordResponseTime: 'Under 1 hour'
  },
  '4': {
    id: '4',
    name: 'University Square PG',
    image: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=2070&auto=format&fit=crop',
    location: 'Downtown, Stanford',
    price: 790,
    rating: 4.3,
    reviews: 78,
    distance: '0.4 miles',
    amenities: {
      'WiFi': true,
      'AC': false,
      'Heating': true,
      'Furnished': true,
      'Kitchen Access': true,
      'Refrigerator': true,
      'Microwave': true,
      'Stove': true,
      'Cleaning': false,
      'Laundry': true,
      'Security': false,
      'Meals': true,
      'Study Room': false,
      'TV': false,
      'Gym': false,
      'Parking': false
    },
    roomType: 'Shared Room',
    availability: 'From Sep 1, 2023',
    landlordResponseTime: 'Within a day'
  },
  '5': {
    id: '5',
    name: 'Academy Heights',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop',
    location: 'Westwood, UCLA',
    price: 880,
    rating: 4.5,
    reviews: 112,
    distance: '0.7 miles',
    amenities: {
      'WiFi': true,
      'AC': true,
      'Heating': true,
      'Furnished': true,
      'Kitchen Access': true,
      'Refrigerator': true,
      'Microwave': true,
      'Stove': true,
      'Cleaning': true,
      'Laundry': true,
      'Security': true,
      'Meals': false,
      'Study Room': true,
      'TV': true,
      'Gym': true,
      'Parking': true
    },
    roomType: '1 BHK Apartment',
    availability: 'From Oct 15, 2023',
    landlordResponseTime: '2-3 hours'
  }
};

const Compare = () => {
  const location = useLocation();
  const [propertiesToCompare, setPropertiesToCompare] = useState<PropertyComparisonItem[]>([]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Parse query parameters to get property IDs
    const params = new URLSearchParams(location.search);
    const propertyIds = params.get('properties')?.split(',') || [];
    const addPropertyId = params.get('add');
    
    if (addPropertyId && !propertyIds.includes(addPropertyId)) {
      propertyIds.push(addPropertyId);
    }
    
    // Get property data for each ID
    const properties = propertyIds
      .map(id => propertyData[id])
      .filter(Boolean);
    
    setPropertiesToCompare(properties);
    
    // Update URL if needed (e.g., after adding a property)
    if (addPropertyId && propertyIds.length > 1) {
      const newParams = new URLSearchParams();
      newParams.set('properties', propertyIds.join(','));
      window.history.replaceState(
        {}, 
        '', 
        `${location.pathname}?${newParams.toString()}`
      );
    }
  }, [location]);
  
  const handleRemoveProperty = (id: string) => {
    if (id === 'all') {
      setPropertiesToCompare([]);
      window.history.replaceState({}, '', location.pathname);
      return;
    }
    
    const updatedProperties = propertiesToCompare.filter(property => property.id !== id);
    setPropertiesToCompare(updatedProperties);
    
    // Update URL
    if (updatedProperties.length > 0) {
      const newParams = new URLSearchParams();
      newParams.set(
        'properties', 
        updatedProperties.map(p => p.id).join(',')
      );
      window.history.replaceState(
        {}, 
        '', 
        `${location.pathname}?${newParams.toString()}`
      );
    } else {
      window.history.replaceState({}, '', location.pathname);
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Compare Properties</h1>
          <p className="text-muted-foreground">
            Compare features and amenities side by side to find your perfect match.
          </p>
        </div>
        
        <ComparisonTable 
          properties={propertiesToCompare} 
          onRemoveProperty={handleRemoveProperty} 
        />
      </div>
    </div>
  );
};

export default Compare;
