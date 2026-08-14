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

export interface GateSubject {
  id: 'aptitude' | 'maths' | 'technical';
  name: string;
  totalQs: number;
  totalMarks: number;
  iconName: string;
  description: string;
  topics: { id: string; name: string; weightage: string; expectedQs: number; importance: 'High' | 'Medium' | 'Critical'; keyConcepts: string[] }[];
  youtubePlaylist: {
    title: string;
    channel: string;
    url: string;
    videoCount: string;
  };
}

export const GATE_SUBJECTS: GateSubject[] = [
  {
    id: 'aptitude',
    name: 'General Aptitude (10 Qs / 15M)',
    totalQs: 10,
    totalMarks: 15,
    iconName: 'Brain',
    description: 'Verbal Ability (Grammar & Vocabulary) and Numerical Ability (Quant, Reasoning & Spatial Aptitude).',
    topics: [
      { id: 'numerical_aptitude', name: 'Numerical Computation & Estimation', weightage: '50%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Percentages, Ratios & Powers', 'Logarithms & Permutations', 'Data Interpretation'] },
      { id: 'verbal_spatial', name: 'Verbal Deduction & Spatial Reasoning', weightage: '50%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Grammar & Word Analogy', 'Mirror Images & Paper Folding', 'Critical Reasoning'] }
    ],
    youtubePlaylist: {
      title: 'GATE General Aptitude Numerical & Verbal Ability',
      channel: 'Gate Smashers Official',
      url: 'https://www.youtube.com/@GateSmashers/playlists',
      videoCount: '30 Lectures'
    }
  },
  {
    id: 'maths',
    name: 'Engineering Mathematics (13M - 15M)',
    totalQs: 8,
    totalMarks: 13,
    iconName: 'Calculator',
    description: 'Linear Algebra, Calculus, Differential Equations, Complex Variables, Probability and Statistics.',
    topics: [
      { id: 'linear_algebra', name: 'Matrices, Eigenvalues & Eigenvectors', weightage: '35%', expectedQs: 3, importance: 'Critical', keyConcepts: ['Cayley-Hamilton Theorem', 'Rank of Matrix & System of Equations', 'Diagonalization'] },
      { id: 'calculus_de', name: 'Calculus & Differential Equations', weightage: '35%', expectedQs: 3, importance: 'Critical', keyConcepts: ['Maxima/Minima & Mean Value Theorems', 'First Order DE & Integrating Factor', 'Vector Calculus (Greens/Stokes Theorems)'] },
      { id: 'prob_stats', name: 'Probability & Numerical Methods', weightage: '30%', expectedQs: 2, importance: 'High', keyConcepts: ['Bayes Theorem & Poisson Distribution', 'Newton-Raphson Method'] }
    ],
    youtubePlaylist: {
      title: 'GATE Engineering Mathematics Master Course',
      channel: 'GATE Wallah Official',
      url: 'https://www.youtube.com/@GATEWallah_PW/playlists',
      videoCount: '50 Lectures'
    }
  },
  {
    id: 'technical',
    name: 'Technical Core (CS/IT/Core Engg - 72M)',
    totalQs: 47,
    totalMarks: 72,
    iconName: 'Zap',
    description: 'Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Theory of Computation, and Computer Organization.',
    topics: [
      { id: 'dsa', name: 'Algorithms, Data Structures & C Programming', weightage: '25%', expectedQs: 12, importance: 'Critical', keyConcepts: ['Asymptotic Analysis & Recurrences', 'Dynamic Programming & Greedy Algorithms', 'Trees, Graphs & Heaps'] },
      { id: 'os_dbms', name: 'Operating Systems & DBMS', weightage: '25%', expectedQs: 12, importance: 'Critical', keyConcepts: ['Virtual Memory & Paging', 'Deadlocks & Semaphores', 'SQL & Normalization (BCNF/3NF)', 'Transactions & Concurrency Control'] },
      { id: 'toc_cn', name: 'TOC, Compiler Design & Computer Networks', weightage: '30%', expectedQs: 14, importance: 'Critical', keyConcepts: ['Regular Expressions & DFA/NFA', 'Turing Machines & Decidability', 'TCP/IP, Flow Control (Sliding Window)', 'Routing & Subnetting'] }
    ],
    youtubePlaylist: {
      title: 'GATE CS/IT Data Structures, Algorithms & Systems',
      channel: 'Gate Smashers Official',
      url: 'https://www.youtube.com/@GateSmashers/playlists',
      videoCount: '90 Lectures'
    }
  }
];

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
