import { NeetQuestion } from './neetData';

const BOTANY_FACTS = [
  { q: "Which plant hormone is responsible for apical dominance in growing plants?", ans: "Auxin (IAA)", opts: ["Auxin (IAA)", "Gibberellin", "Cytokinin", "Abscisic Acid"], exp: "Auxin synthesized at stem apex inhibits the growth of lateral axillary buds (apical dominance)." },
  { q: "During C4 photosynthesis, the primary CO₂ acceptor in mesophyll cells is:", ans: "Phosphoenolpyruvate (PEP)", opts: ["Ribulose-1,5-bisphosphate (RuBP)", "Phosphoenolpyruvate (PEP)", "Oxaloacetic acid (OAA)", "RuBisCO"], exp: "PEP is the 3-carbon acceptor in C4 mesophyll cells catalyzed by PEP carboxylase." },
  { q: "In DNA replication, the enzyme responsible for unzipping the double helix is:", ans: "DNA Helicase", opts: ["DNA Polymerase", "DNA Helicase", "DNA Ligase", "RNA Primase"], exp: "DNA Helicase breaks hydrogen bonds between nitrogenous base pairs to open the replication fork." }
];

const ZOOLOGY_FACTS = [
  { q: "Which part of the human brain controls involuntary functions such as respiration and heart rate?", ans: "Medulla Oblongata", opts: ["Cerebellum", "Medulla Oblongata", "Hypothalamus", "Cerebrum"], exp: "Medulla oblongata houses vital cardiac, respiratory, and vasomotor centers." },
  { q: "Which antibody immunoglobulin is primarily present in human colostrum (first milk)?", ans: "IgA", opts: ["IgG", "IgA", "IgM", "IgE"], exp: "IgA provides passive immunity to the newborn through maternal breast milk." },
  { q: "The functional unit of the human kidney is called:", ans: "Nephron", opts: ["Neuron", "Nephron", "Glomerulus", "Loop of Henle"], exp: "Nephron is the structural and functional filtration unit of the kidney." }
];

const PHYSICS_NEET = [
  { q: "The dimensional formula of universal gravitational constant G is:", ans: "[M⁻¹ L³ T⁻²]", opts: ["[M⁻¹ L³ T⁻²]", "[M¹ L² T⁻²]", "[M⁰ L³ T⁻¹]", "[M⁻² L³ T⁻²]"], exp: "F = G m1 m2 / r² => G = F r² / (m1 m2) => [M L T⁻²][L²] / [M²] = [M⁻¹ L³ T⁻²]." },
  { q: "A transformer step-up ratio is 1:10. If primary voltage is 220 V, what is the secondary output voltage?", ans: "2200 V", opts: ["22 V", "220 V", "2200 V", "4400 V"], exp: "Vs / Vp = Ns / Np => Vs = 220 * 10 = 2200 V." }
];

const CHEM_NEET = [
  { q: "Which of the following elements has the highest electronegativity on the Pauling scale?", ans: "Fluorine (F)", opts: ["Oxygen (O)", "Fluorine (F)", "Chlorine (Cl)", "Nitrogen (N)"], exp: "Fluorine is the most electronegative element with a Pauling value of 4.0." },
  { q: "The hybridization of Carbon atom in Diamond and Graphite respectively are:", ans: "sp³ and sp²", opts: ["sp³ and sp²", "sp² and sp³", "sp³ and sp", "sp² and sp"], exp: "In diamond, each carbon is tetrahedrally bonded (sp³). In graphite, planar hexagonal sheets (sp²)." }
];

export function generateQuestionsForNeetPaper(paperId: string, seedOffset: number = 0): NeetQuestion[] {
  const questions: NeetQuestion[] = [];

  // Physics (45 Qs: Q1 - Q45)
  for (let i = 1; i <= 45; i++) {
    const phy = PHYSICS_NEET[(i + seedOffset) % PHYSICS_NEET.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'physics',
      topicId: 'mechanics',
      topicName: 'Physics',
      questionText: `Q${i}. ${phy.q}`,
      options: phy.opts,
      correctOptionIndex: 0,
      explanation: phy.exp,
      difficulty: i % 2 === 0 ? 'Medium' : 'Hard'
    });
  }

  // Chemistry (45 Qs: Q46 - Q90)
  for (let i = 46; i <= 90; i++) {
    const chem = CHEM_NEET[(i + seedOffset) % CHEM_NEET.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'chemistry',
      topicId: 'organic',
      topicName: 'Chemistry',
      questionText: `Q${i}. ${chem.q}`,
      options: chem.opts,
      correctOptionIndex: 0,
      explanation: chem.exp,
      difficulty: i % 2 === 0 ? 'Medium' : 'Hard'
    });
  }

  // Botany (45 Qs: Q91 - Q135)
  for (let i = 91; i <= 135; i++) {
    const bot = BOTANY_FACTS[(i + seedOffset) % BOTANY_FACTS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'botany',
      topicId: 'plant_physio',
      topicName: 'Botany',
      questionText: `Q${i}. ${bot.q}`,
      options: bot.opts,
      correctOptionIndex: 0,
      explanation: bot.exp,
      difficulty: i % 2 === 0 ? 'Easy' : 'Medium'
    });
  }

  // Zoology (45 Qs: Q136 - Q180)
  for (let i = 136; i <= 180; i++) {
    const zoo = ZOOLOGY_FACTS[(i + seedOffset) % ZOOLOGY_FACTS.length];
    questions.push({
      id: `${paperId}_q${i}`,
      subjectId: 'zoology',
      topicId: 'human_physio',
      topicName: 'Zoology',
      questionText: `Q${i}. ${zoo.q}`,
      options: zoo.opts,
      correctOptionIndex: 0,
      explanation: zoo.exp,
      difficulty: i % 2 === 0 ? 'Easy' : 'Medium'
    });
  }

  return questions;
}
