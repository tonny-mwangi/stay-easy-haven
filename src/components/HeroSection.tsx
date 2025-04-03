
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative bg-gray-900 h-[500px]">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Hero content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Find your perfect stay with EliteStays
          </h1>
          <p className="mt-4 text-xl text-white opacity-90">
            Discover the best hotels and BnBs for your next adventure, with exclusive deals and unbeatable comfort.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8">
              Browse Properties
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
