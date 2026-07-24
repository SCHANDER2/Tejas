'use client';

import React, { useState, useEffect } from 'react';
import { 
  AFCAT_QUESTION_BANK, 
  AFCAT_SUBJECTS, 
  AfcatQuestion, 
  AfcatSubject 
} from '../../data/afcatData';
import { 
  Brain, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Award, 
  Zap, 
  ChevronRight, 
  Sparkles, 
  Shield, 
  BookOpen,
  BarChart3,
  Filter
} from 'lucide-react';

export default function AfcatQuizEngine({ onCompleteQuiz }: { onCompleteQuiz?: (score: number, total: number, timeSpentSec: number) => void }) {
  const [quizMode, setQuizMode] = useState<'full' | 'subject' | 'topic'>('full');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('english');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  
  // Quiz Active State
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [questionsList, setQuestionsList] = useState<AfcatQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(120 * 60);

  const activeSubject = AFCAT_SUBJECTS.find(s => s.id === selectedSubjectId) || AFCAT_SUBJECTS[0];

  // Start Quiz setup
  const startQuiz = () => {
    let filtered = [...AFCAT_QUESTION_BANK];

    if (quizMode === 'subject') {
      filtered = filtered.filter(q => q.subjectId === selectedSubjectId);
    } else if (quizMode === 'topic') {
      filtered = filtered.filter(q => q.subjectId === selectedSubjectId);
      if (selectedTopicId !== 'all') {
        filtered = filtered.filter(q => q.topicId === selectedTopicId);
      }
    }

    if (filtered.length === 0) {
      filtered = [...AFCAT_QUESTION_BANK];
    }

    setQuestionsList(filtered);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setQuizActive(true);
    setTimeLeftSeconds(quizMode === 'full' ? 120 * 60 : 30 * 60);
  };

  // Timer effect
  useEffect(() => {
    if (!quizActive || quizFinished) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizActive, quizFinished]);

  const handleSelectOption = (optionIndex: number) => {
    if (quizFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    if (onCompleteQuiz) {
      const stats = calculateResultStats();
      onCompleteQuiz(stats.totalMarksObtained, stats.totalPossibleMarks, (quizMode === 'full' ? 120 * 60 : 30 * 60) - timeLeftSeconds);
    }
  };

  const calculateResultStats = () => {
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    questionsList.forEach((q, idx) => {
      const chosen = selectedAnswers[idx];
      if (chosen === undefined) {
        unattemptedCount++;
      } else if (chosen === q.correctOptionIndex) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const totalMarksObtained = (correctCount * 3) - (wrongCount * 1);
    const totalPossibleMarks = questionsList.length * 3;
    const accuracy = (correctCount + wrongCount) > 0 
      ? Math.round((correctCount / (correctCount + wrongCount)) * 100) 
      : 0;

    return {
      correctCount,
      wrongCount,
      unattemptedCount,
      totalMarksObtained,
      totalPossibleMarks,
      accuracy
    };
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. SETUP / MODE SELECTION VIEW
  if (!quizActive) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-[#262a2b] text-white p-8 md:p-10 shadow-xl border border-white/10">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faa114]/20 border border-[#faa114]/30 text-[#faa114] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> AFCAT Standard Test Engine
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'Outfit' }}>
              AFCAT Practice & Quiz Hub
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Take full-length timed AFCAT mocks, subject-wise practice, or topic-wise micro quizzes with official AFCAT marking (+3 for correct, -1 for wrong).
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#e5e2d9] shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>
            Choose Quiz Mode
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setQuizMode('full')}
              className={`p-6 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                quizMode === 'full'
                  ? 'bg-[#262a2b] text-white border-[#262a2b] shadow-md scale-[1.02]'
                  : 'bg-[#fcfcfb] text-[#262a2b] border-[#e5e2d9] hover:border-[#faa114]'
              }`}
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${quizMode === 'full' ? 'bg-white/10 text-[#faa114]' : 'bg-[#faa114]/15 text-[#faa114]'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg leading-tight mb-1">Full AFCAT Mock Quiz</h4>
                <p className={`text-xs ${quizMode === 'full' ? 'text-white/70' : 'text-[#786e67]'}`}>
                  100 Questions • 300 Marks • 120 Mins. Full exam simulation.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-current/10 text-xs font-bold flex items-center justify-between">
                <span>Official Level</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => setQuizMode('subject')}
              className={`p-6 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                quizMode === 'subject'
                  ? 'bg-[#262a2b] text-white border-[#262a2b] shadow-md scale-[1.02]'
                  : 'bg-[#fcfcfb] text-[#262a2b] border-[#e5e2d9] hover:border-[#faa114]'
              }`}
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${quizMode === 'subject' ? 'bg-white/10 text-[#faa114]' : 'bg-blue-500/15 text-blue-600'}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg leading-tight mb-1">Subject-Wise Quiz</h4>
                <p className={`text-xs ${quizMode === 'subject' ? 'text-white/70' : 'text-[#786e67]'}`}>
                  Practice specific subjects: English, Maths, Reasoning, or GA.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-current/10 text-xs font-bold flex items-center justify-between">
                <span>Subject Specific</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => setQuizMode('topic')}
              className={`p-6 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                quizMode === 'topic'
                  ? 'bg-[#262a2b] text-white border-[#262a2b] shadow-md scale-[1.02]'
                  : 'bg-[#fcfcfb] text-[#262a2b] border-[#e5e2d9] hover:border-[#faa114]'
              }`}
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${quizMode === 'topic' ? 'bg-white/10 text-[#faa114]' : 'bg-purple-500/15 text-purple-600'}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg leading-tight mb-1">Topic-Wise Micro Quiz</h4>
                <p className={`text-xs ${quizMode === 'topic' ? 'text-white/70' : 'text-[#786e67]'}`}>
                  Target specific high-yield topics like Venn Diagrams or Time & Work.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-current/10 text-xs font-bold flex items-center justify-between">
                <span>Micro Concept</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Additional Filter Options for Subject & Topic mode */}
          {(quizMode === 'subject' || quizMode === 'topic') && (
            <div className="p-6 bg-[#fcfcfb] rounded-2xl border border-[#e5e2d9] space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#262a2b]">
                <Filter className="w-4 h-4 text-[#faa114]" /> Select Target Subject
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {AFCAT_SUBJECTS.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubjectId(sub.id);
                      setSelectedTopicId('all');
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedSubjectId === sub.id
                        ? 'bg-[#262a2b] text-white border-[#262a2b]'
                        : 'bg-white text-[#262a2b] border-[#e5e2d9] hover:border-[#faa114]'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>

              {quizMode === 'topic' && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-[#262a2b]">Select Specific Topic:</label>
                  <select
                    value={selectedTopicId}
                    onChange={(e) => setSelectedTopicId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#e5e2d9] text-xs font-bold text-[#262a2b] outline-none"
                  >
                    <option value="all">All Topics in {activeSubject.name}</option>
                    {activeSubject.topics.map(t => (
                      <option key={t.id} value={t.id}>{t.name} (Expected {t.expectedQs} Qs)</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              onClick={startQuiz}
              className="px-8 py-3.5 rounded-2xl bg-[#262a2b] hover:bg-[#1c2226] text-white text-sm font-bold shadow-lg flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              Start AFCAT Quiz <ChevronRight className="w-4 h-4 text-[#faa114]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. QUIZ RUNNER OR RESULTS VIEW
  const currentQuestion = questionsList[currentIndex];
  const stats = calculateResultStats();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quiz Top Status Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#e5e2d9] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-[#262a2b] text-white text-xs font-bold">
            Question {currentIndex + 1} of {questionsList.length}
          </span>
          <span className="text-xs font-medium text-[#786e67] hidden sm:inline-block">
            {currentQuestion.topicName}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Clock className="w-4 h-4 text-[#faa114]" /> {formatTimer(timeLeftSeconds)}
          </div>
          {!quizFinished && (
            <button
              onClick={finishQuiz}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      {!quizFinished ? (
        /* ACTIVE QUESTION CARD */
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#e5e2d9] shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#fcfcfb] border border-[#e5e2d9] text-[11px] font-bold text-[#786e67]">
              {currentQuestion.topicName} • Difficulty: {currentQuestion.difficulty}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#262a2b] leading-relaxed whitespace-pre-line">
              {currentQuestion.questionText}
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#262a2b] text-white border-[#262a2b] shadow-md'
                      : 'bg-[#fcfcfb] text-[#262a2b] border-[#e5e2d9] hover:border-[#faa114]'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-[#faa114] text-[#262a2b]' : 'bg-[#e5e2d9] text-[#786e67]'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Question Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-[#e5e2d9]">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-5 py-2.5 rounded-xl border border-[#e5e2d9] text-xs font-bold text-[#262a2b] disabled:opacity-40 hover:bg-[#fcfcfb]"
            >
              Previous Question
            </button>

            <button
              onClick={() => {
                if (currentIndex < questionsList.length - 1) {
                  setCurrentIndex(prev => prev + 1);
                } else {
                  finishQuiz();
                }
              }}
              className="px-6 py-2.5 rounded-xl bg-[#262a2b] text-white text-xs font-bold hover:bg-[#1c2226] flex items-center gap-1.5"
            >
              {currentIndex === questionsList.length - 1 ? 'Finish & See Score' : 'Next Question'}
              <ChevronRight className="w-4 h-4 text-[#faa114]" />
            </button>
          </div>
        </div>
      ) : (
        /* QUIZ RESULT REPORT VIEW */
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#e5e2d9] shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#faa114]/20 text-[#faa114] mx-auto flex items-center justify-center mb-2">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>
              AFCAT Quiz Performance Summary
            </h2>
            <p className="text-sm text-[#786e67]">
              Evaluated strictly according to IAF marking scheme (+3 for correct, -1 for wrong).
            </p>
          </div>

          {/* Scorecards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#fcfcfb] p-5 rounded-2xl border border-[#e5e2d9] text-center">
              <div className="text-xs text-[#786e67] font-medium">Score Obtained</div>
              <div className="text-2xl font-bold text-[#262a2b] mt-1">{stats.totalMarksObtained} / {stats.totalPossibleMarks}</div>
            </div>
            <div className="bg-[#fcfcfb] p-5 rounded-2xl border border-[#e5e2d9] text-center">
              <div className="text-xs text-[#786e67] font-medium">Accuracy</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1">{stats.accuracy}%</div>
            </div>
            <div className="bg-[#fcfcfb] p-5 rounded-2xl border border-[#e5e2d9] text-center">
              <div className="text-xs text-[#786e67] font-medium">Correct / Wrong</div>
              <div className="text-2xl font-bold text-[#262a2b] mt-1">
                <span className="text-emerald-600">{stats.correctCount}</span> / <span className="text-rose-600">{stats.wrongCount}</span>
              </div>
            </div>
            <div className="bg-[#fcfcfb] p-5 rounded-2xl border border-[#e5e2d9] text-center">
              <div className="text-xs text-[#786e67] font-medium">Unattempted</div>
              <div className="text-2xl font-bold text-[#786e67] mt-1">{stats.unattemptedCount}</div>
            </div>
          </div>

          {/* Detailed Question Explanations */}
          <div className="space-y-4 pt-4 border-t border-[#e5e2d9]">
            <h3 className="font-bold text-lg text-[#262a2b]">Solutions & Detailed Explanations</h3>

            <div className="space-y-4">
              {questionsList.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctOptionIndex;
                const isUnattempted = userChoice === undefined;

                return (
                  <div key={q.id} className="p-5 rounded-2xl border border-[#e5e2d9] bg-[#fcfcfb] space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-bold text-sm text-[#262a2b]">Q{idx + 1}. {q.questionText}</h4>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${
                        isCorrect 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : isUnattempted 
                          ? 'bg-gray-100 text-gray-600' 
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {isCorrect ? '+3 Marks' : isUnattempted ? '0 Marks' : '-1 Mark'}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 text-[#786e67]">
                      <div>Your Answer: <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>{userChoice !== undefined ? q.options[userChoice] : 'Unattempted'}</strong></div>
                      <div>Correct Answer: <strong className="text-emerald-700">{q.options[q.correctOptionIndex]}</strong></div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#e5e2d9] text-xs text-[#262a2b] leading-relaxed">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => setQuizActive(false)}
              className="px-8 py-3.5 rounded-2xl bg-[#262a2b] text-white text-xs font-bold hover:bg-[#1c2226] flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-[#faa114]" /> Attempt Another Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
