import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, Pause, RotateCcw, SkipBack, SkipForward, 
  Languages, BookOpen, NotepadText, User
} from 'lucide-react';
import { formatTime } from '@/utils/timeUtils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContentState } from '@/types/classroom';
import AudioPlayer from './AudioPlayer';
import { cn } from '@/lib/utils';

interface ClassroomControlsProps {
  contentState: ContentState;
  totalDuration: number;
  availableLanguages: string[];
  audioSrc?: string;
  onPlay: () => void;
  onPause: () => void;
  onReplay: () => void;
  onSeek: (time: number) => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
  onPlaybackRateChange: (rate: number) => void;
  onLanguageChange: (language: string) => void;
  onToggleTranscript: () => void;
  onToggleNotes: () => void;
  onToggleExpertProfile: () => void;
  onVolumeChange?: (volume: number) => void;
  onAudioError?: (error: Error) => void;
}

const ClassroomControls: React.FC<ClassroomControlsProps> = ({
  contentState,
  totalDuration,
  availableLanguages,
  audioSrc,
  onPlay,
  onPause,
  onReplay,
  onSeek,
  onSkipBack,
  onSkipForward,
  onPlaybackRateChange,
  onLanguageChange,
  onToggleTranscript,
  onToggleNotes,
  onToggleExpertProfile,
  onVolumeChange,
  onAudioError
}) => {
  const { 
    isPlaying, 
    currentTime, 
    playbackRate, 
    selectedLanguage, 
    showTranscript, 
    showNotes, 
    isSimulationMode 
  } = contentState;
  
  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * totalDuration;
    onSeek(newTime);
  };

  const handlePlayPauseClick = () => {
    console.log("Play/Pause clicked, current state:", isPlaying);
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <div className="rounded-xl p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border shadow-md transition-all duration-300 animate-fade-in">
      {/* Progress bar */}
      <div 
        className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 cursor-pointer progress-bar-hover group"
        onClick={handleProgressClick}
      >
        <div 
          className="absolute top-0 left-0 h-full bg-[#875bf9] rounded-full"
          style={{ width: `${(currentTime / totalDuration) * 100}%` }}
        />
        <div 
          className="progress-thumb absolute top-1/2 h-4 w-4 -mt-2 rounded-full bg-[#875bf9] shadow-md transform transition-transform scale-0 group-hover:scale-100"
          style={{ left: `calc(${(currentTime / totalDuration) * 100}% - 8px)` }}
        />
        
        {/* Preview tooltip on hover */}
        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-background/90 border rounded-lg px-2 py-1 text-xs font-medium shadow-md"
             style={{ left: `calc(${(currentTime / totalDuration) * 100}% - 20px)` }}>
          {formatTime(currentTime)}
        </div>
      </div>
      
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="text-sm text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </div>
        
        <div className="flex flex-wrap space-x-1 items-center">
          {/* Playback controls */}
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onSkipBack} 
            className="hover:bg-[#875bf9]/10 dark:hover:bg-[#875bf9]/30"
            title="Skip back 10 seconds"
          >
            <SkipBack size={18} />
          </Button>
          
          <Button 
            size="icon"
            variant="ghost" 
            onClick={onReplay} 
            className="hover:bg-[#875bf9]/10 dark:hover:bg-[#875bf9]/30"
            title="Restart"
          >
            <RotateCcw size={18} />
          </Button>
          
          <Button 
            size="icon" 
            variant="default" 
            onClick={handlePlayPauseClick}
            className="h-10 w-10 bg-[#875bf9] hover:bg-[#875bf9]/90 text-white transform transition-transform hover:scale-105"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onSkipForward}
            className="hover:bg-[#875bf9]/10 dark:hover:bg-[#875bf9]/30"
            title="Skip forward 10 seconds"
          >
            <SkipForward size={18} />
          </Button>
          
          {/* Audio player */}
          <div className="hidden sm:flex items-center ml-2 group">
            <AudioPlayer 
              audioSrc={audioSrc || "/audio/lecture.mp3"} 
              isPlaying={isPlaying}
              currentTime={currentTime}
              totalDuration={totalDuration}
              playbackRate={playbackRate}
              onPlay={onPlay}
              onPause={onPause}
              onTimeUpdate={onSeek}
              onVolumeChange={onVolumeChange}
              onAudioError={onAudioError}
              isSimulationMode={isSimulationMode}
            />
          </div>
          
          {/* Playback speed */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs ml-2 hover:bg-[#875bf9]/10 dark:hover:bg-[#875bf9]/30"
                title="Playback speed"
              >
                {playbackRate}x
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                <DropdownMenuItem 
                  key={rate} 
                  onClick={() => onPlaybackRateChange(rate)}
                  className={playbackRate === rate ? "bg-[#875bf9]/10 dark:bg-[#875bf9]/20 text-[#875bf9] font-medium" : ""}
                >
                  {rate}x
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Language selection */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-[#875bf9]/10 dark:hover:bg-[#875bf9]/30 ml-1"
                title="Change language"
              >
                <Languages size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((language) => (
                <DropdownMenuItem 
                  key={language} 
                  onClick={() => onLanguageChange(language)}
                  className={selectedLanguage === language ? "bg-[#875bf9]/10 dark:bg-[#875bf9]/20 text-[#875bf9] font-medium" : ""}
                >
                  {language}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Transcript toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleTranscript}
            className={cn(
              "hover:bg-[#875bf9]/10 dark:hover:bg-[#875bf9]/30 ml-1",
              showTranscript && "text-[#875bf9] bg-[#875bf9]/10 dark:bg-[#875bf9]/20"
            )}
            title="Transcript"
          >
            <BookOpen size={18} />
          </Button>
          
          {/* Notes toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleNotes}
            className={cn(
              "hover:bg-[#875bf9]/10 dark:hover:bg-[#875bf9]/30",
              showNotes && "text-[#875bf9] bg-[#875bf9]/10 dark:bg-[#875bf9]/20"
            )}
            title="Notes"
          >
            <NotepadText size={18} />
          </Button>
          
          {/* Expert profile toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleExpertProfile}
            className="hover:bg-[#875bf9]/10 dark:hover:bg-[#875bf9]/30"
            title="Expert profile"
          >
            <User size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomControls;
