
import React, { useState } from 'react';
import Layout, { Section } from '@/components/Layout';
import Hero from '@/components/Hero';
import ImageUploader from '@/components/ImageUploader';
import ResultsDisplay, { ResultItem } from '@/components/ResultsDisplay';
import AnalysisGallery from '@/components/AnalysisGallery';
import AboutSection from '@/components/AboutSection';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleImageSelected = async (image: File) => {
    if (!image.size) return; // Skip if it's our dummy file for demo
    
    setIsProcessing(true);
    setShowResults(false);
    
    // Simulate API call to your Python backend
    try {
      // In a real implementation, you would upload the image to your Python backend
      // const formData = new FormData();
      // formData.append('image', image);
      // const response = await fetch('http://your-python-api/predict', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // setResults(data.results);

      // For demonstration, we'll use mock data after a delay
      setTimeout(() => {
        const mockResults: ResultItem[] = [
          { 
            disease: 'Tomato Late Blight',
            confidence: 0.92,
            description: 'Late blight is a disease that affects tomato and potato plants. It is caused by the fungus-like oomycete pathogen Phytophthora infestans.',
            treatment: 'Remove and destroy infected plants. Apply fungicides as a preventive measure. Ensure proper spacing between plants for good air circulation.'
          },
          { disease: 'Tomato Early Blight', confidence: 0.05 },
          { disease: 'Tomato Healthy', confidence: 0.02 },
          { disease: 'Tomato Septoria Leaf Spot', confidence: 0.01 }
        ];
        
        setResults(mockResults);
        setIsProcessing(false);
        
        // Delay showing results for a nicer animation effect
        setTimeout(() => {
          setShowResults(true);
        }, 300);
        
        toast({
          title: "Analysis Complete",
          description: "We've analyzed your plant image and identified potential diseases.",
        });
      }, 2500);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setIsProcessing(false);
      toast({
        title: "Error Analyzing Image",
        description: "There was a problem analyzing your image. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <Hero />
      
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Upload an Image for Analysis
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Upload a clear photo of your plant's leaves or stems for the most accurate results.
            </p>
          </div>
          
          <ImageUploader 
            onImageSelected={handleImageSelected}
            isProcessing={isProcessing}
          />
          
          <ResultsDisplay 
            results={results}
            isVisible={showResults}
          />
        </div>
      </Section>
      
      <Section className="bg-gray-50">
        <AnalysisGallery items={[]} />
      </Section>
      
      <Section>
        <AboutSection />
      </Section>
      
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Plant Disease Detector. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
