
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import AuthDialog from "@/components/AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"signIn" | "signUp">("signIn");
  const { user, isEmailVerified, signOut } = useAuth();

  const openSignIn = () => {
    setAuthDialogTab("signIn");
    setAuthDialogOpen(true);
  };

  const openSignUp = () => {
    setAuthDialogTab("signUp");
    setAuthDialogOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    {isEmailVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Mail className="h-4 w-4 text-orange-500" />
                    )}
                    {user.email?.split('@')[0] || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!isEmailVerified && (
                    <DropdownMenuItem className="text-orange-500 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email not verified
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>My Bookings</DropdownMenuItem>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" className="mr-2" onClick={openSignIn}>
                  Sign In
                </Button>
                <Button onClick={openSignUp}>Sign Up</Button>
              </>
            )}
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
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium flex items-center gap-2">
                    {isEmailVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Mail className="h-4 w-4 text-orange-500" />
                    )}
                    Signed in as {user.email}
                    {!isEmailVerified && (
                      <span className="text-orange-500 text-xs">(not verified)</span>
                    )}
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => {}}>
                    My Bookings
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => {}}>
                    Profile
                  </Button>
                  <Button className="w-full" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" onClick={openSignIn}>
                    Sign In
                  </Button>
                  <Button className="w-full" onClick={openSignUp}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={authDialogOpen} 
        onClose={() => setAuthDialogOpen(false)} 
        initialTab={authDialogTab} 
      />
    </header>
  );
};

export default Navbar;
