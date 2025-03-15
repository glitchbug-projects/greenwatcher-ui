
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
    <CardContent className="p-6 space-y-4">
      <div className="w-12 h-12 rounded-full bg-leaf-100 flex items-center justify-center text-leaf-600">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
          <line x1="2" y1="20" x2="2" y2="20"></line>
        </svg>
      ),
      title: "AI-Powered Detection",
      description: "Our system uses advanced machine learning models to accurately identify plant diseases from images."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
      title: "High Accuracy",
      description: "Our model is trained on thousands of plant images to ensure precise disease recognition."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
          <path d="m7 16.5-4.74-2.85"></path>
          <path d="m7 16.5 5-3"></path>
          <path d="M7 16.5v5.17"></path>
          <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
          <path d="m17 16.5-5-3"></path>
          <path d="m17 16.5 4.74-2.85"></path>
          <path d="M17 16.5v5.17"></path>
          <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
          <path d="M12 8 7.26 5.15"></path>
          <path d="m12 8 4.74-2.85"></path>
          <path d="M12 13.5V8"></path>
        </svg>
      ),
      title: "YOLO Detection",
      description: "Using YOLO (You Only Look Once) for real-time object detection to identify and locate diseased areas on plants."
    }
  ];

  return (
    <div className={cn("space-y-12", className)}>
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">How It Works</h2>
        <p className="text-xl text-gray-600">
          Our cutting-edge technology helps you identify plant diseases quickly and accurately,
          providing treatment recommendations to keep your plants healthy.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      
      <div className="bg-leaf-50 rounded-2xl p-8 border border-leaf-100">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Information</h3>
          <p className="text-gray-600 mb-6">
            Our system uses a combination of PyTorch and YOLO (You Only Look Once) to provide 
            accurate plant disease detection and classification. The model is trained on a dataset 
            of thousands of plant images to recognize various diseases across different plant species.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-black text-white hover:bg-black/90 px-3 py-1 rounded-full">PyTorch</Badge>
            <Badge className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded-full">Python</Badge>
            <Badge className="bg-green-600 text-white hover:bg-green-700 px-3 py-1 rounded-full">YOLO</Badge>
            <Badge className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-1 rounded-full">Deep Learning</Badge>
            <Badge className="bg-amber-600 text-white hover:bg-amber-700 px-3 py-1 rounded-full">Computer Vision</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing Badge component, so defining a simple one
const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export default AboutSection;
