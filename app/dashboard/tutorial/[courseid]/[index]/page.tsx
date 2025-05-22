"use client";
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, 
  ArrowRight,
  ArrowLeft as PrevSlide, 
  ArrowRight as NextSlide,
  Captions, 
  CaptionsOff,
  Fullscreen,
  Minimize
} from "lucide-react";
import { BrowserRouter } from 'react-router-dom';

import LanguageSelector, { INDIAN_LANGUAGES } from "../../_components/LanguageSelector";
import SlideContent from "../../_components/SlideContent";
import TutorialAudio from "../../_components/TutorialAudio";

const TutorialView = () => {
  const { id = "1", tutorialId = "0" } = useParams();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState("");
  const [showCaptions, setShowCaptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(INDIAN_LANGUAGES[0].code);
  
  // Mock tutorial data with slides instead of video
  const tutorial = {
    title: "Understanding Key Concepts",
    subject: id === "1" ? "Mathematics" : id === "2" ? "Physics" : id === "3" ? "Organic Chemistry" : "Biology",
    topic: id === "1" ? "Algebra" : id === "2" ? "Mechanics" : id === "3" ? "Organic Chemistry" : "Anatomy",
    slides: [
      { 
        id: 1, 
        imageUrl: "/lovable-uploads/e16f8762-b917-4476-b969-5c6888160c7d.png",
        content: "Welcome to this introduction to key concepts in " + 
                (id === "1" ? "Algebra" : id === "2" ? "Mechanics" : id === "3" ? "Organic Chemistry" : "Anatomy"),
        audioUrl: "/audio/slide1.mp3"
      },
      { 
        id: 2, 
        imageUrl: "/lovable-uploads/aae89a4e-f701-430d-827b-8dd055210771.png",
        content: "Let's explore the fundamental principles that govern this field of study.",
        audioUrl: "/audio/slide2.mp3"
      },
      { 
        id: 3, 
        imageUrl: "/lovable-uploads/8c14131c-3195-48e5-b75a-cb05bde2928e.png",
        content: "Understanding these core concepts will help you build a strong foundation for more advanced topics.",
        audioUrl: "/audio/slide3.mp3"
      }
    ],
    transcriptText: "This tutorial introduces key concepts in mathematics, focusing on algebraic fundamentals. We'll explore the basic principles that govern algebraic operations and help you build a strong foundation for more advanced topics. Understanding these core concepts is essential for solving complex problems."
  };

  // Handle fullscreen mode
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        toast({
          title: "Fullscreen Error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive"
        });
      });
    } else {
      document.exitFullscreen();
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < tutorial.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setIsPlaying(true); // Auto-play audio for the next slide
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setIsPlaying(true); // Auto-play audio for the previous slide
    }
  };

  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    // Optional: Auto-advance to next slide when audio finishes
    // goToNextSlide();
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    toast({
      title: "Language Changed",
      description: `Audio language switched to ${INDIAN_LANGUAGES.find(l => l.code === languageCode)?.name}`,
    });
  };

  const saveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully.",
    });
  };

  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link to={`/course/${id}`} className="text-purple-600 hover:underline flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Course
            </Link>
            <h1 className="text-2xl font-bold mt-2">{tutorial.title}</h1>
            <p className="text-gray-600">{tutorial.subject} - {tutorial.topic}</p>
          </div>
          <div className="flex space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <span className="mr-2">Transcript</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Slides Transcript</SheetTitle>
                </SheetHeader>
                <div className="mt-6 text-gray-700">
                  <p className="mb-4">{tutorial.transcriptText}</p>
                </div>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <span className="mr-2">Notes</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Notes</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Textarea 
                    className="min-h-[300px]" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes here..."
                  />
                  <Button 
                    className="mt-4 bg-purple-600 hover:bg-purple-700 w-full" 
                    onClick={saveNotes}
                  >
                    Save Notes
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Card 
          className={`flex-1 flex flex-col overflow-hidden border-0 shadow-lg ${isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}
          ref={playerRef}
        >
          <div className="relative flex-1">
            <div className="w-full h-full relative">
              {tutorial.slides.map((slide, index) => (
                <SlideContent
                  key={slide.id}
                  slide={slide}
                  isActive={currentSlideIndex === index}
                  language={selectedLanguage}
                />
              ))}
              
              {showCaptions && (
                <div className="absolute bottom-16 left-0 right-0 bg-black bg-opacity-75 text-white py-3 px-6 mx-auto max-w-3xl rounded-lg">
                  <p className="text-center">{tutorial.slides[currentSlideIndex].content}</p>
                </div>
              )}
            </div>
          </div>
          <CardContent className="border-t border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm text-gray-500 min-w-[40px]">
                {currentSlideIndex + 1}/{tutorial.slides.length}
              </span>
              <div className="flex-1">
                <Progress value={((currentSlideIndex + 1) / tutorial.slides.length) * 100} className="h-2" />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <TutorialAudio
                  audioUrl={tutorial.slides[currentSlideIndex].audioUrl}
                  isPlaying={isPlaying}
                  onPlayPause={togglePlayPause}
                  onEnded={handleAudioEnded}
                  language={selectedLanguage}
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={goToPreviousSlide}
                  disabled={currentSlideIndex === 0}
                  className="hover:bg-purple-100"
                >
                  <PrevSlide className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={goToNextSlide}
                  disabled={currentSlideIndex === tutorial.slides.length - 1}
                  className="hover:bg-purple-100"
                >
                  <NextSlide className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleCaptions}
                  aria-label={showCaptions ? "Hide captions" : "Show captions"}
                  className={showCaptions ? "bg-purple-100" : "hover:bg-purple-100"}
                >
                  {showCaptions ? <CaptionsOff className="h-4 w-4" /> : <Captions className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  className="hover:bg-purple-100"
                >
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Fullscreen className="h-4 w-4" />}
                </Button>
              </div>
              
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div></BrowserRouter>
  );
};

export default TutorialView;