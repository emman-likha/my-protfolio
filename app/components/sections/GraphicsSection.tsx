/**
 * GRAPHICS SECTION COMPONENT (app/components/sections/GraphicsSection.tsx)
 * Displays graphic design projects with "SEE MORE" button
 */

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Project } from "../../data/projects";
import ProjectCard from "../ProjectCard";
import { TextHoverEffect } from "../ui/text-hover-effect";

interface GraphicsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function GraphicsSection({ projects, onProjectClick }: GraphicsSectionProps) {
  const router = useRouter();

  return (
    <div className="w-full max-w-7xl relative h-full pt-20 md:pt-32 px-4 md:px-0">
      {/* Section Title - Fixed at top of viewport, aligned with navbar */}
      <div className="fixed top-20 md:top-32 left-4 md:left-20 h-[8rem] md:h-[10rem] flex items-center justify-start z-30 scale-75 md:scale-100 origin-left">
         <TextHoverEffect text="| GRAPHIC ARTS" />
      </div>
      {/* Projects Grid - Shows first 2 graphic projects */}
      <div className="h-full flex items-center justify-center relative z-10 pointer-events-none pt-20 md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full pointer-events-auto max-w-full">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={onProjectClick} 
            />
          ))}
        </div>
      </div>
      {/* SEE MORE Button - Hidden on mobile, shown on desktop */}
      <motion.button
        onClick={() => router.push('/projects/graphics')}
        whileHover={{ x: -10 }}
        className="hidden md:flex fixed right-16 top-1/2 -translate-y-1/2 items-center gap-6 text-cyan-400 hover:text-cyan-300 font-mono text-2xl md:text-3xl tracking-widest transition-colors group z-40"
      >
        <span className="whitespace-nowrap">SEE MORE</span>
        <div className="flex items-center">
          <span className="h-[2px] w-6 bg-cyan-400 transition-all duration-300 group-hover:w-40" />
          <ChevronRight className="w-6 h-6 text-cyan-400 -ml-1" />
        </div>
      </motion.button>
      {/* Mobile SEE MORE Button - Bottom of screen */}
      <motion.button
        onClick={() => router.push('/projects/graphics')}
        className="md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 text-cyan-400 hover:text-cyan-300 font-mono text-lg tracking-widest transition-colors group z-40 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-400/50"
      >
        <span className="whitespace-nowrap">SEE MORE</span>
        <ChevronRight className="w-5 h-5 text-cyan-400" />
      </motion.button>
    </div>
  );
}

