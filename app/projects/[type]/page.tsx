"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import GridBackground from "../../components/GridBackground";
import Navbar from "../../components/Navbar";
import ProjectCard from "../../components/ProjectCard";
import ProjectModal from "../../components/ProjectModal";
import { projects, Project, ProjectType } from "../../data/projects";

export default function ProjectsPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const type = (params?.type as ProjectType) || "website";
  const filteredProjects = projects.filter(p => p.type === type);
  
  const typeLabels: Record<ProjectType, string> = {
    website: "Web Development",
    graphic: "Graphics & Branding",
    video: "Motion & Video"
  };

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <GridBackground />
      <Navbar />
      
      <div className="relative z-10 w-full min-h-screen px-4 md:px-24 pt-24 pb-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm tracking-widest mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-cyan-400">
            {typeLabels[type]}
          </h1>
          <p className="text-xl text-gray-400 font-mono">
            All {type === "website" ? "websites" : type === "graphic" ? "graphics" : "videos"}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard 
                project={project} 
                onClick={setSelectedProject} 
              />
            </motion.div>
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

