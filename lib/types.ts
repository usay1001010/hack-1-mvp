export type CardCategory =
  | "hobby"
  | "school"
  | "current"
  | "trouble"
  | "topic"
  | "value"
  | "free";

export type Visibility = "public" | "masked" | "conditional";

export type ProfileCard = {
  id: string;
  userId: string;
  category: CardCategory;
  title: string;
  content: string;
  visibility: Visibility;
  triggerType?: "match" | "chat" | "manual";
  /** tags used to find common points for matching */
  tags: string[];
};

export type User = {
  id: string;
  displayName: string;
  avatarSeed: string; // for the masked orb color
  major: string;
  year: number;
  cards: ProfileCard[];
};

export type Match = {
  id: string;
  userA: string;
  userB: string;
  score: number;
  /** common tag ids across cards */
  commonTags: string[];
  metAt: string; // ISO
  locationHash: string;
  status: "new" | "revealed" | "connected" | "archived";
};

export type Disclosure = {
  id: string;
  matchId: string;
  cardId: string;
  disclosedAt: string;
  trigger: "match" | "chat" | "manual";
};

export const CATEGORY_LABEL: Record<CardCategory, string> = {
  hobby: "すき",
  school: "まなび",
  current: "いま",
  trouble: "なやみ",
  topic: "はなしたい",
  value: "たいせつ",
  free: "じゆう",
};
