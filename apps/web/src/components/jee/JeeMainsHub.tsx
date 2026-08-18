'use client';

import React, { useState } from 'react';
import { JEE_MAINS_PATTERN, JEE_SUBJECTS, JEE_MAINS_PYQ_PAPERS, JEE_MAINS_MODEL_PAPERS, JeeMainsModelPaper, JeeQuestion } from '../../data/jeeMainsData';
import { generateQuestionsForJeeMainsPaper } from '../../data/jeeMainsPaperGenerator';
import JeeMainsExamCbtWindow from './JeeMainsExamCbtWindow';
import { BookOpen, FileText, FileCheck, Brain, BarChart3, Shield, Award, Play, Eye, X, HelpCircle, ExternalLink } from 'lucide-react';

export default function JeeMainsHub() {
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model' | 'quiz' | 'analytics'>('guide');
  const [activeCbtPaper, setActiveCbtPaper] = useState<{ title: string; yearOrType: string; questions: any[] } | null>(null);
  const [activeSolutionModal, setActiveSolutionModal] = useState<{ paper: JeeMainsModelPaper; questions: JeeQuestion[] } | null>(null);
  const [pyqMode, setPyqMode] = useState<'full' | 'subject' | 'topic'>('full');

  const startCbtPaper = (title: string, yearOrType: string) => {
    const questions = generateQuestionsForJeeMainsPaper(`jee_${Date.now()}`, Math.floor(Math.random() * 50));
    setActiveCbtPaper({ title, yearOrType, questions });
  };

  const openSolutionModal = (paper: JeeMainsModelPaper) => {
    const questions = generateQuestionsForJeeMainsPaper(paper.id, paper.paperNumber);
    setActiveSolutionModal({ paper, questions });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeInUp">
      {activeCbtPaper && (
        <JeeMainsExamCbtWindow
          paperTitle={activeCbtPaper.title}
          paperYearOrType={activeCbtPaper.yearOrType}
          questions={activeCbtPaper.questions}
          onClose={() => setActiveCbtPaper(null)}
        />
      )}

      {/* Hero Header */}
      <div className="dark-container p-8 rounded-3xl space-y-4 relative overflow-hidden shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/40 text-blue-300 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-blue-400" /> NTA JEE Main Master Engine 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
          Joint Entrance Examination (JEE Main)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Master Physics, Chemistry, and Mathematics with NTA standard 75-question (20 MCQ + 5 Numerical) CBT simulations, NTA on-screen numerical keypad, subject & topic PYQs, 15 full mocks with complete step solutions, and NTA percentile rank predictor.
        </p>
      </div>

      {/* 5-Pillar Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-[#E5E2D9] shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('guide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'guide' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D] hover:bg-[#F5F4F0]'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Mentor Guide & Syllabus
        </button>

        <button
          onClick={() => setSubTab('pyq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'pyq' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D] hover:bg-[#F5F4F0]'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-600" /> PYQ Vault (Full / Subject / Topic)
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'model' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D] hover:bg-[#F5F4F0]'
          }`}
        >
          <FileCheck className="w-4 h-4 text-purple-600" /> 15 Model Papers (CBT & Solutions)
        </button>

        <button
          onClick={() => setSubTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'quiz' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D] hover:bg-[#F5F4F0]'
          }`}
        >
          <Brain className="w-4 h-4 text-amber-600" /> Dynamic Quiz Engine
        </button>

        <button
          onClick={() => setSubTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'analytics' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-[#66625D] hover:bg-[#F5F4F0]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-600" /> JEE Percentile & NIT Radar
        </button>
      </div>

      {/* Tab Contents: Guide */}
      {subTab === 'guide' && (
        <div className="space-y-6">
          <div className="light-card p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" /> Official NTA Pattern (75 Questions / 300 Marks)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-blue-950 text-sm">Physics (100M)</h4>
                <p className="text-blue-800 mt-1">20 MCQ + 5 Numerical</p>
                <p className="text-blue-700 font-bold mt-1">+4 / -1 Marking</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-sm">Chemistry (100M)</h4>
                <p className="text-emerald-800 mt-1">20 MCQ + 5 Numerical</p>
                <p className="text-emerald-700 font-bold mt-1">+4 / -1 Marking</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <h4 className="font-bold text-amber-950 text-sm">Mathematics (100M)</h4>
                <p className="text-amber-800 mt-1">20 MCQ + 5 Numerical</p>
                <p className="text-amber-700 font-bold mt-1">+4 / -1 Marking</p>
              </div>
            </div>
            <button
              onClick={() => startCbtPaper("JEE Main Full Mock Paper 2026", "300-Mark NTA Standard")}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs shadow-sm transition"
            >
              Launch Full 75-Question JEE Main CBT Mock Window →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {JEE_SUBJECTS.map((sub) => (
              <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1D1E]">{sub.name}</span>
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{sub.totalMarks} Marks</span>
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
              Full Shift Papers
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
              {JEE_MAINS_PYQ_PAPERS.map(pyq => (
                <div key={pyq.id} className="light-card p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">JEE {pyq.year}</span>
                    <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{pyq.shift}</h4>
                    <p className="text-xs text-[#66625D] font-mono">{pyq.totalQs} Questions • {pyq.totalMarks} Marks</p>
                  </div>
                  <button
                    onClick={() => startCbtPaper(pyq.shift, `Year ${pyq.year}`)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition"
                  >
                    Attempt CBT
                  </button>
                </div>
              ))}
            </div>
          )}

          {pyqMode === 'subject' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {JEE_SUBJECTS.map(sub => (
                <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3">
                  <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name}</h4>
                  <p className="text-xs text-[#66625D]">{sub.topics.length} Key JEE Chapters • 250+ PYQs</p>
                  <button
                    onClick={() => startCbtPaper(`JEE ${sub.name} PYQs`, "Subject Practice")}
                    className="w-full py-2 bg-[#1A1D1E] text-white hover:bg-black rounded-xl font-bold text-xs transition"
                  >
                    Start Subject PYQs (25 Qs) →
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
            {JEE_MAINS_MODEL_PAPERS.map(paper => (
              <div key={paper.id} className="light-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">JEE Mock #{paper.paperNumber}</span>
                  <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{paper.title}</h4>
                  <p className="text-xs text-[#66625D] mt-1">{paper.description}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-[#E5E2D9]">
                  <button
                    onClick={() => startCbtPaper(paper.title, `Model #${paper.paperNumber}`)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
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
                <div className="bg-[#003366] text-white p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base">{activeSolutionModal.paper.title} — Solutions</h3>
                    <p className="text-xs text-blue-200">Detailed Answer Key and Step-by-Step Mathematical Solutions</p>
                  </div>
                  <button onClick={() => setActiveSolutionModal(null)} className="p-2 hover:bg-white/10 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {activeSolutionModal.questions.map((q, idx) => (
                    <div key={q.id} className="p-4 bg-[#F5F4F0] rounded-2xl space-y-2 border border-[#E5E2D9]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1A1D1E]">Q{idx + 1}. {q.topicName} [{q.type} • {q.marks}M]</span>
                        <span className="text-emerald-600 font-bold">
                          Ans: {q.type === 'NAT' ? q.correctNatValue : `Option ${String.fromCharCode(65 + (q.correctOptionIndex || 0))}`}
                        </span>
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
            <Brain className="w-5 h-5 text-[#FAA114]" /> JEE Main Speed & Formula Drills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {JEE_SUBJECTS.map(sub => (
              <div key={sub.id} className="p-4 bg-white rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name} Drill</h4>
                <p className="text-xs text-[#66625D]">25 Questions (20 MCQ + 5 NAT) • 45 Mins</p>
                <button
                  onClick={() => startCbtPaper(`JEE ${sub.name} Speed Drill`, "25-Q Drill")}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition"
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
            <BarChart3 className="w-5 h-5 text-[#22C55E]" /> JEE Main NTA Percentile & NIT Radar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Average Score</span>
              <p className="text-2xl font-black text-[#1A1D1E] mt-1 font-mono">198 / 300</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Est. NTA Percentile</span>
              <p className="text-2xl font-black text-blue-600 mt-1 font-mono">99.14 %ile</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Predicted AIR</span>
              <p className="text-xl font-bold text-[#C88410] mt-1 font-mono">AIR ~9,400</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Top NIT CSE Call</span>
              <p className="text-sm font-bold text-emerald-600 mt-2">ELIGIBLE (NIT Trichy/Surathkal)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
