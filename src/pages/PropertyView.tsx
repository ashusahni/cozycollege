
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetails from '@/components/PropertyDetails';
import { Button } from '@/components/ui/button';

// Dummy property data for demonstration with Indian context
const propertyData = {
  '1': {
    id: '1',
    name: 'Sharma Residence Hall',
    description: 'Sharma Residence Hall is a premier student accommodation located just a short walk from the Delhi University North Campus. Our modern facility offers a blend of comfort and convenience with fully furnished rooms, high-speed internet, and a vibrant community space. Perfect for students who want to focus on their studies while enjoying a dynamic social environment.\n\nThe hall features 24/7 security, regular cleaning services, and dedicated study areas. Our in-house mess serves nutritious North and South Indian meals throughout the day, catering to various dietary preferences. We also organize regular cultural events to help students network and build lasting relationships.',
    location: 'North Campus, Delhi University',
    distance: '0.3 km',
    price: 12500,
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564540574859-0dfb63985953?q=80&w=2070&auto=format&fit=crop',
    ],
    badges: ['popular', 'new'],
    amenities: [
      {
        category: 'Basic',
        items: ['WiFi', 'AC', 'Geyser', 'Furnished']
      },
      {
        category: 'Food & Kitchen',
        items: ['Mess Food', 'Refrigerator', 'Microwave', 'Dining Area']
      },
      {
        category: 'Services',
        items: ['Cleaning', 'Laundry', 'Security', '24/7 Support']
      },
      {
        category: 'Study & Leisure',
        items: ['Study Room', 'TV', 'Common Area', 'Garden']
      }
    ],
    rules: [
      'No smoking inside the building',
      'Quiet hours from 11 PM to 7 AM',
      'No pets allowed',
      'Guests must be registered at the front desk',
      'No alcohol in common areas',
      'Damage to property will result in charges',
      'Monthly rent due by the 5th of each month'
    ],
    landlord: {
      name: 'Suresh Sharma',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
      responseTime: '1-2 hours',
      phone: '(+91) 98765-43210',
      email: 'suresh@sharmaresidence.com'
    },
    roomDetails: {
      type: 'Single Room',
      size: '150 sq ft',
      occupancy: 'Single',
      furnished: true
    }
  },
  '2': {
    id: '2',
    name: 'Laxmi Nagar PG',
    description: 'Laxmi Nagar PG offers modern living spaces designed specifically for students. Located in the heart of East Delhi near IP University, our PG provides the perfect balance of privacy and community. Each unit comes with high-speed internet, modern appliances, and comfortable furnishings to make your college experience as smooth as possible.\n\nOur community features include a study area, small gym, and outdoor sitting areas. We are committed to creating a safe and supportive environment where students can thrive academically and socially. Regular maintenance and dedicated property management ensure that you can focus on your studies without worrying about housing issues.',
    location: 'East Delhi, Near IP University',
    distance: '0.5 km',
    price: 9500,
    rating: 4.6,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop',
    ],
    badges: ['verified'],
    amenities: [
      {
        category: 'Basic',
        items: ['WiFi', 'AC', 'Geyser', 'Furnished']
      },
      {
        category: 'Kitchen',
        items: ['Common Kitchen', 'Refrigerator', 'Microwave', 'Water Purifier']
      },
      {
        category: 'Services',
        items: ['Laundry', 'Two-wheeler Parking', 'Maintenance', 'Housekeeping']
      },
      {
        category: 'Study & Leisure',
        items: ['Study Room', 'Small Gym', 'Rooftop', 'TV Room']
      }
    ],
    rules: [
      'No smoking inside PG',
      'Quiet hours from 10 PM to 8 AM',
      'No pets allowed',
      'No alterations to walls or fixtures',
      'Rent due on the 1st of each month',
      'Maximum of 2 overnight guests per week',
      'Residents responsible for routine cleaning'
    ],
    landlord: {
      name: 'Amit Gupta',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
      responseTime: 'within a day',
      phone: '(+91) 87654-32109',
      email: 'amit@laxminagarpg.com'
    },
    roomDetails: {
      type: 'Double Sharing',
      size: '250 sq ft',
      occupancy: 'Double',
      furnished: true
    }
  },
  '3': {
    id: '3',
    name: 'IIT Bombay Campus Lodge',
    description: 'IIT Bombay Campus Lodge represents the pinnacle of student living. Situated just 0.2 km from the IIT Powai campus, our lodge combines luxurious accommodations with a supportive academic environment. Each room is meticulously designed with modern furnishings, natural lighting, and spacious layouts to enhance your college experience.\n\nWe pride ourselves on our all-inclusive approach, with utilities, high-speed internet, and weekly cleaning all covered in your rent. Our community spaces include quiet study rooms, collaboration areas, and leisure facilities. The on-site mess serves three meals daily with diverse menu options to cater to all dietary needs and preferences.',
    location: 'Powai, Mumbai',
    distance: '0.2 km',
    price: 14000,
    rating: 4.9,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610527003928-47adfbcbf319?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630699144867-f4811389e9f6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?q=80&w=2070&auto=format&fit=crop',
    ],
    badges: ['top rated'],
    amenities: [
      {
        category: 'Basic',
        items: ['WiFi', 'AC', 'Geyser', 'Premium Furniture']
      },
      {
        category: 'Food & Kitchen',
        items: ['Premium Mess Food', 'Snack Bar', 'Coffee Station', 'Dining Hall']
      },
      {
        category: 'Services',
        items: ['Daily Cleaning', 'Laundry', 'Security', 'Concierge']
      },
      {
        category: 'Study & Leisure',
        items: ['Library', 'Media Room', 'Fitness Center', 'Rooftop Lounge']
      }
    ],
    rules: [
      'Strictly no smoking on premises',
      'Quiet hours from 9 PM to 8 AM',
      'No pets policy',
      'Visitors must check in at reception',
      'Responsible alcohol consumption in private rooms only',
      'Damages will be assessed and charged accordingly',
      'Academic-focused environment maintained at all times'
    ],
    landlord: {
      name: 'Ravi Desai',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
      responseTime: 'under 1 hour',
      phone: '(+91) 76543-21098',
      email: 'ravi@iitcampuslodge.com'
    },
    roomDetails: {
      type: 'Premium Single',
      size: '180 sq ft',
      occupancy: 'Single',
      furnished: true
    }
  }
};

const PropertyView = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Get property data based on ID
  // In a real app, this would be fetched from an API
  const property = id && propertyData[id as keyof typeof propertyData];

  if (!property) {
    return (
      <div className="min-h-screen pt-24 px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center py-16">
          <h1 className="text-2xl font-semibold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/explore">Browse Properties</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 md:px-8 lg:px-12">
      <PropertyDetails {...property} />
    </div>
  );
};

export default PropertyView;
