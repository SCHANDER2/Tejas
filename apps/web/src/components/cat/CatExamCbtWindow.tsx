'use client';

import React, { useState, useEffect } from 'react';
import { CatQuestion, CatPyqPaper, CatModelPaper } from '../../data/catData';
import { Clock, CheckCircle, XCircle, Award, Shield, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

interface CatExamCbtWindowProps {
  paperTitle: string;
  paperYearOrType: string;
  questions: CatQuestion[];
  onClose: () => void;
  rawPaperObj?: CatPyqPaper | CatModelPaper;
}

export default function CatExamCbtWindow({
  paperTitle,
  paperYearOrType,
  questions,
  onClose,
  rawPaperObj
}: CatExamCbtWindowProps) {
  const [activeTab, setActiveTab] = useState<'exam' | 'report'>('exam');
  const [activeSection, setActiveSection] = useState<'varc' | 'dilr' | 'qa'>('varc');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [titaAnswers, setTitaAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });

  // Sectional Timers: 40 mins each
  const [sectionTimeLeft, setSectionTimeLeft] = useState<number>(40 * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setVisited(prev => ({ ...prev, [currentQIndex]: true }));
  }, [currentQIndex]);

  // Sectional Timer Countdown & Auto-Advancing Lock
  useEffect(() => {
    if (isSubmitted || activeTab !== 'exam') return;
    const timer = setInterval(() => {
      setSectionTimeLeft(prev => {
        if (prev <= 1) {
          // Auto advance to next section
          if (activeSection === 'varc') {
            setActiveSection('dilr');
            setCurrentQIndex(24);
            return 40 * 60;
          } else if (activeSection === 'dilr') {
            setActiveSection('qa');
            setCurrentQIndex(44);
            return 40 * 60;
          } else {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, activeTab, activeSection]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setMcqAnswers(prev => ({ ...prev, [currentQIndex]: optIdx }));
  };

  const handleTitaChange = (val: string) => {
    if (isSubmitted) return;
    setTitaAnswers(prev => ({ ...prev, [currentQIndex]: val }));
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
      if (q.type === 'MCQ') {
        const userAns = mcqAnswers[idx];
        if (userAns === undefined) unattemptedCount++;
        else if (userAns === q.correctOptionIndex) { correctCount++; score += 3; }
        else { incorrectCount++; score -= 1; }
      } else {
        const userVal = titaAnswers[idx];
        if (!userVal || userVal === '') unattemptedCount++;
        else if (userVal === q.correctTitaValue) { correctCount++; score += 3; }
        else { incorrectCount++; } // No negative for TITA
      }
    });

    const isQualified = score >= 85;
    const accuracy = (correctCount + incorrectCount) > 0 ? (correctCount / (correctCount + incorrectCount)) * 100 : 0;
    const percentile = Math.min(99.99, Math.max(15, (score / 198) * 100 * 1.55));
    const airRank = Math.max(1, Math.floor(320000 * (1 - percentile / 100)));

    let iimVerdict = "IIM Ahmedabad / Bangalore / Calcutta Call Expected";
    if (score < 60) iimVerdict = "New IIMs & Top Non-IIM B-Schools (FMS, XLRI, MDI)";
    else if (score < 40) iimVerdict = "Tier-2 B-Schools (TAPMI, FORE, IMT)";

    return { score, maxMarks: 198, correctCount, incorrectCount, unattemptedCount, isQualified, accuracy: accuracy.toFixed(1), percentile: percentile.toFixed(2), airRank, iimVerdict };
  };

  const analysis = calculateAnalysis();
  const currentQ = questions[currentQIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Official CAT Top Bar */}
      <div className="bg-[#003366] text-white px-6 py-3 border-b border-purple-500 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 text-white font-black px-2 py-0.5 rounded text-xs">CAT 2026</div>
          <div>
            <h1 className="font-bold text-base leading-tight tracking-wide">COMMON ADMISSION TEST (CAT) — STRICT CBT WINDOW</h1>
            <p className="text-xs text-blue-200">{paperTitle} • {paperYearOrType}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-slate-900/90 border border-purple-500/60 px-4 py-1 rounded flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-300">Section Lock:</span>
            <span className="font-mono font-bold text-base text-purple-400">{formatTime(sectionTimeLeft)}</span>
          </div>

          <button onClick={onClose} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs">
            Exit Test
          </button>
        </div>
      </div>

      {/* Section Switcher Tabs (Locked per section timer) */}
      <div className="bg-slate-800 px-6 py-2 border-b border-slate-700 flex items-center gap-4 text-xs font-bold">
        <div className={`px-4 py-1.5 rounded flex items-center gap-2 ${activeSection === 'varc' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'}`}>
          VARC (24 Qs) {activeSection !== 'varc' && <Lock className="w-3 h-3" />}
        </div>
        <div className={`px-4 py-1.5 rounded flex items-center gap-2 ${activeSection === 'dilr' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'}`}>
          DILR (20 Qs) {activeSection !== 'dilr' && <Lock className="w-3 h-3" />}
        </div>
        <div className={`px-4 py-1.5 rounded flex items-center gap-2 ${activeSection === 'qa' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'}`}>
          QA (22 Qs) {activeSection !== 'qa' && <Lock className="w-3 h-3" />}
        </div>
      </div>

      {/* Workspace */}
      {activeTab === 'exam' && currentQ && (
        <div className="flex-1 flex overflow-hidden bg-gray-100 text-black">
          <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <span className="bg-purple-900 text-white px-3 py-1 rounded text-xs font-bold uppercase">
                  Question No. {currentQIndex + 1} of 66 [{currentQ.type}]
                </span>
                <span className="text-xs text-gray-600 font-bold">{currentQ.sectionName} (+3 / -1 for MCQ, +3 / 0 for TITA)</span>
              </div>

              <div className="text-base font-semibold text-gray-900 mb-6 leading-relaxed whitespace-pre-line">
                {currentQ.questionText}
              </div>

              {currentQ.type === 'MCQ' && currentQ.options ? (
                <div className="space-y-3 max-w-3xl">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = mcqAnswers[currentQIndex] === optIdx;
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
              ) : (
                /* TITA Input */
                <div className="max-w-md bg-gray-50 p-6 rounded-xl border border-gray-300 space-y-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase">Type In The Answer (TITA):</label>
                  <input
                    type="text"
                    value={titaAnswers[currentQIndex] || ''}
                    onChange={(e) => handleTitaChange(e.target.value)}
                    placeholder="Enter answer string or number..."
                    className="w-full border-2 border-purple-600 px-4 py-3 rounded-lg font-mono font-bold text-xl text-purple-900 bg-white"
                  />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="pt-6 border-t border-gray-200 flex items-center justify-between mt-6 bg-white">
              <button
                onClick={() => setMarkedForReview(prev => ({ ...prev, [currentQIndex]: !prev[currentQIndex] }))}
                className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-300 rounded text-xs font-bold"
              >
                {markedForReview[currentQIndex] ? '🟣 Marked Review' : '🟪 Mark Review & Next'}
              </button>

              <div className="flex items-center gap-3">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-xs font-bold border border-gray-300"
                >
                  <ChevronLeft className="w-4 h-4 inline" /> Prev
                </button>

                <button
                  onClick={() => currentQIndex < questions.length - 1 && setCurrentQIndex(prev => prev + 1)}
                  className="px-5 py-2 bg-green-600 text-white rounded text-xs font-bold shadow"
                >
                  🟩 Save & Next <ChevronRight className="w-4 h-4 inline" />
                </button>

                <button
                  onClick={handleSubmitExam}
                  className="ml-4 px-5 py-2 bg-purple-900 text-white rounded text-xs font-bold shadow"
                >
                  Submit CAT Test
                </button>
              </div>
            </div>
          </div>

          {/* Question Palette */}
          <div className="w-80 bg-gray-50 border-l border-gray-300 p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <h4 className="font-bold text-xs text-gray-700 mb-2 uppercase">Question Palette ({activeSection.toUpperCase()})</h4>
              <div className="grid grid-cols-5 gap-2 max-h-[500px] overflow-y-auto p-1">
                {questions.map((_, idx) => {
                  const q = questions[idx];
                  if (q.sectionId !== activeSection) return null;
                  const isAns = q.type === 'MCQ' ? mcqAnswers[idx] !== undefined : (titaAnswers[idx] && titaAnswers[idx] !== '');
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
                        isCurr ? 'ring-2 ring-purple-500 ring-offset-1 scale-105' : ''
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
                <span className="text-xs font-bold text-purple-400 uppercase">IIM CAT Scorecard & Percentile Predictor</span>
                <h2 className="text-2xl font-black text-white mt-1">{paperTitle} Result</h2>
              </div>
              <div className={`px-5 py-2 rounded-xl text-sm font-bold border ${
                analysis.isQualified ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}>
                {analysis.percentile}% PERCENTILE (Predicted)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">CAT Score</span>
                <p className="text-3xl font-black text-purple-400 mt-1">{analysis.score} <span className="text-xs text-slate-500">/ 198</span></p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Predicted CAT Percentile</span>
                <p className="text-3xl font-black text-blue-400 mt-1">{analysis.percentile}%</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Predicted AIR Rank</span>
                <p className="text-3xl font-black text-emerald-400 mt-1">#{analysis.airRank}</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Accuracy</span>
                <p className="text-3xl font-black text-amber-400 mt-1">{analysis.accuracy}%</p>
              </div>
            </div>

            <div className="p-4 bg-purple-950/60 border border-purple-500/40 rounded-xl mb-6 text-center">
              <span className="text-xs text-purple-400 font-bold uppercase">B-School Selection Verdict</span>
              <h4 className="text-lg font-bold text-white mt-1">{analysis.iimVerdict}</h4>
            </div>

            {/* Complete Question-by-Question Solutions & Answer Key */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" /> Complete Question-by-Question Solutions & DILR / Quant Explanations
                </h3>
                <span className="text-xs text-slate-400">
                  {analysis.correctCount} Correct • {analysis.incorrectCount} Incorrect • {analysis.unattemptedCount} Unattempted
                </span>
              </div>

              <div className="space-y-4 max-h-[550px] overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  let isUserCorrect = false;
                  let userAnsDisplay = 'Unattempted';

                  if (q.type === 'MCQ') {
                    const ans = mcqAnswers[idx];
                    if (ans !== undefined) {
                      userAnsDisplay = `Option ${String.fromCharCode(65 + ans)}`;
                      isUserCorrect = ans === q.correctOptionIndex;
                    }
                  } else {
                    const str = titaAnswers[idx];
                    if (str && str !== '') {
                      userAnsDisplay = str;
                      isUserCorrect = str.trim().toLowerCase() === (q.correctTitaValue || '').trim().toLowerCase();
                    }
                  }

                  const correctAnsDisplay = q.type === 'TITA' 
                    ? String(q.correctTitaValue) 
                    : `Option ${String.fromCharCode(65 + (q.correctOptionIndex || 0))} (${q.options ? q.options[q.correctOptionIndex || 0] : ''})`;

                  return (
                    <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-purple-400">Q{idx + 1}.</span>
                          <span className="font-bold text-slate-200">{q.sectionName} [{q.type}]</span>
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

                      <div className="bg-slate-900/90 border border-purple-500/20 rounded-xl p-3.5 space-y-1.5">
                        <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
                          DILR / Quant / VARC Solution & Logic:
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
