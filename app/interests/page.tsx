"use client";

import React from "react";
import { useTechReel } from "@/context/TechReelContext";
import InterestGraph from "@/components/interests/InterestGraph";
import { Layers, CheckCircle2, TrendingUp, Cpu, Award } from "lucide-react";

export default function InterestsPage() {
  const { pipelineResult } = useTechReel();
  const { profile } = pipelineResult;

  const sortedScores = Object.entries(profile.scores).sort(([, a], [, b]) => b - a);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            Dynamic Interest Profile &amp; Taxonomy
          </h1>
          <p className="text-xs text-slate-400">
            Real-time inferred interest vector calculated from multi-signal Reel activity
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Primary Broader Interest:</span>
            <span className="font-bold text-cyan-400">{profile.primaryInterest}</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-400 block font-medium">Confidence:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {profile.confidence}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Interest Graph */}
      <InterestGraph />

      {/* Interest Percentages Progress Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Calculated Interest Vector Percentages
          </h2>
          <span className="text-xs text-slate-400">Dynamically recomputed on interaction</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedScores.map(([domain, score]) => (
            <div key={domain} className="space-y-2 p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-200 text-sm font-bold">{domain}</span>
                <span className="text-cyan-400 text-sm font-black">{score}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${score}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                <span>Signal Status: {score > 70 ? "Strong Affinity" : score > 40 ? "Moderate Signal" : "Low Priority"}</span>
                <span>Weight: {(score / 100).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
