import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "EduPulse has completely transformed how I approach studying. The personalized learning path identified exactly where I needed to focus.",
      name: "Alex Johnson",
      role: "Computer Science Student",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      quote: "As an educator, I'm impressed by the platform's ability to adapt to different learning styles. My students are more engaged than ever.",
      name: "Dr. Sarah Williams",
      role: "University Professor",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      quote: "The interactive exercises made difficult concepts easy to understand. I improved my grades within just one semester of using EduPulse.",
      name: "Michael Lee",
      role: "High School Student",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="bg-primary-50/70 py-20">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary-200 mb-4">
            <span className="text-xs font-medium text-primary-700">Success Stories</span>
          </div>
          <h2 className="heading-lg mb-6">
            What Our <span className="text-gradient">Users Say</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Join thousands of satisfied students and educators who have experienced the EduPulse difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-8 card-hover relative">
              <Quote className="absolute top-6 right-6 text-primary-200 w-10 h-10" />
              
              <div className="flex space-x-1 mb-6">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                  />
                ))}
              </div>
              
              <p className="mb-8 text-foreground/80 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;