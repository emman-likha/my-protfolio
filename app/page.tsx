"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GridBackground from "./components/GridBackground";
import Navbar from "./components/Navbar";
import RightNav from "./components/RightNav";

const sections = [
  {
    id: "home",
    title: "CREATIVE DEVELOPER",
    subtitle: "Crafting digital experiences",
    content: (
      <div className="max-w-4xl">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400 tracking-tighter"
        >
          FUTURE IS NOW.
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 font-mono border-l-2 border-cyan-400 pl-6"
        >
          I build accessible, pixel-perfect, performant, and futuristic web experiences.
        </motion.p>
      </div>
    ),
  },
  {
    id: "work",
    title: "SELECTED WORKS",
    subtitle: "Recent projects",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {[1, 2].map((i) => (
          <motion.div 
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + (i * 0.2) }}
            className="group relative aspect-video bg-slate-900/50 border border-white/10 rounded-lg overflow-hidden hover:border-cyan-400/50 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Project 0{i}</h3>
              <p className="text-gray-400 font-mono text-sm">Next.js / WebGL / Three.js</p>
            </div>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: "about",
    title: "ABOUT ME",
    subtitle: "The person behind the code",
    content: (
      <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl">
        <div className="flex-1 text-lg text-gray-300 space-y-6 font-light leading-relaxed">
          <motion.p 
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.4 }}
          >
            I'm a developer passionate about the intersection of design and technology.
            My work is driven by the belief that the web should be an immersive extension of reality.
          </motion.p>
          <motion.p
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.6 }}
          >
            With a background in both traditional design and modern engineering, I bring a unique perspective to every project.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 mt-8"
          >
            {["React", "Next.js", "TypeScript", "WebGL"].map((tech) => (
              <span key={tech} className="px-4 py-2 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-sm">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    id: "contact",
    title: "GET IN TOUCH",
    subtitle: "Let's build something together",
    content: (
      <div className="text-center">
        <motion.a 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          href="mailto:hello@example.com" 
          className="text-5xl md:text-7xl font-bold text-white hover:text-cyan-400 transition-colors tracking-tight"
        >
          hello@example.com
        </motion.a>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-8 mt-12"
        >
          {["GitHub", "LinkedIn", "Twitter"].map((social) => (
            <a key={social} href="#" className="text-gray-400 hover:text-white font-mono text-lg uppercase tracking-widest hover:underline underline-offset-8 decoration-cyan-400">
              {social}
            </a>
          ))}
        </motion.div>
      </div>
    ),
  },
];

// Animation variants for the sliding page effect
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0.5, // Start slightly faded for depth
    filter: "blur(10px)",
    zIndex: 1,
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 2,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 30, mass: 1 }, // Smooth spring
      opacity: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0.5,
    filter: "blur(10px)",
    zIndex: 0,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 30, mass: 1 }, // Smooth spring
      opacity: { duration: 0.4 },
    },
  }),
};

export default function Home() {
  const [page, setPage] = useState([0, 0]);
  const [currentSection, direction] = page;
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const changeSection = useCallback((newDirection: number) => {
    if (isAnimating) return;
    
    const nextIndex = currentSection + newDirection;
    
    if (nextIndex >= 0 && nextIndex < sections.length) {
      setIsAnimating(true);
      setPage([nextIndex, newDirection]);
      // Reduced timeout to allow faster navigation but prevent rapid firing
      setTimeout(() => setIsAnimating(false), 600); 
    }
  }, [currentSection, isAnimating]);

  const nextSection = () => changeSection(1);
  const prevSection = () => changeSection(-1);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") nextSection();
      if (e.key === "ArrowUp") prevSection();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSection, prevSection]);

  // Handle Wheel/Scroll navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scroll behavior if needed, though overflow: hidden handles most
      // e.preventDefault(); 

      if (scrollTimeout.current) return;

      if (Math.abs(e.deltaY) > 30) { // Threshold to avoid accidental small scrolls
        if (e.deltaY > 0) {
          nextSection();
        } else {
          prevSection();
        }
        
        // Cooldown for scroll wheel
        scrollTimeout.current = setTimeout(() => {
          scrollTimeout.current = null;
        }, 800); 
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextSection, prevSection]);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <GridBackground />
      <Navbar />
      
      <RightNav 
        onNext={nextSection} 
        onPrev={prevSection} 
        canGoNext={currentSection < sections.length - 1}
        canGoPrev={currentSection > 0}
      />

      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSection}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex items-center px-8 md:px-24"
          >
            <div className="w-full">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mb-4 flex items-center gap-4 text-cyan-400 font-mono text-sm tracking-widest"
              >
                <span>0{currentSection + 1}</span>
                <span className="w-12 h-[1px] bg-cyan-400/50" />
                <span>{sections[currentSection].subtitle}</span>
              </motion.div>
              
              {sections[currentSection].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page Indicator */}
      <div className="absolute bottom-12 left-8 md:left-24 flex gap-2 z-20">
        {sections.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 transition-all duration-300 ${
              idx === currentSection ? "w-8 bg-cyan-400" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
