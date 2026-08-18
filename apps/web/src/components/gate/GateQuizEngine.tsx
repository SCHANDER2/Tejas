'use client';

import React, { useState, useEffect } from 'react';
import { GateBranchId, GATE_BRANCHES, GATE_BRANCH_SUBJECTS, GateQuestion } from '../../data/gateData';
import { generateQuestionsForGatePaper, generateSubjectQuestions } from '../../data/gatePaperGenerator';
import { Brain, Play, CheckCircle, XCircle, Clock, Award, HelpCircle, ArrowRight, RotateCcw, Bookmark, ChevronLeft, ChevronRight, Calculator, Zap, X } from 'lucide-react';

interface GateQuizEngineProps {
  branchId: GateBranchId;
  onCompleteQuiz?: (result: any) => void;
}

export default function GateQuizEngine({ branchId, onCompleteQuiz }: GateQuizEngineProps) {
  const branch = GATE_BRANCHES.find(b => b.id === branchId) || GATE_BRANCHES[0];
  const subjects = GATE_BRANCH_SUBJECTS[branchId] || GATE_BRANCH_SUBJECTS.cs;

  // Configuration States
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [quizScope, setQuizScope] = useState<'full' | 'subject' | 'topic'>('full');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [timerMode, setTimerMode] = useState<'timed' | 'untimed'>('timed');
  const [instantFeedback, setInstantFeedback] = useState<boolean>(true);

  // Active Quiz Running States
  const [questions, setQuestions] = useState<GateQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number[]>>({});
  const [natAnswers, setNatAnswers] = useState<Record<number, string>>({});
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // Virtual Calculator
  const [showCalc, setShowCalc] = useState<boolean>(false);
  const [calcDisplay, setCalcDisplay] = useState<string>('0');

  // Start Quiz
  const handleStartQuiz = () => {
    let generated: GateQuestion[] = [];
    if (quizScope === 'full') {
      const full = generateQuestionsForGatePaper(`quiz_full_${Date.now()}`, Math.floor(Math.random() * 100), branchId);
      generated = full.slice(0, questionCount);
    } else {
      generated = generateSubjectQuestions(selectedSubjectId || subjects[0].id, questionCount, branchId);
    }

    setQuestions(generated);
    setCurrentIdx(0);
    setMcqAnswers({});
    setNatAnswers({});
    setBookmarked({});
    setShowExplanation(false);
    setIsQuizFinished(false);
    setTimeLeft(timerMode === 'timed' ? questionCount * 120 : 0); // 2 mins per Q
    setIsQuizActive(true);
  };

  // Timer Tick
  useEffect(() => {
    if (!isQuizActive || isQuizFinished || timerMode === 'untimed') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isQuizActive, isQuizFinished, timerMode]);

  const handleFinishQuiz = () => {
    setIsQuizFinished(true);
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

  const handleOptionSelect = (optIdx: number) => {
    if (isQuizFinished) return;
    const q = questions[currentIdx];
    if (q.type === 'MCQ') {
      setMcqAnswers(prev => ({ ...prev, [currentIdx]: [optIdx] }));
    } else if (q.type === 'MSQ') {
      setMcqAnswers(prev => {
        const curr = prev[currentIdx] || [];
        return {
          ...prev,
          [currentIdx]: curr.includes(optIdx) ? curr.filter(i => i !== optIdx) : [...curr, optIdx]
        };
      });
    }
  };

  // Score Calculation
  const calculateScore = () => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    questions.forEach((q, idx) => {
      if (q.type === 'MCQ') {
        const ans = mcqAnswers[idx];
        if (!ans || ans.length === 0) unattempted++;
        else if (ans[0] === (q.correctOptionIndices ? q.correctOptionIndices[0] : 0)) { correct++; score += q.marks; }
        else { incorrect++; score -= (q.marks === 1 ? 0.33 : 0.66); }
      } else if (q.type === 'MSQ') {
        const ans = (mcqAnswers[idx] || []).sort();
        const exp = (q.correctOptionIndices || []).sort();
        if (ans.length === 0) unattempted++;
        else if (JSON.stringify(ans) === JSON.stringify(exp)) { correct++; score += q.marks; }
        else { incorrect++; }
      } else if (q.type === 'NAT') {
        const str = natAnswers[idx];
        if (!str || str === '') unattempted++;
        else {
          const val = parseFloat(str);
          const exp = q.correctNatValue || 0;
          const tol = q.natTolerance || 0.1;
          if (Math.abs(val - exp) <= tol) { correct++; score += q.marks; }
          else { incorrect++; }
        }
      }
    });

    const maxMarks = questions.reduce((acc, q) => acc + q.marks, 0);
    const accuracy = (correct + incorrect) > 0 ? (correct / (correct + incorrect)) * 100 : 0;
    const estGateScore = Math.min(1000, Math.max(100, Math.floor((score / maxMarks) * 1000)));

    return { score: score.toFixed(2), maxMarks, correct, incorrect, unattempted, accuracy: accuracy.toFixed(1), estGateScore };
  };

  const currentQ = questions[currentIdx];
  const results = isQuizFinished ? calculateScore() : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. QUIZ CONFIGURATION SCREEN */}
      {!isQuizActive && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
          <div className="border-b border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Brain className="w-3.5 h-3.5" /> Interactive Practice Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {branch.shortName} Dynamic Quiz & Speed Drill Builder
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Customize topic scope, question count, and timer mode to sharpen weak concepts and master NAT/MSQ patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scope Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">1. Select Quiz Scope</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setQuizScope('full')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 ${
                    quizScope === 'full'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4" /> Full Syllabus
                </button>
                <button
                  onClick={() => setQuizScope('subject')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 ${
                    quizScope === 'subject'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Brain className="w-4 h-4" /> Subject-wise
                </button>
                <button
                  onClick={() => setQuizScope('topic')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 ${
                    quizScope === 'topic'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Zap className="w-4 h-4" /> Topic Drill
                </button>
              </div>
            </div>

            {/* Question Count Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">2. Question Count</label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 65].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCount(cnt)}
                    className={`py-3.5 rounded-2xl border text-xs font-bold transition font-mono ${
                      questionCount === cnt
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {cnt} Qs {cnt === 65 ? '(Full)' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* If Subject or Topic scope */}
          {quizScope !== 'full' && (
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">3. Select Subject</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {subjects.map(sub => {
                  const isSelected = (selectedSubjectId || subjects[0].id) === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubjectId(sub.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-950 border-amber-500 ring-1 ring-amber-500/40 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-xs text-white">{sub.shortName}</h4>
                        <span className="text-[10px] text-slate-500">{sub.topics.length} Modules • {sub.totalMarks} Marks</span>
                      </div>
                      {isSelected && <CheckCircle className="w-4 h-4 text-amber-400" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mode Toggles: Timed / Instant Feedback */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-white block">Strict Exam Timer</span>
                <span className="text-[11px] text-slate-400">2 minutes per question with auto-submit</span>
              </div>
              <button
                onClick={() => setTimerMode(prev => prev === 'timed' ? 'untimed' : 'timed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  timerMode === 'timed' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {timerMode === 'timed' ? 'Timed' : 'Untimed'}
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-white block">Instant Step Explanation</span>
                <span className="text-[11px] text-slate-400">Reveal formula & explanation immediately</span>
              </div>
              <button
                onClick={() => setInstantFeedback(prev => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  instantFeedback ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {instantFeedback ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" /> Start {branch.code} Practice Session ({questionCount} Qs)
          </button>
        </div>
      )}

      {/* 2. ACTIVE QUIZ RUNNING VIEW */}
      {isQuizActive && !isQuizFinished && currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-lg font-black text-xs font-mono">
                Q {currentIdx + 1} / {questions.length}
              </span>
              <span className="text-xs text-slate-300 font-bold hidden sm:inline">
                {currentQ.topicName}
              </span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {currentQ.type} • {currentQ.marks}M
              </span>
            </div>

            <div className="flex items-center gap-3">
              {timerMode === 'timed' && (
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono font-bold text-amber-400">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              )}

              <button
                onClick={() => setShowCalc(prev => !prev)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5" /> Calc
              </button>

              <button
                onClick={() => setBookmarked(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }))}
                className={`p-2 rounded-xl border transition ${
                  bookmarked[currentIdx] ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Calculator Overlay */}
          {showCalc && (
            <div className="absolute top-16 right-6 z-50 w-72 bg-slate-950 border-2 border-amber-500 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400">Virtual Calculator</span>
                <button onClick={() => setShowCalc(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-right text-lg font-bold text-emerald-400 mb-2 overflow-x-auto">
                {calcDisplay}
              </div>
              <div className="grid grid-cols-4 gap-1 text-xs font-bold">
                {['C', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'sqrt', '='].map(b => (
                  <button
                    key={b}
                    onClick={() => handleCalcPress(b)}
                    className={`py-2 rounded ${b === 'C' ? 'bg-red-600 text-white' : b === '=' ? 'bg-amber-500 text-black' : 'bg-slate-800 text-white'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-4">
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed whitespace-pre-line">
              {currentQ.questionText}
            </p>

            {/* Options */}
            {currentQ.options && (
              <div className="space-y-2.5 max-w-3xl">
                {currentQ.options.map((opt, optIdx) => {
                  const selectedList = mcqAnswers[currentIdx] || [];
                  const isSelected = selectedList.includes(optIdx);
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition flex items-center gap-3 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold shadow-md'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
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
              <div className="max-w-md bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase">Enter Decimal Value:</label>
                <div className="bg-slate-900 border-2 border-blue-500 px-4 py-3 rounded-xl font-mono font-bold text-xl text-blue-300 min-h-[45px]">
                  {natAnswers[currentIdx] || <span className="text-slate-600">Enter answer...</span>}
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {['7', '8', '9', 'BACKSPACE', '4', '5', '6', 'CLEAR', '1', '2', '3', '-', '0', '.'].map((k) => (
                    <button
                      key={k}
                      onClick={() => {
                        setNatAnswers(prev => {
                          const c = prev[currentIdx] || '';
                          if (k === 'CLEAR') return { ...prev, [currentIdx]: '' };
                          if (k === 'BACKSPACE') return { ...prev, [currentIdx]: c.slice(0, -1) };
                          return { ...prev, [currentIdx]: c + k };
                        });
                      }}
                      className="py-2.5 rounded-lg bg-slate-900 border border-slate-800 font-bold text-xs text-white hover:bg-slate-800"
                    >
                      {k === 'BACKSPACE' ? '⌫' : k}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Instant Explanation Drawer */}
          {instantFeedback && (
            <div className="pt-2">
              {!showExplanation ? (
                <button
                  onClick={() => setShowExplanation(true)}
                  className="text-xs text-amber-400 font-bold flex items-center gap-1.5 hover:underline"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Reveal Step Explanation & Formula
                </button>
              ) : (
                <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Solution & Concept Derivation
                    </span>
                    {currentQ.formulaUsed && (
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        {currentQ.formulaUsed}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                  {currentQ.stepByStepSolution && (
                    <div className="space-y-1 pt-1">
                      {currentQ.stepByStepSolution.map((s, idx) => (
                        <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                          <span className="text-amber-400 font-mono font-bold">{idx + 1}.</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentIdx === 0}
              onClick={() => {
                setCurrentIdx(prev => Math.max(0, prev - 1));
                setShowExplanation(false);
              }}
              className="px-4 py-2.5 bg-slate-800 text-slate-300 disabled:opacity-40 rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <div className="flex items-center gap-2">
              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => {
                    setCurrentIdx(prev => prev + 1);
                    setShowExplanation(false);
                  }}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  Next Question <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 shadow-lg"
                >
                  Complete Quiz <Award className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. POST-QUIZ RESULTS SCREEN */}
      {isQuizFinished && results && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">GATE Diagnostic Calibration</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Quiz Results & Performance Summary</h2>
            </div>
            <button
              onClick={() => setIsQuizActive(false)}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Start New Practice
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Marks Obtained</span>
              <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 font-mono">{results.score} <span className="text-xs text-slate-500">/ {results.maxMarks}</span></p>
            </div>
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Accuracy</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 font-mono">{results.accuracy}%</p>
            </div>
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Est. GATE Score</span>
              <p className="text-2xl sm:text-3xl font-black text-blue-400 mt-1 font-mono">{results.estGateScore} <span className="text-xs text-slate-500">/ 1000</span></p>
            </div>
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Correct / Incorrect</span>
              <p className="text-2xl sm:text-3xl font-black text-purple-400 mt-1 font-mono">{results.correct} <span className="text-xs text-slate-500">/ {results.incorrect}</span></p>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" /> Complete Question-by-Question Solution Review
            </h3>

            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Q{idx + 1}. {q.topicName} [{q.type} • {q.marks}M]</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      Ans: {q.type === 'NAT' ? q.correctNatValue : (q.correctOptionIndices || []).map(i => String.fromCharCode(65 + i)).join(', ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{q.questionText}</p>
                  <div className="bg-slate-900 p-3 rounded-xl text-xs text-slate-400 space-y-1 border border-slate-800">
                    <span className="text-amber-400 font-bold block">Explanation:</span>
                    <p>{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
