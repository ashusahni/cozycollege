
import { ArrowRight, MapPin, Star, BookOpen, Coffee, Users, Building, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-8 lg:px-12 hero-section overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 animate-fade-in">Our Mission</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight animate-fade-in">
              Simplifying Student <span className="text-gradient">Housing in India</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 mx-auto max-w-2xl text-balance animate-fade-in">
              We're on a mission to make finding quality PGs and hostels near Indian colleges easy, transparent, and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6">
              <Badge>Our Story</Badge>
              <h2 className="text-3xl font-semibold">Making Student Housing Simple in India</h2>
              <p className="text-muted-foreground text-balance">
                CozyCollege was born out of a firsthand experience with the challenges of finding suitable PGs and hostels in Indian cities. 
                As former students of IIT Delhi, we understand the stress and uncertainty that comes with relocating to a new city for education.
              </p>
              <p className="text-muted-foreground text-balance">
                Our founder, after struggling to find reliable information about PGs near their university, recognized the need for a 
                centralized platform that provides comprehensive, verified details about student housing options across India.
              </p>
              <p className="text-muted-foreground text-balance">
                Today, CozyCollege is committed to transforming the student accommodation search process through 
                technology, transparency, and community input. We believe that finding a great place to live should 
                never be a barrier to pursuing quality education in India.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                  alt="Students in an Indian university campus" 
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end p-6">
                  <p className="text-white text-lg font-medium">Founded in 2023 by IIT alumni, for Indian students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">What We Offer</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              A Complete Solution for Student Housing in India
            </h2>
            <p className="text-muted-foreground text-balance">
              We've built a comprehensive platform that addresses every aspect of finding and securing 
              the perfect accommodation for your college years in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Location-Based Search",
                description: "Find PGs based on their proximity to top Indian colleges and universities with our precise mapping tools."
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Verified Reviews",
                description: "Make decisions based on authentic reviews from Indian students who have lived in these accommodations."
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Detailed Information",
                description: "Access comprehensive details about amenities, rules, tiffin services, and pricing for each property."
              },
              {
                icon: <Coffee className="h-8 w-8" />,
                title: "Amenities Filter",
                description: "Easily filter PGs based on amenities like AC, geyser, food quality, and WiFi that matter most to Indian students."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Roommate Matching",
                description: "Find compatible roommates based on preferences, lifestyle, and academic schedules in your city."
              },
              {
                icon: <Building className="h-8 w-8" />,
                title: "Property Comparison",
                description: "Compare multiple properties side by side to make informed decisions about your housing in India."
              }
            ].map((feature, index) => (
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

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "8,000+", label: "PGs & Hostels Listed" },
              { value: "300+", label: "Colleges Covered" },
              { value: "40,000+", label: "Happy Students" },
              { value: "5,000+", label: "Verified Reviews" }
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-xl glass-card animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground text-balance">
              Our core values shape everything we do at CozyCollege.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Transparency",
                description: "We believe in full transparency about properties, pricing, and policies, so students can make informed decisions."
              },
              {
                title: "Reliability",
                description: "Our platform provides verified information you can trust, vetted by our dedicated team and community."
              },
              {
                title: "Accessibility",
                description: "We're committed to making quality accommodation information accessible to all Indian students, regardless of background."
              },
              {
                title: "Community",
                description: "We foster a supportive community of students sharing experiences and insights about housing options across India."
              }
            ].map((value, index) => (
              <div key={index} className="flex gap-4 animate-fade-in-left" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Meet the People Behind CozyCollege
            </h2>
            <p className="text-muted-foreground text-balance">
              Our diverse team combines expertise in technology, real estate, and student services to create
              the best possible housing platform for Indian students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Arjun Sharma",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop",
                bio: "IIT Delhi alumnus who experienced firsthand the challenges of finding good accommodation."
              },
              {
                name: "Priya Patel",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
                bio: "Tech expert from NIT Trichy passionate about solving real-world problems through innovative solutions."
              },
              {
                name: "Rahul Verma",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
                bio: "Operations specialist with extensive experience in Indian property management and customer service."
              },
              {
                name: "Neha Gupta",
                role: "Community Manager",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1922&auto=format&fit=crop",
                bio: "Former Delhi University housing advisor dedicated to building a supportive community of users."
              }
            ].map((member, index) => (
              <div key={index} className="glass-card rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
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
              Join Us in Transforming Student Housing in India
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-3xl mx-auto text-balance">
              Whether you're a student looking for accommodation or a PG owner wanting to list your space,
              CozyCollege is here to connect you with the right people.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="gap-2"
              >
                Start Your Search
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent hover:bg-primary-foreground/10 text-primary-foreground"
              >
                List Your Property
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
