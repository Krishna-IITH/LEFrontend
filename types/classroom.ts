export interface ContentSegment {
    id: string;
    type: 'text' | 'image';
    content: string;
    timestamp: number; // Start time in seconds
    duration: number; // Duration in seconds
    language: string;
  }
  
  export interface ClassroomContent {
    id: string;
    title: string;
    description: string;
    totalDuration: number; // Total duration in seconds
    segments: ContentSegment[];
    languages: string[]; // Available languages
  }
  
  export interface ExpertProfile {
    id: string;
    name: string;
    title: string;
    avatar: string;
    bio: string;
  }
  
  export interface Note {
    id: string;
    text: string;
    timestamp: number;
    selectedText?: string;
  }
  
  export interface ContentState {
    isPlaying: boolean;
    currentTime: number;
    playbackRate: number;
    selectedLanguage: string;
    showTranscript: boolean;
    showNotes: boolean;
  }
  
  export type ClassroomMode = 'fullscreen' | 'side-by-side' | 'compact';
  