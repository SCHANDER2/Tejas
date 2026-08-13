'use client';

import React, { useState, useEffect } from 'react';
import { AfcatQuestion, AfcatPyqPaper, AfcatModelPaper } from '../../data/afcatData';
import { exportPaperToPdf } from '../../utils/pdfExporter';
import { 
  Clock, CheckCircle, XCircle, Award, BarChart2, BookOpen, AlertTriangle, 
  ChevronLeft, ChevronRight, Download, RefreshCw, FileText, Check, Filter, Zap, User
} from 'lucide-react';

interface AfcatExamCbtWindowProps {
  paperTitle: string;
  paperYearOrType: string;
  questions: AfcatQuestion[];
  targetCutoff?: number;
  onClose: () => void;
  rawPaperObj?: AfcatPyqPaper | AfcatModelPaper;
}

export default function AfcatExamCbtWindow({
  paperTitle,
  paperYearOrType,
  questions,
  targetCutoff = 155,
  onClose,
  rawPaperObj
}: AfcatExamCbtWindowProps) {
  const [activeTab, setActiveTab] = useState<'exam' | 'report' | 'key' | 'solutions'>('exam');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [timeLeft, setTimeLeft] = useState<number>(120 * 60); // 120 Mins
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  // Track visited questions
  useEffect(() => {
    setVisited(prev => ({ ...prev, [currentQIndex]: true }));
  }, [currentQIndex]);

  // Countdown timer
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
    setUserAnswers(prev => ({
      ...prev,
      [currentQIndex]: optIdx
    }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQIndex]: !prev[currentQIndex]
    }));
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

  // Calibration Analysis Math
  const calculateAnalysis = () => {
    let totalScore = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    const subjectStats: Record<string, { total: number; correct: number; wrong: number; score: number }> = {
      english: { total: 0, correct: 0, wrong: 0, score: 0 },
      maths: { total: 0, correct: 0, wrong: 0, score: 0 },
      reasoning: { total: 0, correct: 0, wrong: 0, score: 0 },
      ga: { total: 0, correct: 0, wrong: 0, score: 0 }
    };

    questions.forEach((q, idx) => {
      const subj = q.subjectId || 'ga';
      if (!subjectStats[subj]) {
        subjectStats[subj] = { total: 0, correct: 0, wrong: 0, score: 0 };
      }
      subjectStats[subj].total++;

      const chosen = userAnswers[idx];
      if (chosen === undefined) {
        unattemptedCount++;
      } else if (chosen === q.correctOptionIndex) {
        correctCount++;
        totalScore += 3;
        subjectStats[subj].correct++;
        subjectStats[subj].score += 3;
      } else {
        wrongCount++;
        totalScore -= 1;
        subjectStats[subj].wrong++;
        subjectStats[subj].score -= 1;
      }
    });

    const attemptedCount = questions.length - unattemptedCount;
    const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;
    const percentile = Math.min(99.9, Math.max(10, ((totalScore + 30) / 330) * 100)).toFixed(1);
    const predictedRank = Math.max(12, Math.floor(250000 * (1 - parseFloat(percentile) / 100)));
    const isCutoffCleared = totalScore >= targetCutoff;

    const weakTopics: string[] = [];
    const strongTopics: string[] = [];
    Object.entries(subjectStats).forEach(([sKey, stat]) => {
      const sName = sKey === 'english' ? 'Verbal English' : sKey === 'maths' ? 'Numerical Ability' : sKey === 'reasoning' ? 'Reasoning & Aptitude' : 'General Awareness';
      const sAcc = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;
      if (sAcc >= 70) strongTopics.push(sName);
      else weakTopics.push(sName);
    });

    return {
      totalScore,
      totalPossible: questions.length * 3,
      correctCount,
      wrongCount,
      unattemptedCount,
      attemptedCount,
      accuracy: accuracy.toFixed(1),
      percentile,
      predictedRank,
      isCutoffCleared,
      subjectStats,
      weakTopics,
      strongTopics
    };
  };

  const analysis = calculateAnalysis();
  const currentQ = questions[currentQIndex] || questions[0];

  // Active section identification
  const currentSection = currentQIndex < 30 ? 'english' : currentQIndex < 50 ? 'maths' : currentQIndex < 75 ? 'reasoning' : 'ga';

  const filteredQuestionsForView = questions.filter(q => {
    if (selectedSubjectFilter === 'all') return true;
    return q.subjectId === selectedSubjectFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#f4f6f9] text-[#111111] flex flex-col font-sans overflow-hidden select-none">
      {/* CDAC Official Navy Header Bar */}
      <header className="px-6 py-2.5 bg-[#003366] text-white flex items-center justify-between shadow-md shrink-0 border-b-2 border-[#faa114]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white text-[#003366] font-black text-sm flex items-center justify-center border-2 border-[#faa114]">
            IAF
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-wide uppercase" style={{ fontFamily: 'Outfit' }}>
              INDIAN AIR FORCE — {paperTitle}
            </h1>
            <div className="text-xs text-white/80 font-medium">
              Official CDAC Online Computer Based Examination • 100 Qs • 300 Marks (+3 / -1)
            </div>
          </div>
        </div>

        {/* Timer & Main Controls */}
        <div className="flex items-center gap-4">
          {activeTab === 'exam' && !isSubmitted && (
            <div className="px-4 py-1.5 bg-[#002244] border border-white/20 rounded-lg text-white font-mono font-bold text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#faa114] animate-pulse" /> Time Remaining: <span className="text-[#faa114]">{formatTime(timeLeft)}</span>
            </div>
          )}

          {isSubmitted && (
            <div className="flex items-center gap-1 bg-[#002244] p-1 rounded-lg text-xs font-bold">
              {[
                { id: 'report', label: '📊 Analysis & Rank' },
                { id: 'key', label: '🔑 Answer Key' },
                { id: 'solutions', label: '💡 Step-by-Step Solutions' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-3 py-1.5 rounded transition-all ${
                    activeTab === t.id ? 'bg-[#faa114] text-[#003366] font-black' : 'text-white hover:text-white/80'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'exam' && !isSubmitted && (
            <button
              onClick={handleSubmitExam}
              className="px-5 py-1.5 rounded bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs uppercase tracking-wider shadow"
            >
              Submit Test
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase"
          >
            Close Exam ✕
          </button>
        </div>
      </header>

      {/* Official 4-Section Switcher Bar */}
      {activeTab === 'exam' && (
        <div className="bg-[#e2e8f0] px-6 py-2 border-b border-gray-300 flex items-center gap-2 text-xs font-bold overflow-x-auto">
          <span className="text-gray-600 uppercase text-[11px] font-black tracking-wider mr-2">SECTIONS:</span>
          {[
            { id: 'english', label: 'Verbal Ability in English (Q1-30)', startIdx: 0 },
            { id: 'maths', label: 'Numerical Ability (Q31-50)', startIdx: 30 },
            { id: 'reasoning', label: 'Reasoning & Aptitude (Q51-75)', startIdx: 50 },
            { id: 'ga', label: 'General Awareness (Q76-100)', startIdx: 75 }
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => setCurrentQIndex(sec.startIdx)}
              className={`px-4 py-1.5 rounded border transition-all ${
                currentSection === sec.id
                  ? 'bg-[#003366] text-white border-[#003366] shadow'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-[#003366]'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      )}

      {/* MAIN EXAM BODY (WHITE PAPER WINDOW) */}
      {activeTab === 'exam' && (
        <div className="flex-1 flex overflow-hidden bg-[#f4f6f9]">
          {/* Main White Question Workspace */}
          <main className="flex-1 bg-white m-4 rounded-xl border-2 border-gray-300 shadow-sm p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Question Header Bar */}
              <div className="p-3 bg-[#f0f4f8] border border-gray-300 rounded-lg flex items-center justify-between text-xs font-bold text-gray-800">
                <span className="text-base text-[#003366]">
                  Question No. {currentQIndex + 1}
                </span>
                <span className="text-gray-600 bg-white px-3 py-1 rounded border border-gray-300">
                  Marks: +3.00, -1.00
                </span>
              </div>

              {/* Question Text (PURE BLACK ON WHITE) */}
              <div className="p-6 bg-white rounded-lg border-2 border-gray-200 text-black text-lg font-semibold leading-relaxed">
                {currentQ.questionText}
              </div>

              {/* Options Grid (OFFICIAL CDAC STYLE) */}
              <div className="space-y-3">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-4 rounded-lg border-2 text-left text-sm font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#e8f0fe] text-[#003366] border-[#1a73e8] shadow-sm font-bold'
                          : 'bg-white text-black border-gray-300 hover:bg-[#f8fafc] hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                          isSelected ? 'bg-[#1a73e8] text-white border-[#1a73e8]' : 'bg-gray-100 text-black border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="text-black text-base">{opt}</span>
                      </div>
                      {isSelected && (
                        <span className="text-[#1a73e8] font-bold text-xs bg-blue-100 px-2 py-1 rounded">Selected</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CDAC Official Bottom Control Buttons Bar */}
            <div className="pt-6 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    toggleMarkForReview();
                    handleSaveAndNext();
                  }}
                  className="px-5 py-2.5 rounded bg-[#7e22ce] hover:bg-[#6b21a8] text-white text-xs font-bold uppercase shadow"
                >
                  {markedForReview[currentQIndex] ? 'Unmark Review & Next' : 'Mark for Review & Next'}
                </button>

                <button
                  onClick={handleClearResponse}
                  className="px-4 py-2.5 rounded bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold uppercase shadow"
                >
                  Clear Response
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  className="px-5 py-2.5 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-gray-800 text-xs font-bold uppercase border border-gray-300"
                >
                  Previous
                </button>

                <button
                  onClick={handleSaveAndNext}
                  className="px-6 py-2.5 rounded bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold uppercase shadow-md flex items-center gap-1.5"
                >
                  Save & Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>

          {/* Right CDAC Palette Panel */}
          <aside className="w-80 bg-white m-4 ml-0 rounded-xl border-2 border-gray-300 shadow-sm p-4 flex flex-col justify-between shrink-0 hidden lg:flex">
            <div className="space-y-4">
              {/* Candidate Info Card */}
              <div className="p-3 bg-[#f0f4f8] rounded-lg border border-gray-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-sm">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-black uppercase">IAF AFCAT CADET</div>
                  <div className="text-gray-600 font-mono">Roll: 2026-AFCAT-100</div>
                </div>
              </div>

              {/* Question Palette Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-gray-800 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#16a34a] text-white rounded flex items-center justify-center text-[8px]">✓</span> Answered
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#dc2626] text-white rounded flex items-center justify-center text-[8px]">✗</span> Not Answered
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#7e22ce] text-white rounded-full flex items-center justify-center text-[8px]">M</span> Marked Review
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-gray-200 text-gray-700 border border-gray-400 rounded flex items-center justify-center text-[8px]">-</span> Not Visited
                </div>
              </div>

              {/* 100 Question Grid */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#003366] uppercase tracking-wider flex items-center justify-between">
                  <span>Question Palette</span>
                  <span className="text-gray-500 font-normal">{Object.keys(userAnswers).length}/100 Done</span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 max-h-[48vh] overflow-y-auto pr-1">
                  {questions.map((_, qIdx) => {
                    const isAns = userAnswers[qIdx] !== undefined;
                    const isMkd = markedForReview[qIdx];
                    const isVst = visited[qIdx];
                    const isCur = qIdx === currentQIndex;

                    let bgClass = "bg-gray-100 text-gray-700 border-gray-300";
                    if (isAns && isMkd) bgClass = "bg-[#7e22ce] text-white rounded-full ring-2 ring-emerald-400 font-bold";
                    else if (isMkd) bgClass = "bg-[#7e22ce] text-white rounded-full font-bold";
                    else if (isAns) bgClass = "bg-[#16a34a] text-white font-bold";
                    else if (isVst) bgClass = "bg-[#dc2626] text-white font-bold";

                    return (
                      <button
                        key={qIdx}
                        onClick={() => setCurrentQIndex(qIdx)}
                        className={`h-8 rounded font-bold text-xs transition-all flex items-center justify-center border ${bgClass} ${
                          isCur ? 'ring-4 ring-[#1a73e8] scale-105 z-10' : ''
                        }`}
                      >
                        {qIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <button
                onClick={handleSubmitExam}
                className="w-full py-2.5 rounded bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs uppercase shadow"
              >
                Submit Examination
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* TAB 2: POST-EXAM CANDIDATE CALIBRATION REPORT */}
      {activeTab === 'report' && (
        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#f4f6f9] space-y-8 text-black">
          {/* Top Result Banner */}
          <div className={`rounded-3xl p-8 border-2 ${
            analysis.isCutoffCleared 
              ? 'bg-emerald-900 border-emerald-500 text-white'
              : 'bg-amber-900 border-amber-500 text-white'
          } shadow-xl`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#faa114]" /> Official Candidate Calibration Analysis
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: 'Outfit' }}>
                  {analysis.isCutoffCleared ? '🎉 EXAM QUALIFIED FOR SSB INTERVIEW!' : '⚠️ NEAR CUTOFF — TARGET REVISION NEEDED'}
                </h2>
                <p className="text-white/90 text-sm max-w-xl">
                  {analysis.isCutoffCleared
                    ? `Outstanding performance! Your score of ${analysis.totalScore} marks comfortably clears the estimated target cutoff of ${targetCutoff} marks.`
                    : `You scored ${analysis.totalScore} marks. Focus on your weak topics listed below to cross the target cutoff of ${targetCutoff} marks.`}
                </p>
              </div>

              <div className="bg-white text-[#003366] p-6 rounded-3xl border-2 border-[#faa114] text-center shrink-0 min-w-[200px] shadow-lg">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">Total Score</div>
                <div className="text-4xl font-black text-[#003366] my-1" style={{ fontFamily: 'Outfit' }}>
                  {analysis.totalScore} <span className="text-lg font-medium text-gray-500">/ 300</span>
                </div>
                <div className="text-xs font-bold text-emerald-700">
                  Target Cutoff: {targetCutoff} Marks
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border-2 border-gray-300 text-center space-y-1 shadow-sm">
              <div className="text-xs font-bold text-gray-500">PREDICTED AIR RANK</div>
              <div className="text-2xl font-bold text-purple-700" style={{ fontFamily: 'Outfit' }}>
                AIR #{analysis.predictedRank.toLocaleString()}
              </div>
              <div className="text-[10px] text-gray-500">out of 2,50,000 candidates</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border-2 border-gray-300 text-center space-y-1 shadow-sm">
              <div className="text-xs font-bold text-gray-500">PERCENTILE</div>
              <div className="text-2xl font-bold text-blue-700" style={{ fontFamily: 'Outfit' }}>
                {analysis.percentile}%ile
              </div>
              <div className="text-[10px] text-gray-500">Accuracy: {analysis.accuracy}%</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border-2 border-gray-300 text-center space-y-1 shadow-sm">
              <div className="text-xs font-bold text-gray-500">CORRECT RESPONSES</div>
              <div className="text-2xl font-bold text-emerald-700" style={{ fontFamily: 'Outfit' }}>
                {analysis.correctCount} Qs
              </div>
              <div className="text-[10px] text-emerald-600">+{analysis.correctCount * 3} Marks</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border-2 border-gray-300 text-center space-y-1 shadow-sm">
              <div className="text-xs font-bold text-gray-500">NEGATIVE MARKS</div>
              <div className="text-2xl font-bold text-rose-700" style={{ fontFamily: 'Outfit' }}>
                -{analysis.wrongCount} Marks
              </div>
              <div className="text-[10px] text-rose-600">{analysis.wrongCount} Incorrect</div>
            </div>
          </div>

          {/* Subject Breakdown & Weak vs Strong Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl border-2 border-gray-300 space-y-4 shadow-sm">
              <h3 className="font-bold text-base text-[#003366] flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#faa114]" /> Subject-Wise Score Breakdown
              </h3>
              <div className="space-y-3 text-xs">
                {Object.entries(analysis.subjectStats).map(([sKey, stat]) => {
                  const sName = sKey === 'english' ? 'Verbal Ability in English' : sKey === 'maths' ? 'Numerical Ability' : sKey === 'reasoning' ? 'Reasoning & Military Aptitude' : 'General Awareness & Defence GK';
                  const pct = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;

                  return (
                    <div key={sKey} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between font-bold text-black">
                        <span>{sName}</span>
                        <span className="text-[#003366]">{stat.score} Marks ({stat.correct}/{stat.total} Correct)</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-600' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-600'}`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-gray-300 space-y-5 shadow-sm">
              <h3 className="font-bold text-base text-[#003366] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#faa114]" /> Candidate Topic Calibration
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                  <span className="font-bold text-emerald-800 flex items-center gap-1.5 text-sm">
                    <CheckCircle className="w-4 h-4" /> Strong Mastered Areas:
                  </span>
                  <div className="text-gray-800 font-medium">
                    {analysis.strongTopics.length > 0 ? analysis.strongTopics.join(', ') : 'Attempt more questions to establish strong areas.'}
                  </div>
                </div>

                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-1">
                  <span className="font-bold text-rose-800 flex items-center gap-1.5 text-sm">
                    <AlertTriangle className="w-4 h-4" /> Focus & Revision Needed:
                  </span>
                  <div className="text-gray-800 font-medium">
                    {analysis.weakTopics.length > 0 ? analysis.weakTopics.join(', ') : 'None! Exceptional high accuracy across all sections.'}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <span className="font-bold text-[#003366] flex items-center gap-1.5 text-xs">
                    <BookOpen className="w-4 h-4" /> High-Yield Revision Cheatsheet:
                  </span>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-[11px] leading-relaxed">
                    <li><strong>Speed & Distance:</strong> 1 km/h = 5/18 m/s • Relative Speed = $(S_1 + S_2)$ in opposite direction.</li>
                    <li><strong>Time & Work:</strong> Combined Rate = $(1/A + 1/B)$ per day.</li>
                    <li><strong>Defence GK:</strong> EAC HQ: Shillong • Maintenance Command HQ: Nagpur.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('solutions')}
              className="px-8 py-3.5 rounded-2xl bg-[#003366] text-white font-bold text-xs hover:bg-[#002244] transition-all shadow-lg flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#faa114]" /> Inspect Detailed Step-by-Step Solutions
            </button>
            {rawPaperObj && (
              <button
                onClick={() => exportPaperToPdf(rawPaperObj, questions)}
                className="px-8 py-3.5 rounded-2xl bg-white border-2 border border-gray-300 hover:border-[#003366] text-[#003366] font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-[#faa114]" /> Export Official 3-Part PDF
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ANSWER KEY MATRIX (100 Qs) */}
      {activeTab === 'key' && (
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#f4f6f9] space-y-6 text-black">
          <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-bold">
            Official 100-Question Evaluation Key Grid: Review all correct choices alongside your selected responses.
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center text-xs">
            {questions.map((q, idx) => {
              const userAns = userAnswers[idx];
              const isCorrect = userAns === q.correctOptionIndex;
              const isWrong = userAns !== undefined && !isCorrect;

              return (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-xl border-2 flex flex-col justify-between ${
                    isCorrect 
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold'
                      : isWrong
                      ? 'bg-rose-100 border-rose-500 text-rose-900 font-bold'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-[10px] text-gray-500">Q{idx + 1}</div>
                  <div className="font-bold text-sm my-0.5">
                    Key: {String.fromCharCode(65 + q.correctOptionIndex)}
                  </div>
                  {userAns !== undefined ? (
                    <div className="text-[9px] font-semibold">
                      You: {String.fromCharCode(65 + userAns)}
                    </div>
                  ) : (
                    <div className="text-[9px] text-gray-400">Unattempted</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: FULL SOLUTIONS & EXPLANATIONS */}
      {activeTab === 'solutions' && (
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#f4f6f9] space-y-6 text-black">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-300">
            <span className="text-xs font-bold text-gray-600 shrink-0">Filter by Subject:</span>
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'english', label: 'Verbal English' },
              { id: 'maths', label: 'Numerical Ability' },
              { id: 'reasoning', label: 'Reasoning & Aptitude' },
              { id: 'ga', label: 'General Awareness' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedSubjectFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedSubjectFilter === tab.id
                    ? 'bg-[#003366] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#003366]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {filteredQuestionsForView.map((q, idx) => {
              const origIdx = questions.indexOf(q);
              const userAns = userAnswers[origIdx];
              const isCorrect = userAns === q.correctOptionIndex;

              return (
                <div key={q.id || idx} className="p-6 bg-white rounded-3xl border-2 border-gray-300 space-y-3 text-xs shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-bold text-black text-base leading-snug">
                      Q{origIdx + 1}. {q.questionText}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] shrink-0">
                      {q.topicName || q.subjectId.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-black">
                    {q.options.map((opt, oIdx) => {
                      const isKey = oIdx === q.correctOptionIndex;
                      const isUserChoice = userAns === oIdx;

                      return (
                        <div 
                          key={oIdx} 
                          className={`p-3 rounded-xl border-2 ${
                            isKey 
                              ? 'bg-emerald-100 border-emerald-500 font-bold text-emerald-950' 
                              : isUserChoice
                              ? 'bg-rose-100 border-rose-500 text-rose-950 font-bold'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <strong>{String.fromCharCode(65 + oIdx)})</strong> {opt} {isKey ? '✓ (Correct Key)' : isUserChoice ? '✗ (Your Pick)' : ''}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-black text-sm leading-relaxed">
                    <strong className="text-[#003366]">Step-by-Step Solution:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
