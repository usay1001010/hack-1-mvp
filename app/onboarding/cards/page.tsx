"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { MaskedCard } from "@/components/MaskedCard";
import { FogBackground } from "@/components/FogBackground";
import { CATEGORY_LABEL, type Visibility } from "@/lib/types";

const VIS_ORDER: Visibility[] = ["public", "masked", "conditional"];
const VIS_LABEL: Record<Visibility, string> = {
  public: "ひらく",
  masked: "かくす",
  conditional: "共通点で",
};

export default function OnboardingCardsPage() {
  const router = useRouter();
  const cards = useAppStore((s) => s.me.cards);
  const updateMyCard = useAppStore((s) => s.updateMyCard);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  return (
    <main className="relative flex min-h-dvh flex-col px-5 pt-10 pb-6">
      <FogBackground />
      <header className="mx-auto w-full max-w-md">
        <p
          className="text-[11px] uppercase tracking-[0.2em] text-stone"
          style={{ fontFamily: "var(--font-display)" }}
        >
          step 01 — profile
        </p>
        <h1
          className="mt-2 text-2xl leading-snug text-charcoal"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          あなたの、ちいさな断片。
        </h1>
        <p className="mt-1 text-sm text-charcoal/70">
          どこをひらくか、どこをかくすか。あとで変えられます。
        </p>
      </header>

      <section className="mx-auto mt-6 w-full max-w-md flex-1 space-y-3">
        {cards.map((c) => {
          const idx = VIS_ORDER.indexOf(c.visibility);
          const nextVis = VIS_ORDER[(idx + 1) % VIS_ORDER.length];
          return (
            <div key={c.id} className="space-y-2">
              <MaskedCard card={c} revealed />
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] text-stone">
                  {CATEGORY_LABEL[c.category]}
                </span>
                <button
                  type="button"
                  onClick={() => updateMyCard(c.id, { visibility: nextVis })}
                  className="rounded-full border border-stone/25 px-3 py-1 text-[11px] tracking-wider text-charcoal/80 hover:bg-warm"
                >
                  公開: {VIS_LABEL[c.visibility]}
                </button>
              </div>
            </div>
          );
        })}
      </section>

      <footer className="mx-auto mt-6 w-full max-w-md">
        <button
          type="button"
          onClick={() => {
            completeOnboarding();
            router.push("/");
          }}
          className="w-full rounded-full px-6 py-4 text-sm tracking-wider"
          style={{ background: "var(--charcoal)", color: "var(--warm-white)" }}
        >
          はじめる
        </button>
      </footer>
    </main>
  );
}
