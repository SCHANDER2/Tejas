import { generateQuestionsForJeeMainsPaper } from './jeeMainsPaperGenerator';

export interface JeeQuestion {
  id: string;
  subjectId: 'physics' | 'chemistry' | 'maths';
  topicId: string;
  topicName: string;
  questionType: 'MCQ' | 'NUMERICAL';
  questionText: string;
  options?: string[]; // for MCQs
  correctOptionIndex?: number; // for MCQs
  correctNumericalValue?: number; // for Numerical
  numericalTolerance?: number; // e.g. 0.01
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface JeePyqPaper {
  id: string;
  year: string;
  shift: string;
  totalQs: number;
  totalMarks: number;
  pdfUrl: string;
  downloadCount: number;
  questions?: JeeQuestion[];
}

export interface JeeModelPaper {
  id: string;
  title: string;
  paperNumber: number;
  difficulty: 'Moderate' | 'NTA Standard' | 'Advanced';
  totalQuestions: number;
  durationMinutes: number;
  pdfUrl: string;
  description: string;
  questions?: JeeQuestion[];
}

export const JEE_MAINS_PATTERN = {
  examName: "Joint Entrance Examination (JEE Main)",
  conductingBody: "National Testing Agency (NTA)",
  frequency: "Bi-annually (Session 1 in Jan, Session 2 in April)",
  totalQuestions: 75, // 25 per subject (20 MCQ + 5 Numerical)
  totalMarks: 300,
  durationMinutes: 180, // 3 Hours
  markingScheme: {
    mcqs: "+4 Marks for correct | -1 Mark for incorrect",
    numericals: "+4 Marks for correct | -1 Mark for incorrect"
  },
  expectedCutoffs: {
    general: "90 - 93 Percentile (~100-110 Marks)",
    obc: "73 - 76 Percentile",
    ews: "75 - 78 Percentile",
    sc: "50 - 54 Percentile"
  }
};

export const JEE_MAINS_PYQ_PAPERS: JeePyqPaper[] = [
  { id: 'jee_2025_jan_s1', year: '2025', shift: 'JEE Main 2025 Jan Session 1', totalQs: 75, totalMarks: 300, pdfUrl: '#', downloadCount: 15400 },
  { id: 'jee_2024_apr_s1', year: '2024', shift: 'JEE Main 2024 April Shift 1', totalQs: 75, totalMarks: 300, pdfUrl: '#', downloadCount: 22100 },
  { id: 'jee_2024_jan_s2', year: '2024', shift: 'JEE Main 2024 Jan Shift 2', totalQs: 75, totalMarks: 300, pdfUrl: '#', downloadCount: 18900 }
];

export const JEE_MAINS_MODEL_PAPERS: JeeModelPaper[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `jee_model_${i + 1}`,
  title: `NTA JEE Main Full Standard Mock #${i + 1}`,
  paperNumber: i + 1,
  difficulty: i % 3 === 0 ? 'NTA Standard' : i % 3 === 1 ? 'Moderate' : 'Advanced',
  totalQuestions: 75,
  durationMinutes: 180,
  pdfUrl: '#',
  description: `Authentic NTA JEE Main 75-Question 300-Mark simulated exam with 20 MCQs and 5 Numerical Value Questions per subject.`
}));
