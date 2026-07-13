import { Router } from 'express';
import express from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { 
  createStripeSession, 
  createRazorpayOrder, 
  verifyRazorpayPayment, 
  handleStripeWebhook, 
  checkStatus 
} from '../controllers/subscription.controller.js';

const router = Router();

// Stripe Webhook (Public route, raw body required for signature checking)
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

// Authenticated Subscription & Checkout Management
router.post('/stripe/checkout', authenticateJWT, createStripeSession);
router.post('/razorpay/order', authenticateJWT, createRazorpayOrder);
router.post('/razorpay/verify', authenticateJWT, verifyRazorpayPayment);
router.get('/status', authenticateJWT, checkStatus);

export default router;
