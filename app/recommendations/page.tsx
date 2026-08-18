"use client";

import React from "react";
import Link from "next/link";
import { useTechReel } from "@/context/TechReelContext";
import { Compass, Sparkles, Award, ShieldCheck, ShieldAlert, ArrowRight, ThumbsUp, ThumbsDown } from "lucide-react";

export default function RecommendationsPage() {
  const { pipelineResult, addFeedback } = useTechReel();
  const { profile, recommendations, allEvaluations } = pipelineResult;

  const rejectedReels = allEvaluations.filter((r) => r.filterResult.status === "REJECTED");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            Ranked Recommendations Engine
          </h1>
          <p className="text-xs text-slate-400">
            Technology Reels selected based on inferred broader interest, quality, and semantic alignment
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Inferred Domain:</span>
            <span className="font-bold text-cyan-400">{profile.primaryInterest}</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-400 block font-medium">Confidence:</span>
            <span className="font-bold text-emerald-400">{profile.confidence}</span>
          </div>
        </div>
      </div>

      {/* Recommended Reels List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <span>Accepted Candidate Reels</span>
          <span className="text-xs font-normal text-slate-400">({recommendations.length} items ranked)</span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((item, index) => {
            const { candidate, scoreBreakdown, isPrimary } = item;
            return (
              <div
                key={candidate.id}
                className={`bg-slate-900 border rounded-2xl p-5 shadow-xl transition-all ${
                  isPrimary
                    ? "border-cyan-500/50 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-cyan-400">#{index + 1}</span>
                      {isPrimary && (
                        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded text-[10px] font-bold">
                          PRIMARY RECOMMENDATION
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-semibold">
                        {candidate.category}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-800 text-emerald-300 rounded text-[10px] font-semibold">
                        {candidate.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-100">{candidate.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span>Educational Val: <strong className="text-blue-400">{Math.round(candidate.educationalValue * 100)}%</strong></span>
                      <span>Career Rel: <strong className="text-emerald-400">{Math.round(candidate.careerRelevance * 100)}%</strong></span>
                      <span>Hype Deduct: <strong className="text-rose-400">-{scoreBreakdown.hypeDeduction}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 block font-medium uppercase">Final Score</span>
                      <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                        {scoreBreakdown.finalScore}
                      </span>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/explainability"
                        className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1"
                      >
                        <span>Why this?</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => addFeedback(candidate.id, candidate.topic, candidate.category, "USEFUL")}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded"
                          title="Useful"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => addFeedback(candidate.id, candidate.topic, candidate.category, "NOT_RELEVANT")}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded"
                          title="Not Relevant"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rejected Hype Filter Section */}
      {rejectedReels.length > 0 && (
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold text-base">Rejected Candidate (Hype Quality Filter Active)</h3>
          </div>

          {rejectedReels.map((item) => (
            <div key={item.candidate.id} className="p-4 bg-slate-900 border border-rose-900/60 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-100 text-sm">{item.candidate.title}</span>
                <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 font-bold rounded">
                  REJECTED (Hype: {item.candidate.hypeScore})
                </span>
              </div>
              <p className="text-slate-300">
                <strong>Reason:</strong> {item.filterResult.reason}
              </p>
              <p className="text-slate-400 text-[11px]">
                The AI filter prevented this recommendation despite user interest in AI, protecting the student from low-value clickbait.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
