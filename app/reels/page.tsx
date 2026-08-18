"use client";

import React, { useState } from "react";
import { useTechReel } from "@/context/TechReelContext";
import { calculateInteractionScore } from "@/lib/recommendation/scoring/interactionEngine";
import ReelPlayer from "@/components/reels/ReelPlayer";
import { Reel } from "@/types";
import { Film, ThumbsUp, Bookmark, Share2, RotateCcw, MessageSquare, SkipForward, Play, Sparkles } from "lucide-react";

export default function ReelsPage() {
  const { reels, interactions, updateInteraction } = useTechReel();
  const [activePlayerReel, setActivePlayerReel] = useState<Reel | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Film className="w-6 h-6 text-cyan-400" />
            Interactive Reel Activity &amp; Live Player
          </h1>
          <p className="text-xs text-slate-400">
            Play video reels or adjust interaction signals to observe real-time AI interest recalculation
          </p>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1">
          <span className="font-bold text-cyan-400 block">Interaction Signal Weights:</span>
          <div className="flex flex-wrap gap-2 text-[10px] text-slate-300">
            <span className="bg-slate-800 px-1.5 py-0.5 rounded">Save: +5</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded">Rewatch: +4</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded">Share: +4</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded">Like: +3</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded">Comment: +2</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded">Watch&gt;80%: +3</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded">Watch&lt;20%: -3</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded">Skip: -2</span>
          </div>
        </div>
      </div>

      {/* Active Reel Player Modal if selected */}
      {activePlayerReel && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-cyan-400">
            <span>LIVE INTERACTIVE PLAYER:</span>
            <button
              onClick={() => setActivePlayerReel(null)}
              className="text-slate-400 hover:text-slate-200 underline text-[11px]"
            >
              Close Player
            </button>
          </div>
          <ReelPlayer
            reel={activePlayerReel}
            interaction={
              interactions.find((i) => i.reelId === activePlayerReel.id) || {
                reelId: activePlayerReel.id,
                watchPercentage: 0,
                liked: false,
                saved: false,
                shared: false,
                rewatched: false,
                commented: false,
                skipped: false,
                timestamp: Date.now(),
              }
            }
            onUpdateInteraction={updateInteraction}
            onClose={() => setActivePlayerReel(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reels.map((reel) => {
          const interaction = interactions.find((i) => i.reelId === reel.id) || {
            reelId: reel.id,
            watchPercentage: 0,
            liked: false,
            saved: false,
            shared: false,
            rewatched: false,
            commented: false,
            skipped: false,
            timestamp: Date.now(),
          };

          const scoreBreakdown = calculateInteractionScore(interaction);

          return (
            <div
              key={reel.id}
              className={`bg-slate-900 border rounded-2xl p-5 shadow-xl space-y-4 transition-all ${
                scoreBreakdown.totalScore > 10
                  ? "border-emerald-500/40"
                  : scoreBreakdown.totalScore < 0
                  ? "border-rose-500/40"
                  : "border-slate-800"
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 uppercase">
                    {reel.category}
                  </span>
                  <h3 className="font-bold text-slate-100 text-base mt-1">{reel.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {reel.topics.map((t) => (
                      <span key={t} className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => setActivePlayerReel(reel)}
                    className="flex items-center space-x-1 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-bold transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch Reel</span>
                  </button>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block font-medium">Signal Score</span>
                    <span
                      className={`text-xl font-black ${
                        scoreBreakdown.totalScore > 0
                          ? "text-emerald-400"
                          : scoreBreakdown.totalScore < 0
                          ? "text-rose-400"
                          : "text-slate-400"
                      }`}
                    >
                      {scoreBreakdown.totalScore > 0 ? `+${scoreBreakdown.totalScore}` : scoreBreakdown.totalScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Watch Percentage Slider */}
              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Watch Completion</span>
                  <span className="text-cyan-400">{interaction.watchPercentage}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={interaction.watchPercentage}
                  onChange={(e) =>
                    updateInteraction({
                      ...interaction,
                      watchPercentage: Number(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Toggle Interaction Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                <button
                  onClick={() => updateInteraction({ ...interaction, liked: !interaction.liked })}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all ${
                    interaction.liked
                      ? "bg-indigo-950 border-indigo-500 text-indigo-300"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 mb-1" />
                  <span>Like (+3)</span>
                </button>

                <button
                  onClick={() => updateInteraction({ ...interaction, saved: !interaction.saved })}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all ${
                    interaction.saved
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <Bookmark className="w-4 h-4 mb-1" />
                  <span>Save (+5)</span>
                </button>

                <button
                  onClick={() => updateInteraction({ ...interaction, rewatched: !interaction.rewatched })}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all ${
                    interaction.rewatched
                      ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <RotateCcw className="w-4 h-4 mb-1" />
                  <span>Rewatch (+4)</span>
                </button>

                <button
                  onClick={() => updateInteraction({ ...interaction, shared: !interaction.shared })}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all ${
                    interaction.shared
                      ? "bg-purple-950 border-purple-500 text-purple-300"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <Share2 className="w-4 h-4 mb-1" />
                  <span>Share (+4)</span>
                </button>

                <button
                  onClick={() => updateInteraction({ ...interaction, commented: !interaction.commented })}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all ${
                    interaction.commented
                      ? "bg-amber-950 border-amber-500 text-amber-300"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mb-1" />
                  <span>Comment (+2)</span>
                </button>

                <button
                  onClick={() => updateInteraction({ ...interaction, skipped: !interaction.skipped })}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all ${
                    interaction.skipped
                      ? "bg-rose-950 border-rose-500 text-rose-300"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <SkipForward className="w-4 h-4 mb-1" />
                  <span>Skip (-2)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
