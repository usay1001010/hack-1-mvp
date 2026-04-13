"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FogBackground } from "@/components/FogBackground";

const SLIDES = [
  {
    headline: "そっと、近づく。",
    body: "SNSでも、マッチングでもない。\nすれ違いから、ひらくアプリ。",
  },
  {
    headline: "かくしたまま、出会う。",
    body: "あなたの「好き」は黒塗りのまま。\n共通点が見つかったときだけ、ひらきます。",
  },
  {
    headline: "ことばが、生まれる。",
    body: "無理に話しかけなくていい。\nきっかけは、アプリが整えます。",
  },
];

export default function WelcomePage() {
  const router = useRouter();
  const [i, setI] = useState(0);

  const next = () => {
    if (i < SLIDES.length - 1) setI(i + 1);
    else router.push("/onboarding/cards");
  };

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-between px-6 py-12">
      <FogBackground />
      <div className="flex w-full items-center justify-end">
        <button
          type="button"
          onClick={() => router.push("/onboarding/cards")}
          className="text-sm text-stone hover:text-charcoal"
        >
          スキップ
        </button>
      </div>

      <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-center"
          >
            <motion.div
              className="mx-auto mb-10 h-24 w-24 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, var(--ember-gold), transparent 70%)",
                boxShadow: "0 0 60px 10px rgba(212,165,116,0.35)",
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1
              className="text-3xl leading-snug text-charcoal"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
            >
              {SLIDES[i].headline}
            </h1>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-charcoal/70">
              {SLIDES[i].body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex gap-2">
          {SLIDES.map((_, k) => (
            <span
              key={k}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: k === i ? 24 : 8,
                background:
                  k === i ? "var(--ember-gold)" : "rgba(138,138,143,0.4)",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="w-full rounded-full px-6 py-4 text-sm tracking-wider"
          style={{ background: "var(--charcoal)", color: "var(--warm-white)" }}
        >
          {i < SLIDES.length - 1 ? "つづける" : "はじめる"}
        </button>
      </div>
    </main>
  );
}
