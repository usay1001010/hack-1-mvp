"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { FogBackground } from "@/components/FogBackground";
import { BottomNav } from "@/components/BottomNav";
import { CATEGORY_LABEL, type Visibility } from "@/lib/types";

const VIS_ORDER: Visibility[] = ["public", "masked", "conditional"];
const VIS_LABEL: Record<Visibility, string> = {
  public: "ひらく",
  masked: "かくす",
  conditional: "共通点で",
};

export default function SettingsPage() {
  const router = useRouter();
  const cards = useAppStore((s) => s.me.cards);
  const me = useAppStore((s) => s.me);
  const updateMyCard = useAppStore((s) => s.updateMyCard);
  const reset = useAppStore((s) => s.reset);

  return (
    <>
      <FogBackground />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-10 pb-6">
        <header className="mb-6">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-stone"
            style={{ fontFamily: "var(--font-display)" }}
          >
            settings
          </p>
          <h1
            className="mt-1 text-2xl text-charcoal"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            あなたの、距離感。
          </h1>
        </header>

        <section className="paper rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-[0.2em] text-stone">
            profile
          </div>
          <div className="mt-2 text-sm text-charcoal">
            {me.displayName}・{me.major}・{me.year}年
          </div>
        </section>

        <section className="mt-6">
          <h2
            className="mb-3 text-[13px] tracking-wider text-stone"
            style={{ fontFamily: "var(--font-display)" }}
          >
            断片の公開
          </h2>
          <ul className="space-y-2">
            {cards.map((c) => {
              const idx = VIS_ORDER.indexOf(c.visibility);
              const nextVis = VIS_ORDER[(idx + 1) % VIS_ORDER.length];
              return (
                <li
                  key={c.id}
                  className="paper flex items-center justify-between rounded-2xl p-3"
                >
                  <div>
                    <div className="text-[11px] text-stone">
                      {CATEGORY_LABEL[c.category]}
                    </div>
                    <div
                      className="mt-0.5 text-sm text-charcoal"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {c.title}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateMyCard(c.id, { visibility: nextVis })}
                    className="rounded-full border border-stone/25 px-3 py-1 text-[11px] tracking-wider text-charcoal/80 hover:bg-warm"
                  >
                    {VIS_LABEL[c.visibility]}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-8">
          <button
            type="button"
            onClick={() => {
              reset();
              router.push("/welcome");
            }}
            className="w-full rounded-full border border-stone/30 px-5 py-3 text-[12px] tracking-widest text-stone hover:bg-warm"
          >
            すべてを忘れる（デモをリセット）
          </button>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
