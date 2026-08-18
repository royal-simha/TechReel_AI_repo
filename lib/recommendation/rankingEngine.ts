import { CandidateReel, InterestProfile, ScoreBreakdown } from "@/types";

export function scoreCandidate(
  candidate: CandidateReel,
  profile: InterestProfile
): ScoreBreakdown {
  // Interest Match calculation
  const primaryScore = (profile.scores[profile.primaryInterest] || 50) / 100;
  const categoryScore = (profile.scores[candidate.category] || 50) / 100;
  const interestMatch = 0.6 * primaryScore + 0.4 * categoryScore;

  // Semantic Similarity: How strongly candidate topic maps to user's high-interest topics
  let semanticSimilarity = 0.75;
  if (candidate.category === "Hardware" || candidate.topic.includes("Hardware")) {
    semanticSimilarity = 0.92; // Bridges SE and Developer Hardware
  } else if (candidate.category === "DSA" || candidate.category === "Web Development") {
    semanticSimilarity = 0.88;
  } else if (candidate.category === "Cloud") {
    semanticSimilarity = 0.82;
  } else if (candidate.category === "AI") {
    semanticSimilarity = 0.65;
  }

  const educationalValue = candidate.educationalValue;
  const careerRelevance = candidate.careerRelevance;
  const contentQuality = candidate.contentQuality;
  const novelty = candidate.novelty;
  const engagementPotential = candidate.engagementPotential;
  const hypeDeduction = 0.20 * candidate.hypeScore;

  const finalScore =
    0.35 * interestMatch +
    0.20 * semanticSimilarity +
    0.15 * educationalValue +
    0.10 * careerRelevance +
    0.10 * contentQuality +
    0.05 * novelty +
    0.05 * engagementPotential -
    hypeDeduction;

  return {
    interestMatch,
    semanticSimilarity,
    educationalValue,
    careerRelevance,
    contentQuality,
    novelty,
    engagementPotential,
    hypeDeduction,
    finalScore: Number(finalScore.toFixed(3)),
  };
}
