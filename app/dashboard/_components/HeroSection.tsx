"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  name?: string;
  profile?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ name, profile }) => {
  return (
    // <div className="relative bg-white rounded-lg p-8 shadow-sm">
    //   <div className="max-w-2xl">
    //     <h2 className="text-3xl font-bold mb-4 text-primary">
    //       {name ? `Welcome, ${name}` : "Welcome!"}
    //     </h2>
    //     <p className="text-gray-600">
    //       Success is the sum of small efforts, repeated day in and day out. The expert in anything was once a beginner.
    //     </p>
    //   </div>
    //   {profile && (
    //     <div className="absolute right-8 bottom-0 w-40 p-4">
    //       <img
    //         src={profile}
    //         alt="Profile"
    //         className="w-full h-full object-cover rounded-2xl"
    //       />
    //     </div>
    //   )}
    // </div>
    <div className="container mx-auto px-6 py-8">
        <div 
          className="relative bg-cover bg-center rounded-lg p-8 mb-8"
          style={{ 
            backgroundImage: `linear-gradient(rgba(59, 30, 110, 0.85), rgba(76, 29, 149, 0.85)), url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1500)`,
          }}
        >
          <div className="max-w-2xl text-white">
            <h2 className="text-3xl font-bold mb-4">
              {name ? `Welcome back, ${name}` : "Welcome!"}
            </h2>
            <p className="text-white/80">
              Continue your learning journey with personalized courses designed to help you succeed in your exams. Track your progress, access study materials, and stay motivated.
            </p>
            <div className="mt-6">
              <Button className="bg-white hover:bg-gray-100 text-purple-700">
                Continue Learning
              </Button>
            </div>
          </div>
          {/* <div className="absolute right-8 bottom-0 w-40 hidden md:block">
            {profile && (
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover rounded-2xl"
              />
            )}
          </div> */}
        </div></div>
  );
};

export default HeroSection;