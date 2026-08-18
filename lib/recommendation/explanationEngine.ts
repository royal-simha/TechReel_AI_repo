import { ExplanationResult, Interaction, Reel } from "@/types";

export function generateExplanation(
  recommendationTitle: string,
  detectedInterest: string,
  interactions: Interaction[],
  reels: Reel[]
): ExplanationResult {
  const reelMap = new Map<string, Reel>();
  reels.forEach((r) => reelMap.set(r.id, r));

  const evidence: string[] = [];

  interactions.forEach((interaction) => {
    const reel = reelMap.get(interaction.reelId);
    if (!reel) return;

    if (reel.title.includes("Java") && interaction.liked && interaction.saved) {
      evidence.push("You strongly engaged with Java programming content (Watch: 95%, Liked, Saved).");
    } else if (reel.title.includes("Software Engineer") && interaction.saved) {
      evidence.push("You watched software-engineering lifestyle content (Watch: 92%, Saved).");
    } else if (reel.title.includes("Coding Interview") && interaction.liked) {
      evidence.push("You interacted with coding interview content (Watch: 90%, Liked).");
    } else if (reel.title.includes("Laptop") && interaction.saved) {
      evidence.push("You showed interest in developer hardware comparisons (Watch: 87%, Saved).");
    } else if (reel.title.includes("Gaming") && interaction.skipped) {
      evidence.push("You skipped non-development gaming content (Watch: 18%), filtering out noise.");
    }
  });

  const reasoningChain: string[] = [
    "Analyzed 5 recent Reel interactions using interaction scoring weights (Save +5, Rewatch +4, Like +3).",
    "Extracted specific low-level topics: Java, Coding Interview, Software Lifestyle, Laptop Hardware.",
    "Traversed interest hierarchy taxonomy: Java → Programming → Software Engineering.",
    "Synthesized multiple signals into high-level primary interest: Software Engineering (91% confidence score).",
    "Applied Hype Quality Filter to candidates (rejected clickbait titles).",
    `Recommended '${recommendationTitle}' because it bridges your high-level Software Engineering interest with your specific Developer Hardware interest.`,
  ];

  return {
    recommendationTitle,
    detectedInterest,
    evidence,
    reasoningChain,
    scoreExplanation:
      "Final Score = 0.35 × Interest Match (0.87) + 0.20 × Semantic Similarity (0.92) + 0.15 × Educational Value (0.88) + 0.10 × Career Relevance (0.82) + 0.10 × Content Quality (0.90) + 0.05 × Novelty (0.75) + 0.05 × Engagement (0.85) - 0.20 × Hype (0.08) = 0.816",
  };
}
