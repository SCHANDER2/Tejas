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

export interface SscCglSubject {
  id: 'reasoning' | 'ga' | 'quant' | 'english';
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

export const SSC_CGL_SUBJECTS: SscCglSubject[] = [
  {
    id: 'quant',
    name: 'Quantitative Aptitude (25 Qs / 50M)',
    totalQs: 25,
    totalMarks: 50,
    iconName: 'Calculator',
    description: 'Arithmetic (Percentages, Ratio, Time & Work), Advanced Maths (Algebra, Trigonometry, Geometry, Mensuration), and DI.',
    topics: [
      { id: 'arithmetic', name: 'Arithmetic & Commercial Maths', weightage: '50%', expectedQs: 12, importance: 'Critical', keyConcepts: ['Percentages, Profit & Loss & Discount', 'Ratio & Proportion, Mixture & Alligation', 'Time & Work, Pipes & Cisterns', 'Speed, Time & Distance'] },
      { id: 'adv_maths', name: 'Algebra, Trigonometry & Geometry', weightage: '40%', expectedQs: 10, importance: 'Critical', keyConcepts: ['Algebraic Identities & Factorization', 'Trigonometric Heights & Distances', 'Circles, Triangles & Coordinate Geometry'] },
      { id: 'di', name: 'Data Interpretation (Bar/Pie/Line)', weightage: '10%', expectedQs: 3, importance: 'High', keyConcepts: ['Calculation Shortcuts', 'Averages & Ratios from Tables'] }
    ],
    youtubePlaylist: {
      title: 'SSC CGL Quantitative Aptitude Full Foundation Course',
      channel: 'Gagan Pratap Maths Official',
      url: 'https://www.youtube.com/@GaganPratapMaths/playlists',
      videoCount: '65 Lectures'
    }
  },
  {
    id: 'reasoning',
    name: 'General Intelligence & Reasoning (25 Qs / 50M)',
    totalQs: 25,
    totalMarks: 50,
    iconName: 'Brain',
    description: 'Analogies, Syllogism, Blood Relations, Coding-Decoding, Non-Verbal Series, Matrix, and Mirror Images.',
    topics: [
      { id: 'verbal_reasoning', name: 'Coding-Decoding & Number Series', weightage: '40%', expectedQs: 10, importance: 'Critical', keyConcepts: ['Letter-Number Shifting Patterns', 'Missing Number in Grid/Matrix', 'Analogy & Classification'] },
      { id: 'analytical', name: 'Syllogism, Blood Relations & Directions', weightage: '35%', expectedQs: 9, importance: 'Critical', keyConcepts: ['Venn Diagrams & Deduction', 'Family Tree Notation', 'Compass Degrees & Distance'] },
      { id: 'non_verbal', name: 'Paper Folding, Mirror Images & Embedded Figures', weightage: '25%', expectedQs: 6, importance: 'High', keyConcepts: ['Lateral Inversion', 'Pattern Completion'] }
    ],
    youtubePlaylist: {
      title: 'SSC CGL General Intelligence & Reasoning Masterclass',
      channel: 'Piyush Varshney Reasoning Official',
      url: 'https://www.youtube.com/@PiyushVarshneyReasoning/playlists',
      videoCount: '45 Lectures'
    }
  },
  {
    id: 'english',
    name: 'English Comprehension (25 Qs / 50M)',
    totalQs: 25,
    totalMarks: 50,
    iconName: 'BookOpen',
    description: 'Spotting Errors, Fill in the blanks, Idioms & Phrases, One Word Substitution, Sentence Improvement, Cloze Test.',
    topics: [
      { id: 'grammar', name: 'Error Spotting & Sentence Improvement', weightage: '40%', expectedQs: 10, importance: 'Critical', keyConcepts: ['Subject-Verb Agreement', 'Prepositions & Conjunctions', 'Active-Passive & Direct-Indirect'] },
      { id: 'vocab', name: 'Idioms, Synonyms & One-Word Substitution', weightage: '40%', expectedQs: 10, importance: 'Critical', keyConcepts: ['Blackbook Top 500 Vocab', 'High-frequency SSC Idioms'] },
      { id: 'cloze', name: 'Cloze Test & Reading Passage', weightage: '20%', expectedQs: 5, importance: 'High', keyConcepts: ['Contextual Vocabulary', 'Collocations & Phrasal Verbs'] }
    ],
    youtubePlaylist: {
      title: 'SSC CGL English Grammar & Vocab Plinth to Paramount',
      channel: 'Nimisha Bansal Official',
      url: 'https://www.youtube.com/@NimishaBansal/playlists',
      videoCount: '50 Lectures'
    }
  },
  {
    id: 'ga',
    name: 'General Awareness (25 Qs / 50M)',
    totalQs: 25,
    totalMarks: 50,
    iconName: 'Shield',
    description: 'History, Polity, Geography, Economics, General Science (Phy/Chem/Bio), and Static GK & Current Affairs.',
    topics: [
      { id: 'static_gk', name: 'Indian Art, Culture, Dances & Festivals', weightage: '30%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Folk Dances & Musical Instruments', 'Census 2011 & Sports Awards', 'Monuments & Temple Architecture'] },
      { id: 'polity_history', name: 'Indian Constitution & Modern History', weightage: '35%', expectedQs: 9, importance: 'Critical', keyConcepts: ['Articles, Schedules & Writs', 'Governor General & 1857 Revolts', 'Dynasties & Inscriptions'] },
      { id: 'science_cur', name: 'General Science & Monthly Current Affairs', weightage: '35%', expectedQs: 8, importance: 'High', keyConcepts: ['Vitamins & Human Diseases', 'Chemical Names & Formulae', 'Government Schemes & Summits'] }
    ],
    youtubePlaylist: {
      title: 'SSC CGL Static GK & Current Affairs Marathon Series',
      channel: 'Parcham Classes Official',
      url: 'https://www.youtube.com/@ParchamClasses/playlists',
      videoCount: '48 Lectures'
    }
  }
];

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
