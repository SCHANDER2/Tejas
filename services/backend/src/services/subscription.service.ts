import { prisma } from '@tejas/database';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize payment integrations safely with fallbacks
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' as any }) 
  : null;

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

export class SubscriptionService {
  async activateSubscription(userId: string, planType: string, billingStart: Date, billingEnd: Date) {
    // 1. Invalidate any existing active subscriptions for this user
    await prisma.subscription.updateMany({
      where: { userId, status: 'active' },
      data: { status: 'expired' }
    });

    // 2. Create the new subscription record
    const sub = await prisma.subscription.create({
      data: {
        userId,
        planType,
        status: 'active',
        billingStart,
        billingEnd
      }
    });

    // 3. Update the user role to match the plan tier (e.g. premium_basic)
    await prisma.user.update({
      where: { id: userId },
      data: { role: planType }
    });

    return sub;
  }

  async checkActiveSubscription(userId: string) {
    const sub = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'active',
        billingEnd: { gte: new Date() }
      }
    });
    return sub;
  }

  // --- STRIPE INTEGRATION ---

  async createStripeCheckoutSession(userId: string, planType: string, successUrl: string, cancelUrl: string) {
    if (!stripe) {
      throw new Error('Stripe is not configured. Missing STRIPE_SECRET_KEY.');
    }

    // Define price map matching your production Stripe dashboard prices
    const priceMap: Record<string, string> = {
      premium_basic: process.env.STRIPE_PRICE_BASIC_ID || 'price_mock_basic',
      premium_pro: process.env.STRIPE_PRICE_PRO_ID || 'price_mock_pro',
    };

    const priceId = priceMap[planType];
    if (!priceId) {
      throw new Error(`Invalid plan type: ${planType}`);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      metadata: {
        planType,
      },
    });

    return { checkoutUrl: session.url };
  }

  async handleStripeWebhook(rawBody: string | Buffer, signature: string, webhookSecret: string) {
    if (!stripe) {
      throw new Error('Stripe is not configured.');
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const planType = session.metadata?.planType;

      if (userId && planType) {
        const billingStart = new Date();
        const billingEnd = new Date();
        billingEnd.setMonth(billingEnd.getMonth() + 1); // 1 month subscription interval

        await this.activateSubscription(userId, planType, billingStart, billingEnd);
        console.log(`[STRIPE WEBHOOK]: Subscription activated for user ${userId} on plan ${planType}`);
      }
    }
  }

  // --- RAZORPAY INTEGRATION ---

  async createRazorpayOrder(userId: string, planType: string, amountINR: number) {
    if (!razorpay) {
      throw new Error('Razorpay is not configured. Missing keys.');
    }

    const options = {
      amount: amountINR * 100, // Amount in paise
      currency: 'INR',
      receipt: `rcpt_${userId.substring(0, 10)}_${Date.now()}`,
      notes: {
        userId,
        planType,
      },
    };

    const order = await razorpay.orders.create(options);
    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    };
  }

  async verifyRazorpayPayment(userId: string, planType: string, razorpayOrderId: string, razorpayPaymentId: string, signature: string) {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay secret is missing.');
    }

    // Verify HMAC signature: SHA256(order_id + "|" + payment_id, secret)
    const text = `${razorpayOrderId}|${razorpayPaymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generated_signature !== signature) {
      throw new Error('Razorpay payment signature mismatch. Potential fraud attempt.');
    }

    // Activate subscription
    const billingStart = new Date();
    const billingEnd = new Date();
    billingEnd.setMonth(billingEnd.getMonth() + 1);

    return await this.activateSubscription(userId, planType, billingStart, billingEnd);
  }
}
