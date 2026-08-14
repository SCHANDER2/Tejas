import { generateQuestionsForNeetPaper } from './neetPaperGenerator';

export interface NeetQuestion {
  id: string;
  subjectId: 'physics' | 'chemistry' | 'botany' | 'zoology';
  topicId: string;
  topicName: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface NeetPyqPaper {
  id: string;
  year: string;
  shift: string;
  totalQs: number;
  totalMarks: number;
  pdfUrl: string;
  downloadCount: number;
  questions?: NeetQuestion[];
}

export interface NeetModelPaper {
  id: string;
  title: string;
  paperNumber: number;
  difficulty: 'Moderate' | 'NTA Standard' | 'Advanced';
  totalQuestions: number;
  durationMinutes: number;
  pdfUrl: string;
  description: string;
  questions?: NeetQuestion[];
}

export const NEET_UG_PATTERN = {
  examName: "National Eligibility cum Entrance Test (NEET UG)",
  conductingBody: "National Testing Agency (NTA)",
  frequency: "Annually (May)",
  totalQuestions: 180, // out of 200
  totalMarks: 720,
  durationMinutes: 200, // 3h 20m
  markingScheme: {
    correct: "+4 Marks",
    incorrect: "-1 Mark (Negative Marking)"
  },
  sections: [
    { name: "Physics", totalQs: 45, totalMarks: 180 },
    { name: "Chemistry", totalQs: 45, totalMarks: 180 },
    { name: "Botany", totalQs: 45, totalMarks: 180 },
    { name: "Zoology", totalQs: 45, totalMarks: 180 }
  ],
  expectedCutoffs: {
    aiimsDelhi: "710 - 720 Marks",
    topGovernmentMedicalColleges: "650 - 675 Marks",
    stateQuotaGovt: "600 - 620 Marks"
  }
};

export const NEET_PYQ_PAPERS: NeetPyqPaper[] = [
  { id: 'neet_2025', year: '2025', shift: 'NEET UG 2025 Full Paper', totalQs: 180, totalMarks: 720, pdfUrl: '#', downloadCount: 38900 },
  { id: 'neet_2024', year: '2024', shift: 'NEET UG 2024 Full Paper', totalQs: 180, totalMarks: 720, pdfUrl: '#', downloadCount: 45200 },
  { id: 'neet_2023', year: '2023', shift: 'NEET UG 2023 Full Paper', totalQs: 180, totalMarks: 720, pdfUrl: '#', downloadCount: 51000 }
];

export const NEET_MODEL_PAPERS: NeetModelPaper[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `neet_model_${i + 1}`,
  title: `NTA NEET UG Standard Mock Paper #${i + 1}`,
  paperNumber: i + 1,
  difficulty: i % 3 === 0 ? 'NTA Standard' : i % 3 === 1 ? 'Moderate' : 'Advanced',
  totalQuestions: 180,
  durationMinutes: 200,
  pdfUrl: '#',
  description: `Authentic NEET UG 180-Question 720-Mark simulated exam with Physics (45 Qs), Chemistry (45 Qs), Botany (45 Qs), and Zoology (45 Qs).`
}));
