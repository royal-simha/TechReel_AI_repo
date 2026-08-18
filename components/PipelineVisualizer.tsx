"use client";

import React from "react";
import { useTechReel, PIPELINE_STEPS } from "@/context/TechReelContext";
import { CheckCircle2, Loader2, Sparkles, Brain, Check } from "lucide-react";

export default function PipelineVisualizer() {
  const { isAnalyzing, analysisStep, analysisStepName, pipelineResult } = useTechReel();

  if (!isAnalyzing && analysisStep === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              AI Recommendation Pipeline Execution
            </h3>
            <p className="text-xs text-slate-400">
              Inferring student interest from Reel interactions
            </p>
          </div>
        </div>

        <div className="space-y-2.5 py-2">
          {PIPELINE_STEPS.map((step, idx) => {
            const stepNum = idx + 1;
            const isDone = analysisStep > stepNum || (!isAnalyzing && analysisStep === PIPELINE_STEPS.length);
            const isCurrent = isAnalyzing && analysisStep === stepNum;

            return (
              <div
                key={step}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-medium transition-all ${
                  isDone
                    ? "bg-slate-800/80 border-emerald-500/40 text-emerald-300"
                    : isCurrent
                    ? "bg-cyan-950/50 border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-950"
                    : "bg-slate-900/40 border-slate-800/60 text-slate-500"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {isDone ? (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0 flex items-center justify-center text-[10px] text-slate-600">
                      {stepNum}
                    </div>
                  )}
                  <span>{step}</span>
                </div>
                {isDone && <span className="text-[10px] text-emerald-400 font-bold uppercase">Passed</span>}
                {isCurrent && <span className="text-[10px] text-cyan-400 animate-pulse font-bold">Running</span>}
              </div>
            );
          })}
        </div>

        {!isAnalyzing && analysisStep === PIPELINE_STEPS.length && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Detected Broader Interest:</span>
              <span className="font-bold text-emerald-400 text-sm">
                {pipelineResult.profile.primaryInterest}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Confidence Score:</span>
              <span className="font-bold text-cyan-400">
                {pipelineResult.profile.confidence}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Primary Recommendation:</span>
              <span className="font-semibold text-slate-200 truncate max-w-[240px]">
                {pipelineResult.primaryRecommendation?.candidate.title}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
