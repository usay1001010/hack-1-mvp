"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MaskedCard } from "./MaskedCard";
import type { ProfileCard } from "@/lib/types";

type Props = {
  cards: ProfileCard[]; // cards to reveal one-by-one
  commonTags: string[];
  onDone?: () => void;
};

/** The hero S4 reveal: masked cards unfold, common tags highlight. */
export function RevealSequence({ cards, commonTags, onDone }: Props) {
  const [step, setStep] = useState(0); // 0: intro, 1..N: reveals, N+1: summary
  const onDoneRef = useRef(onDone);
  const firedRef = useRef(false);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => setStep(1), 1200);
      return () => clearTimeout(t);
    }
    if (step > 0 && step <= cards.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 1400);
      return () => clearTimeout(t);
    }
    if (step === cards.length + 1 && !firedRef.current) {
      firedRef.current = true;
      onDoneRef.current?.();
    }
  }, [step, cards.length]);

  return (
    <div className="relative flex w-full flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="intro"
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.div
              className="mb-4 h-16 w-16 rounded-full"
              style={{
                background: "radial-gradient(circle, var(--ember-gold), transparent 70%)",
              }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <p
              className="text-stone"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              共通点が、見つかりました。
            </p>
          </motion.div>
        )}

        {step >= 1 && step <= cards.length && (
          <motion.div
            key={`reveal-${step}`}
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="mb-3 flex justify-center gap-1.5">
              {cards.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-6 rounded-full ${
                    i < step ? "bg-ember" : "bg-stone/30"
                  }`}
                  style={{
                    background: i < step ? "var(--ember-gold)" : "rgba(138,138,143,0.3)",
                  }}
                />
              ))}
            </div>
            <MaskedCard card={cards[step - 1]} revealed size="lg" />
            <motion.p
              className="mt-4 text-center text-sm text-stone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {cards[step - 1].tags
                .filter((t) => commonTags.includes(t))
                .map((t) => `#${t}`)
                .join("  ")}
            </motion.p>
          </motion.div>
        )}

        {step > cards.length && (
          <motion.div
            key="summary"
            className="w-full max-w-md text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-2xl text-charcoal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              ことばが、ひらいた。
            </h2>
            <p className="mt-2 text-stone">
              共通点 <span style={{ color: "var(--ember-gold)" }}>{commonTags.length}</span> 個が見つかりました。
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {commonTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{
                    background: "var(--warm-sand)",
                    color: "var(--charcoal)",
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
