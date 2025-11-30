/**
 * CONTACT SECTION COMPONENT (app/components/sections/ContactSection.tsx)
 * Contact information and social links
 */

"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <div className="text-center px-4 md:px-0">
      <motion.a 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        href="mailto:hello@example.com" 
        className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white hover:text-cyan-400 transition-colors tracking-tight break-all"
      >
        hello@example.com
      </motion.a>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-12"
      >
        {["GitHub", "LinkedIn", "Twitter", "Instagram"].map((social) => (
          <a key={social} href="#" className="text-gray-400 hover:text-white font-mono text-sm md:text-lg uppercase tracking-widest hover:underline underline-offset-8 decoration-cyan-400">
            {social}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

