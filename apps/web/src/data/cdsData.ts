import { generateQuestionsForCdsPaper } from './cdsPaperGenerator';

export interface CdsTopic {
  id: string;
  name: string;
  weightage: string;
  expectedQs: number;
  importance: 'High' | 'Medium' | 'Critical';
  keyConcepts: string[];
}

export interface CdsSubject {
  id: string;
  name: string;
  paperName: string;
  totalQs: number;
  totalMarks: number;
  iconName: string;
  description: string;
  topics: CdsTopic[];
}

export interface CdsPyqPaper {
  id: string;
  year: string;
  paperType: 'IMA' | 'OTA';
  shift: string;
  totalQs: number;
  totalMarks: number;
  pdfUrl: string;
  downloadCount: number;
  questions?: CdsQuestion[];
}

export interface CdsModelPaper {
  id: string;
  title: string;
  paperNumber: number;
  track: 'IMA' | 'OTA';
  difficulty: 'Moderate' | 'UPSC Standard' | 'Advanced';
  totalQuestions: number;
  durationMinutes: number;
  pdfUrl: string;
  description: string;
  questions?: CdsQuestion[];
}

export interface CdsQuestion {
  id: string;
  subjectId: 'english' | 'gk' | 'maths';
  topicId: string;
  topicName: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const CDS_EXAM_PATTERN = {
  examName: "Combined Defence Services (CDS)",
  conductingBody: "Union Public Service Commission (UPSC)",
  frequency: "Bi-annually (CDS 1 in April, CDS 2 in Sept)",
  tracks: {
    IMA: {
      name: "Indian Military Academy / INA / AFA",
      totalPapers: 3,
      totalQuestions: 340,
      totalMarks: 300,
      durationMinutes: 360, // 3 x 2h
      papers: ["English (120 Qs / 100M)", "General Knowledge (120 Qs / 100M)", "Elementary Mathematics (100 Qs / 100M)"]
    },
    OTA: {
      name: "Officers Training Academy (Men & Women)",
      totalPapers: 2,
      totalQuestions: 240,
      totalMarks: 200,
      durationMinutes: 240, // 2 x 2h
      papers: ["English (120 Qs / 100M)", "General Knowledge (120 Qs / 100M)"]
    }
  },
  markingScheme: {
    englishAndGk: "+0.833 Marks for correct | -0.27 Marks for incorrect",
    mathematics: "+1.0 Mark for correct | -0.33 Marks for incorrect"
  },
  expectedCutoffs: {
    IMA: "135 - 145 Marks out of 300",
    OTA: "100 - 110 Marks out of 200",
    AFA: "148 - 158 Marks out of 300",
    INA: "128 - 138 Marks out of 300"
  }
};

export const CDS_SUBJECTS: CdsSubject[] = [
  {
    id: 'english',
    name: 'English Language & Comprehension',
    paperName: 'Paper I (100 Marks)',
    totalQs: 120,
    totalMarks: 100,
    iconName: 'BookOpen',
    description: 'UPSC CDS English tests vocabulary, reading comprehension, ordering of sentences, and grammar rules.',
    topics: [
      { id: 'spotting_errors', name: 'Spotting Errors', weightage: '15%', expectedQs: 15, importance: 'Critical', keyConcepts: ['Subject-Verb Agreement', 'Prepositions', 'Tenses', 'Conditionals'] },
      { id: 'sentence_ordering', name: 'Ordering of Sentences (PQRSS)', weightage: '15%', expectedQs: 15, importance: 'Critical', keyConcepts: ['Logical flow', 'Pronoun references', 'Chronological linkers'] },
      { id: 'idioms_phrases', name: 'Idioms & Phrases', weightage: '10%', expectedQs: 10, importance: 'High', keyConcepts: ['Defence context idioms', 'Classical proverbs', 'Phrasal verbs'] },
      { id: 'reading_comp', name: 'Reading Comprehension', weightage: '20%', expectedQs: 20, importance: 'Critical', keyConcepts: ['Passage central theme', 'Inference', 'Tone analysis'] }
    ]
  },
  {
    id: 'gk',
    name: 'General Knowledge & Science',
    paperName: 'Paper II (100 Marks)',
    totalQs: 120,
    totalMarks: 100,
    iconName: 'Shield',
    description: 'Comprehensive coverage of History, Polity, Geography, General Science (Physics/Chem/Bio), and Defence Current Affairs.',
    topics: [
      { id: 'polity', name: 'Indian Polity & Constitution', weightage: '18%', expectedQs: 20, importance: 'Critical', keyConcepts: ['Fundamental Rights', 'Preamble', 'President & PM powers', 'Constitutional Amendments'] },
      { id: 'history', name: 'Indian History & National Movement', weightage: '20%', expectedQs: 22, importance: 'Critical', keyConcepts: ['Freedom Struggle 1857-1947', 'Ancient Empires', 'Medieval Administration'] },
      { id: 'geography', name: 'Physical & Indian Geography', weightage: '18%', expectedQs: 20, importance: 'High', keyConcepts: ['Monsoons & Climate', 'River Systems', 'Himalayan Passages', 'Soil & Vegetation'] },
      { id: 'science', name: 'General Science (Phy/Chem/Bio)', weightage: '25%', expectedQs: 30, importance: 'Critical', keyConcepts: ['Optics & Mechanics', 'Chemical Reactions & Metals', 'Human Physiology & Cell Biology'] }
    ]
  },
  {
    id: 'maths',
    name: 'Elementary Mathematics (IMA/INA/AFA)',
    paperName: 'Paper III (100 Marks)',
    totalQs: 100,
    totalMarks: 100,
    iconName: 'Calculator',
    description: 'Arithmetic, Algebra, Trigonometry, Geometry, Mensuration, and Basic Statistics.',
    topics: [
      { id: 'trigonometry', name: 'Trigonometry & Heights', weightage: '18%', expectedQs: 18, importance: 'Critical', keyConcepts: ['Identities sin²θ+cos²θ=1', 'Heights and Distances', 'Radian measures'] },
      { id: 'geometry', name: 'Geometry (Lines, Triangles, Circles)', weightage: '22%', expectedQs: 22, importance: 'Critical', keyConcepts: ['Congruence & Similarity', 'Circles & Tangents', 'Centroid & Incenter'] },
      { id: 'mensuration', name: 'Mensuration 2D & 3D', weightage: '20%', expectedQs: 20, importance: 'High', keyConcepts: ['Surface Area & Volume of Cones/Spheres', 'Prisms & Pyramids'] },
      { id: 'arithmetic', name: 'Number System & Arithmetic', weightage: '25%', expectedQs: 25, importance: 'High', keyConcepts: ['HCF & LCM', 'Percentages & Profit Loss', 'Time & Speed'] }
    ]
  }
];

export const CDS_PYQ_PAPERS: CdsPyqPaper[] = [
  { id: 'cds_2025_1', year: '2025', paperType: 'IMA', shift: 'CDS 1 2025 Full Paper', totalQs: 340, totalMarks: 300, pdfUrl: '#', downloadCount: 4120 },
  { id: 'cds_2024_2', year: '2024', paperType: 'IMA', shift: 'CDS 2 2024 Full Paper', totalQs: 340, totalMarks: 300, pdfUrl: '#', downloadCount: 8930 },
  { id: 'cds_2024_1', year: '2024', paperType: 'OTA', shift: 'CDS 1 2024 OTA Paper', totalQs: 240, totalMarks: 200, pdfUrl: '#', downloadCount: 6510 },
  { id: 'cds_2023_2', year: '2023', paperType: 'IMA', shift: 'CDS 2 2023 Full Paper', totalQs: 340, totalMarks: 300, pdfUrl: '#', downloadCount: 11200 }
];

export const CDS_MODEL_PAPERS: CdsModelPaper[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `cds_model_${i + 1}`,
  title: `CDS Standard Full Mock Paper #${i + 1}`,
  paperNumber: i + 1,
  track: i % 2 === 0 ? 'IMA' : 'OTA',
  difficulty: i % 3 === 0 ? 'UPSC Standard' : i % 3 === 1 ? 'Moderate' : 'Advanced',
  totalQuestions: i % 2 === 0 ? 340 : 240,
  durationMinutes: i % 2 === 0 ? 360 : 240,
  pdfUrl: '#',
  description: `Authentic CDS simulated exam paper with UPSC difficulty standard and complete step-by-step solutions.`
}));
