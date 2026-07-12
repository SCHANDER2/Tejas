import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { listRecommendations, registerClick } from '../controllers/recommendation.controller.js';

const router = Router();

router.use(authenticateJWT);

router.get('/', listRecommendations);
router.post('/click', registerClick);

export default router;
