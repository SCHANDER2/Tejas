# Tejas — AI Layer Specification

This document provides the complete system architecture for the **Tejas AI Intelligence Layer**, outlining the processing steps, models, pipelines, and validation steps for the 9 core capabilities.

---

## 1. System Architecture Overview

```
                                [ AI Gateway ]
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
   [ Text & Ingestion ]      [ LLM Generation ]         [ Predictive Analytics ]
   - PDF Parse Engine        - Quiz Generator           - FSRS Revision Scheduler
   - Whisper Transcriber     - Study Planner Coordinator - Mastery Predictor
   - Embedding Generator     - RAG Context Integrator
            │                          │                          │
            └──────────────────────────┼──────────────────────────┘
                                       ▼
                       [ Vector DB / RAG Datastore ]
```

---

## 2. Capabilities Specifications

---

### Capability 1: Quiz Generation

#### Inputs
*   `source_text` (TEXT - Chunked context references).
*   `difficulty_level` (VARCHAR - 'easy', 'medium', 'hard').
*   `question_type` (VARCHAR - 'mcq', 'true_false').
*   `count` (INTEGER - 5 to 20).

#### Processing
1.  **Context Assembly:** Fetches matching context chunks using cosine similarity from the Vector DB.
2.  **Prompt Assembly:** Integrates system guidelines, difficulty constraints, and target schema.
3.  **Generation:** Submits the compiled prompt to the LLM.
4.  **Schema Check:** Validates structure matching the schema format.

#### AI Models
*   **Primary:** `gemini-1.5-flash` (Optimized for speed and structured JSON formats).
*   **Fallback:** `gemini-1.5-pro` (Used if generation attempts fail schema validation rules).

#### Outputs
*   JSON object matching the quiz schema:
```json
{
  "quizzes": [
    {
      "question_text": "string",
      "question_type": "mcq",
      "options": [
        { "option_text": "string", "is_correct": false }
      ],
      "explanation": "string"
    }
  ]
}
```

#### Failure Handling
*   **Parsing Error:** Triggers a retry prompt containing JSON validation errors returned by the parser.
*   **Validation Fail:** Falls back to generating a standardized baseline quiz pre-generated for the selected syllabus topic.

#### Confidence Validation
*   Ensures correct option counts match constraints (e.g. exactly 4 options for MCQs).
*   Validates that the correct answer is present in the text context.

#### Human Feedback Loop
*   Users can flag incorrect questions. Flagged questions are routed to a moderation queue where reviews can flag the item for exclusion.

---

### Capability 2: Study Plan Generation

#### Inputs
*   `target_exam_id` (UUID).
*   `exam_date` (DATE).
*   `daily_budget_hours` (INTEGER).
*   `user_mastery_vector` (JSON - Concept accuracy ratings).

#### Processing
1.  **Syllabus Analysis:** Fetches weightages for the target exam.
2.  **Hour Allocation:** Distributes hours proportionally across topics based on weightage.
3.  **Weak Area Adjustments:** Allocates extra time slots for topics flagged as weak.
4.  **Calendar Generation:** Iterates across dates to output daily study tasks.

#### AI Models
*   **Primary:** `gemini-1.5-pro` (Requires advanced reasoning capacity to structure study calendar timelines).

#### Outputs
*   An array of daily schedule objects:
```json
[
  {
    "scheduled_date": "2026-07-15",
    "tasks": [
      { "topic_id": "uuid-topic", "time_block_minutes": 120 }
    ]
  }
]
```

#### Failure Handling
*   If target limits are mathematically impossible, the model falls back to a template plan matching standard timelines, raising warnings.

#### Confidence Validation
*   Verifies that sum of daily hours matches the user's budget.
*   Validates that all core syllabus elements are scheduled.

#### Human Feedback Loop
*   Users can adjust individual task blocks manually. The system records adjustments to optimize future calendar generation preferences.

---

### Capability 3: Weak Topic Detection

#### Inputs
*   `user_id` (UUID).
*   `attempt_history` (ARRAY of responses grouped by subtopic).

#### Processing
1.  **Calculate Decay Accuracy:** Computes moving averages of response correctness over time.
2.  **Concept Link Mapping:** Traces downstream dependencies of weak topics.
3.  **Concept Classification:** Flags topics where accuracy drops below 50% as "Weak" or "Critical".

#### AI Models
*   Heuristic algorithms running over SQL databases, paired with `gemini-1.5-flash` for qualitative insight analysis.

#### Outputs
*   Structured concept mastery mappings and textual summary insights.

#### Failure Handling
*   If data points are below minimum thresholds, the system defaults status to "Moderate" and increases target questions for that topic.

#### Confidence Validation
*   Validates accuracy calculations against raw data logs to prevent mathematical drift.

#### Human Feedback Loop
*   Users can flag insights as helpful or unhelpful, which adjusts classification sensitivities.

---

### Capability 4: Personalized Recommendations

#### Inputs
*   `user_id` (UUID).
*   `weak_topics` (ARRAY of concept node IDs).
*   `available_resources` (Metadata index of video/article URLs).

#### Processing
1.  **Query Generation:** Compiles queries based on weak topics.
2.  **Vector Retrieval:** Retrieves matched resource chunks from Pinecone.
3.  **Rank Filtering:** Re-ranks items to match user format preferences.

#### AI Models
*   **Embeddings:** `text-embedding-3-small`.
*   **Re-ranking:** `gemini-1.5-flash`.

#### Outputs
*   Recommended resource items list.

#### Failure Handling
*   If retrieval yields empty results, the system suggests general study guide resources.

#### Confidence Validation
*   Checks recommended items against the user's completed history list to prevent duplicates.

#### Human Feedback Loop
*   Tracks click rates on recommendations to optimize ranking weights.

---

### Capability 5: Research Paper Understanding

#### Inputs
*   `pdf_bytes` (Document payload).
*   `user_queries` (TEXT - Chat interactions).

#### Processing
1.  **Layout Analysis:** Processes document structure to isolate sections.
2.  **Reference Extraction:** Extracts inline citations.
3.  **Context Match:** Queries vector indices to answer chat queries.

#### AI Models
*   `gemini-1.5-pro` (Large context window accommodates full-text document prompts).

#### Outputs
*   JSON summary notes and text answers with inline page references.

#### Failure Handling
*   If parsing fails, the viewer falls back to standard text extraction, disabling annotation popups.

#### Confidence Validation
*   Validates citations using Semantic Scholar API keys.

#### Human Feedback Loop
*   User edits to summaries help improve prompt formats.

---

### Capability 6: PDF Understanding

#### Inputs
*   `raw_pdf` (Binary data).

#### Processing
1.  **Page Extraction:** Generates images and text strings.
2.  **OCR Processing:** Runs OCR on images.
3.  **Hierarchy Detection:** Identifies headers to structure sections.

#### AI Models
*   **OCR:** Azure Form Recognizer / Tesseract.
*   **Structure Parsing:** `gemini-1.5-flash`.

#### Outputs
*   Structured markdown text stream.

#### Failure Handling
*   Falls back to plain text extraction if layout parsing fails.

#### Confidence Validation
*   Verifies extracted characters against dictionary words to identify corrupted text.

#### Human Feedback Loop
*   Users can report extraction errors, which flags documents for formatting review.

---

### Capability 7: YouTube Transcript Understanding

#### Inputs
*   `youtube_url` (STRING).

#### Processing
1.  **Transcript Fetch:** Retrieves captions from YouTube API.
2.  **Denoising:** Normalizes casing and removes filler words.
3.  **Segmentation:** Splits transcripts into semantic segments.

#### AI Models
*   **Whisper API** (Fallback audio transcription).
*   `gemini-1.5-flash` (Segmentation and summarization).

#### Outputs
*   JSON timeline maps:
```json
[
  { "timestamp": "02:15", "topic": "Photosynthesis Light Reactions", "summary": "string" }
]
```

#### Failure Handling
*   If transcripts are unavailable, the system runs Whisper transcription over audio slices.

#### Confidence Validation
*   Checks timestamps against video lengths to prevent duration mismatch.

#### Human Feedback Loop
*   Users can edit timeline topics, which helps refine summarization boundaries.

---

### Capability 8: Adaptive Revision

#### Inputs
*   `spaced_repetition_cards` (History vector).
*   `last_grade` (INTEGER - 1 to 4 rating).

#### Processing
1.  **FSRS Calculation:** Calculates intervals using response history and grade.
2.  **Priority Queue:** Inserts cards into daily study planner schedules.

#### AI Models
*   Free Spaced Repetition Scheduler (FSRS) mathematical engine.

#### Outputs
*   Updated card schedules and next review intervals.

#### Failure Handling
*   Defaults to one-day intervals if values are out of bounds.

#### Confidence Validation
*   Restricts interval updates to valid schedules (e.g. interval cannot decrease if grade is "Easy").

#### Human Feedback Loop
*   Users can adjust daily review queue caps.

---

### Capability 9: Learning Progress Prediction

#### Inputs
*   `user_concept_mastery` (Syllabus-wide metrics).
*   `cohort_performance` (Cohort score matrices).

#### Processing
1.  **Feature Extraction:** Compiles progress parameters.
2.  **Prediction Model:** Estimates potential scores on target exams.

#### AI Models
*   Random Forest / Gradient Boosting regression algorithms.

#### Outputs
*   Estimated score range and readiness indicators.

#### Failure Handling
*   Returns null indicators if data points are insufficient.

#### Confidence Validation
*   Compares predictions to actual mock scores to validate predictions.

#### Human Feedback Loop
*   Actual exam results entered by users help retrain prediction models.
