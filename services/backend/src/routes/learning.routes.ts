import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { createSubject, listSubjects, uploadSource } from '../controllers/learning.controller.js';

const router = Router();

router.use(authenticateJWT);

router.post('/subjects', createSubject);
router.get('/subjects', listSubjects);
router.post('/upload', uploadSource);

export default router;
