# Production Deployment & DevOps Engineering Manual

This manual specifies the deployment architecture, configuration keys, and final security checklist for **Tejas (AI Learning OS)** in production.

---

## 1. Deployment Architecture

```mermaid
graph TD
    User([User Client]) --> CDN[Cloudflare CDN / DNS]
    CDN --> Front[Vercel Client Apps]
    CDN --> ALB[AWS Application Load Balancer]
    ALB --> ECS_Backend[AWS ECS Fargate: Express Backend]
    ALB --> ECS_AI[AWS ECS Fargate: FastAPI AI Service]
    ECS_Backend --> Redis[(AWS ElastiCache: Redis)]
    ECS_AI --> Queue[AWS MQ: RabbitMQ]
    ECS_Backend --> DB[(AWS RDS Aurora: PostgreSQL)]
    ECS_AI --> Vector[(Pinecone Vector DB)]
```

### Infrastructure Components
*   **Frontend client:** Vercel (Auto-scaled Edge Network).
*   **Express backend & AI microservices:** AWS ECS (Fargate) under Application Load Balancers.
*   **Primary Database:** AWS RDS Aurora Serverless v2 PostgreSQL (Multi-AZ replication).
*   **Cache Store:** AWS ElastiCache for Redis Cluster (Session management, analytics query caches).
*   **Queue Coordinator:** Amazon MQ (RabbitMQ broker ingestion for PDF text parser workflows).

---

## 2. Environment Configuration Target Layout

```ini
# Core Configuration
NODE_ENV=production
PORT=3001
JWT_SECRET=super_secret_rotate_regularly_hash

# Databases
DATABASE_URL=postgresql://db_user:db_password@aurora-cluster.rds.amazonaws.com:5432/tejas_prod?schema=public&sslmode=require
REDIS_URL=rediss://elasticache-redis.cache.amazonaws.com:6379

# AI Services
AI_SERVICE_URL=https://ai-service.tejas.internal
OPENAI_API_KEY=sk-proj-key
GEMINI_API_KEY=gemini-prod-key

# Queue Workers
RABBITMQ_URL=amqps://rabbitmq-broker.amazonaws.com:5671
```

---

## 3. Database Migration Strategy (Zero-Downtime)

1.  **Add Columns as Optional:** Never deploy structural DDL table migrations with required properties (`NOT NULL` columns) without defaults.
2.  **Deployment Handshake:**
    *   Step A: Deploy schema migration (`npx prisma migrate deploy` in post-build steps).
    *   Step B: Deploy updated backend service code.
    *   Step C: Run data backfill script if columns changed.
    *   Step D: Clean up old database fields.

---

## 4. Monitoring, Logging & Error Tracking

*   **Error Auditing:** Sentry integrated inside Next.js layouts, Express routers, and FastAPI handlers.
*   **Metrics Collection:** Prometheus agent scraping host stats, charting request latency graphs on Grafana panels.
*   **Logs Pipeline:** AWS CloudWatch log groups fetching stdout/stderr outputs from ECS containers.

---

## 5. Production Hardening Checklist

### 🔒 Security Check
*   [ ] **HTTPS Enforcement:** SSL/TLS A+ ratings using Cloudflare certificate edge rules.
*   [ ] **Rate Limiting:** IP rate limit guards configured in Express (`express-rate-limit`) restricting API endpoints to 100 requests per 15 minutes.
*   [ ] **Helmet Headers:** Headers protecting against X-Frame-Options clickjacking and X-Content-Type-Options injection.
*   [ ] **JWT Expiry:** Refresh token rotation model set to short-lived Access tokens (15m) and secure HttpOnly cookie Refresh tokens (7d).

### ⚡ Performance Check
*   [ ] **DB Indexing:** Composite index keys added to high-traffic columns (`UserQuizAttempt.completedAt` and `SpacedRepetitionCard.nextReviewDue`).
*   [ ] **Edge CDN Caching:** Static assets and syllabus trees cached on CDN edges.

### 📈 Scalability Check
*   [ ] **ECS Autoscale:** Scale-out containers triggered automatically when CPU usage exceeds 70%.
*   [ ] **Connection Pools:** Prisma connection limit scaled using database pooling parameters (`pgbouncer` setup).
