import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { ExamService } from '../services/exam.service.js';

const examService = new ExamService();

export async function listExams(req: AuthenticatedRequest, res: Response) {
  try {
    const list = await examService.getExams();
    return res.status(200).json(list);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function getSyllabus(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Bad Request', message: 'Exam ID is required.' });
  }

  try {
    const tree = await examService.getSyllabusTree(id);
    return res.status(200).json(tree);
  } catch (error: any) {
    return res.status(404).json({ error: 'Not Found', message: error.message });
  }
}

export async function enroll(req: AuthenticatedRequest, res: Response) {
  const { examId, isPrimary } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!examId) {
    return res.status(400).json({ error: 'Bad Request', message: 'examId is required.' });
  }

  try {
    const enrollment = await examService.enrollUserInExam(user.id, examId, !!isPrimary);
    return res.status(200).json(enrollment);
  } catch (error: any) {
    return res.status(400).json({ error: 'Enrollment Failed', message: error.message });
  }
}
