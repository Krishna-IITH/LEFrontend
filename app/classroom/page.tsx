"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { 
  classroomContent, 
  expertProfile,
  getContentByLanguage
} from '@/data/classroomData';
import { ContentState, Note, ClassroomMode } from '@/types/classroom';
import ClassroomControls from './_components/ClassroomControls';
import ContentStream from './_components/ContentStream';
import Transcript from './_components/Transcript';
import Notes from './_components/Notes';
import ExpertProfile from './_components/ExpertProfile';
import LayoutSwitcher from './_components/LayoutSwitcher';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Classroom = () => {
  const { toast } = useToast();
  const [contentState, setContentState] = useState<ContentState>({
    isPlaying: false,
    currentTime: 0,
    playbackRate: 1,
    selectedLanguage: 'English',
    showTranscript: false,
    showNotes: false
  });
  
  const [showExpertProfile, setShowExpertProfile] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [segments, setSegments] = useState(classroomContent.segments);
  const [layout, setLayout] = useState<ClassroomMode>('side-by-side');
  
  useEffect(() => {
    let timer: number | undefined;
    
    if (contentState.isPlaying) {
      timer = window.setInterval(() => {
        setContentState((prev) => {
          const newTime = prev.currentTime + (0.1 * prev.playbackRate);
          
          if (newTime >= classroomContent.totalDuration) {
            clearInterval(timer);
            return { 
              ...prev, 
              currentTime: classroomContent.totalDuration,
              isPlaying: false 
            };
          }
          
          return { ...prev, currentTime: newTime };
        });
      }, 100);
    }
    
    return () => {
      if (timer !== undefined) {
        clearInterval(timer);
      }
    };
  }, [contentState.isPlaying, contentState.playbackRate]);
  
  useEffect(() => {
    setSegments(getContentByLanguage(contentState.selectedLanguage));
  }, [contentState.selectedLanguage]);
  
  const handlePlay = useCallback(() => {
    setContentState((prev) => ({ ...prev, isPlaying: true }));
  }, []);
  
  const handlePause = useCallback(() => {
    setContentState((prev) => ({ ...prev, isPlaying: false }));
  }, []);
  
  const handleReplay = useCallback(() => {
    setContentState((prev) => ({ 
      ...prev, 
      currentTime: 0,
      isPlaying: true 
    }));
    toast({
      title: "Content restarted",
      duration: 2000
    });
  }, [toast]);
  
  const handleSeek = useCallback((time: number) => {
    setContentState((prev) => ({ ...prev, currentTime: time }));
  }, []);
  
  const handleSkipBack = useCallback(() => {
    setContentState((prev) => ({ 
      ...prev, 
      currentTime: Math.max(0, prev.currentTime - 10) 
    }));
    toast({
      title: "Skipped back 10 seconds",
      duration: 1500
    });
  }, [toast]);
  
  const handleSkipForward = useCallback(() => {
    setContentState((prev) => ({ 
      ...prev, 
      currentTime: Math.min(classroomContent.totalDuration, prev.currentTime + 10) 
    }));
    toast({
      title: "Skipped forward 10 seconds",
      duration: 1500
    });
  }, [toast]);
  
  const handlePlaybackRateChange = useCallback((rate: number) => {
    setContentState((prev) => ({ ...prev, playbackRate: rate }));
    toast({
      title: `Playback speed set to ${rate}x`,
      duration: 1500
    });
  }, [toast]);
  
  const handleLanguageChange = useCallback((language: string) => {
    setContentState((prev) => ({ ...prev, selectedLanguage: language }));
    toast({
      title: `Language changed to ${language}`,
      duration: 2000
    });
  }, [toast]);
  
  const handleToggleTranscript = useCallback(() => {
    setContentState((prev) => ({ 
      ...prev, 
      showTranscript: !prev.showTranscript,
      showNotes: prev.showTranscript ? prev.showNotes : false
    }));
    setShowExpertProfile(false);
  }, []);
  
  const handleToggleNotes = useCallback(() => {
    setContentState((prev) => ({ 
      ...prev, 
      showNotes: !prev.showNotes,
      showTranscript: prev.showNotes ? prev.showTranscript : false
    }));
    setShowExpertProfile(false);
  }, []);
  
  const handleToggleExpertProfile = useCallback(() => {
    setShowExpertProfile((prev) => !prev);
    if (!showExpertProfile) {
      setContentState((prev) => ({ 
        ...prev, 
        showTranscript: false,
        showNotes: false
      }));
    }
  }, [showExpertProfile]);
  
  const handleAddNote = useCallback((text: string, selectedText?: string) => {
    const newNote: Note = {
      id: uuidv4(),
      text,
      timestamp: contentState.currentTime,
      selectedText
    };
    setNotes((prev) => [...prev, newNote]);
    toast({
      title: "Note added",
      duration: 2000
    });
  }, [contentState.currentTime, toast]);
  
  const handleDeleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter(note => note.id !== id));
    toast({
      title: "Note deleted",
      duration: 2000
    });
  }, [toast]);

  const handleLayoutChange = useCallback((newLayout: ClassroomMode) => {
    setLayout(newLayout);
    toast({
      title: `Layout changed to ${newLayout} mode`,
      description: newLayout === 'fullscreen' ? 'Focus on content' : 
                 newLayout === 'side-by-side' ? 'Content with sidebar' : 
                 'Optimized for small screens',
      duration: 2000
    });
  }, [toast]);

  const renderContent = () => {
    switch (layout) {
      case 'fullscreen':
        return (
          <motion.div 
            className="space-y-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full">
              <ContentStream 
                segments={segments}
                currentTime={contentState.currentTime}
                isPlaying={contentState.isPlaying}
              />
            </div>
            
            <ClassroomControls 
              contentState={contentState}
              totalDuration={classroomContent.totalDuration}
              availableLanguages={classroomContent.languages}
              onPlay={handlePlay}
              onPause={handlePause}
              onReplay={handleReplay}
              onSeek={handleSeek}
              onSkipBack={handleSkipBack}
              onSkipForward={handleSkipForward}
              onPlaybackRateChange={handlePlaybackRateChange}
              onLanguageChange={handleLanguageChange}
              onToggleTranscript={handleToggleTranscript}
              onToggleNotes={handleToggleNotes}
              onToggleExpertProfile={handleToggleExpertProfile}
            />
            
            <AnimatePresence>
              {(contentState.showTranscript || contentState.showNotes || showExpertProfile) && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {contentState.showTranscript && (
                    <Card className="md:col-span-1 shadow-md">
                      <CardContent className="p-0 h-[400px]">
                        <Transcript 
                          segments={segments}
                          currentTime={contentState.currentTime}
                          onSeek={handleSeek}
                        />
                      </CardContent>
                    </Card>
                  )}
                  
                  {contentState.showNotes && (
                    <Card className="md:col-span-1 shadow-md">
                      <CardContent className="p-0 h-[400px]">
                        <Notes 
                          notes={notes}
                          currentTime={contentState.currentTime}
                          onAddNote={handleAddNote}
                          onDeleteNote={handleDeleteNote}
                        />
                      </CardContent>
                    </Card>
                  )}
                  
                  {showExpertProfile && (
                    <Card className="md:col-span-1 shadow-md">
                      <CardContent className="p-0 h-[400px]">
                        <ExpertProfile expert={expertProfile} />
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
        
      case 'compact':
        return (
          <motion.div 
            className="flex flex-col md:flex-row gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-1 space-y-6 order-2 md:order-1">
              <ContentStream 
                segments={segments}
                currentTime={contentState.currentTime}
                isPlaying={contentState.isPlaying}
              />
              
              <ClassroomControls 
                contentState={contentState}
                totalDuration={classroomContent.totalDuration}
                availableLanguages={classroomContent.languages}
                onPlay={handlePlay}
                onPause={handlePause}
                onReplay={handleReplay}
                onSeek={handleSeek}
                onSkipBack={handleSkipBack}
                onSkipForward={handleSkipForward}
                onPlaybackRateChange={handlePlaybackRateChange}
                onLanguageChange={handleLanguageChange}
                onToggleTranscript={handleToggleTranscript}
                onToggleNotes={handleToggleNotes}
                onToggleExpertProfile={handleToggleExpertProfile}
              />
            </div>
            
            <motion.div 
              className="w-full md:w-96 order-1 md:order-2"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="sticky top-0 md:h-screen md:overflow-y-auto space-y-4 py-4">
                {contentState.showTranscript && (
                  <Card className="shadow-md">
                    <CardContent className="p-0 h-[300px]">
                      <Transcript 
                        segments={segments}
                        currentTime={contentState.currentTime}
                        onSeek={handleSeek}
                      />
                    </CardContent>
                  </Card>
                )}
                
                {contentState.showNotes && (
                  <Card className="shadow-md">
                    <CardContent className="p-0 h-[300px]">
                      <Notes 
                        notes={notes}
                        currentTime={contentState.currentTime}
                        onAddNote={handleAddNote}
                        onDeleteNote={handleDeleteNote}
                      />
                    </CardContent>
                  </Card>
                )}
                
                {showExpertProfile && (
                  <Card className="shadow-md">
                    <CardContent className="p-0 h-[300px]">
                      <ExpertProfile expert={expertProfile} />
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          </motion.div>
        );
        
      case 'side-by-side':
      default:
        return (
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[600px] rounded-lg border"
          >
            <ResizablePanel 
              defaultSize={contentState.showTranscript || contentState.showNotes || showExpertProfile ? 70 : 100}
              minSize={30}
            >
              <div className="p-6 space-y-6">
                <ContentStream 
                  segments={segments}
                  currentTime={contentState.currentTime}
                  isPlaying={contentState.isPlaying}
                />
                
                <ClassroomControls 
                  contentState={contentState}
                  totalDuration={classroomContent.totalDuration}
                  availableLanguages={classroomContent.languages}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onReplay={handleReplay}
                  onSeek={handleSeek}
                  onSkipBack={handleSkipBack}
                  onSkipForward={handleSkipForward}
                  onPlaybackRateChange={handlePlaybackRateChange}
                  onLanguageChange={handleLanguageChange}
                  onToggleTranscript={handleToggleTranscript}
                  onToggleNotes={handleToggleNotes}
                  onToggleExpertProfile={handleToggleExpertProfile}
                />
              </div>
            </ResizablePanel>
            
            {(contentState.showTranscript || contentState.showNotes || showExpertProfile) && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={20}>
                  <AnimatePresence mode="wait">
                    {contentState.showTranscript && (
                      <motion.div 
                        key="transcript"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                      >
                        <Transcript 
                          segments={segments}
                          currentTime={contentState.currentTime}
                          onSeek={handleSeek}
                        />
                      </motion.div>
                    )}
                    
                    {contentState.showNotes && (
                      <motion.div 
                        key="notes"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                      >
                        <Notes 
                          notes={notes}
                          currentTime={contentState.currentTime}
                          onAddNote={handleAddNote}
                          onDeleteNote={handleDeleteNote}
                        />
                      </motion.div>
                    )}
                    
                    {showExpertProfile && (
                      <motion.div 
                        key="expert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                      >
                        <ExpertProfile expert={expertProfile} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-purple-50/30 dark:to-purple-900/5 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center animate-fade-in">
          {/* <div className="inline-block mb-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full text-purple-500 dark:text-purple-300 text-sm font-medium">
            Quantum Physics 101
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">
            {classroomContent.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            {classroomContent.description}
          </p> */}
          
          <div className="mt-6 flex justify-center">
            <LayoutSwitcher 
              currentLayout={layout}
              onLayoutChange={handleLayoutChange}
            />
          </div>
        </header>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default Classroom;
