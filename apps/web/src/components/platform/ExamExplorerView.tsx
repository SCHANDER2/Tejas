'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Shield, 
  Zap, 
  GraduationCap, 
  BookOpen, 
  Target, 
  Brain, 
  BarChart3, 
  ArrowRight, 
  CheckCircle, 
  ExternalLink,
  Award,
  Sparkles
} from 'lucide-react';

interface ExamExplorerViewProps {
  onNavigateExam: (examId: string) => void;
}

export default function ExamExplorerView({ onNavigateExam }: ExamExplorerViewProps) {
  const [filterCategory, setFilterCategory] = useState<'all' | 'defence' | 'engineering' | 'medical' | 'civil' | 'aptitude'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allExams = [
    {
      id: 'afcat',
      name: 'AFCAT (Air Force Common Admission Test)',
      agency: 'Indian Air Force / CDAC',
      category: 'defence',
      icon: Shield,
      color: '#FAA114',
      candidates: '5,00,000+',
      eligibility: 'Graduate in any discipline (60% Min) or B.E/B.Tech with 60% marks in 10+2 Physics & Maths.',
      ageLimit: 'Flying Branch: 20-24 Yrs | Ground Duty: 20-26 Yrs',
      pattern: '100 MCQs • 300 Marks • 120 Mins',
      marking: '+3 for Correct, -1 for Incorrect, 0 for Unattempted',
      subjects: ['English Verbal Ability (30 Qs)', 'Numerical Ability (20 Qs)', 'Reasoning & Military Aptitude (25 Qs)', 'General Awareness (25 Qs)']
    },
    {
      id: 'gate',
      name: 'GATE (Graduate Aptitude Test in Engineering)',
      agency: 'IISc Bangalore & IITs',
      category: 'engineering',
      icon: Brain,
      color: '#6366F1',
      candidates: '9,00,000+',
      eligibility: 'Bachelor’s degree in Engineering / Technology / Science / Architecture or final year students.',
      ageLimit: 'No Age Limit',
      pattern: '65 Questions (MCQ + NAT + MSQ) • 100 Marks • 180 Mins',
      marking: '1-Mark: +1/-0.33 | 2-Mark: +2/-0.66 | NAT/MSQ: No Negative Marking',
      subjects: ['General Aptitude (15 Marks)', 'Engineering Mathematics (13 Marks)', 'Core Engineering Subject (72 Marks)']
    },
    {
      id: 'cds',
      name: 'UPSC CDS (Combined Defence Services)',
      agency: 'Union Public Service Commission (UPSC)',
      category: 'defence',
      icon: Shield,
      color: '#22C55E',
      candidates: '6,00,000+',
      eligibility: 'IMA/OTA: Degree of a recognized University | INA: Degree in Engineering | AFA: Degree with Physics & Maths in 10+2 or B.E.',
      ageLimit: 'IMA: 19-24 Yrs | INA: 19-24 Yrs | AFA: 20-24 Yrs | OTA: 19-25 Yrs',
      pattern: 'IMA: 3 Papers (340 Qs / 300M / 6 Hrs) | OTA: 2 Papers (240 Qs / 200M / 4 Hrs)',
      marking: '+0.833 / +1.0 per Correct, 1/3rd Negative Marking',
      subjects: ['English (120 Qs)', 'General Knowledge (120 Qs)', 'Elementary Mathematics (100 Qs - IMA only)']
    },
    {
      id: 'nda',
      name: 'UPSC NDA & NA (National Defence Academy)',
      agency: 'Union Public Service Commission (UPSC)',
      category: 'defence',
      icon: Shield,
      color: '#FAA114',
      candidates: '8,00,000+',
      eligibility: 'Army Wing: 12th Class pass | Air Force & Naval Wings: 12th Class pass with Physics, Chemistry & Maths.',
      ageLimit: '16.5 - 19.5 Years (Unmarried Male & Female candidates)',
      pattern: 'Paper 1: Maths (120 Qs / 300M / 2.5h) | Paper 2: GAT (150 Qs / 600M / 2.5h)',
      marking: 'Maths: +2.5 / -0.83 | GAT: +4.0 / -1.33',
      subjects: ['Mathematics (120 Qs)', 'English (50 Qs)', 'General Knowledge & Physics/Chem/Bio/Hist/Geo (100 Qs)']
    },
    {
      id: 'jee_mains',
      name: 'JEE Main & Advanced (Engineering)',
      agency: 'National Testing Agency (NTA) & IITs',
      category: 'engineering',
      icon: Zap,
      color: '#3B82F6',
      candidates: '25,00,000+',
      eligibility: 'Class 12 with Physics, Mathematics, and Chemistry/Bio/Technical Vocational.',
      ageLimit: 'No Age Limit for JEE Main',
      pattern: '75 Questions (20 MCQ + 5 Numerical per subject) • 300 Marks • 180 Mins',
      marking: '+4 for Correct, -1 for Incorrect (MCQ & Numerical)',
      subjects: ['Physics (25 Qs / 100M)', 'Chemistry (25 Qs / 100M)', 'Mathematics (25 Qs / 100M)']
    },
    {
      id: 'neet',
      name: 'NEET UG (National Eligibility cum Entrance Test)',
      agency: 'National Testing Agency (NTA)',
      category: 'medical',
      icon: GraduationCap,
      color: '#22C55E',
      candidates: '21,00,000+',
      eligibility: 'Passed 10+2 with Physics, Chemistry, Biology/Biotechnology & English.',
      ageLimit: 'Minimum 17 years at time of admission; No upper age limit.',
      pattern: '180 Questions to attempt out of 200 • 720 Marks • 200 Mins',
      marking: '+4 for Correct, -1 for Incorrect, 0 for Unattempted',
      subjects: ['Physics (45 Qs / 180M)', 'Chemistry (45 Qs / 180M)', 'Botany (45 Qs / 180M)', 'Zoology (45 Qs / 180M)']
    },
    {
      id: 'upsc',
      name: 'UPSC CSE (Civil Services IAS / IPS)',
      agency: 'Union Public Service Commission (UPSC)',
      category: 'civil',
      icon: BookOpen,
      color: '#A855F7',
      candidates: '12,00,000+',
      eligibility: 'Bachelor’s degree from a recognized university in any discipline.',
      ageLimit: '21 to 32 Years (Relaxations for OBC/SC/ST/PwD)',
      pattern: 'Prelims: GS 1 (100 Qs / 200M) + CSAT (80 Qs / 200M) • Mains: 9 Descriptive Papers (1750M)',
      marking: 'GS 1: +2.0 / -0.66 | CSAT: +2.5 / -0.83 (Qualifying 33%)',
      subjects: ['History & Culture', 'Polity & Governance', 'Geography & Environment', 'Economy', 'CSAT Aptitude']
    },
    {
      id: 'ssc_cgl',
      name: 'SSC CGL (Staff Selection Commission)',
      agency: 'Staff Selection Commission (SSC)',
      category: 'aptitude',
      icon: Target,
      color: '#F97316',
      candidates: '30,00,000+',
      eligibility: 'Bachelor’s degree in any discipline from a recognized University.',
      ageLimit: '18 to 32 Years depending on the post applied.',
      pattern: 'Tier 1: 100 Qs • 200 Marks • 60 Mins (CBT Qualifying)',
      marking: '+2 for Correct, -0.5 for Incorrect',
      subjects: ['General Intelligence & Reasoning (25 Qs)', 'General Awareness (25 Qs)', 'Quantitative Aptitude (25 Qs)', 'English Comprehension (25 Qs)']
    },
    {
      id: 'cat',
      name: 'CAT (Common Admission Test - IIMs)',
      agency: 'Indian Institutes of Management (IIMs)',
      category: 'aptitude',
      icon: BarChart3,
      color: '#EC4899',
      candidates: '3,50,000+',
      eligibility: 'Bachelor’s Degree with at least 50% marks or equivalent CGPA (45% for SC/ST/PwD).',
      ageLimit: 'No Age Limit',
      pattern: '66 Questions (MCQ + Non-MCQ TITA) • 198 Marks • 120 Mins (40m per section)',
      marking: 'MCQ: +3 / -1 | TITA: +3 / 0',
      subjects: ['Verbal Ability & Reading Comprehension (VARC - 24 Qs)', 'Data Interpretation & Logical Reasoning (DILR - 20 Qs)', 'Quantitative Aptitude (QA - 22 Qs)']
    },
  ];

  const filtered = allExams.filter(e => {
    const matchesCat = filterCategory === 'all' || e.category === filterCategory;
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="dark-container p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> All-India Examination Directory
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Explore 9 National Competitive Exam Suites
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Compare official syllabus structures, eligibility age limits, marking schemes, and launch dedicated CBT simulators for every major competitive entrance across India.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {[
            { id: 'all', label: 'All Exams (9)' },
            { id: 'defence', label: '⚔️ Defence (3)' },
            { id: 'engineering', label: '⚛️ Engineering (2)' },
            { id: 'medical', label: '🩺 Medical (1)' },
            { id: 'civil', label: '🏛️ Civil Services (1)' },
            { id: 'aptitude', label: '📊 Aptitude & MBA (2)' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setFilterCategory(p.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterCategory === p.id 
                  ? 'bg-[#1A1D1E] text-white shadow-sm' 
                  : 'bg-white text-[#66625D] border border-[#E5E2D9] hover:bg-[#F5F4F0]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search exam, agency, pattern..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
          />
          <Search className="w-4 h-4 text-[#66625D] absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Exam Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ex => {
          const Icon = ex.icon;
          return (
            <div key={ex.id} className="light-card p-6 rounded-3xl flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${ex.color}15`, border: `1px solid ${ex.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: ex.color }} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#F5F4F0] border border-[#E5E2D9] text-[#66625D]">
                    {ex.candidates} Aspirants
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[#1A1D1E] font-display group-hover:text-[#FAA114] transition-colors">
                    {ex.name}
                  </h3>
                  <p className="text-xs text-[#66625D] font-medium mt-0.5">{ex.agency}</p>
                </div>

                <div className="space-y-2 text-xs bg-[#F5F4F0] p-3.5 rounded-2xl border border-[#E5E2D9]">
                  <div className="font-semibold text-[#1A1D1E]">
                    <span className="text-[#66625D]">Pattern:</span> {ex.pattern}
                  </div>
                  <div className="font-semibold text-[#1A1D1E]">
                    <span className="text-[#66625D]">Marking:</span> {ex.marking}
                  </div>
                  <div className="text-[11px] text-[#66625D]">
                    <strong>Eligibility:</strong> {ex.eligibility}
                  </div>
                  <div className="text-[11px] text-[#66625D]">
                    <strong>Age Limit:</strong> {ex.ageLimit}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#66625D] uppercase">Syllabus Breakdown:</span>
                  <div className="flex flex-wrap gap-1">
                    {ex.subjects.map((sub, sIdx) => (
                      <span key={sIdx} className="text-[10px] px-2 py-0.5 bg-white text-[#1A1D1E] rounded-md border border-[#E5E2D9]">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateExam(ex.id)}
                className="w-full py-3 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
              >
                <span>Enter {ex.id.toUpperCase()} Course Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
