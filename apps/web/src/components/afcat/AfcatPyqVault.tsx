'use client';

import React, { useState } from 'react';
import { AFCAT_PYQS, AFCAT_QUESTION_BANK, AfcatPyqPaper, AfcatQuestion } from '../../data/afcatData';
import { exportPaperToPdf } from '../../utils/pdfExporter';
import { FileText, Download, Eye, Sparkles, Search, CheckCircle, Calendar, Filter } from 'lucide-react';

export default function AfcatPyqVault() {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [activePdfViewer, setActivePdfViewer] = useState<AfcatPyqPaper | null>(null);
  const [activeSubjectTab, setActiveSubjectTab] = useState<string>('all');

  const filteredPyqs = AFCAT_PYQS.filter(p => 
    p.year.includes(searchQuery) || p.shift.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (paper: AfcatPyqPaper) => {
    if (!downloadedIds.includes(paper.id)) {
      setDownloadedIds([...downloadedIds, paper.id]);
    }
    const questionsToExport = paper.questions && paper.questions.length > 0 
      ? paper.questions 
      : AFCAT_QUESTION_BANK;
    exportPaperToPdf(paper, questionsToExport);
  };

  const getViewerQuestions = (paper: AfcatPyqPaper): AfcatQuestion[] => {
    const baseList = paper.questions && paper.questions.length > 0 ? paper.questions : AFCAT_QUESTION_BANK;
    if (activeSubjectTab === 'all') return baseList;
    return baseList.filter(q => q.subjectId === activeSubjectTab);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#262a2b] text-white p-8 shadow-lg border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faa114]/20 border border-[#faa114]/30 text-[#faa114] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Authentic PYQ Repository (2018–2025)
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'Outfit' }}>
              AFCAT Official Previous Year Question Papers
            </h2>
            <p className="text-white/70 text-sm max-w-2xl">
              Access 16 authentic AFCAT exam question papers with answer keys from 2018 to 2025. Preview full papers online or download printable PDF documents with step-by-step solutions.
            </p>
          </div>

          <div className="w-full md:w-auto bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0 text-center">
            <div className="text-3xl font-bold text-[#faa114]">{AFCAT_PYQS.length} Papers</div>
            <div className="text-xs text-white/60 font-medium">Fully Verified 2018–2025</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#e5e2d9] shadow-sm">
        <Search className="w-5 h-5 text-[#786e67]" />
        <input 
          type="text"
          placeholder="Filter PYQs by year (e.g. 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-none outline-none text-sm text-[#262a2b] placeholder-[#786e67]"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-xs text-[#786e67] hover:text-[#262a2b] px-2 py-1 bg-gray-100 rounded-lg"
          >
            Clear
          </button>
        )}
      </div>

      {/* PDF Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPyqs.map((paper) => {
          const isDownloaded = downloadedIds.includes(paper.id);

          return (
            <div 
              key={paper.id}
              className="bg-white rounded-3xl p-6 border border-[#e5e2d9] hover:border-[#faa114] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#faa114]/15 text-[#faa114] text-xs font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Year {paper.year}
                  </span>
                  {isDownloaded && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Downloaded
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-[#262a2b] leading-tight mb-2" style={{ fontFamily: 'Outfit' }}>
                  {paper.shift}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#786e67] my-3 p-3 bg-[#fcfcfb] rounded-xl border border-[#e5e2d9]">
                  <div>
                    <span className="font-medium text-[#262a2b]">Questions:</span> {paper.totalQs} Qs
                  </div>
                  <div>
                    <span className="font-medium text-[#262a2b]">Total Marks:</span> {paper.totalMarks}
                  </div>
                  <div>
                    <span className="font-medium text-[#262a2b]">Answer Key:</span> Included
                  </div>
                  <div>
                    <span className="font-medium text-[#262a2b]">Format:</span> Printable PDF
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#e5e2d9]">
                <button
                  onClick={() => {
                    setActivePdfViewer(paper);
                    setActiveSubjectTab('all');
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-[#262a2b] text-[#262a2b] hover:bg-[#262a2b] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
                <button
                  onClick={() => handleDownload(paper)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#262a2b] hover:bg-[#1a1d1e] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4 text-[#faa114]" /> PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PDF Modal Viewer */}
      {activePdfViewer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 bg-[#262a2b] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#faa114]/20 text-[#faa114]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{activePdfViewer.shift} — Complete Exam Suite</h3>
                  <p className="text-xs text-white/70">100 Questions • 300 Marks • Marking (+3 / -1)</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePdfViewer(null)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                Close Viewer ✕
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              {/* 3 Main Part View Mode Selector */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#fcfcfb] border border-[#e5e2d9] rounded-2xl">
                {[
                  { id: 'qp', label: '1ST: QUESTION PAPER (100 Qs)' },
                  { id: 'key', label: '2ND: ANSWER KEY (100 Qs)' },
                  { id: 'exp', label: '3RD: SOLUTIONS & EXPLANATIONS' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveSubjectTab(mode.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      activeSubjectTab === mode.id || (activeSubjectTab === 'all' && mode.id === 'exp')
                        ? 'bg-[#262a2b] text-white shadow-sm'
                        : 'text-[#786e67] hover:text-[#262a2b]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* VIEW MODE 1: QUESTION PAPER */}
              {activeSubjectTab === 'qp' && (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900">
                    <strong>Question Paper Mode:</strong> Questions 1 to 100 presented without answer keys for self-testing.
                  </div>
                  {(activePdfViewer.questions && activePdfViewer.questions.length > 0 ? activePdfViewer.questions : AFCAT_QUESTION_BANK).map((q, idx) => (
                    <div key={q.id || idx} className="p-5 bg-white rounded-2xl border border-[#e5e2d9] space-y-3 text-xs">
                      <div className="font-bold text-[#262a2b] text-sm">Q{idx + 1}. {q.questionText}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#786e67]">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="p-2.5 bg-[#fcfcfb] rounded-xl border border-[#e5e2d9]">
                            <strong>{String.fromCharCode(65 + oIdx)})</strong> {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW MODE 2: ANSWER KEY MATRIX */}
              {activeSubjectTab === 'key' && (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900">
                    <strong>Official Answer Key Table:</strong> Quick evaluation grid for Questions 1 to 100.
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center text-xs">
                    {(activePdfViewer.questions && activePdfViewer.questions.length > 0 ? activePdfViewer.questions : AFCAT_QUESTION_BANK).map((q, idx) => (
                      <div key={idx} className="p-2.5 bg-[#fcfcfb] rounded-xl border border-[#e5e2d9]">
                        <div className="text-[10px] text-[#786e67]">Q{idx + 1}</div>
                        <div className="font-bold text-emerald-700 text-sm">{String.fromCharCode(65 + q.correctOptionIndex)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW MODE 3: SOLUTIONS & EXPLANATIONS */}
              {(activeSubjectTab === 'exp' || activeSubjectTab === 'all') && (
                <div className="space-y-4">
                  {(activePdfViewer.questions && activePdfViewer.questions.length > 0 ? activePdfViewer.questions : AFCAT_QUESTION_BANK).map((q, idx) => (
                    <div key={q.id || idx} className="p-5 bg-[#fcfcfb] rounded-2xl border border-[#e5e2d9] space-y-3 text-xs">
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-bold text-[#262a2b] text-sm leading-snug">
                          Q{idx + 1}. {q.questionText}
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] shrink-0">
                          {q.topicName || q.subjectId.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#786e67]">
                        {q.options.map((opt, oIdx) => (
                          <div 
                            key={oIdx} 
                            className={`p-2.5 rounded-xl border ${
                              oIdx === q.correctOptionIndex 
                                ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-800' 
                                : 'bg-white border-[#e5e2d9]'
                            }`}
                          >
                            <strong>{String.fromCharCode(65 + oIdx)})</strong> {opt} {oIdx === q.correctOptionIndex ? '✓' : ''}
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[#e5e2d9] text-[#262a2b] leading-relaxed">
                        <strong className="text-[#faa114]">Step-by-Step Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#e5e2d9]">
                <button
                  onClick={() => handleDownload(activePdfViewer)}
                  className="px-8 py-3.5 rounded-2xl bg-[#262a2b] text-white text-xs font-bold hover:bg-[#1c2226] flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4 text-[#faa114]" /> Export & Download Full 3-Part PDF Paper
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
