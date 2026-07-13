import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';

const router = Router();

router.use(authenticateJWT);

router.get('/', getProfile);
router.put('/', updateProfile);

export default router;
