"use client";

import React from "react";
import { useTechReel } from "@/context/TechReelContext";
import { DETERMINISTIC_REEL_ANALYSIS } from "@/lib/recommendation/reelAnalyzer";
import { BrainCircuit, Sparkles, ShieldAlert, Award, BookOpen, Briefcase } from "lucide-react";

export default function AnalysisPage() {
  const { reels } = useTechReel();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-cyan-400" />
            AI Reel Analyzer &amp; Metadata Inference
          </h1>
          <p className="text-xs text-slate-400">
            Structured analysis extracted per Reel (Educational value, career relevance, hype detection)
          </p>
        </div>

        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
          DEMO MODE: Deterministic NLP Analyzer
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reels.map((reel) => {
          const analysis = DETERMINISTIC_REEL_ANALYSIS[reel.id] || {
            primaryTopic: reel.topics[0],
            secondaryTopics: reel.topics.slice(1),
            intent: "Educational",
            context: "General technology content",
            difficulty: "Beginner",
            technologyDomain: "Software Engineering",
            educationalValue: 0.7,
            careerRelevance: 0.75,
            hypeScore: 0.1,
          };

          return (
            <div
              key={reel.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded uppercase border border-indigo-800/40">
                    {analysis.intent}
                  </span>
                  <h3 className="font-bold text-slate-100 text-base mt-1">{reel.title}</h3>
                  <p className="text-xs text-slate-400 italic mt-0.5">&quot;{analysis.context}&quot;</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase font-bold">Primary Topic</span>
                  <span className="font-bold text-slate-200">{analysis.primaryTopic}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase font-bold">Technology Domain</span>
                  <span className="font-bold text-cyan-400">{analysis.technologyDomain}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    Educational Value
                  </span>
                  <span className="font-bold text-blue-400">
                    {Math.round(analysis.educationalValue * 100)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                    Career Relevance
                  </span>
                  <span className="font-bold text-emerald-400">
                    {Math.round(analysis.careerRelevance * 100)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    Hype Score
                  </span>
                  <span
                    className={`font-bold ${
                      analysis.hypeScore > 0.6 ? "text-rose-400" : "text-slate-400"
                    }`}
                  >
                    {Math.round(analysis.hypeScore * 100)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
