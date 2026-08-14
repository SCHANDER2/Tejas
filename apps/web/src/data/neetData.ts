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

export interface NeetSubject {
  id: 'physics' | 'chemistry' | 'botany' | 'zoology';
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

export const NEET_SUBJECTS: NeetSubject[] = [
  {
    id: 'physics',
    name: 'Physics (45 Qs / 180M)',
    totalQs: 45,
    totalMarks: 180,
    iconName: 'Zap',
    description: 'Mechanics, Electrodynamics, Optics, Thermodynamics, Modern Physics & Semiconductors.',
    topics: [
      { id: 'mechanics', name: 'Laws of Motion & Work-Energy', weightage: '22%', expectedQs: 10, importance: 'Critical', keyConcepts: ['Friction & Circular Motion', 'Rotational Dynamics', 'Gravitation & Keplers Laws'] },
      { id: 'electrodynamics', name: 'Current Electricity & Magnetism', weightage: '24%', expectedQs: 11, importance: 'Critical', keyConcepts: ['Kirchhoff Laws & Potentiometer', 'Magnetic Effect of Current', 'Electromagnetic Induction & AC'] },
      { id: 'optics_modern', name: 'Ray Optics & Modern Physics', weightage: '24%', expectedQs: 11, importance: 'Critical', keyConcepts: ['Lenses & Prisms Formulae', 'Photoelectric Effect', 'Radioactivity & Dual Nature'] }
    ],
    youtubePlaylist: {
      title: 'NEET UG Physics Complete NCERT Line-by-Line',
      channel: 'Competition Wallah (PW)',
      url: 'https://www.youtube.com/@Competition_Wallah/playlists',
      videoCount: '65 Lectures'
    }
  },
  {
    id: 'chemistry',
    name: 'Chemistry (45 Qs / 180M)',
    totalQs: 45,
    totalMarks: 180,
    iconName: 'FlaskConical',
    description: 'NCERT Organic Chemistry, Coordination Chemistry, Chemical Equilibrium & Thermodynamics.',
    topics: [
      { id: 'organic', name: 'NCERT Organic Chemistry & Biomolecules', weightage: '35%', expectedQs: 16, importance: 'Critical', keyConcepts: ['GOC & Reaction Intermediates', 'Named Reactions (Aldol, Cannizzaro)', 'Biomolecules & Polymers'] },
      { id: 'inorganic', name: 'Periodic Table & Coordination Chemistry', weightage: '33%', expectedQs: 15, importance: 'Critical', keyConcepts: ['Chemical Bonding & Hybridization', 'Coordination Isomerism & VBT', 'p-Block Elements'] },
      { id: 'physical', name: 'Electrochemistry & Solutions', weightage: '32%', expectedQs: 14, importance: 'High', keyConcepts: ['Nernst Equation', 'Colligative Properties & Raoult Law', 'Chemical Kinetics'] }
    ],
    youtubePlaylist: {
      title: 'NEET Chemistry NCERT Line-by-Line Master Course',
      channel: 'Competition Wallah (PW)',
      url: 'https://www.youtube.com/@Competition_Wallah/playlists',
      videoCount: '70 Lectures'
    }
  },
  {
    id: 'botany',
    name: 'Botany (45 Qs / 180M)',
    totalQs: 45,
    totalMarks: 180,
    iconName: 'Leaf',
    description: 'Plant Physiology, Plant Kingdom, Cell Biology, Genetics & Plant Breeding, Ecology.',
    topics: [
      { id: 'plant_physio', name: 'Photosynthesis & Respiration in Plants', weightage: '30%', expectedQs: 14, importance: 'Critical', keyConcepts: ['Calvin Cycle & C4 Pathway', 'Glycolysis & Krebs Cycle', 'Plant Growth Regulators (Auxin/GA)'] },
      { id: 'genetics_botany', name: 'Mendelian Genetics & Molecular Basis', weightage: '35%', expectedQs: 16, importance: 'Critical', keyConcepts: ['Dihybrid Cross & Linkage', 'DNA Replication & Transcription', 'Lac Operon Model'] },
      { id: 'ecology', name: 'Ecosystem & Biodiversity', weightage: '20%', expectedQs: 9, importance: 'High', keyConcepts: ['Energy Flow & Pyramids', 'Biodiversity Conservation & Hotspots'] }
    ],
    youtubePlaylist: {
      title: 'NEET Botany NCERT Comprehensive Lectures',
      channel: 'Competition Wallah (PW)',
      url: 'https://www.youtube.com/@Competition_Wallah/playlists',
      videoCount: '55 Lectures'
    }
  },
  {
    id: 'zoology',
    name: 'Zoology (45 Qs / 180M)',
    totalQs: 45,
    totalMarks: 180,
    iconName: 'HeartPulse',
    description: 'Human Physiology, Animal Kingdom, Human Reproduction & Health, Evolution & Biotechnology.',
    topics: [
      { id: 'human_physio', name: 'Human Physiology (Circulation, Neural, Endocrine)', weightage: '40%', expectedQs: 18, importance: 'Critical', keyConcepts: ['Cardiac Cycle & ECG', 'Nerve Impulse Conduction', 'Hormonal Feedback Loops & Nephron'] },
      { id: 'reproduction_health', name: 'Human Reproduction & Reproductive Health', weightage: '25%', expectedQs: 11, importance: 'Critical', keyConcepts: ['Spermatogenesis & Oogenesis', 'Menstrual Cycle & Hormones', 'Contraception & ART Techniques'] },
      { id: 'biotech_evolution', name: 'Biotechnology & Evolution', weightage: '25%', expectedQs: 11, importance: 'Critical', keyConcepts: ['Recombinant DNA (PCR, Restriction Enzymes)', 'Hardy-Weinberg Principle', 'Darwinism & Homology'] }
    ],
    youtubePlaylist: {
      title: 'NEET Zoology Human Physiology & Genetics Mastery',
      channel: 'Unacademy NEET Official',
      url: 'https://www.youtube.com/@UnacademyNEET/playlists',
      videoCount: '60 Lectures'
    }
  }
];

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
