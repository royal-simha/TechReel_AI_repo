"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTechReel } from "@/context/TechReelContext";
import {
  Sparkles,
  LayoutDashboard,
  Film,
  BrainCircuit,
  Compass,
  Layers,
  HelpCircle,
  MessageSquare,
  Play,
  Cpu,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { runDemoAnalysis, isAnalyzing, notification } = useTechReel();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/reels", label: "Reel Activity", icon: Film },
    { href: "/analysis", label: "AI Analysis", icon: BrainCircuit },
    { href: "/recommendations", label: "Recommendations", icon: Compass },
    { href: "/interests", label: "Interest Profile", icon: Layers },
    { href: "/explainability", label: "Why This?", icon: HelpCircle },
    { href: "/feedback", label: "Feedback", icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                TechReel AI
              </span>
              <span className="hidden sm:inline-flex items-center ml-2 px-2 py-0.5 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full gap-1">
                <Cpu className="w-3 h-3 text-cyan-400" />
                AI ENGINE ACTIVE
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-800 text-cyan-400 border border-cyan-500/30"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={runDemoAnalysis}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-semibold rounded-lg shadow-md shadow-cyan-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Play className={`w-4 h-4 ${isAnalyzing ? "animate-spin" : ""}`} />
              <span>{isAnalyzing ? "Analyzing Pipeline..." : "Run AI Pipeline"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex overflow-x-auto border-t border-slate-800 px-2 py-2 space-x-2 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-1 shrink-0 px-3 py-1.5 rounded-md text-xs font-medium ${
                isActive
                  ? "bg-slate-800 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Toast Notification Banner */}
      {notification && (
        <div className="bg-indigo-600 text-white text-center text-xs py-1.5 px-4 animate-fade-in font-medium flex items-center justify-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>{notification}</span>
        </div>
      )}
    </header>
  );
}
