import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { QuizService } from '../services/quiz.service.js';

const quizService = new QuizService();

export async function generateQuiz(req: AuthenticatedRequest, res: Response) {
  const { sourceId, sourceType, difficulty, questionCount } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!sourceId || !sourceType || !difficulty) {
    return res.status(400).json({ error: 'Bad Request', message: 'sourceId, sourceType, and difficulty are required.' });
  }

  try {
    const quiz = await quizService.initQuiz(user.id, sourceId, sourceType, difficulty);
    
    // In production, we trigger the FastAPI AI service to return generated options.
    // For this build, we mock the generated JSON schemas directly to complete the integration.
    const mockQuestions = [
      {
        questionText: `Sample MCQ question 1 generated from source ID: ${sourceId} (${difficulty})`,
        questionType: 'mcq',
        explanation: 'Detail explanation of the correct choice options',
        options: [
          { optionText: 'Option A (Correct answer choice)', isCorrect: true },
          { optionText: 'Option B (Distractor choice)', isCorrect: false },
          { optionText: 'Option C (Distractor choice)', isCorrect: false },
          { optionText: 'Option D (Distractor choice)', isCorrect: false }
        ]
      },
      {
        questionText: 'Sample True/False question 2 mapping this concept topic',
        questionType: 'true_false',
        explanation: 'Detail explaining the boolean logic choice',
        options: [
          { optionText: 'True', isCorrect: true },
          { optionText: 'False', isCorrect: false }
        ]
      }
    ];

    const populatedQuiz = await quizService.populateQuizQuestions(quiz.id, mockQuestions);
    return res.status(200).json(populatedQuiz);
  } catch (error: any) {
    return res.status(500).json({ error: 'Generation Failed', message: error.message });
  }
}

export async function submitQuiz(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const { startedAt, responses } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!id || !startedAt || !responses) {
    return res.status(400).json({ error: 'Bad Request', message: 'startedAt and responses list are required.' });
  }

  try {
    const result = await quizService.submitQuizAttempt(user.id, id, new Date(startedAt), responses);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: 'Submission Failed', message: error.message });
  }
}
