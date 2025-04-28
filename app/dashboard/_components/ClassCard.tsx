import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ClassCardProps {
  title?: string;
  subject?: string;
  progress?: number;
}

export const ClassCard = ({ 
  title = "Class Title", 
  subject = "Subject", 
  progress = 0 
}: ClassCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white">
      <div className="h-32 bg-gray-100 rounded-md mb-3" />
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{subject}</p>
      <Progress value={progress} className="h-1 bg-gray-200" />
    </Card>
  );
};
