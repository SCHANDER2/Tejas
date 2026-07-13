import os
import json
import logging
from openai import OpenAI
import google.generativeai as genai

logger = logging.getLogger(__name__)

class RecommendationEngine:
    def generate(self, weak_concepts: list, current_mastery: dict) -> dict:
        """
        Recommends next study steps, resources, and revision timing based on weakness parameters.
        Calls Google Gemini or OpenAI API to customize recommendations, with heuristic fallback.
        """
        if not weak_concepts or weak_concepts == ["None detected"]:
            return self._generate_fallback(weak_concepts, current_mastery)

        # Try Gemini
        gemini_key = os.getenv("GEMINI_API_KEY")
        if gemini_key:
            try:
                genai.configure(api_key=gemini_key)
                model = genai.GenerativeModel("gemini-1.5-flash")
                prompt = self._build_prompt(weak_concepts, current_mastery)
                response = model.generate_content(
                    prompt,
                    generation_config={"response_mime_type": "application/json"}
                )
                if response.text:
                    parsed = json.loads(response.text)
                    logger.info("Successfully generated recommendations via Gemini.")
                    return parsed
            except Exception as e:
                logger.warning(f"Gemini recommendations generation failed: {str(e)}. Trying OpenAI...")

        # Try OpenAI
        openai_key = os.getenv("OPENAI_API_KEY")
        if openai_key:
            try:
                client = OpenAI(api_key=openai_key)
                prompt = self._build_prompt(weak_concepts, current_mastery)
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    response_format={"type": "json_object"},
                    messages=[
                        {"role": "system", "content": "You are a professional educational recommender system. You output only valid JSON matching the requested schema."},
                        {"role": "user", "content": prompt}
                    ]
                )
                res_text = response.choices[0].message.content
                if res_text:
                    parsed = json.loads(res_text)
                    logger.info("Successfully generated recommendations via OpenAI.")
                    return parsed
            except Exception as e:
                logger.warning(f"OpenAI recommendations generation failed: {str(e)}.")

        logger.info("Falling back to local heuristic recommendations.")
        return self._generate_fallback(weak_concepts, current_mastery)

    def _build_prompt(self, weak_concepts: list, current_mastery: dict) -> str:
        mastery_str = ", ".join([f"{concept}: {current_mastery.get(concept, 0.50)*100:.0f}%" for concept in weak_concepts])
        return f"""
Generate personalized study recommendations and next steps for a student struggling with the following weak concepts:
Concept Mastery baseline stats: {mastery_str}

Provide recommendations matching the exact JSON schema below.

JSON Schema:
{{
  "recommendations": [
    {{
      "concept": "Concept name from the list",
      "next_topic_suggestion": "A specific subtopic or concept that the student should study next",
      "recommended_practice_material": "Specific reference to a practice set or material they should attempt",
      "scheduled_revision_timing": "Suggested timeline, e.g., 'In 2 days', based on their low mastery"
    }},
    ...
  ]
}}
"""

    def _generate_fallback(self, weak_concepts: list, current_mastery: dict) -> dict:
        recommendations = []
        
        for idx, concept in enumerate(weak_concepts):
            if concept == "None detected":
                continue
            mastery = current_mastery.get(concept, 0.50)
            
            # revision timing calculation based on mastery level
            # lower mastery -> sooner revision
            days_until_revision = max(1, int(mastery * 7))
            
            recommendations.append({
                "concept": concept,
                "next_topic_suggestion": f"Deep dive: Advanced subtopics of {concept}",
                "recommended_practice_material": f"Interactive MCQ Deck: {concept} Mastery Prep",
                "scheduled_revision_timing": f"In {days_until_revision} days"
            })

        if not recommendations:
            return {
                "recommendations": [{
                    "concept": "General Syllabus Review",
                    "next_topic_suggestion": "Proceed with the next item on your exam timeline",
                    "recommended_practice_material": "Comprehensive Full-length Mock Test",
                    "scheduled_revision_timing": "In 7 days"
                }]
            }

        return {
            "recommendations": recommendations
        }
