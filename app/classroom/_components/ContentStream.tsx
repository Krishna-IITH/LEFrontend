import React, { useEffect, useRef } from 'react';
import { ContentSegment } from '@/types/classroom';
import { motion, AnimatePresence } from "framer-motion";

interface ContentStreamProps {
  segments: ContentSegment[];
  currentTime: number;
  isPlaying: boolean;
}

const ContentStream: React.FC<ContentStreamProps> = ({
  segments,
  currentTime,
  isPlaying
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Filter segments that should be visible at the current time
  const visibleSegments = segments.filter(segment => 
    currentTime >= segment.timestamp && 
    currentTime < (segment.timestamp + segment.duration)
  );
  
  // Scroll to the latest segment when it appears
  useEffect(() => {
    if (containerRef.current && visibleSegments.length > 0) {
      const lastSegmentElement = containerRef.current.querySelector(`[data-segment-id="${visibleSegments[visibleSegments.length - 1].id}"]`);
      if (lastSegmentElement) {
        lastSegmentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [visibleSegments]);

  // Get all segments up to current time
  const displayedSegments = segments.filter(segment => currentTime >= segment.timestamp);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col space-y-6 overflow-y-auto p-6 rounded-xl bg-background border"
      style={{ maxHeight: 'calc(100vh - 250px)', minHeight: '400px' }}
    >
      <AnimatePresence>
        {displayedSegments.length > 0 ? (
          displayedSegments.map((segment) => {
            // Determine if this segment is currently "streaming" (being shown now)
            const isCurrentlyStreaming = visibleSegments.includes(segment);
            
            return (
              <motion.div 
                key={segment.id}
                data-segment-id={segment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`transition-all duration-500 ${
                  isCurrentlyStreaming ? 'bg-secondary/20 p-4 rounded-lg border border-secondary/30' : 'p-2'
                }`}
              >
                {segment.type === 'text' ? (
                  <p className={`text-lg leading-relaxed ${isCurrentlyStreaming ? 'font-medium' : ''}`}>
                    {segment.content}
                  </p>
                ) : segment.type === 'image' ? (
                  <div className="w-full rounded-lg overflow-hidden shadow-lg my-4">
                    <img
                      src={segment.content}
                      alt="Classroom content illustration"
                      className="w-full h-auto object-cover transform transition-transform hover:scale-[1.02] duration-500"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                
                {segment.language !== 'English' && (
                  <div className="mt-1 text-xs text-muted-foreground flex items-center">
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {segment.language}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-muted-foreground space-y-4">
            <p className="text-lg">Press play to start the content stream</p>
            <div className="bg-secondary/20 p-6 rounded-xl border border-secondary/30 max-w-lg text-center">
              <h3 className="font-semibold mb-2">About this lesson</h3>
              <p>This interactive lesson will guide you through the fundamentals of quantum physics, covering key concepts like wave-particle duality, superposition, and quantum entanglement.</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentStream;
