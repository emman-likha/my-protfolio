/**
 * RIGHT NAVIGATION COMPONENT (app/components/RightNav.tsx)
 * Vertical navigation buttons on the right side of the screen:
 * - Up arrow: Navigate to previous section
 * - Down arrow: Navigate to next section
 * - Disabled state when at first/last section
 * - Animated entrance from right
 */

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
      className="fixed right-4 md:right-8 bottom-4 md:bottom-8 z-50 flex flex-col gap-4 md:gap-8"
    >
      {/* Previous Section Button (Up Arrow) */}
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`p-3 md:p-4 rounded-full border border-cyan-400/50 backdrop-blur-sm transition-all duration-300 group ${
          canGoPrev ? "hover:bg-cyan-400/10 hover:border-cyan-400 cursor-pointer" : "opacity-30 cursor-not-allowed border-cyan-400/20"
        }`}
        aria-label="Previous section"
      >
        <ChevronUp className={`w-5 h-5 md:w-6 md:h-6 text-cyan-400 transition-colors ${canGoPrev ? "group-hover:text-cyan-300" : ""}`} />
      </button>

      {/* Next Section Button (Down Arrow) */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`p-3 md:p-4 rounded-full border border-cyan-400/50 backdrop-blur-sm transition-all duration-300 group ${
          canGoNext ? "hover:bg-cyan-400/10 hover:border-cyan-400 cursor-pointer" : "opacity-30 cursor-not-allowed border-cyan-400/20"
        }`}
        aria-label="Next section"
      >
        <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-cyan-400 transition-colors ${canGoNext ? "group-hover:text-cyan-300" : ""}`} />
      </button>
    </motion.div>
  );
}





