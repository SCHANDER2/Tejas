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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 border border-blue-800/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full text-xs font-bold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-amber-400" /> UPSC CDS Mentor Engine 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Combined Defence Services (IMA / OTA)
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Master UPSC CDS Paper I (English), Paper II (General Knowledge), and Paper III (Elementary Maths) with authentic 340-question CBT simulations, 15 model papers, and SSB interview qualification analytics.
          </p>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-[#e5e2d9] shadow-sm flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setSubTab('guide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'guide' ? 'bg-[#262a2b] text-white shadow-sm' : 'text-[#786e67] hover:bg-[#fcfcfb]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#faa114]" /> Mentor Guide & Syllabus
        </button>

        <button
          onClick={() => setSubTab('pyq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'pyq' ? 'bg-[#262a2b] text-white shadow-sm' : 'text-[#786e67] hover:bg-[#fcfcfb]'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-500" /> PYQ Vault
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'model' ? 'bg-[#262a2b] text-white shadow-sm' : 'text-[#786e67] hover:bg-[#fcfcfb]'
          }`}
        >
          <FileCheck className="w-4 h-4 text-purple-500" /> 15 Model Papers (CBT)
        </button>
      </div>

      {/* Tab Contents */}
      {subTab === 'guide' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> IMA / INA / AFA Track
              </h3>
              <p className="text-xs text-gray-600">3 Papers • 340 Questions • 300 Marks • 6 Hours Total</p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Paper 1: English (120 Qs / 100M) — +0.833 / -0.27</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Paper 2: General Knowledge (120 Qs / 100M) — +0.833 / -0.27</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Paper 3: Elementary Maths (100 Qs / 100M) — +1.0 / -0.33</li>
              </ul>
              <button
                onClick={() => startCbtPaper("CDS Full Mock Paper (IMA Track)", "IMA Standard Mock", "IMA")}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-bold text-xs transition"
              >
                Launch Full IMA CBT Mock Test
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Officers Training Academy (OTA)
              </h3>
              <p className="text-xs text-gray-600">2 Papers • 240 Questions • 200 Marks • 4 Hours Total</p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Paper 1: English (120 Qs / 100M) — +0.833 / -0.27</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Paper 2: General Knowledge (120 Qs / 100M) — +0.833 / -0.27</li>
              </ul>
              <button
                onClick={() => startCbtPaper("CDS Full Mock Paper (OTA Track)", "OTA Standard Mock", "OTA")}
                className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs transition"
              >
                Launch Full OTA CBT Mock Test
              </button>
            </div>
          </div>
        </div>
      )}

      {subTab === 'pyq' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CDS_PYQ_PAPERS.map(pyq => (
            <div key={pyq.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">{pyq.paperType} Track</span>
                <h4 className="font-bold text-sm text-gray-900 mt-1">{pyq.shift}</h4>
                <p className="text-xs text-gray-500">{pyq.totalQs} Questions • {pyq.totalMarks} Marks</p>
              </div>
              <button
                onClick={() => startCbtPaper(pyq.shift, `Year ${pyq.year}`, pyq.paperType)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-bold text-xs transition"
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
            <div key={paper.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{paper.track} Mock</span>
                <h4 className="font-bold text-sm text-gray-900 mt-1">{paper.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{paper.description}</p>
              </div>
              <button
                onClick={() => startCbtPaper(paper.title, `Model #${paper.paperNumber}`, paper.track)}
                className="w-full py-2 bg-[#003366] hover:bg-blue-900 text-white rounded-xl font-bold text-xs transition"
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
