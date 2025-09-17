import { useRef, ReactNode, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

interface RenderCounterProps {
  componentName: string;
  children?: ReactNode;
  orientation?: "horizontal" | "vertical";
}

const RenderCounter = ({
  componentName,
  children,
  orientation = "vertical",
}: RenderCounterProps) => {
  const renderCount = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: number;
    if (renderCount.current > 1) {
      cardRef.current?.classList.add("ring-red-300", "ring-3");
      timeout = setTimeout(() => cardRef.current?.classList.remove("ring-red-600", "ring-3"), 500);
    }
    renderCount.current += 1;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  });

  return (
    <div className="mb-6">
      <Card
        ref={cardRef}
        className={cn("border-2 duration-1000 border-dashed border-gray-200", {
          "flex flex-row items-center": orientation === "horizontal",
        })}
      >
        <CardHeader className="pb-2 p-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Badge className="h-6 w-6 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
              {renderCount.current}
            </Badge>
            {componentName}
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("p-4", { "pt-0": orientation === "vertical" })}>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default RenderCounter;
