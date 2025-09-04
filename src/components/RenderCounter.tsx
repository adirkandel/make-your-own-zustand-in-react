import { useRef, useEffect, ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface RenderCounterProps {
  componentName: string;
  children?: ReactNode;
}

const RenderCounter = ({ componentName, children }: RenderCounterProps) => {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div className="relative mb-6">
      <Badge 
        className="absolute top-0 right-0 z-10 h-6 w-6 flex items-center justify-center rounded-full bg-red-500 text-white font-bold"
      >
        {renderCount.current}
      </Badge>
      <Card className="border-2 border-dashed border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{componentName}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default RenderCounter;
