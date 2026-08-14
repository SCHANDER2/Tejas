'use client';

import React, { useState, useEffect } from 'react';
import { NeetQuestion, NeetPyqPaper, NeetModelPaper } from '../../data/neetData';
import { Clock, CheckCircle, XCircle, Award, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

interface NeetExamCbtWindowProps {
  paperTitle: string;
  paperYearOrType: string;
  questions: NeetQuestion[];
  onClose: () => void;
  rawPaperObj?: NeetPyqPaper | NeetModelPaper;
}

export default function NeetExamCbtWindow({
  paperTitle,
  paperYearOrType,
  questions,
  onClose,
  rawPaperObj
}: NeetExamCbtWindowProps) {
  const [activeTab, setActiveTab] = useState<'exam' | 'report'>('exam');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [timeLeft, setTimeLeft] = useState<number>(200 * 60); // 200 Mins (3h 20m)
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
      if (userAns === undefined) unattemptedCount++;
      else if (userAns === q.correctOptionIndex) { correctCount++; score += 4; }
      else { incorrectCount++; score -= 1; }
    });

    const isQualified = score >= 620;
    const accuracy = (correctCount + incorrectCount) > 0 ? (correctCount / (correctCount + incorrectCount)) * 100 : 0;
    const percentile = Math.min(99.99, Math.max(10, (score / 720) * 100 * 1.35));
    const airRank = Math.max(1, Math.floor(2100000 * (1 - percentile / 100)));

    let medicalSeatVerdict = "MBBS Govt Medical College Qualified";
    if (score >= 700) medicalSeatVerdict = "AIIMS New Delhi / Top 5 Central Medical Institute";
    else if (score >= 650) medicalSeatVerdict = "Top State Government Medical College (MAMC / KGMU / MMC)";
    else if (score < 600) medicalSeatVerdict = "BAMS / BHMS / Private Medical College Scope";

    return { score, maxMarks: 720, correctCount, incorrectCount, unattemptedCount, isQualified, accuracy: accuracy.toFixed(1), percentile: percentile.toFixed(2), airRank, medicalSeatVerdict };
  };

  const analysis = calculateAnalysis();
  const currentQ = questions[currentQIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Top Header */}
      <div className="bg-[#003366] text-white px-6 py-3 border-b border-[#faa114] flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 className="font-bold text-base leading-tight tracking-wide">NATIONAL ELIGIBILITY CUM ENTRANCE TEST (NEET UG) — CBT WINDOW</h1>
            <p className="text-xs text-blue-200">{paperTitle} • {paperYearOrType} (180 Qs / 720 Marks)</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-slate-900/90 border border-emerald-500/60 px-4 py-1 rounded flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-300">Time Left:</span>
            <span className="font-mono font-bold text-base text-emerald-400">{formatTime(timeLeft)}</span>
          </div>

          <button onClick={onClose} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs">
            Exit Test
          </button>
        </div>
      </div>

      {/* Main CBT Workspace */}
      {activeTab === 'exam' && currentQ && (
        <div className="flex-1 flex overflow-hidden bg-gray-100 text-black">
          <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <span className="bg-emerald-700 text-white px-3 py-1 rounded text-xs font-bold uppercase">
                  Question No. {currentQIndex + 1} of 180
                </span>
                <span className="text-xs text-gray-600 font-bold">Subject: {currentQ.topicName} (+4 / -1 Marks)</span>
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
                  className="ml-4 px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded text-xs font-bold shadow"
                >
                  Submit NEET Paper
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
                        isCurr ? 'ring-2 ring-emerald-500 ring-offset-1 scale-105' : ''
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
                <span className="text-xs font-bold text-emerald-400 uppercase">NEET UG Candidate Performance Report</span>
                <h2 className="text-2xl font-black text-white mt-1">{paperTitle} Result</h2>
              </div>
              <div className={`px-5 py-2 rounded-xl text-sm font-bold border ${
                analysis.isQualified ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}>
                {analysis.isQualified ? '🎉 GOVT MBBS SEAT QUALIFIED' : '⚠️ BELOW GOVT MBBS CUTOFF'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">NEET Score</span>
                <p className="text-3xl font-black text-emerald-400 mt-1">{analysis.score} <span className="text-xs text-slate-500">/ 720</span></p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Predicted AIR Rank</span>
                <p className="text-3xl font-black text-blue-400 mt-1">#{analysis.airRank}</p>
                <p className="text-[11px] text-slate-400 mt-1">Percentile: {analysis.percentile}%</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Accuracy</span>
                <p className="text-3xl font-black text-amber-400 mt-1">{analysis.accuracy}%</p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-medium">Attempted</span>
                <p className="text-3xl font-black text-purple-400 mt-1">{questions.length - analysis.unattemptedCount} <span className="text-xs text-slate-500">/ 180</span></p>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl mb-6 text-center">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Medical Counseling Verdict</span>
              <h4 className="text-lg font-bold text-white mt-1">{analysis.medicalSeatVerdict}</h4>
            </div>

            <button onClick={onClose} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700">
              Close CBT Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
