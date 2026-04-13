"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Match, User, Disclosure, ProfileCard } from "./types";
import { me, others, seedMatches, seedUsers, ME_ID } from "./seed";

type State = {
  hydrated: boolean;
  onboarded: boolean;
  me: User;
  users: User[]; // others + me
  matches: Match[];
  disclosures: Disclosure[];
  // runtime UX flags
  proximityAlert: { matchId: string } | null;
};

type Actions = {
  setHydrated: () => void;
  completeOnboarding: () => void;
  updateMyCard: (cardId: string, patch: Partial<ProfileCard>) => void;
  triggerProximity: (matchId: string) => void;
  dismissProximity: () => void;
  markRevealed: (matchId: string) => void;
  connect: (matchId: string) => void;
  reset: () => void;
};

export const useAppStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      hydrated: false,
      onboarded: false,
      me,
      users: seedUsers,
      matches: seedMatches,
      disclosures: [],
      proximityAlert: null,

      setHydrated: () => set({ hydrated: true }),
      completeOnboarding: () => set({ onboarded: true }),
      updateMyCard: (cardId, patch) =>
        set((s) => ({
          me: {
            ...s.me,
            cards: s.me.cards.map((c) =>
              c.id === cardId ? { ...c, ...patch } : c
            ),
          },
          users: s.users.map((u) =>
            u.id === ME_ID
              ? {
                  ...u,
                  cards: u.cards.map((c) =>
                    c.id === cardId ? { ...c, ...patch } : c
                  ),
                }
              : u
          ),
        })),
      triggerProximity: (matchId) => set({ proximityAlert: { matchId } }),
      dismissProximity: () => set({ proximityAlert: null }),
      markRevealed: (matchId) =>
        set((s) => ({
          matches: s.matches.map((m) =>
            m.id === matchId ? { ...m, status: "revealed" } : m
          ),
        })),
      connect: (matchId) =>
        set((s) => ({
          matches: s.matches.map((m) =>
            m.id === matchId ? { ...m, status: "connected" } : m
          ),
        })),
      reset: () =>
        set({
          onboarded: false,
          me,
          users: seedUsers,
          matches: seedMatches,
          disclosures: [],
          proximityAlert: null,
        }),
    }),
    {
      name: "kurumi-store-v1",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export { ME_ID, others };
