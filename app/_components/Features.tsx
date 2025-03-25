import React from 'react';
import { Brain, Gauge, BarChart, Clock, PenTool, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-10 h-10 text-primary-600" />,
      title: 'AI-Powered Learning',
      description: 'Our adaptive learning system tailors content to your individual needs and learning style for maximum efficiency.'
    },
    {
      icon: <Gauge className="w-10 h-10 text-primary-600" />,
      title: 'Progress Tracking',
      description: 'Visualize your improvement with detailed analytics and insights on strengths and areas that need focus.'
    },
    {
      icon: <PenTool className="w-10 h-10 text-primary-600" />,
      title: 'Interactive Exercises',
      description: 'Engage with immersive content that makes learning active and enjoyable with immediate feedback.'
    },
    {
      icon: <Clock className="w-10 h-10 text-primary-600" />,
      title: 'Learn at Your Pace',
      description: 'Flexible schedules allow you to progress through materials at the speed that works best for you.'
    },
    {
      icon: <Users className="w-10 h-10 text-primary-600" />,
      title: 'Collaborative Learning',
      description: 'Connect with peers and instructors in discussion forums and virtual study groups.'
    },
    {
      icon: <BarChart className="w-10 h-10 text-primary-600" />,
      title: 'Achievement System',
      description: 'Stay motivated with badges, certifications, and milestone rewards as you progress.'
    }
  ];

  return (
    <section id="features" className="section-container">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 border border-primary-200 mb-4">
          <span className="text-xs font-medium text-primary-700">Why Choose Us</span>
        </div>
        <h2 className="heading-lg mb-6">
          Cutting-Edge Features That <span className="text-gradient">Redefine Learning</span>
        </h2>
        <p className="text-lg text-foreground/70">
          Our innovative platform combines technology with educational expertise to deliver a learning experience that adapts to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="feature-card"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <div className="rounded-lg bg-primary-50 w-16 h-16 flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="heading-sm mb-3">{feature.title}</h3>
            <p className="text-foreground/70">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;