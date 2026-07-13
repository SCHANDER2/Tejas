import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.middleware.js';
import {
  listUsers,
  updateUserRole,
  deleteUser,
  getAdminStats
} from '../controllers/admin.controller.js';

const router = Router();

// Guard all administrative endpoints with JWT token and require admin role check
router.use(authenticateJWT);
router.use(authorizeRoles('admin'));

router.get('/users', listUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/stats', getAdminStats);

export default router;
