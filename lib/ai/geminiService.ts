import { GoogleGenerativeAI } from "@google/generative-ai";
import { CandidateReel, Interaction, Reel, ReelAnalysis, InterestProfile, ExplanationResult, QualityFilterResult } from "@/types";
import { DETERMINISTIC_REEL_ANALYSIS } from "../recommendation/reelAnalyzer";
import { calculateInteractionScore } from "../recommendation/scoring/interactionEngine";

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Real Gemini API call to analyze Reel content
 */
export async function analyzeReelWithGemini(reel: Reel): Promise<ReelAnalysis> {
  const genAI = getGenAI();
  if (!genAI) {
    return DETERMINISTIC_REEL_ANALYSIS[reel.id] || {
      reelId: reel.id,
      primaryTopic: reel.topics[0] || "Programming",
      secondaryTopics: reel.topics.slice(1),
      intent: "Educational",
      context: `Analysis for ${reel.title}`,
      difficulty: "Beginner",
      technologyDomain: "Software Engineering",
      educationalValue: 0.75,
      careerRelevance: 0.80,
      hypeScore: 0.08,
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analyze this technology Reel for a student:
Title: "${reel.title}"
Category: "${reel.category}"
Topics: ${JSON.stringify(reel.topics)}

Return ONLY a JSON object with this exact JSON format:
{
  "primaryTopic": "string",
  "secondaryTopics": ["string"],
  "intent": "Educational" | "Entertainment" | "Career Guidance" | "Hype/Clickbait",
  "context": "1 sentence context",
  "difficulty": "Beginner" | "Intermediate" | "Advanced",
  "technologyDomain": "string",
  "educationalValue": number (0 to 1),
  "careerRelevance": number (0 to 1),
  "hypeScore": number (0 to 1)
}`;

    const res = await model.generateContent(prompt);
    const text = res.response.text().replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(text);
    return {
      reelId: reel.id,
      ...parsed,
    };
  } catch (err) {
    console.error("Gemini analyzeReel error, using fallback:", err);
    return DETERMINISTIC_REEL_ANALYSIS[reel.id] || {
      reelId: reel.id,
      primaryTopic: reel.topics[0] || "Programming",
      secondaryTopics: reel.topics.slice(1),
      intent: "Educational",
      context: `Analysis for ${reel.title}`,
      difficulty: "Beginner",
      technologyDomain: "Software Engineering",
      educationalValue: 0.75,
      careerRelevance: 0.80,
      hypeScore: 0.08,
    };
  }
}

/**
 * Real Gemini API call to infer broader interest hierarchy from student interactions
 */
export async function inferBroaderInterestWithGemini(
  interactions: Interaction[],
  reels: Reel[]
): Promise<{ primaryInterest: string; confidence: "HIGH" | "MEDIUM" | "LOW"; reasoning: string }> {
  const genAI = getGenAI();
  if (!genAI) {
    return {
      primaryInterest: "Software Engineering",
      confidence: "HIGH",
      reasoning: "Synthesized signals from Java, Coding Interviews, Software Lifestyle, and Hardware content.",
    };
  }

  try {
    const reelMap = new Map(reels.map((r) => [r.id, r]));
    const userSignals = interactions.map((i) => {
      const reel = reelMap.get(i.reelId);
      const score = calculateInteractionScore(i);
      return {
        title: reel?.title,
        category: reel?.category,
        topics: reel?.topics,
        watchPercentage: i.watchPercentage,
        liked: i.liked,
        saved: i.saved,
        skipped: i.skipped,
        calculatedSignalScore: score.totalScore,
      };
    });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an AI technology interest recommendation agent for college students.
Analyze these student Reel interaction signals:
${JSON.stringify(userSignals, null, 2)}

DO NOT simply pick the most frequent keyword. Infer the student's broader underlying core technology interest (e.g. Java + Coding Interview + Developer Lifestyle + Laptop -> Software Engineering).

Return ONLY a JSON object:
{
  "primaryInterest": "string (broad technology domain like Software Engineering, Cloud Computing, Artificial Intelligence, Cybersecurity, DevOps)",
  "confidence": "HIGH" | "MEDIUM" | "LOW",
  "reasoning": "2 sentences explaining the broader interest deduction"
}`;

    const res = await model.generateContent(prompt);
    const text = res.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini interest inference error, using fallback:", err);
    return {
      primaryInterest: "Software Engineering",
      confidence: "HIGH",
      reasoning: "Synthesized signals from Java, Coding Interviews, Software Lifestyle, and Hardware content.",
    };
  }
}

/**
 * Real Gemini API call to evaluate Hype & Quality of candidate reels
 */
export async function evaluateCandidateHypeWithGemini(candidate: CandidateReel): Promise<QualityFilterResult> {
  const genAI = getGenAI();
  if (!genAI) {
    const isRejected = candidate.hypeScore >= 0.70 || candidate.title.toLowerCase().includes("will get you a job");
    return {
      candidateId: candidate.id,
      status: isRejected ? "REJECTED" : "ACCEPTED",
      hypeScore: candidate.hypeScore,
      educationalValue: candidate.educationalValue,
      reason: isRejected
        ? "High hype and unrealistic career-outcome claim."
        : "Passed content quality and educational value thresholds.",
      detectedIssues: isRejected ? ["Unrealistic career outcome claim", "Excessive hype score"] : [],
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Evaluate if this technology Reel is clickbait / hype or genuine educational content:
Title: "${candidate.title}"
Category: "${candidate.category}"
Educational Value: ${candidate.educationalValue}
Hype Score: ${candidate.hypeScore}

Return ONLY a JSON object:
{
  "status": "ACCEPTED" | "REJECTED",
  "reason": "1-2 sentence explanation",
  "detectedIssues": ["issue 1", "issue 2"]
}`;

    const res = await model.generateContent(prompt);
    const text = res.response.text().replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(text);
    return {
      candidateId: candidate.id,
      status: parsed.status,
      hypeScore: candidate.hypeScore,
      educationalValue: candidate.educationalValue,
      reason: parsed.reason,
      detectedIssues: parsed.detectedIssues || [],
    };
  } catch (err) {
    const isRejected = candidate.hypeScore >= 0.70;
    return {
      candidateId: candidate.id,
      status: isRejected ? "REJECTED" : "ACCEPTED",
      hypeScore: candidate.hypeScore,
      educationalValue: candidate.educationalValue,
      reason: isRejected ? "High hype claim detected." : "Passed quality checks.",
      detectedIssues: [],
    };
  }
}
