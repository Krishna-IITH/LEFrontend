"use client";

import React from 'react';

interface HeroSectionProps {
  name?: string;
  profile?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ name, profile }) => {
  console.log(name, profile);
  return (
    <div className="relative bg-gray-200 rounded-lg p-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          {name ? `Welcome, ${name}` : "Welcome!"}
        </h2>
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