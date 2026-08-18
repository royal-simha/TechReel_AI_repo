import { NextResponse } from "next/server";
import { runRecommendationPipeline } from "@/lib/recommendation/recommendationEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { interactions, reels, candidates, feedbackModifiers } = body;

    const pipelineResult = runRecommendationPipeline(
      interactions || [],
      reels || [],
      candidates,
      feedbackModifiers
    );

    return NextResponse.json({
      success: true,
      recommendations: pipelineResult.recommendations,
      primaryRecommendation: pipelineResult.primaryRecommendation,
      explanation: pipelineResult.explanation,
      profile: pipelineResult.profile,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate recommendations" }, { status: 500 });
  }
}
