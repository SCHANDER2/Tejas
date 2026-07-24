'use client';

import React, { useState } from 'react';
import { AFCAT_PYQS, AfcatPyqPaper } from '../../data/afcatData';
import { FileText, Download, Eye, Sparkles, Search, CheckCircle, ArrowDownToLine, Calendar, Award } from 'lucide-react';

export default function AfcatPyqVault() {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [activePdfViewer, setActivePdfViewer] = useState<AfcatPyqPaper | null>(null);

  const filteredPyqs = AFCAT_PYQS.filter(p => 
    p.year.includes(searchQuery) || p.shift.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (paper: AfcatPyqPaper) => {
    if (!downloadedIds.includes(paper.id)) {
      setDownloadedIds([...downloadedIds, paper.id]);
    }
    // Simulate window open / download
    const link = document.createElement('a');
    link.href = paper.pdfUrl;
    link.target = '_blank';
    link.download = `${paper.shift.replace(/[^a-zA-Z0-9]/g, '_')}_PYQ.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#262a2b] text-white p-8 shadow-lg border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faa114]/20 border border-[#faa114]/30 text-[#faa114] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Official PYQ Collection
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'Outfit' }}>
              AFCAT Previous Year Question Papers (PYQs)
            </h2>
            <p className="text-white/70 text-sm max-w-2xl">
              Access authentic AFCAT exam question papers with answer keys from 2018 to 2025. Solve PYQs to master repeated questions and question patterns.
            </p>
          </div>

          <div className="w-full md:w-auto bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0 text-center">
            <div className="text-3xl font-bold text-[#faa114]">{AFCAT_PYQS.length} Papers</div>
            <div className="text-xs text-white/60 font-medium">Available for Instant Access</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#e5e2d9] shadow-sm">
        <Search className="w-5 h-5 text-[#786e67]" />
        <input 
          type="text"
          placeholder="Filter PYQs by year (e.g. 2024, 2023, 2022)..."
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
                    <span className="font-medium text-[#262a2b]">Solutions:</span> Included
                  </div>
                  <div>
                    <span className="font-medium text-[#262a2b]">Format:</span> Official PDF
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#e5e2d9]">
                <button
                  onClick={() => setActivePdfViewer(paper)}
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
                  <h3 className="font-bold text-lg">{activePdfViewer.shift} — Question Paper & Key</h3>
                  <p className="text-xs text-white/70">Official PDF View</p>
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
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#faa114] shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Mentorship Tip:</strong> Solve this paper within 2 hours without checking solutions first to accurately benchmark your readiness.
                </div>
              </div>

              <div className="border border-[#e5e2d9] rounded-2xl p-6 bg-[#fcfcfb] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#262a2b] text-base">{activePdfViewer.shift} Sample Exam Questions</h4>
                  <span className="text-xs text-[#786e67] bg-white px-2.5 py-1 rounded-lg border border-[#e5e2d9]">100 Qs • 300 Marks</span>
                </div>

                {/* Question Samples */}
                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-white rounded-xl border border-[#e5e2d9] space-y-2 text-xs">
                    <div className="font-bold text-[#262a2b]">Q1 (English). Select the synonym for "VALIANT":</div>
                    <div className="grid grid-cols-2 gap-2 text-[#786e67]">
                      <div className="p-2 bg-[#fcfcfb] rounded-lg border border-[#e5e2d9]">A) Cowardly</div>
                      <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-300 font-bold text-emerald-800">B) Gallant ✓</div>
                      <div className="p-2 bg-[#fcfcfb] rounded-lg border border-[#e5e2d9]">C) Timid</div>
                      <div className="p-2 bg-[#fcfcfb] rounded-lg border border-[#e5e2d9]">D) Hesitant</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#e5e2d9] space-y-2 text-xs">
                    <div className="font-bold text-[#262a2b]">Q2 (Maths). A train 150m long passes a post in 9s. Speed in km/h?</div>
                    <div className="grid grid-cols-2 gap-2 text-[#786e67]">
                      <div className="p-2 bg-[#fcfcfb] rounded-lg border border-[#e5e2d9]">A) 50 km/h</div>
                      <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-300 font-bold text-emerald-800">B) 60 km/h ✓</div>
                      <div className="p-2 bg-[#fcfcfb] rounded-lg border border-[#e5e2d9]">C) 72 km/h</div>
                      <div className="p-2 bg-[#fcfcfb] rounded-lg border border-[#e5e2d9]">D) 80 km/h</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#e5e2d9] space-y-2 text-xs">
                    <div className="font-bold text-[#262a2b]">Q3 (GA). Where is the HQ of IAF Maintenance Command located?</div>
                    <div className="grid grid-cols-2 gap-2 text-[#786e67]">
                      <div className="p-2 bg-[#fcfcfb] rounded-lg border border-[#e5e2d9]">A) New Delhi</div>
                      <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-300 font-bold text-emerald-800">B) Nagpur ✓</div>
                      <div className="p-2 bg-[#fcfcfb] rounded-lg border border-[#e5e2d9]">C) Bengaluru</div>
                      <div className="p-2 bg-[#fcfcfb] rounded-lg border border-[#e5e2d9]">D) Shillong</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => handleDownload(activePdfViewer)}
                    className="px-6 py-3 rounded-xl bg-[#262a2b] text-white text-xs font-bold hover:bg-[#1c2226] flex items-center gap-2 shadow-md"
                  >
                    <Download className="w-4 h-4 text-[#faa114]" /> Download Full PDF Paper with Answer Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
