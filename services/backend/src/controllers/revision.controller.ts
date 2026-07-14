import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { prisma } from '@tejas/database';

export async function getDueCards(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const cards = await prisma.spacedRepetitionCard.findMany({
      where: {
        userId: user.id,
        nextReviewDue: { lte: new Date() }
      },
      orderBy: { nextReviewDue: 'asc' }
    });
    return res.status(200).json(cards);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function submitReview(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  const { cardId, rating } = req.body; // rating: 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!cardId || !rating || rating < 1 || rating > 4) {
    return res.status(400).json({ error: 'Bad Request', message: 'cardId and rating (1-4) are required.' });
  }

  try {
    const card = await prisma.spacedRepetitionCard.findUnique({
      where: { id: cardId }
    });

    if (!card) {
      return res.status(444).json({ error: 'Not Found', message: 'Card not found.' });
    }

    // FSRS parameters weights
    const w = [0.4, 0.9, 2.3, 5.2, 4.9, 0.94, 0.86, 0.01, 1.0, 0.13, 0.43, 0.4, 0.05, 0.3, 0.97, 0.2, 2.7];

    let currentDifficulty = Number(card.difficulty);
    let currentStability = Number(card.stability);
    const repCount = card.repetitionCount;

    let nextDifficulty = currentDifficulty;
    let nextStability = currentStability;

    if (repCount === 0) {
      // First review initialization
      nextDifficulty = 5.0; // default medium difficulty
      nextStability = w[rating - 1] || 1.0;
    } else {
      // Iteration math calculations
      const diffChange = w[5] * (rating - 3);
      nextDifficulty = Math.max(1.0, Math.min(10.0, currentDifficulty - diffChange));

      if (rating === 1) {
        nextStability = w[6] * currentStability * Math.exp(-w[7] * (nextDifficulty - 3.0));
      } else {
        const factor = 1.0 + Math.exp(w[8]) * (11.0 - nextDifficulty) * Math.pow(currentStability, -w[9]) * (Math.exp(w[10] * (rating - 3)) - 1.0);
        nextStability = currentStability * factor;
      }
    }

    // Interval interval gap in days
    const intervalDays = Math.max(1, Math.round(nextStability * 9.0));
    const nextReviewDue = new Date(new Date().getTime() + intervalDays * 24 * 60 * 60 * 1000);

    // Update Card record
    const updatedCard = await prisma.spacedRepetitionCard.update({
      where: { id: cardId },
      data: {
        difficulty: nextDifficulty,
        stability: nextStability,
        repetitionCount: repCount + 1,
        nextReviewDue
      }
    });

    // Log the review session logs history
    await prisma.revisionReview.create({
      data: {
        cardId,
        userId: user.id,
        rating: parseInt(rating, 10)
      }
    });

    return res.status(200).json({
      message: 'Card reviewed successfully.',
      intervalDays,
      card: updatedCard
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}
