
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressCardProps {
  title: string;
  value: number;
  max: number;
  unit?: string;
  description?: string;
  colorClass?: string;
}

const ProgressCard = ({
  title,
  value,
  max,
  unit = "",
  description,
  colorClass = "bg-primary"
}: ProgressCardProps) => {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{title}</h3>
            <span className="text-sm font-medium">
              {value}{unit} / {max}{unit}
            </span>
          </div>
          <Progress 
            value={percentage} 
            className={`h-2 [&>div]:${colorClass}`}
          />
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
