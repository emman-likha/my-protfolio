/**
 * PROJECT CARD COMPONENT (app/components/ProjectCard.tsx)
 * Displays a single project as a card with:
 * - Thumbnail (image or gradient background)
 * - Project category tag
 * - Project title and metadata
 * - Hover effects and quick action buttons
 * - Click to open modal with full details
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "../data/projects";
import { Play, Monitor, Image as ImageIcon, Github, ExternalLink } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  isFeatured?: boolean;
}

export default function ProjectCard({ project, onClick, isFeatured = false }: ProjectCardProps) {
  // Determine icon based on project type
  const Icon = project.type === "video" ? Play : project.type === "website" ? Monitor : ImageIcon;
  const [imageError, setImageError] = useState(false);
  
  // Check if thumbnail is an image URL or a gradient class
  const isImageUrl = (project.thumbnail.startsWith('http') || project.thumbnail.startsWith('/')) && !imageError;
  
  // Fallback gradient colors for each project (used when image fails to load)
  const fallbackGradients: Record<string, string> = {
    "web-1": "bg-gradient-to-br from-emerald-500 to-teal-600",
    "web-2": "bg-gradient-to-br from-blue-500 to-indigo-600",
    "web-3": "bg-gradient-to-br from-rose-500 to-pink-600",
    "web-4": "bg-gradient-to-br from-orange-500 to-red-600",
    "web-5": "bg-gradient-to-br from-purple-500 to-violet-600",
  };
  
  const fallbackGradient = fallbackGradients[project.id] || "bg-gradient-to-br from-slate-600 to-slate-800";

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <CardContainer containerClassName="py-2 md:py-4 px-2 md:px-4 block w-full" className="w-full">
        <CardBody className="group/card relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-colors h-auto">
      {/* Thumbnail - Image or Gradient */}
          <CardItem 
            translateZ="50"
            className="w-full h-full absolute inset-0"
          >
      {isImageUrl ? (
              <div className="absolute inset-0 w-full h-full">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
                  className="object-cover opacity-50 group-hover/card:opacity-70 transition-opacity duration-500"
            unoptimized={project.thumbnail.startsWith('http')}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
              <div className={`absolute inset-0 w-full h-full ${imageError ? fallbackGradient : project.thumbnail} opacity-50 group-hover/card:opacity-70 transition-opacity duration-500`} />
      )}
      
      {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
          </CardItem>

      {/* Content */}
          <div className="absolute bottom-0 left-0 p-6 w-full z-20">
            <CardItem translateZ="60" className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 text-xs font-mono border border-cyan-500/30 rounded text-cyan-400 bg-cyan-950/30 backdrop-blur-sm">
            {project.category}
          </span>
                <Icon className="w-5 h-5 text-white/50 group-hover/card:text-white transition-colors" />
        </div>
        
              <h3 
                onClick={() => onClick(project)}
                className="text-xl md:text-2xl font-bold text-white mb-1 group-hover/card:text-cyan-400 transition-colors cursor-pointer"
              >
          {project.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
          <span>{project.year}</span>
          <span>•</span>
          <span>{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
        </div>
            </CardItem>
      </div>

          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-4 left-4 z-40">
               <CardItem translateZ="80">
                <span className="px-3 py-1.5 text-xs font-mono font-bold tracking-widest uppercase bg-cyan-500 text-black rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                  Featured Project
                </span>
              </CardItem>
            </div>
          )}

      {/* Hover Actions */}
          <div className="absolute top-4 right-4 flex gap-2 z-30">
             <CardItem translateZ="80" className="flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        {project.githubUrl && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.githubUrl, '_blank');
            }}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
          >
            <Github className="w-4 h-4" />
          </button>
        )}
        {project.liveUrl && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.liveUrl, '_blank');
            }}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
            </CardItem>
      </div>
          
          {/* Make the whole card clickable via a covering div or just relying on the container events if needed, 
              but we have specific buttons. The original card was clickable. 
              Let's add a click handler to CardBody or a covering div. 
          */}
          <div 
            className="absolute inset-0 z-10 cursor-pointer" 
            onClick={() => onClick(project)}
          />
          
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
