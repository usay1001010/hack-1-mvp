"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export function ProximityNotice() {
  const router = useRouter();
  const alert = useAppStore((s) => s.proximityAlert);
  const dismiss = useAppStore((s) => s.dismissProximity);

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          key="proximity-backdrop"
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/10 backdrop-blur-[2px] sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            key="proximity-card"
            className="paper mx-4 mb-8 w-full max-w-sm rounded-2xl p-5 sm:mb-0"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="h-10 w-10 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, var(--ember-gold), transparent 70%)",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <div>
                <div
                  className="text-[11px] uppercase tracking-[0.2em] text-stone"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  proximity
                </div>
                <div
                  className="text-lg text-charcoal"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  近くに、ひとりいます。
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              共通点がいくつか見つかりました。
              ひらくかどうかは、あなたが決められます。
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={dismiss}
                className="flex-1 rounded-full border border-stone/30 px-4 py-2 text-sm text-stone hover:bg-stone/5"
              >
                あとで
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = alert.matchId;
                  dismiss();
                  router.push(`/match/${id}`);
                }}
                className="flex-1 rounded-full px-4 py-2 text-sm text-warm"
                style={{ background: "var(--charcoal)", color: "var(--warm-white)" }}
              >
                そっと、ひらく
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
