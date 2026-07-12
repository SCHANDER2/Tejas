import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { activatePlan, checkStatus } from '../controllers/subscription.controller.js';

const router = Router();

router.use(authenticateJWT);

router.post('/activate', activatePlan);
router.get('/status', checkStatus);

export default router;
