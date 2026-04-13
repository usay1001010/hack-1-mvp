"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { FogBackground } from "@/components/FogBackground";
import { PresenceOrb } from "@/components/PresenceOrb";
import { BottomNav } from "@/components/BottomNav";
import { timeAgo } from "@/lib/utils";

export default function ConnectionsPage() {
  const users = useAppStore((s) => s.users);
  const matches = useAppStore((s) => s.matches);
  const getUser = (id: string) => users.find((u) => u.id === id);

  const connected = matches.filter((m) => m.status === "connected");
  const revealed = matches.filter((m) => m.status === "revealed");
  const rest = matches.filter(
    (m) => m.status !== "connected" && m.status !== "revealed" && m.status !== "archived"
  );

  const Section = ({
    title,
    items,
  }: {
    title: string;
    items: typeof matches;
  }) =>
    items.length === 0 ? null : (
      <section className="mt-6">
        <h2
          className="mb-3 text-[13px] tracking-wider text-stone"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        <ul className="space-y-2">
          {items.map((m) => {
            const other = getUser(m.userB);
            if (!other) return null;
            return (
              <li key={m.id}>
                <Link
                  href={`/person/${other.id}`}
                  className="paper flex items-center gap-3 rounded-2xl p-3"
                >
                  <PresenceOrb seed={other.avatarSeed} size={40} intensity={0.6} />
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
                      共通点 {m.commonTags.length}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );

  return (
    <>
      <FogBackground />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-10 pb-6">
        <header className="mb-2">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-stone"
            style={{ fontFamily: "var(--font-display)" }}
          >
            connections
          </p>
          <h1
            className="mt-1 text-2xl text-charcoal"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            つながり。
          </h1>
        </header>

        <Section title="ことばを交わした" items={connected} />
        <Section title="ひらいた" items={revealed} />
        <Section title="まだ、かくれている" items={rest} />

        {matches.length === 0 && (
          <p className="mt-10 text-center text-sm text-stone">
            まだ、けはいはありません。
          </p>
        )}
      </main>
      <BottomNav />
    </>
  );
}
