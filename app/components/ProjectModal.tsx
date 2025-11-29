"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../data/projects";
import { X, Github, ExternalLink, Calendar, Layers, Wrench } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            layoutId={`card-${project.id}`}
            className="fixed inset-4 md:inset-10 z-50 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-cyan-500/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Side - Media */}
            <div className="w-full md:w-2/3 bg-black relative overflow-hidden">
              {project.type === "video" && project.videoUrl ? (
                <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-slate-950">
                   {/* Video Embed */}
                   <iframe
                     src={project.videoUrl}
                     className="w-full h-full min-h-[500px]"
                     title={`Video: ${project.title}`}
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   />
                </div>
              ) : project.type === "graphic" && project.images ? (
                <div className="grid grid-cols-1 gap-4 p-4 md:p-8 overflow-y-auto h-full">
                  {project.images.map((img, idx) => (
                    <div key={idx} className="w-full aspect-square bg-slate-800 rounded-lg flex items-center justify-center text-gray-600">
                      Image {idx + 1} Placeholder
                    </div>
                  ))}
                </div>
              ) : project.type === "website" && project.liveUrl ? (
                 // Website - Live Preview
                 <div className="w-full h-full relative">
                   <iframe 
                     src={project.liveUrl}
                     className="w-full h-full min-h-[600px]"
                     title={`Preview of ${project.title}`}
                     sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                   />
                   <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-cyan-400 font-mono">
                     LIVE PREVIEW
                   </div>
                 </div>
              ) : (
                 // Fallback
                 <div className={`w-full h-full min-h-[300px] ${project.thumbnail} flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white/20">No Preview Available</span>
                 </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="w-full md:w-1/3 p-8 overflow-y-auto bg-slate-900/95 border-l border-white/5">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 text-xs font-mono border border-cyan-500/30 rounded text-cyan-400 bg-cyan-950/30 mb-4">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h2>
                <p className="text-gray-400 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              <div className="space-y-6">
                {/* Links */}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source
                      </a>
                    )}
                  </div>
                )}

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-mono font-bold">YEAR</span>
                    </div>
                    <p className="text-gray-300 text-sm">{project.year}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <Layers className="w-4 h-4" />
                      <span className="text-sm font-mono font-bold">TYPE</span>
                    </div>
                    <p className="text-gray-300 text-sm capitalize">{project.type}</p>
                  </div>
                </div>

                {/* Tech Stack / Tools */}
                {(project.techStack || project.tools) && (
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                      <Wrench className="w-4 h-4" />
                      <span className="text-sm font-mono font-bold">
                        {project.type === "graphic" ? "TOOLS USED" : "TECH STACK"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(project.techStack || project.tools)?.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

