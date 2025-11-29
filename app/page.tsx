"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// Custom Arrow SVG Component
const LongArrow = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    shapeRendering="geometricPrecision" 
    textRendering="geometricPrecision" 
    imageRendering="optimizeQuality" 
    fillRule="evenodd" 
    clipRule="evenodd" 
    viewBox="0 0 512 243.58"
    className={className}
  >
    <path 
      fillRule="nonzero" 
      d="M373.57 0 512 120.75 371.53 243.58l-20.92-23.91 94.93-83L0 137.09v-31.75l445.55-.41-92.89-81.02z"
      fill="currentColor"
    />
  </svg>
);
import GridBackground from "./components/GridBackground";
import Navbar from "./components/Navbar";
import RightNav from "./components/RightNav";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import { projects, Project } from "./data/projects";

const websites = projects.filter(p => p.type === "website");
const graphics = projects.filter(p => p.type === "graphic");
const videos = projects.filter(p => p.type === "video");

// Animation variants for the sliding page effect
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0.5,
    filter: "blur(10px)",
    zIndex: 1,
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 2,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 30, mass: 1 },
      opacity: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0.5,
    filter: "blur(10px)",
    zIndex: 0,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 30, mass: 1 },
      opacity: { duration: 0.4 },
    },
  }),
};

export default function Home() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Page Navigation State
  const [page, setPage] = useState([0, 0]);
  const [currentSection, direction] = page;
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const sectionData = [
    {
      id: "home",
      subtitle: "Crafting digital experiences",
      content: (
        <div className="max-w-5xl">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter"
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
            className="pl-6 border-l-2 border-cyan-400"
          >
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-4">
              I bridge the gap between <span className="text-cyan-400 font-semibold">creative design</span> and <span className="text-cyan-400 font-semibold">robust engineering</span>.
            </p>
            <p className="text-lg text-gray-400 font-mono">
              Specializing in Next.js, interactive motion, and brand identity to build immersive web experiences that leave a lasting impact.
            </p>
          </motion.div>
        </div>
      ),
    },
    {
      id: "work",
      subtitle: "Web Development",
      content: (
        <div className="w-full max-w-7xl">
          <h2 className="text-4xl font-bold mb-8 text-cyan-400">SELECTED WORKS</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Projects Grid - Left Side */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {websites.slice(0, 2).map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={setSelectedProject} 
                />
              ))}
            </div>
            
            {/* SEE MORE Button - Right Side */}
            <motion.button
              onClick={() => router.push('/projects')}
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-cyan-400 hover:text-cyan-300 font-mono text-2xl md:text-3xl tracking-widest transition-colors group shrink-0 md:ml-8"
            >
              <span>SEE MORE</span>
              <LongArrow className="w-24 h-auto group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      ),
    },
    {
      id: "graphics",
      subtitle: "Visual Design",
      content: (
        <div className="w-full max-w-7xl">
          <h2 className="text-4xl font-bold mb-8 text-cyan-400">GRAPHICS & BRANDING</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {graphics.slice(0, 2).map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={setSelectedProject} 
                />
              ))}
            </div>
            
            <motion.button
              onClick={() => router.push('/gallery')}
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-cyan-400 hover:text-cyan-300 font-mono text-2xl md:text-3xl tracking-widest transition-colors group shrink-0 md:ml-8"
            >
              <span>SEE MORE</span>
              <LongArrow className="w-24 h-auto group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      ),
    },
    {
      id: "videos",
      subtitle: "Motion & Video",
      content: (
        <div className="w-full max-w-7xl">
          <h2 className="text-4xl font-bold mb-8 text-cyan-400">VIDEOGRAPHY</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {videos.slice(0, 2).map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={setSelectedProject} 
                />
              ))}
            </div>
            
            <motion.button
              onClick={() => router.push('/videos')}
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-cyan-400 hover:text-cyan-300 font-mono text-2xl md:text-3xl tracking-widest transition-colors group shrink-0 md:ml-8"
            >
              <span>SEE MORE</span>
              <LongArrow className="w-24 h-auto group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      ),
    },
    {
      id: "about",
      subtitle: "The person behind the code",
      content: (
        <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl">
          <div className="flex-1 text-lg text-gray-300 space-y-6 font-light leading-relaxed">
            <h2 className="text-4xl font-bold mb-8 text-white">ABOUT ME</h2>
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
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 mt-8 flex-wrap"
            >
              {["React", "Next.js", "TypeScript", "WebGL", "After Effects", "Figma"].map((tech) => (
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
            {["GitHub", "LinkedIn", "Twitter", "Instagram"].map((social) => (
              <a key={social} href="#" className="text-gray-400 hover:text-white font-mono text-lg uppercase tracking-widest hover:underline underline-offset-8 decoration-cyan-400">
                {social}
              </a>
            ))}
          </motion.div>
        </div>
      ),
    },
  ];

  const changeSection = useCallback((newDirection: number) => {
    if (isAnimating || selectedProject) return; 
    
    const nextIndex = currentSection + newDirection;
    
    if (nextIndex >= 0 && nextIndex < sectionData.length) {
      setIsAnimating(true);
      setPage([nextIndex, newDirection]);
      setTimeout(() => setIsAnimating(false), 600); 
    }
  }, [currentSection, isAnimating, selectedProject, sectionData.length]);

  const nextSection = () => changeSection(1);
  const prevSection = () => changeSection(-1);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === "Escape") setSelectedProject(null);
        return;
      }
      if (e.key === "ArrowDown") nextSection();
      if (e.key === "ArrowUp") prevSection();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSection, prevSection, selectedProject]);

  // Handle Wheel/Scroll navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (selectedProject) return;
      if (scrollTimeout.current) return;

      if (Math.abs(e.deltaY) > 30) { 
        if (e.deltaY > 0) {
          nextSection();
        } else {
          prevSection();
        }
        
        scrollTimeout.current = setTimeout(() => {
          scrollTimeout.current = null;
        }, 800); 
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextSection, prevSection, selectedProject]);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <GridBackground />
      <Navbar />
      
      <RightNav 
        onNext={nextSection} 
        onPrev={prevSection} 
        canGoNext={currentSection < sectionData.length - 1}
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
            className="absolute inset-0 w-full h-full flex items-center px-4 md:px-24 pt-20 pb-24"
          >
            <div className="w-full h-full flex flex-col justify-center">
              <div className="overflow-y-auto max-h-full pr-4 no-scrollbar">
                {sectionData[currentSection].content}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Left Info & Indicators */}
      <div className="absolute bottom-8 left-8 md:left-24 z-20 flex flex-col gap-4">
        {/* Section Title & Number */}
        <motion.div 
          key={currentSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-4 text-cyan-400 font-mono text-sm tracking-widest"
        >
          <span className="text-xl font-bold">0{currentSection + 1}</span>
          <span className="w-12 h-[1px] bg-cyan-400/50" />
          <span className="uppercase">{sectionData[currentSection].subtitle}</span>
        </motion.div>

        {/* Indicators */}
        <div className="flex gap-2">
          {sectionData.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 transition-all duration-300 ${
                idx === currentSection ? "w-8 bg-cyan-400" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </main>
  );
}
