import { Interaction, InteractionScoreBreakdown } from "@/types";

export function calculateInteractionScore(interaction: Interaction): InteractionScoreBreakdown {
  let saveBonus = 0;
  let rewatchBonus = 0;
  let shareBonus = 0;
  let likeBonus = 0;
  let commentBonus = 0;
  let watchPercentageBonus = 0;
  let skipPenalty = 0;

  if (interaction.saved) saveBonus = 5;
  if (interaction.rewatched) rewatchBonus = 4;
  if (interaction.shared) shareBonus = 4;
  if (interaction.liked) likeBonus = 3;
  if (interaction.commented) commentBonus = 2;

  if (interaction.watchPercentage > 80) {
    watchPercentageBonus = 3;
  } else if (interaction.watchPercentage >= 50) {
    watchPercentageBonus = 1;
  } else if (interaction.watchPercentage < 20) {
    watchPercentageBonus = -3;
  }

  if (interaction.skipped) {
    skipPenalty = -2;
  }

  const totalScore =
    saveBonus +
    rewatchBonus +
    shareBonus +
    likeBonus +
    commentBonus +
    watchPercentageBonus +
    skipPenalty;

  return {
    reelId: interaction.reelId,
    baseScore: 0,
    details: {
      saveBonus,
      rewatchBonus,
      shareBonus,
      likeBonus,
      commentBonus,
      watchPercentageBonus,
      skipPenalty,
    },
    totalScore,
  };
}
