"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import GridBackground from "../components/GridBackground";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { projects, Project } from "../data/projects";

export default function ProjectsPage() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const websites = projects.filter(p => p.type === "website");

  return (
    <main className="relative w-full h-screen overflow-y-auto bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
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
            WEB DEVELOPMENT
          </h1>
          <p className="text-xl text-gray-400 font-mono">
            All website and web application projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        {websites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={setSelectedProject} 
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No website projects available yet.</p>
          </div>
        )}
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


