import { NextResponse } from "next/server";
import { FeedbackType } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { candidateId, topic, category, type } = body as {
      candidateId: string;
      topic: string;
      category: string;
      type: FeedbackType;
    };

    const delta =
      type === "MORE_LIKE_THIS"
        ? 15
        : type === "DONT_RECOMMEND_TOPIC"
        ? -25
        : type === "USEFUL"
        ? 10
        : -10;

    return NextResponse.json({
      success: true,
      message: `Feedback ${type} registered for ${topic}`,
      modifier: { [category]: delta, [topic]: delta },
      timestamp: Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Feedback processing failed" }, { status: 500 });
  }
}
