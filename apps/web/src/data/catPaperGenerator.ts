import { CatQuestion } from './catData';

export function generateQuestionsForCatPaper(paperId: string, seedOffset: number = 0): CatQuestion[] {
  const questions: CatQuestion[] = [];

  // Section 1: VARC (24 Qs: Q1 to Q24)
  for (let i = 1; i <= 20; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      type: 'MCQ',
      sectionId: 'varc',
      sectionName: 'Section 1: VARC',
      questionText: `Q${i}. [Reading Comprehension] Based on the passage, which of the following best expresses the author's primary thesis regarding economic globalization?`,
      options: ["Globalization creates uneven wealth distribution while reducing poverty.", "Technological progress renders national boundaries irrelevant.", "Protectionism is the sole safeguard for emerging economies.", "Free market dynamics automatically solve income inequality."],
      correctOptionIndex: 0,
      explanation: "The author explicitly emphasizes the dual effect: global poverty reduction alongside rising domestic wealth disparity.",
      difficulty: 'Hard'
    });
  }
  for (let i = 21; i <= 24; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      type: 'TITA',
      sectionId: 'varc',
      sectionName: 'Section 1: VARC',
      questionText: `Q${i}. [Para-Jumble TITA] Arrange the 4 sentences (1, 2, 3, 4) in the correct logical sequence: 1) Consequently, innovation flourished. 2) The Renaissance sparked a rebirth of classical learning. 3) Thinkers questioned medieval dogmas. 4) Art and science advanced hand in hand.`,
      correctTitaValue: "2341",
      explanation: "Logical sequence: 2 sets context -> 3 shows reaction -> 4 specifies developments -> 1 concludes.",
      difficulty: 'Hard'
    });
  }

  // Section 2: DILR (20 Qs: Q25 to Q44)
  for (let i = 25; i <= 40; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      type: 'MCQ',
      sectionId: 'dilr',
      sectionName: 'Section 2: DILR',
      questionText: `Q${i}. [Data Caselet] Four friends A, B, C, D participate in 4 sports. A does not play Tennis. B plays Football. C plays Badminton. Who plays Tennis if D plays Basketball?`,
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 1, // B or deductive
      explanation: "By elimination matrix.",
      difficulty: 'Hard'
    });
  }
  for (let i = 41; i <= 44; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      type: 'TITA',
      sectionId: 'dilr',
      sectionName: 'Section 2: DILR',
      questionText: `Q${i}. [DILR TITA] Find the minimum number of matchsticks required to construct a 4x4 grid.`,
      correctTitaValue: "40",
      explanation: "Grid of n x n requires 2n(n+1) matchsticks = 2(4)(5) = 40.",
      difficulty: 'Hard'
    });
  }

  // Section 3: QA (22 Qs: Q45 to Q66)
  for (let i = 45; i <= 60; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      type: 'MCQ',
      sectionId: 'qa',
      sectionName: 'Section 3: QA',
      questionText: `Q${i}. [Quantitative Ability] How many integer solutions exist for the equation x² - y² = 105?`,
      options: ["8", "16", "4", "12"],
      correctOptionIndex: 1,
      explanation: "105 = 3 × 5 × 7. Total factors = 2 × 2 × 2 = 8 pairs of positive integers. Total integer pairs (positive & negative) = 16.",
      difficulty: 'Hard'
    });
  }
  for (let i = 61; i <= 66; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      type: 'TITA',
      sectionId: 'qa',
      sectionName: 'Section 3: QA',
      questionText: `Q${i}. [QA TITA] If log₂ x + log₄ x + log₁₆ x = 21/4, find the numerical value of x.`,
      correctTitaValue: "8",
      explanation: "log₂ x + (1/2)log₂ x + (1/4)log₂ x = (7/4)log₂ x = 21/4 => log₂ x = 3 => x = 2³ = 8.",
      difficulty: 'Hard'
    });
  }

  return questions;
}
