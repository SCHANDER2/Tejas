import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { prisma } from '@tejas/database';

export async function listUsers(req: AuthenticatedRequest, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        profile: {
          select: {
            fullName: true,
            studyGoalMinutes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function updateUserRole(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Bad Request', message: 'Role parameter is required.' });
  }

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, email: true, role: true }
    });
    return res.status(200).json({ message: 'User role updated successfully.', user: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function deleteUser(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    return res.status(200).json({ message: 'User account deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function getAdminStats(req: AuthenticatedRequest, res: Response) {
  try {
    const totalUsers = await prisma.user.count();
    const activePremium = await prisma.subscription.count({
      where: { status: 'active', planType: 'premium' }
    });
    
    // Financial approximation based on active checkouts
    const totalRevenue = activePremium * 9.99;
    
    // AI activity heuristics calculation
    const quizzesCount = await prisma.quiz.count();
    const sourcesCount = await prisma.uploadedSource.count();
    const totalTokensUsed = (quizzesCount * 4800) + (sourcesCount * 2200);

    // Recent sign-ups count for charting trends
    const recentSignups = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return res.status(200).json({
      kpis: {
        totalUsers,
        activePremium,
        totalRevenue,
        totalTokensUsed
      },
      recentSignups
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}
