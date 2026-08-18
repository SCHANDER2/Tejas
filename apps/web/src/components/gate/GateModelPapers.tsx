'use client';

import React, { useState } from 'react';
import { GateBranchId, GATE_BRANCHES, getGateModelPapersForBranch, GateModelPaper, GateQuestion } from '../../data/gateData';
import { generateQuestionsForGatePaper } from '../../data/gatePaperGenerator';
import { FileCheck, Play, Eye, X, Award, CheckCircle, HelpCircle, ChevronDown, ChevronUp, Clock, Calculator } from 'lucide-react';

interface GateModelPapersProps {
  branchId: GateBranchId;
  onStartCbtPaper: (title: string, yearOrType: string) => void;
}

export default function GateModelPapers({ branchId, onStartCbtPaper }: GateModelPapersProps) {
  const [activeSolutionModalPaper, setActiveSolutionModalPaper] = useState<{
    paper: GateModelPaper;
    questions: GateQuestion[];
  } | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Standard GATE' | 'Advanced IISc' | 'Moderate'>('all');
  const [expandedQId, setExpandedQId] = useState<string | null>(null);

  const branch = GATE_BRANCHES.find(b => b.id === branchId) || GATE_BRANCHES[0];
  const modelPapers = getGateModelPapersForBranch(branchId);

  const filteredPapers = filterDifficulty === 'all' 
    ? modelPapers 
    : modelPapers.filter(p => p.difficulty === filterDifficulty);

  const openSolutionModal = (paper: GateModelPaper) => {
    const questions = generateQuestionsForGatePaper(paper.id, paper.paperNumber, branchId);
    setActiveSolutionModalPaper({ paper, questions });
    setExpandedQId(questions[0]?.id || null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <FileCheck className="w-3.5 h-3.5" /> 15 Full-Length Mock Exams
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {branch.shortName} Full Mock Simulation Series
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate the exact 65-question 100-mark GATE exam with integrated Virtual Scientific Calculator, sectional timers, and comprehensive answer keys with solutions.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto shrink-0">
          {(['all', 'Standard GATE', 'Advanced IISc', 'Moderate'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterDifficulty === diff
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {diff === 'all' ? 'All 15 Mocks' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Model Papers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  Mock Paper #{paper.paperNumber}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  paper.difficulty === 'Advanced IISc'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : paper.difficulty === 'Standard GATE'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {paper.difficulty}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-white">{paper.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{paper.description}</p>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                <span>{paper.totalQuestions} Questions</span>
                <span>•</span>
                <span>{paper.totalMarks} Marks</span>
                <span>•</span>
                <span>{paper.durationMinutes} Mins</span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => onStartCbtPaper(paper.title, `Mock #${paper.paperNumber}`)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Attempt in CBT Window
              </button>

              <button
                onClick={() => openSolutionModal(paper)}
                className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs rounded-xl transition border border-slate-800 flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" /> View Answer Key & Solutions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Answer Key & Step-by-Step Solutions Modal */}
      {activeSolutionModalPaper && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#003366] text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/40">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black text-xs">SOLUTIONS</span>
                  <h3 className="font-bold text-base">{activeSolutionModalPaper.paper.title}</h3>
                </div>
                <p className="text-xs text-blue-200 mt-0.5">Complete Answer Key & Step-by-Step Mathematical Solutions (65 Questions)</p>
              </div>

              <button
                onClick={() => setActiveSolutionModalPaper(null)}
                className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeSolutionModalPaper.questions.map((q, idx) => {
                const isExpanded = expandedQId === q.id;
                return (
                  <div
                    key={q.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3"
                  >
                    <div
                      onClick={() => setExpandedQId(isExpanded ? null : q.id)}
                      className="flex items-start justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-slate-300">{q.topicName}</span>
                          <span className="text-[10px] font-mono font-bold text-blue-400 ml-2">[{q.type} • {q.marks}M]</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                          Ans: {q.type === 'NAT' ? q.correctNatValue : (q.correctOptionIndices || []).map(i => String.fromCharCode(65 + i)).join(', ')}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {q.questionText}
                    </p>

                    {/* Expanded Details: Options & Step-by-Step Solution */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                        {/* Options if MCQ / MSQ */}
                        {q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const isCorrect = (q.correctOptionIndices || []).includes(optIdx);
                              return (
                                <div
                                  key={optIdx}
                                  className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2.5 ${
                                    isCorrect
                                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold'
                                      : 'bg-slate-900 border-slate-800 text-slate-400'
                                  }`}
                                >
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                    isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                                  }`}>
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Step-by-Step Solution Box */}
                        <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5" /> Detailed Explanation & Formula
                            </span>
                            {q.formulaUsed && (
                              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                                {q.formulaUsed}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {q.explanation}
                          </p>

                          {q.stepByStepSolution && q.stepByStepSolution.length > 0 && (
                            <div className="space-y-1 pt-1.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Solution Steps:</span>
                              {q.stepByStepSolution.map((step, sIdx) => (
                                <div key={sIdx} className="text-xs text-slate-400 flex items-start gap-2">
                                  <span className="text-amber-400 font-mono font-bold shrink-0">{sIdx + 1}.</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Total 65 Questions with Full Solutions</span>
              <button
                onClick={() => {
                  const paper = activeSolutionModalPaper.paper;
                  setActiveSolutionModalPaper(null);
                  onStartCbtPaper(paper.title, `Mock #${paper.paperNumber}`);
                }}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition shadow flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Attempt in CBT Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
