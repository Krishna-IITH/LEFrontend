import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Motivation = () => {
  const quotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      quote: "Education is not preparation for life; education is life itself.",
      author: "John Dewey"
    },
    {
      quote: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King"
    },
    {
      quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      author: "Dr. Seuss"
    },
    {
      quote: "The expert in anything was once a beginner.",
      author: "Helen Hayes"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {quotes.map((item, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white">
          <p className="text-lg font-medium mb-4 text-gray-800">"{item.quote}"</p>
          <p className="text-sm text-gray-500">- {item.author}</p>
        </Card>
      ))}
    </div>
  );
};
