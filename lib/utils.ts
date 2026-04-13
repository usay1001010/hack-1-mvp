export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function orbColor(seed: string): string {
  switch (seed) {
    case "ember":
      return "var(--ember-gold)";
    case "teal":
      return "var(--quiet-teal)";
    case "coral":
      return "var(--muted-coral)";
    case "sand":
      return "var(--warm-sand)";
    default:
      return "var(--stone-gray)";
  }
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "たった今";
  if (m < 60) return `${m}分前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}時間前`;
  const d = Math.floor(h / 24);
  return `${d}日前`;
}
