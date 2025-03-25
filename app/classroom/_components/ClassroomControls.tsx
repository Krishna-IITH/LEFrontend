import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from './ui/slider';
import {  
  Play, Pause, RotateCcw, SkipBack, SkipForward, 
  Volume2, Languages, BookOpen, NotepadText, User 
} from 'lucide-react';
import { formatTime } from '@/utils/timeUtils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContentState } from '@/types/classroom';

interface ClassroomControlsProps {
  contentState: ContentState;
  totalDuration: number;
  availableLanguages: string[];
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
}

const ClassroomControls: React.FC<ClassroomControlsProps> = ({
  contentState,
  totalDuration,
  availableLanguages,
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
  onToggleExpertProfile
}) => {
  const { isPlaying, currentTime, playbackRate, selectedLanguage, showTranscript, showNotes } = contentState;
  
  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * totalDuration;
    onSeek(newTime);
  };

  return (
    <div className="rounded-xl p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border shadow-md transition-all duration-300 animate-fade-in">
      {/* Progress bar */}
      <div 
        className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 cursor-pointer progress-bar-hover"
        onClick={handleProgressClick}
      >
        <div 
          className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
          style={{ width: `${(currentTime / totalDuration) * 100}%` }}
        />
        <div 
          className="progress-thumb absolute top-1/2 h-4 w-4 -mt-2 rounded-full bg-purple-500 shadow-md transform transition-transform"
          style={{ left: `calc(${(currentTime / totalDuration) * 100}% - 8px)` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </div>
        
        <div className="flex space-x-2 items-center">
          {/* Playback controls */}
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onSkipBack} 
            className="hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <SkipBack size={18} />
          </Button>
          
          <Button 
            size="icon"
            variant="ghost" 
            onClick={onReplay} 
            className="hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <RotateCcw size={18} />
          </Button>
          
          <Button 
            size="icon" 
            variant="default" 
            onClick={isPlaying ? onPause : onPlay}
            className="h-10 w-10 bg-purple-500 hover:bg-purple-600 text-white transform transition-transform hover:scale-105"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onSkipForward}
            className="hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <SkipForward size={18} />
          </Button>
          
          {/* Volume control */}
          <div className="hidden sm:flex items-center space-x-2 ml-2">
            <Volume2 size={18} className="text-muted-foreground" />
            <div className="w-24">
              <Slider defaultValue={[80]} max={100} step={1} className="[&>span]:bg-purple-500" />
            </div>
          </div>
          
          {/* Playback speed */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs ml-2">
                {playbackRate}x
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                <DropdownMenuItem 
                  key={rate} 
                  onClick={() => onPlaybackRateChange(rate)}
                  className={playbackRate === rate ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300" : ""}
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
                className="hover:bg-purple-100 dark:hover:bg-purple-900/30 ml-1"
              >
                <Languages size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((language) => (
                <DropdownMenuItem 
                  key={language} 
                  onClick={() => onLanguageChange(language)}
                  className={selectedLanguage === language ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300" : ""}
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
            className={`hover:bg-purple-100 dark:hover:bg-purple-900/30 ml-1 ${
              showTranscript ? "text-purple-500 bg-purple-100 dark:bg-purple-900/30" : ""
            }`}
          >
            <BookOpen size={18} />
          </Button>
          
          {/* Notes toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleNotes}
            className={`hover:bg-purple-100 dark:hover:bg-purple-900/30 ${
              showNotes ? "text-purple-500 bg-purple-100 dark:bg-purple-900/30" : ""
            }`}
          >
            <NotepadText size={18} />
          </Button>
          
          {/* Expert profile toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleExpertProfile}
            className="hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <User size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomControls;
