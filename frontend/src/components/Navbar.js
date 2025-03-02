import React from 'react';
import Link from 'next/link';
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 md:top-0 md:bottom-auto w-full bg-white border-t md:border-b md:border-t-0 border-gray-200 py-3 px-4 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo - only visible on md screens and above */}
        <div className="hidden md:block">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-instagram-purple to-instagram-pink text-transparent bg-clip-text">
            Instagram Clone
          </Link>
        </div>
        
        {/* Search - only visible on md screens and above */}
        <div className="hidden md:block relative w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 rounded-md py-1 px-3 focus:outline-none"
          />
          <FaSearch className="absolute right-3 top-2 text-gray-400" />
        </div>
        
        {/* Navigation Icons */}
        <div className="flex justify-between w-full md:w-auto space-x-6">
          <Link href="/" className="text-xl flex flex-col items-center text-gray-700 hover:text-black">
            <FaHome />
            <span className="text-xs mt-1 md:hidden">Home</span>
          </Link>
          <Link href="/search" className="text-xl flex flex-col items-center text-gray-700 hover:text-black md:hidden">
            <FaSearch />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link href="/create" className="text-xl flex flex-col items-center text-gray-700 hover:text-black">
            <FaPlusSquare />
            <span className="text-xs mt-1 md:hidden">Create</span>
          </Link>
          <Link href="/activity" className="text-xl flex flex-col items-center text-gray-700 hover:text-black">
            <FaHeart />
            <span className="text-xs mt-1 md:hidden">Activity</span>
          </Link>
          <Link href="/profile" className="text-xl flex flex-col items-center text-gray-700 hover:text-black">
            <FaUser />
            <span className="text-xs mt-1 md:hidden">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
