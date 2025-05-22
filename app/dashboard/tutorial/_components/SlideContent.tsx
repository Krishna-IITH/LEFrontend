import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface SlideContentProps {
  slide: {
    id: number;
    imageUrl?: string;
    content: string;
    audioUrl?: string;
  };
  isActive: boolean;
  language: string;
}

const SlideContent = ({ slide, isActive, language }: SlideContentProps) => {
  // In a real implementation, you would have different audio files for different languages
  // Here we're just demonstrating the structure
  const getAudioUrlForLanguage = (baseUrl: string | undefined, lang: string) => {
    if (!baseUrl) return undefined;
    // In a real implementation, you would have a naming convention like "audio_en-IN.mp3", "audio_hi-IN.mp3"
    return baseUrl.replace(".mp3", `_${lang}.mp3`);
  };

  return (
    <Card 
      className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="flex flex-col h-full">
        {slide.imageUrl && (
          <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
            <img 
              src={slide.imageUrl} 
              alt={`Slide ${slide.id}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
        <div className="p-6 bg-white">
          <p className="text-lg">{slide.content}</p>
        </div>
      </div>
    </Card>
  );
};

export default SlideContent;
