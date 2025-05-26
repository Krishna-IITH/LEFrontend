// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/components/ui/use-toast";
// import { 
//   ArrowLeft, 
//   ArrowRight,
//   ArrowLeft as PrevSlide, 
//   ArrowRight as NextSlide,
//   Captions, 
//   CaptionsOff,
//   Fullscreen,
//   Minimize
// } from "lucide-react";
// import { BrowserRouter } from 'react-router-dom';

// import LanguageSelector, { INDIAN_LANGUAGES } from "../../_components/LanguageSelector";
// import SlideContent from "../../_components/SlideContent";
// import TutorialAudio from "../../_components/TutorialAudio";

// const TutorialView = () => {
//   const { id = "1", tutorialId = "0" } = useParams();
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [notes, setNotes] = useState("");
//   const [showCaptions, setShowCaptions] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const playerRef = useRef<HTMLDivElement | null>(null);
//   const { toast } = useToast();
//   const [selectedLanguage, setSelectedLanguage] = useState(INDIAN_LANGUAGES[0].code);
  
//   // Mock tutorial data with slides instead of video
//   const tutorial = {
//     title: "Understanding Key Concepts",
//     subject: id === "1" ? "Mathematics" : id === "2" ? "Physics" : id === "3" ? "Organic Chemistry" : "Biology",
//     topic: id === "1" ? "Algebra" : id === "2" ? "Mechanics" : id === "3" ? "Organic Chemistry" : "Anatomy",
//     slides: [
//       { 
//         id: 1, 
//         // imageUrl: "/lovable-uploads/e16f8762-b917-4476-b969-5c6888160c7d.png",
//         content: "Welcome to this introduction to key concepts in " + 
//                 (id === "1" ? "Algebra" : id === "2" ? "Mechanics" : id === "3" ? "Organic Chemistry" : "Anatomy"),
//         audioUrl: "/audio/slide1.mp3"
//       },
//       { 
//         id: 2, 
//         // imageUrl: "/lovable-uploads/aae89a4e-f701-430d-827b-8dd055210771.png",
//         content: "Let's explore the fundamental principles that govern this field of study.",
//         audioUrl: "/audio/slide2.mp3"
//       },
//       { 
//         id: 3, 
//         // imageUrl: "/lovable-uploads/8c14131c-3195-48e5-b75a-cb05bde2928e.png",
//         content: "Understanding these core concepts will help you build a strong foundation for more advanced topics.",
//         audioUrl: "/audio/slide3.mp3"
//       }
//     ],
//     transcriptText: "This tutorial introduces key concepts in mathematics, focusing on algebraic fundamentals. We'll explore the basic principles that govern algebraic operations and help you build a strong foundation for more advanced topics. Understanding these core concepts is essential for solving complex problems."
//   };

//   // Handle fullscreen mode
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);
    
//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   const toggleFullscreen = () => {
//     if (!playerRef.current) return;
    
//     if (!document.fullscreenElement) {
//       playerRef.current.requestFullscreen().catch(err => {
//         toast({
//           title: "Fullscreen Error",
//           description: `Error attempting to enable fullscreen: ${err.message}`,
//           variant: "destructive"
//         });
//       });
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   const goToNextSlide = () => {
//     if (currentSlideIndex < tutorial.slides.length - 1) {
//       setCurrentSlideIndex(currentSlideIndex + 1);
//       setIsPlaying(true); // Auto-play audio for the next slide
//     }
//   };

//   const goToPreviousSlide = () => {
//     if (currentSlideIndex > 0) {
//       setCurrentSlideIndex(currentSlideIndex - 1);
//       setIsPlaying(true); // Auto-play audio for the previous slide
//     }
//   };

//   const toggleCaptions = () => {
//     setShowCaptions(!showCaptions);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleAudioEnded = () => {
//     setIsPlaying(false);
//     // Optional: Auto-advance to next slide when audio finishes
//     // goToNextSlide();
//   };

//   const handleLanguageChange = (languageCode: string) => {
//     setSelectedLanguage(languageCode);
//     toast({
//       title: "Language Changed",
//       description: `Audio language switched to ${INDIAN_LANGUAGES.find(l => l.code === languageCode)?.name}`,
//     });
//   };

//   const saveNotes = () => {
//     toast({
//       title: "Notes Saved",
//       description: "Your notes have been saved successfully.",
//     });
//   };

//   return (
//     <BrowserRouter>
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <Link to={`/dashboard/course/${id}`} className="text-purple-600 hover:underline flex items-center">
//               <ArrowLeft className="mr-1 h-4 w-4" /> Back to Course
//             </Link>
//             <h1 className="text-2xl font-bold mt-2">{tutorial.title}</h1>
//             <p className="text-gray-600">{tutorial.subject} - {tutorial.topic}</p>
//           </div>
//           <div className="flex space-x-2">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" className="flex items-center">
//                   <span className="mr-2">Transcript</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent>
//                 <SheetHeader>
//                   <SheetTitle>Slides Transcript</SheetTitle>
//                 </SheetHeader>
//                 <div className="mt-6 text-gray-700">
//                   <p className="mb-4">{tutorial.transcriptText}</p>
//                 </div>
//               </SheetContent>
//             </Sheet>
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" className="flex items-center">
//                   <span className="mr-2">Notes</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent>
//                 <SheetHeader>
//                   <SheetTitle>Your Notes</SheetTitle>
//                 </SheetHeader>
//                 <div className="mt-6">
//                   <Textarea 
//                     className="min-h-[300px]" 
//                     value={notes} 
//                     onChange={(e) => setNotes(e.target.value)}
//                     placeholder="Take notes here..."
//                   />
//                   <Button 
//                     className="mt-4 bg-purple-600 hover:bg-purple-700 w-full" 
//                     onClick={saveNotes}
//                   >
//                     Save Notes
//                   </Button>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>

//         <Card 
//           className={`flex-1 flex flex-col overflow-hidden border-0 shadow-lg ${isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}
//           ref={playerRef}
//         >
//           <div className="relative flex-1">
//             <div className="w-full h-full relative">
//               {tutorial.slides.map((slide, index) => (
//                 <SlideContent
//                   key={slide.id}
//                   slide={slide}
//                   isActive={currentSlideIndex === index}
//                   language={selectedLanguage}
//                 />
//               ))}
              
//               {showCaptions && (
//                 <div className="absolute bottom-16 left-0 right-0 bg-black bg-opacity-75 text-white py-3 px-6 mx-auto max-w-3xl rounded-lg">
//                   <p className="text-center">{tutorial.slides[currentSlideIndex].content}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//           <CardContent className="border-t border-gray-200 bg-white p-4">
//             <div className="mb-3 flex items-center gap-2">
//               <span className="text-sm text-gray-500 min-w-[40px]">
//                 {currentSlideIndex + 1}/{tutorial.slides.length}
//               </span>
//               <div className="flex-1">
//                 <Progress value={((currentSlideIndex + 1) / tutorial.slides.length) * 100} className="h-2" />
//               </div>
//             </div>
            
//             <div className="flex justify-between items-center">
//               <div className="flex items-center space-x-2">
//                 <TutorialAudio
//                   audioUrl={tutorial.slides[currentSlideIndex].audioUrl}
//                   isPlaying={isPlaying}
//                   onPlayPause={togglePlayPause}
//                   onEnded={handleAudioEnded}
//                   language={selectedLanguage}
//                 />
//                 <Button 
//                   variant="outline" 
//                   size="icon"
//                   onClick={goToPreviousSlide}
//                   disabled={currentSlideIndex === 0}
//                   className="hover:bg-purple-100"
//                 >
//                   <PrevSlide className="h-4 w-4" />
//                 </Button>
//                 <Button 
//                   variant="outline" 
//                   size="icon"
//                   onClick={goToNextSlide}
//                   disabled={currentSlideIndex === tutorial.slides.length - 1}
//                   className="hover:bg-purple-100"
//                 >
//                   <NextSlide className="h-4 w-4" />
//                 </Button>
//                 <Button 
//                   variant="outline" 
//                   size="icon"
//                   onClick={toggleCaptions}
//                   aria-label={showCaptions ? "Hide captions" : "Show captions"}
//                   className={showCaptions ? "bg-purple-100" : "hover:bg-purple-100"}
//                 >
//                   {showCaptions ? <CaptionsOff className="h-4 w-4" /> : <Captions className="h-4 w-4" />}
//                 </Button>
//                 <Button 
//                   variant="outline" 
//                   size="icon"
//                   onClick={toggleFullscreen}
//                   aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
//                   className="hover:bg-purple-100"
//                 >
//                   {isFullscreen ? <Minimize className="h-4 w-4" /> : <Fullscreen className="h-4 w-4" />}
//                 </Button>
//               </div>
              
//               <LanguageSelector 
//                 selectedLanguage={selectedLanguage}
//                 onLanguageChange={handleLanguageChange}
//               />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div></BrowserRouter>
//   );
// };

// export default TutorialView;
"use client";
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
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

import LanguageSelector, { INDIAN_LANGUAGES } from "../../_components/LanguageSelector";
import SlideContent from "../../_components/SlideContent";
import TutorialAudio from "../../_components/TutorialAudio";
// JEE Advanced mathematics tutorial on Limits and Continuity
  const tutorial = {
    title: "Limits and Continuity: Essential Concepts for JEE Advanced",
    subject: "Mathematics",
    topic: "Calculus - Limits and Continuity",
    slides: [
      { 
        id: 1, 
        // imageUrl: "/lovable-uploads/e16f8762-b917-4476-b969-5c6888160c7d.png",
        title: "Introduction to Limits",
        content: "Limits are fundamental to calculus and a critical concept in JEE Advanced mathematics. A limit describes the value a function approaches as the input approaches some value.",
        audioUrl: "/audio/slide1.mp3",
        formulas: [
          "lim(x→a) f(x) = L"
        ]
      },
      { 
        id: 2, 
        // imageUrl: "/lovable-uploads/aae89a4e-f701-430d-827b-8dd055210771.png",
        title: "Properties of Limits",
        content: "Understanding these properties will help you solve complex limit problems efficiently in your JEE Advanced exam.",
        audioUrl: "/audio/slide2.mp3",
        formulas: [
          "lim(x→a) [f(x) ± g(x)] = lim(x→a) f(x) ± lim(x→a) g(x)",
          "lim(x→a) [f(x) × g(x)] = lim(x→a) f(x) × lim(x→a) g(x)",
          "lim(x→a) [f(x) / g(x)] = lim(x→a) f(x) / lim(x→a) g(x), if lim(x→a) g(x) ≠ 0"
        ]
      },
      { 
        id: 3,
        title: "Evaluating Limits",
        content: "When direct substitution leads to indeterminate forms like 0/0 or ∞/∞, we need special techniques to evaluate limits.",
        audioUrl: "/audio/slide3.mp3",
        formulas: [
          "L'Hôpital's Rule: lim(x→a) [f(x)/g(x)] = lim(x→a) [f'(x)/g'(x)]",
          "lim(x→0) (sin x)/x = 1",
          "lim(x→0) (1-cos x)/x² = 1/2"
        ],
        examples: [
          {
            problem: "Evaluate lim(x→0) (e^x - 1 - x)/x²",
            solution: "Use Taylor series expansion of e^x = 1 + x + x²/2 + ... to get lim(x→0) (x²/2 + higher terms)/x² = 1/2"
          }
        ]
      },
      {
        id: 4,
        title: "Continuity of Functions",
        content: "A function f is continuous at point 'a' if the following three conditions are satisfied: (1) f(a) is defined, (2) lim(x→a) f(x) exists, and (3) lim(x→a) f(x) = f(a).",
        audioUrl: "/audio/slide4.mp3",
        formulas: [
          "f is continuous at x = a if lim(x→a) f(x) = f(a)"
        ],
        examples: [
          {
            problem: "Is f(x) = |x|/x continuous at x = 0?",
            solution: "No, f(0) is undefined as division by zero is undefined. The function is discontinuous at x = 0."
          }
        ]
      },
      {
        id: 5,
        title: "Types of Discontinuities",
        content: "Understanding different types of discontinuities is crucial for solving JEE Advanced problems on continuity.",
        audioUrl: "/audio/slide5.mp3",
        formulas: [],
        examples: [
          {
            problem: "Find the type of discontinuity in f(x) = (x² - 1)/(x - 1)",
            solution: "This has a removable discontinuity at x = 1. We can rewrite as f(x) = x + 1 for x ≠ 1, and then define f(1) = 2 to make it continuous."
          }
        ]
      },
      {
        id: 6,
        title: "Intermediate Value Theorem",
        content: "If f is continuous on [a,b] and k is between f(a) and f(b), then there exists at least one c in [a,b] such that f(c) = k. This theorem is often used to prove existence of roots.",
        audioUrl: "/audio/slide6.mp3",
        examples: [
          {
            problem: "Show that the equation x³ + 4x - 10 = 0 has a root between 1 and 2.",
            solution: "Let f(x) = x³ + 4x - 10. f(1) = 1 + 4 - 10 = -5 < 0 and f(2) = 8 + 8 - 10 = 6 > 0. Since f is continuous and changes sign, by IVT, there exists c in [1,2] where f(c) = 0."
          }
        ]
      },
      {
        id: 7,
        title: "Practice Problems",
        content: "These are typical JEE Advanced level problems on limits and continuity. Try to solve them using the concepts we've covered.",
        audioUrl: "/audio/slide7.mp3",
        examples: [
          {
            problem: "Find lim(x→∞) [x(√(x² + 1) - x)]",
            solution: "Multiply numerator and denominator by (√(x² + 1) + x). After simplification, we get lim(x→∞) [x²/(√(x² + 1) + x)] = lim(x→∞) [x/√(1 + 1/x²) + 1] = 1/2"
          },
          {
            problem: "Find all values of k for which f(x) = {kx², if x ≤ 1; 3x + k - 3, if x > 1} is continuous at x = 1.",
            solution: "For continuity at x = 1, we need f(1-) = f(1+), which gives k(1)² = 3(1) + k - 3, so k = 3."
          }
        ]
      }
    ],
    transcriptText: `This tutorial covers Limits and Continuity, essential topics for JEE Advanced Mathematics. 
    
    We begin by defining limits as the value a function approaches as the input approaches some value. Understanding this concept is critical for calculus.
    
    Next, we explore important properties of limits, including sum, product, and quotient rules. We also discuss special techniques for evaluating limits when direct substitution leads to indeterminate forms.
    
    For continuity, we examine the three conditions required for a function to be continuous at a point. We analyze different types of discontinuities, such as removable, jump, and essential discontinuities.
    
    The Intermediate Value Theorem is presented as a powerful tool for proving the existence of roots within a given interval.
    
    Finally, we work through practice problems typical of JEE Advanced examinations to reinforce these concepts and prepare you for the challenging questions you'll encounter on the exam.`
  };

const TutorialView = () => {
  const { id = "1", tutorialId = "0" } = useParams();
  const { toast } = useToast();
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [notes, setNotes] = useState("");
  const [transcriptText, setTranscriptText] = useState("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(INDIAN_LANGUAGES[0].code);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [sourceText, setSourceText] = useState(tutorial.transcriptText);
  const [translatedText, setTranslatedText] = useState(sourceText);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
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

  // Auto-advance slides when playing
  useEffect(() => {
    let slideTimer: number;

    if (isPlaying && autoAdvance) {
      slideTimer = window.setTimeout(() => {
        if (currentSlideIndex < tutorial.slides.length - 1) {
          setCurrentSlideIndex(currentSlideIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 15000); // Advance slide every 15 seconds - in a real app, this would be synchronized with audio duration
    }

    return () => {
      if (slideTimer) window.clearTimeout(slideTimer);
    };
  }, [isPlaying, currentSlideIndex, autoAdvance, tutorial.slides.length]);

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
      if (isPlaying) {
        // Briefly pause to reset audio for new slide
        setIsPlaying(false);
        setTimeout(() => setIsPlaying(true), 50);
      }
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      if (isPlaying) {
        // Briefly pause to reset audio for new slide
        setIsPlaying(false);
        setTimeout(() => setIsPlaying(true), 50);
      }
    }
  };

  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    if (autoAdvance && currentSlideIndex < tutorial.slides.length - 1) {
      goToNextSlide();
    } else {
      setIsPlaying(false);
    }
  };

  // const handleLanguageChange = (languageCode: string) => {
  //   setSelectedLanguage(languageCode);
  //   setSourceText(tutorial.transcriptText);
  //   toast({
  //     title: "Language Changed",
  //     description: `Audio language switched to ${INDIAN_LANGUAGES.find(l => l.code === languageCode)?.name}`,
  //   });
  // };
  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);

    // Extract just "hi" from "hi-IN"
    const targetLangCode = language.split("-")[0];

    const response = await fetch("https://anuvaad-backend.bhashini.co.in/v1/pipeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: "translation",
            config: {
              language: {
                sourceLanguage: "en",
                targetLanguage: targetLangCode
              },
              serviceId: "ai4bharat/indictrans-v2-all-gpu--t4"
            }
          }
        ],
        inputData: {
          input: [{ source: sourceText }],
          audio: []
        }
      })
    });

    const data = await response.json();
    console.log(data);
    const result = data?.pipelineResponse?.[0]?.output?.[0]?.target || "Translation failed";
    setTranslatedText(result);
  };

  const generateAudio = async (textToConvert: string) => {
    if (!textToConvert.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("https://anuvaad-backend.bhashini.co.in/v1/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pipelineTasks: [
            {
              taskType: "tts",
              config: {
                language: { sourceLanguage: "hi" },
                serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
                gender: "female"
              }
            }
          ],
          inputData: {
            input: [{ source: textToConvert }],
            audio: [{ audioContent: "" }]
          }
        })
      });

      const data = await response.json();
      const base64Audio = data?.pipelineResponse?.[0]?.audio?.[0]?.audioContent;
      if (!base64Audio) throw new Error("No audio returned");

      const byteCharacters = atob(base64Audio);
      const byteArray = new Uint8Array(Array.from(byteCharacters, c => c.charCodeAt(0)));
      const blob = new Blob([byteArray], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);

      setAudioUrl(url);
      if (audioRef.current) audioRef.current.src = url;
    } catch (error) {
      console.error("TTS Error:", error);
      alert("Failed to generate audio.");
    } finally {
      setLoading(false);
    }
  };

  const saveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <header className="w-full px-6 py-4 bg-white shadow-sm flex justify-between items-center">
        <Link to="/" className="text-purple-600 text-xl font-medium">LEARNEASY</Link>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/lovable-uploads/ada64135-20fe-42e8-aec2-809a83c93e36.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            {/* <Link to={`/course/${id}`} className="text-purple-600 hover:underline flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Course
            </Link> */}
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
                  <p className="mb-4 whitespace-pre-line">{translatedText}</p>
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

        {/* Fixed-size video player container */}
        <div className="mx-auto w-full max-w-4xl">
          <div 
            className="border-0 shadow-lg overflow-hidden"
            style={{ height: "900px", maxHeight: "calc(100vh - 240px)" }}
            ref={playerRef}
          >
            <div className="relative h-full">
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
            <CardContent className="border-t border-gray-200 bg-white p-4 absolute bottom-0 left-0 right-0">
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
                    text={tutorial.slides[currentSlideIndex].content}
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
                  <div className="flex items-center ml-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAutoAdvance(!autoAdvance)}
                      className={`text-xs ${autoAdvance ? "bg-purple-100" : ""}`}
                    >
                      {autoAdvance ? "Auto-advance ON" : "Auto-advance OFF"}
                    </Button>
                  </div>
                </div>
                
                <LanguageSelector 
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
                />
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialView;
