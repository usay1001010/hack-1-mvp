"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { FogBackground } from "@/components/FogBackground";
import { PresenceOrb } from "@/components/PresenceOrb";
import { MaskedCard } from "@/components/MaskedCard";
import { BottomNav } from "@/components/BottomNav";

export default function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = useAppStore((s) => s.users.find((u) => u.id === id));
  const match = useAppStore((s) =>
    s.matches.find((m) => m.userB === id)
  );

  if (!user) {
    return (
      <main className="flex min-h-dvh items-center justify-center p-6 text-stone">
        みつかりません。
        <Link href="/" className="ml-2 underline">戻る</Link>
      </main>
    );
  }

  const commonTags = match?.commonTags ?? [];
  const revealed = user.cards.filter(
    (c) =>
      c.visibility === "public" ||
      (c.visibility === "conditional" &&
        c.tags.some((t) => commonTags.includes(t)))
  );
  const hidden = user.cards.filter((c) => !revealed.includes(c));
  const progress = user.cards.length
    ? Math.round((revealed.length / user.cards.length) * 100)
    : 0;

  return (
    <>
      <FogBackground />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-10 pb-6">
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.2em] text-stone"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ← home
        </Link>

        <header className="mt-6 flex items-center gap-4">
          <PresenceOrb seed={user.avatarSeed} size={72} intensity={0.9} />
          <div>
            <h1
              className="text-2xl text-charcoal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {user.displayName}
            </h1>
            <p className="mt-1 text-[12px] text-stone">
              {user.major}・{user.year}年
            </p>
          </div>
        </header>

        <section className="mt-6 paper rounded-2xl p-4">
          <div className="flex items-center justify-between text-[11px] text-stone">
            <span className="uppercase tracking-[0.22em]">disclosure</span>
            <span>{progress}% ひらいた</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-black/5">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--ember-gold)" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </div>
          {commonTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {commonTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-stone/25 px-2 py-0.5 text-[11px] text-charcoal/80"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </section>

        {revealed.length > 0 && (
          <section className="mt-6">
            <h2
              className="mb-3 text-[13px] tracking-wider text-stone"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ひらいた断片
            </h2>
            <div className="space-y-3">
              {revealed.map((c) => (
                <MaskedCard key={c.id} card={c} revealed />
              ))}
            </div>
          </section>
        )}

        {hidden.length > 0 && (
          <section className="mt-6">
            <h2
              className="mb-3 text-[13px] tracking-wider text-stone"
              style={{ fontFamily: "var(--font-display)" }}
            >
              まだ、かくれている
            </h2>
            <div className="space-y-3">
              {hidden.map((c) => (
                <MaskedCard key={c.id} card={c} />
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] text-stone">
              ことばを交わすと、少しずつひらきます。
            </p>
          </section>
        )}
      </main>
      <BottomNav />
    </>
  );
}
