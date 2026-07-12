import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { 
  getOverview, 
  getMastery, 
  getExamStats, 
  getAIRecommendations, 
  getAdminStats 
} from '../controllers/analytics.controller.js';

const router = Router();

router.use(authenticateJWT);

router.get('/overview', getOverview);
router.get('/mastery', getMastery);
router.get('/exam', getExamStats);
router.get('/insights', getAIRecommendations);
router.get('/admin', getAdminStats);

export default router;
