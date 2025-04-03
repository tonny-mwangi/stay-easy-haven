
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Property = {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image_url: string;
};

// Fallback properties data
const fallbackProperties = [
  {
    id: 1,
    name: "Luxury Ocean View Villa",
    location: "Malibu, CA",
    price: 350,
    rating: 4.9,
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Downtown Loft",
    location: "New York, NY",
    price: 200,
    rating: 4.7,
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: 275,
    rating: 4.8,
    image_url: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Beachfront Bungalow",
    location: "Miami, FL",
    price: 320,
    rating: 4.5,
    image_url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Historic City Apartment",
    location: "Paris, France",
    price: 230,
    rating: 4.6,
    image_url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Lakeside Cottage",
    location: "Lake Tahoe, CA",
    price: 190,
    rating: 4.4,
    image_url: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
];

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(6);
        
        if (error) {
          console.error('Error fetching properties:', error);
          // Show toast notification
          toast.error("Couldn't load properties from database", {
            description: "Using sample properties instead",
          });
          // Use fallback data
          setProperties(fallbackProperties);
        } else if (data && data.length > 0) {
          setProperties(data as Property[]);
        } else {
          // If no data or empty array, use fallback
          console.log("No properties found in database, using fallback data");
          setProperties(fallbackProperties);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties(fallbackProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-4 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 overflow-hidden">
            <img 
              src={property.image_url} 
              alt={property.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{property.name}</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{property.rating}</span>
              </div>
            </div>
            <div className="flex items-center mt-2 text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <span className="font-bold">${property.price}<span className="text-gray-500 font-normal text-sm">/night</span></span>
            <button className="text-primary hover:underline text-sm font-medium">View Details</button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedProperties;
