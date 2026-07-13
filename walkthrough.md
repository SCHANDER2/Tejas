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
### Vercel Deployment Details
The frontend web application was successfully deployed to Vercel and is fully functional at:
*   **Live Deployment URL:** [https://tejas-web-blond.vercel.app/](https://tejas-web-blond.vercel.app/)
*   **Vercel Scope:** `rajenderbana83-4133s-projects`

---

## 7. Local Infrastructure Orchestration (Docker Compose)
We added a root [docker-compose.yml](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/docker-compose.yml) file to orchestrate the local environment for developer staging:
*   **Primary Database:** PostgreSQL 15 container exposing port `5432` with pre-defined database `tejas_db`.
*   **Caching & Sessions:** Redis container exposing port `6379`.
*   **Message Broker:** RabbitMQ container exposing port `5672` (worker events queue) and `15672` (management dashboard portal).

---

## 8. Production-Grade Features & Integrations
We resolved all mock layers to provide fully functional systems for production deployment:
*   **AI Service Pipelines:** Connected `quiz_pipeline.py`, `study_pipeline.py`, and `recommendation_pipeline.py` to Google Gemini (`gemini-1.5-flash`) and OpenAI (`gpt-4o-mini`) APIs. Implemented robust local fallbacks if keys are missing or API boundaries fail.
*   **Stripe & Razorpay Payments:** Replaced payment mock routes with actual Stripe Checkout Session creation, Razorpay order generations, HMAC payment verification handshakes, and public Stripe webhook callback listeners.
*   **Database Seeding:** Created a comprehensive seeding script at [seed.js](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/packages/database/prisma/seed.js) pre-populating competitive exam syllabi (UPSC Civil Services, JEE Main & Advanced, NEET UG, GATE Engineering) with multi-level depth structures.
*   **Notifications Dispatcher:** Implemented a new [notification.service.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/services/notification.service.ts) delivering SMTP Emails, Twilio SMS alerts, and Web Push notifications.

---

## 9. Admin Portal & Management Console (Phase 6 Extension)
We built an administrative module to support platform moderation and analytical monitoring:
*   **Administrative REST Endpoints:** Developed Express endpoints in [admin.routes.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/routes/admin.routes.ts) and [admin.controller.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/controllers/admin.controller.ts) allowing admins to query business metrics, change user roles, and cascade-delete user records.
*   **Role-Based Security Guards:** Secured administrative API endpoints with Express `authenticateJWT` and `authorizeRoles('admin')` filters.
*   **KPI Metrics Dashboard:** Added a dynamic stats grid to the Next.js client rendering total users, active premium counts, monthly revenue calculations, and AI token usages.
*   **Moderation Directory & Logs:** Built an interactive table to search, change roles, or delete users, accompanied by an AI operations log detailing prompt latency and status codes.




