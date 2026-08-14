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

export interface JeeSubject {
  id: 'physics' | 'chemistry' | 'maths';
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

export const JEE_SUBJECTS: JeeSubject[] = [
  {
    id: 'physics',
    name: 'Physics (25 Qs / 100M)',
    totalQs: 25,
    totalMarks: 100,
    iconName: 'Zap',
    description: 'Mechanics, Electrostatics & Current, Magnetism & EMI, Optics, Modern Physics & Thermodynamics.',
    topics: [
      { id: 'mechanics', name: 'Rotational Motion & Mechanics', weightage: '28%', expectedQs: 7, importance: 'Critical', keyConcepts: ['Moment of Inertia', 'Conservation of Angular Momentum', 'Work-Energy Theorem'] },
      { id: 'electrodynamics', name: 'Electrostatics & Current Electricity', weightage: '24%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Gauss Law & Potential', 'RC Circuits & Kirchhoff Laws', 'Magnetic Field & Ampere Law'] },
      { id: 'modern_optics', name: 'Modern Physics & Wave Optics', weightage: '24%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Photoelectric Effect & de Broglie', 'Bohr Model & Nuclear Decay', 'Interference & YDSE'] }
    ],
    youtubePlaylist: {
      title: 'JEE Main & Advanced Physics Complete Course',
      channel: 'Physics Wallah (JEE Wallah)',
      url: 'https://www.youtube.com/@JEEWallah/playlists',
      videoCount: '75 Lectures'
    }
  },
  {
    id: 'chemistry',
    name: 'Chemistry (25 Qs / 100M)',
    totalQs: 25,
    totalMarks: 100,
    iconName: 'FlaskConical',
    description: 'Physical Chemistry, Inorganic Chemistry (Coordination, p-block), and Organic Chemistry (Mechanisms).',
    topics: [
      { id: 'organic', name: 'Organic Chemistry Reaction Mechanisms', weightage: '36%', expectedQs: 9, importance: 'Critical', keyConcepts: ['GOC & Aromaticity', 'Aldehydes, Ketones & Carboxylic Acids', 'SN1/SN2 & Elimination Mechanisms'] },
      { id: 'physical', name: 'Chemical Kinetics & Thermodynamics', weightage: '32%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Arrhenius Equation & Orders', 'Gibbs Free Energy & Equilibrium', 'Electrochemistry & Nernst Equation'] },
      { id: 'inorganic', name: 'Coordination Compounds & Periodic Table', weightage: '32%', expectedQs: 8, importance: 'High', keyConcepts: ['CFT & Isomerism', 'Chemical Bonding & VSEPR', 'd and f block elements'] }
    ],
    youtubePlaylist: {
      title: 'JEE Main Physical, Organic & Inorganic Chemistry',
      channel: 'Unacademy JEE Official',
      url: 'https://www.youtube.com/@UnacademyJEE/playlists',
      videoCount: '80 Lectures'
    }
  },
  {
    id: 'maths',
    name: 'Mathematics (25 Qs / 100M)',
    totalQs: 25,
    totalMarks: 100,
    iconName: 'Calculator',
    description: 'Coordinate Geometry, Calculus, Vectors & 3D, Matrices & Determinants, and Algebra.',
    topics: [
      { id: 'calculus', name: 'Integral & Differential Calculus', weightage: '36%', expectedQs: 9, importance: 'Critical', keyConcepts: ['Definite Integrals & Properties', 'Area Under Curves', 'Differential Equations', 'Continuity & Differentiability'] },
      { id: 'vectors_3d', name: 'Vectors & 3D Geometry', weightage: '24%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Dot & Cross Products', 'Shortest Distance Between Skew Lines', 'Equation of Planes'] },
      { id: 'algebra_matrices', name: 'Matrices, Determinants & Complex Numbers', weightage: '24%', expectedQs: 6, importance: 'High', keyConcepts: ['System of Linear Equations', 'Eigenvalues/Trace Properties', 'Roots of Unity'] }
    ],
    youtubePlaylist: {
      title: 'JEE Main Mathematics Master Lectures & PYQs',
      channel: 'MathonGo Official',
      url: 'https://www.youtube.com/@MathonGo/playlists',
      videoCount: '70 Lectures'
    }
  }
];

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
