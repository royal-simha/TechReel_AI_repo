import { Interaction } from "@/types";

export const DEFAULT_DEMO_INTERACTIONS: Interaction[] = [
  {
    reelId: "reel-1", // When Java Code Finally Works
    watchPercentage: 95,
    liked: true,
    saved: true,
    shared: false,
    rewatched: false,
    commented: false,
    skipped: false,
    timestamp: Date.now() - 3600000 * 5,
  },
  {
    reelId: "reel-2", // Day in the Life of a Software Engineer
    watchPercentage: 92,
    liked: false,
    saved: true,
    shared: false,
    rewatched: false,
    commented: false,
    skipped: false,
    timestamp: Date.now() - 3600000 * 4,
  },
  {
    reelId: "reel-3", // Coding Interview Be Like
    watchPercentage: 90,
    liked: true,
    saved: false,
    shared: false,
    rewatched: false,
    commented: false,
    skipped: false,
    timestamp: Date.now() - 3600000 * 3,
  },
  {
    reelId: "reel-4", // MacBook vs Windows Laptop for Developers
    watchPercentage: 87,
    liked: false,
    saved: true,
    shared: false,
    rewatched: false,
    commented: false,
    skipped: false,
    timestamp: Date.now() - 3600000 * 2,
  },
  {
    reelId: "reel-5", // New Gaming Setup
    watchPercentage: 18,
    liked: false,
    saved: false,
    shared: false,
    rewatched: false,
    commented: false,
    skipped: true,
    timestamp: Date.now() - 3600000 * 1,
  },
];
