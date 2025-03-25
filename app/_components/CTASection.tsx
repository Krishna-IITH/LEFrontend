import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const CTASection = () => {
  const benefits = [
    "Personalized learning experience",
    "Access to 500+ premium courses",
    "Interactive exercises & quizzes",
    "Progress tracking & analytics",
    "Learning path recommendations",
    "Certificate upon completion"
  ];

  return (
    <section id="get-started" className="section-container">
      <div className="glass-card bg-primary-600/95 backdrop-blur-md overflow-hidden rounded-3xl text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-16">
            <h2 className="heading-lg mb-6">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-lg">
              Join thousands of students who are already experiencing the future of education with EduPulse. Start your journey today!
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 text-primary-200 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#sign-up" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-primary-700 bg-white hover:bg-primary-50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/20"
              >
                Get Started Free
                <ArrowRight size={16} className="ml-2" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                Contact Sales
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-400 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-accent rounded-full opacity-20 blur-3xl"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-3/4 aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1629872430082-93d8912beccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" 
                  alt="Student using EduPulse" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"></div>
                
                {/* Floating Stats Card */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass-card bg-white/20 backdrop-blur-md p-6 rounded-xl w-4/5 text-center">
                  <p className="font-bold text-2xl mb-2">94% Success Rate</p>
                  <p className="text-white/80">Students who complete our courses report significant improvement in their subject mastery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;