import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TechReelProvider } from "@/context/TechReelContext";
import Navbar from "@/components/Navbar";
import PipelineVisualizer from "@/components/PipelineVisualizer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechReel AI — Intelligent Technology Reel Recommendation Agent",
  description:
    "AI recommendation agent that infers a student's broader technology interests from short-form Reel interactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html font-inter="true" lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased flex flex-col`}>
        <TechReelProvider>
          <Navbar />
          <PipelineVisualizer />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="border-t border-slate-800 bg-slate-900/50 py-6 text-center text-xs text-slate-500">
            TechReel AI — Hackathon MVP | Intelligent Broader Interest Inference
          </footer>
        </TechReelProvider>
      </body>
    </html>
  );
}
