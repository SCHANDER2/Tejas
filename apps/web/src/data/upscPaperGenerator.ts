import { UpscQuestion } from './upscData';

const UPSC_GS1_FACTS = [
  { q: "Consider the following statements regarding the Preamble to the Indian Constitution:\n1. It is based on the 'Objectives Resolution' drafted by Jawaharlal Nehru.\n2. It is non-justiciable in nature.\n3. It can be amended under Article 368.\nWhich of the statements given above is/are correct?", opts: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"], ansIdx: 3, exp: "All 3 statements are correct. Passed via 42nd Amendment 1976." },
  { q: "With reference to the Monetary Policy Committee (MPC) of RBI, consider:\n1. It is a 6-member committee chaired by the RBI Governor.\n2. It determines the Policy Repo Rate.\nWhich statement is correct?", opts: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"], ansIdx: 2, exp: "MPC comprises 6 members (3 RBI + 3 Govt nominees) chaired by RBI Governor." },
  { q: "Which of the following ocean currents is a WARM current in the Atlantic Ocean?", opts: ["Canaries Current", "Benguela Current", "Gulf Stream", "Labrador Current"], ansIdx: 2, exp: "Gulf Stream is a powerful warm Atlantic current originating in Gulf of Mexico." }
];

const UPSC_CSAT_FACTS = [
  { q: "A person can travel from town A to B by 4 routes, and from B to C by 3 routes. How many different routes can he take to go from A to C via B?", opts: ["7", "12", "14", "10"], ansIdx: 1, exp: "By Fundamental Principle of Counting: 4 × 3 = 12 total distinct routes." },
  { q: "In a family of 6 members, average age is 25 years. If the youngest member is 5 years old, what was the average age of the family at the time of birth of the youngest member?", opts: ["24 years", "20 years", "22 years", "25 years"], ansIdx: 0, exp: "Sum of current ages = 6 * 25 = 150. 5 years ago, sum of ages of 5 members = 150 - (6 * 5) = 120. Average = 120 / 5 = 24 years." }
];

export function generateQuestionsForUpscPaper(paperId: string, paperType: 'GS1' | 'CSAT' = 'GS1', seedOffset: number = 0): UpscQuestion[] {
  const questions: UpscQuestion[] = [];
  const totalQs = paperType === 'GS1' ? 100 : 80;

  for (let i = 1; i <= totalQs; i++) {
    if (paperType === 'GS1') {
      const gs = UPSC_GS1_FACTS[(i + seedOffset) % UPSC_GS1_FACTS.length];
      questions.push({
        id: `${paperId}_q${i}`,
        paperType: 'GS1',
        subjectId: 'polity',
        topicName: 'UPSC General Studies Paper 1',
        questionText: `Q${i}. ${gs.q}`,
        options: gs.opts,
        correctOptionIndex: gs.ansIdx,
        explanation: gs.exp,
        difficulty: i % 2 === 0 ? 'Hard' : 'Medium'
      });
    } else {
      const csat = UPSC_CSAT_FACTS[(i + seedOffset) % UPSC_CSAT_FACTS.length];
      questions.push({
        id: `${paperId}_q${i}`,
        paperType: 'CSAT',
        subjectId: 'quant',
        topicName: 'UPSC CSAT Paper 2',
        questionText: `Q${i}. ${csat.q}`,
        options: csat.opts,
        correctOptionIndex: csat.ansIdx,
        explanation: csat.exp,
        difficulty: i % 2 === 0 ? 'Medium' : 'Hard'
      });
    }
  }

  return questions;
}
