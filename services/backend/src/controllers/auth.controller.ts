import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export async function signupInitiate(req: Request, res: Response) {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Bad Request', message: 'Email, password, and fullName are required.' });
  }

  try {
    const result = await authService.registerInitiate(email, password, fullName);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: 'Registration Failed', message: error.message });
  }
}

export async function signupVerify(req: Request, res: Response) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Bad Request', message: 'Email and OTP are required.' });
  }

  try {
    const result = await authService.registerVerify(email, otp);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: 'Verification Failed', message: error.message });
  }
}

export async function signupResend(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Bad Request', message: 'Email is required.' });
  }

  try {
    const result = await authService.registerResend(email);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: 'Resend Failed', message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Bad Request', message: 'Email and password are required.' });
  }

  try {
    const result = await authService.loginUser(email, password);
    return res.status(200).json(result);
  } catch (error: any) {
    if (error.message === 'EMAIL_NOT_VERIFIED') {
      return res.status(403).json({
        error: 'EmailNotVerified',
        message: 'Your email address is not verified. Please check your inbox for the OTP.'
      });
    }
    return res.status(401).json({ error: 'Authentication Failed', message: error.message });
  }
}
