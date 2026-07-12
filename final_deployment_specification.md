# Final System Blueprint & Production Checklist

This walkthrough documents the final state of the **AI Learning OS (Tejas)** and details instructions for GitHub pushing and Vercel deployment.

---

## 1. Implemented Technology Stack

*   **Monorepo Workspace Manager:** npm Workspaces / TS project references.
*   **Database ORM Layer:** Prisma ORM connecting to a PostgreSQL database.
*   **Core Backend API Server:** Express gateway with Node.js and TypeScript.
*   **AI Intelligence microservice:** FastAPI Python service processing LLM pipelines.
*   **Client Web Interface:** Next.js (App Router, Tailwind CSS, TypeScript, Lucide Icons).

---

## 2. Integrated Features Summary

### Authentication & Profiles
*   User registration and credential verification pipelines.
*   Role-based access guard filters (`free_learner`, `premium_user`, `admin`).

### Study Planner & Exam Discovery
*   Syllabus hierarchy explorer tree maps.
*   Capacity budget calculators distributing content acquisition hours.

### AI Ingestion Pipelines
*   **AI Quiz Builder:** Context chunk parsed MCQs.
*   **YouTube Transcript parser:** Timed transcript segments aggregator.
*   **FSRS Card Scheduler:** Memory decay review cards pacing calculations.

### Analytics Dashboard
*   Active consistency scoring (active days count).
*   Mock test analytics snapshots logging.

---

## 3. GitHub & Vercel Deployment Instructions

Follow these instructions to push the codebase to your remote repository and configure Vercel deployments:

### Step A: Initialize Git & Push to GitHub
1. Open your terminal inside the root project directory `C:\Users\laksh\OneDrive\Desktop\Tejas`.
2. Initialize git and configure the remote repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete production release of AI Learning OS (Tejas)"
   git branch -M main
   git remote add origin https://github.com/SCHANDER2/Tejas.git
   git push -u origin main -f
   ```

### Step B: Deploy Frontend App to Vercel
1. Navigate to [Vercel Dashboard](https://vercel.com/new).
2. Import the `SCHANDER2/Tejas` repository.
3. Configure the following project parameters:
   *   **Framework Preset:** Next.js
   *   **Root Directory:** `apps/web`
   *   **Build Command:** `next build`
   *   **Output Directory:** `.next`
4. Add the required Environment variables:
   *   `NEXT_PUBLIC_API_URL=https://api.tejas.yourdomain.com`
5. Click **Deploy**.

### Step C: Deploy FastAPI / Express Services
1. Deploy the Dockerfiles located in `services/backend/Dockerfile` and `services/ai-service/Dockerfile` to AWS ECS Fargate or Render.
2. Link the environment database strings in the backend environment console dashboard.

---

## 4. Known Limitations & Future Roadmap
*   **Vector Search Mocking:** Document chunk embeddings are currently using a simulated dimensionality array template; replace with real Pinecone index keys.
*   **Real-time payment handlers:** Stripe checkouts are verified via mock response endpoints; replace with live private keys once merchant IDs are approved.
