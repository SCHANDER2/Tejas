import { NdaQuestion } from './ndaData';

const NDA_MATH_PATTERNS = [
  { topic: "Calculus", text: (a: number) => `Find the derivative d/dx [ x² · sin(${a}x) ].`, calc: (a: number) => ({ correct: `2x·sin(${a}x) + ${a}x²·cos(${a}x)`, opts: [`2x·sin(${a}x) + ${a}x²·cos(${a}x)`, `x·sin(${a}x) + ${a}x²·cos(${a}x)`, `2x·cos(${a}x) - ${a}x²·sin(${a}x)`, `${a}x·sin(${a}x)`], exp: `Product Rule: d/dx(u·v) = u'v + uv'. Here u=x² (u'=2x), v=sin(${a}x) (v'=${a}cos(${a}x)).` }) },
  { topic: "Algebra & Matrices", text: (k: number) => `If matrix A = [[${k}, 0], [0, ${k}]], find the determinant of A³.`, calc: (k: number) => { const detA = k * k; const detA3 = detA * detA * detA; return { correct: `${detA3}`, opts: [`${detA3}`, `${detA * 3}`, `${k * 6}`, `${detA3 + 10}`], exp: `det(A) = ${k}*${k} - 0 = ${detA}. det(A³) = (det A)³ = ${detA}³ = ${detA3}.` }; } },
  { topic: "Trigonometry", text: (a: number) => `Evaluate sin(15°) using sin(45° - 30°).`, calc: () => ({ correct: "(√6 - √2)/4", opts: ["(√6 - √2)/4", "(√6 + √2)/4", "(√3 - 1)/2", "(√3 + 1)/2"], exp: "sin(45°-30°) = sin45°cos30° - cos45°sin30° = (1/√2)(√3/2) - (1/√2)(1/2) = (√3-1)/(2√2) = (√6-√2)/4." }) }
];

const NDA_GAT_ENGLISH = [
  { word: "FORTITUDE", syn: "Courage", ant: "Timidity", exp: "Fortitude means courage in pain or adversity." },
  { word: "TENACIOUS", syn: "Persistent", ant: "Yielding", exp: "Tenacious means holding firm to a position." },
  { word: "PRUDENT", syn: "Wise", ant: "Reckless", exp: "Prudent means acting with care and thought for the future." }
];

const NDA_GAT_SCIENCE_GK = [
  { q: "What is the unit of focal power of a lens in Physics?", ans: "Dioptre (D)", opts: ["Dioptre (D)", "Lumen", "Candela", "Watt"], exp: "Focal power P = 1/f (in meters), measured in Dioptres (D)." },
  { q: "Which gas is released when sodium bicarbonate (baking soda) reacts with an acid?", ans: "Carbon Dioxide (CO₂)", opts: ["Hydrogen (H₂)", "Carbon Dioxide (CO₂)", "Oxygen (O₂)", "Nitrogen (N₂)"], exp: "NaHCO₃ + HCl → NaCl + H₂O + CO₂↑. Carbon dioxide gas is evolved with effervescence." },
  { q: "Who was the Governor-General of India during the Revolt of 1857?", ans: "Lord Canning", opts: ["Lord Dalhousie", "Lord Canning", "Lord Curzon", "Lord William Bentinck"], exp: "Lord Canning was the Governor-General during 1857 and became India's first Viceroy in 1858." },
  { q: "The Durand Line demarcates the international boundary between which two countries?", ans: "Pakistan and Afghanistan", opts: ["India and China", "Pakistan and Afghanistan", "India and Pakistan", "India and Myanmar"], exp: "Durand Line was established in 1893 between British India and Afghanistan, currently separating Pakistan and Afghanistan." }
];

export function generateQuestionsForNdaPaper(paperId: string, seedOffset: number = 0): NdaQuestion[] {
  const questions: NdaQuestion[] = [];

  // 1. Paper 1: Mathematics (120 Qs)
  for (let i = 1; i <= 120; i++) {
    const patIdx = (i + seedOffset) % NDA_MATH_PATTERNS.length;
    const pat = NDA_MATH_PATTERNS[patIdx];
    const val = 2 + (i % 6);
    const res = pat.calc(val);
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'maths',
      topicId: 'calculus',
      topicName: pat.topic,
      questionText: `Q${i}. ${pat.text(val)}`,
      options: res.opts,
      correctOptionIndex: 0,
      explanation: res.exp,
      difficulty: i % 3 === 0 ? 'Hard' : 'Medium'
    });
  }

  // 2. Paper 2 Part A: GAT English (50 Qs)
  for (let i = 121; i <= 170; i++) {
    const eng = NDA_GAT_ENGLISH[(i + seedOffset) % NDA_GAT_ENGLISH.length];
    const isSyn = i % 2 === 1;
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'gat_english',
      topicId: 'syn_ant',
      topicName: 'English Synonyms & Antonyms',
      questionText: `Q${i}. Select the option MOST ${isSyn ? 'SIMILAR' : 'OPPOSITE'} in meaning to "${eng.word}":`,
      options: isSyn ? [eng.syn, eng.ant, "Ambiguous", "Vague"] : [eng.ant, eng.syn, "Constant", "Definite"],
      correctOptionIndex: 0,
      explanation: `${eng.word} means ${eng.exp}`,
      difficulty: i % 2 === 0 ? 'Medium' : 'Easy'
    });
  }

  // 3. Paper 2 Part B: GAT Science & GK (100 Qs)
  for (let i = 171; i <= 270; i++) {
    const gk = NDA_GAT_SCIENCE_GK[(i + seedOffset) % NDA_GAT_SCIENCE_GK.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'gat_science_gk',
      topicId: 'physics',
      topicName: 'Physics, Chemistry & GK',
      questionText: `Q${i}. ${gk.q}`,
      options: gk.opts,
      correctOptionIndex: 0,
      explanation: gk.exp,
      difficulty: i % 2 === 0 ? 'Medium' : 'Hard'
    });
  }

  return questions;
}
