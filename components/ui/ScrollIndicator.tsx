"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <span className="text-muted text-xs uppercase tracking-widest font-display">
        Scroll
      </span>
      <motion.div
        className="w-5 h-8 rounded-full border-2 border-muted/40 flex justify-center pt-1.5"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-1 h-2 rounded-full bg-primary" />
      </motion.div>
    </motion.div>
  );
}
