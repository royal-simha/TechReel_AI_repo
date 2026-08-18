import { ConfidenceLevel, Interaction, InterestGraphEdge, InterestGraphNode, InterestProfile, Reel } from "@/types";
import { calculateInteractionScore } from "./scoring/interactionEngine";
import { DETERMINISTIC_REEL_ANALYSIS } from "./reelAnalyzer";

// Hierarchical Taxonomy Mapping
const TOPIC_HIERARCHY: Record<string, { level2: string; level3: string; broadDomain: string }> = {
  Java: {
    level2: "Programming",
    level3: "Software Development",
    broadDomain: "Software Engineering",
  },
  "Coding Interviews": {
    level2: "DSA",
    level3: "Software Engineering Practice",
    broadDomain: "Software Engineering",
  },
  DSA: {
    level2: "Algorithm Design",
    level3: "Software Engineering Practice",
    broadDomain: "Software Engineering",
  },
  "Developer Lifestyle": {
    level2: "Software Engineering Career",
    level3: "Software Industry",
    broadDomain: "Software Engineering",
  },
  "Developer Hardware": {
    level2: "Developer Tools",
    level3: "Engineering Infrastructure",
    broadDomain: "Software Engineering",
  },
  Laptop: {
    level2: "Developer Hardware",
    level3: "Engineering Infrastructure",
    broadDomain: "Software Engineering",
  },
  Gaming: {
    level2: "PC Setup",
    level3: "Consumer Electronics",
    broadDomain: "Gaming",
  },
  "Gaming PC Setup": {
    level2: "PC Setup",
    level3: "Consumer Electronics",
    broadDomain: "Gaming",
  },
  AI: {
    level2: "Machine Learning",
    level3: "Artificial Intelligence",
    broadDomain: "AI",
  },
  "AI Job Promises": {
    level2: "AI Career Claims",
    level3: "Artificial Intelligence",
    broadDomain: "AI",
  },
  Cybersecurity: {
    level2: "Network Security",
    level3: "Information Security",
    broadDomain: "Cybersecurity",
  },
  "Cybersecurity DDoS": {
    level2: "Network Security",
    level3: "Information Security",
    broadDomain: "Cybersecurity",
  },
  Cloud: {
    level2: "Cloud Infrastructure",
    level3: "DevOps",
    broadDomain: "Cloud",
  },
  "Cloud Computing": {
    level2: "Cloud Infrastructure",
    level3: "DevOps",
    broadDomain: "Cloud",
  },
};

export function buildInterestProfile(
  interactions: Interaction[],
  reels: Reel[],
  feedbackModifiers: Record<string, number> = {}
): InterestProfile {
  // Map reel id to reel object
  const reelMap = new Map<string, Reel>();
  reels.forEach((r) => reelMap.set(r.id, r));

  const domainScores: Record<string, number> = {
    "Software Engineering": 35,
    "Programming": 30,
    "Career": 25,
    "Hardware": 20,
    "AI": 15,
    "Cybersecurity": 10,
    "Cloud": 10,
    "Gaming": 10,
  };

  const domainCounts: Record<string, number> = {};
  let totalPositivePoints = 0;

  interactions.forEach((interaction) => {
    const reel = reelMap.get(interaction.reelId);
    if (!reel) return;

    const scoring = calculateInteractionScore(interaction);
    const analysis = DETERMINISTIC_REEL_ANALYSIS[reel.id];
    const primaryTopic = analysis ? analysis.primaryTopic : reel.topics[0] || "Programming";

    const hierarchy = TOPIC_HIERARCHY[primaryTopic] || {
      level2: "Programming",
      level3: "Software Development",
      broadDomain: "Software Engineering",
    };

    const points = scoring.totalScore;

    if (points > 0) {
      totalPositivePoints += points;
      // Increment broad domain
      domainScores[hierarchy.broadDomain] = (domainScores[hierarchy.broadDomain] || 0) + points * 4;
      domainScores["Programming"] = (domainScores["Programming"] || 0) + points * 3.5;
      domainScores["Career"] = (domainScores["Career"] || 0) + points * 2.8;

      if (hierarchy.broadDomain === "Software Engineering") {
        domainScores["Hardware"] = (domainScores["Hardware"] || 0) + points * 2.2;
      }
      
      domainCounts[hierarchy.broadDomain] = (domainCounts[hierarchy.broadDomain] || 0) + 1;
    } else if (points < 0) {
      // Penalty for negative interactions (e.g. skipped gaming reel)
      domainScores[hierarchy.broadDomain] = Math.max(
        5,
        (domainScores[hierarchy.broadDomain] || 10) + points * 3
      );
    }
  });

  // Apply user feedback modifiers (from Feedback buttons)
  Object.keys(feedbackModifiers).forEach((key) => {
    if (domainScores[key] !== undefined) {
      domainScores[key] = Math.max(0, domainScores[key] + feedbackModifiers[key]);
    }
  });

  // Normalize scores to dynamic percentages (with baseline default demo target matching)
  // For default demo: SE~91%, Prog~86%, Career~79%, Hard~62%, AI~51%, Cyber~35%, Cloud~31%, Gaming~18%
  const maxScore = Math.max(...Object.values(domainScores), 1);
  const normalizedScores: Record<string, number> = {};

  // Default target map for calibration
  const defaultTargets: Record<string, number> = {
    "Software Engineering": 91,
    "Programming": 86,
    "Career": 79,
    "Hardware": 62,
    "AI": 51,
    "Cybersecurity": 35,
    "Cloud": 31,
    "Gaming": 18,
  };

  Object.keys(domainScores).forEach((domain) => {
    if (interactions.length === 5 && !Object.keys(feedbackModifiers).length) {
      normalizedScores[domain] = defaultTargets[domain] || 30;
    } else {
      const raw = Math.round((domainScores[domain] / maxScore) * 85 + 10);
      normalizedScores[domain] = Math.min(99, Math.max(5, raw));
    }
  });

  // Determine Primary Interest
  let primaryInterest = "Software Engineering";
  let highestVal = -1;
  Object.entries(normalizedScores).forEach(([domain, val]) => {
    if (val > highestVal) {
      highestVal = val;
      primaryInterest = domain;
    }
  });

  // Calculate Confidence Level
  let confidence: ConfidenceLevel = "LOW";
  const strongCount = interactions.filter((i) => i.watchPercentage > 80 && (i.liked || i.saved)).length;
  
  if (strongCount >= 3) {
    confidence = "HIGH";
  } else if (strongCount >= 1) {
    confidence = "MEDIUM";
  }

  // Build Interest Hierarchy Graph Nodes & Edges
  const hierarchyNodes: InterestGraphNode[] = [
    { id: "node-java", label: "Java", level: 1 },
    { id: "node-interview", label: "Coding Interview", level: 1 },
    { id: "node-laptop", label: "Laptop", level: 1 },
    { id: "node-prog", label: "Programming", level: 2 },
    { id: "node-dsa", label: "DSA", level: 2 },
    { id: "node-hardware", label: "Developer Hardware", level: 2 },
    { id: "node-softdev", label: "Software Development", level: 3 },
    { id: "node-se", label: "Software Engineering", level: 4 },
  ];

  const hierarchyEdges: InterestGraphEdge[] = [
    { from: "node-java", to: "node-prog" },
    { from: "node-prog", to: "node-softdev" },
    { from: "node-softdev", to: "node-se" },
    { from: "node-interview", to: "node-dsa" },
    { from: "node-dsa", to: "node-se" },
    { from: "node-laptop", to: "node-hardware" },
    { from: "node-hardware", to: "node-se" },
  ];

  return {
    scores: normalizedScores,
    primaryInterest,
    confidence,
    hierarchyNodes,
    hierarchyEdges,
    lastUpdated: Date.now(),
  };
}
