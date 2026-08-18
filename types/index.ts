export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export interface Reel {
  id: string;
  title: string;
  category: string;
  topics: string[];
  thumbnailUrl?: string;
  durationSeconds?: number;
  qualityWarning?: string;
}

export interface Interaction {
  reelId: string;
  watchPercentage: number;
  liked: boolean;
  saved: boolean;
  shared: boolean;
  rewatched: boolean;
  commented: boolean;
  skipped: boolean;
  timestamp: number;
}

export interface InteractionScoreBreakdown {
  reelId: string;
  baseScore: number;
  details: {
    saveBonus: number;
    rewatchBonus: number;
    shareBonus: number;
    likeBonus: number;
    commentBonus: number;
    watchPercentageBonus: number;
    skipPenalty: number;
  };
  totalScore: number;
}

export interface ReelAnalysis {
  reelId: string;
  primaryTopic: string;
  secondaryTopics: string[];
  intent: "Entertainment" | "Educational" | "Career Guidance" | "Hype/Clickbait" | "Overview";
  context: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  technologyDomain: string;
  educationalValue: number; // 0 to 1
  careerRelevance: number;  // 0 to 1
  hypeScore: number;        // 0 to 1
}

export interface InterestGraphNode {
  id: string;
  label: string;
  level: 1 | 2 | 3 | 4; // 1: Specific topic, 2: Intermediate, 3: Domain, 4: Broad Interest
}

export interface InterestGraphEdge {
  from: string;
  to: string;
}

export interface InterestProfile {
  scores: Record<string, number>; // Domain/Topic -> score (0-100)
  primaryInterest: string;
  confidence: ConfidenceLevel;
  hierarchyNodes: InterestGraphNode[];
  hierarchyEdges: InterestGraphEdge[];
  lastUpdated: number;
}

export interface CandidateReel {
  id: string;
  title: string;
  category: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  educationalValue: number;
  careerRelevance: number;
  contentQuality: number;
  novelty: number;
  engagementPotential: number;
  hypeScore: number;
  thumbnailUrl?: string;
}

export interface ScoreBreakdown {
  interestMatch: number;      // weight 0.35
  semanticSimilarity: number; // weight 0.20
  educationalValue: number;   // weight 0.15
  careerRelevance: number;    // weight 0.10
  contentQuality: number;     // weight 0.10
  novelty: number;            // weight 0.05
  engagementPotential: number;// weight 0.05
  hypeDeduction: number;      // weight -0.20
  finalScore: number;
}

export interface QualityFilterResult {
  candidateId: string;
  status: "ACCEPTED" | "REJECTED";
  hypeScore: number;
  educationalValue: number;
  reason?: string;
  detectedIssues: string[];
}

export interface RecommendationResult {
  candidate: CandidateReel;
  detectedInterest: string;
  confidence: ConfidenceLevel;
  scoreBreakdown: ScoreBreakdown;
  filterResult: QualityFilterResult;
  isPrimary: boolean;
}

export interface ExplanationResult {
  recommendationTitle: string;
  detectedInterest: string;
  evidence: string[];
  reasoningChain: string[];
  scoreExplanation: string;
}

export type FeedbackType = "USEFUL" | "NOT_RELEVANT" | "MORE_LIKE_THIS" | "DONT_RECOMMEND_TOPIC";

export interface UserFeedbackItem {
  id: string;
  candidateId: string;
  topic: string;
  category: string;
  type: FeedbackType;
  timestamp: number;
}

export interface DemoAnalysisState {
  currentStep: number;
  stepName: string;
  isProcessing: boolean;
  complete: boolean;
}
