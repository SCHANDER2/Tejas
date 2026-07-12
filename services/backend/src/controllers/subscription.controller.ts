import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { SubscriptionService } from '../services/subscription.service.js';

const subService = new SubscriptionService();

export async function activatePlan(req: AuthenticatedRequest, res: Response) {
  const { planType, durationMonths } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!planType || !durationMonths) {
    return res.status(400).json({ error: 'Bad Request', message: 'planType and durationMonths are required.' });
  }

  try {
    const billingStart = new Date();
    const billingEnd = new Date(billingStart.getTime() + durationMonths * 30 * 24 * 60 * 60 * 1000);

    const sub = await subService.activateSubscription(user.id, planType, billingStart, billingEnd);
    return res.status(200).json({
      message: 'Payment verified and plan activated successfully.',
      subscription: sub
    });
  } catch (error: any) {
    return res.status(400).json({ error: 'Activation Failed', message: error.message });
  }
}

export async function checkStatus(req: AuthenticatedRequest, res: Response) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const sub = await subService.checkActiveSubscription(user.id);
    if (!sub) {
      return res.status(200).json({ status: 'inactive', message: 'No active premium subscriptions found.' });
    }
    return res.status(200).json({ status: 'active', subscription: sub });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}
