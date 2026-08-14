import { CdsQuestion } from './cdsData';

const CDS_ENGLISH_VOCAB = [
  { word: "SURREAL", syn: "Bizarre", ant: "Real", exp: "Surreal means having the qualities of a dream or unreal reality." },
  { word: "EPHEMERAL", syn: "Fleeting", ant: "Enduring", exp: "Ephemeral means lasting for a very short time." },
  { word: "SANGUINE", syn: "Optimistic", ant: "Pessimistic", exp: "Sanguine means optimistic or positive in a bad situation." },
  { word: "EQUANIMITY", syn: "Composure", ant: "Agitation", exp: "Equanimity means mental calmness and composure." },
  { word: "PERNICIOUS", syn: "Harmful", ant: "Beneficial", exp: "Pernicious means having a subtle harmful effect." }
];

const CDS_GK_FACTS = [
  { q: "Which Article of the Indian Constitution empowers the President to grant pardons?", ans: "Article 72", opts: ["Article 72", "Article 61", "Article 123", "Article 143"], exp: "Article 72 empowers the President of India to grant pardons, reprieves, respites or remissions of punishment." },
  { q: "The Tropic of Cancer does NOT pass through which of the following Indian states?", ans: "Odisha", opts: ["Gujarat", "Madhya Pradesh", "Odisha", "Tripura"], exp: "Tropic of Cancer passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, and Mizoram. It does NOT pass through Odisha." },
  { q: "Which battle in 1556 established Akbar's control over Delhi and Agra?", ans: "Second Battle of Panipat", opts: ["First Battle of Panipat", "Second Battle of Panipat", "Battle of Khanwa", "Battle of Haldighati"], exp: "The Second Battle of Panipat (1556) was fought between Akbar's forces led by Bairam Khan and Hemu." },
  { q: "What is the primary operational task of the INS Vikrant (IAC-1)?", ans: "Aircraft Carrier Operations", opts: ["Nuclear Submarine Patrol", "Aircraft Carrier Operations", "Guided Missile Destroyer", "Amphibious Warfare"], exp: "INS Vikrant is India's first indigenously constructed aircraft carrier built by Cochin Shipyard." },
  { q: "Which law of physics states that pressure applied to an enclosed fluid is transmitted undiminished?", ans: "Pascal's Law", opts: ["Bernoulli's Principle", "Pascal's Law", "Archimedes' Principle", "Hooke's Law"], exp: "Pascal's Law states that when pressure is applied to a fluid in a closed container, it is transmitted equally in all directions." }
];

const CDS_MATH_PATTERNS = [
  { topic: "Trigonometry", text: (deg: number) => `If sin(θ) = 3/5, find the value of tan(θ) + sec(θ).`, calc: () => ({ correct: "2.0", opts: ["2.0", "1.5", "2.5", "3.0"], exp: "sin(θ)=3/5 => cos(θ)=4/5. tan(θ)=3/4, sec(θ)=5/4. Sum = 3/4 + 5/4 = 8/4 = 2.0." }) },
  { topic: "Geometry", text: (r: number) => `In a circle of radius ${r} cm, find the length of a chord situated at a distance of ${(r/2).toFixed(0)} cm from the center.`, calc: (r: number) => { const dist = r / 2; const half = Math.sqrt(r*r - dist*dist); const chord = 2 * half; return { correct: `${chord.toFixed(2)} cm`, opts: [`${chord.toFixed(2)} cm`, `${(chord*0.8).toFixed(2)} cm`, `${(chord*1.2).toFixed(2)} cm`, `${(chord+2).toFixed(2)} cm`], exp: `Chord length = 2 * √(R² - d²) = 2 * √(${r}² - ${dist}²) = ${chord.toFixed(2)} cm.` }; } },
  { topic: "Mensuration 3D", text: (h: number) => `Find the total surface area of a solid hemisphere of radius ${h} cm.`, calc: (h: number) => { const tsa = 3 * Math.PI * h * h; return { correct: `${tsa.toFixed(1)} cm²`, opts: [`${tsa.toFixed(1)} cm²`, `${(tsa*0.8).toFixed(1)} cm²`, `${(tsa*1.25).toFixed(1)} cm²`, `${(tsa+100).toFixed(1)} cm²`], exp: `Total Surface Area of Hemisphere = 3πr² = 3 * π * ${h}² = ${tsa.toFixed(1)} cm².` }; } }
];

export function generateQuestionsForCdsPaper(paperId: string, track: 'IMA' | 'OTA' = 'IMA', seedOffset: number = 0): CdsQuestion[] {
  const questions: CdsQuestion[] = [];
  const totalQs = track === 'IMA' ? 340 : 240;

  // 1. English (120 Qs)
  for (let i = 1; i <= 120; i++) {
    const vocab = CDS_ENGLISH_VOCAB[(i + seedOffset) % CDS_ENGLISH_VOCAB.length];
    const isSyn = i % 2 === 1;
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'english',
      topicId: isSyn ? 'spotting_errors' : 'idioms_phrases',
      topicName: isSyn ? 'Synonyms & Antonyms' : 'Grammar & Vocabulary',
      questionText: isSyn 
        ? `Q${i}. Select the word MOST SIMILAR in meaning to "${vocab.word}":`
        : `Q${i}. Select the word MOST OPPOSITE in meaning to "${vocab.word}":`,
      options: isSyn ? [vocab.syn, vocab.ant, "Irrelevant", "Vague"] : [vocab.ant, vocab.syn, "Equivalent", "Uncertain"],
      correctOptionIndex: 0,
      explanation: isSyn ? `"${vocab.word}" means ${vocab.exp}` : `Opposite of "${vocab.word}" is ${vocab.ant}.`,
      difficulty: i % 3 === 0 ? 'Hard' : 'Medium'
    });
  }

  // 2. GK (120 Qs)
  for (let i = 121; i <= 240; i++) {
    const gk = CDS_GK_FACTS[(i + seedOffset) % CDS_GK_FACTS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'gk',
      topicId: 'polity',
      topicName: 'General Knowledge & UPSC GS',
      questionText: `Q${i}. ${gk.q}`,
      options: gk.opts,
      correctOptionIndex: 0,
      explanation: gk.exp,
      difficulty: i % 2 === 0 ? 'Medium' : 'Hard'
    });
  }

  // 3. Maths (100 Qs) - IMA Only
  if (track === 'IMA') {
    for (let i = 241; i <= 340; i++) {
      const patIdx = (i + seedOffset) % CDS_MATH_PATTERNS.length;
      const pat = CDS_MATH_PATTERNS[patIdx];
      const val = 6 + (i % 10);
      const res = pat.calc(val);
      questions.push({
        id: `${paperId}_q${i}`,
        subjectId: 'maths',
        topicId: 'trigonometry',
        topicName: pat.topic,
        questionText: `Q${i}. ${pat.text(val)}`,
        options: res.opts,
        correctOptionIndex: 0,
        explanation: res.exp,
        difficulty: i % 2 === 0 ? 'Hard' : 'Medium'
      });
    }
  }

  return questions;
}
