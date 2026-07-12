# Tejas — Backend Architecture Specification

This document provides the complete backend technical specifications for **Tejas**, detailing the database models, API signatures, authentication protocols, background worker jobs, and security configurations.

---

## 1. Database DDL & Schema Design

The relational database uses **PostgreSQL** with the `uuid-ossp` extension for primary keys. High-scale metrics use partitioning.

```
+------------------+         +-------------------+         +---------------------+
|      users       |         |   user_profiles   |         |    subscriptions    |
|------------------|         |-------------------|         |---------------------|
| PK id (UUID)     |<--------| FK user_id (UUID) |         | PK id (UUID)        |
| email (VARCHAR)  |         |                   |         | FK user_id (UUID) --+
+------------------+         +-------------------+         +---------------------+
       |
       |     +-------------------------+
       |     |  user_exam_enrollments  |
       +---->| FK user_id (UUID)       |
             | FK exam_id (UUID) ------+
             +-------------------------+
                          |
                          v
             +-------------------------+         +------------------------+
             |          exams          |         |   syllabus_hierarchy   |
             |-------------------------|         |------------------------|
             | PK id (UUID)            |<--------| FK exam_id (UUID)      |
             +-------------------------+         | FK parent_node_id ----+
                                                 +------------------------+
```

### 1.1 Table DDL Specifications

```sql
-- Core Table: Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255), -- Nullable for OAuth accounts
    role VARCHAR(50) NOT NULL DEFAULT 'free_learner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Core Table: User Profiles
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    daily_study_goal_minutes INTEGER NOT NULL DEFAULT 60,
    preferred_language VARCHAR(10) NOT NULL DEFAULT 'en',
    CONSTRAINT chk_daily_goal CHECK (daily_study_goal_minutes > 0)
);

-- Core Table: Exams
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL UNIQUE,
    conducting_body VARCHAR(100) NOT NULL,
    current_version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Core Table: Syllabus Hierarchy (Tree)
CREATE TABLE syllabus_hierarchy (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    parent_node_id UUID REFERENCES syllabus_hierarchy(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    weightage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    depth_level INT NOT NULL,
    CONSTRAINT chk_weightage CHECK (weightage >= 0.00 AND weightage <= 100.00)
);

-- Core Table: User Exam Enrollments
CREATE TABLE user_exam_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_exam UNIQUE (user_id, exam_id)
);

-- Core Table: Uploaded Sources
CREATE TABLE uploaded_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    source_type VARCHAR(20) NOT NULL, -- 'pdf', 'youtube_url', 'text'
    file_url VARCHAR(512),
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'processing', 'completed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Core Table: Quizzes
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    source_id UUID, -- References syllabus_hierarchy or uploaded_sources
    source_type VARCHAR(50) NOT NULL, -- 'syllabus_topic', 'uploaded_document'
    difficulty VARCHAR(20) NOT NULL, -- 'easy', 'medium', 'hard'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Core Table: Questions
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL, -- 'mcq', 'true_false'
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Core Table: Options
CREATE TABLE options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

-- Core Table: Quiz Attempt Log
CREATE TABLE user_quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score NUMERIC(5, 2) NOT NULL,
    time_taken_seconds INT NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Core Table: Question Responses
CREATE TABLE user_question_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES user_quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    selected_option_id UUID REFERENCES options(id) ON DELETE SET NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

-- Core Table: Spaced Repetition Cards (FSRS Scheduler)
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

-- Core Table: Subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_type VARCHAR(50) NOT NULL, -- 'free', 'premium_basic', 'elite'
    status VARCHAR(30) NOT NULL, -- 'active', 'cancelled', 'expired'
    billing_start TIMESTAMP WITH TIME ZONE NOT NULL,
    billing_end TIMESTAMP WITH TIME ZONE NOT NULL
);
```

### 1.2 Indexes for Scalability
To guarantee sub-second performance across millions of rows, we define indexes for common query pathways:

```sql
-- Optimize user email lookups during auth
CREATE INDEX idx_users_email ON users(email);

-- Optimize nested syllabus retrieval
CREATE INDEX idx_syllabus_parent ON syllabus_hierarchy(parent_node_id);
CREATE INDEX idx_syllabus_exam ON syllabus_hierarchy(exam_id);

-- Optimize study plans lookup
CREATE INDEX idx_user_enrollments_primary ON user_exam_enrollments(user_id) WHERE is_primary = TRUE;

-- Optimize spaced repetition due card queue lookups
CREATE INDEX idx_spaced_cards_due ON spaced_repetition_cards(user_id, next_review_due);

-- Optimize user quiz attempt queries for performance metrics
CREATE INDEX idx_quiz_attempts_user_date ON user_quiz_attempts(user_id, completed_at DESC);
```

---

## 2. API Contract Specification

All endpoints validate input payloads using standard JSON schemas.

### 2.1 Endpoint Definitions

#### `POST /api/v1/auth/signup`
*   **Request Schema Validation:**
```json
{
  "type": "object",
  "properties": {
    "email": { "type": "string", "format": "email" },
    "password": { "type": "string", "minLength": 8 }
  },
  "required": ["email", "password"]
}
```
*   **Response Codes:** `201 Created` (with token), `409 Conflict` (email already exists).

#### `POST /api/v1/quizzes/generate`
*   **Authentication Required:** Yes.
*   **Request Schema Validation:**
```json
{
  "type": "object",
  "properties": {
    "source_id": { "type": "string", "format": "uuid" },
    "source_type": { "type": "string", "enum": ["syllabus_topic", "uploaded_document"] },
    "difficulty": { "type": "string", "enum": ["easy", "medium", "hard"] },
    "question_count": { "type": "integer", "minimum": 5, "maximum": 20 }
  },
  "required": ["source_id", "source_type", "difficulty", "question_count"]
}
```
*   **Response Codes:** `200 OK` (Quiz and Questions JSON layout), `402 Payment Required` (Token limit exceeded).

#### `POST /api/v1/quizzes/:id/submit`
*   **Authentication Required:** Yes.
*   **Request Schema Validation:**
```json
{
  "type": "object",
  "properties": {
    "started_at": { "type": "string", "format": "date-time" },
    "responses": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "question_id": { "type": "string", "format": "uuid" },
          "selected_option_id": { "type": "string", "format": "uuid" }
        },
        "required": ["question_id", "selected_option_id"]
      }
    }
  },
  "required": ["started_at", "responses"]
}
```
*   **Response Codes:** `200 OK` (Evaluation summary and mastery update notifications), `400 Bad Request`.

---

## 3. Security, Authentication & Authorization

### 3.1 JWT Architecture
*   **Token Handshake:** Uses RS256 signing keys. Key rotation is automated every 14 days using standard JWKS endpoints.
*   **Token Payloads:**
```json
{
  "sub": "uuid-user-identity-hash",
  "email": "user@domain.com",
  "role": "premium_learner",
  "exp": 1782390800
}
```

### 3.2 Authorization Checks (RBAC Guard)
All endpoints pass through a role-based access controller:
```
[ Incoming Request ] ──► [ JWT Decryption ] ──► [ Role Extracted ]
                                                       │
                                                       ▼
                                              [ Check RBAC Policy ]
                                                       │
                                   ┌───────────────────┴───────────────────┐
                                   ▼                                       ▼
                             [ Role Valid ]                         [ Role Invalid ]
                                   │                                       │
                                   ▼                                       ▼
                           [ Proceed to API ]                        [ Return 403 ]
```

---

## 4. Background Workers (Queue Specifications)

We use **RabbitMQ** to manage background tasks.

### 4.1 Ingestion Job Message Schema
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

### 4.2 Ingestion Pipeline Worker Steps
1.  **Parse File:** Parses PDF layout structures and extracts text.
2.  **Generate Chunks:** Splits text into 1000-token semantic chunks.
3.  **Embed Chunks:** Generates embeddings using `text-embedding-3-small`.
4.  **Save to Vector DB:** Saves vectors to Pinecone under the user's namespace.
5.  **Notify User:** Dispatches a WebSocket message to the client indicating completion.

---

## 5. Performance, Cache & Scaling Architecture

```
                 [ Cache Miss: Query Database ]
                               ▲
                               │
[ Client Request ] ──► [ Check Redis Cache ] ──► [ Cache Hit: Return Cached Response ]
```

### 5.1 Caching Strategy
*   **Syllabus Nodes:** Cached permanently with keys matching `syllabus:{exam_id}`. Invalidated only when `exams.current_version` increments.
*   **Analytics Dashboards:** Cached for 5 minutes with keys matching `analytics:user:{user_id}`.

### 5.2 Pinecone Index Configuration
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

## 6. Structured Logging & Analytics Pipelines

### 6.1 Structured Log Schema
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
