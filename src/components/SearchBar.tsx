
import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, School, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string, location: string) => void;
  variant?: 'default' | 'minimal';
}

const popularLocations = [
  "New York, NY",
  "Boston, MA",
  "San Francisco, CA",
  "Chicago, IL",
  "Austin, TX",
];

const popularColleges = [
  "Harvard University",
  "MIT",
  "Stanford University",
  "UC Berkeley",
  "University of Texas",
];

const SearchBar = ({ className, onSearch, variant = 'default' }: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState<'colleges' | 'locations'>('colleges');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query, location);
    setIsExpanded(false);
  };

  const handleClearLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocation('');
  };

  const handleClearQuery = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={searchContainerRef}
      className={cn(
        "relative w-full mx-auto transition-all duration-300",
        variant === 'default' ? 'max-w-3xl' : 'max-w-xl',
        className
      )}
    >
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "glass-card rounded-full overflow-hidden transition-all duration-300",
          isExpanded && "rounded-xl shadow-md",
          variant === 'minimal' && "shadow-none bg-transparent backdrop-blur-none border-transparent focus-within:bg-white/70 focus-within:border-white/20"
        )}
      >
        <div className="relative flex flex-col">
          {/* Search Input Row */}
          <div className="flex items-center p-2 md:p-3">
            <div 
              className={cn(
                "flex items-center flex-1 transition-all duration-300",
                isExpanded ? "border-b border-border pb-2" : ""
              )}
            >
              <Search className="h-5 w-5 text-muted-foreground ml-2 mr-1 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for college or university..."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-2 py-1 placeholder:text-muted-foreground/70"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsExpanded(true)}
              />
              {query && (
                <button 
                  type="button" 
                  onClick={handleClearQuery}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {variant === 'default' && (
              <>
                <div className="h-10 w-px bg-border mx-2 hidden md:block" />
                <div 
                  className="hidden md:flex items-center flex-1 relative"
                  onClick={() => setIsExpanded(true)}
                >
                  <MapPin className="h-5 w-5 text-muted-foreground ml-2 mr-1 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Location..."
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-2 py-1 placeholder:text-muted-foreground/70"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setIsExpanded(true)}
                  />
                  {location && (
                    <button 
                      type="button" 
                      onClick={handleClearLocation}
                      className="p-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className={cn(
                "rounded-full transition-all duration-300",
                variant === 'minimal' && "w-8 h-8 p-0"
              )}
            >
              <span className={cn("hidden", variant === 'default' && "md:inline")}>Search</span>
              <Search className={cn("h-4 w-4", variant === 'default' && "md:hidden")} />
            </Button>
          </div>

          {/* Expanded Section */}
          {isExpanded && (
            <div className="p-4 animate-fade-in-down">
              {variant === 'default' && (
                <div className="mb-4 border-b border-border">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className={cn(
                        "px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200",
                        activeTab === 'colleges'
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setActiveTab('colleges')}
                    >
                      <School className="inline-block h-4 w-4 mr-2" />
                      Colleges
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200",
                        activeTab === 'locations'
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setActiveTab('locations')}
                    >
                      <MapPin className="inline-block h-4 w-4 mr-2" />
                      Locations
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {activeTab === 'colleges' ? (
                  <>
                    <h3 className="text-sm font-medium text-muted-foreground">Popular Colleges</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {popularColleges.map(college => (
                        <button
                          key={college}
                          type="button"
                          className="flex items-center text-left px-3 py-2 rounded-md hover:bg-muted transition-colors"
                          onClick={() => {
                            setQuery(college);
                            setIsExpanded(false);
                          }}
                        >
                          <School className="h-4 w-4 mr-2 text-muted-foreground" />
                          {college}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-sm font-medium text-muted-foreground">Popular Locations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {popularLocations.map(loc => (
                        <button
                          key={loc}
                          type="button"
                          className="flex items-center text-left px-3 py-2 rounded-md hover:bg-muted transition-colors"
                          onClick={() => {
                            setLocation(loc);
                            setIsExpanded(false);
                          }}
                        >
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {loc}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
