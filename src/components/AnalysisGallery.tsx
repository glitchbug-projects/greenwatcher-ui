
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GalleryItem {
  id: string;
  imageUrl: string;
  disease: string;
  date: string;
  confidence: number;
}

interface AnalysisGalleryProps {
  items: GalleryItem[];
  className?: string;
}

const AnalysisGallery: React.FC<AnalysisGalleryProps> = ({ items, className }) => {
  // Placeholder items if none provided
  const galleryItems = items.length > 0 ? items : [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=500',
      disease: 'Powdery Mildew',
      date: '2 days ago',
      confidence: 0.94
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1620127682229-33388276e540?auto=format&fit=crop&q=80&w=500',
      disease: 'Leaf Rust',
      date: '1 week ago',
      confidence: 0.87
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1599685315640-4a8c1d109fe9?auto=format&fit=crop&q=80&w=500',
      disease: 'Healthy Plant',
      date: '2 weeks ago',
      confidence: 0.92
    }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Recent Analyses</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group transition-all duration-300 hover:shadow-md">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={item.imageUrl}
                alt={item.disease}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex justify-between items-center">
                  <Badge className="bg-white/90 text-gray-800 hover:bg-white/80">
                    {item.disease}
                  </Badge>
                  <span className="text-white text-xs">{item.date}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Confidence</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(item.confidence * 100)}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalysisGallery;
