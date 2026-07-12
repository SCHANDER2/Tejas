import { prisma } from '@tejas/database';

export class QuizService {
  async initQuiz(userId: string, sourceId: string, sourceType: string, difficulty: string) {
    return await prisma.quiz.create({
      data: {
        userId,
        sourceId,
        sourceType,
        difficulty
      }
    });
  }

  async populateQuizQuestions(quizId: string, questionsData: Array<{ questionText: string, questionType: string, explanation?: string, options: Array<{ optionText: string, isCorrect: boolean }> }>) {
    for (const q of questionsData) {
      await prisma.question.create({
        data: {
          quizId,
          questionText: q.questionText,
          questionType: q.questionType,
          explanation: q.explanation,
          options: {
            create: q.options.map(opt => ({
              optionText: opt.optionText,
              isCorrect: opt.isCorrect
            }))
          }
        }
      });
    }

    return await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: { options: true }
        }
      }
    });
  }

  async submitQuizAttempt(userId: string, quizId: string, startedAt: Date, responses: Array<{ questionId: string, selectedOptionId: string }>) {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: { options: true }
        }
      }
    });

    if (!quiz) {
      throw new Error('Quiz not found.');
    }

    let correctCount = 0;
    const details = [];

    for (const response of responses) {
      const q = quiz.questions.find(item => item.id === response.questionId);
      if (!q) continue;

      const selectedOpt = q.options.find(opt => opt.id === response.selectedOptionId);
      const isCorrect = selectedOpt ? selectedOpt.isCorrect : false;

      if (isCorrect) {
        correctCount++;
      }

      details.push({
        questionId: response.questionId,
        selectedOptionId: response.selectedOptionId,
        isCorrect
      });
    }

    const totalQuestions = quiz.questions.length || 1;
    const score = (correctCount / totalQuestions) * 100;
    const timeTakenSeconds = Math.floor((new Date().getTime() - startedAt.getTime()) / 1000);

    // Save transactional quiz attempt logs
    const attempt = await prisma.userQuizAttempt.create({
      data: {
        userId,
        quizId,
        score,
        timeTakenSeconds,
        startedAt,
        responses: {
          create: details.map(d => ({
            questionId: d.questionId,
            selectedOptionId: d.selectedOptionId,
            isCorrect: d.isCorrect
          }))
        }
      },
      include: {
        responses: true
      }
    });

    // Update Concept Mastery for associated syllabus topic
    if (quiz.sourceType === 'syllabus_topic') {
      await prisma.userConceptMastery.upsert({
        where: {
          userId_topicId: { userId, topicId: quiz.sourceId }
        },
        update: {
          masteryScore: score,
          attemptsCount: { increment: 1 },
          lastEvaluated: new Date()
        },
        create: {
          userId,
          topicId: quiz.sourceId,
          masteryScore: score,
          attemptsCount: 1
        }
      });
    }

    // Identify weak questions and auto-create Spaced Repetition Flashcards
    for (const detail of details) {
      if (!detail.isCorrect) {
        const targetQ = quiz.questions.find(item => item.id === detail.questionId);
        if (targetQ) {
          await prisma.spacedRepetitionCard.create({
            data: {
              userId,
              questionId: targetQ.id,
              frontText: targetQ.questionText,
              backText: `Correct Option: ${targetQ.options.find(o => o.isCorrect)?.optionText || ''}. Explanation: ${targetQ.explanation || ''}`,
              nextReviewDue: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // schedule review due in 24 hours
            }
          });
        }
      }
    }

    return { attempt, score, correctCount, totalQuestions };
  }
}
