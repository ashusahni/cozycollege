
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, ShowerHead, UtensilsCrossed } from 'lucide-react';
import ServiceCard, { ServiceCardProps } from './ServiceCard';

// Dummy data for services with Indian context
const laundryServices: ServiceCardProps[] = [
  {
    id: 'l1',
    name: 'QuickWash Laundry',
    type: 'laundry',
    description: 'Fast and affordable laundry service with free pickup and delivery for orders above ₹500.',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2071&auto=format&fit=crop',
    rating: 4.8,
    reviews: 42,
    price: '₹60/kg',
    distance: '0.2 km',
    address: '123 College Road',
    hours: 'Open 8AM - 9PM daily',
    features: ['Wash & Fold', 'Dry Cleaning', 'Express Service', 'Free Delivery'],
    contactNumber: '(+91) 98765-43210'
  },
  {
    id: 'l2',
    name: 'Campus Cleaners',
    type: 'laundry',
    description: 'Eco-friendly laundry service that specializes in student clothing and delicate fabrics.',
    image: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?q=80&w=2070&auto=format&fit=crop',
    rating: 4.6,
    reviews: 38,
    price: '₹70/kg',
    distance: '0.4 km',
    address: '456 University Blvd',
    hours: 'Open 7AM - 8PM Mon-Sat',
    features: ['Student Discount', 'Eco-Friendly', 'Stain Removal', 'Ironing'],
    contactNumber: '(+91) 87654-32109'
  },
  {
    id: 'l3',
    name: 'Fresh Threads',
    type: 'laundry',
    description: 'Premium laundry service with same-day options and specialty cleaning for all types of fabrics.',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    reviews: 56,
    price: '₹80/kg',
    distance: '0.5 km',
    address: '789 Academic Drive',
    hours: 'Open 9AM - 7PM daily',
    features: ['Same-Day Service', 'Subscription Plans', 'Shoe Cleaning', 'Alterations'],
    contactNumber: '(+91) 76543-21098'
  }
];

const mealServices: ServiceCardProps[] = [
  {
    id: 'm1',
    name: 'HomeCook Tiffin',
    type: 'meal',
    description: 'Authentic home-cooked Indian meals delivered daily with flexible subscription plans for students.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2067&auto=format&fit=crop',
    rating: 4.7,
    reviews: 64,
    price: '₹70/meal',
    distance: '0.3 km',
    address: '234 Student Lane',
    hours: 'Delivery 11AM - 1PM, 5PM - 7PM',
    features: ['Vegetarian Options', 'Monthly Plans', 'Custom Menu', 'Weekend Special'],
    contactNumber: '(+91) 65432-10987'
  },
  {
    id: 'm2',
    name: 'Nutrition Box',
    type: 'meal',
    description: 'Healthy, balanced North and South Indian meals prepared by nutritionists specifically for students.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop',
    rating: 4.8,
    reviews: 52,
    price: '₹90/meal',
    distance: '0.7 km',
    address: '567 Health Avenue',
    hours: 'Delivery 12PM - 2PM, 6PM - 8PM',
    features: ['Protein Rich', 'Calorie Controlled', 'Gluten Free', 'Keto Options'],
    contactNumber: '(+91) 54321-09876'
  },
  {
    id: 'm3',
    name: 'Campus Bites',
    type: 'meal',
    description: 'Quick, affordable meal options with a focus on local Indian flavors and student-friendly prices.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    rating: 4.5,
    reviews: 78,
    price: '₹60/meal',
    distance: '0.2 km',
    address: '890 College Corner',
    hours: 'Delivery 11:30AM - 9PM daily',
    features: ['Budget Friendly', 'Late Night', 'Weekly Plan', 'Group Orders'],
    contactNumber: '(+91) 43210-98765'
  }
];

const ServicesSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filterServices = (services: ServiceCardProps[]) => {
    if (!searchQuery.trim()) return services;
    
    const query = searchQuery.toLowerCase();
    return services.filter(service => 
      service.name.toLowerCase().includes(query) || 
      service.description.toLowerCase().includes(query) ||
      service.features.some(feature => feature.toLowerCase().includes(query))
    );
  };
  
  const filteredLaundry = filterServices(laundryServices);
  const filteredMeals = filterServices(mealServices);
  
  return (
    <div className="mt-8 mb-12">
      <h2 className="text-2xl font-semibold mb-6">Nearby Services</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search services, features, or locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="laundry" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="laundry" className="flex items-center gap-2">
            <ShowerHead className="h-4 w-4" />
            <span>Laundry Services</span>
          </TabsTrigger>
          <TabsTrigger value="meals" className="flex items-center gap-2">
            <UtensilsCrossed className="h-4 w-4" />
            <span>Tiffin Services</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="laundry" className="animate-fade-in">
          {filteredLaundry.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLaundry.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No laundry services match your search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="meals" className="animate-fade-in">
          {filteredMeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeals.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No tiffin services match your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesSection;
