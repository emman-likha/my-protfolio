"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference text-white"
    >
      <div className="text-2xl font-bold tracking-tighter font-mono">
        <span className="text-cyan-400">&lt;</span>
        PORTFOLIO
        <span className="text-cyan-400">/&gt;</span>
      </div>
      
      <div className="flex gap-8 font-mono text-sm tracking-widest">
        {["WORK", "ABOUT", "CONTACT"].map((item) => (
          <Link 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="relative group cursor-pointer hover:text-cyan-400 transition-colors duration-300"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

