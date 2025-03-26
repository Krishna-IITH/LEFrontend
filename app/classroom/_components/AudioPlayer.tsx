import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AudioPlayerProps {
  audioSrc: string;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  playbackRate: number;
  onPlay: () => void;
  onPause: () => void;
  onTimeUpdate: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onAudioError?: (error: Error) => void;
  isSimulationMode?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  isPlaying,
  currentTime,
  totalDuration,
  playbackRate,
  onPlay,
  onPause,
  onTimeUpdate,
  onVolumeChange,
  onAudioError,
  isSimulationMode = false
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const { toast } = useToast();
  
  // Initialize audio element
  useEffect(() => {
    // If in simulation mode, don't try to load audio
    if (isSimulationMode) {
      setLoadingError(true);
      return;
    }
    
    // Clean up previous audio if it exists
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
      audioRef.current = null;
    }
    
    if (audioSrc) {
      try {
        console.log("Initializing audio with source:", audioSrc);
        const audio = new Audio();
        audio.preload = 'auto';
        
        // Set up event listeners before setting src to catch load errors
        audio.addEventListener('canplaythrough', () => {
          console.log("Audio can play through");
          setAudioLoaded(true);
          setLoadingError(false);
        });
        
        audio.addEventListener('timeupdate', () => {
          onTimeUpdate(audio.currentTime);
        });
        
        audio.addEventListener('ended', () => {
          console.log("Audio ended");
          onPause();
        });
        
        audio.addEventListener('error', (e) => {
          console.error('Audio loading error details:', e);
          setAudioLoaded(false);
          setLoadingError(true);
          
          if (onAudioError) {
            onAudioError(new Error("Audio could not be loaded"));
          }
          
          // Provide detailed error information
          toast({
            title: "Audio could not be loaded",
            description: "Using simulated audio playback instead",
            variant: "destructive"
          });
        });
        
        // Set the source after adding event listeners
        audio.src = audioSrc;
        audio.volume = volume / 100;
        audioRef.current = audio;
        
        // Attempt to load the audio
        audio.load();
      } catch (error) {
        console.error("Error creating audio element:", error);
        setLoadingError(true);
        
        if (onAudioError && error instanceof Error) {
          onAudioError(error);
        }
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [audioSrc, onTimeUpdate, onPause, toast, onAudioError, isSimulationMode]);
  
  // Handle play/pause state changes
  useEffect(() => {
    // If we have a loading error or in simulation mode, don't interact with audio element
    if (loadingError || isSimulationMode) {
      return;
    }
    
    if (!audioRef.current) return;
    
    if (isPlaying) {
      console.log("Attempting to play audio");
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback error:", error);
          
          // This is likely an autoplay policy error, let's inform the user
          if (error.name === 'NotAllowedError') {
            toast({
              title: "Autoplay blocked",
              description: "Please interact with the page to enable audio playback",
              variant: "destructive"
            });
          }
          
          onPause();
        });
      }
    } else {
      console.log("Pausing audio");
      audioRef.current.pause();
    }
  }, [isPlaying, onPause, audioLoaded, loadingError, toast, isSimulationMode]);
  
  // Handle time updates from outside
  useEffect(() => {
    if (!loadingError && !isSimulationMode && audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 0.5) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime, loadingError, isSimulationMode]);
  
  // Handle playback rate changes
  useEffect(() => {
    if (!loadingError && !isSimulationMode && audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, loadingError, isSimulationMode]);
  
  // Volume control
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (!loadingError && !isSimulationMode && audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
    
    if (onVolumeChange) {
      onVolumeChange(newVolume);
    }
  };
  
  const toggleMute = () => {
    if (!loadingError && !isSimulationMode && audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };
  
  return (
    <div className="flex items-center space-x-2 relative">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMute}
        className="text-muted-foreground hover:text-foreground"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </Button>
      
      <Slider 
        value={[isMuted ? 0 : volume]} 
        max={100} 
        step={1} 
        onValueChange={handleVolumeChange}
        className={cn("w-24", "[&>span]:bg-[#875bf9]")}
      />
      
      <div className={cn(
        "absolute -top-10 left-0 bg-background/90 border rounded-lg p-2 shadow-md transition-opacity",
        audioLoaded || loadingError ? "hidden opacity-0 group-hover:opacity-100 group-hover:block" : "block opacity-100"
      )}>
        <span className={cn(
          "text-xs font-medium flex items-center gap-1", 
          loadingError && "text-red-500"
        )}>
          {loadingError && <AlertCircle size={14} />}
          {loadingError 
            ? isSimulationMode 
              ? "Using simulated playback" 
              : "Audio failed to load" 
            : audioLoaded 
              ? "Audio is ready" 
              : "Audio loading..."}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;