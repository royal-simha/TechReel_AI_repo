"use client";

import React from "react";
import { useTechReel } from "@/context/TechReelContext";
import { HelpCircle, CheckCircle2, ArrowRight, Brain, Calculator, ShieldCheck } from "lucide-react";

export default function ExplainabilityPage() {
  const { pipelineResult } = useTechReel();
  const { explanation, primaryRecommendation, profile } = pipelineResult;

  if (!primaryRecommendation || !explanation) {
    return (
      <div className="p-8 text-center text-slate-400">
        No active recommendation available to explain.
      </div>
    );
  }

  const { candidate, scoreBreakdown } = primaryRecommendation;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            Explainable AI — &quot;Why This?&quot; Reasoning Engine
          </h1>
          <p className="text-xs text-slate-400">
            Transparent evidence-based reasoning chain explaining why this specific Reel was recommended
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <span className="text-slate-400 block font-medium">Primary Recommendation:</span>
          <span className="font-bold text-slate-100 text-sm truncate max-w-[260px] block">
            {candidate.title}
          </span>
        </div>
      </div>

      {/* Evidence Chain */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400">
          <CheckCircle2 className="w-5 h-5" />
          <h2 className="text-base font-bold text-slate-100">1. Empirical Evidence (User Signals)</h2>
        </div>

        <div className="space-y-2">
          {explanation.evidence.map((ev, i) => (
            <div
              key={i}
              className="flex items-start space-x-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 font-medium"
            >
              <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800/50 rounded font-bold">
                Signal #{i + 1}
              </span>
              <span>{ev}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reasoning Chain */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-indigo-400">
          <Brain className="w-5 h-5" />
          <h2 className="text-base font-bold text-slate-100">2. Hierarchical Inference Reasoning Chain</h2>
        </div>

        <div className="space-y-3">
          {explanation.reasoningChain.map((step, i) => (
            <div
              key={i}
              className="flex items-start space-x-3 p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 shrink-0 flex items-center justify-center font-bold text-[11px]">
                {i + 1}
              </div>
              <p className="pt-0.5 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mathematical Score Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Calculator className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-100">3. Mathematical Recommendation Score Breakdown</h2>
          </div>
          <span className="text-xl font-black text-emerald-400">
            Final Score: {scoreBreakdown.finalScore}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Interest Match (35%)</span>
            <span className="font-bold text-cyan-400 text-sm">{(scoreBreakdown.interestMatch * 100).toFixed(0)}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Semantic Sim (20%)</span>
            <span className="font-bold text-cyan-400 text-sm">{(scoreBreakdown.semanticSimilarity * 100).toFixed(0)}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Educational Val (15%)</span>
            <span className="font-bold text-blue-400 text-sm">{(scoreBreakdown.educationalValue * 100).toFixed(0)}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Career Relevance (10%)</span>
            <span className="font-bold text-emerald-400 text-sm">{(scoreBreakdown.careerRelevance * 100).toFixed(0)}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Content Quality (10%)</span>
            <span className="font-bold text-purple-400 text-sm">{(scoreBreakdown.contentQuality * 100).toFixed(0)}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Novelty (5%)</span>
            <span className="font-bold text-indigo-400 text-sm">{(scoreBreakdown.novelty * 100).toFixed(0)}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Engagement (5%)</span>
            <span className="font-bold text-amber-400 text-sm">{(scoreBreakdown.engagementPotential * 100).toFixed(0)}%</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Hype Penalty (-20%)</span>
            <span className="font-bold text-rose-400 text-sm">-{scoreBreakdown.hypeDeduction}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
