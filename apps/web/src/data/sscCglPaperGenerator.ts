import { SscQuestion } from './sscCglData';

const REASONING_PATTERNS = [
  { q: "Select the related letter-cluster from the given alternatives: BCD : EFG :: HIJ : ?", opts: ["KLM", "KMN", "LMN", "OPQ"], ansIdx: 0, exp: "+3 letter shift: H+3=K, I+3=L, J+3=M => KLM." },
  { q: "In a certain code language, 'TEJAS' is coded as '20-5-10-1-19'. How will 'DEFENCE' be coded?", opts: ["4-5-6-5-14-3-5", "4-5-6-5-14-3-5", "4-5-14-5-14-3-5", "5-6-7-6-15-4-6"], ansIdx: 0, exp: "Direct positional values of letters in alphabet." }
];

const GA_FACTS = [
  { q: "Which Dynasty built the famous Khajuraho Temples in Madhya Pradesh?", ans: "Chandela Dynasty", opts: ["Chandela Dynasty", "Paramara Dynasty", "Solanki Dynasty", "Chola Dynasty"], exp: "Khajuraho Temples were constructed by the Chandela rulers between 950 and 1050 CE." },
  { q: "What is the SI unit of Electric Current?", ans: "Ampere", opts: ["Volt", "Ampere", "Ohm", "Watt"], exp: "Electric Current is measured in Amperes (A)." }
];

const QUANT_PATTERNS = [
  { q: "If A:B = 2:3 and B:C = 4:5, find the ratio A:B:C.", opts: ["8:12:15", "6:9:15", "8:10:12", "2:3:5"], ansIdx: 0, exp: "A:B = 8:12, B:C = 12:15 => A:B:C = 8:12:15." },
  { q: "The marked price of an item is ₹800. After giving a discount of 15%, find the selling price.", opts: ["₹680", "₹720", "₹650", "₹700"], ansIdx: 0, exp: "SP = 800 × (100 - 15)/100 = 800 × 0.85 = ₹680." }
];

const ENGLISH_PATTERNS = [
  { q: "Select the INCORRECTLY spelt word:", opts: ["Accomodation", "Accommodation", "Necessary", "Grammar"], ansIdx: 0, exp: "Correct spelling is 'Accommodation' (double c, double m)." },
  { q: "Select the most appropriate synonym of 'BENEVOLENT':", opts: ["Kind-hearted", "Hostile", "Selfish", "Arrogant"], ansIdx: 0, exp: "Benevolent means well-meaning and kindly." }
];

export function generateQuestionsForSscCglPaper(paperId: string, seedOffset: number = 0): SscQuestion[] {
  const questions: SscQuestion[] = [];

  // Reasoning (25 Qs)
  for (let i = 1; i <= 25; i++) {
    const reas = REASONING_PATTERNS[(i + seedOffset) % REASONING_PATTERNS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'reasoning',
      topicName: 'General Intelligence & Reasoning',
      questionText: `Q${i}. ${reas.q}`,
      options: reas.opts,
      correctOptionIndex: reas.ansIdx,
      explanation: reas.exp,
      difficulty: 'Easy'
    });
  }

  // GA (25 Qs)
  for (let i = 26; i <= 50; i++) {
    const ga = GA_FACTS[(i + seedOffset) % GA_FACTS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'ga',
      topicName: 'General Awareness',
      questionText: `Q${i}. ${ga.q}`,
      options: ga.opts,
      correctOptionIndex: 0,
      explanation: ga.exp,
      difficulty: 'Medium'
    });
  }

  // Quant (25 Qs)
  for (let i = 51; i <= 75; i++) {
    const quant = QUANT_PATTERNS[(i + seedOffset) % QUANT_PATTERNS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'quant',
      topicName: 'Quantitative Aptitude',
      questionText: `Q${i}. ${quant.q}`,
      options: quant.opts,
      correctOptionIndex: quant.ansIdx,
      explanation: quant.exp,
      difficulty: 'Medium'
    });
  }

  // English (25 Qs)
  for (let i = 76; i <= 100; i++) {
    const eng = ENGLISH_PATTERNS[(i + seedOffset) % ENGLISH_PATTERNS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'english',
      topicName: 'English Comprehension',
      questionText: `Q${i}. ${eng.q}`,
      options: eng.opts,
      correctOptionIndex: eng.ansIdx,
      explanation: eng.exp,
      difficulty: 'Easy'
    });
  }

  return questions;
}
