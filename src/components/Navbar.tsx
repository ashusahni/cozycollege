
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Compare', path: '/compare' },
    { name: 'About', path: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 lg:px-12',
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-semibold flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
        >
          <span className="text-gradient">CozyCollege</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 relative group",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {link.name}
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                  location.pathname === link.path && "scale-x-100"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          
          <div className="relative group">
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Account</span>
              <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
            <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-950 rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
              <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900">Sign In</Link>
              <Link to="/register" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900">Register</Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out",
          isMobileMenuOpen 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full pt-24 px-6 space-y-8">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-3 text-lg font-medium rounded-md transition-all duration-200",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col space-y-4 mt-auto pb-12">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button className="w-full justify-start" asChild>
              <Link to="/register">
                Register
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
