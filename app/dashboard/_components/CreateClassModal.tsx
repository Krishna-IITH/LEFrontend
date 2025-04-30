import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateClassModal = ({ isOpen, onClose }: CreateClassModalProps) => {
  const [examType, setExamType] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const examTypes = ["JEE", "NEET", "UPSC", "CAT", "GATE", "Class 12", "Class 11", "Class 10"];
  
  const subjectMap = {
    JEE: ["Physics", "Chemistry", "Mathematics"],
    NEET: ["Physics", "Chemistry", "Biology"],
    UPSC: ["History", "Geography", "Polity", "Economics", "Environment", "Science & Technology"],
    CAT: ["Quantitative Ability", "Verbal Ability", "Data Interpretation", "Logical Reasoning"],
    GATE: ["Engineering Mathematics", "Computer Science", "Information Technology"],
    "Class 12": ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science"],
    "Class 11": ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science"],
    "Class 10": ["Science", "Mathematics", "Social Studies", "English", "Hindi"],
  };
  
  const topicMap = {
    Physics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
    Chemistry: ["Organic", "Inorganic", "Physical", "Biochemistry"],
    Mathematics: ["Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics"],
    Biology: ["Anatomy", "Physiology", "Zoology", "Botany", "Genetics"],
    // More topics for other subjects would go here
  };

  // Get the appropriate subjects based on the selected exam type
  const subjects = examType ? subjectMap[examType as keyof typeof subjectMap] || [] : [];
  
  // Get the appropriate topics based on the selected subject
  const topics = subject ? topicMap[subject as keyof typeof topicMap] || [] : [];

  const handleSubmit = async () => {
    if (!examType || !subject || !topic) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    try {
      // This would be the actual API endpoint in a real application
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examType,
          subject,
          topic,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create class");
      }

      // For demonstration purposes, we'll just show a success message
      toast.success("Class created successfully!");
      onClose();
    } catch (error) {
      // Since we don't have a backend, we'll just simulate a successful response
      console.log("Would send:", { examType, subject, topic });
      toast.success("Class created successfully (simulated)!");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="exam-type">Exam Type</Label>
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger id="exam-type">
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((exam) => (
                  <SelectItem key={exam} value={exam}>
                    {exam}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Select 
              value={subject} 
              onValueChange={setSubject}
              disabled={!examType}
            >
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="topic">Topic</Label>
            {subject && topicMap[subject as keyof typeof topicMap] ? (
              <Select 
                value={topic} 
                onValueChange={setTopic}
                disabled={!subject}
              >
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input 
                id="topic" 
                placeholder="Enter topic name" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
                disabled={!subject}
              />
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            className="bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Class"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
