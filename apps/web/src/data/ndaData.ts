import { generateQuestionsForNdaPaper } from './ndaPaperGenerator';

export interface NdaTopic {
  id: string;
  name: string;
  weightage: string;
  expectedQs: number;
  importance: 'High' | 'Medium' | 'Critical';
  keyConcepts: string[];
}

export interface NdaSubject {
  id: string;
  name: string;
  paperName: string;
  totalQs: number;
  totalMarks: number;
  iconName: string;
  description: string;
  topics: NdaTopic[];
  youtubePlaylists: {
    title: string;
    channel: string;
    url: string;
    videoCount: string;
  }[];
}

export interface NdaPyqPaper {
  id: string;
  year: string;
  shift: string;
  totalQs: number;
  totalMarks: number;
  pdfUrl: string;
  downloadCount: number;
  questions?: NdaQuestion[];
}

export interface NdaModelPaper {
  id: string;
  title: string;
  paperNumber: number;
  difficulty: 'Moderate' | 'UPSC Standard' | 'Advanced';
  totalQuestions: number;
  durationMinutes: number;
  pdfUrl: string;
  description: string;
  questions?: NdaQuestion[];
}

export interface NdaQuestion {
  id: string;
  subjectId: 'maths' | 'gat_english' | 'gat_science_gk';
  topicId: string;
  topicName: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const NDA_EXAM_PATTERN = {
  examName: "National Defence Academy & Naval Academy (NDA & NA)",
  conductingBody: "Union Public Service Commission (UPSC)",
  frequency: "Bi-annually (NDA 1 in April, NDA 2 in Sept)",
  totalQuestions: 270,
  totalMarks: 900,
  durationMinutes: 300, // 2 x 2.5h
  papers: [
    { name: "Paper 1: Mathematics", totalQs: 120, totalMarks: 300, duration: "2.5 Hours", marking: "+2.5 / -0.833" },
    { name: "Paper 2: General Ability Test (GAT)", totalQs: 150, totalMarks: 600, duration: "2.5 Hours", marking: "+4.0 / -1.333" }
  ],
  expectedCutoff: "355 - 365 Marks out of 900 (with min 25% sectional qualification in each paper)"
};

export const NDA_SUBJECTS: NdaSubject[] = [
  {
    id: 'maths',
    name: 'Mathematics (Paper 1)',
    paperName: 'Paper 1 (300 Marks)',
    totalQs: 120,
    totalMarks: 300,
    iconName: 'Calculator',
    description: 'Algebra, Matrices & Determinants, Trigonometry, Analytical Geometry (2D & 3D), Differential & Integral Calculus, Vector Algebra, Statistics & Probability.',
    topics: [
      { id: 'calculus', name: 'Differential & Integral Calculus', weightage: '25%', expectedQs: 30, importance: 'Critical', keyConcepts: ['Limits & Continuity', 'Derivatives & Maxima/Minima', 'Definite Integrals', 'Differential Equations'] },
      { id: 'trig', name: 'Trigonometry', weightage: '15%', expectedQs: 18, importance: 'Critical', keyConcepts: ['Angles & Ratios', 'Inverse Trig Functions', 'Heights and Distances'] },
      { id: 'algebra', name: 'Algebra & Matrices', weightage: '20%', expectedQs: 24, importance: 'High', keyConcepts: ['Complex Numbers', 'Quadratic Equations', 'Permutations & Combinations', 'Determinants & Inverse Matrix'] },
      { id: 'prob', name: 'Probability & Statistics', weightage: '15%', expectedQs: 18, importance: 'High', keyConcepts: ['Conditional Probability', 'Binomial Distribution', 'Mean, Variance & SD'] }
    ],
    youtubePlaylists: [
      {
        title: 'NDA Mathematics (Shakti Series)',
        channel: 'Defence Wallah',
        url: 'https://www.youtube.com/@DefenceWallahPW/playlists',
        videoCount: '60 Lectures'
      }
    ]
  },
  {
    id: 'gat_english',
    name: 'GAT Part A: English',
    paperName: 'Paper 2 Part A (200 Marks)',
    totalQs: 50,
    totalMarks: 200,
    iconName: 'BookOpen',
    description: 'Grammar, vocabulary, spotting errors, sentence improvement, comprehension, antonyms & synonyms.',
    topics: [
      { id: 'errors', name: 'Spotting Errors & Grammar', weightage: '30%', expectedQs: 15, importance: 'Critical', keyConcepts: ['Prepositions & Conjunctions', 'Subject-Verb Agreement', 'Active/Passive Voice'] },
      { id: 'syn_ant', name: 'Synonyms & Antonyms', weightage: '40%', expectedQs: 20, importance: 'Critical', keyConcepts: ['Contextual vocabulary', 'High-yield UPSC words'] }
    ],
    youtubePlaylists: [
      {
        title: 'NDA English Complete Preparation',
        channel: 'Defence Wallah',
        url: 'https://www.youtube.com/@DefenceWallahPW/playlists',
        videoCount: '40 Lectures'
      }
    ]
  },
  {
    id: 'gat_science_gk',
    name: 'GAT Part B: General Knowledge & Science',
    paperName: 'Paper 2 Part B (400 Marks)',
    totalQs: 100,
    totalMarks: 400,
    iconName: 'Shield',
    description: 'Physics (100M), Chemistry (60M), General Science / Bio (40M), History, Geography, and Current Affairs (200M).',
    topics: [
      { id: 'physics', name: 'Physics (Mechanics, Optics, Electricity)', weightage: '25%', expectedQs: 25, importance: 'Critical', keyConcepts: ['Laws of Motion & Gravitation', 'Ray Optics & Lenses', 'Ohm’s Law & Circuits'] },
      { id: 'chem_bio', name: 'Chemistry & Biology', weightage: '25%', expectedQs: 25, importance: 'High', keyConcepts: ['Acids, Bases, Salts', 'Structure of Atom', 'Human Physiology & Nutrition'] },
      { id: 'history_geo', name: 'History, Geography & Current Affairs', weightage: '50%', expectedQs: 50, importance: 'Critical', keyConcepts: ['Indian National Movement', 'Physical Geography & Monsoons', 'Defence Deals & Exercises'] }
    ],
    youtubePlaylists: [
      {
        title: 'NDA GAT Science & GK Full Series',
        channel: 'Defence Wallah',
        url: 'https://www.youtube.com/@DefenceWallahPW/playlists',
        videoCount: '52 Lectures'
      }
    ]
  }
];

export const NDA_PYQ_PAPERS: NdaPyqPaper[] = [
  { id: 'nda_2025_1', year: '2025', shift: 'NDA 1 2025 Complete Paper', totalQs: 270, totalMarks: 900, pdfUrl: '#', downloadCount: 5410 },
  { id: 'nda_2024_2', year: '2024', shift: 'NDA 2 2024 Complete Paper', totalQs: 270, totalMarks: 900, pdfUrl: '#', downloadCount: 12400 },
  { id: 'nda_2024_1', year: '2024', shift: 'NDA 1 2024 Complete Paper', totalQs: 270, totalMarks: 900, pdfUrl: '#', downloadCount: 9800 }
];

export const NDA_MODEL_PAPERS: NdaModelPaper[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `nda_model_${i + 1}`,
  title: `NDA & NA Full Standard Mock Paper #${i + 1}`,
  paperNumber: i + 1,
  difficulty: i % 3 === 0 ? 'UPSC Standard' : i % 3 === 1 ? 'Moderate' : 'Advanced',
  totalQuestions: 270,
  durationMinutes: 300,
  pdfUrl: '#',
  description: `Authentic NDA 270-Question 900-Mark simulated exam with Paper 1 Maths (120 Qs) and Paper 2 GAT (150 Qs).`
}));
