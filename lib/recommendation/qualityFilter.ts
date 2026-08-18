import { CandidateReel, QualityFilterResult } from "@/types";

export function evaluateCandidateQuality(candidate: CandidateReel): QualityFilterResult {
  const issues: string[] = [];

  if (candidate.hypeScore > 0.60) {
    issues.push("Excessive hype score (> 0.60)");
  }
  if (candidate.educationalValue < 0.45) {
    issues.push("Low educational value (< 0.45)");
  }
  if (candidate.title.toLowerCase().includes("will get you a job")) {
    issues.push("Unrealistic career-outcome claim");
  }
  if (candidate.title.toLowerCase().includes("10 ai tools")) {
    issues.push("Clickbait multi-tool compilation format");
  }

  const isRejected = candidate.hypeScore >= 0.70 || (candidate.hypeScore > 0.50 && candidate.educationalValue < 0.40);

  return {
    candidateId: candidate.id,
    status: isRejected ? "REJECTED" : "ACCEPTED",
    hypeScore: candidate.hypeScore,
    educationalValue: candidate.educationalValue,
    reason: isRejected
      ? "High hype and unrealistic career-outcome claim."
      : "Passed content quality and educational value thresholds.",
    detectedIssues: issues,
  };
}
