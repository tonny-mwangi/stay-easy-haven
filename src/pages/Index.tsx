
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";
import FeaturedProperties from "@/components/FeaturedProperties";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [guests, setGuests] = useState(1);

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
                  <Input 
                    placeholder="Where are you going?" 
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="md:w-1/4 relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Check-in - Check-out" 
                    className="pl-10 h-12"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  />
                </div>
                <div className="md:w-1/6 relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="number" 
                    placeholder="Guests"
                    min={1}
                    className="pl-10 h-12"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  />
                </div>
                <Button className="h-12 px-6" size="lg">
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
              {['New York', 'Paris', 'Tokyo', 'London', 'Rome', 'Sydney'].map((city) => (
                <Card key={city} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gray-300 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <h3 className="text-white text-xl font-bold">{city}</h3>
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
