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
  youtubePlaylists: {
    title: string;
    channel: string;
    url: string;
    videoCount: string;
  }[];
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
    name: 'English (Paper 1 - 120 Qs)',
    paperName: 'Paper 1 (IMA/INA/AFA/OTA)',
    totalQs: 120,
    totalMarks: 100,
    iconName: 'BookOpen',
    description: 'Reading Comprehension, Spotting Errors, Sentence Improvement, Ordering of Sentences, Idioms & Phrases, Cloze Composition.',
    topics: [
      { id: 'cds_eng_grammar', name: 'Spotting Errors & Parts of Speech', weightage: '30%', expectedQs: 35, importance: 'Critical', keyConcepts: ['Subject-Verb Agreement', 'Prepositions & Phrasal Verbs', 'Direct/Indirect Speech & Active/Passive Voice'] },
      { id: 'cds_eng_vocab', name: 'Synonyms, Antonyms & Idioms', weightage: '30%', expectedQs: 35, importance: 'Critical', keyConcepts: ['UPSC standard contextual vocabulary', 'Idiomatic expressions in military context', 'Spelling accuracy'] },
      { id: 'cds_eng_para', name: 'Ordering of Sentences & RC Passages', weightage: '40%', expectedQs: 50, importance: 'Critical', keyConcepts: ['S1-S6 sequence alignment', 'Tone & Theme identification in 4+ passages', 'Cloze paragraph coherence'] }
    ],
    youtubePlaylists: [
      {
        title: 'CDS English Complete Preparation',
        channel: 'cdsjourney',
        url: 'https://www.youtube.com/@cdsjourney/playlists',
        videoCount: '45 Lectures'
      },
      {
        title: 'CDS English Marathon Series',
        channel: 'Defence Wallah CDS',
        url: 'https://www.youtube.com/@DefenceWallahCDS/playlists',
        videoCount: 'Various'
      }
    ]
  },
  {
    id: 'gk',
    name: 'General Knowledge & Science (Paper 2 - 120 Qs)',
    paperName: 'Paper 2 (IMA/INA/AFA/OTA)',
    totalQs: 120,
    totalMarks: 100,
    iconName: 'Globe',
    description: 'Physics, Chemistry, Biology (NCERT 9th-10th), Indian Polity, Modern History, Physical/Indian Geography, Defence & Current Affairs.',
    topics: [
      { id: 'cds_gk_science', name: 'General Science (Phy, Chem, Bio)', weightage: '30%', expectedQs: 36, importance: 'Critical', keyConcepts: ['Ray Optics, Electricity & Mechanics', 'Periodic Table, Acids-Bases & Metals', 'Human Physiology, Cell Biology & Genetics'] },
      { id: 'cds_gk_polity_geo', name: 'Indian Polity & World/Indian Geography', weightage: '40%', expectedQs: 48, importance: 'Critical', keyConcepts: ['Preamble, Fundamental Rights & DPSP', 'Geomorphology, Monsoon & Drainage Systems', 'Parliamentary Procedures & Constitutional Bodies'] },
      { id: 'cds_gk_history_def', name: 'Modern History, Defence & Current Affairs', weightage: '30%', expectedQs: 36, importance: 'High', keyConcepts: ['Freedom Struggle 1857-1947 & Socio-Religious Movements', 'Tri-Service Commands & Weapon Systems', 'National & International Summits'] }
    ],
    youtubePlaylists: [
      {
        title: 'CDS General Knowledge & Science Full Course',
        channel: 'Defence Wallah CDS',
        url: 'https://www.youtube.com/@DefenceWallahCDS/playlists',
        videoCount: '60 Lectures'
      }
    ]
  },
  {
    id: 'maths',
    name: 'Elementary Mathematics (Paper 3 - 100 Qs)',
    paperName: 'Paper 3 (IMA/INA/AFA Track Only)',
    totalQs: 100,
    totalMarks: 100,
    iconName: 'Calculator',
    description: 'Arithmetic, Number System, Algebra, Trigonometry, Geometry, Mensuration (2D & 3D), and Statistics.',
    topics: [
      { id: 'cds_math_geom_mens', name: 'Geometry & Mensuration (2D/3D)', weightage: '35%', expectedQs: 35, importance: 'Critical', keyConcepts: ['Circles, Triangles, Similarities & Centers', 'Prisms, Pyramids, Spheres & Cones volume/surface', 'Coordinate Geometry fundamentals'] },
      { id: 'cds_math_trig_alg', name: 'Trigonometry & Advanced Algebra', weightage: '35%', expectedQs: 35, importance: 'Critical', keyConcepts: ['Identities & Heights/Distances (Angle of elevation)', 'Quadratic equations, Remainder Theorem & Polynomials', 'Logarithms & Linear inequalities'] },
      { id: 'cds_math_num_stats', name: 'Number System, Arithmetic & Statistics', weightage: '30%', expectedQs: 30, importance: 'High', keyConcepts: ['Divisibility rules, Unit digit & Prime factorisation', 'Time-Speed-Distance & Work-Time', 'Mean, Median, Mode & Histograms'] }
    ],
    youtubePlaylists: [
      {
        title: 'CDS Elementary Mathematics Complete',
        channel: 'Defence Wallah CDS',
        url: 'https://www.youtube.com/@DefenceWallahCDS/playlists',
        videoCount: '50 Lectures'
      }
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
