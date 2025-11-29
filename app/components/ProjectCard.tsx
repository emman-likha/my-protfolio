"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "../data/projects";
import { Play, Monitor, Image as ImageIcon, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const Icon = project.type === "video" ? Play : project.type === "website" ? Monitor : ImageIcon;
  const [imageError, setImageError] = useState(false);
  
  // Check if thumbnail is an image URL or a gradient class
  const isImageUrl = (project.thumbnail.startsWith('http') || project.thumbnail.startsWith('/')) && !imageError;
  
  // Fallback gradient colors for each project type
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
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      className="group cursor-pointer relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-colors"
    >
      {/* Thumbnail - Image or Gradient */}
      {isImageUrl ? (
        <div className="absolute inset-0">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
            unoptimized={project.thumbnail.startsWith('http')}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className={`absolute inset-0 ${imageError ? fallbackGradient : project.thumbnail} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 text-xs font-mono border border-cyan-500/30 rounded text-cyan-400 bg-cyan-950/30 backdrop-blur-sm">
            {project.category}
          </span>
          <Icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
          <span>{project.year}</span>
          <span>•</span>
          <span>{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      </div>
    </motion.div>
  );
}
