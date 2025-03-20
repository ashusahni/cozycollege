
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="glass-card p-10 rounded-2xl max-w-md w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Search className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-xl mb-6">We couldn't find this page</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="gap-2">
            <a href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </a>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <a href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
