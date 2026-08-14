import { generateQuestionsForSscCglPaper } from './sscCglPaperGenerator';

export interface SscQuestion {
  id: string;
  subjectId: 'reasoning' | 'ga' | 'quant' | 'english';
  topicName: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface SscPyqPaper {
  id: string;
  year: string;
  shift: string;
  totalQs: number;
  totalMarks: number;
  pdfUrl: string;
  downloadCount: number;
}

export interface SscModelPaper {
  id: string;
  title: string;
  paperNumber: number;
  difficulty: 'TCS Standard' | 'Advanced';
  totalQuestions: number;
  durationMinutes: number;
  description: string;
}

export const SSC_CGL_PATTERN = {
  examName: "SSC Combined Graduate Level (SSC CGL Tier 1)",
  conductingBody: "Staff Selection Commission (SSC)",
  frequency: "Annually",
  totalQuestions: 100, // 25 Qs per section
  totalMarks: 200,
  durationMinutes: 60, // 1 Hour
  markingScheme: {
    correct: "+2.0 Marks",
    incorrect: "-0.5 Marks (Negative Marking)"
  },
  sections: [
    { name: "General Intelligence & Reasoning", totalQs: 25, totalMarks: 50 },
    { name: "General Awareness", totalQs: 25, totalMarks: 50 },
    { name: "Quantitative Aptitude", totalQs: 25, totalMarks: 50 },
    { name: "English Comprehension", totalQs: 25, totalMarks: 50 }
  ],
  expectedCutoffs: {
    ur: "145 - 152 Marks",
    obc: "140 - 146 Marks",
    ews: "138 - 144 Marks"
  }
};

export const SSC_PYQ_PAPERS: SscPyqPaper[] = [
  { id: 'ssc_2025_t1', year: '2025', shift: 'SSC CGL 2025 Tier 1 Shift 1', totalQs: 100, totalMarks: 200, pdfUrl: '#', downloadCount: 42100 },
  { id: 'ssc_2024_t1', year: '2024', shift: 'SSC CGL 2024 Tier 1 Shift 2', totalQs: 100, totalMarks: 200, pdfUrl: '#', downloadCount: 68900 }
];

export const SSC_MODEL_PAPERS: SscModelPaper[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `ssc_model_${i + 1}`,
  title: `TCS iON SSC CGL Tier 1 Standard Mock #${i + 1}`,
  paperNumber: i + 1,
  difficulty: 'TCS Standard',
  totalQuestions: 100,
  durationMinutes: 60,
  description: `Authentic TCS iON 100-question 60-minute simulated paper for SSC CGL Tier 1.`
}));
