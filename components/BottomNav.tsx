"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "ホーム", key: "home" },
  { href: "/connections", label: "つながり", key: "connections" },
  { href: "/settings", label: "設定", key: "settings" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-30 mt-auto w-full border-t border-black/5 bg-warm/80 backdrop-blur">
      <ul className="mx-auto flex max-w-md justify-around px-2 py-2">
        {ITEMS.map((it) => {
          const active =
            it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
          return (
            <li key={it.key} className="flex-1">
              <Link
                href={it.href}
                className={cn(
                  "flex flex-col items-center rounded-xl px-3 py-2 text-[11px] tracking-wider",
                  active ? "text-charcoal" : "text-stone"
                )}
              >
                <span
                  className={cn(
                    "mb-1 h-1 w-8 rounded-full transition-all",
                    active ? "bg-charcoal" : "bg-transparent"
                  )}
                  style={active ? { background: "var(--ember-gold)" } : undefined}
                />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
