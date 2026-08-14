'use client';

import React, { useState } from 'react';
import { UPSC_CSE_PATTERN, UPSC_PYQ_PAPERS, UPSC_MODEL_PAPERS } from '../../data/upscData';
import { generateQuestionsForUpscPaper } from '../../data/upscPaperGenerator';
import UpscExamCbtWindow from './UpscExamCbtWindow';
import { BookOpen, FileText, FileCheck, Shield, Award } from 'lucide-react';

export default function UpscHub() {
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model'>('guide');
  const [activeCbtPaper, setActiveCbtPaper] = useState<{ title: string; yearOrType: string; paperType: 'GS1' | 'CSAT'; questions: any[] } | null>(null);

  const startCbtPaper = (title: string, yearOrType: string, paperType: 'GS1' | 'CSAT' = 'GS1') => {
    const questions = generateQuestionsForUpscPaper(`upsc_${Date.now()}`, paperType, Math.floor(Math.random() * 50));
    setActiveCbtPaper({ title, yearOrType, paperType, questions });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {activeCbtPaper && (
        <UpscExamCbtWindow
          paperTitle={activeCbtPaper.title}
          paperYearOrType={activeCbtPaper.yearOrType}
          questions={activeCbtPaper.questions}
          paperType={activeCbtPaper.paperType}
          onClose={() => setActiveCbtPaper(null)}
        />
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 border border-amber-600/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full text-xs font-bold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-amber-400" /> UPSC Civil Services (IAS / IPS) Engine 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            UPSC Civil Services Examination (CSE Prelims)
          </h1>
          <p className="text-sm text-amber-100/80 leading-relaxed">
            Master Paper 1 General Studies (100 Qs / 200M) and Paper 2 CSAT (80 Qs / 200M) with authentic UPSC Prelims CBT simulations, 15 model papers, and IAS qualifying analytics.
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
          <BookOpen className="w-4 h-4 text-[#faa114]" /> Prelims Pattern & Syllabus
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Paper 1: General Studies 1
            </h3>
            <p className="text-xs text-gray-600">100 Questions • 200 Marks • 2 Hours • +2.0 / -0.66 Marks</p>
            <button
              onClick={() => startCbtPaper("UPSC GS Paper 1 Mock 2026", "200-Mark Standard GS1", "GS1")}
              className="w-full py-3 bg-[#003366] hover:bg-blue-900 text-white rounded-xl font-bold text-xs transition shadow"
            >
              Launch GS 1 CBT Mock Window
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Paper 2: CSAT (Qualifying 33%)
            </h3>
            <p className="text-xs text-gray-600">80 Questions • 200 Marks • 2 Hours • +2.5 / -0.83 Marks</p>
            <button
              onClick={() => startCbtPaper("UPSC CSAT Paper 2 Mock 2026", "200-Mark CSAT Standard", "CSAT")}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs transition shadow"
            >
              Launch CSAT Paper 2 CBT Window
            </button>
          </div>
        </div>
      )}

      {subTab === 'pyq' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UPSC_PYQ_PAPERS.map(pyq => (
            <div key={pyq.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-gray-900">{pyq.shift}</h4>
                <p className="text-xs text-gray-500">{pyq.totalQs} Questions • {pyq.totalMarks} Marks</p>
              </div>
              <button
                onClick={() => startCbtPaper(pyq.shift, `Year ${pyq.year}`, pyq.shift.includes('CSAT') ? 'CSAT' : 'GS1')}
                className="px-4 py-2 bg-[#003366] hover:bg-blue-900 text-white rounded-xl font-bold text-xs transition"
              >
                Attempt CBT
              </button>
            </div>
          ))}
        </div>
      )}

      {subTab === 'model' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {UPSC_MODEL_PAPERS.map(paper => (
            <div key={paper.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-sm text-gray-900">{paper.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{paper.description}</p>
              </div>
              <button
                onClick={() => startCbtPaper(paper.title, `Model #${paper.paperNumber}`, paper.paperType)}
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
