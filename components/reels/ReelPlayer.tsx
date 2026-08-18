"use client";

import React, { useState, useEffect } from "react";
import { Reel, Interaction } from "@/types";
import {
  Play,
  Pause,
  ThumbsUp,
  Bookmark,
  Share2,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Code2,
  Terminal,
  BrainCircuit,
  BookOpen,
  Briefcase,
  AlertTriangle,
} from "lucide-react";

interface ReelPlayerProps {
  reel: Reel;
  interaction: Interaction;
  onUpdateInteraction: (updated: Interaction) => void;
  onClose?: () => void;
}

const REEL_VISUAL_CONTENT: Record<
  string,
  {
    codeSnippet: string;
    sceneScript: string;
    aiExplanation: string;
    takeaways: string[];
    visualType: "code" | "terminal" | "hardware" | "cyber" | "hype" | "cloud";
  }
> = {
  "reel-1": {
    codeSnippet: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Build Successful! Zero Errors.");\n  }\n}`,
    sceneScript: "Developer fixes 12 NullPointerExceptions after 4 hours of debugging. Semicolon added at line 42. Code finally executes!",
    aiExplanation: "Humorous representation of Java compilation lifecycle, strict static typing, and developer persistence.",
    takeaways: ["Java JVM execution model", "Exception handling resilience", "Developer problem-solving humor"],
    visualType: "code",
  },
  "reel-2": {
    codeSnippet: `git checkout -b feature/user-auth\nnpm run test:coverage\ngit push origin feature/user-auth`,
    sceneScript: "Morning standup meeting -> Code review on GitHub -> Writing TypeScript unit tests -> CI/CD pipeline deployment -> Coffee break.",
    aiExplanation: "Realistic day-in-the-life breakdown demonstrating modern agile software engineering team workflows.",
    takeaways: ["Agile standups & PR reviews", "CI/CD automated testing", "Collaborative dev culture"],
    visualType: "terminal",
  },
  "reel-3": {
    codeSnippet: `function invertBinaryTree(root) {\n  if (!root) return null;\n  let temp = root.left;\n  root.left = invertBinaryTree(root.right);\n  root.right = invertBinaryTree(temp);\n  return root;\n}`,
    sceneScript: "Whiteboard interview scenario: Interviewer asks candidate to invert a binary tree in 5 minutes under pressure.",
    aiExplanation: "Satirical take on Data Structures & Algorithms (DSA) interview questions vs real-world software engineering.",
    takeaways: ["Binary tree traversal algorithm", "Time/Space complexity O(N)", "Technical interview preparation"],
    visualType: "code",
  },
  "reel-4": {
    codeSnippet: `# Hardware Benchmark Comparison\nM3 Max (ARM64): 45s Docker compilation | 18h Battery\nIntel i9 (x86_64): 62s Docker compilation | 4h Battery`,
    sceneScript: "Side-by-side compilation speed benchmark comparing Apple Silicon M-series vs Intel x86 Windows laptops for dev environments.",
    aiExplanation: "Technical hardware comparison of instruction set architecture (ARM vs x86) impact on developer compilation times.",
    takeaways: ["ARM vs x86 instruction sets", "Compilation & RAM requirements", "Developer workstation choices"],
    visualType: "hardware",
  },
  "reel-5": {
    codeSnippet: `RGB Lighting Sync Profile: Rainbow Wave\nGPU: RTX 4090 | RAM: 64GB DDR5 6000MHz\nDual 4K 144Hz OLED Monitors`,
    sceneScript: "Showcase of RGB lighting, custom desktop PC liquid cooling build, and gaming desk setup.",
    aiExplanation: "Consumer gaming hardware content with high entertainment value but minimal software engineering utility.",
    takeaways: ["PC peripherals & ergonomics", "Low educational coding value", "Consumer gaming focus"],
    visualType: "hardware",
  },
  "reel-6": {
    codeSnippet: `⚠️ HIGH HYPE CLAIM DETECTED\n"Get a $150k Remote Dev Job in 7 Days using these 10 AI Tools!"\nEducational Value: 22% | Hype Score: 91%`,
    sceneScript: "Fast-paced clickbait listicle claiming instant job offers without needing software engineering fundamentals.",
    aiExplanation: "Flagged by TechReel AI Hype Filter due to unrealistic career outcome claims and superficial tool hype.",
    takeaways: ["Hype detection flag", "Unrealistic career promises", "Filtered out from recommendations"],
    visualType: "hype",
  },
  "reel-7": {
    codeSnippet: `[NETWORK ATTACK DETECTED]\nSYN Flood: 5,000,000 req/sec from 50k botnet IPs\nMitigation: Anycast BGP Routing + Cloudflare Rate Limiting Engaged`,
    sceneScript: "Visual diagram showing millions of botnet requests overloading a server, followed by DDoS mitigation firewalls blocking malicious IPs.",
    aiExplanation: "Educational cybersecurity breakdown of Distributed Denial of Service attack vectors and mitigation strategies.",
    takeaways: ["Network layer 4 & 7 attacks", "Anycast BGP mitigation", "Web application firewalls"],
    visualType: "cyber",
  },
  "reel-8": {
    codeSnippet: `// Serverless Architecture\nClient -> Cloudfront CDN -> API Gateway -> AWS Lambda -> DynamoDB\nAutoscaling: 0 -> 10,000 concurrent requests instantly`,
    sceneScript: "Demonstration of cloud infrastructure deployment, showing how code scales globally across multiple cloud regions.",
    aiExplanation: "Cloud computing guide explaining serverless backend architecture and DevOps deployment principles.",
    takeaways: ["Serverless & IaaS concepts", "Global scalability & elasticity", "Modern DevOps practices"],
    visualType: "cloud",
  },
};

export default function ReelPlayer({ reel, interaction, onUpdateInteraction, onClose }: ReelPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const duration = reel.durationSeconds || 30;
  const [currentTime, setCurrentTime] = useState(
    Math.round((interaction.watchPercentage / 100) * duration)
  );
  const [isMuted, setIsMuted] = useState(false);

  const visualContent = REEL_VISUAL_CONTENT[reel.id] || {
    codeSnippet: `// Reel Content Preview\nconsole.log("${reel.title}");`,
    sceneScript: `Simulated video content for ${reel.title}`,
    aiExplanation: `AI Content Breakdown for ${reel.title}`,
    takeaways: ["Technology concept", "Developer relevance"],
    visualType: "code",
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            onUpdateInteraction({
              ...interaction,
              watchPercentage: 100,
              rewatched: true,
            });
            return 0;
          }
          const nextTime = prev + 1;
          const nextPct = Math.min(100, Math.round((nextTime / duration) * 100));
          onUpdateInteraction({
            ...interaction,
            watchPercentage: nextPct,
          });
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, interaction, onUpdateInteraction]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    const pct = Math.round((val / duration) * 100);
    onUpdateInteraction({
      ...interaction,
      watchPercentage: pct,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl space-y-0 animate-fade-in">
      {/* Top Header Bar */}
      <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold rounded-md uppercase">
            {reel.category}
          </span>
          <h3 className="font-bold text-slate-100 text-sm truncate max-w-sm sm:max-w-md">
            {reel.title}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 bg-slate-900 text-slate-300 rounded-lg hover:bg-slate-800 text-xs flex items-center gap-1"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isMuted ? "Muted" : "Audio"}</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 bg-slate-900 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Video Viewport / Simulated Reel Renderer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-slate-950">
        {/* Left Column: Simulated Visual Scene & Animated Snippet */}
        <div className="p-5 border-r border-slate-800/80 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                SIMULATED REEL CONTENT
              </span>
              <span className="animate-pulse text-[11px] text-emerald-400 font-semibold">
                {isPlaying ? "PLAYING ●" : "PAUSED ❚❚"}
              </span>
            </div>

            {/* Code / Script Visual Box */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto shadow-inner">
              <pre className="whitespace-pre-wrap">{visualContent.codeSnippet}</pre>
            </div>
          </div>

          {/* Video Scene Narrative Script */}
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Visual Scene Script
            </span>
            <p className="text-xs text-slate-200 leading-snug">
              {visualContent.sceneScript}
            </p>
          </div>
        </div>

        {/* Right Column: AI Explanation & Signal Breakdown */}
        <div className="p-5 flex flex-col justify-between space-y-4 bg-slate-900/40">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400">
              <BrainCircuit className="w-4 h-4" />
              <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                AI Reel Analysis &amp; Explanation
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed p-3 bg-slate-950 rounded-xl border border-slate-800">
              {visualContent.aiExplanation}
            </p>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Key Educational Takeaways
              </span>
              <div className="flex flex-wrap gap-1.5">
                {visualContent.takeaways.map((point, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg font-medium"
                  >
                    ✓ {point}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Watch Progress Bar */}
          <div className="space-y-1.5 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Playback Progress</span>
              <span className="text-cyan-400 font-mono">
                {currentTime}s / {duration}s ({interaction.watchPercentage}%)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Bottom Interactive Action Controls Bar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={togglePlay}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? "Pause Video" : "Play Video"}</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateInteraction({ ...interaction, liked: !interaction.liked })}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              interaction.liked
                ? "bg-indigo-950 border-indigo-500 text-indigo-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Like (+3)</span>
          </button>

          <button
            onClick={() => onUpdateInteraction({ ...interaction, saved: !interaction.saved })}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              interaction.saved
                ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save (+5)</span>
          </button>

          <button
            onClick={() => onUpdateInteraction({ ...interaction, rewatched: !interaction.rewatched })}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              interaction.rewatched
                ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rewatch (+4)</span>
          </button>

          <button
            onClick={() => onUpdateInteraction({ ...interaction, skipped: true, watchPercentage: 15 })}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              interaction.skipped
                ? "bg-rose-950 border-rose-500 text-rose-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip (-2)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
