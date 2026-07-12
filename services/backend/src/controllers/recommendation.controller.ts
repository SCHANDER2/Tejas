import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { RecommendationService } from '../services/recommendation.service.js';

const recService = new RecommendationService();

export async function listRecommendations(req: AuthenticatedRequest, res: Response) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const list = await recService.getRecommendations(user.id);
    return res.status(200).json(list);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function registerClick(req: AuthenticatedRequest, res: Response) {
  const { resourceId, action } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!resourceId || !action) {
    return res.status(400).json({ error: 'Bad Request', message: 'resourceId and action are required.' });
  }

  try {
    const log = await recService.logClick(user.id, resourceId, action);
    return res.status(201).json(log);
  } catch (error: any) {
    return res.status(400).json({ error: 'Log Failed', message: error.message });
  }
}
