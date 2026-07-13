import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { prisma } from '@tejas/database';

export async function getProfile(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: user.id }
    });

    if (!profile) {
      // Auto-create default profile if missing
      const newProfile = await prisma.userProfile.create({
        data: {
          userId: user.id,
          fullName: user.email.split('@')[0],
          dailyStudyGoalMinutes: 60,
          preferredLanguage: 'en'
        }
      });
      return res.status(200).json(newProfile);
    }

    return res.status(200).json(profile);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  const { fullName, dailyStudyGoalMinutes, preferredLanguage } = req.body;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const updated = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: {
        fullName,
        dailyStudyGoalMinutes: dailyStudyGoalMinutes ? parseInt(dailyStudyGoalMinutes, 10) : undefined,
        preferredLanguage
      },
      create: {
        userId: user.id,
        fullName: fullName || user.email.split('@')[0],
        dailyStudyGoalMinutes: dailyStudyGoalMinutes ? parseInt(dailyStudyGoalMinutes, 10) : 60,
        preferredLanguage: preferredLanguage || 'en'
      }
    });

    return res.status(200).json({ message: 'Profile updated successfully.', profile: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}
