'use client';

import React, { useState, useEffect } from 'react';
import { JeeQuestion, JeePyqPaper, JeeModelPaper } from '../../data/jeeMainsData';
import { Clock, CheckCircle, XCircle, Award, Shield, ChevronLeft, ChevronRight, Calculator, FileText, Check, Download } from 'lucide-react';
import { exportUniversalExamPaperToPdf } from '../../utils/pdfExporter';

interface JeeMainsExamCbtWindowProps {
  paperTitle: string;
  paperYearOrType: string;
  questions: JeeQuestion[];
  onClose: () => void;
  rawPaperObj?: JeePyqPaper | JeeModelPaper;
}

export default function JeeMainsExamCbtWindow({
  paperTitle,
  paperYearOrType,
  questions,
  onClose,
  rawPaperObj
}: JeeMainsExamCbtWindowProps) {
  const [activeTab, setActiveTab] = useState<'exam' | 'report'>('exam');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [numAnswers, setNumAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [timeLeft, setTimeLeft] = useState<number>(180 * 60); // 3 Hours
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
    setMcqAnswers(prev => ({ ...prev, [currentQIndex]: optIdx }));
  };

  const handleNumKeyPress = (char: string) => {
    if (isSubmitted) return;
    setNumAnswers(prev => {
      const curr = prev[currentQIndex] || '';
      if (char === 'CLEAR') return { ...prev, [currentQIndex]: '' };
      if (char === 'BACKSPACE') return { ...prev, [currentQIndex]: curr.slice(0, -1) };
      if (curr.length >= 8) return prev;
      return { ...prev, [currentQIndex]: curr + char };
    });
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({ ...prev, [currentQIndex]: !prev[currentQIndex] }));
  };

  const handleSaveAndNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
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
      if (q.questionType === 'MCQ') {
        const userAns = mcqAnswers[idx];
        if (userAns === undefined) unattemptedCount++;
        else if (userAns === q.correctOptionIndex) { correctCount++; score += 4; }
        else { incorrectCount++; score -= 1; }
      } else {
        const userValStr = numAnswers[idx];
        if (!userValStr || userValStr === '') unattemptedCount++;
        else {
          const userVal = parseFloat(userValStr);
          const expected = q.correctNumericalValue || 0;
          const tol = q.numericalTolerance || 0.1;
          if (Math.abs(userVal - expected) <= tol) { correctCount++; score += 4; }
          else { incorrectCount++; score -= 1; }
        }
      }
    });

    const isQualified = score >= 95;
    const accuracy = (correctCount + incorrectCount) > 0 ? (correctCount / (correctCount + incorrectCount)) * 100 : 0;
    const percentile = Math.min(99.99, Math.max(5, (score / 300) * 100 * 1.6));
    const airRank = Math.max(1, Math.floor(1200000 * (1 - percentile / 100)));

    return { score, maxMarks: 300, correctCount, incorrectCount, unattemptedCount, isQualified, accuracy: accuracy.toFixed(1), percentile: percentile.toFixed(2), airRank };
  };

  const analysis = calculateAnalysis();
  const currentQ = questions[currentQIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Official NTA Blue Top Header */}
      <div className="bg-[#003366] text-white px-6 py-3 border-b border-amber-500 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="bg-white text-blue-900 px-2 py-0.5 rounded font-black text-xs">NTA</div>
          <div>
            <h1 className="font-bold text-base leading-tight tracking-wide">JOINT ENTRANCE EXAMINATION (JEE MAIN) — CBT TEST WINDOW</h1>
            <p className="text-xs text-blue-200">{paperTitle} • {paperYearOrType}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-slate-900/90 border border-amber-500/60 px-4 py-1 rounded flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs text-slate-300">Time Left:</span>
            <span className="font-mono font-bold text-base text-amber-400">{formatTime(timeLeft)}</span>
          </div>

          <button onClick={onClose} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs">
            Exit Test
          </button>
        </div>
      </div>

      {/* Main CBT Workspace Layout */}
      {activeTab === 'exam' && currentQ && (
        <div className="flex-1 flex overflow-hidden bg-gray-100 text-black">
          {/* Question Workspace */}
          <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <span className="bg-blue-900 text-white px-3 py-1 rounded text-xs font-bold uppercase">
                  Question No. {currentQIndex + 1} of 75 [{currentQ.questionType}]
                </span>
                <span className="text-xs text-gray-600 font-bold">Section: {currentQ.topicName} (+4 / -1 Marks)</span>
              </div>

              <div className="text-base font-semibold text-gray-900 mb-6 leading-relaxed whitespace-pre-line">
                {currentQ.questionText}
              </div>

              {/* MCQ Options vs Numerical Input */}
              {currentQ.questionType === 'MCQ' && currentQ.options ? (
                <div className="space-y-3 max-w-3xl">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = mcqAnswers[currentQIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left px-5 py-3 rounded-lg border-2 text-sm font-medium transition flex items-center gap-3 ${
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
              ) : (
                /* NTA Numerical Keypad Input */
                <div className="max-w-md bg-gray-50 p-6 rounded-xl border border-gray-300 space-y-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Enter Numerical Value Answer:</label>
                  <div className="bg-white border-2 border-blue-600 px-4 py-3 rounded-lg font-mono font-bold text-2xl text-blue-900 min-h-[50px] flex items-center">
                    {numAnswers[currentQIndex] || <span className="text-gray-300">Type value...</span>}
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {['7', '8', '9', 'BACKSPACE', '4', '5', '6', 'CLEAR', '1', '2', '3', '-', '0', '.'].map((keyVal) => (
                      <button
                        key={keyVal}
                        onClick={() => handleNumKeyPress(keyVal)}
                        className={`py-3 rounded font-bold text-sm transition border ${
                          keyVal === 'CLEAR' ? 'col-span-1 bg-red-100 text-red-700 border-red-300 hover:bg-red-200' :
                          keyVal === 'BACKSPACE' ? 'col-span-1 bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200' :
                          'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 shadow-sm'
                        }`}
                      >
                        {keyVal === 'BACKSPACE' ? '⌫' : keyVal}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="pt-6 border-t border-gray-200 flex items-center justify-between mt-6 bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMarkForReview}
                  className={`px-4 py-2 rounded text-xs font-bold border ${
                    markedForReview[currentQIndex] ? 'bg-purple-700 text-white border-purple-800' : 'bg-purple-50 text-purple-700 border-purple-300'
                  }`}
                >
                  {markedForReview[currentQIndex] ? '🟣 Marked Review' : '🟪 Mark Review & Next'}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-xs font-bold border border-gray-300"
                >
                  <ChevronLeft className="w-4 h-4 inline" /> Prev
                </button>

                <button
                  onClick={handleSaveAndNext}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold shadow"
                >
                  🟩 Save & Next <ChevronRight className="w-4 h-4 inline" />
                </button>

                <button
                  onClick={handleSubmitExam}
                  className="ml-4 px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded text-xs font-bold shadow"
                >
                  Submit JEE Main Test
                </button>
              </div>
            </div>
          </div>

          {/* Question Palette */}
          <div className="w-80 bg-gray-50 border-l border-gray-300 p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <h4 className="font-bold text-xs text-gray-700 mb-2 uppercase">Question Palette</h4>
              <div className="grid grid-cols-5 gap-2 max-h-[500px] overflow-y-auto p-1">
                {questions.map((_, idx) => {
                  const isAns = questions[idx].questionType === 'MCQ' ? mcqAnswers[idx] !== undefined : (numAnswers[idx] && numAnswers[idx] !== '');
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

      {/* Report Screen */}
      {activeTab === 'report' && (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto max-w-6xl mx-auto w-full">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase">NTA JEE Main Performance Analysis</span>
                <h2 className="text-2xl font-black text-white mt-1">{paperTitle} Result</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => exportUniversalExamPaperToPdf('jee_mains', paperTitle, paperYearOrType, questions)}
                  className="px-4 py-2 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Export Official 3-Part PDF
                </button>
                <div className={`px-5 py-2 rounded-xl text-sm font-bold border ${
                  analysis.isQualified ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'
                }`}>
                  {analysis.isQualified ? '🎉 QUALIFIED FOR JEE ADVANCED' : '⚠️ BELOW JEE ADVANCED CUTOFF'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">NTA Score</span>
                <p className="text-3xl font-black text-amber-400 mt-1">{analysis.score} <span className="text-xs text-slate-500">/ 300</span></p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Predicted NTA Percentile</span>
                <p className="text-3xl font-black text-blue-400 mt-1">{analysis.percentile}%</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Predicted AIR Rank</span>
                <p className="text-3xl font-black text-emerald-400 mt-1">#{analysis.airRank}</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Accuracy</span>
                <p className="text-3xl font-black text-purple-400 mt-1">{analysis.accuracy}%</p>
              </div>
            </div>

            {/* Complete Question-by-Question Solutions & Answer Key */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Complete Question-by-Question Solutions & Answer Key
                </h3>
                <span className="text-xs text-slate-400">
                  {analysis.correctCount} Correct • {analysis.incorrectCount} Incorrect • {analysis.unattemptedCount} Unattempted
                </span>
              </div>

              <div className="space-y-4 max-h-[550px] overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  let isUserCorrect = false;
                  let userAnsDisplay = 'Unattempted';

                  if (q.questionType === 'MCQ') {
                    const ans = mcqAnswers[idx];
                    if (ans !== undefined) {
                      userAnsDisplay = `Option ${String.fromCharCode(65 + ans)}`;
                      isUserCorrect = ans === q.correctOptionIndex;
                    }
                  } else {
                    const str = numAnswers[idx];
                    if (str && str !== '') {
                      userAnsDisplay = str;
                      const val = parseFloat(str);
                      const exp = q.correctNumericalValue || 0;
                      const tol = q.numericalTolerance || 0.1;
                      isUserCorrect = Math.abs(val - exp) <= tol;
                    }
                  }

                  const correctAnsDisplay = q.questionType === 'NUMERICAL' 
                    ? String(q.correctNumericalValue) 
                    : `Option ${String.fromCharCode(65 + (q.correctOptionIndex || 0))} (${q.options ? q.options[q.correctOptionIndex || 0] : ''})`;

                  return (
                    <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400">Q{idx + 1}.</span>
                          <span className="font-bold text-slate-200">{q.topicName} [{q.questionType}]</span>
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

                      <div className="bg-slate-900/90 border border-blue-500/20 rounded-xl p-3.5 space-y-1.5">
                        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                          Step-by-Step Physics/Chemistry/Maths Solution:
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
