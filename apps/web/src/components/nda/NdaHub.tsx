'use client';

import React, { useState } from 'react';
import { NDA_EXAM_PATTERN, NDA_SUBJECTS, NDA_PYQ_PAPERS, NDA_MODEL_PAPERS, NdaModelPaper, NdaQuestion } from '../../data/ndaData';
import { generateQuestionsForNdaPaper } from '../../data/ndaPaperGenerator';
import NdaExamCbtWindow from './NdaExamCbtWindow';
import { BookOpen, FileText, FileCheck, Brain, BarChart3, Shield, Award, CheckCircle2, Play, Eye, X, HelpCircle, Download } from 'lucide-react';

export default function NdaHub() {
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model' | 'quiz' | 'analytics'>('guide');
  const [activeCbtPaper, setActiveCbtPaper] = useState<{ title: string; yearOrType: string; questions: any[] } | null>(null);
  const [activeSolutionModal, setActiveSolutionModal] = useState<{ paper: NdaModelPaper; questions: NdaQuestion[] } | null>(null);
  const [pyqMode, setPyqMode] = useState<'full' | 'subject' | 'topic'>('full');

  const startCbtPaper = (title: string, yearOrType: string) => {
    const questions = generateQuestionsForNdaPaper(`nda_${Date.now()}`, Math.floor(Math.random() * 50));
    setActiveCbtPaper({ title, yearOrType, questions });
  };

  const openSolutionModal = (paper: NdaModelPaper) => {
    const questions = generateQuestionsForNdaPaper(paper.id, paper.paperNumber);
    setActiveSolutionModal({ paper, questions });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeInUp">
      {activeCbtPaper && (
        <NdaExamCbtWindow
          paperTitle={activeCbtPaper.title}
          paperYearOrType={activeCbtPaper.yearOrType}
          questions={activeCbtPaper.questions}
          onClose={() => setActiveCbtPaper(null)}
        />
      )}

      {/* Hero Header */}
      <div className="dark-container p-8 rounded-3xl space-y-4 relative overflow-hidden shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-[#FAA114]" /> UPSC NDA & NA Prep Engine 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
          National Defence Academy & Naval Academy (NDA)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Master Paper 1 Mathematics (120 Qs / 300 Marks) and Paper 2 GAT (150 Qs / 600 Marks) with official 270-question 900-mark CBT simulations, subject & topic PYQ drills, 15 full mocks with complete solutions, and SSB qualification analytics.
        </p>
      </div>

      {/* 5-Pillar Navigation Bar */}
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
          <BarChart3 className="w-4 h-4" /> NDA Candidate Calibration
        </button>
      </div>

      {/* Tab Contents: Guide */}
      {subTab === 'guide' && (
        <div className="space-y-6">
          <div className="light-card p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FAA114]" /> Official 270-Question 900-Mark Pattern
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#FAF3E6] rounded-2xl border border-[#E8D5B7]">
                <h4 className="font-bold text-[#1A1D1E] text-sm">Paper 1: Mathematics</h4>
                <p className="text-[#66625D] mt-1 font-mono">120 Questions • 300 Marks • 2.5 Hours</p>
                <p className="text-[#C88410] font-bold mt-1">Marking: +2.5 / -0.833 Marks</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm">Paper 2: GAT (English & Science/GK)</h4>
                <p className="text-blue-800 mt-1 font-mono">150 Questions • 600 Marks • 2.5 Hours</p>
                <p className="text-blue-700 font-bold mt-1">Marking: +4.0 / -1.333 Marks</p>
              </div>
            </div>
            <button
              onClick={() => startCbtPaper("NDA Full Mock Paper 2026", "900-Mark Standard Mock")}
              className="w-full py-3.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-black text-xs shadow-sm transition"
            >
              Launch Full 270-Question NDA CBT Mock Window →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {NDA_SUBJECTS.map((sub) => (
              <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1D1E]">{sub.name}</span>
                  <span className="text-[10px] font-mono text-[#C88410] bg-[#FAF3E6] px-2 py-0.5 rounded border border-[#E8D5B7]">{sub.totalMarks} Marks</span>
                </div>
                <p className="text-xs text-[#66625D]">{sub.description}</p>
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
              Full PYQ Papers
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
              {NDA_PYQ_PAPERS.map(pyq => (
                <div key={pyq.id} className="light-card p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#C88410] bg-[#FAF3E6] px-2.5 py-0.5 rounded border border-[#E8D5B7]">NDA {pyq.year}</span>
                    <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{pyq.shift}</h4>
                    <p className="text-xs text-[#66625D] font-mono">{pyq.totalQs} Questions • {pyq.totalMarks} Marks</p>
                  </div>
                  <button
                    onClick={() => startCbtPaper(pyq.shift, `Year ${pyq.year}`)}
                    className="px-4 py-2 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-bold text-xs shadow-sm transition"
                  >
                    Attempt CBT
                  </button>
                </div>
              ))}
            </div>
          )}

          {pyqMode === 'subject' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NDA_SUBJECTS.map(sub => (
                <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3">
                  <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name}</h4>
                  <p className="text-xs text-[#66625D]">{sub.topics.length} Core NDA Modules • 200+ PYQs</p>
                  <button
                    onClick={() => startCbtPaper(`NDA ${sub.name} PYQs`, "Subject Practice")}
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
            {NDA_MODEL_PAPERS.map(paper => (
              <div key={paper.id} className="light-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">NDA Mock #{paper.paperNumber}</span>
                  <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{paper.title}</h4>
                  <p className="text-xs text-[#66625D] mt-1">{paper.description}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-[#E5E2D9]">
                  <button
                    onClick={() => startCbtPaper(paper.title, `Model #${paper.paperNumber}`)}
                    className="w-full py-2.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Attempt CBT Window
                  </button>
                  <button
                    onClick={() => openSolutionModal(paper)}
                    className="w-full py-2 bg-white hover:bg-[#F5F4F0] text-[#1A1D1E] border border-[#E5E2D9] rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" /> View Answer Key & Solutions
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
                    <p className="text-xs text-slate-300">Detailed Answer Key and Explanations</p>
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
                        <span className="text-emerald-600 font-bold">Ans: Option {String.fromCharCode(65 + q.correctOptionIndex)} ({q.options[q.correctOptionIndex]})</span>
                      </div>
                      <p className="text-xs text-[#1A1D1E]">{q.questionText}</p>
                      <p className="text-xs text-[#66625D] bg-white p-2.5 rounded-xl border border-[#E5E2D9]"><strong className="text-[#1A1D1E]">Explanation:</strong> {q.explanation}</p>
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
            <Brain className="w-5 h-5 text-[#FAA114]" /> NDA Speed & Topic Drills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NDA_SUBJECTS.map(sub => (
              <div key={sub.id} className="p-4 bg-white rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name} Drill</h4>
                <p className="text-xs text-[#66625D]">25 Questions • 30 Minutes • Instant Explanation</p>
                <button
                  onClick={() => startCbtPaper(`NDA ${sub.name} Speed Drill`, "25-Q Drill")}
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
            <BarChart3 className="w-5 h-5 text-[#22C55E]" /> NDA Candidate Calibration & SSB Radar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Average Score</span>
              <p className="text-2xl font-black text-[#1A1D1E] mt-1 font-mono">412 / 900</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">SSB Call Status</span>
              <p className="text-sm font-bold text-emerald-600 mt-2">QUALIFIED (Cutoff ~355)</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Maths Accuracy</span>
              <p className="text-2xl font-black text-[#C88410] mt-1 font-mono">82.4%</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Sectional Clear</span>
              <p className="text-sm font-bold text-emerald-600 mt-2">2 / 2 (All &gt;25%)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
