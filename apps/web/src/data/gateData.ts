import { generateQuestionsForGatePaper } from './gatePaperGenerator';

export interface GateQuestion {
  id: string;
  type: 'MCQ' | 'MSQ' | 'NAT';
  marks: 1 | 2;
  subjectId: 'aptitude' | 'technical';
  topicName: string;
  questionText: string;
  options?: string[]; // for MCQ and MSQ
  correctOptionIndices?: number[]; // array for MSQ, single item for MCQ
  correctNatValue?: number; // for NAT
  natTolerance?: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface GatePyqPaper {
  id: string;
  year: string;
  branch: string;
  totalQs: number;
  totalMarks: number;
  pdfUrl: string;
  downloadCount: number;
}

export interface GateModelPaper {
  id: string;
  title: string;
  paperNumber: number;
  branch: string;
  totalQuestions: number;
  durationMinutes: number;
  description: string;
}

export const GATE_EXAM_PATTERN = {
  examName: "Graduate Aptitude Test in Engineering (GATE)",
  conductingBody: "IISc & IITs",
  frequency: "Annually (February)",
  totalQuestions: 65,
  totalMarks: 100,
  durationMinutes: 180, // 3 Hours
  breakdown: [
    { name: "General Aptitude", totalQs: 10, totalMarks: 15, details: "5 x 1-Mark Qs + 5 x 2-Mark Qs" },
    { name: "Technical Core Subject", totalQs: 55, totalMarks: 85, details: "25 x 1-Mark Qs + 30 x 2-Mark Qs" }
  ],
  questionTypes: {
    MCQ: "Multiple Choice Question (+1/-0.33 for 1M, +2/-0.66 for 2M)",
    MSQ: "Multiple Select Question (No negative marking, no partial credit)",
    NAT: "Numerical Answer Type (Direct decimal input, no negative marking)"
  },
  specialTools: ["Official Virtual Scientific Calculator Modal"]
};

export const GATE_PYQ_PAPERS: GatePyqPaper[] = [
  { id: 'gate_2025_cs', year: '2025', branch: 'Computer Science & IT (CS)', totalQs: 65, totalMarks: 100, pdfUrl: '#', downloadCount: 31200 },
  { id: 'gate_2024_cs', year: '2024', branch: 'Computer Science & IT (CS)', totalQs: 65, totalMarks: 100, pdfUrl: '#', downloadCount: 48900 }
];

export const GATE_MODEL_PAPERS: GateModelPaper[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `gate_model_${i + 1}`,
  title: `TCS iON GATE CS Standard Mock Paper #${i + 1}`,
  paperNumber: i + 1,
  branch: 'Computer Science & IT',
  totalQuestions: 65,
  durationMinutes: 180,
  description: `Authentic GATE 65-question 100-mark simulated exam with MCQ, MSQ, NAT questions and Virtual Scientific Calculator.`
}));
