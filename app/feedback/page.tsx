"use client";

import React, { useState } from "react";
import { useTechReel } from "@/context/TechReelContext";
import { MessageSquare, ThumbsUp, ThumbsDown, Heart, Ban, Check, Sparkles, Layers } from "lucide-react";
import { FeedbackType } from "@/types";

export default function FeedbackPage() {
  const { candidates, feedbackItems, addFeedback, feedbackModifiers } = useTechReel();
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidates[0]?.id || "");

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  const handleFeedbackSubmit = (type: FeedbackType) => {
    if (!selectedCandidate) return;
    addFeedback(selectedCandidate.id, selectedCandidate.topic, selectedCandidate.category, type);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            User Feedback &amp; Dynamic Model Tuning
          </h1>
          <p className="text-xs text-slate-400">
            Submit direct feedback on recommended Reels to actively recalibrate interest weights
          </p>
        </div>

        <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
          Total Feedback Submitted: <strong className="text-cyan-400">{feedbackItems.length}</strong>
        </div>
      </div>

      {/* Interactive Feedback Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Give Feedback on Candidate Reel
        </h2>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-300">Select Candidate Reel:</label>
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
          >
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>
                [{c.category}] {c.title}
              </option>
            ))}
          </select>
        </div>

        {selectedCandidate && (
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-100 text-sm">{selectedCandidate.title}</span>
              <span className="px-2 py-0.5 bg-slate-800 text-cyan-400 font-semibold rounded">
                Topic: {selectedCandidate.topic}
              </span>
            </div>
            <p className="text-slate-400">
              Category: {selectedCandidate.category} | Difficulty: {selectedCandidate.difficulty}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => handleFeedbackSubmit("USEFUL")}
            className="flex items-center justify-center space-x-2 p-3 bg-slate-950 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 rounded-xl font-bold text-xs transition-all"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>👍 Useful (+10 weight)</span>
          </button>

          <button
            onClick={() => handleFeedbackSubmit("NOT_RELEVANT")}
            className="flex items-center justify-center space-x-2 p-3 bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/40 text-rose-400 rounded-xl font-bold text-xs transition-all"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>👎 Not Relevant (-10 weight)</span>
          </button>

          <button
            onClick={() => handleFeedbackSubmit("MORE_LIKE_THIS")}
            className="flex items-center justify-center space-x-2 p-3 bg-slate-950 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-500/40 text-purple-400 rounded-xl font-bold text-xs transition-all"
          >
            <Heart className="w-4 h-4" />
            <span>❤️ More Like This (+15 weight)</span>
          </button>

          <button
            onClick={() => handleFeedbackSubmit("DONT_RECOMMEND_TOPIC")}
            className="flex items-center justify-center space-x-2 p-3 bg-slate-950 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-500/40 text-amber-400 rounded-xl font-bold text-xs transition-all"
          >
            <Ban className="w-4 h-4" />
            <span>🚫 Don&apos;t Recommend (-25 weight)</span>
          </button>
        </div>
      </div>

      {/* Active Weight Modifiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Active Feedback Weight Modifiers
          </h3>

          {Object.keys(feedbackModifiers).length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No feedback modifiers applied yet.</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(feedbackModifiers).map(([topic, val]) => (
                <div
                  key={topic}
                  className="flex justify-between items-center p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs"
                >
                  <span className="font-semibold text-slate-200">{topic}</span>
                  <span
                    className={`font-black ${
                      val > 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {val > 0 ? `+${val}` : val} weight modifier
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feedback History Log */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-100 text-base">Recent Feedback History</h3>

          {feedbackItems.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No feedback submitted in this session.</p>
          ) : (
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              {feedbackItems.map((fb) => (
                <div
                  key={fb.id}
                  className="flex items-center justify-between p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-200 block">{fb.topic}</span>
                    <span className="text-[10px] text-slate-500">Category: {fb.category}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-800 text-cyan-400 font-bold rounded text-[11px]">
                    {fb.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
