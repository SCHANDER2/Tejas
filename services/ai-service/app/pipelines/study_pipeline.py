class StudyPlanner:
    def generate(self, exam: str, hours: int, current_level: float, target_score: float) -> dict:
        """
        Calculates study roadmaps mapping targets against available time capacity.
        """
        # Distribute hours across phases
        content_hours = int(hours * 0.50)
        practice_hours = int(hours * 0.35)
        revision_hours = int(hours * 0.15)

        # Baseline velocity (topics per hour estimation)
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
