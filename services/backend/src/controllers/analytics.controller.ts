import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { AnalyticsService } from '../services/analytics.service.js';

const analyticsService = new AnalyticsService();

export async function getOverview(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const overview = await analyticsService.getUserOverview(user.id);
    return res.status(200).json(overview);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function getMastery(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const masteryList = await analyticsService.getMasteryBreakdown(user.id);
    return res.status(200).json(masteryList);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function getExamStats(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const stats = await analyticsService.getExamAnalytics(user.id);
    return res.status(200).json(stats);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function getAIRecommendations(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const insights = await analyticsService.getAIInsights(user.id);
    return res.status(200).json(insights);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function getAdminStats(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden', message: 'Admin role required.' });
  }

  try {
    const stats = await analyticsService.getAdminAnalytics();
    return res.status(200).json(stats);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}
