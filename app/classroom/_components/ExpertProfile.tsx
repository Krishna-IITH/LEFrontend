import React from 'react';
import { ExpertProfile as ExpertProfileType } from '@/types/classroom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Globe, Mail, Twitter, Linkedin, BookOpen } from 'lucide-react';

interface ExpertProfileProps {
  expert: ExpertProfileType;
}

const ExpertProfile: React.FC<ExpertProfileProps> = ({ expert }) => {
  return (
    <div className="h-full overflow-y-auto bg-card rounded-xl border p-6">
      <div className="text-center mb-6">
        <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-background ring-2 ring-primary/20">
          <AvatarImage src={expert.avatar} alt={expert.name} />
          <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold">{expert.name}</h3>
        <p className="text-muted-foreground">{expert.title}</p>
        
        <div className="flex justify-center space-x-2 mt-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Twitter size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Linkedin size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Mail size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Globe size={16} />
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-muted/20 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-primary mb-2">About</h4>
          <p className="text-sm leading-relaxed">{expert.bio}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-primary mb-3">Areas of Expertise</h4>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">Quantum Physics</span>
            <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">Theoretical Physics</span>
            <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">Quantum Mechanics</span>
            <span className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1">Quantum Computing</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-primary mb-3">Recent Publications</h4>
          <ul className="text-sm space-y-3">
            {[
              { title: "Quantum Entanglement in High-Energy Physics", year: 2023 },
              { title: "The Future of Quantum Computing", year: 2022 },
              { title: "Understanding Quantum Superposition", year: 2021 }
            ].map((pub, idx) => (
              <li key={idx} className="flex items-start gap-2 p-2 hover:bg-muted/10 rounded transition-colors">
                <BookOpen size={14} className="mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium hover:text-primary cursor-pointer transition-colors">{pub.title}</p>
                  <p className="text-xs text-muted-foreground">{pub.year}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t pt-4">
          <Button variant="outline" size="sm" className="w-full">
            Contact Expert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfile;
