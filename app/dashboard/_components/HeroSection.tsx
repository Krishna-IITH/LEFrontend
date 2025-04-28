"use client";

import React from 'react';

interface HeroSectionProps {
  name?: string;
  profile?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ name, profile }) => {
  return (
    <div className="relative bg-white rounded-lg p-8 shadow-sm">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          {name ? `Welcome, ${name}` : "Welcome!"}
        </h2>
        <p className="text-gray-600">
          Success is the sum of small efforts, repeated day in and day out. The expert in anything was once a beginner.
        </p>
      </div>
      {profile && (
        <div className="absolute right-8 bottom-0 w-40 p-4">
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default HeroSection;