import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutGrid, 
  Maximize2, 
  PanelLeft,
  Monitor
} from 'lucide-react';
import { ClassroomMode } from '@/types/classroom';
import { cn } from '@/lib/utils';

interface LayoutSwitcherProps {
  currentLayout: ClassroomMode;
  onLayoutChange: (layout: ClassroomMode) => void;
}

const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({
  currentLayout,
  onLayoutChange
}) => {
  const layouts = [
    {
      id: 'fullscreen' as ClassroomMode,
      icon: Maximize2,
      title: 'Fullscreen',
      description: 'Focus on content'
    },
    {
      id: 'side-by-side' as ClassroomMode,
      icon: PanelLeft,
      title: 'Side-by-side',
      description: 'Content with sidebar'
    },
    {
      id: 'compact' as ClassroomMode,
      icon: LayoutGrid,
      title: 'Compact',
      description: 'Optimized for small screens'
    }
  ];

  return (
    <div className="flex items-center justify-center gap-2 bg-background/80 backdrop-blur-sm p-1.5 rounded-lg border shadow-md">
      {layouts.map((layout) => {
        const isActive = currentLayout === layout.id;
        return (
          <Button
            key={layout.id}
            variant={isActive ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'relative transition-all duration-200 flex items-center gap-2',
              isActive 
                ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => onLayoutChange(layout.id)}
            title={`${layout.title} - ${layout.description}`}
          >
            <layout.icon size={18} className={cn('transition-all', isActive ? 'text-white' : 'text-muted-foreground')} />
            <span className="sr-only">{layout.title}</span>
            {isActive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-glow animate-pulse" />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default LayoutSwitcher;