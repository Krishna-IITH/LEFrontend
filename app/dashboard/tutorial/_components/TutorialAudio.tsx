import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface TutorialAudioProps {
  audioUrl?: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onEnded: () => void;
  language: string;
}

const TutorialAudio = ({ 
  audioUrl, 
  isPlaying, 
  onPlayPause,
  onEnded,
  language
}: TutorialAudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Audio play failed:", e);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioUrl]);

  useEffect(() => {
    // When language changes, reload audio with the new language audio file
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Audio play failed:", e);
        });
      }
    }
  }, [language]);

  // Function to get language-specific audio URL
  const getAudioUrlForLanguage = () => {
    if (!audioUrl) return "";
    // In a real implementation, audio files would be named with language codes
    // For example: /audio/slide1_en-IN.mp3, /audio/slide1_hi-IN.mp3
    const baseName = audioUrl.substring(0, audioUrl.lastIndexOf('.'));
    const extension = audioUrl.substring(audioUrl.lastIndexOf('.'));
    return `${baseName}_${language}${extension}`;
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        onEnded={onEnded}
        src={getAudioUrlForLanguage()}
        preload="auto"
      />
      <Button 
        variant="outline" 
        size="icon"
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className="hover:bg-purple-100"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
    </>
  );
};

export default TutorialAudio;