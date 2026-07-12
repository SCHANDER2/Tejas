# Tejas — Modular Functional Design & System Specification

This specification provides the detailed functional, logical, and database architectures for the 10 core modules of the Tejas platform.

---

## Module 1: Exam Engine

### 1.1 Purpose
Manages the lookup, selection, and mapping of public examinations in India (e.g., UPSC CSE, SSC CGL, JEE, NEET, GATE). It structures official syllabus data into a nested hierarchy and provides timeline roadmaps.

### 1.2 User Journey
1.  **Search & Selection:** User navigates to Exam Explorer, searches for "UPSC", and selects the target year.
2.  **Syllabus Review:** Inspects the interactive subject tree showing weightage per topic.
3.  **Roadmap Alignment:** Enrolls in the exam, generating preparation milestone goals.
4.  **Resource Download:** Downloads official past year question papers (PYQs).

### 1.3 UI Components
*   `ExamSearchFilter`: Dropdown categorization (National, State, Engineering, Medical, Banking).
*   `SyllabusTreeView`: Collapsible nesting nodes (Stage $\rightarrow$ Subject $\rightarrow$ Topic $\rightarrow$ Sub-topic).
*   `MilestoneTimeline`: Linear chart displaying upcoming calendar dates mapped to syllabus completion metrics.
*   `PYQPanel`: List of download links grouped by year and topic filters.

### 1.4 States
*   `Unenrolled`: Displays a call-to-action button to enroll.
*   `LoadingSyllabus`: Renders animated tree skeleton placeholders.
*   `ActiveEnrollment`: Shows current progress percentage against overall roadmaps.
*   `OutOfDateSyllabus`: Notifies user if the system detected changes in the official syllabus schema.

### 1.5 Backend Logic
*   **Hierarchy Resolution:** Fetches syllabus hierarchies using adjacency list database models (recursive CTE queries).
*   **Progress Tracking:** Tracks completed syllabus nodes to calculate active preparation percentages.
*   **PYQ Storage:** Generates presigned URLs from Object Storage (S3) for secure paper downloading.

### 1.6 AI Logic
*   **Syllabus Parsing Pipeline:** Uses an LLM to parse raw official syllabus text/PDFs, outputting structured JSON matches conforming to the hierarchical database schema.
*   **Roadmap Generation:** Maps exam syllabus weightage to target exam dates using heuristic distribution algorithms.

### 1.7 Edge Cases
*   **Syllabus Updates mid-prep:** Handled by creating system versions of the syllabus nodes. Active plans remain on the old version with prompts to migrate.
*   **Multiple Primary Exams:** User can only designate one primary exam. Others are set as secondary and integrated with secondary planner priorities.

### 1.8 Required APIs
*   `GET /api/v1/exams`
*   `GET /api/v1/exams/:id/syllabus`
*   `POST /api/v1/exams/enroll`

### 1.9 Required Database Tables
#### `exams`
*   `id` (UUID, Primary Key)
*   `name` (VARCHAR, Unique)
*   `conducting_body` (VARCHAR)
*   `current_syllabus_version` (INTEGER)

#### `syllabus_hierarchy`
*   `id` (UUID, Primary Key)
*   `exam_id` (UUID, Foreign Key $\rightarrow$ `exams.id`)
*   `parent_node_id` (UUID, Self-referential FK)
*   `title` (VARCHAR)
*   `weightage` (NUMERIC)

#### `user_exam_enrollments`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key $\rightarrow$ `users.id`)
*   `exam_id` (UUID, Foreign Key $\rightarrow$ `exams.id`)
*   `is_primary` (BOOLEAN)
*   `enrolled_at` (TIMESTAMP)

### 1.10 Future Improvements
*   Integration of state-level exam notifications scraped automatically from government websites.

---

## Module 2: Academic Learning Engine

### 2.1 Purpose
Manages learning content outside of standardized examinations, mapping textbook chapters, university courses, uploaded lecture notes, and YouTube playlists into conceptual networks.

### 2.2 User Journey
1.  **Subject Setup:** User creates a custom subject (e.g., "Advanced Algorithms").
2.  **Resource Ingestion:** Uploads a course handbook PDF and drops a YouTube playlist link.
3.  **Structure Extraction:** System processes files and renders concept summaries.
4.  **Concept Browsing:** User selects a concept node to view related notes and source citations.

### 2.3 UI Components
*   `SubjectWorkspace`: Panel displaying active ingested sources.
*   `IngestionModal`: File drag-and-drop zone and input fields for video URLs.
*   `ConceptGraphView`: Network diagram representing the links between chapters and concepts.
*   `ReadingPanel`: Interactive split-screen reader for documents and summaries.

### 2.4 States
*   `IdleSubject`: Empty state prompting file uploads.
*   `IngestProcessing`: Disables upload buttons and displays progress bar status.
*   `FailureState`: Renders file error warnings (e.g., "Unsupported PDF layout").

### 2.5 Backend Logic
*   **File Parser Dispatcher:** Routes files to PDF text extraction or YouTube metadata fetching engines.
*   **Text Chunking:** Splits documents into 1000-token semantic chunks with overlap.
*   **Vectorization Queue:** Asynchronously pushes chunks to embedding generation jobs via workers.

### 2.6 AI Logic
*   **Concept Linker:** Prompts an LLM to scan document summaries and define logical prerequisite connections (e.g., "Topic A must be studied before Topic B").
*   **Chunk Summarizer:** Generates bulleted summaries and extracts key definitions.

### 2.7 Edge Cases
*   **Scanned Image PDFs:** Triggers an OCR engine (Tesseract/Azure Form Recognizer integration) automatically if text character count is below a 500-character threshold.
*   **YouTube Captions Disabled:** Auto-transcribes audio chunks via Whisper API.

### 2.8 Required APIs
*   `POST /api/v1/academic/subjects`
*   `POST /api/v1/academic/upload`
*   `GET /api/v1/academic/graph/:subject_id`

### 2.9 Required Database Tables
#### `academic_subjects`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key $\rightarrow$ `users.id`)
*   `name` (VARCHAR)

#### `uploaded_sources`
*   `id` (UUID, Primary Key)
*   `subject_id` (UUID, Foreign key $\rightarrow$ `academic_subjects.id`)
*   `source_type` (VARCHAR, 'pdf', 'youtube_url')
*   `file_url` (VARCHAR)
*   `status` (VARCHAR, 'processing', 'completed', 'failed')

#### `concept_nodes`
*   `id` (UUID, Primary Key)
*   `subject_id` (UUID, Foreign key $\rightarrow$ `academic_subjects.id`)
*   `title` (VARCHAR)
*   `summary` (TEXT)

#### `concept_relations`
*   `parent_concept_id` (UUID, Foreign Key $\rightarrow$ `concept_nodes.id`)
*   `child_concept_id` (UUID, Foreign Key $\rightarrow$ `concept_nodes.id`)
*   PRIMARY KEY (`parent_concept_id`, `child_concept_id`)

### 2.10 Future Improvements
*   Browser extension to clip web articles directly into the Academic Learning Engine.

---

## Module 3: Instant Quiz Generator

### 3.1 Purpose
Dynamically creates practice question sets from specific topics, files, or user inputs, verifying active recall and giving step-by-step correction explanations.

### 3.2 User Journey
1.  **Configuration:** User selects a subtopic or document, sets difficulty to "Medium", and size to 10.
2.  **Attempt:** Renders active question panel, timer tracks progress.
3.  **Submission:** Submits responses, system score calculates immediately.
4.  **Review:** Expands answer review card to read step-by-step corrections.

### 3.3 UI Components
*   `QuizConfigurator`: Select inputs for subject, source, number of questions, and difficulty.
*   `ActiveQuizPanel`: Renders text prompts, radio buttons, and navigation controls.
*   `ResultDashboard`: Metric display showing accuracy, average speed, and confidence scores.
*   `ExplanationCard`: Renders selected options alongside AI analysis logic.

### 3.4 States
*   `Generating`: Dynamic loading messages showing question generation stages.
*   `Answering`: Active quiz session, locking sidebar navigation actions.
*   `Submitted`: Static review layout highlighting correctness.

### 3.5 Backend Logic
*   **Evaluation Engine:** Scores attempts and logs correct status per response.
*   **Analytics Trigger:** Pushes attempt logs to analytics calculators asynchronously.

### 3.6 AI Logic
*   **Dynamic RAG Quiz Prompt:** Gathers related semantic context chunks, dynamically constructing an LLM prompt that enforces JSON question output constraints.
*   **Explanation Generation:** Produces contextual arguments explaining why wrong options are incorrect based on the user selection.

### 3.7 Edge Cases
*   **LLM Hallucinations:** Validation script verifies that only options present in the JSON response payload are set as answers. If invalid, the system requests a retry.
*   **Premature Disconnect:** Saves active quiz state in Redis. The user can resume progress within a 1-hour window.

### 3.8 Required APIs
*   `POST /api/v1/quizzes/generate`
*   `POST /api/v1/quizzes/submit`

### 3.9 Required Database Tables
#### `quizzes`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key $\rightarrow$ `users.id`)
*   `difficulty` (VARCHAR)
*   `created_at` (TIMESTAMP)

#### `questions`
*   `id` (UUID, Primary Key)
*   `quiz_id` (UUID, Foreign Key $\rightarrow$ `quizzes.id`)
*   `question_text` (TEXT)
*   `explanation` (TEXT)

#### `options`
*   `id` (UUID, Primary key)
*   `question_id` (UUID, Foreign Key $\rightarrow$ `questions.id`)
*   `option_text` (TEXT)
*   `is_correct` (BOOLEAN)

#### `user_quiz_attempts`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key $\rightarrow$ `users.id`)
*   `quiz_id` (UUID, Foreign Key $\rightarrow$ `quizzes.id`)
*   `score` (NUMERIC)
*   `time_taken_seconds` (INTEGER)

### 3.10 Future Improvements
*   Adaptive sizing: The system extends the quiz automatically if concept confidence scores remain borderline.

---

## Module 4: AI Study Planner

### 4.1 Purpose
Algorithmic layout engine mapping exam dates and daily budgets to generate a customized calendar sequence. It rebalances timelines automatically when days are missed.

### 4.2 User Journey
1.  **Preference Setup:** User enters profile preferences (exam, daily budget, target completion dates).
2.  **Timeline Generation:** System structures a milestone map spanning the exam preparation window.
3.  **Progress Log:** User logs study tasks daily.
4.  **Automatic Rescheduling:** If tasks are skipped, the planner shifts nodes to open slots.

### 4.3 UI Components
*   `PlannerConfigForm`: Sliders adjusting daily hour capacities.
*   `WeeklyTaskView`: Calendar grid mapping topics to hour blocks.
*   `RebalanceWidget`: Notification window informing users about plan adjustments.

### 4.4 States
*   `CalculatingPlan`: Dynamic progress tracker for planner generations.
*   `Optimized`: Active plan layout on track with milestone dates.
*   `BehindSchedule`: Prompts a warning alert to trigger rescheduling.

### 4.5 Backend Logic
*   **Plan Generation Algorithm:** Distributes topics across available study days based on topic weightage and user mastery.
*   **Rescheduling Core:** Identifies incomplete task nodes and shifts them forward, scaling daily hours dynamically if target dates are static.

### 4.6 AI Logic
*   **Personalization Modeler:** Prompts LLM to adjust plan intensity, inserting additional revision gaps for concepts flagged as critical by the Analytics Engine.

### 4.7 Edge Cases
*   **Unreasonable Targets:** If a user requests a UPSC roadmap in 10 days, the engine rejects the setup and suggests extended timelines.
*   **Frequent Rescheduling Loops:** Limits automatic rebalancing to once per week, prompting human review suggestions thereafter.

### 4.8 Required APIs
*   `POST /api/v1/planner/create`
*   `POST /api/v1/planner/rebalance`
*   `GET /api/v1/planner/tasks`

### 4.9 Required Database Tables
#### `study_plans`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key $\rightarrow$ `users.id`)
*   `target_date` (DATE)
*   `daily_hours` (INTEGER)

#### `study_tasks`
*   `id` (UUID, Primary Key)
*   `plan_id` (UUID, Foreign Key $\rightarrow$ `study_plans.id`)
*   `topic_id` (UUID, Foreign Key $\rightarrow$ `syllabus_hierarchy.id`)
*   `scheduled_date` (DATE)
*   `is_completed` (BOOLEAN)

### 4.10 Future Improvements
*   Slack/WhatsApp notification integrations daily summarizing upcoming planner tasks.

---

## Module 5: Schedule

### 5.1 Purpose
Visual time-blocking calendar interface that organizes study tasks, revision tasks, and mock exams, and resolves scheduling conflicts.

### 5.2 User Journey
1.  **View Schedule:** User opens the Schedule tab to see tasks mapped out as calendar time blocks.
2.  **Adjust Time Slots:** Drags a study task from 10:00 AM to 2:00 PM.
3.  **Conflict Alert:** System alerts user if they drag a task into an active mock test window.
4.  **Confirm Sync:** Checks the calendar dashboard to confirm planner tasks match.

### 5.3 UI Components
*   `WeeklyCalendarGrid`: Drag-and-drop calendar panel showing hour blocks.
*   `TaskPanel`: Sidebar containing unassigned schedule items.
*   `ConflictDialog`: Modal describing overlap warnings.

### 5.4 States
*   `Synchronized`: All scheduled tasks match planner milestones.
*   `ConflictState`: Highlights overlapping blocks.
*   `Updating`: API sync state when dragging blocks.

### 5.5 Backend Logic
*   **Overlap Validator:** Checks candidate schedule window ranges against existing events.
*   **Event Sync Broker:** Propagates manual schedule changes to the study planner database tables.

### 5.6 AI Logic
*   **Smart Slot Suggestion:** Recommends alternative time slots for tasks based on historical active study times.

### 5.7 Edge Cases
*   **Timezone Shifts:** Stores schedule dates in UTC and resolves conversion client-side.
*   **Recurring Event Collisions:** Auto-splits recurring study blocks if a mock exam is scheduled during a slot.

### 5.8 Required APIs
*   `GET /api/v1/schedule/events`
*   `PUT /api/v1/schedule/events/:id`

### 5.9 Required Database Tables
#### `schedule_events`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key $\rightarrow$ `users.id`)
*   `title` (VARCHAR)
*   `start_time` (TIMESTAMP)
*   `end_time` (TIMESTAMP)
*   `task_ref_id` (UUID, Nullable reference to `study_tasks.id`)

### 5.10 Future Improvements
*   Two-way external sync via standard Google Calendar APIs.

---

## Module 6: Analytics

### 6.1 Purpose
Aggregates user responses, active study times, and test scores to compute topic mastery levels and forecast exam readiness.

### 6.2 User Journey
1.  **View Dashboard:** User checks high-level accuracy, speed, and streak metrics.
2.  **Inspect Mastery Map:** Explores subject trees colored by concept strength.
3.  **Read AI Insights:** Reads text summaries analyzing why their score dropped.
4.  **Analyze Forecasts:** Reviews predicted exam rank benchmarks.

### 6.3 UI Components
*   `MetricsOverview`: Quick summary cards showing core stats.
*   `MasteryTreeMap`: Interactive block diagram mapping subject nodes by accuracy levels.
*   `SpeedAccuracyPlot`: Scatter plot highlighting speed vs. accuracy.
*   `AIInsightBox`: Text display rendering contextual feedback.

### 6.4 States
*   `NoData`: Standard display for new users.
*   `Ready`: Loaded analytics charts.
*   `CalculatingMetrics`: Temporary loading states during bulk computations.

### 6.5 Backend Logic
*   **Metrics Calculator:** Computes correctness ratios, time-taken averages, and concept mastery levels periodically.
*   **Percentile Modeler:** Runs relative ranking comparisons against other users in the database.

### 6.6 AI Logic
*   **Insight Generator:** Compiles mastery metrics and profiles, formatting an LLM prompt that outputs personalized text advice.

### 6.7 Edge Cases
*   **Outlier Times:** Filters out question attempts where the time taken exceeds 10 minutes to prevent skewing average speed metrics.
*   **New Topic Bias:** Baseline metrics are initialized at 0% until 3 attempts are registered to avoid false mastery readings.

### 6.8 Required APIs
*   `GET /api/v1/analytics/dashboard`
*   `GET /api/v1/analytics/insights`

### 6.9 Required Database Tables
#### `user_concept_mastery`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key $\rightarrow$ `users.id`)
*   `topic_id` (UUID, Foreign Key $\rightarrow$ `syllabus_hierarchy.id`)
*   `mastery_score` (NUMERIC)
*   `attempts_count` (INTEGER)

#### `learner_analytics_snapshots`
*   `id` (UUID, Primary key)
*   `user_id` (UUID, Foreign key $\rightarrow$ `users.id`)
*   `snapshot_date` (DATE)
*   `overall_accuracy` (NUMERIC)

### 6.10 Future Improvements
*   Detailed skill graphs comparing performance to the top 10% of platform users.

---

## Module 7: Revision Engine

### 7.1 Purpose
Calculates spaced repetition review intervals for weak topics and incorrect answers using adaptive memory algorithms.

### 7.2 User Journey
1.  **Flagging Incorrects:** Quiz engine flags incorrect answers and generates revision flashcards.
2.  **Accessing Queue:** User checks the Revision tab and views pending cards.
3.  **Reviewing Cards:** Flips a card, rates memory recall quality.
4.  **Scheduling Next Run:** System calculates next review date.

### 7.3 UI Components
*   `FlashcardConsole`: Cards with flip transition animations and feedback buttons.
*   `DueCounter`: Simple badge counting due cards.
*   `RevisionStats`: Renders memory retention curve graphs.

### 7.4 States
*   `NoCards`: Display shown when the queue is clear.
*   `ReviewActive`: Session layout rendering active recall cards.
*   `DeckConfig`: Options to limit maximum daily cards.

### 7.5 Backend Logic
*   **FSRS Calculator:** Implements the Free Spaced Repetition Scheduler algorithm:
$$\text{Next Interval} = f(\text{Difficulty}, \text{Stability}, \text{Grade})$$
*   **Queue Aggregator:** Pulls card IDs where `next_review_due` is less than or equal to the current timestamp.

### 7.6 AI Logic
*   **QA Card Generator:** Parses document summaries to auto-generate conceptual flashcards (Question on Front, Answer on Back).

### 7.7 Edge Cases
*   **Queue Backlogs:** If a user returns after a month, the system caps daily card reviews at 50 to prevent user fatigue, pushing the rest back.
*   **Ambiguous Feedback:** Defaults to "Easy" interval weights if the card is completed without selecting difficulty feedback.

### 7.8 Required APIs
*   `GET /api/v1/revision/cards`
*   `POST /api/v1/revision/cards/:id/review`

### 7.9 Required Database Tables
#### `spaced_repetition_cards`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign key $\rightarrow$ `users.id`)
*   `front_text` (TEXT)
*   `back_text` (TEXT)
*   `difficulty` (NUMERIC)
*   `stability` (NUMERIC)
*   `next_review_due` (TIMESTAMP)

### 7.10 Future Improvements
*   Variant prompts: Rephrasings generated at review time to test conceptual understanding rather than simple text memorization.

---

## Module 8: Mock Tests

### 8.1 Purpose
Provides a standardized testing environment for full-length examinations, enforcing time limits and strict testing conditions.

### 8.2 User Journey
1.  **Select Test:** User selects a mock exam from the Mock Test lounge.
2.  **Instruction Read:** Reviews rules, enters full-screen portal mode.
3.  **Testing:** Progresses through timed sections.
4.  **Submit & Score:** Submits test, views score reports.

### 8.3 UI Components
*   `ExamPortal`: Full-screen container locking navigation bars.
*   `QuestionPalette`: Grid representing question navigation status.
*   `ToolBox`: Scientific calculator, notepad, and flag tools.
*   `AnalyticsReport`: Post-mock score analysis and leaderboard.

### 8.4 States
*   `PreStart`: Renders rules and checks connection.
*   `ActiveMock`: Locks page controls and displays timer.
*   `PostSubmission`: Unlocks controls, shows score dashboards.

### 8.5 Backend Logic
*   **State Auto-saver:** Saves active responses to Redis every 30 seconds.
*   **Server Timer:** Checks completion timestamps to prevent client-side time manipulation.

### 8.6 AI Logic
*   **Test Blueprint Compiler:** Builds exam balanced test papers with specific question counts matching standard distributions.

### 8.7 Edge Cases
*   **Connection Drop:** Local storage caches responses. When connection returns, local answers sync back to Redis.
*   **cheating Alert:** Dispatches warning events if focus loss/tab change triggers are captured by the browser API.

### 8.8 Required APIs
*   `GET /api/v1/mocks`
*   `POST /api/v1/mocks/:id/start`
*   `POST /api/v1/mocks/:id/submit`

### 8.9 Required Database Tables
#### `mock_tests`
*   `id` (UUID, Primary Key)
*   `exam_id` (UUID, Foreign Key $\rightarrow$ `exams.id`)
*   `title` (VARCHAR)
*   `duration_minutes` (INTEGER)

#### `mock_questions`
*   `id` (UUID, Primary Key)
*   `mock_test_id` (UUID, Foreign Key $\rightarrow$ `mock_tests.id`)
*   `question_text` (TEXT)

#### `user_mock_attempts`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key $\rightarrow$ `users.id`)
*   `mock_test_id` (UUID, Foreign Key $\rightarrow$ `mock_tests.id`)
*   `score` (NUMERIC)
*   `time_taken_seconds` (INTEGER)

### 8.10 Future Improvements
*   Webcam proctoring: Integrates AI gaze tracking models to identify focus loss.

---

## Module 9: Research Paper Mode

### 9.1 Purpose
A reading layout optimized for scientific documents, featuring inline citation details and context-aware chat utilities.

### 9.2 User Journey
1.  **Ingestion:** User uploads a paper PDF.
2.  **Reading:** Reads paper in PDF viewer panel.
3.  **Citation Query:** Clicks a citation tag to read author details.
4.  **AI Q&A Chat:** Questions the chat panel about paper methodology details.

### 9.3 UI Components
*   `ResearchSplitWorkspace`: Split panel containing PDF reader and chat panel.
*   `CitationPopup`: Information card displaying details of cited works.
*   `EquationExplainer`: Utility card displaying mathematical definitions.

### 9.4 States
*   `ParsingLayout`: Processing structure models.
*   `ActiveRead`: Side-by-side reading layouts.
*   `QueryError`: Failure notice for unsupported citation references.

### 9.5 Backend Logic
*   **Layout Parser:** Parses multi-column document structures to extract text blocks.
*   **Citation Matcher:** Matches references with OpenAlex/Semantic Scholar indexes.

### 9.6 AI Logic
*   **Academic Chat Agent:** RAG system optimized for scientific terminology and methods.
*   **LaTeX Equation Translator:** Translates equations into standard explanation text.

### 9.7 Edge Cases
*   **Formula Extraction Failure:** If parser fails to translate formulas, the viewer renders the original PDF image region in the explanation box.
*   **Unlisted Citations:** Renders citation markers as unlinked plain text if external APIs fail to find matches.

### 9.8 Required APIs
*   `POST /api/v1/research/upload`
*   `POST /api/v1/research/chat`

### 9.9 Required Database Tables
#### `research_papers`
*   `id` (UUID, Primary key)
*   `user_id` (UUID, Foreign key $\rightarrow$ `users.id`)
*   `title` (VARCHAR)
*   `doi` (VARCHAR, Nullable)

#### `paper_annotations`
*   `id` (UUID, Primary key)
*   `paper_id` (UUID, Foreign key $\rightarrow$ `research_papers.id`)
*   `selection_text` (TEXT)
*   `comment` (TEXT)

### 9.10 Future Improvements
*   Cross-paper synthesis: Analyzes multiple uploaded papers to generate review summaries automatically.

---

## Module 10: Recommendations

### 10.1 Purpose
Suggests customized learning resources, practice sets, and mock papers based on gaps identified in analytics.

### 10.2 User Journey
1.  **Feed Review:** User browses recommended items on the home screen.
2.  **Targeted Practice:** Selects a resource recommendation (e.g. "Physics - Topic B video").
3.  **Skill Check:** System marks resource completed and schedules test check.

### 10.3 UI Components
*   `RecommendationFeed`: Row of cards displaying videos, articles, and mock exams.
*   `TopicGapAlert`: Warning card showing weak areas.
*   `SourceCard`: Resource preview thumbnail cards.

### 10.4 States
*   `EmptyFeed`: Fallback display for new users.
*   `Populated`: Active list of suggestions.

### 10.5 Backend Logic
*   **Resource Matcher:** Connects user weakness indexes to content items matching metadata tags.

### 10.6 AI Logic
*   **Content Matcher:** Matches learning resource vectors with user mastery profiles using cosine similarity.

### 10.7 Edge Cases
*   **Cold Start:** Recommends high-yield foundational topics for new profiles until attempt logs populate.
*   **Looping Recommendations:** Restricts suggesting the same resources repeatedly by applying decay factor values.

### 10.8 Required APIs
*   `GET /api/v1/recommendations`

### 10.9 Required Database Tables
#### `learning_resources`
*   `id` (UUID, Primary Key)
*   `topic_id` (UUID, Foreign Key $\rightarrow$ `syllabus_hierarchy.id`)
*   `title` (VARCHAR)
*   `type` (VARCHAR, 'video', 'article', 'practice_set')
*   `url` (VARCHAR)

#### `user_recommendation_clicks`
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key $\rightarrow$ `users.id`)
*   `resource_id` (UUID, Foreign key $\rightarrow$ `learning_resources.id`)
*   `action` (VARCHAR, 'viewed', 'completed')

### 10.10 Future Improvements
*   Real-time YouTube recommendation integrations dynamically mapped using custom channel identifiers.
