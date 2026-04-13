"use client";

import { motion } from "framer-motion";

export function FogBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-24 -left-24 h-[60vh] w-[60vh] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,165,116,0.18), transparent 60%)" }}
        animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[70vh] w-[70vh] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(107,155,149,0.16), transparent 55%)" }}
        animate={{ x: [0, -18, 0], y: [0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(240,228,208,0.35), transparent 65%)" }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
