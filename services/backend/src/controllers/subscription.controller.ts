import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { SubscriptionService } from '../services/subscription.service.js';

const subService = new SubscriptionService();

export async function createStripeSession(req: AuthenticatedRequest, res: Response) {
  const { planType, successUrl, cancelUrl } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!planType || !successUrl || !cancelUrl) {
    return res.status(400).json({ error: 'Bad Request', message: 'planType, successUrl, and cancelUrl are required.' });
  }

  try {
    const result = await subService.createStripeCheckoutSession(user.id, planType, successUrl, cancelUrl);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: 'Checkout Session Creation Failed', message: error.message });
  }
}

export async function createRazorpayOrder(req: AuthenticatedRequest, res: Response) {
  const { planType, amountINR } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!planType || !amountINR) {
    return res.status(400).json({ error: 'Bad Request', message: 'planType and amountINR are required.' });
  }

  try {
    const result = await subService.createRazorpayOrder(user.id, planType, amountINR);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: 'Razorpay Order Creation Failed', message: error.message });
  }
}

export async function verifyRazorpayPayment(req: AuthenticatedRequest, res: Response) {
  const { planType, razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!planType || !razorpayOrderId || !razorpayPaymentId || !signature) {
    return res.status(400).json({ error: 'Bad Request', message: 'planType, razorpayOrderId, razorpayPaymentId, and signature are required.' });
  }

  try {
    const sub = await subService.verifyRazorpayPayment(user.id, planType, razorpayOrderId, razorpayPaymentId, signature);
    return res.status(200).json({
      message: 'Razorpay payment verified and subscription activated successfully.',
      subscription: sub
    });
  } catch (error: any) {
    return res.status(400).json({ error: 'Verification Failed', message: error.message });
  }
}

export async function handleStripeWebhook(req: Request, res: Response) {
  const signature = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return res.status(400).json({ error: 'Bad Request', message: 'Missing signature or webhook secret configuration.' });
  }

  try {
    // req.body needs to be raw buffer for Stripe signature verification
    // Express raw body parser should be configured on this route
    const rawBody = req.body;
    await subService.handleStripeWebhook(rawBody, signature, webhookSecret);
    return res.status(200).json({ received: true });
  } catch (error: any) {
    return res.status(400).json({ error: 'Webhook Error', message: error.message });
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
