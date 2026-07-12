import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import examRouter from './routes/exam.routes.js';
import learningRouter from './routes/learning.routes.js';
import quizRouter from './routes/quiz.routes.js';
import analyticsRouter from './routes/analytics.routes.js';
import recommendationRouter from './routes/recommendation.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes mapping
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/exams', examRouter);
app.use('/api/v1/learning', learningRouter);
app.use('/api/v1/quizzes', quizRouter);
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/recommendations', recommendationRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Basic health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'tejas-core-backend', time: new Date().toISOString() });
});

// Global Error Catch Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[GLOBAL ERROR CATCH]:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

app.listen(port, () => {
  console.log(`[SERVER START]: Core Backend running on port ${port}`);
});

export default app;
