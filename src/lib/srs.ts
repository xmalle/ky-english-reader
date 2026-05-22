import type { Sm2Grade } from "./types";

/**
 * SM-2 间隔重复算法
 * 根据用户评分计算新的复习参数
 */
export function sm2(
  quality: Sm2Grade,
  prevInterval: number,
  prevEaseFactor: number,
  prevRepetitions: number,
) {
  let newInterval: number;
  let newEaseFactor = prevEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  if (quality < 3) {
    // 忘记 → 重置
    newInterval = 1;
    return { interval: newInterval, easeFactor: newEaseFactor, repetitions: 0 };
  }

  const reps = prevRepetitions + 1;

  switch (reps) {
    case 1:
      newInterval = 1;
      break;
    case 2:
      newInterval = 6;
      break;
    default:
      newInterval = Math.round(prevInterval * newEaseFactor);
      break;
  }

  // 复习日期 = 今天 + newInterval 天
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    interval: newInterval,
    easeFactor: newEaseFactor,
    repetitions: reps,
    nextReviewDate: nextReview.toISOString().split("T")[0],
  };
}

/**
 * 获取今天需要复习的单词数量（辅助函数，可在组件中使用）
 */
export function getDueCount(vocabularies: { next_review_date: string }[]): number {
  const today = new Date().toISOString().split("T")[0];
  return vocabularies.filter((v) => v.next_review_date <= today).length;
}
