
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import FeaturedProperties from "@/components/FeaturedProperties";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const popularDestinations = [
  { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Tokyo', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'London', image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Rome', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Sydney', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const destinations = [
  "New York", "Paris", "Tokyo", "London", "Rome", "Sydney", 
  "Barcelona", "Dubai", "Singapore", "Amsterdam", "Hong Kong", "Bali"
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    console.log({
      destination: searchQuery,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests
    });
    // In a real app, we would navigate to search results or filter properties
    alert(`Searching for ${searchQuery} from ${checkInDate ? format(checkInDate, 'PP') : 'any date'} to ${checkOutDate ? format(checkOutDate, 'PP') : 'any date'} for ${guests} guests`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 py-8 -mt-16 relative z-10">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Select
                    onValueChange={setSearchQuery}
                    value={searchQuery}
                  >
                    <SelectTrigger className="pl-10 h-12">
                      <SelectValue placeholder="Where are you going?" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((destination) => (
                        <SelectItem key={destination} value={destination}>
                          {destination}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:w-1/4 flex">
                  {/* Check-in date picker */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left h-12 font-normal pl-10 relative",
                          !checkInDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="h-5 w-5 text-gray-400 absolute left-3" />
                        {checkInDate ? (
                          format(checkInDate, "PPP")
                        ) : (
                          <span>Check-in</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  {/* Check-out date picker */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left h-12 font-normal pl-10 relative ml-2",
                          !checkOutDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="h-5 w-5 text-gray-400 absolute left-3" />
                        {checkOutDate ? (
                          format(checkOutDate, "PPP")
                        ) : (
                          <span>Check-out</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                        disabled={(date) => 
                          date < new Date() || 
                          (checkInDate ? date <= checkInDate : false)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="md:w-1/6 relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Select
                    value={guests.toString()}
                    onValueChange={(value) => setGuests(parseInt(value))}
                  >
                    <SelectTrigger className="pl-10 h-12">
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="h-12 px-6" size="lg" onClick={handleSearch}>
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Featured Properties */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
          <FeaturedProperties />
        </div>
        
        {/* Popular Destinations */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularDestinations.map((destination) => (
                <Card key={destination.name} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gray-300 relative">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <h3 className="text-white text-xl font-bold">{destination.name}</h3>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
