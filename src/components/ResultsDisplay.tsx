import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface ResultItem {
  disease: string;
  confidence: number;
  description?: string;
  treatment?: string;
}

interface ResultsDisplayProps {
  results: ResultItem[] | null;
  isVisible: boolean;
  className?: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  results, 
  isVisible,
  className 
}) => {
  if (!isVisible || !results || results.length === 0) return null;

  // Sort results by confidence
  const sortedResults = [...results].sort((a, b) => b.confidence - a.confidence);
  
  // Get the highest confidence result
  const primaryResult = sortedResults[0];
  const otherResults = sortedResults.slice(1);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.5) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-600';
    if (confidence >= 0.5) return 'bg-amber-600';
    return 'bg-red-600';
  };

  return (
    <div className={cn(
      "grid gap-6 opacity-0 translate-y-4 transition-all duration-500",
      isVisible && "opacity-100 translate-y-0",
      className
    )}>
      {/* Primary result card */}
      <Card className="overflow-hidden border border-leaf-100">
        <div className="h-2 bg-leaf-500 w-full" />
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-leaf-50 text-leaf-800 border-leaf-200">
                  Primary Detection
                </Badge>
                {primaryResult.confidence > 0.7 && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    High Confidence
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl font-bold">{primaryResult.disease}</CardTitle>
            </div>
            <div className="text-right">
              <span className={cn(
                "text-2xl font-bold",
                getConfidenceColor(primaryResult.confidence)
              )}>
                {Math.round(primaryResult.confidence * 100)}%
              </span>
              <p className="text-xs text-gray-500">confidence</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {primaryResult.description && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Description</h4>
              <p className="text-gray-600">{primaryResult.description}</p>
            </div>
          )}
          
          {primaryResult.treatment && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Recommended Treatment</h4>
              <p className="text-gray-600">{primaryResult.treatment}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Other possibilities */}
      {otherResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Other Possibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {otherResults.map((result, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{result.disease}</span>
                    <span className={cn(
                      "text-sm font-medium",
                      getConfidenceColor(result.confidence)
                    )}>
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={result.confidence * 100} 
                    className="h-2"
                    indicatorClassName={getProgressColor(result.confidence)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsDisplay;
