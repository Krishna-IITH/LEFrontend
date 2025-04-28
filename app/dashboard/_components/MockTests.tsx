import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const MockTests = () => {
  const mockTests = [
    { title: "Physics Test 1", subject: "Mechanics", progress: 0, dueDate: "2025-05-01" },
    { title: "Chemistry Test 1", subject: "Organic", progress: 0, dueDate: "2025-05-03" },
    { title: "Mathematics Test 1", subject: "Algebra", progress: 0, dueDate: "2025-05-05" },
    { title: "Biology Test 1", subject: "Anatomy", progress: 0, dueDate: "2025-05-07" },
    { title: "English Test 1", subject: "Literature", progress: 0, dueDate: "2025-05-09" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mockTests.map((test, index) => (
        <Card key={index} className="p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white">
          <div className="h-32 bg-gray-100 rounded-md mb-3" />
          <h3 className="font-medium text-lg">{test.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{test.subject}</p>
          <p className="text-sm text-gray-500 mb-2">Due: {test.dueDate}</p>
          <Progress value={test.progress} className="h-1 bg-gray-200" />
        </Card>
      ))}
    </div>
  );
};
