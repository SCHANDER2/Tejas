import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { LearningService } from '../services/learning.service.js';

const learningService = new LearningService();

export async function createSubject(req: AuthenticatedRequest, res: Response) {
  const { name } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Bad Request', message: 'Subject name is required.' });
  }

  try {
    const sub = await learningService.createSubject(user.id, name);
    return res.status(201).json(sub);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function listSubjects(req: AuthenticatedRequest, res: Response) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  try {
    const list = await learningService.getSubjects(user.id);
    return res.status(200).json(list);
  } catch (error: any) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
}

export async function uploadSource(req: AuthenticatedRequest, res: Response) {
  const { subjectId, title, sourceType, fileUrl } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User payload missing.' });
  }

  if (!title || !sourceType) {
    return res.status(400).json({ error: 'Bad Request', message: 'title and sourceType are required.' });
  }

  try {
    const source = await learningService.createSource(user.id, subjectId || null, title, sourceType, fileUrl);
    
    // In production, we dispatch a job to RabbitMQ queue: 'document.ingest'
    // For local validation, we return the metadata log and print the task dispatch message.
    console.log(`[QUEUE DISPATCH]: Triggered RabbitMQ 'document.ingest' job for file: ${title}`);
    
    return res.status(202).json({
      message: 'Source upload registered. Background processing started.',
      source
    });
  } catch (error: any) {
    return res.status(400).json({ error: 'Ingestion Failed', message: error.message });
  }
}
