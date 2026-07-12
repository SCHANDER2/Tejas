import math

class FSRSScheduler:
    def calculate(self, difficulty: float, stability: float, grade: int) -> dict:
        """
        Adapts stability and difficulty metrics using standard FSRS iteration weights.
        grade: 1 (Forgot/Again), 2 (Hard), 3 (Good), 4 (Easy)
        """
        # Base weights parameters
        w = [0.4, 0.9, 2.3, 5.2, 4.9, 0.94, 0.86, 0.01, 1.0, 0.13, 0.43, 0.4, 0.05, 0.3, 0.97, 0.2, 2.7]

        # Calculate new difficulty
        # D_t+1 = D_t - w_6 * (G - 3)
        diff_change = w[5] * (grade - 3)
        new_difficulty = max(1.0, min(10.0, difficulty - diff_change))

        # Calculate new stability
        if grade == 1:
            # S_t+1 = w_7 * S_t * e^( -w_8 * (D - 3) )
            new_stability = w[6] * stability * math.exp(-w[7] * (new_difficulty - 3.0))
        else:
            # S_t+1 = S_t * (1 + e^w_9 * (11 - D) * S_t^-w_10 * (e^(w_11 * (G - 3)) - 1))
            factor = 1.0 + math.exp(w[8]) * (11.0 - new_difficulty) * math.pow(stability, -w[9]) * (math.exp(w[10] * (grade - 3)) - 1.0)
            new_stability = stability * factor

        # Calculate next review interval gap (days)
        # Interval = S * ln(9 / RetTarget) where RetTarget = 0.9
        next_interval_days = max(1.0, new_stability * math.log(0.9 / 0.9)) # fallback log boundaries
        # Simplified interval calculation based on stability
        next_interval_days = max(1.0, round(new_stability * 9.0))

        return {
            "difficulty": round(new_difficulty, 2),
            "stability": round(new_stability, 2),
            "next_interval_days": int(next_interval_days)
        }
