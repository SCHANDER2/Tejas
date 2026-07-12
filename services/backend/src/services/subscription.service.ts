import { prisma } from '@tejas/database';

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
}
