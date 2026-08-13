import { AfcatQuestion } from './afcatData';

// High-Yield AFCAT Topic Pools for 100-Question Generation
const ENGLISH_VOCAB = [
  { word: "VALIANT", syn: "Gallant", ant: "Cowardly", exp: "Valiant means showing courage or determination." },
  { word: "INDOMITABLE", syn: "Unconquerable", ant: "Submissive", exp: "Indomitable means impossible to subdue or defeat." },
  { word: "TRANSIENT", syn: "Ephemeral", ant: "Permanent", exp: "Transient means lasting only for a short time." },
  { word: "METICULOUS", syn: "Scrupulous", ant: "Careless", exp: "Meticulous means showing great attention to detail." },
  { word: "CANDID", syn: "Frank", ant: "Evasive", exp: "Candid means truthful and straightforward." },
  { word: "ALACRITY", syn: "Eagerness", ant: "Apathy", exp: "Alacrity means brisk and cheerful readiness." },
  { word: "OBSTINATE", syn: "Stubborn", ant: "Flexible", exp: "Obstinate means stubbornly refusing to change opinion." },
  { word: "AUDACIOUS", syn: "Daring", ant: "Timid", exp: "Audacious means showing a willingness to take surprisingly bold risks." },
  { word: "BENEVOLENT", syn: "Kind-hearted", ant: "Malevolent", exp: "Benevolent means well meaning and kindly." },
  { word: "LACONIC", syn: "Concise", ant: "Verbose", exp: "Laconic means using very few words." }
];

const MATH_PATTERNS = [
  { topic: "Time & Work", text: (a: number, b: number) => `A can complete a task in ${a} days and B in ${b} days. Working together, how many days will they take?`, calc: (a: number, b: number) => { const ans = (a * b) / (a + b); return { correct: `${ans.toFixed(2)} days`, opts: [`${ans.toFixed(2)} days`, `${(ans + 1.5).toFixed(2)} days`, `${(ans - 0.8).toFixed(2)} days`, `${(ans + 3).toFixed(2)} days`], exp: `Work rate = 1/${a} + 1/${b} = (${a}+${b})/${a*b}. Time = ${a*b}/${a+b} = ${ans.toFixed(2)} days.` }; } },
  { topic: "Speed & Distance", text: (s: number, t: number) => `A fighter jet travels at ${s} km/h for ${t} hours. Find the total distance covered in miles (1 km = 0.621 miles).`, calc: (s: number, t: number) => { const dist = s * t * 0.621; return { correct: `${dist.toFixed(1)} miles`, opts: [`${dist.toFixed(1)} miles`, `${(dist * 1.2).toFixed(1)} miles`, `${(dist * 0.8).toFixed(1)} miles`, `${(dist + 50).toFixed(1)} miles`], exp: `Distance in km = ${s} * ${t} = ${s*t} km. In miles = ${s*t} * 0.621 = ${dist.toFixed(1)} miles.` }; } },
  { topic: "Profit & Loss", text: (cp: number, prof: number) => `An item purchased for ₹${cp} is sold at a profit of ${prof}%. Find the selling price.`, calc: (cp: number, prof: number) => { const sp = cp * (1 + prof / 100); return { correct: `₹${sp.toFixed(0)}`, opts: [`₹${sp.toFixed(0)}`, `₹${(sp + 150).toFixed(0)}`, `₹${(sp - 100).toFixed(0)}`, `₹${(sp + 300).toFixed(0)}`], exp: `SP = CP * (1 + Profit%/100) = ${cp} * (1 + ${prof}/100) = ₹${sp.toFixed(0)}.` }; } },
  { topic: "Simple Interest", text: (p: number, r: number) => `Calculate the Simple Interest on ₹${p * 100} at ${r}% per annum for 2 years.`, calc: (p: number, r: number) => { const principal = p * 100; const si = (principal * r * 2) / 100; return { correct: `₹${si.toFixed(0)}`, opts: [`₹${si.toFixed(0)}`, `₹${(si + 200).toFixed(0)}`, `₹${(si - 150).toFixed(0)}`, `₹${(si + 500).toFixed(0)}`], exp: `SI = (P * R * T) / 100 = (${principal} * ${r} * 2) / 100 = ₹${si.toFixed(0)}.` }; } }
];

const GA_DEFENCE_FACTS = [
  { q: "Where is the Headquarters of the Indian Air Force Maintenance Command located?", ans: "Nagpur", opts: ["New Delhi", "Nagpur", "Bengaluru", "Shillong"], exp: "IAF Maintenance Command is located in Nagpur, Maharashtra." },
  { q: "Which fighter aircraft is manufactured domestically by HAL in India?", ans: "LCA Tejas", opts: ["Rafale", "Su-30MKI", "LCA Tejas", "Mirage 2000"], exp: "LCA Tejas is India's indigenous single-engine multirole light fighter developed by ADA and HAL." },
  { q: "Exercise 'Garuda' is a bilateral air exercise between India and which nation?", ans: "France", opts: ["France", "USA", "Japan", "United Kingdom"], exp: "Ex Garuda is conducted between the Indian Air Force and French Air & Space Force." },
  { q: "What is the highest operational airfield of the Indian Air Force?", ans: "Daulat Beg Oldi (DBO)", opts: ["Leh Airbase", "Daulat Beg Oldi (DBO)", "Thoise", "Srinagar Airbase"], exp: "DBO in Ladakh at an altitude of 16,614 ft is the highest operational airstrip in the world." },
  { q: "Which supersonic cruise missile is jointly developed by India and Russia?", ans: "BrahMos", opts: ["Agni-V", "BrahMos", "Nirbhay", "Akash"], exp: "BrahMos is named after Brahmaputra and Moskva rivers." },
  { q: "Who was the first Marshal of the Indian Air Force (5-Star Rank)?", ans: "Arjan Singh", opts: ["Subroto Mukherjee", "Arjan Singh", "K.M. Cariappa", "Sam Manekshaw"], exp: "Marshal of the IAF Arjan Singh DFC was conferred the 5-star rank in 2002." },
  { q: "Which Air Force station in Haryana is home to India's first Rafale squadron (17 Sqn Golden Arrows)?", ans: "Ambala AFS", opts: ["Ambala AFS", "Hasimara AFS", "Jodhpur AFS", "Pathankot AFS"], exp: "No. 17 Squadron 'Golden Arrows' was resurrected at Ambala Air Force Station for Rafale jets." },
  { q: "What is the motto of the Indian Air Force?", ans: "Touch the Sky with Glory (Nabhaḥ Sparśaṁ Dīptam)", opts: ["Service Before Self", "Touch the Sky with Glory", "Victory Everywhere", "Valour and Faith"], exp: "Taken from the 11th chapter of the Bhagavad Gita." }
];

export function generate100QuestionsForPaper(paperId: string, seedOffset: number = 0): AfcatQuestion[] {
  const questions: AfcatQuestion[] = [];

  // 1. SECTION A: English (30 Questions: Q1 to Q30)
  for (let i = 1; i <= 30; i++) {
    const vocab = ENGLISH_VOCAB[(i + seedOffset) % ENGLISH_VOCAB.length];
    const isSyn = i % 2 === 1;
    
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'english',
      topicId: isSyn ? 'eng_syn_ant' : 'eng_idioms_phrases',
      topicName: isSyn ? 'Synonyms & Antonyms' : 'Verbal Ability & Grammar',
      questionText: isSyn 
        ? `Select the word which is MOST SIMILAR in meaning to "${vocab.word}":`
        : `Select the word which is MOST OPPOSITE in meaning to "${vocab.word}":`,
      options: isSyn 
        ? [vocab.syn, vocab.ant, "Irrelevant", "Ambiguous"]
        : [vocab.ant, vocab.syn, "Equivalent", "Uncertain"],
      correctOptionIndex: 0,
      explanation: isSyn 
        ? `"${vocab.word}" means ${vocab.exp} Correct synonym: ${vocab.syn}.`
        : `"${vocab.word}" means ${vocab.exp} Correct antonym: ${vocab.ant}.`,
      difficulty: i % 3 === 0 ? 'Hard' : 'Medium'
    });
  }

  // 2. SECTION B: Numerical Ability (20 Questions: Q31 to Q50)
  for (let i = 31; i <= 50; i++) {
    const patIdx = (i + seedOffset) % MATH_PATTERNS.length;
    const pat = MATH_PATTERNS[patIdx];
    const valA = 10 + ((i * 3 + seedOffset) % 25);
    const valB = 15 + ((i * 5 + seedOffset) % 30);
    const res = pat.calc(valA, valB);

    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'maths',
      topicId: 'math_arithmetic',
      topicName: pat.topic,
      questionText: pat.text(valA, valB),
      options: res.opts,
      correctOptionIndex: 0,
      explanation: res.exp,
      difficulty: i % 2 === 0 ? 'Medium' : 'Hard'
    });
  }

  // 3. SECTION C: Reasoning & Military Aptitude (25 Questions: Q51 to Q75)
  for (let i = 51; i <= 75; i++) {
    const rType = i % 4;
    let text = "";
    let opts = ["", "", "", ""];
    let exp = "";

    if (rType === 0) {
      text = `Find the odd one out among the given options:`;
      opts = ["Su-30MKI Fighter", "Rafale Jet", "Mirage 2000", "Chinook Heavy Helicopter"];
      exp = "Su-30MKI, Rafale, and Mirage 2000 are fighter jets. Chinook is a heavy-lift transport helicopter.";
    } else if (rType === 1) {
      text = `Which Venn diagram best represents: "Pilots", "Flight Engineers", and "Air Force Officers"?`;
      opts = ["Three intersecting circles showing mutual overlaps", "Three concentric circles", "Two concentric inside a third", "Three disjoint circles"];
      exp = "Air Force Officers can be Pilots, Engineers, or both. Hence all three categories partially overlap.";
    } else if (rType === 2) {
      text = `If "RADAR" is coded as "SBETS", how is "AVIONICS" coded under the same pattern?`;
      opts = ["BWJPOJDT", "CWKQPKEU", "AVIONICS", "ZUHNMBDR"];
      exp = "Each letter is shifted by +1 (A->B, V->W, I->J, O->P, N->O, I->J, C->D, S->T).";
    } else {
      text = `A figure rotates 90 degrees clockwise in each step. After 5 steps, what is its orientation?`;
      opts = ["90 degrees Clockwise", "180 degrees Opposite", "270 degrees Clockwise", "360 degrees Full Circle"];
      exp = "5 * 90° = 450° clockwise = 360° + 90° = 90° Clockwise net rotation.";
    }

    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'reasoning',
      topicId: 'reas_aptitude',
      topicName: 'Reasoning & Spatial Aptitude',
      questionText: text,
      options: opts,
      correctOptionIndex: 0,
      explanation: exp,
      difficulty: 'Medium'
    });
  }

  // 4. SECTION D: General Awareness & Defence GK (25 Questions: Q76 to Q100)
  for (let i = 76; i <= 100; i++) {
    const fact = GA_DEFENCE_FACTS[(i + seedOffset) % GA_DEFENCE_FACTS.length];
    
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'ga',
      topicId: 'ga_defence',
      topicName: 'General Awareness & Defence GK',
      questionText: `Q${i}. ${fact.q}`,
      options: fact.opts,
      correctOptionIndex: fact.opts.indexOf(fact.ans) !== -1 ? fact.opts.indexOf(fact.ans) : 0,
      explanation: fact.exp,
      difficulty: i % 3 === 0 ? 'Hard' : 'Easy'
    });
  }

  return questions;
}
