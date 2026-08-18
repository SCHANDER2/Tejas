'use client';

import React, { useState } from 'react';
import { UPSC_CSE_PATTERN, UPSC_SUBJECTS, UPSC_PYQ_PAPERS, UPSC_MODEL_PAPERS, UpscModelPaper, UpscQuestion } from '../../data/upscData';
import { generateQuestionsForUpscPaper } from '../../data/upscPaperGenerator';
import UpscExamCbtWindow from './UpscExamCbtWindow';
import { BookOpen, FileText, FileCheck, Brain, BarChart3, Shield, Award, Play, Eye, X, HelpCircle } from 'lucide-react';

export default function UpscHub() {
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model' | 'quiz' | 'analytics'>('guide');
  const [activeCbtPaper, setActiveCbtPaper] = useState<{ title: string; yearOrType: string; paperType: 'GS1' | 'CSAT'; questions: any[] } | null>(null);
  const [activeSolutionModal, setActiveSolutionModal] = useState<{ paper: UpscModelPaper; questions: UpscQuestion[] } | null>(null);
  const [pyqMode, setPyqMode] = useState<'full' | 'subject' | 'topic'>('full');

  const startCbtPaper = (title: string, yearOrType: string, paperType: 'GS1' | 'CSAT' = 'GS1') => {
    const questions = generateQuestionsForUpscPaper(`upsc_${Date.now()}`, paperType, Math.floor(Math.random() * 50));
    setActiveCbtPaper({ title, yearOrType, paperType, questions });
  };

  const openSolutionModal = (paper: UpscModelPaper) => {
    const questions = generateQuestionsForUpscPaper(paper.id, paper.paperType, paper.paperNumber);
    setActiveSolutionModal({ paper, questions });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeInUp">
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
      <div className="dark-container p-8 rounded-3xl space-y-4 relative overflow-hidden shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-amber-400" /> UPSC Civil Services (IAS / IPS) Engine 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
          UPSC Civil Services Examination (CSE Prelims)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Master Paper 1 General Studies (100 Qs / 200M) and Paper 2 CSAT (80 Qs / 200M) with authentic UPSC Prelims CBT simulations, subject & topic PYQ vaults, 15 full mocks with complete step solutions, and IAS Prelims qualification analytics.
        </p>
      </div>

      {/* 5-Pillar Navigation Bar - Google Colorography */}
      <div className="bg-white p-2 rounded-2xl border border-[#E8EAED] shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('guide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'guide' ? 'bg-[#4285F4] text-white shadow-md shadow-blue-500/25' : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Mentor Guide & Syllabus
        </button>

        <button
          onClick={() => setSubTab('pyq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'pyq' ? 'bg-[#EA4335] text-white shadow-md shadow-red-500/25' : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
          }`}
        >
          <FileText className="w-4 h-4" /> PYQ Vault (Full / Subject / Topic)
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'model' ? 'bg-[#34A853] text-white shadow-md shadow-green-500/25' : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
          }`}
        >
          <FileCheck className="w-4 h-4" /> 15 Model Papers (CBT & Solutions)
        </button>

        <button
          onClick={() => setSubTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'quiz' ? 'bg-[#4285F4] text-white shadow-md shadow-blue-500/25' : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
          }`}
        >
          <Brain className="w-4 h-4" /> Dynamic Quiz Engine
        </button>

        <button
          onClick={() => setSubTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'analytics' ? 'bg-[#FBBC04] text-[#202124] shadow-md shadow-amber-500/25 font-black' : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> IAS Prelims Calibration
        </button>
      </div>

      {/* Tab Contents: Guide */}
      {subTab === 'guide' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="light-card p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Paper 1: General Studies 1
              </h3>
              <p className="text-xs text-[#66625D] font-mono">100 Questions • 200 Marks • 2 Hours • +2.0 / -0.66 Marks</p>
              <button
                onClick={() => startCbtPaper("UPSC GS Paper 1 Mock 2026", "200-Mark Standard GS1", "GS1")}
                className="w-full py-3.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-black text-xs shadow-sm transition"
              >
                Launch GS 1 CBT Mock Window →
              </button>
            </div>

            <div className="light-card p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Paper 2: CSAT (Qualifying 33%)
              </h3>
              <p className="text-xs text-[#66625D] font-mono">80 Questions • 200 Marks • 2 Hours • +2.5 / -0.83 Marks</p>
              <button
                onClick={() => startCbtPaper("UPSC CSAT Paper 2 Mock 2026", "200-Mark CSAT Standard", "CSAT")}
                className="w-full py-3.5 bg-[#1A1D1E] hover:bg-black text-[#FAFAF8] rounded-xl font-black text-xs transition"
              >
                Launch CSAT Paper 2 CBT Mock Window →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {UPSC_SUBJECTS.map((sub) => (
              <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1D1E]">{sub.name}</span>
                    <span className="text-[10px] font-mono text-[#C88410] bg-[#FAF3E6] px-2 py-0.5 rounded border border-[#E8D5B7]">{sub.totalMarks} Marks</span>
                  </div>
                  <p className="text-xs text-[#66625D]">{sub.description}</p>
                </div>
                {sub.youtubePlaylist && (
                  <a
                    href={sub.youtubePlaylist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    Watch {sub.youtubePlaylist.channel} Playlist →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Contents: PYQ */}
      {subTab === 'pyq' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 bg-[#F5F4F0] p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setPyqMode('full')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${pyqMode === 'full' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D]'}`}
            >
              Full Year Papers
            </button>
            <button
              onClick={() => setPyqMode('subject')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${pyqMode === 'subject' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D]'}`}
            >
              Subject-wise PYQs
            </button>
          </div>

          {pyqMode === 'full' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {UPSC_PYQ_PAPERS.map(pyq => (
                <div key={pyq.id} className="light-card p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#C88410] bg-[#FAF3E6] px-2.5 py-0.5 rounded border border-[#E8D5B7]">UPSC {pyq.year}</span>
                    <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{pyq.shift}</h4>
                    <p className="text-xs text-[#66625D] font-mono">{pyq.totalQs} Questions • {pyq.totalMarks} Marks</p>
                  </div>
                  <button
                    onClick={() => startCbtPaper(pyq.shift, `Year ${pyq.year}`, "GS1")}
                    className="px-4 py-2 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-bold text-xs shadow-sm transition"
                  >
                    Attempt CBT
                  </button>
                </div>
              ))}
            </div>
          )}

          {pyqMode === 'subject' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {UPSC_SUBJECTS.map(sub => (
                <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3">
                  <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name}</h4>
                  <p className="text-xs text-[#66625D]">{sub.topics.length} Core Modules • 200+ PYQs</p>
                  <button
                    onClick={() => startCbtPaper(`UPSC ${sub.name} PYQs`, "Subject Practice", "GS1")}
                    className="w-full py-2 bg-[#1A1D1E] text-white hover:bg-black rounded-xl font-bold text-xs transition"
                  >
                    Start Subject PYQs (30 Qs) →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Contents: 15 Model Papers with Solutions */}
      {subTab === 'model' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {UPSC_MODEL_PAPERS.map(paper => (
              <div key={paper.id} className="light-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">UPSC Mock #{paper.paperNumber}</span>
                  <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{paper.title}</h4>
                  <p className="text-xs text-[#66625D] mt-1">{paper.description}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-[#E5E2D9]">
                  <button
                    onClick={() => startCbtPaper(paper.title, `Model #${paper.paperNumber}`, paper.paperType)}
                    className="w-full py-2.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Attempt CBT Window
                  </button>
                  <button
                    onClick={() => openSolutionModal(paper)}
                    className="w-full py-2 bg-white hover:bg-[#F5F4F0] text-[#1A1D1E] border border-[#E5E2D9] rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-600" /> View Answer Key & Solutions
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Solution Modal */}
          {activeSolutionModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                <div className="bg-[#1A1D1E] text-white p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base">{activeSolutionModal.paper.title} — Solutions</h3>
                    <p className="text-xs text-slate-300">Detailed Answer Key and Standard UPSC Analysis</p>
                  </div>
                  <button onClick={() => setActiveSolutionModal(null)} className="p-2 hover:bg-white/10 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {activeSolutionModal.questions.slice(0, 30).map((q, idx) => (
                    <div key={q.id} className="p-4 bg-[#F5F4F0] rounded-2xl space-y-2 border border-[#E5E2D9]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1A1D1E]">Q{idx + 1}. {q.topicName}</span>
                        <span className="text-emerald-600 font-bold">
                          Ans: Option {String.fromCharCode(65 + (q.correctOptionIndex || 0))} ({q.options ? q.options[q.correctOptionIndex || 0] : ''})
                        </span>
                      </div>
                      <p className="text-xs text-[#1A1D1E]">{q.questionText}</p>
                      <p className="text-xs text-[#66625D] bg-white p-2.5 rounded-xl border border-[#E5E2D9]"><strong className="text-[#1A1D1E]">UPSC Standard Analysis:</strong> {q.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Contents: Quiz */}
      {subTab === 'quiz' && (
        <div className="light-card p-6 rounded-3xl space-y-6">
          <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#FAA114]" /> UPSC Prelims Speed & Current Affairs Drills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {UPSC_SUBJECTS.map(sub => (
              <div key={sub.id} className="p-4 bg-white rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name} Drill</h4>
                <p className="text-xs text-[#66625D]">25 Questions • 30 Mins • Standard Explanations</p>
                <button
                  onClick={() => startCbtPaper(`UPSC ${sub.name} Speed Drill`, "25-Q Drill", "GS1")}
                  className="w-full py-2 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold text-xs rounded-xl transition"
                >
                  Start Practice Drill →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Contents: Analytics */}
      {subTab === 'analytics' && (
        <div className="light-card p-6 rounded-3xl space-y-6">
          <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#22C55E]" /> UPSC Prelims Calibration & Cutoff Predictor
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">GS 1 Score</span>
              <p className="text-2xl font-black text-[#1A1D1E] mt-1 font-mono">104 / 200</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">CSAT Paper 2</span>
              <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">54.5% (Qualified)</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Prelims Clearance</span>
              <p className="text-sm font-bold text-emerald-600 mt-2">HIGH PROBABILITY (&gt;88 Cutoff)</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Polity Accuracy</span>
              <p className="text-2xl font-black text-[#C88410] mt-1 font-mono">88.5%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
