import { prisma } from '@tejas/database';

export class ExamService {
  async getExams() {
    return await prisma.exam.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async getSyllabusTree(examId: string) {
    const exam = await prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) {
      throw new Error('Exam not found.');
    }

    const items = await prisma.syllabusHierarchy.findMany({
      where: { examId },
      orderBy: { depthLevel: 'asc' }
    });

    // Build the hierarchical tree representation client-side
    const rootNodes = items.filter(n => !n.parentNodeId);
    const buildTree = (node: any): any => {
      const children = items.filter(n => n.parentNodeId === node.id);
      return {
        ...node,
        children: children.map(buildTree)
      };
    };

    return rootNodes.map(buildTree);
  }

  async enrollUserInExam(userId: string, examId: string, isPrimary: boolean = false) {
    const exam = await prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) {
      throw new Error('Exam not found.');
    }

    if (isPrimary) {
      // Toggle primary flag on any existing enrollments for this user
      await prisma.userExamEnrollment.updateMany({
        where: { userId },
        data: { isPrimary: false }
      });
    }

    return await prisma.userExamEnrollment.upsert({
      where: {
        userId_examId: { userId, examId }
      },
      update: {
        isPrimary
      },
      create: {
        userId,
        examId,
        isPrimary
      }
    });
  }
}
