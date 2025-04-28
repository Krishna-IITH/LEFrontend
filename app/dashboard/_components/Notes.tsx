import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

export const Notes = () => {
  const notes = [
    { title: "Physics Notes", subject: "Mechanics", lastUpdated: "2025-04-28" },
    { title: "Chemistry Notes", subject: "Organic Chemistry", lastUpdated: "2025-04-27" },
    { title: "Mathematics Notes", subject: "Algebra", lastUpdated: "2025-04-26" },
    { title: "Biology Notes", subject: "Anatomy", lastUpdated: "2025-04-25" },
    { title: "English Notes", subject: "Literature", lastUpdated: "2025-04-24" },
    { title: "Physics Notes 2", subject: "Thermodynamics", lastUpdated: "2025-04-23" },
    { title: "Chemistry Notes 2", subject: "Inorganic", lastUpdated: "2025-04-22" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {notes.map((note, index) => (
        <Card key={index} className="p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white">
          <div className="h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="font-medium text-lg">{note.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{note.subject}</p>
          <p className="text-sm text-gray-500">Last updated: {note.lastUpdated}</p>
        </Card>
      ))}
    </div>
  );
};
