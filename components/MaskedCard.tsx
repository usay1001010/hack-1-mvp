"use client";

import { motion } from "framer-motion";
import { CATEGORY_LABEL, type ProfileCard } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  card: ProfileCard;
  /** force reveal regardless of visibility (used after match) */
  revealed?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
};

export function MaskedCard({ card, revealed = false, size = "md", onClick }: Props) {
  const isMasked = !revealed && (card.visibility === "masked" || card.visibility === "conditional");
  const sizing = {
    sm: "p-3 min-h-[84px] text-sm",
    md: "p-4 min-h-[120px] text-[15px]",
    lg: "p-6 min-h-[160px] text-base",
  }[size];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "paper relative w-full overflow-hidden rounded-2xl text-left",
        sizing,
        "border border-black/5"
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] uppercase tracking-[0.18em] text-stone"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {CATEGORY_LABEL[card.category]}
        </span>
        {isMasked ? (
          <span className="text-[10px] text-stone/70">ふれると、ひらく</span>
        ) : null}
      </div>

      {isMasked ? (
        <div className="relative mt-3">
          <div className="mask-hatch h-4 w-4/5 rounded-full opacity-90" />
          <div className="mask-hatch mt-2 h-4 w-2/3 rounded-full opacity-70" />
          <div className="mask-hatch mt-2 h-4 w-1/2 rounded-full opacity-50" />
        </div>
      ) : (
        <>
          <h3
            className="mt-2 text-charcoal"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
          >
            {card.title}
          </h3>
          <p className="mt-1 leading-relaxed text-charcoal/75">{card.content}</p>
        </>
      )}
    </motion.button>
  );
}
