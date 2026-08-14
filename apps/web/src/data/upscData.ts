import { generateQuestionsForUpscPaper } from './upscPaperGenerator';

export interface UpscQuestion {
  id: string;
  paperType: 'GS1' | 'CSAT';
  subjectId: string;
  topicName: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface UpscPyqPaper {
  id: string;
  year: string;
  shift: string;
  totalQs: number;
  totalMarks: number;
  pdfUrl: string;
  downloadCount: number;
}

export interface UpscModelPaper {
  id: string;
  title: string;
  paperNumber: number;
  paperType: 'GS1' | 'CSAT';
  difficulty: 'UPSC Standard' | 'Advanced';
  totalQuestions: number;
  durationMinutes: number;
  description: string;
}

export const UPSC_CSE_PATTERN = {
  examName: "Civil Services Examination (UPSC CSE Prelims)",
  conductingBody: "Union Public Service Commission (UPSC)",
  frequency: "Annually (May/June)",
  papers: [
    { name: "Paper 1: General Studies (GS 1)", totalQs: 100, totalMarks: 200, duration: "2 Hours", marking: "+2.0 / -0.66" },
    { name: "Paper 2: CSAT (Qualifying 33%)", totalQs: 80, totalMarks: 200, duration: "2 Hours", marking: "+2.5 / -0.83" }
  ],
  expectedCutoffs: {
    general: "88 - 95 Marks in GS 1 (with >=66 Marks in CSAT)",
    obc: "84 - 90 Marks",
    ews: "82 - 88 Marks"
  }
};

export const UPSC_PYQ_PAPERS: UpscPyqPaper[] = [
  { id: 'upsc_2025_gs1', year: '2025', shift: 'UPSC Prelims 2025 GS Paper 1', totalQs: 100, totalMarks: 200, pdfUrl: '#', downloadCount: 28400 },
  { id: 'upsc_2024_gs1', year: '2024', shift: 'UPSC Prelims 2024 GS Paper 1', totalQs: 100, totalMarks: 200, pdfUrl: '#', downloadCount: 42100 },
  { id: 'upsc_2024_csat', year: '2024', shift: 'UPSC Prelims 2024 CSAT Paper 2', totalQs: 80, totalMarks: 200, pdfUrl: '#', downloadCount: 38900 }
];

export const UPSC_MODEL_PAPERS: UpscModelPaper[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `upsc_model_${i + 1}`,
  title: `UPSC CSE Standard Mock Paper #${i + 1}`,
  paperNumber: i + 1,
  paperType: i % 2 === 0 ? 'GS1' : 'CSAT',
  difficulty: 'UPSC Standard',
  totalQuestions: i % 2 === 0 ? 100 : 80,
  durationMinutes: 120,
  description: `Authentic UPSC simulated exam with full analytical derivations for GS 1 and CSAT qualifying filters.`
}));
