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

export interface UpscSubject {
  id: 'gs1' | 'csat';
  name: string;
  paperName: string;
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

export const UPSC_SUBJECTS: UpscSubject[] = [
  {
    id: 'gs1',
    name: 'Paper 1: General Studies (GS 1)',
    paperName: 'GS 1 (100 Qs / 200 Marks)',
    totalQs: 100,
    totalMarks: 200,
    iconName: 'BookOpen',
    description: 'Indian Polity & Governance, Modern Indian History & Art/Culture, Physical & Human Geography, Indian Economy & Environment Ecology.',
    topics: [
      { id: 'polity', name: 'Indian Polity, Constitution & Governance', weightage: '20%', expectedQs: 20, importance: 'Critical', keyConcepts: ['Preamble & Fundamental Rights', 'Supreme Court Judgments & Basic Structure', 'Parliamentary Privileges & Federal Structure'] },
      { id: 'environment', name: 'Environment, Ecology & Biodiversity', weightage: '20%', expectedQs: 20, importance: 'Critical', keyConcepts: ['National Parks & Wildlife Acts', 'Climate Agreements (UNFCCC, COP)', 'Threatened Species (IUCN Red List)'] },
      { id: 'economy', name: 'Indian Economy & Budget/Economic Survey', weightage: '18%', expectedQs: 18, importance: 'Critical', keyConcepts: ['Monetary Policy & Inflation', 'External Sector & Forex Reserves', 'Fiscal Deficit & Direct/Indirect Taxes'] },
      { id: 'history_geo', name: 'Modern History & Physical Geography', weightage: '25%', expectedQs: 25, importance: 'Critical', keyConcepts: ['1857-1947 Freedom Struggle', 'Geomorphology & Monsoon Patterns', 'Art & Architecture / UNESCO Sites'] }
    ],
    youtubePlaylist: {
      title: 'UPSC CSE GS Prelims Comprehensive Foundation Course',
      channel: 'Drishti IAS Official',
      url: 'https://www.youtube.com/@DrishtiIASvideos/playlists',
      videoCount: '85 Lectures'
    }
  },
  {
    id: 'csat',
    name: 'Paper 2: Civil Services Aptitude Test (CSAT)',
    paperName: 'CSAT (80 Qs / 200 Marks - Qualifying 33%)',
    totalQs: 80,
    totalMarks: 200,
    iconName: 'Brain',
    description: 'Reading Comprehension, Logical Reasoning, Analytical Ability, Basic Numeracy & Data Interpretation (Class X Level).',
    topics: [
      { id: 'rc', name: 'Reading Comprehension (Inferences & Assumptions)', weightage: '35%', expectedQs: 28, importance: 'Critical', keyConcepts: ['Crucial Message & Central Idea', 'Logical Corollaries', 'Assumption Identification'] },
      { id: 'maths_csat', name: 'Number System & Quantitative Aptitude', weightage: '35%', expectedQs: 28, importance: 'Critical', keyConcepts: ['Permutations & Combinations', 'Divisibility Rules & Remainder Theorem', 'Time & Work, Speed & Distance'] },
      { id: 'reasoning_csat', name: 'Analytical & Logical Reasoning', weightage: '30%', expectedQs: 24, importance: 'Critical', keyConcepts: ['Blood Relations & Directions', 'Seating Arrangements & Puzzles', 'Syllogisms & Data Sufficiency'] }
    ],
    youtubePlaylist: {
      title: 'UPSC CSAT Reasoning & Quantitative Aptitude Mastery',
      channel: 'StudyIQ IAS Official',
      url: 'https://www.youtube.com/@StudyIQEducationLtd/playlists',
      videoCount: '40 Lectures'
    }
  }
];

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
