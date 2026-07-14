# Implementation Plan — Tejas (AI Learning OS)

This document maps the complete engineering roadmap and implementation plan for building the **Tejas** platform.

---

## 1. Technology Stack

### 1.1 Core Stack
*   **Frontend Client:** Next.js (App Router, React 19, TypeScript), Tailwind CSS, shadcn/ui.
*   **Core Backend Server:** Node.js (TypeScript, Express) managing transactions, RBAC, planner heuristics, and analytics calculations.
*   **AI Processing Microservice:** Python (FastAPI, LlamaIndex/LangChain) handling PDF parsing, video transcription, semantic chunking, and embedding generations.
*   **Databases:**
    *   *Relational:* PostgreSQL (Supabase or self-hosted RDS) for user, transaction, schedule, and quiz attempt transactional records.
    *   *Vector Database:* Pinecone (serverless index configuration) or PostgreSQL with `pgvector` for embedding indexes.
*   **Cache & Message Broker:** Redis (Session caching, rate-limiting) and RabbitMQ (Asynchronous worker queue orchestration).

---

## 2. Application Architecture

```
                  [ Web Client (Next.js) ] / [ Mobile Client ]
                                     │
                                     ▼
                          [ API Gateway / ALB ]
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
   [ Core API Service ]                             [ AI microservice ]
   (Node.js / Express)                              (Python / FastAPI)
   - Handles Auth, CRUD, DB transactional flows      - Text parsing, Whisper transcription
   - Planner calculations, payment setups            - Semantic chunking & Pinecone updates
           │                                                   │
           ▼                                                   ▼
  [ Database (PostgreSQL) ]                         [ Vector Store (Pinecone) ]
```

---

## 3. Folder Structure

We use an organized monorepo structure separating frontend clients, transactional backends, AI pipelines, and database migrations.

```
tejas-monorepo/
├── apps/
│   ├── web/                     # Next.js App Router Frontend
│   │   ├── src/
│   │   │   ├── app/             # Application route handlers (Dashboard, Explorer, etc.)
│   │   │   ├── components/      # UI components (SyllabusTree, DynamicQuiz, etc.)
│   │   │   ├── hooks/           # Custom React hooks (useAuth, useQuiz, etc.)
│   │   │   └── lib/             # Utility methods (API client wrappers)
│   │   ├── tailwind.config.js
│   │   └── package.json
│   └── mobile/                  # React Native mobile client workspace
├── services/
│   ├── backend/                 # Node.js Express Backend Service
│   │   ├── src/
│   │   │   ├── controllers/     # Route logic implementation
│   │   │   ├── middleware/      # Auth validations, CORS, RBAC filters
│   │   │   ├── models/          # DB Models/Schemas (Prisma/Drizzle ORM)
│   │   │   ├── routes/          # REST route handlers
│   │   │   └── services/        # Business logic controllers (Planner, Revision, etc.)
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── ai-service/              # Python FastAPI AI Worker Service
│       ├── app/
│       │   ├── core/            # Configuration and settings
│       │   ├── pipelines/       # Ingestion & generation pipelines (RAG, Transcripts)
│       │   ├── routes/          # API endpoints (Query, OCR)
│       │   └── workers/         # RabbitMQ consumer workers
│       ├── requirements.txt
│       └── Dockerfile
├── packages/
│   ├── database/                # Database migrations & schemas directory
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── migrations/
│   └── config/                  # Shared configurations (eslint, typescript, tsconfig)
├── docker-compose.yml           # Local orchestration file (Postgres, Redis, RabbitMQ)
└── README.md
```

---

## 4. Development Phases

```
               [ Phase 1: Foundations & Infrastructure ] (Weeks 1-2)
                                  │
                                  ▼
               [ Phase 2: Ingestion & Exam Engines ] (Weeks 3-4)
                                  │
                                  ▼
               [ Phase 3: Assessments & Quiz Engine ] (Weeks 5-6)
                                  │
                                  ▼
               [ Phase 4: Planner & Revision Systems ] (Weeks 7-8)
                                  │
                                  ▼
               [ Phase 5: Analytics, Recommendations & Pay ] (Weeks 9-10)
```

### Phase 1: Foundations & Infrastructure (Weeks 1-2)
*   **Tasks:**
    1.  Setup monorepo structure, eslint rules, and Docker configurations.
    2.  Implement database migrations (relational tables).
    3.  Create User Authentication endpoints (OAuth integration + JWT handshakes).
    4.  Build frontend navigation layout panels (left sidebar, bottom navigation shells).

### Phase 2: Ingestion & Exam Engines (Weeks 3-4)
*   **Tasks:**
    1.  Build Exam Explorer views, populating the database with syllabus hierarchy trees.
    2.  Write local and PDF file extraction pipelines in Python.
    3.  Set up vector database namespaces and metadata indexing configurations.
    4.  Connect S3 presigned URL uploads from the frontend workspace.

### Phase 3: Assessments & Quiz Engine (Weeks 5-6)
*   **Tasks:**
    1.  Implement LLM quiz generation prompt pipelines with structured JSON output constraints.
    2.  Create the active quiz workspace frontend (timing bars, question cards, option selection controls).
    3.  Code response validation scripts on the backend.
    4.  Setup step-by-step option explanation panels.

### Phase 4: Planner & Revision Systems (Weeks 7-8)
*   **Tasks:**
    1.  Code study plan creation logic, distributing subjects across targets.
    2.  Implement FSRS revision card queuing formulas.
    3.  Add schedule rebalancing workers, shifting tasks forward when flagged.
    4.  Connect calendar workspace, allowing drag-and-drop schedule block updates.

### Phase 5: Analytics, Recommendations & Payments (Weeks 9-10)
*   **Tasks:**
    1.  Write database aggregation services mapping user mastery levels over time.
    2.  Create interactive concept mapping widgets.
    3.  Develop recommendations matching logic based on weakness vectors.
    4.  Integrate payment providers (Razorpay and Stripe) to unlock premium tokens.

---

## 5. Database Strategy

*   **Migrations Framework:** Prisma ORM for database migrations.
*   **Seeding Data:** Pre-populate standard syllabus database tables with public data sources (e.g. NCERT chapters, standard UPSC syllabus breakdowns).
*   **Pooling Policy:** pgBouncer or connection pooling tools configured to manage high-volume concurrent backend threads.

---

## 6. API Strategy

*   **Versioning Scheme:** Enforce `/api/v1/` route prefixes for all transaction APIs.
*   **Payload Validation:** JSON schema filters running validation checks before route controllers are evaluated.
*   **Documentation standard:** OpenAPI/Swagger specifications generated directly from route models.

---

## 7. AI Integration Strategy

*   **Orchestration Middleware:** LangChain expression frameworks used in Python microservices.
*   **Prompt Management:** Centralized system prompts stored in DB configuration records rather than hardcoded in application files.
*   **Model Routing Policies:** Fast queries use `gemini-1.5-flash`. Long-context reasoning passes to `gemini-1.5-pro`.

---

## 8. Deployment Strategy

*   **Containerization:** Decoupled Dockerfile configurations written for frontend, backend, and AI service.
*   **Local Setup:** Run the entire system locally using Docker Compose:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"
```
*   **Cloud Hosting:** Decoupled container groups deployed to AWS ECS / EKS with ALB routing gates.

---

## 9. Testing Strategy

*   **Unit Tests:** Jest (Typescript backend) and PyTest (Python AI-service) covering model calculations and helpers.
*   **Integration Tests:** API integrations validated using SuperTest frameworks checking payload boundaries.
*   **End-to-End Tests:** Playwright tests checking critical workflows (onboarding, quiz submissions).
*   **AI Quality Evaluation:** RAGAS metrics measuring answer correctness, accuracy, and latency thresholds.

---

## 10. Phase 6: Admin Portal & Management Services (New Extension)

We will implement administrative controls and portals to manage users, monitor AI token consumption, and track business revenue metrics.

### Proposed Changes

#### [MODIFY] [page.tsx](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/apps/web/src/app/page.tsx)
*   Add a new view state `ADMIN` in the dashboard sidebar menu, visible only if the authenticated user's role is `'admin'`.
*   Build an Admin dashboard console layout rendering:
    *   **KPI Cards:** Total Registered Users, Active Premium Subscriptions, Total Revenue ($/₹), Total AI tokens used.
    *   **User Management Table:** List users, modify roles (Free, Basic, Pro, Admin), and ban/delete accounts.
    *   **AI Monitoring Logs:** Lists recent AI completions, input/output token usage, and latency times.

#### [NEW] [admin.routes.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/routes/admin.routes.ts)
*   Define backend routes under `/api/v1/admin/` prefix:
    *   `GET /users`: List users with pagination and search.
    *   `PUT /users/:id/role`: Update user roles.
    *   `DELETE /users/:id`: Delete a user.
    *   `GET /stats`: Fetch aggregate business and usage statistics.

#### [NEW] [admin.controller.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/controllers/admin.controller.ts)
*   Implement Express route controller handlers:
    *   Query database to calculate sum of active subscriptions and group users by role tier.
    *   Expose administrative deletion and updates.

#### [MODIFY] [app.ts](file:///c:/Users/laksh/OneDrive/Desktop/Tejas/services/backend/src/app.ts)
*   Import and register the new `/api/v1/admin` routes handler.

