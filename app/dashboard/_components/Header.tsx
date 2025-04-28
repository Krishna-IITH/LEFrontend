"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { googleLogout } from '@react-oauth/google';

interface HeaderProps {
  profile?: string;
  name?: string;
}

const Header: React.FC<HeaderProps> = ({ profile, name }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const getLogout = () => {
    localStorage.removeItem('response');
    googleLogout();
    router.push('/');
  };

  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm flex sticky justify-between items-center mb-4 z-30 top-0">
      <h1 className="text-purple-600 text-xl font-medium">LEARNEASY</h1>
      
      <div className="relative">
        <div
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <img
            src={profile || "/default-profile.png"} // fallback image
            alt="Profile"
            className="w-full h-full object-cover"
          /> {name}
        </div>

        {showMenu && (
          <div
            className="absolute right-0 w-40 bg-white border rounded-lg shadow-md py-2 mt-0 z-50"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
              onClick={() => router.push('/profile')}
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
              onClick={getLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;