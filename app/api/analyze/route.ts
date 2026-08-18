import { NextResponse } from "next/server";
import { inferBroaderInterestWithGemini } from "@/lib/ai/geminiService";
import { runRecommendationPipeline } from "@/lib/recommendation/recommendationEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { interactions, reels, feedbackModifiers } = body;

    if (!interactions || !reels) {
      return NextResponse.json({ error: "Missing interactions or reels data" }, { status: 400 });
    }

    // Run dynamic recommendation pipeline
    const pipelineResult = runRecommendationPipeline(interactions, reels, undefined, feedbackModifiers);

    // Call real Gemini API if key is present for broader interest verification
    const geminiInference = await inferBroaderInterestWithGemini(interactions, reels);

    return NextResponse.json({
      success: true,
      pipelineResult,
      geminiInference,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    console.error("API /api/analyze error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze" }, { status: 500 });
  }
}
