import { generateQuestionsForCatPaper } from './catPaperGenerator';

export interface CatQuestion {
  id: string;
  type: 'MCQ' | 'TITA'; // TITA = Type In The Answer
  sectionId: 'varc' | 'dilr' | 'qa';
  sectionName: string;
  questionText: string;
  options?: string[]; // for MCQs
  correctOptionIndex?: number; // for MCQs
  correctTitaValue?: string; // for TITA
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface CatPyqPaper {
  id: string;
  year: string;
  slot: string;
  totalQs: number;
  totalMarks: number;
  pdfUrl: string;
  downloadCount: number;
}

export interface CatModelPaper {
  id: string;
  title: string;
  paperNumber: number;
  difficulty: 'IIM Standard' | 'Advanced';
  totalQuestions: number;
  durationMinutes: number;
  description: string;
}

export interface CatSubject {
  id: 'varc' | 'dilr' | 'qa';
  name: string;
  totalQs: number;
  totalMarks: number;
  iconName: string;
  description: string;
  topics: { id: string; name: string; weightage: string; expectedQs: number; importance: 'High' | 'Medium' | 'Critical'; keyConcepts: string[] }[];
  youtubePlaylists: {
    title: string;
    channel: string;
    url: string;
    videoCount: string;
  }[];
}

export const CAT_SUBJECTS: CatSubject[] = [
  {
    id: 'varc',
    name: 'Verbal Ability & Reading Comprehension (VARC - 24 Qs)',
    totalQs: 24,
    totalMarks: 72,
    iconName: 'BookOpen',
    description: 'Reading Comprehension Passages (16 Qs across 4 RC passages) + Verbal Ability (Para Jumbles, Para Summary, Odd Sentence Out).',
    topics: [
      { id: 'rc_passages', name: 'Reading Comprehension (Philosophy, Economics, Tech)', weightage: '66%', expectedQs: 16, importance: 'Critical', keyConcepts: ['Main Idea & Authors Tone', 'Inferential & Critical Reasoning', 'Detail & Exception Questions'] },
      { id: 'para_jumbles', name: 'Para Jumbles & Summary (TITA & MCQ)', weightage: '34%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Mandatory Pairs & Chronology', 'Distortion vs Generalization in Summary', 'Odd Sentence Out Logic'] }
    ],
    youtubePlaylists: [
      {
        title: 'CAT VARC Strategy & Practice',
        channel: '2IIM CAT Preparation',
        url: 'https://www.youtube.com/@2iimcat/playlists',
        videoCount: '42 Lectures'
      }
    ]
  },
  {
    id: 'dilr',
    name: 'Data Interpretation & Logical Reasoning (DILR - 20 Qs)',
    totalQs: 20,
    totalMarks: 60,
    iconName: 'Brain',
    description: '4 Multi-question Sets (5 Qs each) covering Games & Tournaments, Matrix Arrangements, Routes & Networks, and Caselets.',
    topics: [
      { id: 'arrangements_games', name: 'Games, Tournaments & Matrix Grid Sets', weightage: '50%', expectedQs: 10, importance: 'Critical', keyConcepts: ['Round-robin & Knockout Tables', 'Grid Filling with Constraints', 'True-False & Binary Logic'] },
      { id: 'di_networks', name: 'Venn Diagrams & Routes/Networks', weightage: '50%', expectedQs: 10, importance: 'Critical', keyConcepts: ['3 & 4-Set Venn Maxima/Minima', 'Critical Path & Network Flow', 'Data Sufficiency & Caselets'] }
    ],
    youtubePlaylists: [
      {
        title: 'CAT DILR Complete LRDI Series',
        channel: 'Elites Grid CAT Prep',
        url: 'https://www.youtube.com/@elitesgridCAT/playlists',
        videoCount: '48 Lectures'
      }
    ]
  },
  {
    id: 'qa',
    name: 'Quantitative Aptitude (QA - 22 Qs)',
    totalQs: 22,
    totalMarks: 66,
    iconName: 'Calculator',
    description: 'Arithmetic (Percentages, TSD, Time & Work), Algebra (Quadratics, Functions, Logs), Geometry & Modern Maths.',
    topics: [
      { id: 'arithmetic_qa', name: 'Arithmetic Mastery (TSD, Work, Profit)', weightage: '40%', expectedQs: 9, importance: 'Critical', keyConcepts: ['Relative Speed, Escalators & Races', 'Mixtures & Replacement Formulae', 'Compound Interest & Installments'] },
      { id: 'algebra_qa', name: 'Algebra, Functions, Graphs & Logs', weightage: '35%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Maxima/Minima of Quadratics', 'Modulus Equations & Inequalities', 'Logarithms & Sequence-Series (AP/GP/HP)'] },
      { id: 'geometry_qa', name: 'Geometry, Mensuration & Number System', weightage: '25%', expectedQs: 5, importance: 'High', keyConcepts: ['Circles & Tangent Theorems', 'Coordinate Geometry & Coordinate Area', 'Base System & Remainder Theorems'] }
    ],
    youtubePlaylists: [
      {
        title: 'Quantitative Aptitude for CAT — Complete Syllabus',
        channel: 'Rodha',
        url: 'https://www.youtube.com/playlist?list=PLG4bwc5fquzgfMh4YFDnv7fttM0RIKiUQ',
        videoCount: '60 Lectures'
      },
      {
        title: 'CAT Quant Practice by 2IIM',
        channel: '2IIM CAT Preparation',
        url: 'https://www.youtube.com/@2iimcat/playlists',
        videoCount: '60 Lectures'
      }
    ]
  }
];

export const CAT_EXAM_PATTERN = {
  examName: "Common Admission Test (CAT)",
  conductingBody: "Indian Institutes of Management (IIMs)",
  frequency: "Annually (November)",
  totalQuestions: 66,
  totalMarks: 198,
  durationMinutes: 120, // 2 Hours (40m per section)
  sectionalTimers: [
    { id: 'varc', name: 'Section 1: VARC', totalQs: 24, totalMarks: 72, duration: "40 Minutes (Strict Lock)" },
    { id: 'dilr', name: 'Section 2: DILR', totalQs: 20, totalMarks: 60, duration: "40 Minutes (Strict Lock)" },
    { id: 'qa', name: 'Section 3: QA', totalQs: 22, totalMarks: 66, duration: "40 Minutes (Strict Lock)" }
  ],
  markingScheme: {
    mcqs: "+3.0 Marks for correct | -1.0 Mark for incorrect",
    tita: "+3.0 Marks for correct | 0 Marks for incorrect (No negative)"
  },
  expectedPercentiles: {
    iimAhmedabad: "99.8+ Percentile",
    iimBangaloreCalcutta: "99.5+ Percentile",
    newIIMs: "95+ Percentile"
  }
};

export const CAT_PYQ_PAPERS: CatPyqPaper[] = [
  { id: 'cat_2025_s1', year: '2025', slot: 'CAT 2025 Slot 1', totalQs: 66, totalMarks: 198, pdfUrl: '#', downloadCount: 41200 },
  { id: 'cat_2024_s2', year: '2024', slot: 'CAT 2024 Slot 2', totalQs: 66, totalMarks: 198, pdfUrl: '#', downloadCount: 52000 }
];

export const CAT_MODEL_PAPERS: CatModelPaper[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `cat_model_${i + 1}`,
  title: `IIM CAT Standard Mock Paper #${i + 1}`,
  paperNumber: i + 1,
  difficulty: 'IIM Standard',
  totalQuestions: 66,
  durationMinutes: 120,
  description: `Authentic CAT 66-question paper with 40-minute strict sectional timer locking across VARC, DILR, and QA.`
}));
