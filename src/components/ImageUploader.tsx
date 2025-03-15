
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageSelected: (image: File) => void;
  isProcessing: boolean;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelected, 
  isProcessing, 
  className 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const processFile = useCallback((file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive"
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Pass file to parent
    onImageSelected(file);
  }, [onImageSelected, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleReset = () => {
    setPreviewUrl(null);
  };

  return (
    <Card className={cn(
      "w-full transition-all duration-300 ease-in-out animate-fade-up",
      className
    )}>
      <CardContent className="p-6">
        <div
          className={cn(
            "dropzone border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ease-in-out",
            isDragging ? "dropzone-active bg-leaf-50 border-leaf-400" : "border-gray-200 hover:border-leaf-300",
            isProcessing ? "opacity-75" : ""
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="space-y-6">
              <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden image-reveal shadow-md">
                <img 
                  src={previewUrl} 
                  alt="Plant preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isProcessing}
                  className="border-leaf-200 text-leaf-800 hover:bg-leaf-50"
                >
                  Choose Another Image
                </Button>
                <Button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => onImageSelected(new File([], ""))} // This would be already passed but we're triggering the analysis
                  className="bg-leaf-600 hover:bg-leaf-700 text-white"
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      Analyzing<span className="loading-dots"></span>
                    </span>
                  ) : (
                    "Analyze Image"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-20 h-20 bg-leaf-100 rounded-full mx-auto flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 text-leaf-600"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Upload Plant Image
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Drag and drop an image here, or click to select a file
                </p>
              </div>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isProcessing}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('fileInput')?.click()}
                disabled={isProcessing}
                className="mt-2"
              >
                Select File
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
