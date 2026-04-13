"use client";

import { motion } from "framer-motion";
import { orbColor } from "@/lib/utils";

type Props = {
  seed: string;
  size?: number;
  intensity?: number; // 0..1 — affects glow & pulse
  label?: string;
  onClick?: () => void;
};

export function PresenceOrb({ seed, size = 96, intensity = 0.6, label, onClick }: Props) {
  const color = orbColor(seed);
  const glow = Math.min(1, intensity) * 40 + 10;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-2 focus:outline-none"
    >
      <motion.div
        className="relative rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 30%, ${color}, rgba(0,0,0,0.05) 75%)`,
          boxShadow: `0 0 ${glow}px 2px ${color}`,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: [1, 1 + intensity * 0.06, 1],
          opacity: 0.3 + intensity * 0.7,
        }}
        transition={{ duration: 3 + (1 - intensity) * 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
      >
        <div
          className="absolute inset-2 rounded-full mix-blend-overlay"
          style={{ background: "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.25), transparent 60%)" }}
        />
      </motion.div>
      {label ? (
        <span className="text-[11px] tracking-wider text-stone">{label}</span>
      ) : null}
    </button>
  );
}
