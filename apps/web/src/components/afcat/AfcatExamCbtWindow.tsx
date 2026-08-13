'use client';

import React, { useState, useEffect } from 'react';
import { AfcatQuestion, AfcatPyqPaper, AfcatModelPaper } from '../../data/afcatData';
import { exportPaperToPdf } from '../../utils/pdfExporter';
import { 
  Clock, CheckCircle, XCircle, Award, BarChart2, BookOpen, AlertTriangle, 
  ChevronLeft, ChevronRight, Download, RefreshCw, FileText, Check, Filter, Zap
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
  const [timeLeft, setTimeLeft] = useState<number>(120 * 60); // 120 Mins
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

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

    // Identify Weak vs Strong Areas
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

  const filteredQuestionsForView = questions.filter(q => {
    if (selectedSubjectFilter === 'all') return true;
    return q.subjectId === selectedSubjectFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#1e2327] text-white flex flex-col font-sans overflow-hidden">
      {/* CDAC Official Exam Header Bar */}
      <header className="px-6 py-3.5 bg-[#14171a] border-b border-white/10 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-[#faa114] text-[#14171a] font-black text-sm tracking-wider">
            TEJAS CBT
          </div>
          <div>
            <h1 className="font-bold text-base text-white leading-tight" style={{ fontFamily: 'Outfit' }}>
              {paperTitle}
            </h1>
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span>AFCAT Official Standard</span>
              <span>•</span>
              <span>100 Questions (300 Marks)</span>
              <span>•</span>
              <span className="text-[#faa114] font-medium">+3 Correct / -1 Negative</span>
            </div>
          </div>
        </div>

        {/* Header Actions / Navigation */}
        <div className="flex items-center gap-3">
          {activeTab === 'exam' && !isSubmitted && (
            <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 font-mono font-bold text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 animate-pulse" /> Time Left: {formatTime(timeLeft)}
            </div>
          )}

          {isSubmitted && (
            <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-xl text-xs font-bold">
              {[
                { id: 'report', label: '📊 Analysis & Rank' },
                { id: 'key', label: '🔑 Answer Key (100 Qs)' },
                { id: 'solutions', label: '💡 Solutions & Derivations' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === t.id ? 'bg-[#faa114] text-[#14171a]' : 'text-white/80 hover:text-white'
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
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Submit Exam
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
          >
            Exit Exam ✕
          </button>
        </div>
      </header>

      {/* MAIN EXAM BODY */}
      {activeTab === 'exam' && (
        <div className="flex-1 flex overflow-hidden bg-[#1a1d20]">
          {/* Main Question Workspace */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
            <div className="space-y-6 max-w-4xl mx-auto w-full">
              {/* Question Header Status */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#faa114]/20 border border-[#faa114]/40 text-[#faa114] font-bold text-xs rounded-xl">
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-white/80 font-medium text-xs rounded-xl uppercase tracking-wider">
                    {currentQ.topicName || currentQ.subjectId}
                  </span>
                </div>
                <button
                  onClick={toggleMarkForReview}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    markedForReview[currentQIndex]
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {markedForReview[currentQIndex] ? '💜 Marked for Review' : '🔖 Mark for Review'}
                </button>
              </div>

              {/* Question Text */}
              <div className="p-6 bg-[#23272b] rounded-2xl border border-white/10 text-white text-base leading-relaxed font-medium">
                {currentQ.questionText}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#faa114] text-[#14171a] border-[#faa114] font-bold shadow-lg scale-[1.01]'
                          : 'bg-[#23272b] text-white/90 border-white/10 hover:border-[#faa114]/50 hover:bg-[#2c3136]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-[#14171a] text-[#faa114]' : 'bg-white/10 text-white'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-[#14171a]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Controls */}
            <div className="max-w-4xl mx-auto w-full flex items-center justify-between pt-4 border-t border-white/10">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white text-xs font-bold transition-all flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={() => {
                  setUserAnswers(prev => {
                    const copy = { ...prev };
                    delete copy[currentQIndex];
                    return copy;
                  });
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all"
              >
                Clear Response
              </button>

              <button
                disabled={currentQIndex === questions.length - 1}
                onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-6 py-2.5 rounded-xl bg-[#faa114] text-[#14171a] hover:bg-[#e5920f] font-bold text-xs transition-all flex items-center gap-2 shadow-md"
              >
                Save & Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>

          {/* Right Question Palette (1 to 100) */}
          <aside className="w-80 bg-[#14171a] border-l border-white/10 p-5 flex flex-col justify-between shrink-0 hidden lg:flex">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center justify-between">
                <span>Question Palette</span>
                <span className="text-xs text-white/50">{Object.keys(userAnswers).length}/{questions.length} Attempted</span>
              </h3>

              {/* Palette Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-white/70 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Answered
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Marked Review
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span> Unanswered
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-[#faa114]"></span> Current Q
                </div>
              </div>

              {/* 100 Palette Buttons */}
              <div className="grid grid-cols-5 gap-2 max-h-[55vh] overflow-y-auto pr-1">
                {questions.map((_, qIdx) => {
                  const isAnswered = userAnswers[qIdx] !== undefined;
                  const isMarked = markedForReview[qIdx];
                  const isCurrent = qIdx === currentQIndex;

                  return (
                    <button
                      key={qIdx}
                      onClick={() => setCurrentQIndex(qIdx)}
                      className={`h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                        isCurrent
                          ? 'border-2 border-[#faa114] bg-[#faa114]/20 text-[#faa114]'
                          : isMarked
                          ? 'bg-purple-500 text-white'
                          : isAnswered
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={handleSubmitExam}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Finish & Submit Test
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* TAB 2: POST-EXAM CANDIDATE CALIBRATION REPORT */}
      {activeTab === 'report' && (
        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#1a1d20] space-y-8">
          {/* Top Result Banner */}
          <div className={`rounded-3xl p-8 border ${
            analysis.isCutoffCleared 
              ? 'bg-gradient-to-r from-emerald-950 via-[#1b2f23] to-[#122319] border-emerald-500/40 text-emerald-100'
              : 'bg-gradient-to-r from-amber-950 via-[#2f271b] to-[#231d12] border-amber-500/40 text-amber-100'
          } shadow-2xl`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#faa114]" /> AFCAT Performance Calibration Report
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: 'Outfit' }}>
                  {analysis.isCutoffCleared ? '🎉 EXAM QUALIFIED FOR SSB INTERVIEW!' : '⚠️ NEAR CUTOFF — TARGET IMPROVEMENT NEEDED'}
                </h2>
                <p className="text-white/80 text-sm max-w-xl">
                  {analysis.isCutoffCleared
                    ? `Outstanding performance! Your score of ${analysis.totalScore} marks comfortably clears the estimated target cutoff of ${targetCutoff} marks.`
                    : `You scored ${analysis.totalScore} marks. Focus on your weak topics listed below to cross the target cutoff of ${targetCutoff} marks.`}
                </p>
              </div>

              {/* Score Metric Card */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center shrink-0 min-w-[200px]">
                <div className="text-xs font-bold text-white/70 uppercase tracking-wider">Total Score</div>
                <div className="text-4xl font-black text-[#faa114] my-1" style={{ fontFamily: 'Outfit' }}>
                  {analysis.totalScore} <span className="text-lg font-medium text-white/60">/ 300</span>
                </div>
                <div className="text-xs font-semibold text-emerald-400">
                  Target Cutoff: {targetCutoff} Marks
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-[#23272b] rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-xs font-bold text-white/60">PREDICTED AIR RANK</div>
              <div className="text-2xl font-bold text-purple-400" style={{ fontFamily: 'Outfit' }}>
                AIR #{analysis.predictedRank.toLocaleString()}
              </div>
              <div className="text-[10px] text-white/50">out of 2,50,000 candidates</div>
            </div>

            <div className="p-5 bg-[#23272b] rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-xs font-bold text-white/60">PERCENTILE</div>
              <div className="text-2xl font-bold text-blue-400" style={{ fontFamily: 'Outfit' }}>
                {analysis.percentile}%ile
              </div>
              <div className="text-[10px] text-white/50">Accuracy: {analysis.accuracy}%</div>
            </div>

            <div className="p-5 bg-[#23272b] rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-xs font-bold text-white/60">CORRECT ANSWERS</div>
              <div className="text-2xl font-bold text-emerald-400" style={{ fontFamily: 'Outfit' }}>
                {analysis.correctCount} Qs
              </div>
              <div className="text-[10px] text-emerald-500/80">+{analysis.correctCount * 3} Marks</div>
            </div>

            <div className="p-5 bg-[#23272b] rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-xs font-bold text-white/60">NEGATIVE MARKS</div>
              <div className="text-2xl font-bold text-rose-400" style={{ fontFamily: 'Outfit' }}>
                -{analysis.wrongCount} Marks
              </div>
              <div className="text-[10px] text-rose-400/80">{analysis.wrongCount} Wrong Responses</div>
            </div>
          </div>

          {/* Subject Breakdown & Weak vs Strong Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Breakdown Table */}
            <div className="p-6 bg-[#23272b] rounded-3xl border border-white/10 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#faa114]" /> Subject-Wise Score Breakdown
              </h3>
              <div className="space-y-3 text-xs">
                {Object.entries(analysis.subjectStats).map(([sKey, stat]) => {
                  const sName = sKey === 'english' ? 'Verbal Ability in English' : sKey === 'maths' ? 'Numerical Ability' : sKey === 'reasoning' ? 'Reasoning & Military Aptitude' : 'General Awareness & Defence GK';
                  const pct = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;

                  return (
                    <div key={sKey} className="p-3.5 bg-[#1e2327] rounded-xl border border-white/10 space-y-2">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>{sName}</span>
                        <span className="text-[#faa114]">{stat.score} Marks ({stat.correct}/{stat.total} Correct)</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weak & Strong Topic Calibration */}
            <div className="p-6 bg-[#23272b] rounded-3xl border border-white/10 space-y-5">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#faa114]" /> Candidate Topic Calibration
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-1">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                    <CheckCircle className="w-4 h-4" /> Strong Mastered Areas:
                  </span>
                  <div className="text-white/80 font-medium">
                    {analysis.strongTopics.length > 0 ? analysis.strongTopics.join(', ') : 'Attempt more questions to establish strong areas.'}
                  </div>
                </div>

                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-1">
                  <span className="font-bold text-rose-400 flex items-center gap-1.5 text-sm">
                    <AlertTriangle className="w-4 h-4" /> Focus & Revision Needed:
                  </span>
                  <div className="text-white/80 font-medium">
                    {analysis.weakTopics.length > 0 ? analysis.weakTopics.join(', ') : 'None! Exceptional high accuracy across all sections.'}
                  </div>
                </div>

                {/* High Yield Revision Flashcards */}
                <div className="p-4 bg-[#1e2327] rounded-2xl border border-white/10 space-y-2">
                  <span className="font-bold text-[#faa114] flex items-center gap-1.5 text-xs">
                    <BookOpen className="w-4 h-4" /> High-Yield Revision Cheatsheet:
                  </span>
                  <ul className="list-disc list-inside text-white/70 space-y-1 text-[11px] leading-relaxed">
                    <li><strong>Speed & Distance:</strong> 1 km/h = 5/18 m/s • Relative Speed = $(S_1 + S_2)$ in opposite direction.</li>
                    <li><strong>Time & Work:</strong> Combined Rate = $(1/A + 1/B)$ per day.</li>
                    <li><strong>Defence GK:</strong> EAC HQ: Shillong • Maintenance Command HQ: Nagpur.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('solutions')}
              className="px-8 py-3.5 rounded-2xl bg-[#faa114] text-[#14171a] font-bold text-xs hover:bg-[#e5920f] transition-all shadow-lg flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Inspect Detailed Solutions & Derivations
            </button>
            {rawPaperObj && (
              <button
                onClick={() => exportPaperToPdf(rawPaperObj, questions)}
                className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 border border-white/10"
              >
                <Download className="w-4 h-4 text-[#faa114]" /> Export Official 3-Part PDF
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ANSWER KEY MATRIX (100 Qs) */}
      {activeTab === 'key' && (
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#1a1d20] space-y-6">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-300 font-medium">
            <strong>Official 100-Question Evaluation Key Grid:</strong> Review all correct choices alongside your selected responses.
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center text-xs">
            {questions.map((q, idx) => {
              const userAns = userAnswers[idx];
              const isCorrect = userAns === q.correctOptionIndex;
              const isWrong = userAns !== undefined && !isCorrect;

              return (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                    isCorrect 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : isWrong
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                      : 'bg-[#23272b] border-white/10 text-white/70'
                  }`}
                >
                  <div className="text-[10px] text-white/50">Q{idx + 1}</div>
                  <div className="font-bold text-sm my-0.5">
                    Key: {String.fromCharCode(65 + q.correctOptionIndex)}
                  </div>
                  {userAns !== undefined ? (
                    <div className="text-[9px] font-semibold">
                      You: {String.fromCharCode(65 + userAns)}
                    </div>
                  ) : (
                    <div className="text-[9px] text-white/40">Unattempted</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: FULL SOLUTIONS & EXPLANATIONS */}
      {activeTab === 'solutions' && (
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#1a1d20] space-y-6">
          {/* Subject Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
            <span className="text-xs font-bold text-white/60 shrink-0">Filter by Subject:</span>
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
                    ? 'bg-[#faa114] text-[#14171a]'
                    : 'bg-[#23272b] text-white/70 border border-white/10 hover:border-[#faa114]'
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
                <div key={q.id || idx} className="p-6 bg-[#23272b] rounded-3xl border border-white/10 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-bold text-white text-sm leading-snug">
                      Q{origIdx + 1}. {q.questionText}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-bold text-[10px] shrink-0">
                      {q.topicName || q.subjectId.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80">
                    {q.options.map((opt, oIdx) => {
                      const isKey = oIdx === q.correctOptionIndex;
                      const isUserChoice = userAns === oIdx;

                      return (
                        <div 
                          key={oIdx} 
                          className={`p-3 rounded-xl border ${
                            isKey 
                              ? 'bg-emerald-500/20 border-emerald-400 font-bold text-emerald-200' 
                              : isUserChoice
                              ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                              : 'bg-[#1e2327] border-white/10'
                          }`}
                        >
                          <strong>{String.fromCharCode(65 + oIdx)})</strong> {opt} {isKey ? '✓ (Correct)' : isUserChoice ? '✗ (Your Pick)' : ''}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3.5 bg-[#1e2327] rounded-2xl border border-white/10 text-white/90 leading-relaxed">
                    <strong className="text-[#faa114]">Step-by-Step Explanation:</strong> {q.explanation}
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
