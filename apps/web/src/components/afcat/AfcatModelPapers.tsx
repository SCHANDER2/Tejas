'use client';

import React, { useState } from 'react';
import { AFCAT_MODEL_PAPERS, AFCAT_QUESTION_BANK, AfcatModelPaper, AfcatQuestion } from '../../data/afcatData';
import { exportPaperToPdf } from '../../utils/pdfExporter';
import { FileCheck, Download, Sparkles, Clock, HelpCircle, ExternalLink, ArrowRight } from 'lucide-react';

export default function AfcatModelPapers({ onStartQuiz }: { onStartQuiz?: () => void }) {
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [activeModelPaper, setActiveModelPaper] = useState<AfcatModelPaper | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'qp' | 'key' | 'exp'>('qp');
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleDownload = (paper: AfcatModelPaper) => {
    if (!downloadedIds.includes(paper.id)) {
      setDownloadedIds([...downloadedIds, paper.id]);
    }
    const questionsToExport = paper.questions && paper.questions.length > 0 
      ? paper.questions 
      : AFCAT_QUESTION_BANK;
    exportPaperToPdf(paper, questionsToExport);
  };

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [qIndex]: optionIndex
    }));
  };

  const getModelQuestions = (paper: AfcatModelPaper): AfcatQuestion[] => {
    return paper.questions && paper.questions.length > 0 ? paper.questions : AFCAT_QUESTION_BANK;
  };

  const calculateScore = (paper: AfcatModelPaper) => {
    const qList = getModelQuestions(paper);
    let correct = 0;
    let wrong = 0;
    qList.forEach((q, idx) => {
      const chosen = userAnswers[idx];
      if (chosen !== undefined) {
        if (chosen === q.correctOptionIndex) correct++;
        else wrong++;
      }
    });
    return {
      correct,
      wrong,
      score: (correct * 3) - wrong,
      totalPossible: qList.length * 3,
      answeredCount: Object.keys(userAnswers).length
    };
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
            Curated specifically to replicate the actual difficulty, question structure, and marking system of AFCAT. Solve 15 real unanswered full-length mock tests online or download printable PDFs.
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
                  onClick={() => {
                    setActiveModelPaper(paper);
                    setActiveViewMode('qp');
                    setUserAnswers({});
                    setIsSubmitted(false);
                  }}
                  className="w-full py-2 px-4 rounded-xl bg-[#fcfcfb] hover:bg-[#e5e2d9]/50 text-[#262a2b] border border-[#e5e2d9] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  Attempt Model Test <ExternalLink className="w-3.5 h-3.5" />
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
                  <h3 className="font-bold text-lg">{activeModelPaper.title} — Real Mock Test</h3>
                  <p className="text-xs text-white/70">100 Questions • 300 Marks • Marking (+3 / -1)</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModelPaper(null)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                Close Test ✕
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              {/* 3 Main Part View Mode Selector */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#fcfcfb] border border-[#e5e2d9] rounded-2xl">
                {[
                  { id: 'qp', label: '1ST: UNANSWERED EXAM (100 Qs)' },
                  { id: 'key', label: '2ND: ANSWER KEY (100 Qs)' },
                  { id: 'exp', label: '3RD: SOLUTIONS & EXPLANATIONS' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveViewMode(mode.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      activeViewMode === mode.id
                        ? 'bg-[#262a2b] text-white shadow-sm'
                        : 'text-[#786e67] hover:text-[#262a2b]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* VIEW MODE 1: UNANSWERED EXAM */}
              {activeViewMode === 'qp' && (
                <div className="space-y-6">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900">
                    <div>
                      <strong>Real AFCAT Model Mock Mode:</strong> Solve all 100 questions cleanly. Select option A, B, C, or D for each question.
                    </div>
                    <span className="font-bold text-amber-950 bg-amber-200 px-3 py-1 rounded-xl">
                      {Object.keys(userAnswers).length} / 100 Answered
                    </span>
                  </div>

                  {isSubmitted && (
                    <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
                      <h4 className="font-bold text-lg text-emerald-900">Mock Test Submitted Successfully!</h4>
                      <div className="text-sm font-bold text-emerald-800">
                        Score: {calculateScore(activeModelPaper).score} / {calculateScore(activeModelPaper).totalPossible} Marks ({calculateScore(activeModelPaper).correct} Correct, {calculateScore(activeModelPaper).wrong} Incorrect)
                      </div>
                    </div>
                  )}

                  {getModelQuestions(activeModelPaper).map((q, idx) => {
                    const selected = userAnswers[idx];
                    return (
                      <div key={q.id || idx} className="p-5 bg-white rounded-2xl border border-[#e5e2d9] space-y-3 text-xs">
                        <div className="font-bold text-[#262a2b] text-sm">Q{idx + 1}. {q.questionText}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#786e67]">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = selected === oIdx;
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => handleSelectAnswer(idx, oIdx)}
                                className={`p-3 rounded-xl border text-left font-medium transition-all ${
                                  isChosen 
                                    ? 'bg-[#262a2b] text-white border-[#262a2b] shadow-md font-bold' 
                                    : 'bg-[#fcfcfb] text-[#262a2b] border-[#e5e2d9] hover:border-[#faa114]'
                                }`}
                              >
                                <strong>{String.fromCharCode(65 + oIdx)})</strong> {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {!isSubmitted && (
                    <div className="flex justify-center pt-4">
                      <button
                        onClick={() => {
                          setIsSubmitted(true);
                          setActiveViewMode('key');
                        }}
                        className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg"
                      >
                        Submit Mock Test & View Answer Key & Solutions
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* VIEW MODE 2: ANSWER KEY MATRIX */}
              {activeViewMode === 'key' && (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900">
                    <strong>Official Answer Key Table:</strong> Quick evaluation grid for Questions 1 to 100.
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center text-xs">
                    {getModelQuestions(activeModelPaper).map((q, idx) => (
                      <div key={idx} className="p-2.5 bg-[#fcfcfb] rounded-xl border border-[#e5e2d9]">
                        <div className="text-[10px] text-[#786e67]">Q{idx + 1}</div>
                        <div className="font-bold text-emerald-700 text-sm">{String.fromCharCode(65 + q.correctOptionIndex)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW MODE 3: SOLUTIONS & EXPLANATIONS */}
              {activeViewMode === 'exp' && (
                <div className="space-y-4">
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
              )}

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#e5e2d9]">
                <button
                  onClick={() => handleDownload(activeModelPaper)}
                  className="px-8 py-3.5 rounded-2xl bg-[#262a2b] text-white text-xs font-bold hover:bg-[#1c2226] flex items-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4 text-[#faa114]" /> Export & Download Complete 3-Part Model Paper PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
