
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Decorative element */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-leaf-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-leaf-200 rounded-full blur-3xl opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-leaf-100 text-leaf-800 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              AI-Powered
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Plant Disease <br />
            <span className="text-leaf-600">Detection</span> <span className="text-gray-900">& Classification</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Upload a photo of your plant and our AI will analyze it to detect diseases, 
            providing you with insights for healthier plants.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="bg-leaf-600 hover:bg-leaf-700 text-white px-8">
              Start Analyzing
            </Button>
            <Button size="lg" variant="outline" className="border-leaf-200 text-leaf-800 hover:bg-leaf-50">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
