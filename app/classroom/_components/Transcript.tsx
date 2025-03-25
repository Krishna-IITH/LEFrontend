import React, { useEffect, useRef } from 'react';
import { ContentSegment } from '@/types/classroom';
import { formatTime } from '@/utils/timeUtils';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface TranscriptProps {
  segments: ContentSegment[];
  currentTime: number;
  onSeek: (time: number) => void;
}

const Transcript: React.FC<TranscriptProps> = ({
  segments,
  currentTime,
  onSeek
}) => {
  // Only show text segments in the transcript
  const textSegments = segments.filter(segment => segment.type === 'text');
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  // Find the active segment
  const activeSegment = textSegments.find(
    segment => 
      currentTime >= segment.timestamp && 
      currentTime < (segment.timestamp + segment.duration)
  );

  // Auto-scroll to keep the active segment visible
  useEffect(() => {
    if (transcriptRef.current && activeSegment) {
      const activeElement = transcriptRef.current.querySelector(`[data-segment-id="${activeSegment.id}"]`);
      
      if (activeElement) {
        activeElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }
    }
  }, [activeSegment]);

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-primary" />
          <h3 className="text-lg font-medium">Transcript</h3>
        </div>
        <Button 
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={() => window.print()}
        >
          Print
        </Button>
      </div>
      
      <div 
        ref={transcriptRef}
        className="flex-1 overflow-y-auto"
      >
        {textSegments.length > 0 ? (
          <div className="divide-y">
            {textSegments.map((segment) => (
              <div 
                key={segment.id}
                data-segment-id={segment.id}
                className={`flex p-4 cursor-pointer transition-colors duration-300 ${
                  activeSegment?.id === segment.id 
                    ? 'bg-primary/10 border-l-2 border-primary' 
                    : 'hover:bg-secondary/10'
                }`}
                onClick={() => onSeek(segment.timestamp)}
              >
                <span className="text-xs font-mono mt-1 mr-3 flex-shrink-0 text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                  {formatTime(segment.timestamp)}
                </span>
                <div className="flex-1">
                  <p className={`text-sm ${activeSegment?.id === segment.id ? 'font-medium' : ''}`}>
                    {segment.content}
                  </p>
                  {segment.language !== 'English' && (
                    <span className="text-xs text-muted-foreground mt-1 inline-block bg-secondary/20 px-1.5 py-0.5 rounded">
                      {segment.language}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full p-6 text-center text-muted-foreground">
            <p>No transcript available for the selected language</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transcript;
