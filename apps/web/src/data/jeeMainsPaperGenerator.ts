import { JeeQuestion } from './jeeMainsData';

const PHYSICS_MCQS = [
  { q: "A projectile is thrown with initial velocity u at an angle of 30° to the horizontal. What is the radius of curvature of its trajectory at the highest point?", opts: ["u²cos²30° / g", "u² / (g cos 30°)", "u² / g", "u² sin 30° / g"], ansIdx: 0, exp: "At highest point, v = u cos 30° and centripetal acceleration is g. R = v²/g = u²cos²30° / g." },
  { q: "An ideal gas undergoes an isothermal expansion from volume V to 2V. If work done is W, what is the work done in expanding from 2V to 4V at the same temperature?", opts: ["W", "2W", "W / 2", "W ln 2"], ansIdx: 0, exp: "For isothermal process, W = nRT ln(V2/V1). ln(2V/V) = ln 2, and ln(4V/2V) = ln 2. So work done is identical (W)." },
  { q: "In a Young's double slit experiment, the fringe width is 0.4 mm. If the entire apparatus is immersed in water (μ = 4/3), what is the new fringe width?", opts: ["0.3 mm", "0.53 mm", "0.4 mm", "0.2 mm"], ansIdx: 0, exp: "Fringe width β' = β / μ = 0.4 / (4/3) = 0.3 mm." }
];

const CHEMISTRY_MCQS = [
  { q: "Which of the following complexes is diamagnetic and has d²sp³ hybridization?", opts: ["[Co(NH₃)₆]³⁺", "[Fe(H₂O)₆]³⁺", "[NiCl₄]²⁻", "[Mn(CN)₆]⁴⁻"], ansIdx: 0, exp: "Co³⁺ is a d⁶ ion. NH₃ is a strong field ligand causing pairing of electrons to give d²sp³ low spin diamagnetic complex." },
  { q: "What is the pH of a 10⁻⁸ M HCl aqueous solution at 25°C?", opts: ["6.98", "8.0", "7.0", "6.5"], ansIdx: 0, exp: "Total [H⁺] = 10⁻⁸ (from HCl) + 10⁻7 (from water) = 1.1 × 10⁻7 M. pH = -log(1.1 × 10⁻7) ≈ 6.98." }
];

const MATH_MCQS = [
  { q: "Find the value of limit x→0 of (e^(x²) - cos x) / x².", opts: ["3/2", "1", "1/2", "2"], ansIdx: 0, exp: "Using L'Hopital rule or series expansion: e^(x²) ≈ 1 + x², cos x ≈ 1 - x²/2. Numerator = x² + x²/2 = 3x²/2. Limit = 3/2." },
  { q: "If vector a = i + j + k and vector b = i - j + k, find the area of the parallelogram formed by a and b as adjacent sides.", opts: ["2", "√2", "2√2", "4"], ansIdx: 0, exp: "a × b = |i j k; 1 1 1; 1 -1 1| = i(1+1) - j(1-1) + k(-1-1) = 2i - 2k. Area = |a × b| = √(2² + (-2)²) = √8 = 2√2." }
];

export function generateQuestionsForJeeMainsPaper(paperId: string, seedOffset: number = 0): JeeQuestion[] {
  const questions: JeeQuestion[] = [];

  // Physics (20 MCQ + 5 Numerical = 25 Qs)
  for (let i = 1; i <= 20; i++) {
    const phy = PHYSICS_MCQS[(i + seedOffset) % PHYSICS_MCQS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'physics',
      topicId: 'mechanics',
      topicName: 'Physics (MCQ)',
      questionType: 'MCQ',
      questionText: `Q${i}. ${phy.q}`,
      options: phy.opts,
      correctOptionIndex: phy.ansIdx,
      explanation: phy.exp,
      difficulty: i % 2 === 0 ? 'Medium' : 'Hard'
    });
  }
  for (let i = 21; i <= 25; i++) {
    const val = 12 + (i % 5);
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'physics',
      topicId: 'optics',
      topicName: 'Physics (Numerical)',
      questionType: 'NUMERICAL',
      questionText: `Q${i}. A convex lens of focal length 20 cm forms a real image of size twice that of the object. Find the distance of the object from the lens in cm.`,
      correctNumericalValue: 30,
      numericalTolerance: 0.1,
      explanation: "m = -v/u = -2 => v = 2u. 1/f = 1/v - 1/u => 1/20 = 1/(2u) - 1/(-u) = 3/(2u) => 2u = 60 => u = 30 cm.",
      difficulty: 'Hard'
    });
  }

  // Chemistry (20 MCQ + 5 Numerical = 25 Qs)
  for (let i = 26; i <= 45; i++) {
    const chem = CHEMISTRY_MCQS[(i + seedOffset) % CHEMISTRY_MCQS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'chemistry',
      topicId: 'inorganic',
      topicName: 'Chemistry (MCQ)',
      questionType: 'MCQ',
      questionText: `Q${i}. ${chem.q}`,
      options: chem.opts,
      correctOptionIndex: chem.ansIdx,
      explanation: chem.exp,
      difficulty: i % 2 === 0 ? 'Medium' : 'Hard'
    });
  }
  for (let i = 46; i <= 50; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'chemistry',
      topicId: 'physical',
      topicName: 'Chemistry (Numerical)',
      questionType: 'NUMERICAL',
      questionText: `Q${i}. Calculate the oxidation state of Chromium in Potassium Dichromate (K₂Cr₂O₇).`,
      correctNumericalValue: 6,
      numericalTolerance: 0.0,
      explanation: "2(+1) + 2(x) + 7(-2) = 0 => 2 + 2x - 14 = 0 => 2x = 12 => x = +6.",
      difficulty: 'Medium'
    });
  }

  // Mathematics (20 MCQ + 5 Numerical = 25 Qs)
  for (let i = 51; i <= 70; i++) {
    const math = MATH_MCQS[(i + seedOffset) % MATH_MCQS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'maths',
      topicId: 'calculus',
      topicName: 'Mathematics (MCQ)',
      questionType: 'MCQ',
      questionText: `Q${i}. ${math.q}`,
      options: math.opts,
      correctOptionIndex: math.ansIdx,
      explanation: math.exp,
      difficulty: i % 2 === 0 ? 'Hard' : 'Medium'
    });
  }
  for (let i = 71; i <= 75; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'maths',
      topicId: 'algebra',
      topicName: 'Mathematics (Numerical)',
      questionType: 'NUMERICAL',
      questionText: `Q${i}. If the sum of first n terms of an AP is 3n² + 5n, find its 10th term.`,
      correctNumericalValue: 62,
      numericalTolerance: 0.0,
      explanation: "S_n = 3n² + 5n. T_n = S_n - S_{n-1} = 6n + 2. T_{10} = 6(10) + 2 = 62.",
      difficulty: 'Hard'
    });
  }

  return questions;
}
