"use client";
import { useState } from "react";
import { 
  Clock, Award, BarChart, BookOpen, 
  Check, X, AlertCircle, ArrowRight, 
  FileText, Sparkles, BrainCircuit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
// import AppLayout from "@/components/AppLayout";

// Mock test categories
const TEST_CATEGORIES = [
  { id: "physics", name: "Physics", count: 24 },
  { id: "chemistry", name: "Chemistry", count: 32 },
  { id: "mathematics", name: "Mathematics", count: 28 },
  { id: "biology", name: "Biology", count: 35 },
];

// Example mock tests
const MOCK_TESTS = [
  {
    id: 1,
    title: "Motion & Force Test",
    category: "physics",
    questionsCount: 30,
    timeMinutes: 45,
    difficulty: "Moderate",
    progress: 0,
  },
  {
    id: 2,
    title: "Organic Chemistry Basics",
    category: "chemistry",
    questionsCount: 25,
    timeMinutes: 40,
    difficulty: "Easy",
    progress: 0,
  },
  {
    id: 3,
    title: "Calculus Fundamentals",
    category: "mathematics",
    questionsCount: 20,
    timeMinutes: 30,
    difficulty: "Hard",
    progress: 0,
  },
  {
    id: 4,
    title: "Cell Biology & Genetics",
    category: "biology",
    questionsCount: 35,
    timeMinutes: 50,
    difficulty: "Moderate",
    progress: 0,
  },
  {
    id: 5,
    title: "Electromagnetism",
    category: "physics",
    questionsCount: 25,
    timeMinutes: 40,
    difficulty: "Hard",
    progress: 0,
  },
  {
    id: 6,
    title: "Periodic Table & Elements",
    category: "chemistry",
    questionsCount: 30,
    timeMinutes: 45,
    difficulty: "Moderate",
    progress: 0,
  }
];

// Example questions for the active test
const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: "What is the SI unit of force?",
    options: [
      { id: "a", text: "Watt" },
      { id: "b", text: "Newton" },
      { id: "c", text: "Joule" },
      { id: "d", text: "Pascal" },
    ],
    correctAnswer: "b",
    explanation: "The SI unit of force is the Newton (N), which is defined as the force needed to accelerate a mass of one kilogram at a rate of one meter per second squared."
  },
  {
    id: 2,
    question: "Which of the following is NOT a vector quantity?",
    options: [
      { id: "a", text: "Displacement" },
      { id: "b", text: "Velocity" },
      { id: "c", text: "Speed" },
      { id: "d", text: "Acceleration" },
    ],
    correctAnswer: "c",
    explanation: "Speed is a scalar quantity because it only has magnitude, not direction. Displacement, velocity, and acceleration are all vector quantities because they have both magnitude and direction."
  },
  {
    id: 3,
    question: "If a body is moving with uniform velocity, what is the net force acting on it?",
    options: [
      { id: "a", text: "Depends on the mass of the body" },
      { id: "b", text: "Equal to the product of mass and velocity" },
      { id: "c", text: "Zero" },
      { id: "d", text: "Equal to the weight of the body" },
    ],
    correctAnswer: "c",
    explanation: "According to Newton's First Law of Motion, a body continues to move with uniform velocity (or remains at rest) unless acted upon by an external force. So if a body is moving with uniform velocity, the net force acting on it must be zero."
  }
];

// Completed test results
const COMPLETED_TESTS = [
  {
    id: 101,
    title: "Waves & Optics Test",
    date: "2025-04-12",
    score: 85,
    questionsCount: 30,
    timeMinutes: 45,
    timeTaken: 42,
  },
  {
    id: 102,
    title: "Inorganic Chemistry",
    date: "2025-04-10",
    score: 72,
    questionsCount: 25,
    timeMinutes: 40,
    timeTaken: 38,
  },
  {
    id: 103,
    title: "Trigonometry",
    date: "2025-04-05",
    score: 90,
    questionsCount: 20,
    timeMinutes: 30,
    timeTaken: 28,
  },
];

type TestStatus = "listing" | "instructions" | "testing" | "review";

export default function MockTests() {
  const [activeTab, setActiveTab] = useState<string>("topic-wise");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<TestStatus>("listing");
  const [activeTest, setActiveTest] = useState<typeof MOCK_TESTS[0] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds

  const filteredTests = activeCategory 
    ? MOCK_TESTS.filter(test => test.category === activeCategory)
    : MOCK_TESTS;

  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];
  const isAnswered = !!selectedAnswers[currentQuestion?.id];
  const isCorrect = isAnswered && selectedAnswers[currentQuestion?.id] === currentQuestion?.correctAnswer;
  
  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };

  const handleStartTest = (test: typeof MOCK_TESTS[0]) => {
    setActiveTest(test);
    setTestStatus("instructions");
  };

  const handleBeginTest = () => {
    setTestStatus("testing");
    setTimeLeft((activeTest?.timeMinutes || 45) * 60);
    // In a real app, this would start a timer
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      setTestStatus("review");
      toast.success("Test completed! Let's review your answers.");
    }
  };

  const handleFinishReview = () => {
    setTestStatus("listing");
    setActiveTest(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    // <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mock Tests</h1>
        
        {testStatus === "listing" && (
          <>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="topic-wise">Topic-wise Tests</TabsTrigger>
                <TabsTrigger value="full-length">Full-length Tests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="topic-wise" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>Categories</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-1">
                          <Button
                            variant={activeCategory === null ? "default" : "ghost"}
                            className={`w-full justify-start ${activeCategory === null ? 'bg-learneasy-purple hover:bg-learneasy-purple/90' : ''}`}
                            onClick={() => setActiveCategory(null)}
                          >
                            All Categories
                          </Button>
                          
                          {TEST_CATEGORIES.map((category) => (
                            <Button
                              key={category.id}
                              variant={activeCategory === category.id ? "default" : "ghost"}
                              className={`w-full justify-start ${activeCategory === category.id ? 'bg-learneasy-purple hover:bg-learneasy-purple/90' : ''}`}
                              onClick={() => setActiveCategory(category.id)}
                            >
                              {category.name}
                              <span className="ml-auto bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-0.5">
                                {category.count}
                              </span>
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredTests.map((test) => (
                        <Card key={test.id} className="learneasy-card overflow-hidden h-full">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle>{test.title}</CardTitle>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                test.difficulty === "Easy" 
                                  ? "bg-green-100 text-green-800" 
                                  : test.difficulty === "Moderate"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {test.difficulty}
                              </span>
                            </div>
                            <CardDescription>
                              {TEST_CATEGORIES.find(cat => cat.id === test.category)?.name}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex gap-4 text-sm">
                              <div className="flex items-center gap-1.5">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>{test.questionsCount} questions</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{test.timeMinutes} minutes</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full bg-learneasy-purple hover:bg-learneasy-purple/90"
                              onClick={() => handleStartTest(test)}
                            >
                              Start Test
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="full-length" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="learneasy-card overflow-hidden h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>JEE Main Full Mock Test</CardTitle>
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">Hard</span>
                      </div>
                      <CardDescription>
                        Complete syllabus coverage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>90 questions</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>180 minutes</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Physics</span>
                          <span>30 questions</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Chemistry</span>
                          <span>30 questions</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Mathematics</span>
                          <span>30 questions</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-learneasy-purple hover:bg-learneasy-purple/90"
                      >
                        Start Full Test
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="learneasy-card overflow-hidden h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>NEET Full Mock Test</CardTitle>
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">Hard</span>
                      </div>
                      <CardDescription>
                        Complete syllabus coverage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>180 questions</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>180 minutes</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Physics</span>
                          <span>45 questions</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Chemistry</span>
                          <span>45 questions</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Biology</span>
                          <span>90 questions</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-learneasy-purple hover:bg-learneasy-purple/90"
                      >
                        Start Full Test
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <h2 className="text-2xl font-bold mt-10 mb-6">Your Completed Tests</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {COMPLETED_TESTS.map((test) => (
                    <Card key={test.id} className="learneasy-card overflow-hidden h-full">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{test.title}</CardTitle>
                          <div className="flex items-center gap-1">
                            <Award className={`h-5 w-5 ${
                              test.score >= 85 ? 'text-yellow-500' : 
                              test.score >= 70 ? 'text-blue-500' : 'text-gray-500'
                            }`} />
                            <span className="font-bold text-lg">{test.score}%</span>
                          </div>
                        </div>
                        <CardDescription>
                          Completed on {new Date(test.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-1.5">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{test.questionsCount} questions</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{test.timeTaken} min</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <span>Your score</span>
                              <span className="font-medium">{test.score}%</span>
                            </div>
                            <Progress value={test.score} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button variant="outline">Review</Button>
                          <Button className="bg-learneasy-purple hover:bg-learneasy-purple/90">Retry</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
        
        {testStatus === "instructions" && activeTest && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Test Instructions: {activeTest.title}</CardTitle>
              <CardDescription>
                Please read the following instructions carefully before starting the test.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-6">
                <div className="bg-muted p-4 rounded-lg flex items-center gap-3">
                  <FileText className="h-6 w-6 text-learneasy-purple" />
                  <div>
                    <p className="text-sm text-muted-foreground">Questions</p>
                    <p className="font-medium">{activeTest.questionsCount}</p>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg flex items-center gap-3">
                  <Clock className="h-6 w-6 text-learneasy-purple" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{activeTest.timeMinutes} minutes</p>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-learneasy-purple" />
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-medium">{activeTest.difficulty}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">Important Instructions:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Each question carries 4 marks for correct answer and -1 mark for incorrect answer.</li>
                  <li>You can review your answers before submitting the test.</li>
                  <li>Once the test time is up, the test will automatically be submitted.</li>
                  <li>Do not refresh the page during the test, or your progress will be lost.</li>
                  <li>This test has AI-powered explanations for each question.</li>
                  <li>After completing the test, you'll receive detailed performance analytics.</li>
                </ul>
              </div>
              
              <div className="bg-learneasy-soft-purple/30 p-4 rounded-lg">
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-learneasy-purple" />
                  Adaptive Testing
                </h3>
                <p className="text-sm">
                  This test uses AI to adapt to your performance. Questions will become progressively harder or easier based on your previous answers, helping you learn at your optimal pace.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setTestStatus("listing")}
              >
                Back to Tests
              </Button>
              <Button 
                className="bg-learneasy-purple hover:bg-learneasy-purple/90"
                onClick={handleBeginTest}
              >
                Begin Test
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {testStatus === "testing" && currentQuestion && (
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{activeTest?.title}</h2>
                <span className="text-sm bg-muted px-2 py-1 rounded-full">
                  Question {currentQuestionIndex + 1}/{SAMPLE_QUESTIONS.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
                <Clock className="h-4 w-4 text-learneasy-purple" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div 
                      key={option.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        showExplanation 
                          ? option.id === currentQuestion.correctAnswer
                            ? "bg-green-50 border-green-200"
                            : selectedAnswers[currentQuestion.id] === option.id
                              ? "bg-red-50 border-red-200"
                              : "border-transparent hover:bg-muted"
                          : selectedAnswers[currentQuestion.id] === option.id
                            ? "bg-learneasy-purple text-white"
                            : "border-muted hover:bg-muted"
                      }`}
                      onClick={() => !showExplanation && handleAnswerSelect(currentQuestion.id, option.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            showExplanation 
                              ? option.id === currentQuestion.correctAnswer
                                ? "bg-green-500 text-white"
                                : selectedAnswers[currentQuestion.id] === option.id
                                  ? "bg-red-500 text-white"
                                  : "bg-muted"
                              : selectedAnswers[currentQuestion.id] === option.id
                                ? "bg-white text-learneasy-purple"
                                : "bg-muted"
                          }`}
                        >
                          {showExplanation ? (
                            option.id === currentQuestion.correctAnswer ? (
                              <Check className="h-4 w-4" />
                            ) : selectedAnswers[currentQuestion.id] === option.id ? (
                              <X className="h-4 w-4" />
                            ) : (
                              option.id.toUpperCase()
                            )
                          ) : (
                            option.id.toUpperCase()
                          )}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {showExplanation && (
                  <div className="mt-6 p-4 bg-learneasy-soft-purple/30 rounded-lg">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                      <BrainCircuit className="h-5 w-5 text-learneasy-purple" />
                      AI Explanation
                    </h3>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {!showExplanation ? (
                  <Button 
                    variant="outline"
                    onClick={() => setShowExplanation(true)}
                    disabled={!isAnswered}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <div className="flex items-center">
                    {isCorrect ? (
                      <span className="text-green-600 font-medium flex items-center gap-1.5">
                        <Check className="h-4 w-4" />
                        Correct Answer!
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium flex items-center gap-1.5">
                        <X className="h-4 w-4" />
                        Incorrect Answer
                      </span>
                    )}
                  </div>
                )}
                
                <Button 
                  className="bg-learneasy-purple hover:bg-learneasy-purple/90"
                  onClick={handleNextQuestion}
                  disabled={!isAnswered}
                >
                  {currentQuestionIndex === SAMPLE_QUESTIONS.length - 1 ? "Finish Test" : "Next Question"}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-6 flex justify-center">
              <div className="flex gap-1.5">
                {SAMPLE_QUESTIONS.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${
                      index === currentQuestionIndex
                        ? "bg-learneasy-purple"
                        : selectedAnswers[SAMPLE_QUESTIONS[index].id]
                          ? "bg-green-500"
                          : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {testStatus === "review" && (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>
                  You've completed the test. Here's your performance summary.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 text-center p-6 bg-muted rounded-lg">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-learneasy-purple text-white flex items-center justify-center">
                      <span className="text-3xl font-bold">67%</span>
                    </div>
                    <h3 className="font-semibold">Your Score</h3>
                    <p className="text-sm text-muted-foreground">2 correct out of 3 questions</p>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>Correct Answers</span>
                        <span className="font-medium text-green-600">2 (67%)</span>
                      </div>
                      <Progress value={67} className="h-2 bg-muted" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>Incorrect Answers</span>
                        <span className="font-medium text-red-600">1 (33%)</span>
                      </div>
                      <Progress value={33} className="h-2 bg-muted" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>Time Utilized</span>
                        <span className="font-medium">2 min (out of 45 min)</span>
                      </div>
                      <Progress value={4} className="h-2 bg-muted" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-3">AI-Powered Suggestions</h3>
                  <div className="p-4 bg-learneasy-soft-purple/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <BrainCircuit className="h-5 w-5 text-learneasy-purple shrink-0 mt-1" />
                      <div>
                        <p className="mb-2">Based on your performance, here are some topics you should focus on:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Revise vector quantities vs. scalar quantities in physics</li>
                          <li>Strengthen your understanding of Newton's laws of motion</li>
                          <li>Practice more questions on force and its applications</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Recommended Videos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="learneasy-card overflow-hidden h-full">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" 
                          alt="Video thumbnail" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          15:32
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-sm">Vector and Scalar Quantities Explained</h3>
                      </CardContent>
                    </Card>
                    
                    <Card className="learneasy-card overflow-hidden h-full">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1636690581956-6f3e24cd54c3?q=80&w=1974&auto=format&fit=crop" 
                          alt="Video thumbnail" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          18:45
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-sm">Newton's Laws of Motion: Deep Dive</h3>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handleFinishReview}
                >
                  Back to Tests
                </Button>
                <Button 
                  className="bg-learneasy-purple hover:bg-learneasy-purple/90"
                >
                  View Detailed Analysis
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    // </AppLayout>
  );
}