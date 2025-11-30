/**
 * GRID BACKGROUND COMPONENT (app/components/GridBackground.tsx)
 * Creates the animated grid pattern background with:
 * - Static purple grid lines
 * - Animated cyan grid overlay (moving effect)
 * - Radial gradient spotlight effect
 * - Bottom glow and vignette for depth
 */

"use client";

import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Radial Gradient: Spotlight effect in center */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.15),rgba(0,0,0,0))]" />

      {/* Static Grid: Purple lines, 40px spacing */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Vertical Lines */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, #8b5cf6 1px, transparent 1px)`,
            backgroundSize: '40px 100%',
          }}
        />
        {/* Horizontal Lines */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)`,
            backgroundSize: '100% 40px',
          }}
        />
      </div>

      {/* Animated Grid Overlay: Cyan lines that move continuously */}
      <motion.div
        className="absolute inset-0 z-0 opacity-15"
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 3,
        }}
        style={{
          backgroundImage: `
            linear-gradient(to right, #2dd4bf 1px, transparent 1px),
            linear-gradient(to bottom, #2dd4bf 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Bottom Glow: Fades to black at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      {/* Vignette: Darkens corners for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}
