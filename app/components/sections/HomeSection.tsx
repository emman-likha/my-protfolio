/**
 * HOME SECTION COMPONENT (app/components/sections/HomeSection.tsx)
 * Hero/landing section with introduction and tagline
 */

"use client";

import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <div className="max-w-5xl px-4 md:px-0">
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter"
      >
        <span className="block text-white">ARCHITECTING</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-cyan-200 to-white">
          DIGITAL REALITIES.
        </span>
      </motion.h1>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pl-4 md:pl-6 border-l-2 border-cyan-400"
      >
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-4">
          A <span className="text-cyan-400 font-semibold">web developer</span> passionate about crafting modern, responsive applications.
        </p>
        <p className="text-base sm:text-lg text-gray-400 font-mono">
          Specialized in Next.js and React development, with a creative side in graphic design and video editing as hobbies that fuel my visual storytelling.
        </p>
      </motion.div>
    </div>
  );
}

