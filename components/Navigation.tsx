"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/nav/Streamsift_logo.svg"
            alt="StreamSift"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {/* Navigation Pills Container */}
          <div className="flex items-center space-x-6 bg-gray-800/50 backdrop-blur-lg rounded-full px-8 py-3 border border-gray-700/50">
            <a
              href="#"
              className="text-white hover:text-purple-400 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-purple-400 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-white hover:text-purple-400 transition-colors font-medium"
            >
              Log In
            </a>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full text-white font-semibold hover:opacity-90 transition-opacity">
              Sign Up
            </button>
          </div>

          {/* Analyze My Stream Button */}
          <div className="ml-6">
            <Image
              src="/images/nav/Analyze-btn.png"
              alt="Analyze My Stream"
              width={180}
              height={50}
              className="h-12 w-auto cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-lg border-t border-gray-700/50 rounded-b-2xl">
          <div className="px-6 py-4 space-y-4">
            <a
              href="#"
              className="block text-white hover:text-purple-400 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-white hover:text-purple-400 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="block text-white hover:text-purple-400 transition-colors font-medium"
            >
              Log In
            </a>
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full text-white font-semibold hover:opacity-90 transition-opacity mb-4">
              Sign Up
            </button>
            <div className="flex justify-center">
              <Image
                src="/images/nav/Analyze-btn.png"
                alt="Analyze My Stream"
                width={160}
                height={45}
                className="h-11 w-auto cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
