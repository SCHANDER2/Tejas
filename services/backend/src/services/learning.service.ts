import { prisma } from '@tejas/database';

export class LearningService {
  async createSubject(userId: string, name: string) {
    return await prisma.academicSubject.create({
      data: {
        userId,
        name
      }
    });
  }

  async getSubjects(userId: string) {
    return await prisma.academicSubject.findMany({
      where: { userId },
      include: {
        sources: true
      }
    });
  }

  async createSource(userId: string, subjectId: string | null, title: string, sourceType: string, fileUrl?: string) {
    if (subjectId) {
      const subject = await prisma.academicSubject.findFirst({
        where: { id: subjectId, userId }
      });
      if (!subject) {
        throw new Error('Subject not found or access denied.');
      }
    }

    return await prisma.uploadedSource.create({
      data: {
        userId,
        subjectId,
        title,
        sourceType,
        fileUrl,
        status: 'pending'
      }
    });
  }

  async updateSourceStatus(sourceId: string, status: string) {
    return await prisma.uploadedSource.update({
      where: { id: sourceId },
      data: { status }
    });
  }
}
