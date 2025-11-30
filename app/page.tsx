/**
 * MAIN PORTFOLIO PAGE (app/page.tsx)
 * This is the main landing page component that handles:
 * - Full-page section navigation (Home, Work, Graphics, Videos, About, Contact)
 * - Project card displays
 * - Modal interactions
 * - Keyboard and scroll navigation
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component Imports
import GridBackground from "./components/GridBackground";
import Navbar from "./components/Navbar";
import RightNav from "./components/RightNav";
import ProjectModal from "./components/ProjectModal";
import { projects, Project } from "./data/projects";

// Section Components
import HomeSection from "./components/sections/HomeSection";
import WorkSection from "./components/sections/WorkSection";
import GraphicsSection from "./components/sections/GraphicsSection";
import VideosSection from "./components/sections/VideosSection";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";

// Filter projects by type for different sections
const websites = projects.filter(p => p.type === "website");
const graphics = projects.filter(p => p.type === "graphic");
const videos = projects.filter(p => p.type === "video");

/**
 * SLIDE ANIMATION VARIANTS
 * Defines the animation states for section transitions:
 * - enter: Initial state when entering (slides in from top/bottom with blur)
 * - center: Active state (fully visible, no blur)
 * - exit: Final state when leaving (slides out with blur)
 */
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

/**
 * MAIN HOME COMPONENT
 * Handles all page state and navigation logic
 */
export default function Home() {
  // State: Currently selected project for modal display
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // State: Page navigation - [currentSectionIndex, direction]
  const [page, setPage] = useState([0, 0]);
  const [currentSection, direction] = page;
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  /**
   * SECTION DATA ARRAY
   * Defines all the sections/pages of the portfolio:
   * Each section has: id, subtitle, and content component
   */
  const sectionData = [
    // SECTION 1: HOME / HERO
    {
      id: "home",
      subtitle: "Crafting digital experiences",
      content: <HomeSection />,
    },
    // SECTION 2: WORK / WEBSITES
    {
      id: "work",
      subtitle: "Web Development",
      content: <WorkSection projects={websites} onProjectClick={setSelectedProject} />,
    },
    // SECTION 3: GRAPHICS & BRANDING
    {
      id: "graphics",
      subtitle: "Visual Design",
      content: <GraphicsSection projects={graphics} onProjectClick={setSelectedProject} />,
    },
    // SECTION 4: VIDEOS / VIDEOGRAPHY
    {
      id: "videos",
      subtitle: "Motion & Video",
      content: <VideosSection projects={videos} onProjectClick={setSelectedProject} />,
    },
    // SECTION 5: ABOUT ME
    {
      id: "about",
      subtitle: "The person behind the code",
      content: <AboutSection />,
    },
    // SECTION 6: CONTACT
    {
      id: "contact",
      subtitle: "Let's build something together",
      content: <ContactSection />,
    },
  ];

  /**
   * SECTION NAVIGATION FUNCTION
   * Changes the current section with animation
   * @param newDirection - 1 for next, -1 for previous
   */
  const changeSection = useCallback((newDirection: number) => {
    if (isAnimating || selectedProject) return; // Prevent navigation during animation or when modal is open
    
    const nextIndex = currentSection + newDirection;
    
    if (nextIndex >= 0 && nextIndex < sectionData.length) {
      setIsAnimating(true);
      setPage([nextIndex, newDirection]);
      setTimeout(() => setIsAnimating(false), 600); // Reset animation flag after transition
    }
  }, [currentSection, isAnimating, selectedProject, sectionData.length]);

  // Navigation helper functions
  const nextSection = () => changeSection(1);
  const prevSection = () => changeSection(-1);
  
  /**
   * NAVIGATE TO SPECIFIC SECTION
   * Jumps directly to a section by index
   * @param sectionIndex - Index of the section to navigate to
   */
  const goToSection = useCallback((sectionIndex: number) => {
    if (isAnimating || selectedProject) return;
    if (sectionIndex < 0 || sectionIndex >= sectionData.length) return;
    if (sectionIndex === currentSection) return; // Already on this section
    
    setIsAnimating(true);
    const direction = sectionIndex > currentSection ? 1 : -1;
    setPage([sectionIndex, direction]);
    setTimeout(() => setIsAnimating(false), 600);
  }, [currentSection, isAnimating, selectedProject, sectionData.length]);

  /**
   * KEYBOARD NAVIGATION
   * Arrow keys to navigate sections, Escape to close modal
   */
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

  /**
   * MOUSE WHEEL / SCROLL NAVIGATION
   * Scroll up/down to navigate between sections
   * Includes debouncing to prevent rapid section changes
   */
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
      {/* Background Grid Pattern */}
      <GridBackground />
      
      {/* Top Navigation Bar */}
      <Navbar onNavigate={goToSection} />
      
      {/* Right Side Navigation Arrows */}
      <RightNav 
        onNext={nextSection} 
        onPrev={prevSection} 
        canGoNext={currentSection < sectionData.length - 1}
        canGoPrev={currentSection > 0}
      />

      {/* Main Content Area - Animated Section Transitions */}
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
                {/* Render current section content */}
                {sectionData[currentSection].content}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Left: Section Number & Title Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 lg:left-24 z-20 flex flex-col gap-3 md:gap-4">
        {/* Section Number (e.g., "01", "02") and Subtitle */}
        <motion.div 
          key={currentSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 md:gap-4 text-cyan-400 font-mono text-xs md:text-sm tracking-widest"
        >
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold">0{currentSection + 1}</span>
          <span className="w-8 md:w-12 h-[1px] bg-cyan-400/50" />
          <span className="uppercase hidden sm:inline">{sectionData[currentSection].subtitle}</span>
        </motion.div>

        {/* Progress Dots - Shows which section is active */}
        <div className="flex gap-1.5 md:gap-2">
          {sectionData.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 transition-all duration-300 ${
                idx === currentSection ? "w-6 md:w-8 bg-cyan-400" : "w-1.5 md:w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal - Opens when a project card is clicked */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </main>
  );
}
