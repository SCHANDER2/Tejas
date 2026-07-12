import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export async function register(req: Request, res: Response) {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Bad Request', message: 'Email, password, and fullName are required.' });
  }

  try {
    const result = await authService.registerUser(email, password, fullName);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: 'Registration Failed', message: error.message });
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
    return res.status(401).json({ error: 'Authentication Failed', message: error.message });
  }
}
