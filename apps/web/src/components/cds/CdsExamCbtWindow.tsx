'use client';

import React, { useState, useEffect } from 'react';
import { CdsQuestion, CdsPyqPaper, CdsModelPaper } from '../../data/cdsData';
import { 
  Clock, CheckCircle, XCircle, Award, BarChart2, BookOpen, AlertTriangle, 
  ChevronLeft, ChevronRight, Download, RefreshCw, FileText, Check, Shield, User
} from 'lucide-react';

interface CdsExamCbtWindowProps {
  paperTitle: string;
  paperYearOrType: string;
  questions: CdsQuestion[];
  track?: 'IMA' | 'OTA';
  onClose: () => void;
  rawPaperObj?: CdsPyqPaper | CdsModelPaper;
}

export default function CdsExamCbtWindow({
  paperTitle,
  paperYearOrType,
  questions,
  track = 'IMA',
  onClose,
  rawPaperObj
}: CdsExamCbtWindowProps) {
  const [activeTab, setActiveTab] = useState<'exam' | 'report' | 'key' | 'solutions'>('exam');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [timeLeft, setTimeLeft] = useState<number>((track === 'IMA' ? 360 : 240) * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  useEffect(() => {
    setVisited(prev => ({ ...prev, [currentQIndex]: true }));
  }, [currentQIndex]);

  useEffect(() => {
    if (isSubmitted || activeTab !== 'exam') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, activeTab]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? h + ':' : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: optIdx }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({ ...prev, [currentQIndex]: !prev[currentQIndex] }));
  };

  const handleSaveAndNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const handleClearResponse = () => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQIndex];
      return copy;
    });
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setActiveTab('report');
  };

  const calculateAnalysis = () => {
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    questions.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      if (userAns === undefined) {
        unattemptedCount++;
      } else if (userAns === q.correctOptionIndex) {
        correctCount++;
        score += q.subjectId === 'maths' ? 1.0 : 0.833;
      } else {
        incorrectCount++;
        score -= q.subjectId === 'maths' ? 0.333 : 0.27;
      }
    });

    const maxMarks = track === 'IMA' ? 300 : 200;
    const targetCutoff = track === 'IMA' ? 140 : 105;
    const isPassed = score >= targetCutoff;
    const accuracy = (correctCount + incorrectCount) > 0 ? (correctCount / (correctCount + incorrectCount)) * 100 : 0;
    const percentile = Math.min(99.9, Math.max(10, (score / maxMarks) * 100 * 1.4));
    const airRank = Math.max(14, Math.floor(185000 * (1 - percentile / 100)));

    return { score: score.toFixed(2), maxMarks, correctCount, incorrectCount, unattemptedCount, isPassed, accuracy: accuracy.toFixed(1), percentile: percentile.toFixed(1), airRank, targetCutoff };
  };

  const analysis = calculateAnalysis();
  const currentQ = questions[currentQIndex];

  const filteredQuestions = questions.filter(q => {
    if (selectedSubjectFilter === 'all') return true;
    return q.subjectId === selectedSubjectFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Official CDAC/UPSC Navy Blue Top Bar */}
      <div className="bg-[#003366] text-white px-6 py-3 border-b border-[#faa114]/40 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#faa114]" />
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide text-white">UPSC COMBINED DEFENCE SERVICES (CDS) — ONLINE CBT SYSTEM</h1>
            <p className="text-xs text-blue-200">{paperTitle} • {paperYearOrType} ({track} Track)</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-slate-900/80 border border-amber-500/40 px-4 py-1.5 rounded-lg flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#faa114] animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">Time Left:</span>
            <span className="font-mono font-bold text-lg text-amber-400">{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded font-medium text-xs transition"
          >
            Exit Exam
          </button>
        </div>
      </div>

      {/* Main CBT Workspace Layout */}
      {activeTab === 'exam' && currentQ && (
        <div className="flex-1 flex overflow-hidden bg-gray-100 text-black">
          {/* Question Panel */}
          <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <span className="bg-[#003366] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  Question No. {currentQIndex + 1} of {questions.length}
                </span>
                <span className="text-xs text-gray-500 font-semibold">Subject: {currentQ.topicName}</span>
              </div>

              <div className="text-base font-semibold text-gray-900 mb-6 leading-relaxed whitespace-pre-line">
                {currentQ.questionText}
              </div>

              <div className="space-y-3 max-w-3xl">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left px-5 py-3.5 rounded-lg border-2 text-sm font-medium transition flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8] font-bold shadow-sm'
                          : 'border-gray-300 hover:border-gray-400 bg-white text-gray-800'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                        isSelected ? 'bg-[#1a73e8] text-white border-[#1a73e8]' : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Official CBT Footer Buttons */}
            <div className="pt-6 border-t border-gray-200 flex items-center justify-between mt-6 bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMarkForReview}
                  className={`px-4 py-2 rounded text-xs font-bold transition border ${
                    markedForReview[currentQIndex]
                      ? 'bg-purple-700 text-white border-purple-800'
                      : 'bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100'
                  }`}
                >
                  {markedForReview[currentQIndex] ? '🟣 Marked for Review' : '🟪 Mark for Review & Next'}
                </button>

                <button
                  onClick={handleClearResponse}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-xs font-bold transition border border-gray-400"
                >
                  ⚪ Clear Response
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 bg-gray-100 disabled:opacity-40 text-gray-700 rounded text-xs font-bold transition border border-gray-300 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  onClick={handleSaveAndNext}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold transition flex items-center gap-1 shadow-sm"
                >
                  🟩 Save & Next <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSubmitExam}
                  className="ml-4 px-5 py-2 bg-[#003366] hover:bg-blue-900 text-white rounded text-xs font-bold transition shadow"
                >
                  Submit CDS Paper
                </button>
              </div>
            </div>
          </div>

          {/* Right Question Palette Side Panel */}
          <div className="w-80 bg-gray-50 border-l border-gray-300 flex flex-col justify-between p-4 overflow-y-auto">
            <div>
              <div className="bg-white p-3 rounded border border-gray-300 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                  CDS
                </div>
                <div>
                  <h3 className="font-bold text-xs text-gray-900">UPSC Candidate</h3>
                  <p className="text-[11px] text-gray-500">Roll No: 08492026</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 bg-white p-2.5 rounded border border-gray-300">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-600 rounded-sm"></span> Answered</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-600 rounded-sm"></span> Not Answered</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-purple-600 rounded-sm"></span> Marked Review</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-gray-300 rounded-sm"></span> Not Visited</div>
              </div>

              <h4 className="font-bold text-xs text-gray-700 mb-2 uppercase tracking-wide">Question Palette</h4>
              <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto p-1">
                {questions.map((_, idx) => {
                  const isAns = userAnswers[idx] !== undefined;
                  const isMfr = markedForReview[idx];
                  const isVis = visited[idx];
                  const isCurr = idx === currentQIndex;

                  let statusBg = 'bg-gray-200 text-gray-700 border-gray-300';
                  if (isMfr) statusBg = 'bg-purple-600 text-white border-purple-700';
                  else if (isAns) statusBg = 'bg-green-600 text-white border-green-700';
                  else if (isVis) statusBg = 'bg-red-500 text-white border-red-600';

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-9 rounded text-xs font-bold border transition ${statusBg} ${
                        isCurr ? 'ring-2 ring-blue-500 ring-offset-1 scale-105' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post-Exam Calibration Report Screen */}
      {activeTab === 'report' && (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto max-w-6xl mx-auto w-full">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">UPSC Candidate Calibration Report</span>
                <h2 className="text-2xl font-black text-white mt-1">{paperTitle} Result</h2>
              </div>
              <div className={`px-5 py-2 rounded-xl text-sm font-bold border ${
                analysis.isPassed ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}>
                {analysis.isPassed ? '🎉 QUALIFIED FOR SSB INTERVIEW' : '⚠️ BELOW CUTOFF MARKS'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Your Score</span>
                <p className="text-3xl font-black text-amber-400 mt-1">{analysis.score} <span className="text-xs text-slate-500">/ {analysis.maxMarks}</span></p>
                <p className="text-[11px] text-slate-400 mt-1">Cutoff: {analysis.targetCutoff} Marks</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Predicted AIR Rank</span>
                <p className="text-3xl font-black text-blue-400 mt-1">#{analysis.airRank}</p>
                <p className="text-[11px] text-slate-400 mt-1">Percentile: {analysis.percentile}%</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Accuracy Rate</span>
                <p className="text-3xl font-black text-emerald-400 mt-1">{analysis.accuracy}%</p>
                <p className="text-[11px] text-slate-400 mt-1">{analysis.correctCount} Correct / {analysis.incorrectCount} Wrong</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Attempt Ratio</span>
                <p className="text-3xl font-black text-purple-400 mt-1">{questions.length - analysis.unattemptedCount} <span className="text-xs text-slate-500">/ {questions.length}</span></p>
                <p className="text-[11px] text-slate-400 mt-1">{analysis.unattemptedCount} Unattempted</p>
              </div>
            </div>

            {/* Complete Question-by-Question Solutions & Answer Key */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Complete Question-by-Question Solutions & UPSC Analysis
                </h3>
                <span className="text-xs text-slate-400">
                  {analysis.correctCount} Correct • {analysis.incorrectCount} Incorrect • {analysis.unattemptedCount} Unattempted
                </span>
              </div>

              <div className="space-y-4 max-h-[550px] overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  const userAns = userAnswers[idx];
                  const isUserCorrect = userAns !== undefined && userAns === q.correctOptionIndex;
                  const userAnsDisplay = userAns !== undefined ? `Option ${String.fromCharCode(65 + userAns)}` : 'Unattempted';
                  const correctAnsDisplay = `Option ${String.fromCharCode(65 + q.correctOptionIndex)} (${q.options[q.correctOptionIndex]})`;

                  return (
                    <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400">Q{idx + 1}.</span>
                          <span className="font-bold text-slate-200">{q.topicName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                            userAnsDisplay === 'Unattempted' ? 'bg-slate-800 text-slate-400' :
                            isUserCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            Your Ans: {userAnsDisplay}
                          </span>
                          <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-500/20 text-emerald-300">
                            Correct: {correctAnsDisplay}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                        {q.questionText}
                      </p>

                      <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3.5 space-y-1.5">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                          UPSC Analysis & Solution:
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button onClick={onClose} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700">
                Close CBT Window & Return to Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
