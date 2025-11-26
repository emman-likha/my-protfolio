"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface RightNavProps {
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export default function RightNav({ onNext, onPrev, canGoNext, canGoPrev }: RightNavProps) {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8"
    >
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`p-4 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 group ${
          canGoPrev ? "hover:bg-white/10 hover:border-cyan-400 cursor-pointer" : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Previous section"
      >
        <ChevronUp className={`w-6 h-6 text-white transition-colors ${canGoPrev ? "group-hover:text-cyan-400" : ""}`} />
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`p-4 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 group ${
          canGoNext ? "hover:bg-white/10 hover:border-cyan-400 cursor-pointer" : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Next section"
      >
        <ChevronDown className={`w-6 h-6 text-white transition-colors ${canGoNext ? "group-hover:text-cyan-400" : ""}`} />
      </button>
    </motion.div>
  );
}

