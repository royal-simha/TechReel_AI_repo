"use client";

import React from "react";
import Link from "next/link";
import { useTechReel } from "@/context/TechReelContext";
import InterestGraph from "@/components/interests/InterestGraph";
import {
  Sparkles,
  TrendingUp,
  Brain,
  ShieldAlert,
  ArrowUpRight,
  CheckCircle,
  Film,
  Zap,
  Award,
} from "lucide-react";

export default function DashboardPage() {
  const { pipelineResult, reels, interactions } = useTechReel();
  const { profile, primaryRecommendation } = pipelineResult;

  const topInterests = Object.entries(profile.scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Recommendation Agent Active</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                Student Tech Interest Dashboard
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl mt-1">
                &quot;We don&apos;t recommend what the student watched. We recommend what the student&apos;s behavior suggests they actually care about.&quot;
              </p>
            </div>

            <div className="flex items-center space-x-4 bg-slate-900/80 backdrop-blur p-4 rounded-2xl border border-slate-800 shrink-0">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Detected Broader Interest</span>
                <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  {profile.primaryInterest}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">Confidence Level</span>
                <span className="inline-flex items-center text-sm font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4 mr-1 text-emerald-400" />
                  {profile.confidence}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Reels Analyzed</span>
            <Film className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{interactions.length}</p>
          <p className="text-xs text-slate-400">Default demo history loaded</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Primary Interest Match</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">
            {profile.scores[profile.primaryInterest]}%
          </p>
          <p className="text-xs text-slate-400">Inferred from multi-signal correlation</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Top Recommendation</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-sm font-bold text-slate-100 truncate">
            {primaryRecommendation ? primaryRecommendation.candidate.title : "Calculating..."}
          </p>
          <p className="text-xs text-indigo-400 font-semibold">
            Score: {primaryRecommendation?.scoreBreakdown.finalScore}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Quality & Hype Filter</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-black text-rose-400">1 Rejected</p>
          <p className="text-xs text-slate-400">&quot;10 AI Tools&quot; clickbait filtered</p>
        </div>
      </div>

      {/* Top Recommendation Highlight & Quick Explanation */}
      {primaryRecommendation && (
        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold rounded-full">
              ★ TOP RECOMMENDATION
            </span>
            <Link
              href="/recommendations"
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-semibold"
            >
              <span>View All Recommendations</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <h2 className="text-xl font-bold text-slate-100">
                {primaryRecommendation.candidate.title}
              </h2>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md font-medium border border-slate-700">
                  Category: {primaryRecommendation.candidate.category}
                </span>
                <span className="px-2.5 py-1 bg-slate-800 text-emerald-300 rounded-md font-medium border border-slate-700">
                  Difficulty: {primaryRecommendation.candidate.difficulty}
                </span>
                <span className="px-2.5 py-1 bg-slate-800 text-indigo-300 rounded-md font-medium border border-slate-700">
                  Domain: {primaryRecommendation.detectedInterest}
                </span>
              </div>
              <p className="text-xs text-slate-400 pt-1">
                Recommended because your strong engagement with Java, Coding Interview, and Laptop reels indicates a high-level Software Engineering interest.
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-center space-y-2">
              <span className="text-xs text-slate-400 font-medium">Weighted Score</span>
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                {primaryRecommendation.scoreBreakdown.finalScore}
              </div>
              <Link
                href="/explainability"
                className="inline-block text-xs font-bold text-cyan-400 hover:underline"
              >
                Why this recommendation? →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Visual Interest Graph Section */}
      <InterestGraph />

      {/* Interest Breakdown & Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Interests */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-100 text-base">Top Inferred Interests</h3>
            <Link href="/interests" className="text-xs text-cyan-400 font-semibold hover:underline">
              View Profile →
            </Link>
          </div>
          <div className="space-y-3">
            {topInterests.map(([domain, score]) => (
              <div key={domain} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{domain}</span>
                  <span className="text-cyan-400">{score}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reel Activity Overview */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-100 text-base">Recent Reel Activity</h3>
            <Link href="/reels" className="text-xs text-cyan-400 font-semibold hover:underline">
              Manage Reels →
            </Link>
          </div>
          <div className="space-y-2 text-xs">
            {interactions.map((interaction) => {
              const reel = reels.find((r) => r.id === interaction.reelId);
              if (!reel) return null;
              return (
                <div
                  key={interaction.reelId}
                  className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800"
                >
                  <div className="truncate max-w-[220px]">
                    <span className="font-semibold text-slate-200 block truncate">
                      {reel.title}
                    </span>
                    <span className="text-[10px] text-slate-400">{reel.category}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px]">
                    <span className="text-cyan-400 font-bold">Watch: {interaction.watchPercentage}%</span>
                    {interaction.liked && <span className="px-1.5 py-0.5 bg-indigo-950 text-indigo-300 rounded">Like</span>}
                    {interaction.saved && <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 rounded">Save</span>}
                    {interaction.skipped && <span className="px-1.5 py-0.5 bg-rose-950 text-rose-300 rounded">Skip</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
