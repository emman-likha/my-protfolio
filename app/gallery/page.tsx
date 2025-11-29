"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import GridBackground from "../components/GridBackground";
import Navbar from "../components/Navbar";
import { ParallaxScroll } from "../components/ui/parallax-scroll";

const galleryImages = [
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684847-75bdda21cc95?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-86a5d8727436?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684847-75bdda21cc95?q=80&w=2000&auto=format&fit=crop",
];

export default function GalleryPage() {
  const router = useRouter();

  return (
    <main className="relative w-full h-screen overflow-y-auto bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <GridBackground />
      <Navbar />
      
      <div className="relative z-10 w-full min-h-screen px-4 md:px-24 pt-24 pb-12 flex flex-col">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm tracking-widest mb-8 transition-colors group w-fit"
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
            GRAPHICS & BRANDING
          </h1>
          <p className="text-xl text-gray-400 font-mono">
            Visual exploration and design gallery
          </p>
        </motion.div>

        {/* Parallax Gallery */}
        <div className="w-full flex-1">
          <ParallaxScroll images={galleryImages} />
        </div>
      </div>
    </main>
  );
}
