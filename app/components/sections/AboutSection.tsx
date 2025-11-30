/**
 * ABOUT SECTION COMPONENT (app/components/sections/AboutSection.tsx)
 * Personal introduction and skills showcase
 */

"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl px-4 md:px-0">
      <div className="flex-1 text-base md:text-lg text-gray-300 space-y-6 font-light leading-relaxed">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">ABOUT ME</h2>
        <motion.p 
           initial={{ x: -20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.4 }}
        >
          I'm a multi-disciplinary creative developer passionate about the intersection of design and technology.
          My work is driven by the belief that the web should be an immersive extension of reality.
        </motion.p>
        <motion.p
           initial={{ x: -20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.6 }}
        >
          With a background in both traditional design and modern engineering, I bring a unique perspective to every project, whether it's a complex web application, a brand identity, or a motion graphic piece.
        </motion.p>
        
        {/* Tech Stack Tags */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-3 md:gap-4 mt-8 flex-wrap"
        >
          {["React", "Next.js", "TypeScript", "WebGL", "After Effects", "Figma"].map((tech) => (
            <span key={tech} className="px-3 md:px-4 py-1.5 md:py-2 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-xs md:text-sm">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

