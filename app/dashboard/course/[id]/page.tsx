"use client";
import { useState } from "react";
import { useParams, Link, BrowserRouter } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Video, FileText, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";
// Mock data for the course
const getCourseData = (id: string) => {
  // In a real app this would fetch from an API
  return {
    id,
    title: id === "1" ? "Mathematics" : id === "2" ? "Physics" : id === "3" ? "Chemistry" : id === "4" ? "Biology" : "English",
    subject: id === "1" ? "Algebra" : id === "2" ? "Mechanics" : id === "3" ? "Organic" : id === "4" ? "Anatomy" : "Literature",
    progress: id === "1" ? 75 : id === "2" ? 60 : id === "3" ? 45 : id === "4" ? 90 : 30,
    description: "This comprehensive course is designed to help students master the fundamental concepts and advanced topics to excel in their exams.",
    examType: "JEE",
    difficulty: "Advanced",
    duration: "12 Weeks",
    // instructor: "Prof. Sarah Johnson",
    instructor: "AI",
    topicTitle: ["Statistics and Probability", "Probability"],
    syllabus: [
      {
        title: "Statistics",
        topics: [
          "Calculation of mean for grouped and ungrouped data",
          "Calculation of median for grouped and ungrouped data",
          "Calculation of mode for grouped and ungrouped data",
          "Calculation of standard deviation for grouped and ungrouped data",
          "Calculation of variance for grouped and ungrouped data",
          "Calculation of mean deviation for grouped and ungrouped data"
        ],
        resources: [
          "Calculation of mean for grouped and ungrouped data",
          "Calculation of median for grouped and ungrouped data",
          "Calculation of mode for grouped and ungrouped data",
          "Calculation of standard deviation for grouped and ungrouped data",
          "Calculation of variance for grouped and ungrouped data",
          "Calculation of mean deviation for grouped and ungrouped data"
        ],
        tutorials: [
          "Calculation of mean for grouped and ungrouped data",
          "Calculation of median for grouped and ungrouped data",
          "Calculation of mode for grouped and ungrouped data",
          "Calculation of standard deviation for grouped and ungrouped data",
          "Calculation of variance for grouped and ungrouped data",
          "Calculation of mean deviation for grouped and ungrouped data"
        ]
      },
      {
        title: "Probability",
        topics: [
          "Probability of an event",
          "Addition theorem of probability",
          "Multiplication theorem of probability",
          "Bayes' theorem",
          "Probability distribution of a random variable"
        ],
        resources: [
          "Probability of an event",
          "Addition theorem of probability",
          "Multiplication theorem of probability",
          "Bayes' theorem",
          "Probability distribution of a random variable"
        ],
        tutorials: [
          "Probability of an event",
          "Addition theorem of probability",
          "Multiplication theorem of probability",
          "Bayes' theorem",
          "Probability distribution of a random variable"
        ]
      }
    ]
  };
};

const CourseDetail = () => {
  const { id = "1" } = useParams();
  const courseData = getCourseData(id);
  const [activeTab, setActiveTab] = useState("tutorials");

  const getSubjectImage = (subject: string) => {
    // Return appropriate image URL based on subject
    switch (subject.toLowerCase()) {
      case "mathematics":
        return "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=500";
      case "physics":
        return "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=500";
      case "chemistry":
        return "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=500";
      case "biology":
        return "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=500";
      case "english":
        return "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500";
      default:
        return "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500";
    }
  };

  const router = useRouter();
  // const handleViewDetails = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   router.push(`/dashboard/tutorial/${courseData.id}/${index}`);
  // };
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-50 flex w-full flex-col">
      <div className="container mx-auto px-6 py-8">
        <div 
          className="relative bg-cover bg-center rounded-lg p-8 mb-8 text-white"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${getSubjectImage(courseData.subject)})`,
            height: "250px"
          }}
        >
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold mb-2">{courseData.title}</h2>
                <p className="text-white/80">{courseData.subject} - {courseData.examType}</p>
              </div>
              <div className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium">
                {courseData.progress}% Complete
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4">About this Course</h3>
              <p className="text-gray-700">{courseData.description}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Card className="bg-gray-50 border-0 w-full md:w-auto">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Difficulty</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-lg font-semibold">{courseData.difficulty}</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-0 w-full md:w-auto">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Duration</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-lg font-semibold">{courseData.duration}</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-0 w-full md:w-auto">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Instructor</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-lg font-semibold">{courseData.instructor}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-gray-100">
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tutorials">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courseData.syllabus.flatMap((section) =>(
                  section.tutorials.map((tutorial, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                      <CardHeader>
                        <CardTitle className="text-lg">{tutorial}</CardTitle>
                        <p className="text-sm text-gray-500">{section.title}</p>
                      </CardHeader>
                      <CardContent className="pt-0 flex justify-between items-center">
                        <div className="flex items-center">
                          <Video className="mr-2 h-5 w-5 text-purple-600" />
                          <span>Interactive Tutorial</span>
                        </div>
                        {/* <Button onClick={)} className="btn btn-primary bg-purple-600 hover:bg-purple-700" size="sm" asChild>
                          Start
                        </Button> */}
                        <Button 
                          variant="outline" 
                          className="mt-2 cursor-pointer border-purple-300 hover:bg-purple-50 hover:text-purple-700 text-purple-700"
                          onClick={()=>router.push(`/dashboard/tutorial/${courseData.id}/${index}`)}
                        >Start
                        </Button>
                      </CardContent>
                    </Card>
                  )))
                )}
              </div>
              {/* <div className="mt-6">
                <Link to={`/tutorials/${courseData.id}`}>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    View All Tutorials <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div> */}
            </TabsContent>

            <TabsContent value="syllabus">
              <div className="space-y-6">
                {courseData.syllabus.map((section, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <CardTitle>{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <h4 className="font-medium mb-2">Topics:</h4>
                      <ul className="list-disc pl-5 mb-4">
                        {section.topics.map((topic, i) => (
                          <li key={i} className="mb-1">{topic}</li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        {/* <Button variant="outline" size="sm" asChild>
                          <Link to={`/dashboard/tutorials/${courseData.id}/${index}`}>
                            <Video className="mr-1 h-4 w-4" />
                            View Tutorials
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/resources/${courseData.id}/${index}`}>
                            <BookOpen className="mr-1 h-4 w-4" />
                            View Resources
                          </Link>
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courseData.syllabus.flatMap((section) => 
                  section.resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                      <CardHeader>
                        <CardTitle className="text-lg">{resource}</CardTitle>
                        <p className="text-sm text-gray-500">{section.title}</p>
                      </CardHeader>
                      <CardContent className="pt-0 flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-purple-600" />
                          <span>PDF Resource</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-600" asChild>
                          Coming Soon{/* <Link to={`/resource-view/${courseData.id}/${index}`}>
                            <ExternalLink className="h-4 w-4" /> 
                          </Link> */}
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
              {/* <div className="mt-6">
                <Link to={`/resources/${courseData.id}`}>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    View All Resources <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div></BrowserRouter>
  );
};

export default CourseDetail;