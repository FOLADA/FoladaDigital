import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      {/* Sophisticated Gradient Background - expanded black at top */}
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,_#DC143C_0%,_#8B0000_15%,_#4A0E0E_30%,_#2B0808_50%,_#0D0404_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,_rgba(220,20,60,0.4)_0%,_rgba(139,0,0,0.2)_20%,_transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(13,4,4,0.9)_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#000000_0%,_transparent_30%)]"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-2xl px-6">
        <h1 className="text-9xl font-bold mb-6 bg-gradient-to-r from-red-400 via-red-600 to-red-800 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-3xl text-red-100 font-light mb-6">Oops! Page not found</p>
        <p className="text-xl text-red-200 mb-10 max-w-2xl mx-auto">
          The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button 
          onClick={() => window.location.href = '/'} 
          className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-4 text-lg font-medium"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;