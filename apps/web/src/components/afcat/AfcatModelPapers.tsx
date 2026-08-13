'use client';

import React, { useState } from 'react';
import { AFCAT_MODEL_PAPERS, AFCAT_QUESTION_BANK, AfcatModelPaper, AfcatQuestion } from '../../data/afcatData';
import { exportPaperToPdf } from '../../utils/pdfExporter';
import { FileCheck, Download, Sparkles, Clock, HelpCircle, ExternalLink, ArrowRight } from 'lucide-react';

export default function AfcatModelPapers({ onStartQuiz }: { onStartQuiz?: () => void }) {
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [activeModelPaper, setActiveModelPaper] = useState<AfcatModelPaper | null>(null);

  const handleDownload = (paper: AfcatModelPaper) => {
    if (!downloadedIds.includes(paper.id)) {
      setDownloadedIds([...downloadedIds, paper.id]);
    }
    const questionsToExport = paper.questions && paper.questions.length > 0 
      ? paper.questions 
      : AFCAT_QUESTION_BANK;
    exportPaperToPdf(paper, questionsToExport);
  };

  const getModelQuestions = (paper: AfcatModelPaper): AfcatQuestion[] => {
    return paper.questions && paper.questions.length > 0 ? paper.questions : AFCAT_QUESTION_BANK;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e2327] via-[#262a2b] to-[#343a40] text-white p-8 md:p-10 shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#faa114]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#faa114]/20 border border-[#faa114]/30 text-[#faa114] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> High-Yield AFCAT Model Series
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'Outfit' }}>
            15 Official Level AFCAT Model Papers
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Curated specifically to replicate the actual difficulty, question structure, and marking system of AFCAT. Includes 15 full-length mock tests with comprehensive explanations for every question.
          </p>
        </div>
      </div>

      {/* Model Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AFCAT_MODEL_PAPERS.map((paper) => {
          return (
            <div 
              key={paper.id}
              className="bg-white rounded-3xl p-6 border border-[#e5e2d9] hover:border-[#faa114] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#262a2b] text-white text-xs font-bold">
                    Mock Test #{paper.paperNumber}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    paper.difficulty === 'Advanced'
                      ? 'bg-rose-100 text-rose-700'
                      : paper.difficulty === 'AFCAT Standard'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {paper.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[#262a2b] leading-snug mb-2" style={{ fontFamily: 'Outfit' }}>
                  {paper.title}
                </h3>
                <p className="text-xs text-[#786e67] leading-relaxed mb-4">
                  {paper.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#786e67] p-3 bg-[#fcfcfb] rounded-xl border border-[#e5e2d9]">
                  <div className="flex items-center gap-1.5 font-medium text-[#262a2b]">
                    <HelpCircle className="w-3.5 h-3.5 text-[#faa114]" /> {paper.totalQuestions} Qs
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-[#262a2b]">
                    <Clock className="w-3.5 h-3.5 text-blue-500" /> {paper.durationMinutes} Mins
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#e5e2d9]">
                <button
                  onClick={() => setActiveModelPaper(paper)}
                  className="w-full py-2 px-4 rounded-xl bg-[#fcfcfb] hover:bg-[#e5e2d9]/50 text-[#262a2b] border border-[#e5e2d9] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  Preview Paper & Solutions <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDownload(paper)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#262a2b] hover:bg-[#1c2226] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4 text-[#faa114]" /> Download Model Paper PDF
                </button>
                {onStartQuiz && (
                  <button
                    onClick={onStartQuiz}
                    className="w-full py-2 px-4 rounded-xl bg-[#faa114]/15 hover:bg-[#faa114]/25 text-[#262a2b] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    Attempt as Online Quiz <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Solution Preview Modal */}
      {activeModelPaper && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 bg-[#262a2b] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#faa114]/20 text-[#faa114]">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{activeModelPaper.title}</h3>
                  <p className="text-xs text-white/70">AFCAT Standard Level Full Test & Key</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModelPaper(null)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                Close Preview ✕
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-[#fcfcfb] rounded-2xl border border-[#e5e2d9]">
                  <div className="text-xs text-[#786e67]">Questions</div>
                  <div className="text-xl font-bold text-[#262a2b] mt-1">{activeModelPaper.totalQuestions} Qs</div>
                </div>
                <div className="p-4 bg-[#fcfcfb] rounded-2xl border border-[#e5e2d9]">
                  <div className="text-xs text-[#786e67]">Duration</div>
                  <div className="text-xl font-bold text-[#262a2b] mt-1">{activeModelPaper.durationMinutes} Mins</div>
                </div>
                <div className="p-4 bg-[#fcfcfb] rounded-2xl border border-[#e5e2d9]">
                  <div className="text-xs text-[#786e67]">Target Cutoff</div>
                  <div className="text-xl font-bold text-emerald-600 mt-1">165+ Marks</div>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-[#262a2b] text-sm">Full Exam Questions & Explanations:</h4>
                {getModelQuestions(activeModelPaper).map((q, idx) => (
                  <div key={q.id || idx} className="p-4 bg-[#fcfcfb] rounded-2xl border border-[#e5e2d9] space-y-2 text-xs">
                    <div className="font-bold text-[#262a2b] text-sm">Q{idx + 1}. {q.questionText}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#786e67]">
                      {q.options.map((opt, oIdx) => (
                        <div 
                          key={oIdx} 
                          className={`p-2 rounded-xl border ${
                            oIdx === q.correctOptionIndex 
                              ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-800' 
                              : 'bg-white border-[#e5e2d9]'
                          }`}
                        >
                          <strong>{String.fromCharCode(65 + oIdx)})</strong> {opt} {oIdx === q.correctOptionIndex ? '✓' : ''}
                        </div>
                      ))}
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-[#e5e2d9] text-[#262a2b]">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#e5e2d9]">
                <button
                  onClick={() => handleDownload(activeModelPaper)}
                  className="px-8 py-3.5 rounded-2xl bg-[#262a2b] text-white text-xs font-bold hover:bg-[#1c2226] flex items-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4 text-[#faa114]" /> Export & Download Complete Model Paper PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
