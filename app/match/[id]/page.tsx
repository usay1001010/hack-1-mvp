"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { FogBackground } from "@/components/FogBackground";
import { PresenceOrb } from "@/components/PresenceOrb";
import { RevealSequence } from "@/components/RevealSequence";

export default function MatchRevealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const match = useAppStore((s) => s.matches.find((m) => m.id === id));
  const users = useAppStore((s) => s.users);
  const markRevealed = useAppStore((s) => s.markRevealed);
  const connect = useAppStore((s) => s.connect);

  const [done, setDone] = useState(false);

  if (!match) {
    return (
      <main className="flex min-h-dvh items-center justify-center p-6 text-stone">
        みつかりません。
        <Link href="/" className="ml-2 underline">
          戻る
        </Link>
      </main>
    );
  }

  const other = users.find((u) => u.id === match.userB);
  if (!other) return null;

  const revealCards = other.cards.filter((c) =>
    c.tags.some((t) => match.commonTags.includes(t))
  );

  return (
    <main className="relative flex min-h-dvh flex-col px-5 pt-10 pb-8">
      <FogBackground />

      <header className="mx-auto w-full max-w-md text-center">
        <p
          className="text-[11px] uppercase tracking-[0.22em] text-stone"
          style={{ fontFamily: "var(--font-display)" }}
        >
          a quiet encounter
        </p>
      </header>

      <motion.div
        className="mx-auto mt-4 flex w-full max-w-md items-center justify-center gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <PresenceOrb seed="ember" size={60} intensity={0.85} label="you" />
        <motion.div
          className="h-px flex-1"
          style={{ background: "linear-gradient(90deg, var(--ember-gold), var(--quiet-teal))" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.4 }}
        />
        <PresenceOrb seed={other.avatarSeed} size={60} intensity={0.85} label={other.displayName} />
      </motion.div>

      <section className="mx-auto mt-8 flex w-full max-w-md flex-1 items-start justify-center">
        <RevealSequence
          cards={revealCards}
          commonTags={match.commonTags}
          onDone={() => {
            setDone(true);
            markRevealed(match.id);
          }}
        />
      </section>

      {done && (
        <motion.footer
          className="mx-auto w-full max-w-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex-1 rounded-full border border-stone/30 px-4 py-3 text-sm text-stone"
            >
              そっと閉じる
            </button>
            <button
              type="button"
              onClick={() => {
                connect(match.id);
                router.push(`/person/${other.id}`);
              }}
              className="flex-1 rounded-full px-4 py-3 text-sm"
              style={{ background: "var(--charcoal)", color: "var(--warm-white)" }}
            >
              ことばを交わす
            </button>
          </div>
        </motion.footer>
      )}
    </main>
  );
}
