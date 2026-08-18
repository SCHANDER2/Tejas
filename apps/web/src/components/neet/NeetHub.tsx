'use client';

import React, { useState } from 'react';
import { NEET_UG_PATTERN, NEET_SUBJECTS, NEET_PYQ_PAPERS, NEET_MODEL_PAPERS, NeetModelPaper, NeetQuestion } from '../../data/neetData';
import { generateQuestionsForNeetPaper } from '../../data/neetPaperGenerator';
import NeetExamCbtWindow from './NeetExamCbtWindow';
import { BookOpen, FileText, FileCheck, Brain, BarChart3, Shield, Award, Play, Eye, X, HelpCircle, ExternalLink } from 'lucide-react';

export default function NeetHub() {
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model' | 'quiz' | 'analytics'>('guide');
  const [activeCbtPaper, setActiveCbtPaper] = useState<{ title: string; yearOrType: string; questions: any[] } | null>(null);
  const [activeSolutionModal, setActiveSolutionModal] = useState<{ paper: NeetModelPaper; questions: NeetQuestion[] } | null>(null);
  const [pyqMode, setPyqMode] = useState<'full' | 'subject' | 'topic'>('full');

  const startCbtPaper = (title: string, yearOrType: string) => {
    const questions = generateQuestionsForNeetPaper(`neet_${Date.now()}`, Math.floor(Math.random() * 50));
    setActiveCbtPaper({ title, yearOrType, questions });
  };

  const openSolutionModal = (paper: NeetModelPaper) => {
    const questions = generateQuestionsForNeetPaper(paper.id, paper.paperNumber);
    setActiveSolutionModal({ paper, questions });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeInUp">
      {activeCbtPaper && (
        <NeetExamCbtWindow
          paperTitle={activeCbtPaper.title}
          paperYearOrType={activeCbtPaper.yearOrType}
          questions={activeCbtPaper.questions}
          onClose={() => setActiveCbtPaper(null)}
        />
      )}

      {/* Hero Header */}
      <div className="dark-container p-8 rounded-3xl space-y-4 relative overflow-hidden shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-emerald-400" /> NTA NEET UG Medical Engine 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
          National Eligibility cum Entrance Test (NEET UG)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Master Physics (45 Qs), Chemistry (45 Qs), Botany (45 Qs), and Zoology (45 Qs) with NTA 180-question 720-mark CBT simulations, subject & topic PYQs, 15 full mocks with complete step solutions, and AIIMS MBBS rank calibration.
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
          <BarChart3 className="w-4 h-4" /> AIIMS & Govt MBBS Radar
        </button>
      </div>

      {/* Tab Contents: Guide */}
      {subTab === 'guide' && (
        <div className="space-y-6">
          <div className="light-card p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> Official NTA Pattern (180 Questions / 720 Marks)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-sm">Physics (180M)</h4>
                <p className="text-emerald-800 mt-1">45 Questions</p>
                <p className="text-emerald-700 font-bold mt-1">+4 / -1 Marking</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-blue-950 text-sm">Chemistry (180M)</h4>
                <p className="text-blue-800 mt-1">45 Questions</p>
                <p className="text-blue-700 font-bold mt-1">+4 / -1 Marking</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-sm">Botany (180M)</h4>
                <p className="text-emerald-800 mt-1">45 Questions</p>
                <p className="text-emerald-700 font-bold mt-1">+4 / -1 Marking</p>
              </div>
              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200">
                <h4 className="font-bold text-teal-950 text-sm">Zoology (180M)</h4>
                <p className="text-teal-800 mt-1">45 Questions</p>
                <p className="text-teal-700 font-bold mt-1">+4 / -1 Marking</p>
              </div>
            </div>
            <button
              onClick={() => startCbtPaper("NEET UG Full Mock Paper 2026", "720-Mark NTA Standard")}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs shadow-sm transition"
            >
              Launch Full 180-Question NEET UG CBT Mock Window →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {NEET_SUBJECTS.map((sub) => (
              <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1D1E]">{sub.name}</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{sub.totalMarks} Marks</span>
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
              {NEET_PYQ_PAPERS.map(pyq => (
                <div key={pyq.id} className="light-card p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">NEET {pyq.year}</span>
                    <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{pyq.shift}</h4>
                    <p className="text-xs text-[#66625D] font-mono">{pyq.totalQs} Questions • {pyq.totalMarks} Marks</p>
                  </div>
                  <button
                    onClick={() => startCbtPaper(pyq.shift, `Year ${pyq.year}`)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition"
                  >
                    Attempt CBT
                  </button>
                </div>
              ))}
            </div>
          )}

          {pyqMode === 'subject' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NEET_SUBJECTS.map(sub => (
                <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3">
                  <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name}</h4>
                  <p className="text-xs text-[#66625D]">{sub.topics.length} NCERT Core Topics • 300+ PYQs</p>
                  <button
                    onClick={() => startCbtPaper(`NEET ${sub.name} PYQs`, "Subject Practice")}
                    className="w-full py-2 bg-[#1A1D1E] text-white hover:bg-black rounded-xl font-bold text-xs transition"
                  >
                    Start Subject PYQs (45 Qs) →
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
            {NEET_MODEL_PAPERS.map(paper => (
              <div key={paper.id} className="light-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">NEET Mock #{paper.paperNumber}</span>
                  <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{paper.title}</h4>
                  <p className="text-xs text-[#66625D] mt-1">{paper.description}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-[#E5E2D9]">
                  <button
                    onClick={() => startCbtPaper(paper.title, `Model #${paper.paperNumber}`)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Attempt CBT Window
                  </button>
                  <button
                    onClick={() => openSolutionModal(paper)}
                    className="w-full py-2 bg-white hover:bg-[#F5F4F0] text-[#1A1D1E] border border-[#E5E2D9] rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-600" /> View Answer Key & Solutions
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Solution Modal */}
          {activeSolutionModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base">{activeSolutionModal.paper.title} — Solutions</h3>
                    <p className="text-xs text-emerald-200">Complete NCERT-Aligned Answer Key & Biology Explanations</p>
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
                      <p className="text-xs text-[#66625D] bg-white p-2.5 rounded-xl border border-[#E5E2D9]"><strong className="text-[#1A1D1E]">NCERT Explanation:</strong> {q.explanation}</p>
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
            <Brain className="w-5 h-5 text-[#FAA114]" /> NEET NCERT Rapid-Fire Drills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEET_SUBJECTS.map(sub => (
              <div key={sub.id} className="p-4 bg-white rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name} Drill</h4>
                <p className="text-xs text-[#66625D]">45 Questions • 45 Minutes • Instant NCERT Solutions</p>
                <button
                  onClick={() => startCbtPaper(`NEET ${sub.name} Speed Drill`, "45-Q Drill")}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition"
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
            <BarChart3 className="w-5 h-5 text-[#22C55E]" /> NEET Score & AIIMS / Govt MBBS Cutoff Radar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Average Mock Score</span>
              <p className="text-2xl font-black text-[#1A1D1E] mt-1 font-mono">658 / 720</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Biology Accuracy</span>
              <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">96.4%</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Predicted AIR</span>
              <p className="text-xl font-bold text-[#C88410] mt-1 font-mono">AIR ~2,100</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">AIIMS / GMC Call</span>
              <p className="text-sm font-bold text-emerald-600 mt-2">ELIGIBLE (Top State Medical Colleges)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
