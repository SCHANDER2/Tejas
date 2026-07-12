import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { listExams, getSyllabus, enroll } from '../controllers/exam.controller.js';

const router = Router();

router.use(authenticateJWT);

router.get('/', listExams);
router.get('/:id/syllabus', getSyllabus);
router.post('/enroll', enroll);

export default router;
