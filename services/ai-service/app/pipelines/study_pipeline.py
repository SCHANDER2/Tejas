import os
import json
import logging
from openai import OpenAI
import google.generativeai as genai

logger = logging.getLogger(__name__)

class StudyPlanner:
    def generate(self, exam: str, hours: int, current_level: float, target_score: float) -> dict:
        """
        Calculates study roadmaps mapping targets against available time capacity.
        Calls Google Gemini or OpenAI API to customize daily/weekly milestones, with mathematical fallback.
        """
        # Try Gemini
        gemini_key = os.getenv("GEMINI_API_KEY")
        if gemini_key:
            try:
                genai.configure(api_key=gemini_key)
                model = genai.GenerativeModel("gemini-1.5-flash")
                prompt = self._build_prompt(exam, hours, current_level, target_score)
                response = model.generate_content(
                    prompt,
                    generation_config={"response_mime_type": "application/json"}
                )
                if response.text:
                    parsed = json.loads(response.text)
                    logger.info("Successfully generated study plan via Gemini.")
                    return parsed
            except Exception as e:
                logger.warning(f"Gemini study plan generation failed: {str(e)}. Trying OpenAI...")

        # Try OpenAI
        openai_key = os.getenv("OPENAI_API_KEY")
        if openai_key:
            try:
                client = OpenAI(api_key=openai_key)
                prompt = self._build_prompt(exam, hours, current_level, target_score)
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    response_format={"type": "json_object"},
                    messages=[
                        {"role": "system", "content": "You are a professional educational planner. You output only valid JSON matching the requested schema."},
                        {"role": "user", "content": prompt}
                    ]
                )
                res_text = response.choices[0].message.content
                if res_text:
                    parsed = json.loads(res_text)
                    logger.info("Successfully generated study plan via OpenAI.")
                    return parsed
            except Exception as e:
                logger.warning(f"OpenAI study plan generation failed: {str(e)}.")

        logger.info("Falling back to local mathematical study planner.")
        return self._generate_fallback(exam, hours, current_level, target_score)

    def _build_prompt(self, exam: str, hours: int, current_level: float, target_score: float) -> str:
        return f"""
Create a comprehensive study roadmap for the '{exam}' examination.
Details:
- Total hours available: {hours} hours
- Student's current mastery level: {current_level * 100}%
- Student's target score level: {target_score * 100}%

Provide the study plan structure matching the exact JSON schema below.

JSON Schema:
{{
  "target_exam": "{exam}",
  "allocated_hours": {{
    "total": {hours},
    "content_learning": (hours allocated for reading/lectures),
    "quizzes_practice": (hours allocated for practicing quizzes/tests),
    "revision": (hours allocated for revisions/spaced recall)
  }},
  "milestones": [
    {{
      "phase": "Phase title",
      "allocated_hours": (hours for this phase),
      "description": "Specific objectives and recommendations for this phase"
    }},
    ... (usually 3 phases)
  ],
  "daily_pace_topics": (recommended number of topics to complete daily, e.g. 1.8)
}}
"""

    def _generate_fallback(self, exam: str, hours: int, current_level: float, target_score: float) -> dict:
        content_hours = int(hours * 0.50)
        practice_hours = int(hours * 0.35)
        revision_hours = int(hours * 0.15)

        velocity_multiplier = 1.0 + (target_score - current_level)
        recommended_daily_pace = round(1.5 * velocity_multiplier, 1)

        milestones = [
          {"phase": "1. Content Acquisition", "allocated_hours": content_hours, "description": "Core syllabus mapping lectures"},
          {"phase": "2. Active recall practice", "allocated_hours": practice_hours, "description": "Dynamic quizzes and mocks attempts"},
          {"phase": "3. Spaced revision vaults", "allocated_hours": revision_hours, "description": "FSRS review cycles focusing on critical weak spots"}
        ]

        return {
            "target_exam": exam,
            "allocated_hours": {
                "total": hours,
                "content_learning": content_hours,
                "quizzes_practice": practice_hours,
                "revision": revision_hours
            },
            "milestones": milestones,
            "daily_pace_topics": recommended_daily_pace
        }
