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
