'use client';

import React, { useState } from 'react';
import { GateBranchId, GATE_BRANCHES, GATE_BRANCH_SUBJECTS, GATE_BRANCH_PYQS, GatePyqPaper } from '../../data/gateData';
import { FileText, Download, Play, CheckCircle, Brain, BookOpen, Clock, Award, ChevronRight } from 'lucide-react';

import { exportUniversalExamPaperToPdf } from '../../utils/pdfExporter';
import { generateQuestionsForGatePaper } from '../../data/gatePaperGenerator';

interface GatePyqVaultProps {
  branchId: GateBranchId;
  onStartCbtPaper: (title: string, yearOrType: string, customSubjectId?: string) => void;
}

export default function GatePyqVault({ branchId, onStartCbtPaper }: GatePyqVaultProps) {
  const [pyqMode, setPyqMode] = useState<'full' | 'subject' | 'topic'>('full');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');

  const branch = GATE_BRANCHES.find(b => b.id === branchId) || GATE_BRANCHES[0];
  const pyqPapers = GATE_BRANCH_PYQS[branchId] || GATE_BRANCH_PYQS.cs;
  const subjects = GATE_BRANCH_SUBJECTS[branchId] || GATE_BRANCH_SUBJECTS.cs;

  const handleExportPdf = (paper: GatePyqPaper) => {
    const seed = parseInt(paper.year, 10) || 2025;
    const qs = generateQuestionsForGatePaper(paper.id, seed, branchId);
    exportUniversalExamPaperToPdf('gate', paper.title, `GATE ${paper.year}`, qs);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" /> Previous Year Question Vault
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {branch.shortName} Authentic PYQ Papers (2020 – 2025)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Solve official previous year papers with exact NTA/IISc marking scheme, Virtual Calculator, and instant step-by-step solutions.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setPyqMode('full')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              pyqMode === 'full' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Papers
          </button>
          <button
            onClick={() => {
              setPyqMode('subject');
              if (!selectedSubjectId && subjects.length > 0) setSelectedSubjectId(subjects[0].id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              pyqMode === 'subject' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Subject-wise
          </button>
          <button
            onClick={() => {
              setPyqMode('topic');
              if (!selectedSubjectId && subjects.length > 0) setSelectedSubjectId(subjects[0].id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              pyqMode === 'topic' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Topic Specific
          </button>
        </div>
      </div>

      {/* Mode 1: Full-Length PYQ Papers */}
      {pyqMode === 'full' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pyqPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    GATE {paper.year}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {paper.downloadCount.toLocaleString()} Attempts
                  </span>
                </div>
                <h3 className="font-bold text-base text-white">{paper.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
                  <span>{paper.totalQs} Questions</span>
                  <span>•</span>
                  <span>{paper.totalMarks} Marks</span>
                  <span>•</span>
                  <span>{paper.durationMinutes} Mins</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => onStartCbtPaper(paper.title, `Year ${paper.year}`)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Attempt in CBT Window
                </button>
                <button
                  onClick={() => handleExportPdf(paper)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition border border-slate-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mode 2: Subject-wise PYQ Practice */}
      {pyqMode === 'subject' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((subject) => {
              const totalPyqs = subject.topics.reduce((acc, t) => acc + (t.pyqCount || 40), 0);
              return (
                <div
                  key={subject.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/20">
                        {subject.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {totalPyqs}+ PYQs
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">{subject.description}</p>
                    <div className="text-[11px] text-slate-400">
                      Covers {subject.topics.length} core engineering modules.
                    </div>
                  </div>

                  <button
                    onClick={() => onStartCbtPaper(`GATE ${branch.code} - ${subject.shortName} PYQs`, "Subject PYQ Drill", subject.id)}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-2"
                  >
                    Start Subject PYQ Test (20 Qs) <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 3: Topic-Specific PYQ Drills */}
      {pyqMode === 'topic' && (
        <div className="space-y-6">
          {/* Subject Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {subjects.map((subject) => {
              const isSelected = (selectedSubjectId || subjects[0].id) === subject.id;
              return (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubjectId(subject.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {subject.shortName}
                </button>
              );
            })}
          </div>

          {/* Topics List for Selected Subject */}
          {(() => {
            const currentSub = subjects.find(s => s.id === (selectedSubjectId || subjects[0].id)) || subjects[0];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSub.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-white">{topic.name}</h4>
                          <span className="text-xs text-slate-400 font-mono">Weightage: {topic.weightage} • {topic.pyqCount || 50}+ Previous Qs</span>
                        </div>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                          topic.importance === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {topic.importance}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {topic.keyConcepts.map((concept, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded-md border border-slate-800">
                            ✓ {concept}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onStartCbtPaper(`GATE ${branch.code} - ${topic.name} Drill`, "Topic PYQ Drill", currentSub.id)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl transition border border-slate-700 flex items-center justify-center gap-1.5"
                    >
                      Attempt Topic PYQs (10 Qs) <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
