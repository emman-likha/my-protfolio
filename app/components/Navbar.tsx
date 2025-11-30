/**
 * NAVBAR COMPONENT (app/components/Navbar.tsx)
 * Top navigation bar with:
 * - Portfolio logo on the left
 * - Navigation links on the right (desktop only)
 * - Mobile menu with full-screen overlay
 * - Animated entrance from top
 * - Mix-blend-difference for visibility over content
 * - Click handlers to navigate to sections
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionIndex: number) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Map navbar items to their section indices
  // Section order: HOME (0), WORK (1), GRAPHICS (2), VIDEOS (3), ABOUT (4), CONTACT (5)
  const navItems = [
    { label: "WORK", sectionIndex: 1 },
    { label: "GRAPHICS", sectionIndex: 2 },
    { label: "VIDEOS", sectionIndex: 3 },
    { label: "ABOUT", sectionIndex: 4 },
    { label: "CONTACT", sectionIndex: 5 },
  ];

  const handleMobileNavClick = (sectionIndex: number) => {
    onNavigate(sectionIndex);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-6 mix-blend-difference text-white"
      >
        {/* Logo: <PORTFOLIO/> */}
        <button 
          onClick={() => onNavigate(0)}
          className="text-xl md:text-2xl font-bold tracking-tighter font-mono hover:opacity-80 transition-opacity"
        >
          <span className="text-cyan-400">&lt;</span>
          PORTFOLIO
          <span className="text-cyan-400">/&gt;</span>
        </button>
        
        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex gap-6 lg:gap-8 font-mono text-xs lg:text-sm tracking-widest">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.sectionIndex)}
              className="relative group cursor-pointer hover:text-cyan-400 transition-colors duration-300"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          MENU
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-4 p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Menu Items */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8 px-4"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={() => handleMobileNavClick(item.sectionIndex)}
                  className="text-4xl font-bold font-mono tracking-wider text-white hover:text-cyan-400 transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
