'use client';

import React, { useState, useEffect } from 'react';
import { GateQuestion, GatePyqPaper, GateModelPaper } from '../../data/gateData';
import { Clock, CheckCircle, XCircle, Award, Shield, ChevronLeft, ChevronRight, Calculator as CalcIcon, X, HelpCircle, FileText, Check, AlertCircle, Download } from 'lucide-react';
import { exportUniversalExamPaperToPdf } from '../../utils/pdfExporter';

interface GateExamCbtWindowProps {
  paperTitle: string;
  paperYearOrType: string;
  questions: GateQuestion[];
  onClose: () => void;
  rawPaperObj?: GatePyqPaper | GateModelPaper;
}

export default function GateExamCbtWindow({
  paperTitle,
  paperYearOrType,
  questions,
  onClose,
  rawPaperObj
}: GateExamCbtWindowProps) {
  const [activeTab, setActiveTab] = useState<'exam' | 'report'>('exam');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedSection, setSelectedSection] = useState<'all' | 'ga' | 'tech'>('all');
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number[]>>({});
  const [natAnswers, setNatAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [timeLeft, setTimeLeft] = useState<number>(180 * 60); // 3 Hours (180 mins)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showCalcModal, setShowCalcModal] = useState<boolean>(false);

  // Virtual Calculator State
  const [calcDisplay, setCalcDisplay] = useState<string>('0');

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

  const handleMsqToggle = (optIdx: number) => {
    if (isSubmitted) return;
    const q = questions[currentQIndex];
    if (q.type === 'MCQ') {
      setMcqAnswers(prev => ({ ...prev, [currentQIndex]: [optIdx] }));
    } else if (q.type === 'MSQ') {
      setMcqAnswers(prev => {
        const curr = prev[currentQIndex] || [];
        if (curr.includes(optIdx)) {
          return { ...prev, [currentQIndex]: curr.filter(i => i !== optIdx) };
        } else {
          return { ...prev, [currentQIndex]: [...curr, optIdx] };
        }
      });
    }
  };

  const handleNatKeyPress = (char: string) => {
    if (isSubmitted) return;
    setNatAnswers(prev => {
      const curr = prev[currentQIndex] || '';
      if (char === 'CLEAR') return { ...prev, [currentQIndex]: '' };
      if (char === 'BACKSPACE') return { ...prev, [currentQIndex]: curr.slice(0, -1) };
      if (curr.length >= 8) return prev;
      return { ...prev, [currentQIndex]: curr + char };
    });
  };

  const handleCalcPress = (btn: string) => {
    try {
      if (btn === 'C') { setCalcDisplay('0'); return; }
      if (btn === '=') {
        const res = eval(calcDisplay.replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/ln/g, 'Math.log').replace(/sqrt/g, 'Math.sqrt').replace(/pi/g, 'Math.PI'));
        setCalcDisplay(String(res));
        return;
      }
      if (calcDisplay === '0') setCalcDisplay(btn);
      else setCalcDisplay(prev => prev + btn);
    } catch (e) {
      setCalcDisplay('Error');
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
      const m = q.marks;
      if (q.type === 'MCQ') {
        const ans = mcqAnswers[idx];
        if (!ans || ans.length === 0) unattemptedCount++;
        else if (ans[0] === (q.correctOptionIndices ? q.correctOptionIndices[0] : 0)) { correctCount++; score += m; }
        else { incorrectCount++; score -= (m === 1 ? 0.333 : 0.666); }
      } else if (q.type === 'MSQ') {
        const ans = (mcqAnswers[idx] || []).sort();
        const expected = (q.correctOptionIndices || []).sort();
        if (ans.length === 0) unattemptedCount++;
        else if (JSON.stringify(ans) === JSON.stringify(expected)) { correctCount++; score += m; }
        else { incorrectCount++; } // No negative for MSQ
      } else if (q.type === 'NAT') {
        const str = natAnswers[idx];
        if (!str || str === '') unattemptedCount++;
        else {
          const val = parseFloat(str);
          const exp = q.correctNatValue || 0;
          const tol = q.natTolerance || 0.1;
          if (Math.abs(val - exp) <= tol) { correctCount++; score += m; }
          else { incorrectCount++; } // No negative for NAT
        }
      }
    });

    const isQualified = score >= 32.5;
    const accuracy = (correctCount + incorrectCount) > 0 ? (correctCount / (correctCount + incorrectCount)) * 100 : 0;
    const gateScore = Math.min(1000, Math.max(100, Math.floor(score * 10)));
    const airRank = Math.max(1, Math.floor(140000 * Math.max(0.001, 1 - score / 100)));

    return { score: score.toFixed(2), maxMarks: 100, correctCount, incorrectCount, unattemptedCount, isQualified, accuracy: accuracy.toFixed(1), gateScore, airRank };
  };

  const analysis = calculateAnalysis();
  const currentQ = questions[currentQIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Official GATE TCS iON Top Bar */}
      <div className="bg-[#003366] text-white px-6 py-3 border-b border-[#faa114] flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-black px-2 py-0.5 rounded font-black text-xs">GATE 2026</div>
          <div>
            <h1 className="font-bold text-base leading-tight tracking-wide">GRADUATE APTITUDE TEST IN ENGINEERING — CBT WINDOW</h1>
            <p className="text-xs text-blue-200">{paperTitle} • {paperYearOrType}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCalcModal(prev => !prev)}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded flex items-center gap-1.5 shadow"
          >
            <CalcIcon className="w-4 h-4" /> Virtual Calculator
          </button>

          {activeTab === 'exam' && (
            <div className="bg-slate-900/90 border border-amber-500/60 px-4 py-1 rounded flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs text-slate-300">Time Left:</span>
              <span className="font-mono font-bold text-base text-amber-400">{formatTime(timeLeft)}</span>
            </div>
          )}

          <button onClick={onClose} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs">
            Exit Test
          </button>
        </div>
      </div>

      {/* Scientific Calculator Modal Overlay */}
      {showCalcModal && (
        <div className="absolute top-16 right-10 z-50 w-80 bg-slate-800 border-2 border-amber-500 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1"><CalcIcon className="w-4 h-4" /> GATE Virtual Calculator</span>
            <button onClick={() => setShowCalcModal(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="bg-slate-900 p-3 rounded font-mono text-right text-xl font-bold text-emerald-400 border border-slate-700 mb-3 overflow-x-auto min-h-[40px]">
            {calcDisplay}
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
            {['sin', 'cos', 'tan', 'C', 'sqrt', 'ln', 'log', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'pi', '='].map(b => (
              <button
                key={b}
                onClick={() => handleCalcPress(b)}
                className={`py-2 rounded transition ${
                  b === 'C' ? 'bg-red-600 text-white' :
                  b === '=' ? 'bg-amber-500 text-black' :
                  'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section Filter Bar during Exam */}
      {activeTab === 'exam' && (
        <div className="bg-slate-800 px-6 py-2 border-b border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">SECTIONS:</span>
            <button
              onClick={() => setCurrentQIndex(0)}
              className={`px-3 py-1 rounded font-bold transition ${
                currentQIndex < 10 ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
              }`}
            >
              General Aptitude (Q1 - Q10 • 15M)
            </button>
            <button
              onClick={() => setCurrentQIndex(10)}
              className={`px-3 py-1 rounded font-bold transition ${
                currentQIndex >= 10 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              Technical Core Subject (Q11 - Q65 • 85M)
            </button>
          </div>

          <span className="text-slate-400">Total Marks: <strong>100</strong> • Negative Marking: <strong>Yes (MCQ only)</strong></span>
        </div>
      )}

      {/* Main Exam Interface */}
      {activeTab === 'exam' && currentQ && (
        <div className="flex-1 flex overflow-hidden bg-gray-100 text-black">
          <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <span className="bg-[#003366] text-white px-3 py-1 rounded text-xs font-bold uppercase">
                  Question No. {currentQIndex + 1} of 65 [{currentQ.type}]
                </span>
                <span className="text-xs text-gray-600 font-bold">
                  {currentQ.topicName} ({currentQ.marks} Mark{currentQ.marks > 1 ? 's' : ''})
                </span>
              </div>

              <div className="text-base font-semibold text-gray-900 mb-6 leading-relaxed whitespace-pre-line">
                {currentQ.questionText}
              </div>

              {/* MCQ & MSQ Options */}
              {(currentQ.type === 'MCQ' || currentQ.type === 'MSQ') && currentQ.options && (
                <div className="space-y-3 max-w-3xl">
                  {currentQ.options.map((opt, optIdx) => {
                    const selectedList = mcqAnswers[currentQIndex] || [];
                    const isSelected = selectedList.includes(optIdx);
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleMsqToggle(optIdx)}
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
              )}

              {/* NAT Input */}
              {currentQ.type === 'NAT' && (
                <div className="max-w-md bg-gray-50 p-6 rounded-xl border border-gray-300 space-y-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase">Enter Decimal Answer:</label>
                  <div className="bg-white border-2 border-[#003366] px-4 py-3 rounded-lg font-mono font-bold text-2xl text-blue-900 min-h-[50px] flex items-center">
                    {natAnswers[currentQIndex] || <span className="text-gray-300">Type value...</span>}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['7', '8', '9', 'BACKSPACE', '4', '5', '6', 'CLEAR', '1', '2', '3', '-', '0', '.'].map((keyVal) => (
                      <button
                        key={keyVal}
                        onClick={() => handleNatKeyPress(keyVal)}
                        className="py-3 rounded font-bold text-sm bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 shadow-sm"
                      >
                        {keyVal === 'BACKSPACE' ? '⌫' : keyVal}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Exam Controls */}
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
                  className="ml-4 px-6 py-2 bg-[#003366] hover:bg-blue-900 text-white rounded text-xs font-bold shadow"
                >
                  Submit GATE Test
                </button>
              </div>
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className="w-80 bg-gray-50 border-l border-gray-300 p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <h4 className="font-bold text-xs text-gray-700 mb-2 uppercase">Question Palette</h4>
              
              {/* Legend */}
              <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-600 mb-3 pb-2 border-b">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-600 rounded"></span> Answered</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-600 rounded"></span> Marked Review</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded"></span> Not Answered</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-200 rounded"></span> Not Visited</span>
              </div>

              <div className="grid grid-cols-5 gap-2 max-h-[480px] overflow-y-auto p-1">
                {questions.map((_, idx) => {
                  const q = questions[idx];
                  const isAns = (q.type === 'MCQ' || q.type === 'MSQ') ? (mcqAnswers[idx] && mcqAnswers[idx].length > 0) : (natAnswers[idx] && natAnswers[idx] !== '');
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

      {/* Post-Exam Report Screen with Full 65-Question Step-by-Step Solutions Review */}
      {activeTab === 'report' && (
        <div className="flex-1 bg-slate-950 p-6 sm:p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Official GATE Scorecard Calibration</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">{paperTitle} Result</h2>
                <p className="text-xs text-slate-400 mt-1">{paperYearOrType} • Simulated IISc/IIT Cutoff Calibration</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => exportUniversalExamPaperToPdf('gate', paperTitle, paperYearOrType, questions)}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl text-xs font-black transition flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4" /> Export Official 3-Part PDF
                </button>
                <div className={`px-5 py-2.5 rounded-2xl text-sm font-bold border ${
                  analysis.isQualified ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'
                }`}>
                  {analysis.isQualified ? '🎉 GATE QUALIFIED (PSU SHORTLIST ELIGIBLE)' : '⚠️ BELOW QUALIFYING CUTOFF'}
                </div>
              </div>
            </div>

            {/* Scorecard KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium">Marks Obtained</span>
                <p className="text-3xl font-black text-amber-400 mt-1 font-mono">{analysis.score} <span className="text-xs text-slate-500">/ 100</span></p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium">Normalized GATE Score</span>
                <p className="text-3xl font-black text-blue-400 mt-1 font-mono">{analysis.gateScore} <span className="text-xs text-slate-500">/ 1000</span></p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium">Predicted AIR Rank</span>
                <p className="text-3xl font-black text-emerald-400 mt-1 font-mono">AIR #{analysis.airRank}</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-medium">Accuracy</span>
                <p className="text-3xl font-black text-purple-400 mt-1 font-mono">{analysis.accuracy}%</p>
              </div>
            </div>

            {/* Complete Question-by-Question Step Solutions */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" /> Complete 65-Question Step-by-Step Solutions & Answer Key
                </h3>
                <span className="text-xs text-slate-400">
                  {analysis.correctCount} Correct • {analysis.incorrectCount} Incorrect • {analysis.unattemptedCount} Unattempted
                </span>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  let isUserCorrect = false;
                  let userAnsDisplay = 'Unattempted';

                  if (q.type === 'MCQ') {
                    const ans = mcqAnswers[idx];
                    if (ans && ans.length > 0) {
                      userAnsDisplay = String.fromCharCode(65 + ans[0]);
                      isUserCorrect = ans[0] === (q.correctOptionIndices ? q.correctOptionIndices[0] : 0);
                    }
                  } else if (q.type === 'MSQ') {
                    const ans = (mcqAnswers[idx] || []).sort();
                    const exp = (q.correctOptionIndices || []).sort();
                    if (ans.length > 0) {
                      userAnsDisplay = ans.map(i => String.fromCharCode(65 + i)).join(', ');
                      isUserCorrect = JSON.stringify(ans) === JSON.stringify(exp);
                    }
                  } else if (q.type === 'NAT') {
                    const str = natAnswers[idx];
                    if (str && str !== '') {
                      userAnsDisplay = str;
                      const val = parseFloat(str);
                      const exp = q.correctNatValue || 0;
                      const tol = q.natTolerance || 0.1;
                      isUserCorrect = Math.abs(val - exp) <= tol;
                    }
                  }

                  const correctAnsDisplay = q.type === 'NAT' ? String(q.correctNatValue) : (q.correctOptionIndices || []).map(i => String.fromCharCode(65 + i)).join(', ');

                  return (
                    <div
                      key={q.id}
                      className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400">Q{idx + 1}.</span>
                          <span className="font-bold text-slate-200">{q.topicName} [{q.type} • {q.marks}M]</span>
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

                      <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3.5 space-y-2">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                          Step-by-Step Solution:
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">{q.explanation}</p>
                        {q.stepByStepSolution && (
                          <div className="space-y-1 pt-1">
                            {q.stepByStepSolution.map((st, sIdx) => (
                              <div key={sIdx} className="text-xs text-slate-400 flex items-start gap-1.5">
                                <span className="text-amber-400 font-mono font-bold">{sIdx + 1}.</span>
                                <span>{st}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700"
              >
                Close CBT Window & Return to Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
