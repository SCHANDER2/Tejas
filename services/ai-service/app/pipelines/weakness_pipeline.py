class WeakAreaDetector:
    def analyze(self, incorrect_answers: list, response_times: list, topic_performance: dict) -> dict:
        """
        Analyzes performance history indicators to calculate conceptual weakness rankings.
        """
        weak_concepts = []
        priority_ranking = []
        recommendations = []

        # Find concepts with below 70% accuracy
        for topic, accuracy in topic_performance.items():
            if accuracy < 0.70:
                weak_concepts.append(topic)

        # Map response times to priority ranking (slow + incorrect = highest priority)
        avg_times = {item["topic"]: item["avg_seconds"] for item in response_times}
        
        # Sort weak concepts by high average response time (indicating cognitive load/struggle)
        sorted_weak = sorted(
            weak_concepts,
            key=lambda t: avg_times.get(t, 0.0),
            reverse=True
        )

        for idx, topic in enumerate(sorted_weak):
            priority = idx + 1
            priority_ranking.append({
                "concept": topic,
                "priority_rank": priority,
                "urgency": "High" if priority <= 2 else "Medium"
            })
            recommendations.append({
                "concept": topic,
                "recommendation": f"Review baseline reference materials and attempt 10 targeted micro-quizzes for {topic}."
            })

        # Failure boundary fallback
        if not weak_concepts:
            return {
                "weak_concepts": ["None detected"],
                "priority_ranking": [],
                "recommendations": ["Maintain current FSRS card review spacing cadence."]
            }

        return {
            "weak_concepts": weak_concepts,
            "priority_ranking": priority_ranking,
            "recommendations": recommendations
        }
