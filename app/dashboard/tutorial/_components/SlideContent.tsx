// import { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";

// interface SlideContentProps {
//   slide: {
//     id: number;
//     imageUrl?: string;
//     content: string;
//     audioUrl?: string;
//   };
//   isActive: boolean;
//   language: string;
// }

// const SlideContent = ({ slide, isActive, language }: SlideContentProps) => {
//   // In a real implementation, you would have different audio files for different languages
//   // Here we're just demonstrating the structure
//   const getAudioUrlForLanguage = (baseUrl: string | undefined, lang: string) => {
//     if (!baseUrl) return undefined;
//     // In a real implementation, you would have a naming convention like "audio_en-IN.mp3", "audio_hi-IN.mp3"
//     return baseUrl.replace(".mp3", `_${lang}.mp3`);
//   };

//   return (
//     <Card 
//       className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//     >
//       <div className="flex flex-col h-full">
//         {slide.imageUrl && (
//           <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
//             <img 
//               src={slide.imageUrl} 
//               alt={`Slide ${slide.id}`}
//               className="max-w-full max-h-full object-contain"
//             />
//           </div>
//         )}
//         <div className="p-6 bg-white">
//           <p className="text-lg">{slide.content}</p>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default SlideContent;

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Calculator, Lightbulb, Loader2 } from "lucide-react";
import { TranslationService } from "@/services/translationService";

interface SlideContentProps {
  slide: {
    id: number;
    imageUrl?: string;
    content: string;
    audioUrl?: string;
    title?: string;
    formulas?: string[];
    examples?: { problem: string; solution: string }[];
  };
  isActive: boolean;
  language: string;
}

const SlideContent = ({ slide, isActive, language }: SlideContentProps) => {
  const [translatedSlide, setTranslatedSlide] = useState(slide);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const translateContent = async () => {
      if (language === "en-IN") {
        setTranslatedSlide(slide);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await TranslationService.translateSlideContent(slide, language);
        setTranslatedSlide(translated);
      } catch (error) {
        console.error("Translation failed:", error);
        setTranslatedSlide(slide);
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [slide, language]);

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-gradient-to-br from-blue-50 to-purple-50`}
    >
      <div className="flex flex-col h-full">
        {translatedSlide.title && (
          <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white relative">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 flex-shrink-0" />
              <h2 className="text-xl md:text-2xl font-bold leading-tight">
                {isTranslating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Translating...
                  </div>
                ) : (
                  translatedSlide.title
                )}
              </h2>
            </div>
          </div>
        )}
        
        {translatedSlide.imageUrl && (
          <div className="bg-black flex items-center justify-center h-[240px]">
            <img 
              src={translatedSlide.imageUrl} 
              alt={`Slide ${translatedSlide.id}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
        
        <ScrollArea className="h-[100%] flex-1 bg-white">
          <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            {/* Main Content */}
            <div className="bg-white rounded-lg border border-gray-100 p-4 md:p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">{translatedSlide.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  {isTranslating ? (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Translating content...</span>
                    </div>
                  ) : (
                    <p className="text-base md:text-lg leading-relaxed text-gray-800 break-words">
                      {translatedSlide.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Formulas Section */}
            {translatedSlide.formulas && translatedSlide.formulas.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-green-800">
                    {language === "en-IN" ? "Key Formulas" : "मुख्य सूत्र"}
                  </h3>
                </div>
                <div className="space-y-4">
                  {translatedSlide.formulas.map((formula, index) => (
                    <div key={index} className="bg-white p-3 md:p-4 rounded-lg border border-green-200 shadow-sm">
                      <div className="text-center overflow-x-auto">
                        <div 
                          className="text-base md:text-lg font-mono bg-gray-50 px-3 md:px-4 py-2 rounded border inline-block min-w-0"
                          dangerouslySetInnerHTML={{ 
                            __html: formula.replace(/\$([^$]*)\$/g, '<span class="math-formula">$1</span>')
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Examples Section */}
            {translatedSlide.examples && translatedSlide.examples.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <h3 className="font-bold text-lg md:text-xl text-amber-800">
                    {language === "en-IN" ? "Worked Examples" : "हल किए गए उदाहरण"}
                  </h3>
                </div>
                <div className="space-y-4 md:space-y-6">
                  {translatedSlide.examples.map((example, index) => (
                    <div key={index} className="bg-white rounded-lg border border-amber-200 shadow-sm overflow-hidden">
                      <div className="bg-amber-100 px-3 md:px-4 py-3 border-b border-amber-200">
                        <h4 className="font-semibold text-amber-800 flex items-center gap-2 text-sm md:text-base">
                          <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded text-xs md:text-sm font-bold">
                            {index + 1}
                          </span>
                          {language === "en-IN" ? "Problem" : "समस्या"}
                        </h4>
                      </div>
                      <div className="p-3 md:p-4">
                        <p className="text-gray-800 mb-4 font-medium text-sm md:text-base break-words">
                          {example.problem}
                        </p>
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 md:p-4 border border-purple-200">
                          <h5 className="font-semibold text-purple-800 mb-2 flex items-center gap-2 text-sm md:text-base">
                            <span className="w-5 h-5 md:w-6 md:h-6 bg-purple-200 text-purple-800 rounded-full flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                            {language === "en-IN" ? "Solution" : "समाधान"}
                          </h5>
                          <div 
                            className="text-purple-700 font-medium leading-relaxed text-sm md:text-base break-words"
                            dangerouslySetInnerHTML={{ 
                              __html: example.solution.replace(/\$([^$]*)\$/g, '<span class="math-formula">$1</span>')
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SlideContent;
