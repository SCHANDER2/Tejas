class RecommendationEngine:
    def generate(self, weak_concepts: list, current_mastery: dict) -> dict:
        """
        Recommends next study steps, resources, and revision timing based on weakness parameters.
        """
        recommendations = []
        
        for idx, concept in enumerate(weak_concepts):
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
