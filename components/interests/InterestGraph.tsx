"use client";

import React from "react";
import { ArrowRight, Layers, Cpu, Code2, ShieldCheck, Terminal, Award } from "lucide-react";

export default function InterestGraph() {
  const branches = [
    {
      level1: "Java Meme",
      level2: "Programming",
      level3: "Software Development",
      target: "Software Engineering",
      color: "from-amber-500 to-orange-500",
      badge: "Watch: 95%, Liked, Saved",
    },
    {
      level1: "Coding Interview",
      level2: "DSA",
      level3: "Software Engineering Practice",
      target: "Software Engineering",
      color: "from-blue-500 to-indigo-500",
      badge: "Watch: 90%, Liked",
    },
    {
      level1: "Laptop Comparison",
      level2: "Developer Hardware",
      level3: "Engineering Infrastructure",
      target: "Software Engineering",
      color: "from-cyan-500 to-teal-500",
      badge: "Watch: 87%, Saved",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-lg">Hierarchical Interest Inference Graph</h3>
            <p className="text-xs text-slate-400">
              How TechReel AI maps specific reel interactions into broader domain interests
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold rounded-full">
          Primary Output: Software Engineering
        </span>
      </div>

      <div className="space-y-6 overflow-x-auto pb-2">
        {branches.map((branch, i) => (
          <div key={i} className="flex items-center space-x-2 min-w-[650px] p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            {/* Level 1: Specific interaction */}
            <div className="w-44 p-3 bg-slate-900 border border-slate-700 rounded-lg shrink-0 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Level 1: Reel Signal</span>
              <p className="text-xs font-bold text-slate-100">{branch.level1}</p>
              <span className="inline-block text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                {branch.badge}
              </span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

            {/* Level 2: Topic Taxonomy */}
            <div className="w-36 p-3 bg-slate-900/80 border border-slate-700/80 rounded-lg shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Level 2: Topic</span>
              <p className="text-xs font-semibold text-slate-200">{branch.level2}</p>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

            {/* Level 3: Intermediate Domain */}
            <div className="w-40 p-3 bg-slate-900/80 border border-slate-700/80 rounded-lg shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Level 3: Domain</span>
              <p className="text-xs font-semibold text-slate-200">{branch.level3}</p>
            </div>

            <ArrowRight className="w-4 h-4 text-cyan-500 shrink-0 animate-pulse" />

            {/* Level 4: Broader Target Interest */}
            <div className={`w-44 p-3 bg-gradient-to-r ${branch.color} text-white rounded-lg shrink-0 shadow-lg shadow-indigo-900/30`}>
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">Level 4: Broader Interest</span>
              <p className="text-xs font-extrabold">{branch.target}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
        <span className="font-bold text-cyan-400">Key Differentiator:</span>
        <p>
          Unlike shallow recommendation engines that merely recommend more "Java" memes, TechReel AI synthesizes Java + Coding Interview + Laptop Comparison to identify the user's underlying core objective: <strong>Software Engineering Career & Skill Advancement</strong>.
        </p>
      </div>
    </div>
  );
}
