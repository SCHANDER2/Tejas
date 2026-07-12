# Walkthrough — Tejas (AI Learning OS)

This document summarizes the changes made during the backend foundation and frontend user interface implementation phases.

---

## 1. Database Schema (Prisma ORM)
We configured the complete relational PostgreSQL schema at [schema.prisma](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/packages/database/prisma/schema.prisma) mapping all requested entities:
*   `User` & `UserProfile` mapping authentication and capacities.
*   `Exam` & `SyllabusHierarchy` managing competitive exam structures.
*   `AcademicSubject` & `UploadedSource` with `DocumentChunk` tracking university learning materials.
*   `Quiz`, `Question`, and `Option` representing assessments data models.
*   `UserQuizAttempt` & `UserQuestionResponse` logging attempt records.
*   `SpacedRepetitionCard` & `RevisionReview` implementing spaced repetition.
*   `ScheduleEvent` organizing calendar bookings.
*   `UserConceptMastery` & `LearnerAnalyticsSnapshot` tracking analytics parameters.
*   `Subscription` mapping billing models.
*   `LearningResource` & `UserRecommendationClick` representing recommendations.

---

## 2. Core Backend Services & APIs
We created an Express server at [app.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/app.ts) mapping routes under the `/api/v1/` prefix:
*   **Auth Service:** Hashing passwords and signing JWT payloads ([auth.service.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/services/auth.service.ts)).
*   **Exam Service:** CTE tree building for syllabi ([exam.service.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/services/exam.service.ts)).
*   **Learning Service:** Managing academic subjects and triggering background PDF parsing ([learning.service.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/services/learning.service.ts)).
*   **Quiz Service:** Evaluation models mapping incorrect questions to flashcard decks ([quiz.service.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/services/quiz.service.ts)).
*   **Analytics Service:** Aggregate statistics engines ([analytics.service.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/services/analytics.service.ts)).
*   **Recommendation Service:** Match algorithms mapping resource indices to weakness logs ([recommendation.service.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/services/recommendation.service.ts)).
*   **Subscription Service:** Activating and checking tier subscriptions ([subscription.service.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/services/subscription.service.ts)).
*   **Auth Middleware:** Guard filters protecting routes based on JWT signatures and roles ([auth.middleware.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/middleware/auth.middleware.ts)).

---

## 3. Frontend UI Dashboard
We built the complete web client layout at [page.tsx](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/apps/web/src/app/page.tsx) rendering the following interactive sections:
*   **Landing Page:** Value propositions and categories slides.
*   **Authentication Forms:** Register/Login input structures.
*   **Pricing Cards:** Plan tiers.
*   **User Dashboard:** Tasks checklist and file upload cards.
*   **Planner Calendar:** Time blocks, capacities, and rebalance triggers.
*   **Exam Explorer:** Syllabus trees and past papers database search.
*   **PDF Mode Split Pane:** Side-by-side reading layouts and explainer chat inputs.
*   **Analytics Heatmaps:** Visual grid tracking concept mastery levels.
*   **Quiz Workspace Canvas:** Active MCQ options, timer progress lines, and AI explanations.

---

## 4. AI Intelligence Layer Microservice
We implemented the core intelligence layer using FastAPI in the folder [services/ai-service](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/ai-service/):
*   **Quiz generator:** Dynamic quiz schemas validating options, difficulty limits, and text context extraction ([quiz_pipeline.py](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/ai-service/app/pipelines/quiz_pipeline.py)).
*   **PDF processor:** Extracting plain text from binary file feeds and generating semantic overlapping chunks ([pdf_pipeline.py](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/ai-service/app/pipelines/pdf_pipeline.py)).
*   **Study planner:** Generating optimized study budgets based on exam limits, daily hours capacity, and target accuracy constraints ([study_pipeline.py](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/ai-service/app/pipelines/study_pipeline.py)).
*   **YouTube transcript segmenter:** Scraping transcript subtitles and grouping into timeline chunks ([transcript_pipeline.py](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/ai-service/app/pipelines/transcript_pipeline.py)).
*   **Revision FSRS optimizer:** Implementing Free Spaced Repetition parameters adjusting stability index ratings ([fsrs_pipeline.py](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/ai-service/app/pipelines/fsrs_pipeline.py)).

---

## 5. Verification & Testing
*   **Responsive layouts:** Sidebar navigation collapses cleanly to a bottom navigation bar on mobile viewports.
*   **Unified State Transitions:** Elements render shimmering placeholders on loading states, show descriptive messages on empty states, and render alert boxes on validation error states.

---

## 6. Git Synchronization & Production Deployment
We successfully configured git and synchronized the entire monorepo codebase to GitHub:
*   **Git Init:** Initialized a local git repository.
*   **Staging Controls:** Created a root [.gitignore](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/.gitignore) file to prevent tracking unnecessary node packages, build outputs (`.next`, `dist`, `build`), database binaries, and local credential configurations.
*   **GitHub Push:** Pushed the branch `main` to the remote repository: `https://github.com/SCHANDER2/Tejas.git`.

### Vercel Deployment Instructions
To deploy the Next.js web application (`apps/web`) to Vercel:
1.  **Sign in to Vercel:** Go to [vercel.com](https://vercel.com) and log in using your GitHub account.
2.  **Import Project:** Click **Add New** -> **Project**, select the repository `Tejas` from your GitHub account.
3.  **Monorepo Configurations:**
    *   Set **Root Directory** to `apps/web`.
    *   Vercel will auto-detect Next.js as the framework.
    *   Keep build and install settings as default (Vercel automatically supports npm workspace setups).
4.  **Environment Variables:** Add any required runtime credentials.
5.  **Deploy:** Click **Deploy**. Vercel will build the frontend and serve it globally with auto-SSL.


