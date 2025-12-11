/**
 * WORK SECTION COMPONENT (app/components/sections/WorkSection.tsx)
 * Displays website projects with "SEE MORE" button
 */

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Project } from "../../data/projects";
import ProjectCard from "../ProjectCard";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { Marquee } from "../ui/marquee";

interface WorkSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function WorkSection({ projects, onProjectClick }: WorkSectionProps) {
  const router = useRouter();
  
  // Filter only website projects
  const websiteProjects = projects.filter(p => p.type === "website");
  const firstProject = websiteProjects[0];

  return (
    <div className="w-full max-w-7xl relative h-full pt-20 md:pt-32 px-4 md:px-0 flex items-center justify-center">
      {/* Section Title - Fixed at top of viewport, aligned with navbar */}
      <div className="fixed top-10 md:top-32 left-30 md:left-20 w-full md:w-auto h-[14rem] md:h-[10rem] flex items-center justify-center md:justify-start z-0 origin-center md:origin-left pointer-events-none opacity-50 px-4 md:px-0">
         <div className="w-full md:w-auto scale-150 md:scale-100">
            <TextHoverEffect text="| PROJECTS" />
         </div>
      </div>
      
      {/* Projects Content */}
      <div className="h-full flex items-center justify-center relative z-10 pt-20 md:pt-0 w-full overflow-hidden">
        <div className="w-full h-[60vh] md:h-[70vh] flex items-center relative">
            
            {/* Desktop: Split View (Static Left, Marquee Right) */}
            <div className="hidden md:grid grid-cols-[1.6fr_1fr] gap-12 w-full h-full">
                {/* Left Column: First Project (Static) */}
                <div className="flex items-center justify-center w-full h-full relative">
                    <div className="w-full relative z-20">
                        {firstProject && (
                            <ProjectCard 
                                project={firstProject} 
                                onClick={onProjectClick} 
                                isFeatured={true}
                            />
                        )}
                    </div>
                </div>

                {/* Right Column: Vertical Marquee */}
                <div className="w-full h-full relative overflow-hidden">
                    <Marquee vertical className="[--duration:20s] h-full justify-center [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" pauseOnHover repeat={4}>
                        {websiteProjects.map((project) => (
                            <div key={project.id} className="h-auto w-full flex items-center justify-center py-2 px-2">
                                <div className="w-[80%]">
                                    <ProjectCard 
                                        project={project} 
                                        onClick={onProjectClick} 
                                    />
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Mobile: Horizontal Marquee and Featured Project */}
            <div className="md:hidden w-full h-full flex flex-col justify-center gap-8 px-4">
                {/* Featured Project */}
                <div className="w-full h-[250px] relative z-20">
                     {firstProject && (
                        <ProjectCard 
                            project={firstProject} 
                            onClick={onProjectClick} 
                            isFeatured={true}
                        />
                    )}
                </div>

                {/* Marquee */}
                <div className="w-full">
                    <Marquee className="[--duration:20s]" pauseOnHover>
                        {websiteProjects.slice(1).map((project) => (
                            <div key={project.id} className="w-[70vw] h-[200px] px-2">
                                <ProjectCard 
                                    project={project} 
                                    onClick={onProjectClick} 
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
      </div>

      {/* Mobile SEE MORE Button - Bottom of screen */}
      <motion.button
        onClick={() => router.push('/projects/websites')}
        className="md:hidden fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm tracking-widest transition-colors group z-40 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/50"
      >
        <span className="whitespace-nowrap">SEE MORE</span>
        <ChevronRight className="w-4 h-4 text-cyan-400" />
      </motion.button>
    </div>
  );
}

