"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { FogBackground } from "@/components/FogBackground";
import { PresenceOrb } from "@/components/PresenceOrb";
import { MaskedCard } from "@/components/MaskedCard";
import { BottomNav } from "@/components/BottomNav";
import { ProximityNotice } from "@/components/ProximityNotice";
import { timeAgo } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const hydrated = useAppStore((s) => s.hydrated);
  const onboarded = useAppStore((s) => s.onboarded);
  const me = useAppStore((s) => s.me);
  const users = useAppStore((s) => s.users);
  const matches = useAppStore((s) => s.matches);
  const triggerProximity = useAppStore((s) => s.triggerProximity);

  useEffect(() => {
    if (hydrated && !onboarded) router.replace("/welcome");
  }, [hydrated, onboarded, router]);

  if (!hydrated) return null;

  const activeMatches = matches.filter((m) => m.status !== "archived");
  const newest = [...activeMatches].sort(
    (a, b) => new Date(b.metAt).getTime() - new Date(a.metAt).getTime()
  );
  const getUser = (id: string) => users.find((u) => u.id === id);

  return (
    <>
      <FogBackground />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-10 pb-4">
        <header className="mb-6">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-stone"
            style={{ fontFamily: "var(--font-display)" }}
          >
            kurumi
          </p>
          <h1
            className="mt-1 text-2xl text-charcoal"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            きょうの、けはい。
          </h1>
        </header>

        <section className="paper rounded-3xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone">
              presence
            </span>
            <span className="text-[11px] text-stone">
              {activeMatches.length}人のけはい
            </span>
          </div>
          <div className="relative flex h-56 items-center justify-center">
            <div className="absolute">
              <PresenceOrb seed={me.avatarSeed} size={72} intensity={0.9} label="you" />
            </div>
            {activeMatches.slice(0, 6).map((m, i) => {
              const other = getUser(m.userB);
              if (!other) return null;
              const angle = (i / Math.max(1, activeMatches.length)) * Math.PI * 2;
              const r = 90;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <motion.div
                  key={m.id}
                  className="absolute"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.8 }}
                >
                  <PresenceOrb
                    seed={other.avatarSeed}
                    size={46 + Math.round(m.score * 24)}
                    intensity={0.3 + m.score * 0.7}
                    onClick={() => triggerProximity(m.id)}
                  />
                </motion.div>
              );
            })}
          </div>
          <p className="mt-2 text-center text-xs text-stone">
            ふれると、近づきます。
          </p>
        </section>

        <section className="mt-6">
          <h2
            className="mb-3 text-[13px] tracking-wider text-stone"
            style={{ fontFamily: "var(--font-display)" }}
          >
            さいきんの、すれちがい
          </h2>
          <ul className="space-y-3">
            {newest.map((m) => {
              const other = getUser(m.userB);
              if (!other) return null;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => triggerProximity(m.id)}
                    className="paper flex w-full items-center gap-3 rounded-2xl p-3 text-left"
                  >
                    <PresenceOrb seed={other.avatarSeed} size={40} intensity={0.5} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm text-charcoal"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {other.displayName}
                        </span>
                        <span className="text-[11px] text-stone">
                          {timeAgo(m.metAt)}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[11px] text-stone">
                        共通点 {m.commonTags.length}・
                        {m.status === "connected"
                          ? "つながっている"
                          : m.status === "revealed"
                          ? "ひらいた"
                          : "まだ、かくれている"}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-8">
          <h2
            className="mb-3 text-[13px] tracking-wider text-stone"
            style={{ fontFamily: "var(--font-display)" }}
          >
            あなたの断片
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {me.cards.slice(0, 4).map((c) => (
              <MaskedCard key={c.id} card={c} revealed size="sm" />
            ))}
          </div>
        </section>

        <section className="mt-8 mb-4 text-center">
          <button
            type="button"
            onClick={() => {
              const first = activeMatches[0];
              if (first) triggerProximity(first.id);
            }}
            className="rounded-full border border-stone/30 px-5 py-2 text-[11px] tracking-widest text-stone hover:bg-warm"
          >
            ▶︎ demo: proximity
          </button>
        </section>
      </main>
      <BottomNav />
      <ProximityNotice />
    </>
  );
}
