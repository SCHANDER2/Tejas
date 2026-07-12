import { prisma } from '@tejas/database';

export class RecommendationService {
  async getRecommendations(userId: string) {
    // 1. Identify weak concepts from mastery logs (score < 50)
    const weakTopics = await prisma.userConceptMastery.findMany({
      where: {
        userId,
        masteryScore: { lt: 50.00 }
      },
      select: { topicId: true }
    });

    const topicIds = weakTopics.map(item => item.topicId);

    if (topicIds.length === 0) {
      // Fallback: If no weak topics identified, recommend general starter learning resources
      return await prisma.learningResource.findMany({
        take: 5
      });
    }

    // 2. Fetch resources mapped to identified weak topics
    return await prisma.learningResource.findMany({
      where: {
        topicId: { in: topicIds }
      },
      take: 5
    });
  }

  async logClick(userId: string, resourceId: string, action: string) {
    return await prisma.userRecommendationClick.create({
      data: {
        userId,
        resourceId,
        action
      }
    });
  }
}
