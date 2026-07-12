# Tejas — Complete Production Application Specification

This document provides the complete, unified production specification for **Tejas**, an AI-powered study platform. It serves as the final technical blueprint and single source of truth for the entire platform.

---

## 1. System Architecture & Topology

Tejas is built using a cloud-native, modular service-oriented architecture designed to scale to millions of concurrent learners.

```
                                  [ Users ]
                                      │
                 ┌────────────────────┴────────────────────┐
                 ▼                                         ▼
         [ Web Application ]                     [ Mobile Application ]
         (React/Next.js, Tailwind CSS)            (React Native / Flutter)
                 │                                         │
                 └────────────────────┬────────────────────┘
                                      ▼
                            [ API Gateway / ALB ]
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           ▼                          ▼                          ▼
   [ Core API Services ]     [ AI Gateway / Agent ]     [ Real-time Services ]
   - Auth & Users            - RAG / Chunking Pipeline  - Notification Hub
   - Exam & Syllabus Engine  - Quiz & QA LLM Engine     - WebSocket Event Bus
   - Study Planner Service   - Vector Ingestion Service - Progress Track Engine
   - Payment/Subscription    - Translation/TTS Service
           │                          │                          │
           └──────────────────────────┼──────────────────────────┘
                                      ▼
                              [ Data Layer ]
           ┌──────────────────────────┼──────────────────────────┐
           ▼                          ▼                          ▼
   [ Relational DB ]          [ Vector Database ]        [ Cache & Queue ]
   - PostgreSQL (Master/Repl) - pgvector / Pinecone      - Redis (Sessions, Cache)
   - Core transactional data  - Embedding indexes        - RabbitMQ / Kafka
```

### 1.1 Deployment & Load Balancing
*   **API Gateway:** Routes all HTTP traffic, handles TLS termination, performs rate-limiting, and parses JWT payloads.
*   **Kubernetes (EKS/GKE):** Orchestrates backend and worker services in auto-scaling node groups.
*   **Content Delivery Network (CDN):** Caches and serves static assets and media files near user locations.

---

## 2. Complete Database Schema (DDL)

The core relational engine is **PostgreSQL**. The DDL below defines all tables, indices, and constraints.

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'free_learner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);

-- 2. User Profiles
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    daily_study_goal_minutes INTEGER NOT NULL DEFAULT 60,
    preferred_language VARCHAR(10) NOT NULL DEFAULT 'en',
    CONSTRAINT chk_daily_goal CHECK (daily_study_goal_minutes > 0)
);

-- 3. Exams
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL UNIQUE,
    conducting_body VARCHAR(100) NOT NULL,
    current_version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Syllabus Hierarchy
CREATE TABLE syllabus_hierarchy (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    parent_node_id UUID REFERENCES syllabus_hierarchy(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    weightage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    depth_level INT NOT NULL,
    CONSTRAINT chk_weightage CHECK (weightage >= 0.00 AND weightage <= 100.00)
);
CREATE INDEX idx_syllabus_parent ON syllabus_hierarchy(parent_node_id);
CREATE INDEX idx_syllabus_exam ON syllabus_hierarchy(exam_id);

-- 5. User Exam Enrollments
CREATE TABLE user_exam_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_exam UNIQUE (user_id, exam_id)
);
CREATE INDEX idx_user_enrollments_primary ON user_exam_enrollments(user_id) WHERE is_primary = TRUE;

-- 6. Academic Subjects
CREATE TABLE academic_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_academic_subjects_user ON academic_subjects(user_id);

-- 7. Uploaded Sources
CREATE TABLE uploaded_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES academic_subjects(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    source_type VARCHAR(20) NOT NULL, -- 'pdf', 'youtube_url', 'text'
    file_url VARCHAR(512),
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'processing', 'completed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_uploaded_sources_user ON uploaded_sources(user_id);

-- 8. Document Chunks
CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES uploaded_sources(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    text_content TEXT NOT NULL,
    token_count INT NOT NULL
);
CREATE INDEX idx_document_chunks_source ON document_chunks(document_id);

-- 9. Quizzes
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    source_id UUID NOT NULL, -- References syllabus_hierarchy or uploaded_sources
    source_type VARCHAR(50) NOT NULL, -- 'syllabus_topic', 'uploaded_document'
    difficulty VARCHAR(20) NOT NULL, -- 'easy', 'medium', 'hard'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_quizzes_user ON quizzes(user_id);

-- 10. Questions
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL, -- 'mcq', 'true_false'
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Options
CREATE TABLE options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

-- 12. Quiz Attempt Log
CREATE TABLE user_quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score NUMERIC(5, 2) NOT NULL,
    time_taken_seconds INT NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_quiz_attempts_user_date ON user_quiz_attempts(user_id, completed_at DESC);

-- 13. Question Responses
CREATE TABLE user_question_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES user_quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    selected_option_id UUID REFERENCES options(id) ON DELETE SET NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

-- 14. Spaced Repetition Cards (FSRS Scheduler)
CREATE TABLE spaced_repetition_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
    front_text TEXT NOT NULL,
    back_text TEXT NOT NULL,
    difficulty NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    stability NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    repetition_count INT NOT NULL DEFAULT 0,
    next_review_due TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_spaced_cards_due ON spaced_repetition_cards(user_id, next_review_due);

-- 15. Revision Reviews
CREATE TABLE revision_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    card_id UUID NOT NULL REFERENCES spaced_repetition_cards(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INT NOT NULL, -- 1 to 4 rating scale
    reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. Schedule Events
CREATE TABLE schedule_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    task_ref_id UUID -- References study_tasks
);
CREATE INDEX idx_schedule_events_user_time ON schedule_events(user_id, start_time, end_time);

-- 17. User Concept Mastery
CREATE TABLE user_concept_mastery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES syllabus_hierarchy(id) ON DELETE CASCADE,
    mastery_score NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    attempts_count INT NOT NULL DEFAULT 0,
    last_evaluated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_topic UNIQUE (user_id, topic_id)
);
CREATE INDEX idx_concept_mastery_user ON user_concept_mastery(user_id);

-- 18. Learner Analytics Snapshots
CREATE TABLE learner_analytics_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL,
    overall_accuracy NUMERIC(5, 2) NOT NULL,
    study_time_minutes INT NOT NULL,
    CONSTRAINT uq_user_snapshot_date UNIQUE (user_id, snapshot_date)
);

-- 19. Subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_type VARCHAR(50) NOT NULL, -- 'free', 'premium_basic', 'elite'
    status VARCHAR(30) NOT NULL, -- 'active', 'cancelled', 'expired'
    billing_start TIMESTAMP WITH TIME ZONE NOT NULL,
    billing_end TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 20. Learning Resources (Recommendation Pool)
CREATE TABLE learning_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID NOT NULL REFERENCES syllabus_hierarchy(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'video', 'article', 'practice_set'
    url VARCHAR(512) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 21. User Recommendation Click Stream
CREATE TABLE user_recommendation_clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resource_id UUID NOT NULL REFERENCES learning_resources(id) ON DELETE CASCADE,
    action VARCHAR(20) NOT NULL, -- 'viewed', 'completed'
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. UI/UX Visual Specifications & Page System

All visual layouts conform to the specified hex color palette:

*   **Primary Background:** `#fcfcfb`
*   **Borders & Dividers:** `#dbd7c7`
*   **Secondary Text & Disabled:** `#b3aa9e`
*   **Brand Primary / CTA:** `#faa114`
*   **Secondary CTA / Labels:** `#786e67`
*   **Contrast Elements:** `#262a2b`

### 3.1 Core Navigation Structure
*   **Desktop:** Left Sidebar, width: 280px, background `#fcfcfb`, border-right 1px solid `#dbd7c7`. Text link colors are `#262a2b`. Hovering elements shifts background colors to `#dbd7c7` (200ms transition). Active pages showcase a left border in `#faa114`.
*   **Mobile:** Bottom navigation bar, height: 64px, background `#fcfcfb`, border-top 1px solid `#dbd7c7`. Active pages highlight icons in `#faa114`.

### 3.2 Visual Specifications for the 9 Core Pages

```
[ App Navigation Container ]
  ├── Landing Page (Intro, Features, Exam Carousel, Pricing)
  ├── Dashboard (Progress ring, Upcoming study blocks, Quick file uploader)
  ├── Study Planner (Interactive roadmap calendar, Capacity sliders)
  ├── Exam Explorer (Search bar, Accordion syllabus trees, PYQ library)
  ├── Instant Quiz Workspace (Question panel, Progress/Timer bar, Explanations drawer)
  ├── PDF Learning Hub (Document reader workspace, context chat pane)
  ├── Analytics Dashboard (Summary stats, Mastery heatmaps, AI recommendations)
  ├── Progress Center (Node graph roadmap status, achievement grid)
  └── Profile & Settings (Account configuration, billing manager)
```

1.  **Landing Page:**
    *   *Header:* StickyNavbar with blur (`backdrop-filter: blur(10px)`), 1px solid bottom border in `#dbd7c7`.
    *   *Hero section:* Bold heading in `#262a2b`, CTA button in `#faa114`. Swipes to a responsive horizontal slider showing supported exams.
    *   *Features & Pricing:* 3-column card grid with `#dbd7c7` borders. Premium tier features an accent tag in `#faa114`.
2.  **Dashboard:**
    *   *Status banner:* Displays study streak badge in `#faa114`.
    *   *Study Plan Tracker:* Horizontal list of today's study tasks. Checking items triggers completion updates, striking text, and changing backgrounds to `#dbd7c7`.
    *   *Workspace Upload Panel:* Dotted upload box in `#dbd7c7` with drag-and-drop triggers.
3.  **Study Planner:**
    *   *Plan Calendar:* Calendar grid detailing scheduled study topics colored in warm earth tones `#786e67` with `#dbd7c7` borders.
    *   *Milestones:* Timeline tracing preparation milestones. Reached milestones turn `#faa114`.
4.  **Exam Explorer:**
    *   *Search Bar:* Text input in `#fcfcfb` with a 1px border in `#dbd7c7`. Highlights in `#faa114` on focus.
    *   *Syllabus Tree Accordion:* Nested lists. Expanded subjects reveal nested topic nodes.
    *   *PYQ Cards:* File links showing download parameters and attempt stats.
5.  **Instant Quiz Workspace:**
    *   *Quiz Portal:* Question view. Option buttons feature hover actions transitioning from `#dbd7c7` to `#786e67`. Incorrect selection turns background to `#262a2b` with secondary text, correct turns background to `#faa114`.
    *   *Timer:* Horizontal progress bar in `#faa114` across the top viewport border.
6.  **PDF Learning Hub:**
    *   *Split Pane:* Left is document viewer, right is RAG chat container. Context chat uses message bubbles in `#faa114` for user and `#dbd7c7` for AI response text.
7.  **Analytics Dashboard:**
    *   *Overview Cards:* Score summary grids.
    *   *Mastery Heatmap:* Interactive concept blocks. Colors scale: Mastered (`#faa114`), Strong (`#786e67`), Moderate (`#dbd7c7`), and Weak (`#262a2b`).
8.  **Progress Center:**
    *   *Roadmap Graph:* Interactive node diagram. Nodes light up in `#faa114` when completed, or `#dbd7c7` when locked.
9.  **Profile & Settings:**
    *   *Settings Form:* Form layout with input fields in `#fcfcfb` and borders in `#dbd7c7`. Save button is `#faa114`.

---

## 4. REST API Registry

All API calls must pass through JWT authentication filters.

### 4.1 Route Catalog

| Method | Path | Request Validation | Response Codes | RBAC Guard |
|---|---|---|---|---|
| `POST` | `/api/v1/auth/signup` | Email format, password min length 8 | `201 Created`, `409 Conflict` | All |
| `POST` | `/api/v1/auth/login` | Email format, password string | `200 OK` (with JWT), `401 Unauthorized` | All |
| `GET` | `/api/v1/exams` | Query search filter string | `200 OK` (Exam records list) | All |
| `GET` | `/api/v1/exams/:id/syllabus` | URL exam uuid parameter | `200 OK` (Syllabus tree) | All |
| `POST` | `/api/v1/exams/enroll` | Exam ID UUID, priority boolean flag | `200 OK` (Enrollment created) | All |
| `POST` | `/api/v1/planner/create` | Target date, daily budget hours | `201 Created` (Planner timeline tasks) | All |
| `POST` | `/api/v1/planner/rebalance`| Empty payload | `200 OK` (Rebalanced tasks list) | All |
| `POST` | `/api/v1/academic/upload` | Multi-part form: PDF file payload | `202 Accepted` (Dispatches job to queue) | Premium |
| `POST` | `/api/v1/quizzes/generate` | Source ID, difficulty, size | `200 OK` (Quiz and Questions JSON) | All (Free limit) |
| `POST` | `/api/v1/quizzes/:id/submit`| Attempt details, responses list | `200 OK` (Calculated score breakdown) | All |
| `GET` | `/api/v1/revision/cards` | Empty payload | `200 OK` (Due review cards list) | All |
| `POST` | `/api/v1/revision/:id/review`| Card ID, rating (1 to 4) | `200 OK` (Updated next intervals) | All |
| `GET` | `/api/v1/analytics/dashboard`| Empty payload | `200 OK` (Aggregated mastery levels) | All |
| `GET` | `/api/v1/recommendations` | Empty payload | `200 OK` (Learning resource list) | All |

---

## 5. AI Pipelines & Modeling Specifications

The AI layer decouples long-running parsing and generation tasks from user-facing APIs.

```
       [ Input Raw File ] ──► [ Text Extraction & OCR ] ──► [ Recursive Text Splitter ]
                                                                      │
                                                                      ▼
       [ Pinecone / pgvector ] ◄── [ Embedding Model ] ◄── [ Semantic Chunk Overlap ]
                 │
                 ▼
       [ Prompt Templates & Context assembly ]
                 │
                 ▼
[ JSON Enforced LLM Call ] ──► [ Answer / Quiz generation & Verification ]
```

### 5.1 PDF Ingestion & Embedding Pipeline
*   **Chunking Strategy:** Semantic Chunking with a chunk size of 1000 tokens and 150-token recursive overlap to prevent contextual loss at boundaries.
*   **Embedding Model:** `text-embedding-3-small` (1536 dimensions) for optimized retrieval performance.
*   **Vector Database Strategy:** Isolated namespaces in Vector DB partitioned at the `user_id` and `document_id` levels.

### 5.2 Quiz Generation Prompt & Verification Pipeline
To guarantee stable production outputs, the generation loop enforces structured JSON outputs.

#### Quiz Schema Constraints
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "QuizSet",
  "type": "object",
  "properties": {
    "quizzes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "question_text": { "type": "string" },
          "question_type": { "type": "string", "enum": ["mcq", "true_false"] },
          "options": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "option_text": { "type": "string" },
                "is_correct": { "type": "boolean" }
              },
              "required": ["option_text", "is_correct"]
            },
            "minItems": 2,
            "maxItems": 4
          },
          "explanation": { "type": "string" }
        },
        "required": ["question_text", "question_type", "options", "explanation"]
      }
    }
  },
  "required": ["quizzes"]
}
```

*   **Self-Correction Loop:** Validates the schema client-side post-generation. If JSON parsing fails or schema validation fails, a single retry execution is requested from the model with explicit parsing validation feedback.

### 5.3 Weak Topic Detection & Mastery Scoring Model
*   **Calculation Method:** Weighted moving average of last 10 quiz attempts for the target concept.
$$\text{Mastery Score} = \sum_{i=1}^{n} w_i \times x_i$$
Where $x_i$ is correctness ($0$ or $1$), and weight $w_i$ decays exponentially based on temporal distance ($w_n$ represents the most recent response).
*   **Trigger Thresholds:** If mastery score drops below 50% on a sub-topic:
    1. An inline alert is generated.
    2. Recommended resource items are selected.
    3. The concept is inserted into the immediate revision vault priority loop.

---

## 6. Background Workers & Message Queue Specifications

We use **RabbitMQ** to manage background tasks.

### 6.1 Ingestion Job Message Schema
*   **Routing Key:** `document.ingest`
*   **Payload:**
```json
{
  "job_id": "uuid-job-identifier",
  "user_id": "uuid-user",
  "source_id": "uuid-uploaded-source",
  "file_url": "https://s3.ap-south-1.amazonaws.com/tejas-documents/path.pdf",
  "type": "pdf"
}
```

### 6.2 Ingestion Pipeline Worker Steps
1.  **Parse File:** Parses PDF layout structures and extracts text.
2.  **Generate Chunks:** Splits text into 1000-token semantic chunks.
3.  **Embed Chunks:** Generates embeddings using `text-embedding-3-small`.
4.  **Save to Vector DB:** Saves vectors to Pinecone under the user's namespace.
5.  **Notify User:** Dispatches a WebSocket message to the client indicating completion.

---

## 7. Performance, Cache & Scaling Architecture

```
                 [ Cache Miss: Query Database ]
                               ▲
                               │
[ Client Request ] ──► [ Check Redis Cache ] ──► [ Cache Hit: Return Cached Response ]
```

### 7.1 Caching Strategy
*   **Syllabus Nodes:** Cached permanently with keys matching `syllabus:{exam_id}`. Invalidated only when `exams.current_version` increments.
*   **Analytics Dashboards:** Cached for 5 minutes with keys matching `analytics:user:{user_id}`.

### 7.2 Pinecone Index Configuration
*   **Vector Metric:** Cosine similarity.
*   **Dimensions:** 1536 (matching OpenAI embeddings).
*   **Metadata Filtering:** Indexes are filtered using queries with metadata namespaces matching:
```json
{
  "user_id": "uuid-user",
  "document_id": "uuid-document"
}
```

---

## 8. Structured Logging & Analytics Pipelines

### 8.1 Structured Log Schema
All backend stdout logs use structured JSON layouts to simplify processing:
```json
{
  "timestamp": "2026-07-12T14:19:03Z",
  "level": "INFO",
  "request_id": "uuid-request-trace",
  "user_id": "uuid-user-identity",
  "path": "/api/v1/quizzes/generate",
  "execution_time_ms": 320,
  "message": "AI quiz generated successfully"
}
```
*   **Event Pipeline:** Clickstream activities (quiz completions, clicks, uploads) are forwarded to a message queue and processed by workers to update analytics tables.
