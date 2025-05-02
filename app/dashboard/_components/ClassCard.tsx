import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ClassCardProps {
  title?: string;
  subject?: string;
  progress?: number;
}

const getSubjectImage = (subject: string) => {
  // Return appropriate image URL based on subject
  switch (subject.toLowerCase()) {
    case "mathematics: algebra":
    case "mathematics: calculus":
      return "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=500";
    case "physics: mechanics":
    case "physics: thermodynamics":
      return "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=500";
    case "chemistry: organic":
    case "chemistry: inorganic":
      return "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=500";
    case "biology: anatomy":
    case "biology: zoology":
      return "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=500";
    case "english: literature":
      return "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500";
    default:
      return "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500";
  }
};

export const ClassCard = ({ 
  title = "Class Title", 
  subject = "Subject", 
  progress = 0 
}: ClassCardProps) => {
  const imageUrl = getSubjectImage(subject);

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white overflow-hidden">
      <div 
        className="h-32 rounded-md mb-3 bg-center bg-cover" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{subject}</p>
      <Progress value={progress} className="h-1 bg-gray-200" />
    </Card>
  );
};
