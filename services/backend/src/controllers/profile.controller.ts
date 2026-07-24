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

    // Send Welcome Email if onboarding completed now
    if (onboardingCompleted && (!existingProfile || !existingProfile.onboardingCompleted)) {
      try {
        const { NotificationService } = await import('../services/notification.service.js');
        const notificationService = new NotificationService();
        const emailHtml = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #dbd7c7; border-radius: 24px; background-color: #fcfcfb; color: #262a2b;">
            <div style="border-bottom: 2px solid #faa114; padding-bottom: 15px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #262a2b; font-family: 'Outfit', sans-serif;">Tejas AI Learning OS</h2>
            </div>
            <p style="font-size: 16px; line-height: 1.6;">Hi ${fullName || user.email.split('@')[0]},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #786e67;">Your independent study workspace is now fully customized and ready for action!</p>
            <div style="background-color: #f4f3f0; border-left: 4px solid #faa114; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <strong style="display: block; margin-bottom: 8px; font-size: 14px;">Here is what we have prepared for you:</strong>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #786e67; line-height: 1.6;">
                <li><strong>Custom Syllabus Roadmaps</strong> bound directly to your timeline.</li>
                <li><strong>Dynamic Study Planner</strong> to balance daily capacity.</li>
                <li><strong>FSRS Spaced Repetition Cards</strong> for active recall reviews.</li>
              </ul>
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #786e67;">If you have any questions or need queries resolved, feel free to tap the WhatsApp support chat inside your workspace, or connect directly via +91 9079144245.</p>
            <p style="font-size: 14px; line-height: 1.6; font-weight: bold; color: #faa114; margin-top: 30px;">Let's study smart and achieve your goals!</p>
            <hr style="border: 0; border-top: 1px solid #dbd7c7; margin: 30px 0 15px 0;" />
            <p style="font-size: 11px; color: #b3aa9e; text-align: center; margin: 0;">© 2026 Tejas Learning. Made with 🔥 for Indian Learners</p>
          </div>
        `;
        await notificationService.sendEmail(user.email, 'Welcome to Tejas!', emailHtml);
        console.log(`[PROFILE EMAIL]: Dispatched welcoming email to ${user.email}.`);
      } catch (emailErr: any) {
        console.error('[PROFILE EMAIL]: Failed to dispatch welcome email:', emailErr.message);
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
