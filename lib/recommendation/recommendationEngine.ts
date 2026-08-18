import { CandidateReel, Interaction, RecommendationResult, Reel } from "@/types";
import { CANDIDATE_REELS } from "@/data/candidates";
import { buildInterestProfile } from "./interestEngine";
import { evaluateCandidateQuality } from "./qualityFilter";
import { scoreCandidate } from "./rankingEngine";
import { generateExplanation } from "./explanationEngine";

export function runRecommendationPipeline(
  interactions: Interaction[],
  reels: Reel[],
  candidates: CandidateReel[] = CANDIDATE_REELS,
  feedbackModifiers: Record<string, number> = {}
) {
  // 1. Build dynamic interest profile
  const profile = buildInterestProfile(interactions, reels, feedbackModifiers);

  // 2. Evaluate candidate quality and score accepted candidates
  const results: RecommendationResult[] = [];

  candidates.forEach((candidate) => {
    const filterResult = evaluateCandidateQuality(candidate);
    const scoreBreakdown = scoreCandidate(candidate, profile);

    results.push({
      candidate,
      detectedInterest: profile.primaryInterest,
      confidence: profile.confidence,
      scoreBreakdown,
      filterResult,
      isPrimary: false,
    });
  });

  // 3. Filter out rejected ones for primary ranking (or keep them flagged)
  const validResults = results
    .filter((r) => r.filterResult.status === "ACCEPTED")
    .sort((a, b) => b.scoreBreakdown.finalScore - a.scoreBreakdown.finalScore);

  // Ensure Section 18 spec: Primary recommendation for default state is Laptop comparison
  let primaryRecommendation = validResults[0];
  if (primaryRecommendation) {
    primaryRecommendation.isPrimary = true;
  }

  // 4. Generate explanation for primary recommendation
  const explanation = primaryRecommendation
    ? generateExplanation(
        primaryRecommendation.candidate.title,
        profile.primaryInterest,
        interactions,
        reels
      )
    : null;

  return {
    profile,
    recommendations: validResults,
    allEvaluations: results,
    primaryRecommendation,
    explanation,
  };
}
