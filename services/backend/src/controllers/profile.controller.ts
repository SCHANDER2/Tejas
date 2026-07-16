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
          preferredLanguage: 'en',
          phoneNumber: null,
          phoneNumberVerified: false,
          targetExamId: null,
          targetYear: null,
          state: null,
          prepStatus: null,
          onboardingCompleted: false
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
  const {
    fullName,
    dailyStudyGoalMinutes,
    preferredLanguage,
    phoneNumber,
    phoneNumberVerified,
    targetExamId,
    targetYear,
    state,
    prepStatus,
    onboardingCompleted
  } = req.body;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    // Fetch existing profile to check for changes
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId: user.id }
    });

    const isNewPhone = phoneNumber && (!existingProfile || existingProfile.phoneNumber !== phoneNumber);

    const updated = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: {
        fullName,
        dailyStudyGoalMinutes: dailyStudyGoalMinutes ? parseInt(dailyStudyGoalMinutes, 10) : undefined,
        preferredLanguage,
        phoneNumber: phoneNumber !== undefined ? phoneNumber : undefined,
        phoneNumberVerified: phoneNumberVerified !== undefined ? Boolean(phoneNumberVerified) : undefined,
        targetExamId: targetExamId !== undefined ? (targetExamId || null) : undefined,
        targetYear: targetYear !== undefined ? (targetYear ? parseInt(targetYear, 10) : null) : undefined,
        state: state !== undefined ? state : undefined,
        prepStatus: prepStatus !== undefined ? prepStatus : undefined,
        onboardingCompleted: onboardingCompleted !== undefined ? Boolean(onboardingCompleted) : undefined
      },
      create: {
        userId: user.id,
        fullName: fullName || user.email.split('@')[0],
        dailyStudyGoalMinutes: dailyStudyGoalMinutes ? parseInt(dailyStudyGoalMinutes, 10) : 60,
        preferredLanguage: preferredLanguage || 'en',
        phoneNumber: phoneNumber || null,
        phoneNumberVerified: phoneNumberVerified !== undefined ? Boolean(phoneNumberVerified) : false,
        targetExamId: targetExamId || null,
        targetYear: targetYear ? parseInt(targetYear, 10) : null,
        state: state || null,
        prepStatus: prepStatus || null,
        onboardingCompleted: onboardingCompleted !== undefined ? Boolean(onboardingCompleted) : false
      }
    });

    // Primary Exam Sync: If targetExamId is provided and changed, automatically sync enrollment
    if (targetExamId && (!existingProfile || existingProfile.targetExamId !== targetExamId)) {
      try {
        const { ExamService } = await import('../services/exam.service.js');
        const examService = new ExamService();
        await examService.enrollUserInExam(user.id, targetExamId, true);
        console.log(`[PROFILE SYNCHRONIZER]: Enrolled user ${user.id} in target exam ${targetExamId} as primary.`);
      } catch (examErr: any) {
        console.error('[PROFILE SYNCHRONIZER]: Failed to sync exam enrollment:', examErr.message);
      }
    }

    // Welcoming message integration: Send SMS if phone number is new/changed
    if (isNewPhone) {
      try {
        const { NotificationService } = await import('../services/notification.service.js');
        const notificationService = new NotificationService();
        const welcomeMessage = `Welcome to Tejas - your AI-powered independent study platform! We are thrilled to accompany you on your learning journey. Let's study smart and achieve your goals!`;
        
        // As requested: Send welcome message using Twilio or local fallback logging.
        // We ensure 9079144245 is represented in the notification service / mock.
        await notificationService.sendSMS(phoneNumber, welcomeMessage);
        console.log(`[PROFILE SMS]: Dispatched welcoming message to +91 ${phoneNumber}.`);
      } catch (smsErr: any) {
        console.error('[PROFILE SMS]: Failed to dispatch welcome message:', smsErr.message);
      }
    }

    return res.status(200).json({ message: 'Profile updated successfully.', profile: updated });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}
