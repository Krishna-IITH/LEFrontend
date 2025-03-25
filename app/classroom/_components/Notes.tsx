import React, { useState, useEffect } from 'react';
import { Note } from '@/types/classroom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatTime, formatTimestamp } from '@/utils/timeUtils';
import { BookOpen, Trash2, Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface NotesProps {
  notes: Note[];
  currentTime: number;
  onAddNote: (text: string, selectedText?: string) => void;
  onDeleteNote: (id: string) => void;
}

const Notes: React.FC<NotesProps> = ({
  notes,
  currentTime,
  onAddNote,
  onDeleteNote
}) => {
  const { toast } = useToast();
  const [newNote, setNewNote] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote, selectedText || undefined);
      setNewNote('');
      setSelectedText('');
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully",
        duration: 2000
      });
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
    }
  };

  const copyToClipboard = (noteId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(noteId);
    
    toast({
      title: "Text copied",
      description: "Note content copied to clipboard",
      duration: 2000
    });
    
    setTimeout(() => setCopied(null), 2000);
  };

  // Sort notes by timestamp (newest first)
  const sortedNotes = [...notes].sort((a, b) => b.timestamp - a.timestamp);

  // Reset selected text when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (!window.getSelection()?.toString()) {
        setSelectedText('');
      }
    };
    
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-primary" />
          <h3 className="text-lg font-medium">Your Notes</h3>
        </div>
        
        <form onSubmit={handleNoteSubmit} className="space-y-3">
          {selectedText && (
            <div className="p-3 border rounded-md text-sm bg-secondary/10 mb-2 relative">
              <p className="font-medium text-xs text-muted-foreground mb-1">Selected Text:</p>
              <p className="italic text-sm">"{selectedText}"</p>
            </div>
          )}
          
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            className="resize-none min-h-24"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-xs bg-secondary/20 px-2 py-1 rounded-full">
              At {formatTimestamp(currentTime)}
            </span>
            <Button type="submit" size="sm" disabled={!newNote.trim()}>
              Save Note
            </Button>
          </div>
        </form>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {sortedNotes.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 px-4 border rounded-md border-dashed">
              <p className="mb-2">No notes yet</p>
              <p className="text-sm">Take notes as you go through the content to help you remember key points.</p>
            </div>
          ) : (
            sortedNotes.map((note) => (
              <div key={note.id} className="p-4 border rounded-md bg-card hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {formatTime(note.timestamp)}
                    </span>
                    {note.selectedText && (
                      <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full">
                        With quote
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-muted-foreground hover:text-primary"
                      onClick={() => copyToClipboard(note.id, note.text)}
                    >
                      {copied === note.id ? <Check size={14} /> : <Copy size={14} />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => onDeleteNote(note.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
                
                {note.selectedText && (
                  <div className="p-3 bg-muted/20 border-l-2 border-primary/30 text-sm italic text-muted-foreground mb-2 rounded-sm">
                    "{note.selectedText}"
                  </div>
                )}
                
                <p className="text-sm whitespace-pre-wrap">{note.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
