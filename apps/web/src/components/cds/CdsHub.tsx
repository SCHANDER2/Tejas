'use client';

import React, { useState } from 'react';
import { CDS_EXAM_PATTERN, CDS_SUBJECTS, CDS_PYQ_PAPERS, CDS_MODEL_PAPERS } from '../../data/cdsData';
import { generateQuestionsForCdsPaper } from '../../data/cdsPaperGenerator';
import CdsExamCbtWindow from './CdsExamCbtWindow';
import { BookOpen, FileText, FileCheck, Brain, BarChart3, Shield, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export default function CdsHub() {
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model' | 'analytics'>('guide');
  const [activeCbtPaper, setActiveCbtPaper] = useState<{ title: string; yearOrType: string; track: 'IMA' | 'OTA'; questions: any[] } | null>(null);

  const startCbtPaper = (title: string, yearOrType: string, track: 'IMA' | 'OTA' = 'IMA') => {
    const questions = generateQuestionsForCdsPaper(`cds_${Date.now()}`, track, Math.floor(Math.random() * 50));
    setActiveCbtPaper({ title, yearOrType, track, questions });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeInUp">
      {/* Active CBT Window Overlay */}
      {activeCbtPaper && (
        <CdsExamCbtWindow
          paperTitle={activeCbtPaper.title}
          paperYearOrType={activeCbtPaper.yearOrType}
          questions={activeCbtPaper.questions}
          track={activeCbtPaper.track}
          onClose={() => setActiveCbtPaper(null)}
        />
      )}

      {/* Hero Header (Dark Charcoal Container matching screenshot) */}
      <div className="dark-container p-8 rounded-3xl space-y-3 relative overflow-hidden shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-[#FAA114]" /> UPSC CDS Mentor Engine 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
          Combined Defence Services (IMA / OTA)
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Master UPSC CDS Paper I (English), Paper II (General Knowledge), and Paper III (Elementary Maths) with authentic 340-question CBT simulations, 15 model papers, and SSB interview qualification analytics.
        </p>
      </div>

      {/* Sub Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-[#E5E2D9] shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('guide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'guide' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D] hover:bg-[#F5F4F0]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#1A1D1E]" /> Mentor Guide & Syllabus
        </button>

        <button
          onClick={() => setSubTab('pyq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'pyq' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D] hover:bg-[#F5F4F0]'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-600" /> PYQ Vault
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'model' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D] hover:bg-[#F5F4F0]'
          }`}
        >
          <FileCheck className="w-4 h-4 text-purple-600" /> 15 Model Papers (CBT)
        </button>
      </div>

      {/* Tab Contents */}
      {subTab === 'guide' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="light-card p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FAA114]" /> IMA / INA / AFA Track
              </h3>
              <p className="text-xs text-[#66625D] font-mono">3 Papers • 340 Questions • 300 Marks • 6 Hours Total</p>
              <ul className="space-y-2 text-xs text-[#66625D]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Paper 1: English (120 Qs / 100M) — +0.833 / -0.27</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Paper 2: General Knowledge (120 Qs / 100M) — +0.833 / -0.27</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Paper 3: Elementary Maths (100 Qs / 100M) — +1.0 / -0.33</li>
              </ul>
              <button
                onClick={() => startCbtPaper("CDS Full Mock Paper (IMA Track)", "IMA Standard Mock", "IMA")}
                className="w-full py-3 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-bold text-xs shadow-sm transition-all"
              >
                Launch Full IMA CBT Mock Test →
              </button>
            </div>

            <div className="light-card p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FAA114]" /> Officers Training Academy (OTA)
              </h3>
              <p className="text-xs text-[#66625D] font-mono">2 Papers • 240 Questions • 200 Marks • 4 Hours Total</p>
              <ul className="space-y-2 text-xs text-[#66625D]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Paper 1: English (120 Qs / 100M) — +0.833 / -0.27</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Paper 2: General Knowledge (120 Qs / 100M) — +0.833 / -0.27</li>
              </ul>
              <button
                onClick={() => startCbtPaper("CDS Full Mock Paper (OTA Track)", "OTA Standard Mock", "OTA")}
                className="w-full py-3 bg-[#1A1D1E] hover:bg-black text-[#FAFAF8] rounded-xl font-bold text-xs transition"
              >
                Launch Full OTA CBT Mock Test →
              </button>
            </div>
          </div>
        </div>
      )}

      {subTab === 'pyq' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CDS_PYQ_PAPERS.map(pyq => (
            <div key={pyq.id} className="light-card p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#C88410] bg-[#FAF3E6] px-2.5 py-0.5 rounded border border-[#E8D5B7]">{pyq.paperType} Track</span>
                <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{pyq.shift}</h4>
                <p className="text-xs text-[#66625D] font-mono">{pyq.totalQs} Questions • {pyq.totalMarks} Marks</p>
              </div>
              <button
                onClick={() => startCbtPaper(pyq.shift, `Year ${pyq.year}`, pyq.paperType)}
                className="px-4 py-2 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-bold text-xs shadow-sm transition"
              >
                Attempt CBT
              </button>
            </div>
          ))}
        </div>
      )}

      {subTab === 'model' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CDS_MODEL_PAPERS.map(paper => (
            <div key={paper.id} className="light-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{paper.track} Mock</span>
                <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{paper.title}</h4>
                <p className="text-xs text-[#66625D] mt-1">{paper.description}</p>
              </div>
              <button
                onClick={() => startCbtPaper(paper.title, `Model #${paper.paperNumber}`, paper.track)}
                className="w-full py-2.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-bold text-xs shadow-sm transition"
              >
                Attempt CBT Window
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
