export interface AfcatTopic {
  id: string;
  name: string;
  weightage: string;
  expectedQs: number;
  importance: 'High' | 'Medium' | 'Critical';
  keyConcepts: string[];
}

export interface AfcatSubject {
  id: string;
  name: string;
  totalQs: number;
  totalMarks: number;
  iconName: string;
  description: string;
  topics: AfcatTopic[];
  youtubePlaylist: {
    title: string;
    channel: string;
    url: string;
    videoCount: string;
  };
}

export interface AfcatPyqPaper {
  id: string;
  year: string;
  shift: string;
  totalQs: number;
  totalMarks: number;
  pdfUrl: string;
  downloadCount: number;
}

export interface AfcatModelPaper {
  id: string;
  title: string;
  paperNumber: number;
  difficulty: 'Moderate' | 'AFCAT Standard' | 'Advanced';
  totalQuestions: number;
  durationMinutes: number;
  pdfUrl: string;
  description: string;
}

export interface AfcatQuestion {
  id: string;
  subjectId: string;
  topicId: string;
  topicName: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const AFCAT_EXAM_PATTERN = {
  examName: "Air Force Common Admission Test (AFCAT)",
  conductingBody: "Indian Air Force (IAF)",
  frequency: "Bi-annually (AFCAT 1 in Feb, AFCAT 2 in Aug)",
  totalQuestions: 100,
  totalMarks: 300,
  durationMinutes: 120, // 2 Hours
  markingScheme: {
    correct: "+3 Marks",
    incorrect: "-1 Mark (Negative Marking)",
    unattempted: "0 Marks"
  },
  expectedCutoff: "155 - 165 Marks out of 300",
  selectionProcess: [
    "1. Online Computer-Based Test (AFCAT)",
    "2. Air Force Selection Board (AFSB) Interview (5 Days)",
    "3. Medical Examination",
    "4. All-India Merit List"
  ]
};

export const AFCAT_SUBJECTS: AfcatSubject[] = [
  {
    id: 'english',
    name: 'Verbal Ability in English',
    totalQs: 30,
    totalMarks: 90,
    iconName: 'BookOpen',
    description: 'Tests vocabulary, reading comprehension, grammar rules, and sentence structures.',
    topics: [
      {
        id: 'eng_reading_comp',
        name: 'Reading Comprehension',
        weightage: '15-20%',
        expectedQs: 5,
        importance: 'Critical',
        keyConcepts: ['Main idea extraction', 'Tone identification', 'Direct factual questions', 'Inference based questions']
      },
      {
        id: 'eng_error_spotting',
        name: 'Error Detection & Grammar',
        weightage: '15-20%',
        expectedQs: 5,
        importance: 'Critical',
        keyConcepts: ['Subject-Verb Agreement', 'Prepositions & Tenses', 'Modifiers & Pronouns', 'Parallel Structure']
      },
      {
        id: 'eng_syn_ant',
        name: 'Synonyms & Antonyms',
        weightage: '15-20%',
        expectedQs: 5,
        importance: 'High',
        keyConcepts: ['Defence-frequent vocabulary', 'Contextual meanings', 'Root word techniques', 'Confusing words']
      },
      {
        id: 'eng_idioms_phrases',
        name: 'Idioms & Phrases',
        weightage: '15%',
        expectedQs: 5,
        importance: 'High',
        keyConcepts: ['Military & action idioms', 'Proverbs', 'Contextual usage', 'Phrasal verbs']
      },
      {
        id: 'eng_sentence_completion',
        name: 'Sentence Completion & Fillers',
        weightage: '15%',
        expectedQs: 5,
        importance: 'Medium',
        keyConcepts: ['Double fillers', 'Grammatical fit', 'Vocabulary context']
      },
      {
        id: 'eng_one_word',
        name: 'One Word Substitution & Cloze Test',
        weightage: '15%',
        expectedQs: 5,
        importance: 'Medium',
        keyConcepts: ['Person/Profession terms', 'Scientific & Literary terms', 'Paragraph context filling']
      }
    ],
    youtubePlaylist: {
      title: 'AFCAT English Complete Master Course',
      channel: 'Defence Wallah',
      url: 'https://www.youtube.com/playlist?list=PL280mStbnd4W3y9Xk-KkZq2K918W6J81v',
      videoCount: '28 Videos'
    }
  },
  {
    id: 'maths',
    name: 'Numerical Ability',
    totalQs: 20,
    totalMarks: 60,
    iconName: 'Zap',
    description: 'Tests elementary mathematics, arithmetic, and problem-solving speed.',
    topics: [
      {
        id: 'math_time_work',
        name: 'Time & Work / Pipes & Cisterns',
        weightage: '15%',
        expectedQs: 3,
        importance: 'Critical',
        keyConcepts: ['Efficiency method', 'Alternate days work', 'Pipes filling and emptying', 'Man-Days formula']
      },
      {
        id: 'math_speed_time',
        name: 'Speed, Distance & Time / Trains',
        weightage: '15%',
        expectedQs: 3,
        importance: 'Critical',
        keyConcepts: ['Relative speed', 'Train crossing pole/platform', 'Boats & Streams', 'Average speed']
      },
      {
        id: 'math_profit_loss',
        name: 'Profit, Loss & Discount',
        weightage: '15%',
        expectedQs: 3,
        importance: 'Critical',
        keyConcepts: ['Cost price vs Marked price', 'Successive discounts', 'Dishonest dealer problems']
      },
      {
        id: 'math_simple_compound_interest',
        name: 'Simple & Compound Interest',
        weightage: '15%',
        expectedQs: 3,
        importance: 'High',
        keyConcepts: ['SI vs CI difference formula', 'Half-yearly & quarterly compounding', 'Installment problems']
      },
      {
        id: 'math_ratio_prop',
        name: 'Ratio, Proportion & Mixture',
        weightage: '10%',
        expectedQs: 2,
        importance: 'High',
        keyConcepts: ['Alligation method', 'Sub-duplicate ratios', 'Partnership calculations']
      },
      {
        id: 'math_decimal_fractions',
        name: 'Decimal Fractions & Simplification',
        weightage: '10%',
        expectedQs: 2,
        importance: 'Medium',
        keyConcepts: ['BODMAS rule', 'Recurring decimals', 'Surds and Indices basics']
      },
      {
        id: 'math_average_percentage',
        name: 'Average & Percentage',
        weightage: '20%',
        expectedQs: 4,
        importance: 'High',
        keyConcepts: ['Weighted average', 'Inclusion/Exclusion in average', 'Percentage change and equivalence']
      }
    ],
    youtubePlaylist: {
      title: 'AFCAT Maths Complete Foundation & Practice',
      channel: 'CDS Journey / Defence Wallah',
      url: 'https://www.youtube.com/playlist?list=PL280mStbnd4W-AFCAT-Maths-Foundation',
      videoCount: '35 Videos'
    }
  },
  {
    id: 'reasoning',
    name: 'Reasoning & Military Aptitude',
    totalQs: 25,
    totalMarks: 75,
    iconName: 'Brain',
    description: 'High-scoring section evaluating spatial awareness, logical deduction, and pattern analysis.',
    topics: [
      {
        id: 'reas_venn_diagrams',
        name: 'Venn Diagrams & Logical Groups',
        weightage: '16%',
        expectedQs: 4,
        importance: 'Critical',
        keyConcepts: ['Three-circle overlapping diagrams', 'Relationship identification', 'Deductive reasoning']
      },
      {
        id: 'reas_non_verbal_pattern',
        name: 'Pattern Completion & Series',
        weightage: '20%',
        expectedQs: 5,
        importance: 'Critical',
        keyConcepts: ['Figure rotation (90°/180°)', 'Element addition/deletion', 'Mirror and water images']
      },
      {
        id: 'reas_embedded_figures',
        name: 'Embedded Figures & Spatial Ability',
        weightage: '16%',
        expectedQs: 4,
        importance: 'High',
        keyConcepts: ['Hidden pattern detection', 'Dot situation test', 'Cube and dice orientation']
      },
      {
        id: 'reas_odd_one_out',
        name: 'Odd One Out (Verbal & Non-Verbal)',
        weightage: '20%',
        expectedQs: 5,
        importance: 'High',
        keyConcepts: ['Classification by shape/symmetry', 'Semantic classification', 'Number & Word oddities']
      },
      {
        id: 'reas_analogy',
        name: 'Verbal & Figure Analogy',
        weightage: '16%',
        expectedQs: 4,
        importance: 'Medium',
        keyConcepts: ['Figure relationship mapping', 'Word pair relationship', 'Functional analogies']
      },
      {
        id: 'reas_blood_rel_coding',
        name: 'Coding-Decoding & Direction Sense',
        weightage: '12%',
        expectedQs: 3,
        importance: 'Medium',
        keyConcepts: ['Substitutional coding', 'Family tree diagrams', 'Pythagorean displacement']
      }
    ],
    youtubePlaylist: {
      title: 'AFCAT Reasoning & Military Aptitude Full Course',
      channel: 'Defence Wallah',
      url: 'https://www.youtube.com/playlist?list=PL280mStbnd4X-Reasoning-AFCAT-Course',
      videoCount: '24 Videos'
    }
  },
  {
    id: 'ga',
    name: 'General Awareness & Defence GK',
    totalQs: 25,
    totalMarks: 75,
    iconName: 'Shield',
    description: 'Covers IAF equipment, defence exercises, Indian history, geography, polity, science, and current affairs.',
    topics: [
      {
        id: 'ga_defence_knowledge',
        name: 'Defence News, Commands & Joint Exercises',
        weightage: '24%',
        expectedQs: 6,
        importance: 'Critical',
        keyConcepts: ['IAF Commands & Ranks', 'Aircrafts (Rafale, Su-30MKI, Tejas)', 'Missiles (BrahMos, Akash, Astra)', 'Bilateral Military Exercises (Malabar, Yudh Abhyas, Garuda)']
      },
      {
        id: 'ga_history',
        name: 'Indian History & National Movement',
        weightage: '16%',
        expectedQs: 4,
        importance: 'High',
        keyConcepts: ['Modern Indian History (1857-1947)', 'Ancient dynasties & capitals', 'Vedic civilization basics']
      },
      {
        id: 'ga_geography',
        name: 'Geography & Environment',
        weightage: '16%',
        expectedQs: 4,
        importance: 'High',
        keyConcepts: ['Indian Rivers & Tributaries', 'National Parks & Biosphere Reserves', 'Atmospheric layers & Climate']
      },
      {
        id: 'ga_polity',
        name: 'Indian Polity & Constitution',
        weightage: '12%',
        expectedQs: 3,
        importance: 'Medium',
        keyConcepts: ['Fundamental Rights & Duties', 'President & Supreme Court', 'Constitutional Amendments']
      },
      {
        id: 'ga_science',
        name: 'Basic Everyday Science',
        weightage: '16%',
        expectedQs: 4,
        importance: 'High',
        keyConcepts: ['Physics principles (Bernoulli, Doppler)', 'Chemical compounds & uses', 'Human anatomy & vitamins']
      },
      {
        id: 'ga_sports_static',
        name: 'Sports, Awards & Static GK',
        weightage: '16%',
        expectedQs: 4,
        importance: 'Medium',
        keyConcepts: ['Grand Slams & Olympics', 'Param Vir Chakra & Defence Awards', 'Books, Authors & Firsts in India']
      }
    ],
    youtubePlaylist: {
      title: 'AFCAT General Awareness & Defence Special',
      channel: 'Defence Wallah / Testbook Defence',
      url: 'https://www.youtube.com/playlist?list=PL280mStbnd4Y-GA-Defence-AFCAT-Course',
      videoCount: '40 Videos'
    }
  }
];

export const AFCAT_PYQS: AfcatPyqPaper[] = [
  {
    id: 'pyq_2025_1',
    year: '2025',
    shift: 'AFCAT 1 (Feb 2025)',
    totalQs: 100,
    totalMarks: 300,
    pdfUrl: 'https://raw.githubusercontent.com/AFCAT-Prep-Vault/pdf-repo/main/AFCAT_1_2025_Paper_AnswerKey.pdf',
    downloadCount: 14250
  },
  {
    id: 'pyq_2024_2',
    year: '2024',
    shift: 'AFCAT 2 (Aug 2024)',
    totalQs: 100,
    totalMarks: 300,
    pdfUrl: 'https://raw.githubusercontent.com/AFCAT-Prep-Vault/pdf-repo/main/AFCAT_2_2024_Paper_AnswerKey.pdf',
    downloadCount: 28900
  },
  {
    id: 'pyq_2024_1',
    year: '2024',
    shift: 'AFCAT 1 (Feb 2024)',
    totalQs: 100,
    totalMarks: 300,
    pdfUrl: 'https://raw.githubusercontent.com/AFCAT-Prep-Vault/pdf-repo/main/AFCAT_1_2024_Paper_AnswerKey.pdf',
    downloadCount: 31200
  },
  {
    id: 'pyq_2023_2',
    year: '2023',
    shift: 'AFCAT 2 (Aug 2023)',
    totalQs: 100,
    totalMarks: 300,
    pdfUrl: 'https://raw.githubusercontent.com/AFCAT-Prep-Vault/pdf-repo/main/AFCAT_2_2023_Paper_AnswerKey.pdf',
    downloadCount: 41500
  },
  {
    id: 'pyq_2023_1',
    year: '2023',
    shift: 'AFCAT 1 (Feb 2023)',
    totalQs: 100,
    totalMarks: 300,
    pdfUrl: 'https://raw.githubusercontent.com/AFCAT-Prep-Vault/pdf-repo/main/AFCAT_1_2023_Paper_AnswerKey.pdf',
    downloadCount: 38900
  },
  {
    id: 'pyq_2022_2',
    year: '2022',
    shift: 'AFCAT 2 (Aug 2022)',
    totalQs: 100,
    totalMarks: 300,
    pdfUrl: 'https://raw.githubusercontent.com/AFCAT-Prep-Vault/pdf-repo/main/AFCAT_2_2022_Paper_AnswerKey.pdf',
    downloadCount: 45000
  },
  {
    id: 'pyq_2022_1',
    year: '2022',
    shift: 'AFCAT 1 (Feb 2022)',
    totalQs: 100,
    totalMarks: 300,
    pdfUrl: 'https://raw.githubusercontent.com/AFCAT-Prep-Vault/pdf-repo/main/AFCAT_1_2022_Paper_AnswerKey.pdf',
    downloadCount: 42100
  },
  {
    id: 'pyq_2021_2',
    year: '2021',
    shift: 'AFCAT 2 (Aug 2021)',
    totalQs: 100,
    totalMarks: 300,
    pdfUrl: 'https://raw.githubusercontent.com/AFCAT-Prep-Vault/pdf-repo/main/AFCAT_2_2021_Paper_AnswerKey.pdf',
    downloadCount: 39400
  }
];

export const AFCAT_MODEL_PAPERS: AfcatModelPaper[] = Array.from({ length: 15 }, (_, i) => ({
  id: `model_paper_${i + 1}`,
  title: `AFCAT Official Level Model Test Paper ${i + 1}`,
  paperNumber: i + 1,
  difficulty: i % 3 === 0 ? 'Advanced' : i % 2 === 0 ? 'AFCAT Standard' : 'Moderate',
  totalQuestions: 100,
  durationMinutes: 120,
  pdfUrl: `https://raw.githubusercontent.com/AFCAT-Prep-Vault/pdf-repo/main/AFCAT_Model_Paper_${i + 1}_With_Solutions.pdf`,
  description: `Full 100-Question mock exam crafted strictly as per recent IAF pattern (30 English, 20 Maths, 25 Reasoning, 25 GA) with detailed step-by-step solutions.`
}));

export const AFCAT_QUESTION_BANK: AfcatQuestion[] = [
  // English Questions
  {
    id: 'q_eng_1',
    subjectId: 'english',
    topicId: 'eng_error_spotting',
    topicName: 'Error Detection & Grammar',
    questionText: 'Identify the segment in the sentence which contains a grammatical error:\n"Neither the pilot nor the flight engineers was able to locate the emergency transmitter in time."',
    options: [
      'Neither the pilot',
      'nor the flight engineers',
      'was able to locate',
      'the emergency transmitter in time'
    ],
    correctOptionIndex: 2,
    explanation: 'When two subjects are connected by "neither... nor", the verb agrees with the closer subject. Here, "flight engineers" is plural, so the verb should be "were able to locate" instead of "was able to locate".',
    difficulty: 'Medium'
  },
  {
    id: 'q_eng_2',
    subjectId: 'english',
    topicId: 'eng_syn_ant',
    topicName: 'Synonyms & Antonyms',
    questionText: 'Choose the word which is MOST SIMILAR in meaning to the word "VALIANT":',
    options: [
      'Cowardly',
      'Gallant',
      'Timid',
      'Hesitant'
    ],
    correctOptionIndex: 1,
    explanation: '"Valiant" means possessing or showing courage or determination (brave/heroic). "Gallant" is the exact synonym.',
    difficulty: 'Easy'
  },
  {
    id: 'q_eng_3',
    subjectId: 'english',
    topicId: 'eng_idioms_phrases',
    topicName: 'Idioms & Phrases',
    questionText: 'What is the meaning of the idiom "To burn the midnight oil"?',
    options: [
      'To waste precious fuel',
      'To work or study late into the night',
      'To create a fire hazard',
      'To complete a task early in the morning'
    ],
    correctOptionIndex: 1,
    explanation: '"To burn the midnight oil" means to read, study, or work late into the night.',
    difficulty: 'Easy'
  },
  {
    id: 'q_eng_4',
    subjectId: 'english',
    topicId: 'eng_sentence_completion',
    topicName: 'Sentence Completion & Fillers',
    questionText: 'Fill in the blank with the most appropriate prepositions:\n"The fighter jet flew _____ the cloud barrier and safely landed _____ the naval airbase."',
    options: [
      'through, at',
      'above, in',
      'under, on',
      'over, into'
    ],
    correctOptionIndex: 0,
    explanation: '"Flew through" describes motion passing inside the clouds, and "landed at" is the precise preposition for a specific base/location.',
    difficulty: 'Medium'
  },
  {
    id: 'q_eng_5',
    subjectId: 'english',
    topicId: 'eng_syn_ant',
    topicName: 'Synonyms & Antonyms',
    questionText: 'Choose the word which is MOST OPPOSITE in meaning to "TRANSIENT":',
    options: [
      'Fleeting',
      'Permanent',
      'Ephemeral',
      'Momentary'
    ],
    correctOptionIndex: 1,
    explanation: '"Transient" means lasting only for a short time (temporary/fleeting). The antonym is "Permanent".',
    difficulty: 'Medium'
  },

  // Numerical Ability Questions
  {
    id: 'q_math_1',
    subjectId: 'maths',
    topicId: 'math_time_work',
    topicName: 'Time & Work',
    questionText: 'A and B can complete a piece of work in 12 days and 18 days respectively. They work together for 4 days, after which B leaves. How many days will A alone take to finish the remaining work?',
    options: [
      '5.33 days',
      '6 days',
      '5.33 days',
      '5.33 days (5 1/3 days)'
    ],
    correctOptionIndex: 3,
    explanation: 'Work efficiency: A = 1/12, B = 1/18. Combined (A+B) = 1/12 + 1/18 = 5/36 per day. In 4 days work done = 4 * (5/36) = 5/9. Remaining work = 1 - 5/9 = 4/9. Time for A = (4/9) / (1/12) = 48/9 = 16/3 = 5 1/3 days.',
    difficulty: 'Medium'
  },
  {
    id: 'q_math_2',
    subjectId: 'maths',
    topicId: 'math_speed_time',
    topicName: 'Speed, Distance & Time',
    questionText: 'A train 150 meters long passes a telegraph post in 9 seconds. What is the speed of the train in km/h?',
    options: [
      '50 km/h',
      '60 km/h',
      '72 km/h',
      '80 km/h'
    ],
    correctOptionIndex: 1,
    explanation: 'Speed = Distance / Time = 150 / 9 m/s = 50/3 m/s. Convert to km/h: (50/3) * (18/5) = 60 km/h.',
    difficulty: 'Easy'
  },
  {
    id: 'q_math_3',
    subjectId: 'maths',
    topicId: 'math_profit_loss',
    topicName: 'Profit, Loss & Discount',
    questionText: 'An article is marked 25% above cost price. If a discount of 10% is allowed on the marked price, what is the net profit percentage?',
    options: [
      '12.5%',
      '15%',
      '10%',
      '14%'
    ],
    correctOptionIndex: 0,
    explanation: 'Let CP = 100. Marked Price MP = 125. Selling Price SP = 125 * 0.90 = 112.5. Profit = 112.5 - 100 = 12.5%.',
    difficulty: 'Easy'
  },
  {
    id: 'q_math_4',
    subjectId: 'maths',
    topicId: 'math_simple_compound_interest',
    topicName: 'Simple & Compound Interest',
    questionText: 'The difference between Simple Interest and Compound Interest on a sum of money for 2 years at 10% per annum is ₹45. Find the principal sum.',
    options: [
      '₹4,500',
      '₹4,000',
      '₹5,000',
      '₹3,500'
    ],
    correctOptionIndex: 0,
    explanation: 'Formula for 2 years CI - SI difference = P * (R/100)^2. Here 45 = P * (10/100)^2 => 45 = P * (1/100) => P = ₹4,500.',
    difficulty: 'Medium'
  },

  // Reasoning Questions
  {
    id: 'q_reas_1',
    subjectId: 'reasoning',
    topicId: 'reas_venn_diagrams',
    topicName: 'Venn Diagrams',
    questionText: 'Which of the following Venn diagrams best represents the relationship between:\n"Pilots", "Air Force Officers", and "Engineers"?',
    options: [
      'Three concentric circles',
      'Three mutually disjoint circles',
      'Three intersecting circles showing overlapping categories',
      'Two concentric circles inside a third'
    ],
    correctOptionIndex: 2,
    explanation: 'An Air Force Officer can be a Pilot or an Engineer. A Pilot can also be an Engineer. Hence, all three categories overlap partially with each other.',
    difficulty: 'Medium'
  },
  {
    id: 'q_reas_2',
    subjectId: 'reasoning',
    topicId: 'reas_odd_one_out',
    topicName: 'Odd One Out',
    questionText: 'Find the odd one out among the given options:',
    options: [
      'Sukhoi Su-30MKI',
      'Rafale',
      'LCH Prachand',
      'Mirage 2000'
    ],
    correctOptionIndex: 2,
    explanation: 'Su-30MKI, Rafale, and Mirage 2000 are all fixed-wing fighter aircraft of the IAF, whereas LCH Prachand is a Light Combat Helicopter.',
    difficulty: 'Medium'
  },
  {
    id: 'q_reas_3',
    subjectId: 'reasoning',
    topicId: 'reas_embedded_figures',
    topicName: 'Embedded Figures & Spatial Ability',
    questionText: 'Select the option figure that contains the given question pattern as its hidden part (rotation is not allowed).',
    options: [
      'Figure A',
      'Figure B',
      'Figure C',
      'Figure D'
    ],
    correctOptionIndex: 1,
    explanation: 'Tracing lines in Figure B shows exact match with the target geometric sub-structure without requiring rotation.',
    difficulty: 'Hard'
  },

  // General Awareness Questions
  {
    id: 'q_ga_1',
    subjectId: 'ga',
    topicId: 'ga_defence_knowledge',
    topicName: 'Defence News & Commands',
    questionText: 'Where is the Headquarters of the Maintenance Command of the Indian Air Force located?',
    options: [
      'New Delhi',
      'Nagpur',
      'Bengaluru',
      'Shillong'
    ],
    correctOptionIndex: 1,
    explanation: 'The IAF Maintenance Command is located in Nagpur, Maharashtra. (Western: New Delhi, Eastern: Shillong, Central: Prayagraj, Southern: Thiruvananthapuram, Training: Bengaluru, Maintenance: Nagpur).',
    difficulty: 'Medium'
  },
  {
    id: 'q_ga_2',
    subjectId: 'ga',
    topicId: 'ga_defence_knowledge',
    topicName: 'Defence News & Exercises',
    questionText: 'The joint military exercise "GARUDA" is conducted between India and which country?',
    options: [
      'France',
      'USA',
      'Japan',
      'United Kingdom'
    ],
    correctOptionIndex: 0,
    explanation: 'Exercise Garuda is an air exercise conducted bilaterally between the Indian Air Force and the French Air and Space Force.',
    difficulty: 'Easy'
  },
  {
    id: 'q_ga_3',
    subjectId: 'ga',
    topicId: 'ga_history',
    topicName: 'Indian History',
    questionText: 'Who was the Governor-General of India during the Revolt of 1857?',
    options: [
      'Lord Dalhousie',
      'Lord Canning',
      'Lord Curzon',
      'Lord Ripon'
    ],
    correctOptionIndex: 1,
    explanation: 'Lord Canning was the Governor-General of India during the Revolt of 1857 and later became the first Viceroy of India.',
    difficulty: 'Medium'
  },
  {
    id: 'q_ga_4',
    subjectId: 'ga',
    topicId: 'ga_science',
    topicName: 'Basic Science',
    questionText: 'On which principle does the hydraulic lift work?',
    options: [
      'Archimedes Principle',
      'Pascal\'s Law',
      'Bernoulli\'s Theorem',
      'Newton\'s Third Law'
    ],
    correctOptionIndex: 1,
    explanation: 'Hydraulic lifts and brakes operate on Pascal\'s Law, which states that pressure applied to an enclosed fluid is transmitted undiminished in all directions.',
    difficulty: 'Easy'
  },
  {
    id: 'q_eng_6',
    subjectId: 'english',
    topicId: 'eng_one_word',
    topicName: 'One Word Substitution',
    questionText: 'Select the word which means "A person who is skilled in aerial navigation and piloting of aircraft":',
    options: [
      'Aeronaut',
      'Aviator',
      'Cosmonaut',
      'Navigator'
    ],
    correctOptionIndex: 1,
    explanation: 'An "Aviator" is a person who operates or is certified to pilot an aircraft.',
    difficulty: 'Easy'
  },
  {
    id: 'q_eng_7',
    subjectId: 'english',
    topicId: 'eng_reading_comp',
    topicName: 'Reading Comprehension',
    questionText: 'In a passage discussing stealth air superiority, what is the primary purpose of Radar-Absorbent Material (RAM) applied to jet skin?',
    options: [
      'To increase aircraft speed',
      'To reduce heat signature',
      'To dissipate electromagnetic energy and minimize Radar Cross-Section (RCS)',
      'To prevent air drag at supersonic speeds'
    ],
    correctOptionIndex: 2,
    explanation: 'RAM absorbs incoming radar electromagnetic waves and converts them into heat, significantly reducing the aircraft\'s Radar Cross-Section (RCS).',
    difficulty: 'Hard'
  },
  {
    id: 'q_math_5',
    subjectId: 'maths',
    topicId: 'math_ratio_prop',
    topicName: 'Ratio, Proportion & Mixture',
    questionText: 'In a mixture of 60 liters, the ratio of milk and water is 2:1. How much water must be added to make the ratio of milk and water 1:2?',
    options: [
      '40 liters',
      '60 liters',
      '50 liters',
      '30 liters'
    ],
    correctOptionIndex: 1,
    explanation: 'Milk = 40L, Water = 20L. We want Milk / (Water + x) = 1/2 => 40 / (20 + x) = 1/2 => 80 = 20 + x => x = 60 liters.',
    difficulty: 'Medium'
  },
  {
    id: 'q_math_6',
    subjectId: 'maths',
    topicId: 'math_decimal_fractions',
    topicName: 'Decimal Fractions & Simplification',
    questionText: 'Simplify the expression: (0.333... + 0.666...) * 0.5',
    options: [
      '0.45',
      '0.50',
      '1.00',
      '0.75'
    ],
    correctOptionIndex: 1,
    explanation: '0.333... = 1/3 and 0.666... = 2/3. Sum = 1/3 + 2/3 = 1.0. 1.0 * 0.5 = 0.50.',
    difficulty: 'Easy'
  },
  {
    id: 'q_math_7',
    subjectId: 'maths',
    topicId: 'math_average_percentage',
    topicName: 'Average & Percentage',
    questionText: 'The average weight of 8 cadet officers increases by 1.5 kg when a new cadet replaces one who weighs 65 kg. What is the weight of the new cadet?',
    options: [
      '75 kg',
      '77 kg',
      '80 kg',
      '72 kg'
    ],
    correctOptionIndex: 1,
    explanation: 'Total weight increase = 8 * 1.5 kg = 12 kg. Weight of new cadet = 65 + 12 = 77 kg.',
    difficulty: 'Medium'
  },
  {
    id: 'q_reas_4',
    subjectId: 'reasoning',
    topicId: 'reas_non_verbal_pattern',
    topicName: 'Pattern Completion',
    questionText: 'A figure is rotated 90 degrees clockwise in each step. After 3 rotations, what is its net orientation relative to original?',
    options: [
      '90 degrees Anti-clockwise',
      '180 degrees Opposite',
      '270 degrees Clockwise (same as 90 deg Anti-clockwise)',
      '360 degrees Full Circle'
    ],
    correctOptionIndex: 2,
    explanation: '3 * 90° clockwise = 270° clockwise, which is geometrically equivalent to a 90° anti-clockwise rotation.',
    difficulty: 'Easy'
  },
  {
    id: 'q_reas_5',
    subjectId: 'reasoning',
    topicId: 'reas_analogy',
    topicName: 'Analogy & Series',
    questionText: 'Complete the analogy: Flight Envelope : Aircraft :: Submarine : _____',
    options: [
      'Periscope',
      'Depth Rating / Test Depth',
      'Sonar',
      'Torpedo'
    ],
    correctOptionIndex: 1,
    explanation: 'A Flight Envelope defines operational boundaries for an aircraft, just as Test Depth / Operating Depth defines operational limits for a submarine.',
    difficulty: 'Medium'
  },
  {
    id: 'q_reas_6',
    subjectId: 'reasoning',
    topicId: 'reas_blood_rel_coding',
    topicName: 'Coding-Decoding',
    questionText: 'If "RADAR" is coded as "SBETS", how will "PILOT" be coded in that same rule?',
    options: [
      'QJMPU',
      'QJMPU',
      'QJMPU',
      'QJMPU (Each letter +1)'
    ],
    correctOptionIndex: 3,
    explanation: 'Each letter is shifted by +1 (R->S, A->B, D->E, A->B, R->S). For PILOT: P->Q, I->J, L->M, O->P, T->U => QJMPU.',
    difficulty: 'Easy'
  },
  {
    id: 'q_ga_5',
    subjectId: 'ga',
    topicId: 'ga_geography',
    topicName: 'Geography',
    questionText: 'Which Indian river is known as the "Dakshin Ganga"?',
    options: [
      'Krishna',
      'Godavari',
      'Kaveri',
      'Narmada'
    ],
    correctOptionIndex: 1,
    explanation: 'Godavari is the longest river in Peninsular India and is known as "Dakshin Ganga" (Ganga of the South).',
    difficulty: 'Easy'
  },
  {
    id: 'ga_6',
    subjectId: 'ga',
    topicId: 'ga_polity',
    topicName: 'Indian Polity',
    questionText: 'Who is the Supreme Commander of the Indian Armed Forces?',
    options: [
      'Prime Minister of India',
      'Chief of Defence Staff (CDS)',
      'President of India',
      'Defence Minister'
    ],
    correctOptionIndex: 2,
    explanation: 'Under Article 53(2) of the Constitution of India, the supreme command of the Defence Forces of the Union is vested in the President of India.',
    difficulty: 'Easy'
  },
  {
    id: 'ga_7',
    subjectId: 'ga',
    topicId: 'ga_sports_static',
    topicName: 'Sports & Awards',
    questionText: 'Who was the first recipient of the Param Vir Chakra, India\'s highest military decoration?',
    options: [
      'Major Somnath Sharma',
      'Captain Vikram Batra',
      'Subedar Joginder Singh',
      'Major Shaitan Singh'
    ],
    correctOptionIndex: 0,
    explanation: 'Major Somnath Sharma was posthumously awarded the first Param Vir Chakra for bravery during the 1947 Battle of Badgam.',
    difficulty: 'Medium'
  }
];
