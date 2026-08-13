'use client';

import React, { useState } from 'react';
import { AFCAT_PYQS, AFCAT_QUESTION_BANK, AfcatPyqPaper, AfcatQuestion } from '../../data/afcatData';
import { exportPaperToPdf } from '../../utils/pdfExporter';
import { FileText, Download, Eye, Sparkles, Search, CheckCircle, Calendar, Filter } from 'lucide-react';

import AfcatExamCbtWindow from './AfcatExamCbtWindow';

export default function AfcatPyqVault() {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [activeCbtPaper, setActiveCbtPaper] = useState<AfcatPyqPaper | null>(null);

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
              Access 16 authentic AFCAT exam question papers with answer keys from 2018 to 2025. Solve real unanswered exam papers online or download printable PDF documents with step-by-step solutions.
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
                    <span className="font-medium text-[#262a2b]">Mode:</span> Unanswered Exam
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#e5e2d9]">
                <button
                  onClick={() => setActiveCbtPaper(paper)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-[#262a2b] text-[#262a2b] hover:bg-[#262a2b] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Eye className="w-4 h-4 text-[#faa114]" /> Launch Test Window
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

      {/* Dedicated CDAC AFCAT CBT Exam Window & Calibration Report */}
      {activeCbtPaper && (
        <AfcatExamCbtWindow
          paperTitle={`${activeCbtPaper.shift} — Real AFCAT Paper`}
          paperYearOrType={activeCbtPaper.year}
          questions={activeCbtPaper.questions && activeCbtPaper.questions.length > 0 ? activeCbtPaper.questions : AFCAT_QUESTION_BANK}
          targetCutoff={155}
          rawPaperObj={activeCbtPaper}
          onClose={() => setActiveCbtPaper(null)}
        />
      )}
    </div>
  );
}
