import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { generateQuiz, submitQuiz } from '../controllers/quiz.controller.js';

const router = Router();

router.use(authenticateJWT);

router.post('/generate', generateQuiz);
router.post('/:id/submit', submitQuiz);

export default router;
