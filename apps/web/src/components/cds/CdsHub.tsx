'use client';

import React, { useState } from 'react';
import { CDS_EXAM_PATTERN, CDS_SUBJECTS, CDS_PYQ_PAPERS, CDS_MODEL_PAPERS, CdsModelPaper, CdsQuestion } from '../../data/cdsData';
import { generateQuestionsForCdsPaper } from '../../data/cdsPaperGenerator';
import CdsExamCbtWindow from './CdsExamCbtWindow';
import { BookOpen, FileText, FileCheck, Brain, BarChart3, Shield, Award, CheckCircle2, ChevronRight, Play, Eye, X, HelpCircle, Download, Clock } from 'lucide-react';

export default function CdsHub() {
  const [track, setTrack] = useState<'IMA' | 'OTA'>('IMA');
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model' | 'quiz' | 'analytics'>('guide');
  const [activeCbtPaper, setActiveCbtPaper] = useState<{ title: string; yearOrType: string; track: 'IMA' | 'OTA'; questions: any[] } | null>(null);
  const [activeSolutionModal, setActiveSolutionModal] = useState<{ paper: CdsModelPaper; questions: CdsQuestion[] } | null>(null);
  const [pyqMode, setPyqMode] = useState<'full' | 'subject' | 'topic'>('full');

  const startCbtPaper = (title: string, yearOrType: string, selectedTrack: 'IMA' | 'OTA' = track) => {
    const questions = generateQuestionsForCdsPaper(`cds_${Date.now()}`, selectedTrack, Math.floor(Math.random() * 50));
    setActiveCbtPaper({ title, yearOrType, track: selectedTrack, questions });
  };

  const openSolutionModal = (paper: CdsModelPaper) => {
    const questions = generateQuestionsForCdsPaper(paper.id, paper.track, paper.paperNumber);
    setActiveSolutionModal({ paper, questions });
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

      {/* Hero Header */}
      <div className="dark-container p-8 rounded-3xl space-y-4 relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5 text-[#FAA114]" /> UPSC CDS Master Engine 2026
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
              Combined Defence Services — {track === 'IMA' ? 'IMA / INA / AFA' : 'OTA'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl mt-1">
              Complete preparation suite for UPSC CDS. Master English (120 Qs), General Knowledge (120 Qs), and Elementary Maths (100 Qs) with authentic CBT simulations, subject & topic PYQ vaults, 15 full mocks with complete solutions, and SSB Interview qualification analytics.
            </p>
          </div>

          {/* Track Switcher */}
          <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1.5 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setTrack('IMA')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                track === 'IMA' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              IMA / INA / AFA (300M)
            </button>
            <button
              onClick={() => setTrack('OTA')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                track === 'OTA' ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              OTA Officers Training (200M)
            </button>
          </div>
        </div>
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
          <BarChart3 className="w-4 h-4" /> Candidate Calibration & SSB Radar
        </button>
      </div>

      {/* Sub Tab: Guide */}
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

          {/* Subjects & Playlists */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CDS_SUBJECTS.map((sub) => (
              <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1D1E]">{sub.name}</span>
                  <span className="text-[10px] font-mono text-[#C88410] bg-[#FAF3E6] px-2 py-0.5 rounded border border-[#E8D5B7]">{sub.totalMarks} Marks</span>
                </div>
                <p className="text-xs text-[#66625D]">{sub.description}</p>
                {sub.youtubePlaylists && sub.youtubePlaylists.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {sub.youtubePlaylists.map((playlist, idx) => (
                      <a
                        key={idx}
                        href={playlist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                      >
                        Watch {playlist.channel} Playlist →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub Tab: PYQ Vault */}
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

          {pyqMode === 'subject' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CDS_SUBJECTS.map(sub => (
                <div key={sub.id} className="light-card p-5 rounded-2xl space-y-3">
                  <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name}</h4>
                  <p className="text-xs text-[#66625D]">{sub.topics.length} Core UPSC Topics • 150+ PYQs</p>
                  <button
                    onClick={() => startCbtPaper(`CDS ${sub.name} PYQ Drill`, "Subject Practice", track)}
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

      {/* Sub Tab: 15 Model Papers with Solutions */}
      {subTab === 'model' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CDS_MODEL_PAPERS.map(paper => (
              <div key={paper.id} className="light-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{paper.track} Mock #{paper.paperNumber}</span>
                  <h4 className="font-bold text-sm text-[#1A1D1E] mt-1">{paper.title}</h4>
                  <p className="text-xs text-[#66625D] mt-1">{paper.description}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-[#E5E2D9]">
                  <button
                    onClick={() => startCbtPaper(paper.title, `Model #${paper.paperNumber}`, paper.track)}
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
                    <p className="text-xs text-slate-300">Detailed Answer Key and Rationale</p>
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

      {/* Sub Tab: Quiz */}
      {subTab === 'quiz' && (
        <div className="light-card p-6 rounded-3xl space-y-6">
          <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#FAA114]" /> CDS Speed & Concept Drills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CDS_SUBJECTS.map(sub => (
              <div key={sub.id} className="p-4 bg-white rounded-2xl border border-[#E5E2D9] space-y-2">
                <h4 className="font-bold text-sm text-[#1A1D1E]">{sub.name} Quiz</h4>
                <p className="text-xs text-[#66625D]">20 Questions • 25 Minutes • Instant Solutions</p>
                <button
                  onClick={() => startCbtPaper(`CDS ${sub.name} Speed Drill`, "20-Q Drill", track)}
                  className="w-full py-2 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold text-xs rounded-xl transition"
                >
                  Start Practice Drill →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub Tab: Analytics */}
      {subTab === 'analytics' && (
        <div className="light-card p-6 rounded-3xl space-y-6">
          <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#22C55E]" /> CDS Calibration & SSB Cutoff Radar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Avg Score</span>
              <p className="text-2xl font-black text-[#1A1D1E] mt-1 font-mono">148 / 300</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">SSB Call Status</span>
              <p className="text-sm font-bold text-emerald-600 mt-2">ELIGIBLE (IMA/AFA)</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Accuracy</span>
              <p className="text-2xl font-black text-[#C88410] mt-1 font-mono">78.2%</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
              <span className="text-xs text-[#66625D]">Sectional Clear</span>
              <p className="text-sm font-bold text-emerald-600 mt-2">3 / 3 (All &gt;20%)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
