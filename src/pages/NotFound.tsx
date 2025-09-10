import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-medium bg-card/80 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
          <p className="text-sm text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => window.location.href = '/'} 
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
