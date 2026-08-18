export type GateBranchId = 'cs' | 'da' | 'me' | 'ce' | 'ee' | 'ec';

export interface GateBranchInfo {
  id: GateBranchId;
  code: string;
  name: string;
  shortName: string;
  fullName: string;
  iconName: string;
  description: string;
  candidatesCount: string;
  generalCutoff: string;
  obcCutoff: string;
  scStCutoff: string;
  psuOpportunities: string[];
}

export interface GateQuestion {
  id: string;
  branchId?: GateBranchId;
  subjectId: string;
  topicId?: string;
  topicName: string;
  type: 'MCQ' | 'MSQ' | 'NAT';
  marks: 1 | 2;
  negativeMarks?: number;
  questionText: string;
  options?: string[]; // for MCQ and MSQ
  correctOptionIndices?: number[]; // array for MSQ, single item for MCQ
  correctNatValue?: number; // for NAT
  natTolerance?: number;
  explanation: string;
  stepByStepSolution?: string[];
  formulaUsed?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  previousYearTag?: string; // e.g. "GATE CS 2024", "GATE DA 2024"
}

export interface GateSubjectTopic {
  id: string;
  name: string;
  weightage: string;
  expectedQs: number;
  importance: 'High' | 'Medium' | 'Critical';
  keyConcepts: string[];
  pyqCount?: number;
}

export interface GateSubject {
  id: string;
  branchId: GateBranchId;
  name: string;
  shortName: string;
  totalQs: number;
  totalMarks: number;
  iconName: string;
  description: string;
  topics: GateSubjectTopic[];
  youtubePlaylists: {
    title: string;
    channel: string;
    url: string;
    videoCount: string;
  }[];
}

export interface GatePyqPaper {
  id: string;
  branchId: GateBranchId;
  year: string;
  title: string;
  totalQs: number;
  totalMarks: number;
  durationMinutes: number;
  pdfUrl: string;
  downloadCount: number;
  difficulty: string;
  questions?: GateQuestion[];
}

export interface GateModelPaper {
  id: string;
  branchId: GateBranchId;
  title: string;
  paperNumber: number;
  difficulty: 'Standard GATE' | 'Advanced IISc' | 'Moderate';
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  description: string;
  questions?: GateQuestion[];
}

export const GATE_BRANCHES: GateBranchInfo[] = [
  {
    id: 'cs',
    code: 'CS / IT',
    name: 'Computer Science & Information Technology',
    shortName: 'GATE CS',
    fullName: 'Computer Science & Information Technology (CS)',
    iconName: 'Cpu',
    description: 'Data Structures, Algorithms, OS, DBMS, Networks, TOC, Compiler, Architecture & Discrete Mathematics.',
    candidatesCount: '1.4 Lakh+',
    generalCutoff: '32.5 Marks',
    obcCutoff: '29.2 Marks',
    scStCutoff: '21.6 Marks',
    psuOpportunities: ['ISRO', 'BARC', 'DRDO', 'IOCL', 'NTPC', 'ONGC', 'NIC', 'POSOCO']
  },
  {
    id: 'da',
    code: 'DA',
    name: 'Data Science & Artificial Intelligence',
    shortName: 'GATE DA',
    fullName: 'Data Science & Artificial Intelligence (DA)',
    iconName: 'Brain',
    description: 'Probability & Statistics, Linear Algebra, Machine Learning, Deep Learning, AI Algorithms & Database Systems.',
    candidatesCount: '55,000+',
    generalCutoff: '36.0 Marks',
    obcCutoff: '32.4 Marks',
    scStCutoff: '24.0 Marks',
    psuOpportunities: ['ISRO AI Labs', 'DRDO CAIR', 'BARC', 'CDAC', 'IIT M.Tech AI', 'IISc CDS']
  },
  {
    id: 'me',
    code: 'ME',
    name: 'Mechanical Engineering',
    shortName: 'GATE ME',
    fullName: 'Mechanical Engineering (ME)',
    iconName: 'Flame',
    description: 'Thermodynamics, Fluid Mechanics, Strength of Materials, Theory of Machines, Heat Transfer & Manufacturing.',
    candidatesCount: '1.2 Lakh+',
    generalCutoff: '30.8 Marks',
    obcCutoff: '27.7 Marks',
    scStCutoff: '20.5 Marks',
    psuOpportunities: ['ONGC', 'IOCL', 'NTPC', 'BHEL', 'GAIL', 'HPCL', 'BPCL', 'BARC']
  },
  {
    id: 'ce',
    code: 'CE',
    name: 'Civil Engineering',
    shortName: 'GATE CE',
    fullName: 'Civil Engineering (CE)',
    iconName: 'Shield',
    description: 'Structural Analysis, Geotechnical Engg, Environmental Engg, Transportation, Hydraulics & Surveying.',
    candidatesCount: '1.1 Lakh+',
    generalCutoff: '28.2 Marks',
    obcCutoff: '25.3 Marks',
    scStCutoff: '18.8 Marks',
    psuOpportunities: ['NHAI', 'NBCC', 'DMRC', 'RITES', 'EIL', 'NTPC', 'IOCL', 'CPWD']
  },
  {
    id: 'ee',
    code: 'EE',
    name: 'Electrical Engineering',
    shortName: 'GATE EE',
    fullName: 'Electrical Engineering (EE)',
    iconName: 'Zap',
    description: 'Power Systems, Electrical Machines, Control Systems, Power Electronics, Signals & Electromagnetic Fields.',
    candidatesCount: '92,000+',
    generalCutoff: '26.0 Marks',
    obcCutoff: '23.4 Marks',
    scStCutoff: '17.3 Marks',
    psuOpportunities: ['POWERGRID', 'NTPC', 'BHEL', 'NPCIL', 'PGCIL', 'DMRC', 'DRDO']
  },
  {
    id: 'ec',
    code: 'EC',
    name: 'Electronics & Communication Engineering',
    shortName: 'GATE EC',
    fullName: 'Electronics & Communication Engineering (EC)',
    iconName: 'Radio',
    description: 'Analog Circuits, Digital Circuits, Signals & Systems, Communications, Electromagnetics & VLSI Design.',
    candidatesCount: '86,000+',
    generalCutoff: '25.0 Marks',
    obcCutoff: '22.5 Marks',
    scStCutoff: '16.6 Marks',
    psuOpportunities: ['ISRO', 'DRDO', 'BEL', 'BSNL', 'ECIL', 'BARC', 'NTPC', 'VSSC']
  }
];

export const GATE_EXAM_PATTERN = {
  examName: "Graduate Aptitude Test in Engineering (GATE 2026)",
  conductingBody: "IISc Bangalore & IITs (Joint Committee)",
  frequency: "Annually (First two weekends of February)",
  totalQuestions: 65,
  totalMarks: 100,
  durationMinutes: 180, // 3 Hours
  breakdown: [
    { name: "General Aptitude (GA)", totalQs: 10, totalMarks: 15, details: "5 Qs of 1-Mark + 5 Qs of 2-Marks" },
    { name: "Engineering Mathematics & Technical Core", totalQs: 55, totalMarks: 85, details: "25 Qs of 1-Mark + 30 Qs of 2-Marks" }
  ],
  questionTypes: {
    MCQ: "Multiple Choice Question (+1 / -0.33 for 1M; +2 / -0.66 for 2M)",
    MSQ: "Multiple Select Question (Select all correct options; No negative marking, No partial credit)",
    NAT: "Numerical Answer Type (Enter decimal/integer on virtual pad; No negative marking)"
  },
  specialTools: [
    "Official Virtual Scientific Calculator (embedded inside CBT Window)",
    "Section Switcher (General Aptitude vs Technical Subject)",
    "Question Palette with Color Coded Attempt Status",
    "Mark for Review & Next, Clear Response, Save & Next"
  ]
};

export const GATE_BRANCH_SUBJECTS: Record<GateBranchId, GateSubject[]> = {
  cs: [
    {
      id: 'cs_ga',
      branchId: 'cs',
      name: 'General Aptitude (10 Qs / 15M)',
      shortName: 'General Aptitude',
      totalQs: 10,
      totalMarks: 15,
      iconName: 'Brain',
      description: 'Verbal Ability (Grammar & Sentence Completion) + Numerical Ability (Quant, Logic & Spatial Reasoning).',
      topics: [
        { id: 'cs_ga_num', name: 'Numerical Computation & Data Interpretation', weightage: '50%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Percentages, Ratios, Powers & Series', 'Permutations & Combinations', 'Data Graphs & Charts', 'Geometry & Mensuration'], pyqCount: 140 },
        { id: 'cs_ga_verb', name: 'Verbal Ability & Spatial Aptitude', weightage: '50%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Grammar & Word Analogy', 'Critical Reasoning & Deduction', 'Mirror Images, Paper Folding & 2D/3D Rotation'], pyqCount: 120 }
      ],
      youtubePlaylists: [{
        title: 'GATE General Aptitude Complete Playlist',
        channel: 'GATE Wallah',
        url: 'https://www.youtube.com/playlist?list=PLvTTv60o7qj-PgF3DhvvTK6_-g_FU8wCT',
        videoCount: '35 Lectures'
      }]
    },
    {
      id: 'cs_em_dm',
      branchId: 'cs',
      name: 'Engineering Maths & Discrete Maths (13M - 15M)',
      shortName: 'Engg & Discrete Maths',
      totalQs: 9,
      totalMarks: 14,
      iconName: 'Calculator',
      description: 'Linear Algebra, Calculus, Probability & Statistics, Propositional Logic, Sets, Relations, Combinatorics & Graph Theory.',
      topics: [
        { id: 'cs_dm_graph', name: 'Discrete Maths & Graph Theory', weightage: '55%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Propositional & First Order Logic', 'Equivalence & Partial Order Relations', 'Planar Graphs, Vertex/Edge Coloring', 'Euler & Hamiltonian Cycles'], pyqCount: 160 },
        { id: 'cs_em_la_prob', name: 'Linear Algebra & Probability', weightage: '45%', expectedQs: 4, importance: 'Critical', keyConcepts: ['Eigenvalues, Eigenvectors & Cayley-Hamilton', 'Rank & System of Linear Equations', 'Bayes Theorem & Poisson/Normal Distributions'], pyqCount: 150 }
      ],
      youtubePlaylists: [{
        title: 'Discrete Mathematics',
        channel: 'Gate Smashers',
        url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3',
        videoCount: '45 Lectures'
      }]
    },
    {
      id: 'cs_dsa',
      branchId: 'cs',
      name: 'Data Structures & Algorithms (16M - 18M)',
      shortName: 'Data Structures & Algorithms',
      totalQs: 11,
      totalMarks: 18,
      iconName: 'Zap',
      description: 'Arrays, Stacks, Queues, Linked Lists, Trees, Heaps, Graph Algorithms, Asymptotic Analysis, Divide & Conquer, Greedy & Dynamic Programming.',
      topics: [
        { id: 'cs_algo_design', name: 'Algorithm Design (DP, Greedy, Divide & Conquer)', weightage: '55%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Asymptotic Notation (Big-O, Omega, Theta)', 'Recurrence Relations & Master Theorem', 'Dynamic Programming (LCS, 0/1 Knapsack, Matrix Chain)', 'Dijkstra, Bellman-Ford, Kruskal & Prim'], pyqCount: 190 },
        { id: 'cs_ds_trees', name: 'Data Structures (Trees, Heaps, Hash Tables)', weightage: '45%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Binary Search Trees & AVL Rotations', 'Min/Max Heap Operations', 'Hashing & Collision Resolution Techniques', 'Stack applications (Infix to Postfix)'], pyqCount: 175 }
      ],
      youtubePlaylists: [
        {
          title: 'Data Structures',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT',
          videoCount: '60 Lectures'
        },
        {
          title: 'Design & Analysis of Algorithms',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa',
          videoCount: 'Playlist'
        }
      ]
    },
    {
      id: 'cs_os_dbms',
      branchId: 'cs',
      name: 'Operating Systems & DBMS (16M - 18M)',
      shortName: 'OS & DBMS',
      totalQs: 11,
      totalMarks: 17,
      iconName: 'Layers',
      description: 'Processes, Threads, CPU Scheduling, Deadlocks, Memory Management, Virtual Memory, File Systems, Relational Model, SQL, Normalization & Transactions.',
      topics: [
        { id: 'cs_os_memory', name: 'Operating Systems & Virtual Memory', weightage: '50%', expectedQs: 6, importance: 'Critical', keyConcepts: ['CPU Scheduling (SJF, Round Robin)', 'Semaphores & Classical Sync Problems', 'Deadlock Detection & Bankers Algorithm', 'Paging, TLB & Page Replacement (LRU, FIFO)'], pyqCount: 185 },
        { id: 'cs_dbms_norm_tx', name: 'DBMS: Normalization & Concurrency Control', weightage: '50%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Candidate Key & Closure Calculation', '1NF, 2NF, 3NF, BCNF Decomposition', 'Conflict/View Serializability & Recoverability', 'Two-Phase Locking (2PL) & B/B+ Trees'], pyqCount: 170 }
      ],
      youtubePlaylists: [
        {
          title: 'Operating Systems',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
          videoCount: '55 Lectures'
        },
        {
          title: 'DBMS',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y',
          videoCount: 'Playlist'
        }
      ]
    },
    {
      id: 'cs_toc_cd_cn',
      branchId: 'cs',
      name: 'TOC, Compiler Design & Computer Networks (18M - 20M)',
      shortName: 'TOC, Compilers & Networks',
      totalQs: 12,
      totalMarks: 19,
      iconName: 'Cpu',
      description: 'Regular Languages, Finite Automata, Context-Free Grammars, Turing Machines, Decidability, Lexical/Syntax Analysis, IP Addressing, TCP/UDP & Routing.',
      topics: [
        { id: 'cs_toc_automata', name: 'Theory of Computation & Decidability', weightage: '40%', expectedQs: 5, importance: 'Critical', keyConcepts: ['DFA/NFA State Minimization & Regular Expressions', 'Pumping Lemma for Regular/CFL', 'PDA & Context Free Grammars', 'Turing Machines & Halting Problem / Decidability'], pyqCount: 195 },
        { id: 'cs_cn_tcpip', name: 'Computer Networks (IPv4/IPv6, TCP & Subnets)', weightage: '40%', expectedQs: 5, importance: 'Critical', keyConcepts: ['CIDR Subnetting & Supernetting', 'Flow Control (Sliding Window, Go-Back-N, SR)', 'TCP Congestion Control & Window Size', 'Routing Algorithms (Dijkstra, Bellman-Ford)'], pyqCount: 180 },
        { id: 'cs_cd_parsing', name: 'Compiler Design (Parsing & Code Generation)', weightage: '20%', expectedQs: 2, importance: 'High', keyConcepts: ['LL(1), LR(0), SLR(1), LALR(1), CLR(1) Parsing', 'Syntax Directed Translation (SDT)', 'Intermediate Code (3-Address Code) & DAGs'], pyqCount: 110 }
      ],
      youtubePlaylists: [
        {
          title: 'Theory of Computation',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i',
          videoCount: '70 Lectures'
        },
        {
          title: 'Compiler Design',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEKtKSIHYusizkESC42diyc',
          videoCount: 'Playlist'
        },
        {
          title: 'Computer Networks',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
          videoCount: 'Playlist'
        }
      ]
    },
    {
      id: 'cs_co_digital',
      branchId: 'cs',
      name: 'Digital Logic & Computer Organization (12M - 14M)',
      shortName: 'Digital Logic & COA',
      totalQs: 8,
      totalMarks: 13,
      iconName: 'Cpu',
      description: 'Boolean Algebra, Minimization (K-Maps), Combinational & Sequential Circuits, Machine Instructions, Addressing Modes, Instruction Pipelining & Cache Memory.',
      topics: [
        { id: 'cs_coa_pipeline', name: 'COA: Pipelining & Cache Memory Mapping', weightage: '60%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Instruction Pipelining & Hazards (Data, Control, Structural)', 'Direct, Fully Associative & Set-Associative Cache', 'Addressing Modes & Instruction Cycles', 'Hierarchical Memory Access Time'], pyqCount: 165 },
        { id: 'cs_dl_kmaps', name: 'Digital Logic (K-Maps, Multiplexers & Counters)', weightage: '40%', expectedQs: 3, importance: 'High', keyConcepts: ['K-Map Minimization (SOP/POS)', 'Multiplexers & Decoder Implementations', 'Flip-Flops, Synchronous & Asynchronous Counters'], pyqCount: 130 }
      ],
      youtubePlaylists: [
        {
          title: 'Computer Architecture',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX',
          videoCount: '45 Lectures'
        },
        {
          title: 'Discrete Mathematics',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3',
          videoCount: 'Playlist'
        }
      ]
    }
  ],

  da: [
    {
      id: 'da_ga',
      branchId: 'da',
      name: 'General Aptitude (10 Qs / 15M)',
      shortName: 'General Aptitude',
      totalQs: 10,
      totalMarks: 15,
      iconName: 'Brain',
      description: 'Verbal reasoning, quantitative computation, data interpretation, and analytical logic.',
      topics: [
        { id: 'da_ga_quant', name: 'Quantitative Aptitude & Data Interpretation', weightage: '50%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Arithmetic & Geometry', 'Data Graphs & Charts', 'Permutations & Probability'], pyqCount: 60 },
        { id: 'da_ga_verbal', name: 'Verbal Ability & Logical Deduction', weightage: '50%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Vocabulary & Context', 'Critical Reasoning & Deduction'], pyqCount: 50 }
      ],
      youtubePlaylists: [{
        title: 'GATE General Aptitude Complete Playlist',
        channel: 'GATE Wallah',
        url: 'https://www.youtube.com/playlist?list=PLvTTv60o7qj-PgF3DhvvTK6_-g_FU8wCT',
        videoCount: '35 Lectures'
      }]
    },
    {
      id: 'da_prob_stats',
      branchId: 'da',
      name: 'Probability & Statistics for AI (16M - 18M)',
      shortName: 'Probability & Statistics',
      totalQs: 10,
      totalMarks: 16,
      iconName: 'Calculator',
      description: 'Counting, Axioms of Probability, Conditional Probability, Random Variables, Distributions, Hypothesis Testing & Estimation.',
      topics: [
        { id: 'da_stat_distributions', name: 'Random Variables & Probability Distributions', weightage: '55%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Joint & Conditional Probability / Bayes Theorem', 'Binomial, Poisson, Uniform & Normal Distributions', 'Expectation, Variance, Covariance & Correlation', 'Central Limit Theorem (CLT)'], pyqCount: 80 },
        { id: 'da_stat_inference', name: 'Statistical Inference & Hypothesis Testing', weightage: '45%', expectedQs: 4, importance: 'Critical', keyConcepts: ['Confidence Intervals & Maximum Likelihood Estimation (MLE)', 't-test, z-test, Chi-square & ANOVA', 'p-values, Type I and Type II Errors'], pyqCount: 70 }
      ],
      youtubePlaylists: [{
        title: 'GATE DA Probability & Statistics',
        channel: 'GATE Wallah CSE & DA',
        url: 'https://www.youtube.com/@gatewallah_cse_da/playlists',
        videoCount: '40 Lectures'
      }]
    },
    {
      id: 'da_linear_algebra_calculus',
      branchId: 'da',
      name: 'Linear Algebra & Calculus for ML (15M - 17M)',
      shortName: 'Linear Algebra & Calculus',
      totalQs: 9,
      totalMarks: 15,
      iconName: 'Zap',
      description: 'Vector Spaces, Subspaces, Eigenvalues/Eigenvectors, SVD, PCA, Matrix Decompositions, Maxima/Minima, Gradient Descent & Optimization.',
      topics: [
        { id: 'da_la_svd', name: 'Linear Algebra & Matrix Decompositions', weightage: '60%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Vector Spaces, Basis & Dimension', 'Rank-Nullity Theorem & Projections', 'Eigenvalues, Diagonalization & SVD (Singular Value Decomposition)', 'PCA (Principal Component Analysis) Math'], pyqCount: 75 },
        { id: 'da_calc_opt', name: 'Multivariate Calculus & Optimization', weightage: '40%', expectedQs: 3, importance: 'Critical', keyConcepts: ['Gradients, Jacobians & Hessian Matrices', 'Taylor Series & Constrained Optimization (Lagrange Multipliers)', 'Gradient Descent, Convex Functions & Local/Global Minima'], pyqCount: 65 }
      ],
      youtubePlaylists: [{
        title: 'GATE DA Linear Algebra & Optimization for AI',
        channel: 'GATE Wallah CSE & DA',
        url: 'https://www.youtube.com/@gatewallah_cse_da/playlists',
        videoCount: '38 Lectures'
      }]
    },
    {
      id: 'da_ml',
      branchId: 'da',
      name: 'Machine Learning & Deep Learning (20M - 22M)',
      shortName: 'Machine Learning',
      totalQs: 13,
      totalMarks: 21,
      iconName: 'Brain',
      description: 'Supervised Learning (Regression, Classification, SVM, Decision Trees), Unsupervised Learning (K-Means, Hierarchical), Model Evaluation, Neural Networks & Backpropagation.',
      topics: [
        { id: 'da_ml_supervised', name: 'Supervised Learning & Ensemble Methods', weightage: '50%', expectedQs: 7, importance: 'Critical', keyConcepts: ['Linear & Logistic Regression / Regularization (L1/L2 Lasso/Ridge)', 'Support Vector Machines (SVM & Kernels)', 'Decision Trees, Random Forests & Gradient Boosting (XGBoost)', 'Bias-Variance Tradeoff, ROC-AUC, Precision/Recall/F1'], pyqCount: 90 },
        { id: 'da_ml_deep_unsupervised', name: 'Clustering, PCA & Neural Networks', weightage: '50%', expectedQs: 6, importance: 'Critical', keyConcepts: ['K-Means, GMM & Hierarchical Clustering', 'Multi-Layer Perceptrons & Backpropagation Algorithm', 'Activation Functions (ReLU, Softmax, Sigmoid) & Loss Functions', 'Overfitting Prevention: Dropout & Batch Normalization'], pyqCount: 85 }
      ],
      youtubePlaylists: [{
        title: 'Machine Learning',
        channel: 'Gate Smashers',
        url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEXg5BV10k9THtjnS48yI-T',
        videoCount: '50 Lectures'
      }]
    },
    {
      id: 'da_ai_search',
      branchId: 'da',
      name: 'AI Search & Knowledge Representation (12M - 14M)',
      shortName: 'AI & Search Algorithms',
      totalQs: 8,
      totalMarks: 13,
      iconName: 'Layers',
      description: 'Informed & Uninformed Search (BFS, DFS, A*, Hill Climbing), Adversarial Search (Minimax, Alpha-Beta Pruning), Propositional & Predicate Logic.',
      topics: [
        { id: 'da_ai_search_algos', name: 'Heuristic Search & Game Playing', weightage: '60%', expectedQs: 5, importance: 'Critical', keyConcepts: ['BFS, DFS, Uniform Cost Search & Iterative Deepening', 'A* Search, Admissibility & Consistency of Heuristics', 'Minimax Algorithm & Alpha-Beta Pruning in Game Trees'], pyqCount: 65 },
        { id: 'da_ai_logic', name: 'Knowledge Representation & Logic', weightage: '40%', expectedQs: 3, importance: 'High', keyConcepts: ['Propositional Logic & First Order Predicate Logic', 'Resolution Refutation & Inference Rules', 'Clause Normal Form (CNF) & Unification'], pyqCount: 55 }
      ],
      youtubePlaylists: [{
        title: 'Artificial Intelligence',
        channel: 'Gate Smashers',
        url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI',
        videoCount: '32 Lectures'
      }]
    },
    {
      id: 'da_dsa_dbms',
      branchId: 'da',
      name: 'Programming, Data Structures & DBMS (15M - 17M)',
      shortName: 'Data Structures & DBMS',
      totalQs: 9,
      totalMarks: 15,
      iconName: 'Cpu',
      description: 'Python Data Structures, Searching, Sorting, Big-O Complexity, Relational Model, SQL Queries, Joins, Normalization & Warehousing basics.',
      topics: [
        { id: 'da_prog_dsa', name: 'Python DSA & Algorithm Complexity', weightage: '50%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Lists, Stacks, Queues, Trees & Hash Maps in Python', 'Binary Search, Merge Sort, Quick Sort & Time Complexity', 'Graph Traversals (BFS/DFS) applications'], pyqCount: 75 },
        { id: 'da_dbms_sql', name: 'Relational Database & SQL Queries', weightage: '50%', expectedQs: 4, importance: 'Critical', keyConcepts: ['ER Diagrams & Relational Schema Mapping', 'Complex SQL: Group By, Having, Nested Subqueries & Joins', 'Functional Dependencies, 3NF & BCNF Normalization'], pyqCount: 70 }
      ],
      youtubePlaylists: [
        {
          title: 'Data Structures',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT',
          videoCount: '42 Lectures'
        },
        {
          title: 'SQL',
          channel: 'Gate Smashers',
          url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHqU4HKL7-SITyuSIcD93id',
          videoCount: 'Playlist'
        }
      ]
    }
  ],

  me: [
    {
      id: 'me_ga',
      branchId: 'me',
      name: 'General Aptitude (10 Qs / 15M)',
      shortName: 'General Aptitude',
      totalQs: 10,
      totalMarks: 15,
      iconName: 'Brain',
      description: 'Verbal ability, numerical computation, reasoning, and spatial aptitude.',
      topics: [
        { id: 'me_ga_quant', name: 'Quantitative & Spatial Aptitude', weightage: '60%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Percentages, TSD, Work & Time', '2D/3D Geometry & Spatial Folding'], pyqCount: 140 },
        { id: 'me_ga_verb', name: 'Verbal Ability & Logic', weightage: '40%', expectedQs: 4, importance: 'High', keyConcepts: ['Grammar & Critical Reasoning'], pyqCount: 110 }
      ],
      youtubePlaylists: [{
        title: 'GATE General Aptitude Complete Playlist',
        channel: 'GATE Wallah',
        url: 'https://www.youtube.com/playlist?list=PLvTTv60o7qj-PgF3DhvvTK6_-g_FU8wCT',
        videoCount: '35 Lectures'
      }]
    },
    {
      id: 'me_thermo_fluid',
      branchId: 'me',
      name: 'Thermodynamics & Fluid Mechanics (24M - 26M)',
      shortName: 'Thermo & Fluid Mechanics',
      totalQs: 16,
      totalMarks: 25,
      iconName: 'Flame',
      description: 'First & Second Laws, Entropy, Cycles (Rankine, Brayton, Otto, Diesel), Fluid Statics, Bernoulli, Navier-Stokes, Boundary Layer & Heat Transfer (Conduction, Convection, Radiation).',
      topics: [
        { id: 'me_thermo_cycles', name: 'Applied Thermodynamics & Power Cycles', weightage: '50%', expectedQs: 8, importance: 'Critical', keyConcepts: ['First & Second Law / Availability & Irreversibility', 'Rankine, Otto, Diesel, Dual & Brayton Cycles', 'Psychrometric Chart & VCR Refrigeration Cycles'], pyqCount: 210 },
        { id: 'me_fm_ht', name: 'Fluid Mechanics & Heat Transfer', weightage: '50%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Bernoulli Equation & Pipe Flow Friction (Moody Chart)', 'Boundary Layer Thickness & Drag/Lift', 'LMTD & NTU Heat Exchanger Methods', 'Transient Heat Conduction (Biot Number) & Radiation View Factors'], pyqCount: 220 }
      ],
      youtubePlaylists: [{
        title: 'GATE Mechanical Thermodynamics & Fluid Mechanics Master Series',
        channel: 'GATE Wallah ME CE XE',
        url: 'https://www.youtube.com/@gatewallah_me_ce_xe_ch/playlists',
        videoCount: '75 Lectures'
      }]
    },
    {
      id: 'me_som_tom',
      branchId: 'me',
      name: 'Strength of Materials & Theory of Machines (22M - 24M)',
      shortName: 'SOM & Theory of Machines',
      totalQs: 15,
      totalMarks: 23,
      iconName: 'Layers',
      description: 'Stress & Strain, Mohr Circle, SFD/BMD, Torsion, Deflection of Beams, Columns, Mechanisms, Kinematics, Cams, Gears, Governors & Mechanical Vibrations.',
      topics: [
        { id: 'me_som_stress', name: 'Strength of Materials & Beam Deflection', weightage: '50%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Principal Stresses & 2D/3D Mohrs Circle', 'Shear Force & Bending Moment Diagrams (SFD/BMD)', 'Pure Torsion & Power Transmission Shafts', 'Eulers Critical Load for Columns & Strain Energy'], pyqCount: 230 },
        { id: 'me_tom_vibrations', name: 'Theory of Machines & Mechanical Vibrations', weightage: '50%', expectedQs: 7, importance: 'Critical', keyConcepts: ['Grashofs Law & 4-Bar Mechanism Inversions', 'Velocity & Acceleration Analysis (Instantaneous Center)', 'Single Degree of Freedom Free/Damped/Forced Vibrations', 'Gear Trains & Epicyclic Gear Ratios'], pyqCount: 205 }
      ],
      youtubePlaylists: [{
        title: 'GATE Mechanical SOM & Theory of Machines Lectures',
        channel: 'GATE Wallah ME CE XE',
        url: 'https://www.youtube.com/@gatewallah_me_ce_xe_ch/playlists',
        videoCount: '65 Lectures'
      }]
    },
    {
      id: 'me_mfg_industrial',
      branchId: 'me',
      name: 'Manufacturing & Industrial Engineering (22M - 24M)',
      shortName: 'Manufacturing & Industrial',
      totalQs: 15,
      totalMarks: 23,
      iconName: 'Zap',
      description: 'Casting, Welding, Metal Forming, Machining & Machine Tools (Merchants Circle), CNC, Metrology, Linear Programming, CPM/PERT & Inventory Control (EOQ).',
      topics: [
        { id: 'me_mfg_machining', name: 'Machining, Casting & Metal Forming', weightage: '55%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Orthogonal Machining & Merchants Force Circle', 'Taylors Tool Life Equation', 'Chvorinovs Rule in Casting & Gating Design', 'True Stress/Strain in Rolling, Extrusion & Wire Drawing'], pyqCount: 220 },
        { id: 'me_ie_or', name: 'Operations Research, PERT/CPM & Inventory', weightage: '45%', expectedQs: 7, importance: 'Critical', keyConcepts: ['Linear Programming (Simplex Method & Duality)', 'PERT/CPM Critical Path & Float Calculations', 'EOQ Model, Reorder Point & Safety Stock', 'Forecasting (Moving Average & Exponential Smoothing)'], pyqCount: 195 }
      ],
      youtubePlaylists: [{
        title: 'GATE Manufacturing & Industrial Engineering Complete Course',
        channel: 'GATE Wallah ME CE XE',
        url: 'https://www.youtube.com/@gatewallah_me_ce_xe_ch/playlists',
        videoCount: '60 Lectures'
      }]
    },
    {
      id: 'me_em',
      branchId: 'me',
      name: 'Engineering Mathematics for Mechanical (13M - 15M)',
      shortName: 'Engineering Mathematics',
      totalQs: 9,
      totalMarks: 14,
      iconName: 'Calculator',
      description: 'Linear Algebra, Calculus, Differential Equations, Complex Variables, Probability, and Numerical Methods.',
      topics: [
        { id: 'me_em_calc_de', name: 'Calculus, Vector Calculus & Differential Equations', weightage: '55%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Partial Derivatives, Maxima/Minima & Greens Theorem', 'First Order ODEs & Second Order Constant Coeff ODEs', 'Laplace Transforms for Differential Equations'], pyqCount: 150 },
        { id: 'me_em_la_prob', name: 'Linear Algebra & Probability Distributions', weightage: '45%', expectedQs: 4, importance: 'Critical', keyConcepts: ['Eigenvalues & System of Equations', 'Normal & Exponential Probability Distributions', 'Newton-Raphson & Trapezoidal/Simpson Numerical Rules'], pyqCount: 140 }
      ],
      youtubePlaylists: [{
        title: 'GATE Engineering Mathematics for Mechanical',
        channel: 'GATE Wallah ME CE XE',
        url: 'https://www.youtube.com/@gatewallah_me_ce_xe_ch/playlists',
        videoCount: '45 Lectures'
      }]
    }
  ],

  ce: [
    {
      id: 'ce_ga',
      branchId: 'ce',
      name: 'General Aptitude (10 Qs / 15M)',
      shortName: 'General Aptitude',
      totalQs: 10,
      totalMarks: 15,
      iconName: 'Brain',
      description: 'Numerical computation, verbal reasoning, and spatial problem solving.',
      topics: [
        { id: 'ce_ga_quant', name: 'Quantitative Aptitude & Spatial Ability', weightage: '60%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Percentages, TSD, Data Interpretation', 'Spatial Rotations & Symmetry'], pyqCount: 130 },
        { id: 'ce_ga_verb', name: 'Verbal Reasoning & Grammar', weightage: '40%', expectedQs: 4, importance: 'High', keyConcepts: ['Sentence Completion & Critical Deduction'], pyqCount: 110 }
      ],
      youtubePlaylists: [{
        title: 'GATE General Aptitude Complete Playlist',
        channel: 'GATE Wallah',
        url: 'https://www.youtube.com/playlist?list=PLvTTv60o7qj-PgF3DhvvTK6_-g_FU8wCT',
        videoCount: '35 Lectures'
      }]
    },
    {
      id: 'ce_structures_geotech',
      branchId: 'ce',
      name: 'Structural Engineering & Geotechnical Engg (26M - 28M)',
      shortName: 'Structures & Geotech',
      totalQs: 18,
      totalMarks: 27,
      iconName: 'Shield',
      description: 'Structural Analysis, RCC (Limit State), Steel Structures, Soil Mechanics, Permeability, Consolidation, Shear Strength & Foundation Design.',
      topics: [
        { id: 'ce_soil_geotech', name: 'Soil Mechanics & Foundation Engineering', weightage: '50%', expectedQs: 9, importance: 'Critical', keyConcepts: ['Phase Relationships (Void Ratio, Porosity, Degree of Saturation)', 'Darcys Law, Seepage Analysis & Flow Nets', 'Terzaghis 1D Consolidation & Primary Settlement', 'Mohr-Coulomb Shear Strength & Terzaghi Bearing Capacity'], pyqCount: 230 },
        { id: 'ce_struct_rcc', name: 'Structural Analysis & RCC Design', weightage: '50%', expectedQs: 9, importance: 'Critical', keyConcepts: ['Trusses, Moment Distribution & Slope Deflection', 'Limit State Method (LSM) Singly/Doubly Reinforced Beams', 'Shear, Torsion & Bond Design in RCC (IS 456)', 'Plastic Analysis of Beams & Frames (Collapse Load)'], pyqCount: 220 }
      ],
      youtubePlaylists: [{
        title: 'GATE Civil Geotechnical & Structural Engineering Series',
        channel: 'GATE Wallah ME CE XE',
        url: 'https://www.youtube.com/@gatewallah_me_ce_xe_ch/playlists',
        videoCount: '80 Lectures'
      }]
    },
    {
      id: 'ce_env_water_trans',
      branchId: 'ce',
      name: 'Environmental, Water Resources & Transportation (26M - 28M)',
      shortName: 'Env, Water & Highway Engg',
      totalQs: 18,
      totalMarks: 27,
      iconName: 'Layers',
      description: 'Water Quality, Treatment (Sedimentation, Filtration), Wastewater (BOD, Activated Sludge), Hydrology (Hydrographs), Open Channel Flow & Highway Geometric Design.',
      topics: [
        { id: 'ce_env_engg', name: 'Environmental Engineering & Wastewater Treatment', weightage: '45%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Water Quality Parameters (Hardness, Alkalinity, pH)', 'Settling Velocity & Type-I Sedimentation Tanks', 'BOD Kinetics & Activated Sludge Process (ASP)', 'Air Pollution Dispersion & Sound Level (Decibel) Addition'], pyqCount: 210 },
        { id: 'ce_hydro_wre', name: 'Hydrology & Open Channel Hydraulics', weightage: '30%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Unit Hydrograph Theory & S-Curve Method', 'Specific Energy, Critical Depth & Hydraulic Jump in Channels', 'Crop Water Requirements (Delta, Duty, Base Period)'], pyqCount: 170 },
        { id: 'ce_transport_geo', name: 'Transportation & Highway Geometric Design', weightage: '25%', expectedQs: 5, importance: 'High', keyConcepts: ['Stopping Sight Distance (SSD) & Overtaking Sight Distance (OSD)', 'Super-elevation Design & Horizontal Transition Curves', 'Traffic Volume (Webster Signal Design) & Pavement Thickness'], pyqCount: 160 }
      ],
      youtubePlaylists: [{
        title: 'GATE Civil Environmental & Transportation Engineering',
        channel: 'GATE Wallah ME CE XE',
        url: 'https://www.youtube.com/@gatewallah_me_ce_xe_ch/playlists',
        videoCount: '70 Lectures'
      }]
    },
    {
      id: 'ce_em_survey',
      branchId: 'ce',
      name: 'Engineering Maths & Surveying (16M - 18M)',
      shortName: 'Maths & Surveying',
      totalQs: 10,
      totalMarks: 16,
      iconName: 'Calculator',
      description: 'Linear Algebra, Calculus, Differential Equations, Numerical Methods, Chain/Compass Surveying, Levelling, Traversing & Curves.',
      topics: [
        { id: 'ce_maths_core', name: 'Engineering Mathematics', weightage: '65%', expectedQs: 7, importance: 'Critical', keyConcepts: ['Eigenvalues & Determinants', 'Differential Equations & Laplace Transforms', 'Probability Distributions & Numerical Integration (Simpsons Rule)'], pyqCount: 155 },
        { id: 'ce_survey_levels', name: 'Surveying, Levelling & Contouring', weightage: '35%', expectedQs: 3, importance: 'High', keyConcepts: ['Rise & Fall / Height of Instrument Levelling', 'Magnetic Declination & Whole Circle Bearings', 'Horizontal & Vertical Curves Design'], pyqCount: 120 }
      ],
      youtubePlaylists: [{
        title: 'GATE Civil Surveying & Mathematics Masterclass',
        channel: 'GATE Wallah ME CE XE',
        url: 'https://www.youtube.com/@gatewallah_me_ce_xe_ch/playlists',
        videoCount: '45 Lectures'
      }]
    }
  ],

  ee: [
    {
      id: 'ee_ga',
      branchId: 'ee',
      name: 'General Aptitude (10 Qs / 15M)',
      shortName: 'General Aptitude',
      totalQs: 10,
      totalMarks: 15,
      iconName: 'Brain',
      description: 'Numerical calculation, reasoning, logic, and verbal fluency.',
      topics: [
        { id: 'ee_ga_quant', name: 'Quantitative Aptitude & Logic', weightage: '60%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Arithmetic & Algebraic shortcuts', 'Data Interpretation & Sequences'], pyqCount: 120 },
        { id: 'ee_ga_verb', name: 'Verbal Ability', weightage: '40%', expectedQs: 4, importance: 'High', keyConcepts: ['Vocabulary, Reading & Deduction'], pyqCount: 100 }
      ],
      youtubePlaylists: [{
        title: 'GATE General Aptitude Complete Playlist',
        channel: 'GATE Wallah',
        url: 'https://www.youtube.com/playlist?list=PLvTTv60o7qj-PgF3DhvvTK6_-g_FU8wCT',
        videoCount: '35 Lectures'
      }]
    },
    {
      id: 'ee_power_machines',
      branchId: 'ee',
      name: 'Power Systems & Electrical Machines (26M - 28M)',
      shortName: 'Power Systems & Machines',
      totalQs: 18,
      totalMarks: 27,
      iconName: 'Zap',
      description: 'Transformers, DC Machines, Induction Motors, Synchronous Machines, Transmission Lines, Fault Analysis, Power System Stability & Protection.',
      topics: [
        { id: 'ee_machines_trans', name: 'Electrical Machines (Transformers & Induction)', weightage: '50%', expectedQs: 9, importance: 'Critical', keyConcepts: ['Equivalent Circuit, Efficiency & Voltage Regulation of Transformers', 'Torque-Speed Characteristics of 3-Phase Induction Motors', 'DC Motor Starting, Speed Control & Braking', 'Synchronous Generator Power-Angle Curve & V-Curves'], pyqCount: 220 },
        { id: 'ee_power_faults', name: 'Power Systems, Faults & Stability', weightage: '50%', expectedQs: 9, importance: 'Critical', keyConcepts: ['Symmetrical & Unsymmetrical Fault Analysis (LG, LL, LLG)', 'Equal Area Criterion for Transient Stability', 'Y-bus Formation & Gauss-Seidel / Newton-Raphson Load Flow', 'Transmission Line ABCD Parameters & Ferranti Effect'], pyqCount: 210 }
      ],
      youtubePlaylists: [{
        title: 'GATE Electrical Power Systems & Machines Complete Course',
        channel: 'GATE Wallah ECE EE IN',
        url: 'https://www.youtube.com/@GATE_Wallah_ECE-EE-IN/playlists',
        videoCount: '75 Lectures'
      }]
    },
    {
      id: 'ee_pe_control',
      branchId: 'ee',
      name: 'Power Electronics & Control Systems (22M - 24M)',
      shortName: 'Power Electronics & Controls',
      totalQs: 15,
      totalMarks: 23,
      iconName: 'Layers',
      description: 'Thyristors, Rectifiers, DC-DC Converters (Buck, Boost, Buck-Boost), Inverters, Transfer Functions, Block Diagrams, Routh-Hurwitz, Root Locus, Bode Plots & State Space.',
      topics: [
        { id: 'ee_pe_converters', name: 'Power Electronics & Inverters', weightage: '50%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Single/3-Phase Controlled Rectifiers & Average Output Voltage', 'Buck, Boost & Buck-Boost Converter Ripple Calculations', '1-Phase & 3-Phase Voltage Source Inverters (180°/120° Conduction)'], pyqCount: 200 },
        { id: 'ee_cs_bode_root', name: 'Control Systems & Frequency Response', weightage: '50%', expectedQs: 7, importance: 'Critical', keyConcepts: ['Routh-Hurwitz Stability Criterion & State Space Controllability/Observability', 'Root Locus Construction & Breakaway Points', 'Bode Plots, Phase Margin & Gain Margin', 'Lead, Lag & Lead-Lag Compensators'], pyqCount: 190 }
      ],
      youtubePlaylists: [{
        title: 'GATE Power Electronics & Control Systems Lectures',
        channel: 'GATE Wallah ECE EE IN',
        url: 'https://www.youtube.com/@GATE_Wallah_ECE-EE-IN/playlists',
        videoCount: '65 Lectures'
      }]
    },
    {
      id: 'ee_circuits_signals_em',
      branchId: 'ee',
      name: 'Circuit Theory, Signals & Engg Mathematics (20M - 22M)',
      shortName: 'Circuits, Signals & Maths',
      totalQs: 13,
      totalMarks: 20,
      iconName: 'Cpu',
      description: 'Thevenin/Norton Theorems, Transient Analysis (RL, RC, RLC), Two-Port Networks, Fourier/Laplace/Z-Transforms, Linear Algebra, Calculus & Differential Equations.',
      topics: [
        { id: 'ee_circuits_theorems', name: 'Network Analysis & Transients', weightage: '40%', expectedQs: 5, importance: 'Critical', keyConcepts: ['Thevenin, Norton, Superposition & Maximum Power Transfer', 'First & Second Order Transient Response in s-domain', 'Resonance in Series & Parallel RLC Circuits', 'Two-Port Parameters (Z, Y, ABCD, h)'], pyqCount: 180 },
        { id: 'ee_signals_maths', name: 'Signals, Systems & Engineering Mathematics', weightage: '60%', expectedQs: 8, importance: 'Critical', keyConcepts: ['LTI System Convolution, Fourier Series & Fourier Transform', 'Laplace & Z-Transform ROC and Inverse Transforms', 'Eigenvalues, Vector Calculus & Differential Equations'], pyqCount: 170 }
      ],
      youtubePlaylists: [{
        title: 'GATE Electrical Circuit Theory & Signals Masterclass',
        channel: 'GATE Wallah ECE EE IN',
        url: 'https://www.youtube.com/@GATE_Wallah_ECE-EE-IN/playlists',
        videoCount: '50 Lectures'
      }]
    }
  ],

  ec: [
    {
      id: 'ec_ga',
      branchId: 'ec',
      name: 'General Aptitude (10 Qs / 15M)',
      shortName: 'General Aptitude',
      totalQs: 10,
      totalMarks: 15,
      iconName: 'Brain',
      description: 'Numerical computation, verbal comprehension, logical reasoning, and spatial deduction.',
      topics: [
        { id: 'ec_ga_quant', name: 'Quantitative & Spatial Aptitude', weightage: '60%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Arithmetic shortcuts & Data Interpretation', 'Spatial Folding & Visual Logic'], pyqCount: 120 },
        { id: 'ec_ga_verb', name: 'Verbal Ability & Logic', weightage: '40%', expectedQs: 4, importance: 'High', keyConcepts: ['Sentence Completion & Critical Deduction'], pyqCount: 100 }
      ],
      youtubePlaylists: [{
        title: 'GATE General Aptitude Complete Playlist',
        channel: 'GATE Wallah',
        url: 'https://www.youtube.com/playlist?list=PLvTTv60o7qj-PgF3DhvvTK6_-g_FU8wCT',
        videoCount: '35 Lectures'
      }]
    },
    {
      id: 'ec_edc_analog',
      branchId: 'ec',
      name: 'EDC & Analog Circuits (24M - 26M)',
      shortName: 'EDC & Analog Circuits',
      totalQs: 16,
      totalMarks: 25,
      iconName: 'Cpu',
      description: 'Semiconductor Physics, Carrier Transport, p-n Junction, BJT, MOSFET Characteristics, Op-Amps, Feedback Amplifiers, Active Filters & Oscillators.',
      topics: [
        { id: 'ec_edc_mosfet', name: 'Electronic Devices & Semiconductor Physics', weightage: '50%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Fermi-Dirac Statistics & Energy Band Diagrams', 'Carrier Drift, Diffusion & Continuity Equation', 'p-n Junction Depletion Width & Built-in Potential', 'MOS Capacitor C-V Curve & MOSFET Drain Current Equations'], pyqCount: 220 },
        { id: 'ec_analog_opamp', name: 'Analog Circuits (Op-Amps & BJT/MOS Amplifiers)', weightage: '50%', expectedQs: 8, importance: 'Critical', keyConcepts: ['Small Signal Analysis of BJT (CE, CB, CC) & MOSFET (CS, CD, CG)', 'Ideal & Practical Op-Amp (Inverting, Non-inverting, Integrator, Schmitt Trigger)', 'Negative Feedback Topologies & Barkhausen Criterion for Oscillators', 'Precision Rectifiers & 555 Timer Astable/Monostable Modes'], pyqCount: 215 }
      ],
      youtubePlaylists: [{
        title: 'GATE Electronics EDC & Analog Circuits Complete Series',
        channel: 'GATE Wallah ECE EE IN',
        url: 'https://www.youtube.com/@GATE_Wallah_ECE-EE-IN/playlists',
        videoCount: '70 Lectures'
      }]
    },
    {
      id: 'ec_comm_signals',
      branchId: 'ec',
      name: 'Communications & Signals and Systems (24M - 26M)',
      shortName: 'Communications & Signals',
      totalQs: 16,
      totalMarks: 25,
      iconName: 'Radio',
      description: 'AM, FM, PM, Digital Modulation (ASK, FSK, PSK, QAM), Information Theory, Shannon Channel Capacity, Noise Analysis (SNR, BER), Fourier & Z-Transforms.',
      topics: [
        { id: 'ec_comm_digital', name: 'Analog & Digital Communications', weightage: '55%', expectedQs: 9, importance: 'Critical', keyConcepts: ['AM/FM Modulation Index, Power & Bandwidth (Carsons Rule)', 'PCM, DPCM, Quantization Noise & Companding (A-law / mu-law)', 'BPSK, QPSK, QAM Constellations & Bit Error Rate (BER)', 'Shannons Capacity Theorem & Huffman / LZW Coding'], pyqCount: 225 },
        { id: 'ec_signals_lti', name: 'Signals & Systems (Continuous & Discrete)', weightage: '45%', expectedQs: 7, importance: 'Critical', keyConcepts: ['LTI System Stability, Causality & Impulse Response', 'Continuous/Discrete Fourier Transform & FFT Properties', 'Z-Transform Region of Convergence (ROC) & Digital Filter Realization', 'Nyquist Sampling Rate & Aliasing Filter Design'], pyqCount: 195 }
      ],
      youtubePlaylists: [{
        title: 'GATE Communications & Signals Masterclass',
        channel: 'GATE Wallah ECE EE IN',
        url: 'https://www.youtube.com/@GATE_Wallah_ECE-EE-IN/playlists',
        videoCount: '75 Lectures'
      }]
    },
    {
      id: 'ec_emft_digital_maths',
      branchId: 'ec',
      name: 'Electromagnetics, Digital Circuits & Maths (22M - 24M)',
      shortName: 'EMFT, Digital & Maths',
      totalQs: 14,
      totalMarks: 22,
      iconName: 'Layers',
      description: 'Maxwells Equations, Plane Waves, Transmission Lines (Smith Chart), Waveguides, Antennas, Combinational/Sequential Logic, Linear Algebra & Calculus.',
      topics: [
        { id: 'ec_emft_waves', name: 'Electromagnetics & Transmission Lines', weightage: '40%', expectedQs: 6, importance: 'Critical', keyConcepts: ['Maxwells Equations, Poynting Vector & Skin Depth', 'Plane Wave Reflection & Refraction (Brewsters Angle)', 'Transmission Line Impedance Matching & VSWR', 'Rectangular Waveguide Cutoff Frequency & Antennas (Gain/Directivity)'], pyqCount: 190 },
        { id: 'ec_digital_circuits', name: 'Digital Electronics & Logic Design', weightage: '30%', expectedQs: 4, importance: 'Critical', keyConcepts: ['K-Maps & Logic Minimization', 'Finite State Machines (Mealy & Moore Models)', 'Setup & Hold Time in Sequential Circuits', 'ADC / DAC Resolution & Conversion Speed'], pyqCount: 160 },
        { id: 'ec_maths_core', name: 'Engineering Mathematics', weightage: '30%', expectedQs: 4, importance: 'High', keyConcepts: ['Eigenvalues & Linear Systems', 'Complex Variables (Cauchy-Riemann & Residue Theorem)', 'Differential Equations & Probability Distributions'], pyqCount: 150 }
      ],
      youtubePlaylists: [{
        title: 'GATE Electromagnetics & Digital Circuits Lectures',
        channel: 'GATE Wallah ECE EE IN',
        url: 'https://www.youtube.com/@GATE_Wallah_ECE-EE-IN/playlists',
        videoCount: '60 Lectures'
      }]
    }
  ]
};

export const GATE_BRANCH_PYQS: Record<GateBranchId, GatePyqPaper[]> = {
  cs: [
    { id: 'gate_2025_cs', branchId: 'cs', year: '2025', title: 'GATE 2025 Computer Science & IT (Official IISc Paper)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 38400, difficulty: 'Standard GATE' },
    { id: 'gate_2024_cs', branchId: 'cs', year: '2024', title: 'GATE 2024 Computer Science & IT (Shift 1 & 2)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 49200, difficulty: 'Standard GATE' },
    { id: 'gate_2023_cs', branchId: 'cs', year: '2023', title: 'GATE 2023 Computer Science & IT (Official IIT Kanpur)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 52100, difficulty: 'Standard GATE' },
    { id: 'gate_2022_cs', branchId: 'cs', year: '2022', title: 'GATE 2022 Computer Science & IT (IIT Kharagpur)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 46800, difficulty: 'Moderate' },
    { id: 'gate_2021_cs', branchId: 'cs', year: '2021', title: 'GATE 2021 Computer Science & IT (IIT Bombay)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 44200, difficulty: 'Standard GATE' }
  ],
  da: [
    { id: 'gate_2025_da', branchId: 'da', year: '2025', title: 'GATE 2025 Data Science & AI (Official Paper)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 28900, difficulty: 'Standard GATE' },
    { id: 'gate_2024_da', branchId: 'da', year: '2024', title: 'GATE 2024 Data Science & AI (Inaugural Official Paper)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 41500, difficulty: 'Standard GATE' }
  ],
  me: [
    { id: 'gate_2025_me', branchId: 'me', year: '2025', title: 'GATE 2025 Mechanical Engineering (Official Paper)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 35600, difficulty: 'Standard GATE' },
    { id: 'gate_2024_me', branchId: 'me', year: '2024', title: 'GATE 2024 Mechanical Engineering (Shift 1 & 2)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 47800, difficulty: 'Standard GATE' },
    { id: 'gate_2023_me', branchId: 'me', year: '2023', title: 'GATE 2023 Mechanical Engineering (IIT Kanpur)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 51200, difficulty: 'Advanced IISc' }
  ],
  ce: [
    { id: 'gate_2025_ce', branchId: 'ce', year: '2025', title: 'GATE 2025 Civil Engineering (Official Paper)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 33400, difficulty: 'Standard GATE' },
    { id: 'gate_2024_ce', branchId: 'ce', year: '2024', title: 'GATE 2024 Civil Engineering (Shift 1 & 2)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 45200, difficulty: 'Standard GATE' },
    { id: 'gate_2023_ce', branchId: 'ce', year: '2023', title: 'GATE 2023 Civil Engineering (IIT Kanpur)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 48900, difficulty: 'Moderate' }
  ],
  ee: [
    { id: 'gate_2025_ee', branchId: 'ee', year: '2025', title: 'GATE 2025 Electrical Engineering (Official Paper)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 31200, difficulty: 'Standard GATE' },
    { id: 'gate_2024_ee', branchId: 'ee', year: '2024', title: 'GATE 2024 Electrical Engineering', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 42100, difficulty: 'Standard GATE' },
    { id: 'gate_2023_ee', branchId: 'ee', year: '2023', title: 'GATE 2023 Electrical Engineering (IIT Kanpur)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 46500, difficulty: 'Advanced IISc' }
  ],
  ec: [
    { id: 'gate_2025_ec', branchId: 'ec', year: '2025', title: 'GATE 2025 Electronics & Comm (Official Paper)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 30100, difficulty: 'Standard GATE' },
    { id: 'gate_2024_ec', branchId: 'ec', year: '2024', title: 'GATE 2024 Electronics & Communication', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 40900, difficulty: 'Standard GATE' },
    { id: 'gate_2023_ec', branchId: 'ec', year: '2023', title: 'GATE 2023 Electronics & Communication (IIT Kanpur)', totalQs: 65, totalMarks: 100, durationMinutes: 180, pdfUrl: '#', downloadCount: 44800, difficulty: 'Standard GATE' }
  ]
};

export const getGateModelPapersForBranch = (branchId: GateBranchId): GateModelPaper[] => {
  const branch = GATE_BRANCHES.find(b => b.id === branchId) || GATE_BRANCHES[0];
  return Array.from({ length: 15 }).map((_, i) => ({
    id: `gate_model_${branchId}_${i + 1}`,
    branchId: branchId,
    title: `GATE ${branch.code} Full Mock Exam #${i + 1}`,
    paperNumber: i + 1,
    difficulty: i % 3 === 0 ? 'Standard GATE' : i % 3 === 1 ? 'Advanced IISc' : 'Moderate',
    totalQuestions: 65,
    totalMarks: 100,
    durationMinutes: 180,
    description: `Official 65-question 100-mark simulated CBT paper for ${branch.name}. Includes 10 General Aptitude + 55 Core Technical questions with MCQ, MSQ, NAT and full step-by-step solutions.`
  }));
};

// Backward compatibility exports
export const GATE_SUBJECTS = GATE_BRANCH_SUBJECTS.cs;
export const GATE_PYQ_PAPERS = GATE_BRANCH_PYQS.cs;
export const GATE_MODEL_PAPERS = getGateModelPapersForBranch('cs');
