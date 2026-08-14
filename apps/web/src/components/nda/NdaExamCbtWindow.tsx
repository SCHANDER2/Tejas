'use client';

import React, { useState, useEffect } from 'react';
import { NdaQuestion, NdaPyqPaper, NdaModelPaper } from '../../data/ndaData';
import { 
  Clock, CheckCircle, XCircle, Award, BarChart2, BookOpen, AlertTriangle, 
  ChevronLeft, ChevronRight, Download, RefreshCw, FileText, Check, Shield, User
} from 'lucide-react';

interface NdaExamCbtWindowProps {
  paperTitle: string;
  paperYearOrType: string;
  questions: NdaQuestion[];
  onClose: () => void;
  rawPaperObj?: NdaPyqPaper | NdaModelPaper;
}

export default function NdaExamCbtWindow({
  paperTitle,
  paperYearOrType,
  questions,
  onClose,
  rawPaperObj
}: NdaExamCbtWindowProps) {
  const [activeTab, setActiveTab] = useState<'exam' | 'report' | 'key' | 'solutions'>('exam');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [timeLeft, setTimeLeft] = useState<number>(300 * 60); // 5 Hours Total
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
        score += q.subjectId === 'maths' ? 2.5 : 4.0;
      } else {
        incorrectCount++;
        score -= q.subjectId === 'maths' ? 0.833 : 1.333;
      }
    });

    const maxMarks = 900;
    const targetCutoff = 360;
    const isPassed = score >= targetCutoff;
    const accuracy = (correctCount + incorrectCount) > 0 ? (correctCount / (correctCount + incorrectCount)) * 100 : 0;
    const percentile = Math.min(99.9, Math.max(10, (score / maxMarks) * 100 * 1.5));
    const airRank = Math.max(12, Math.floor(240000 * (1 - percentile / 100)));

    return { score: score.toFixed(1), maxMarks, correctCount, incorrectCount, unattemptedCount, isPassed, accuracy: accuracy.toFixed(1), percentile: percentile.toFixed(1), airRank, targetCutoff };
  };

  const analysis = calculateAnalysis();
  const currentQ = questions[currentQIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Official Top Bar */}
      <div className="bg-[#003366] text-white px-6 py-3 border-b border-[#faa114]/40 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#faa114]" />
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide text-white">UPSC NATIONAL DEFENCE ACADEMY (NDA & NA) — ONLINE CBT ENGINE</h1>
            <p className="text-xs text-blue-200">{paperTitle} • {paperYearOrType} (270 Qs / 900 Marks)</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-slate-900/80 border border-amber-500/40 px-4 py-1.5 rounded-lg flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#faa114] animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">Time Left:</span>
            <span className="font-mono font-bold text-lg text-amber-400">{formatTime(timeLeft)}</span>
          </div>

          <button onClick={onClose} className="px-4 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded font-medium text-xs transition">
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
                <span className="text-xs text-gray-500 font-semibold">Subject: {currentQ.topicName} ({currentQ.subjectId === 'maths' ? '+2.5 / -0.83 Marks' : '+4.0 / -1.33 Marks'})</span>
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

                <button onClick={handleClearResponse} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-xs font-bold transition border border-gray-400">
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
                  Submit NDA Paper
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Panel */}
          <div className="w-80 bg-gray-50 border-l border-gray-300 flex flex-col justify-between p-4 overflow-y-auto">
            <div>
              <div className="bg-white p-3 rounded border border-gray-300 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                  NDA
                </div>
                <div>
                  <h3 className="font-bold text-xs text-gray-900">UPSC NDA Cadet</h3>
                  <p className="text-[11px] text-gray-500">Roll No: 19482026</p>
                </div>
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

      {/* Calibration Report Screen */}
      {activeTab === 'report' && (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto max-w-6xl mx-auto w-full">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">UPSC NDA Candidate Performance Report</span>
                <h2 className="text-2xl font-black text-white mt-1">{paperTitle} Result</h2>
              </div>
              <div className={`px-5 py-2 rounded-xl text-sm font-bold border ${
                analysis.isPassed ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}>
                {analysis.isPassed ? '🎉 QUALIFIED FOR SSB INTERVIEW (3-SERVICES)' : '⚠️ BELOW NDA CUTOFF MARKS'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Your Score</span>
                <p className="text-3xl font-black text-amber-400 mt-1">{analysis.score} <span className="text-xs text-slate-500">/ 900</span></p>
                <p className="text-[11px] text-slate-400 mt-1">Target Cutoff: 360 Marks</p>
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
                <span className="text-xs text-slate-400 font-medium">Attempted</span>
                <p className="text-3xl font-black text-purple-400 mt-1">{questions.length - analysis.unattemptedCount} <span className="text-xs text-slate-500">/ 270</span></p>
              </div>
            </div>

            <button onClick={onClose} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700">
              Back to NDA Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
