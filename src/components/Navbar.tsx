
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              EliteStays
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="font-medium hover:text-primary">Home</Link>
            <Link to="/properties" className="font-medium hover:text-primary">Properties</Link>
            <Link to="/about" className="font-medium hover:text-primary">About</Link>
            <Link to="/contact" className="font-medium hover:text-primary">Contact</Link>
            <Button variant="outline" className="mr-2">Sign In</Button>
            <Button>Sign Up</Button>
          </nav>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link to="/" className="block px-3 py-2 rounded-md font-medium hover:bg-gray-100">Home</Link>
            <Link to="/properties" className="block px-3 py-2 rounded-md font-medium hover:bg-gray-100">Properties</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md font-medium hover:bg-gray-100">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md font-medium hover:bg-gray-100">Contact</Link>
            <div className="flex flex-col space-y-2 mt-4 px-3">
              <Button variant="outline" className="w-full">Sign In</Button>
              <Button className="w-full">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
