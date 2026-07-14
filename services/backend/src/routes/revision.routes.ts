import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { getDueCards, submitReview } from '../controllers/revision.controller.js';

const router = Router();

router.use(authenticateJWT);

router.get('/due', getDueCards);
router.post('/review', submitReview);

export default router;
