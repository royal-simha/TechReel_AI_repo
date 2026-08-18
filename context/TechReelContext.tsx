"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CandidateReel,
  FeedbackType,
  Interaction,
  Reel,
  UserFeedbackItem,
} from "@/types";
import { INITIAL_REELS } from "@/data/reels";
import { DEFAULT_DEMO_INTERACTIONS } from "@/data/interactions";
import { CANDIDATE_REELS } from "@/data/candidates";
import { runRecommendationPipeline } from "@/lib/recommendation/recommendationEngine";

interface TechReelContextType {
  reels: Reel[];
  interactions: Interaction[];
  candidates: CandidateReel[];
  feedbackItems: UserFeedbackItem[];
  feedbackModifiers: Record<string, number>;
  pipelineResult: ReturnType<typeof runRecommendationPipeline>;
  updateInteraction: (newInteraction: Interaction) => void;
  addFeedback: (candidateId: string, topic: string, category: string, type: FeedbackType) => void;
  runDemoAnalysis: () => Promise<void>;
  isAnalyzing: boolean;
  analysisStep: number;
  analysisStepName: string;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const TechReelContext = createContext<TechReelContextType | undefined>(undefined);

export const PIPELINE_STEPS = [
  "1. Analyzing Reels Content & Intent",
  "2. Extracting Interaction Signals & Score Weights",
  "3. Building Dynamic Interest Vector",
  "4. Inferring Broader Domain Taxonomy Hierarchy",
  "5. Generating & Evaluating Candidate Reels",
  "6. Running Quality & Hype Filter Evaluation",
  "7. Scoring & Ranking Candidates with 8-Factor Formula",
  "8. Generating Explainability Evidence & Reasoning Chain",
  "9. Calculating Confidence Level & Primary Recommendation",
];

export function TechReelProvider({ children }: { children: React.ReactNode }) {
  const [reels] = useState<Reel[]>(INITIAL_REELS);
  const [interactions, setInteractions] = useState<Interaction[]>(DEFAULT_DEMO_INTERACTIONS);
  const [candidates] = useState<CandidateReel[]>(CANDIDATE_REELS);
  const [feedbackItems, setFeedbackItems] = useState<UserFeedbackItem[]>([]);
  const [feedbackModifiers, setFeedbackModifiers] = useState<Record<string, number>>({});
  const [notification, setNotification] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisStepName, setAnalysisStepName] = useState("");

  const pipelineResult = runRecommendationPipeline(
    interactions,
    reels,
    candidates,
    feedbackModifiers
  );

  const updateInteraction = (newInteraction: Interaction) => {
    setInteractions((prev) => {
      const idx = prev.findIndex((i) => i.reelId === newInteraction.reelId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = newInteraction;
        return updated;
      }
      return [...prev, newInteraction];
    });
    setNotification("Interaction registered. AI model recalculated scores.");
  };

  const addFeedback = async (
    candidateId: string,
    topic: string,
    category: string,
    type: FeedbackType
  ) => {
    const newItem: UserFeedbackItem = {
      id: `fb-${Date.now()}`,
      candidateId,
      topic,
      category,
      type,
      timestamp: Date.now(),
    };

    setFeedbackItems((prev) => [newItem, ...prev]);

    // Send feedback to real API route
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId, topic, category, type }),
      });
    } catch (e) {
      console.warn("Feedback API error:", e);
    }

    // Modify interest weights based on feedback type
    setFeedbackModifiers((prev) => {
      const updated = { ...prev };
      const delta = type === "MORE_LIKE_THIS" ? 15 : type === "DONT_RECOMMEND_TOPIC" ? -25 : type === "USEFUL" ? 10 : -10;
      updated[category] = (updated[category] || 0) + delta;
      updated[topic] = (updated[topic] || 0) + delta;
      return updated;
    });

    setNotification("Feedback registered. Interest weights recalibrated via AI API.");
  };

  const runDemoAnalysis = async () => {
    setIsAnalyzing(true);
    // Call real API route
    try {
      fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interactions, reels, feedbackModifiers }),
      }).catch(console.warn);
    } catch (e) {
      console.warn("Analyze API error:", e);
    }

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      setAnalysisStep(i + 1);
      setAnalysisStepName(PIPELINE_STEPS[i]);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
    setIsAnalyzing(false);
    setNotification("AI Pipeline execution complete! Recommendations dynamically updated.");
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <TechReelContext.Provider
      value={{
        reels,
        interactions,
        candidates,
        feedbackItems,
        feedbackModifiers,
        pipelineResult,
        updateInteraction,
        addFeedback,
        runDemoAnalysis,
        isAnalyzing,
        analysisStep,
        analysisStepName,
        notification,
        setNotification,
      }}
    >
      {children}
    </TechReelContext.Provider>
  );
}

export function useTechReel() {
  const context = useContext(TechReelContext);
  if (!context) {
    throw new Error("useTechReel must be used within a TechReelProvider");
  }
  return context;
}
