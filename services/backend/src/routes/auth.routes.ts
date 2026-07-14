import { Router, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { signupInitiate, signupVerify, signupResend, login } from '../controllers/auth.controller.js';

const router = Router();

const jwtSecret = process.env.JWT_SECRET || 'tejas_jwt_secret_fallback_key';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

router.post('/signup/initiate', signupInitiate);
router.post('/signup/verify', signupVerify);
router.post('/signup/resend', signupResend);
router.post('/login', login);

// Google OAuth initiating route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback redirect handler
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${frontendUrl}/?error=auth_failed`, session: false }),
  (req: Request, res: Response) => {
    const user = req.user as any;
    if (!user) {
      return res.redirect(`${frontendUrl}/?error=no_user`);
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '7d' });
    return res.redirect(`${frontendUrl}/?token=${token}`);
  }
);

// GitHub OAuth initiating route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback redirect handler
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: `${frontendUrl}/?error=auth_failed`, session: false }),
  (req: Request, res: Response) => {
    const user = req.user as any;
    if (!user) {
      return res.redirect(`${frontendUrl}/?error=no_user`);
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '7d' });
    return res.redirect(`${frontendUrl}/?token=${token}`);
  }
);

export default router;
