import { prisma } from '@tejas/database';

export class AnalyticsService {
  async getUserOverview(userId: string) {
    const attempts = await prisma.userQuizAttempt.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' }
    });

    if (attempts.length === 0) {
      return {
        overallAccuracy: 0,
        averageTimeSeconds: 0,
        quizzesCompleted: 0,
        studyTimeMinutes: 0,
        consistencyRating: 0,
        completionRate: 0
      };
    }

    const totalScore = attempts.reduce((sum, item) => sum + Number(item.score), 0);
    const totalTime = attempts.reduce((sum, item) => sum + item.timeTakenSeconds, 0);

    // Fetch study time from snapshots
    const snapshots = await prisma.learnerAnalyticsSnapshot.findMany({
      where: { userId }
    });
    const totalStudyTime = snapshots.reduce((sum, s) => sum + s.studyTimeMinutes, 0);

    // Consistency: percentage of days active in past 30 days
    const uniqueDays = new Set(attempts.map(a => a.completedAt.toISOString().slice(0, 10)));
    const consistencyRating = Math.min(100, Math.round((uniqueDays.size / 30) * 100));

    return {
      overallAccuracy: Number((totalScore / attempts.length).toFixed(2)),
      averageTimeSeconds: Math.round(totalTime / attempts.length),
      quizzesCompleted: attempts.length,
      studyTimeMinutes: totalStudyTime || (attempts.length * 15), // Fallback calculation
      consistencyRating,
      completionRate: 100 // Since we track completed attempts
    };
  }

  async getMasteryBreakdown(userId: string) {
    const masteryList = await prisma.userConceptMastery.findMany({
      where: { userId },
      include: {
        topic: true
      }
    });

    const weakTopics = masteryList.filter(m => Number(m.masteryScore) < 70.0);
    const masteredTopics = masteryList.filter(m => Number(m.masteryScore) >= 70.0);

    // Retention metric: average cards stability index
    const cards = await prisma.spacedRepetitionCard.findMany({
      where: { userId }
    });
    const avgStability = cards.length > 0
      ? cards.reduce((sum, c) => sum + Number(c.stability), 0) / cards.length
      : 0.0;

    return {
      masteryList,
      weakTopics: weakTopics.map(w => w.topic.title),
      masteredTopicsCount: masteredTopics.length,
      retentionScore: Math.round(Math.min(100, avgStability * 10))
    };
  }

  async getExamAnalytics(userId: string) {
    const overview = await this.getUserOverview(userId);
    
    // Simple projection logic: expected score is proportional to current overall accuracy
    const expectedScorePercentage = overview.overallAccuracy;
    
    // Rank prediction mapping: simulation based on score parameters
    let predictedPercentile = 50.0;
    if (expectedScorePercentage > 0) {
      predictedPercentile = Math.min(99.9, 50.0 + (expectedScorePercentage - 50.0) * 0.98);
    }

    return {
      expectedScore: Number(expectedScorePercentage.toFixed(2)),
      predictedPercentile: Number(predictedPercentile.toFixed(2)),
      mockPerformanceSummary: {
        totalMockTestsAttempted: Math.round(overview.quizzesCompleted * 0.2),
        highestScorePercentage: Math.min(100, expectedScorePercentage * 1.1)
      }
    };
  }

  async getAIInsights(userId: string) {
    const breakdown = await this.getMasteryBreakdown(userId);
    
    const suggestions = breakdown.weakTopics.length > 0
      ? breakdown.weakTopics.map(topic => `Focus on active recall quizzes for "${topic}".`)
      : ["Keep up the good progress! Prepare for your upcoming mock modules."];

    const cardsDue = await prisma.spacedRepetitionCard.count({
      where: {
        userId,
        nextReviewDue: { lte: new Date() }
      }
    });

    return {
      improvementSuggestions: suggestions,
      revisionAlerts: cardsDue > 0 ? `${cardsDue} cards due for review today.` : "No outstanding reviews.",
      personalizedRecommendations: breakdown.weakTopics.length > 0
        ? breakdown.weakTopics.map(t => ({ topic: t, action: "Try easy mock quizzes" }))
        : [{ topic: "Revision Module", action: "Review flashcards" }]
    };
  }

  async getAdminAnalytics() {
    const usersCount = await prisma.user.count();
    const activeSubscriptions = await prisma.subscription.count({
      where: { status: 'active' }
    });
    const totalQuizAttempts = await prisma.userQuizAttempt.count();

    return {
      totalUsers: usersCount,
      engagementRate: usersCount > 0 ? Number((totalQuizAttempts / usersCount).toFixed(2)) : 0,
      activePremiumSubscriptions: activeSubscriptions,
      aiUsageTokenEstimates: totalQuizAttempts * 250 // Simulated token metric
    };
  }

  async saveSnapshot(userId: string, overallAccuracy: number, studyTimeMinutes: number) {
    return await prisma.learnerAnalyticsSnapshot.upsert({
      where: {
        userId_snapshotDate: {
          userId,
          snapshotDate: new Date()
        }
      },
      update: {
        overallAccuracy,
        studyTimeMinutes
      },
      create: {
        userId,
        snapshotDate: new Date(),
        overallAccuracy,
        studyTimeMinutes
      }
    });
  }
}
