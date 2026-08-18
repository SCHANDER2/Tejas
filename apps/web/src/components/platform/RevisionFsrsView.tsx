'use client';

import React, { useState } from 'react';
import { 
  RotateCcw, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Brain, 
  Award, 
  ChevronRight, 
  HelpCircle, 
  Eye, 
  Check, 
  Flame 
} from 'lucide-react';

export default function RevisionFsrsView() {
  const [deck, setDeck] = useState([
    {
      id: 1,
      subject: 'Defence GK',
      question: 'Which Indian military operation was launched in 1984 to secure control over the Siachen Glacier in Ladakh?',
      answer: 'Operation Meghdoot (13 April 1984). The Indian Armed Forces pre-emptively secured the Saltoro Ridge and Siachen Glacier.',
      due: 'Today',
      interval: '3 days',
      retention: '94%'
    },
    {
      id: 2,
      subject: 'Numerical Ability',
      question: 'What is the formula for the sum of the first n odd natural numbers?',
      answer: 'Sum = n². For example, 1 + 3 + 5 = 3² = 9.',
      due: 'Today',
      interval: '4 days',
      retention: '88%'
    },
    {
      id: 3,
      subject: 'Indian Polity',
      question: 'Under which Article of the Indian Constitution can the Supreme Court issue writs for enforcement of Fundamental Rights?',
      answer: 'Article 32 (Right to Constitutional Remedies). High Courts issue writs under Article 226.',
      due: 'Today',
      interval: '5 days',
      retention: '96%'
    },
    {
      id: 4,
      subject: 'English Vocabulary',
      question: 'What is the meaning and antonym of the word "EPHEMERAL"?',
      answer: 'Meaning: Lasting for a very short time; transient, fleeting.\nAntonym: Permanent, eternal, everlasting.',
      due: 'Today',
      interval: '2 days',
      retention: '85%'
    },
    {
      id: 5,
      subject: 'Physics Mechanics',
      question: 'State the relation between Escape Velocity (v_e) and Orbital Velocity (v_o) near Earth\'s surface.',
      answer: 'v_e = √2 × v_o (approximately 11.2 km/s vs 7.9 km/s).',
      due: 'Today',
      interval: '6 days',
      retention: '92%'
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [reviewedToday, setReviewedToday] = useState<number>(12);
  const [streakCount, setStreakCount] = useState<number>(14);

  const activeCard = deck[currentIndex];

  const handleRate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    setReviewedToday(prev => prev + 1);
    setShowAnswer(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed current batch
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="dark-container p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <RotateCcw className="w-3.5 h-3.5" /> FSRS Active Recall Algorithm
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Scientific Spaced Repetition Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Based on the Free Spaced Repetition Scheduler (FSRS) algorithm. Review high-yield formulas and concepts exactly when your memory trace is about to decay.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1 text-[#FAA114] font-black text-xl font-display">
                <Flame className="w-5 h-5 fill-[#FAA114]" /> {streakCount}
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Recall Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="light-card p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono font-bold text-[#66625D] uppercase">Cards Due Today</span>
          <div className="text-3xl font-black text-[#1A1D1E] font-display">{deck.length - currentIndex} Left</div>
          <p className="text-[11px] text-[#66625D]">{reviewedToday} reviewed in this session</p>
        </div>

        <div className="light-card p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono font-bold text-[#66625D] uppercase">Retention Stability</span>
          <div className="text-3xl font-black text-emerald-600 font-display">92.8%</div>
          <p className="text-[11px] text-[#66625D]">Optimal memory consolidation</p>
        </div>

        <div className="light-card p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono font-bold text-[#66625D] uppercase">Next Scheduled Review</span>
          <div className="text-3xl font-black text-[#FAA114] font-display">Tomorrow</div>
          <p className="text-[11px] text-[#66625D]">18 new cards queued</p>
        </div>
      </div>

      {/* Interactive Active Card */}
      {activeCard ? (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border-2 border-[#E5E2D9] shadow-lg p-8 sm:p-10 space-y-6 text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-xs border-b border-[#E5E2D9] pb-4">
              <span className="font-mono font-bold px-3 py-1 rounded-full bg-[#FAF3E6] text-[#C88410] border border-[#E8D5B7]">
                {activeCard.subject}
              </span>
              <span className="text-[#66625D] font-mono">
                Card {currentIndex + 1} of {deck.length}
              </span>
            </div>

            <div className="py-6 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1D1E] font-display leading-relaxed">
                {activeCard.question}
              </h3>

              {showAnswer && (
                <div className="p-6 bg-[#F0FDF4] border border-emerald-300 rounded-2xl text-emerald-950 text-sm sm:text-base font-semibold leading-relaxed animate-fadeIn whitespace-pre-line text-left">
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase block mb-1">
                    ✓ Verified Answer & Concept:
                  </span>
                  {activeCard.answer}
                </div>
              )}
            </div>

            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-4 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-sm rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Show Answer (Press Space)</span>
              </button>
            ) : (
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#66625D] uppercase block">
                  Rate Recall Difficulty (FSRS Interval):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleRate('again')}
                    className="py-3 px-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-bold text-xs transition"
                  >
                    <div>Again</div>
                    <div className="text-[10px] font-mono text-red-500 mt-0.5">&lt; 10 min</div>
                  </button>

                  <button
                    onClick={() => handleRate('hard')}
                    className="py-3 px-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl font-bold text-xs transition"
                  >
                    <div>Hard</div>
                    <div className="text-[10px] font-mono text-amber-500 mt-0.5">2 days</div>
                  </button>

                  <button
                    onClick={() => handleRate('good')}
                    className="py-3 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-bold text-xs transition"
                  >
                    <div>Good</div>
                    <div className="text-[10px] font-mono text-blue-500 mt-0.5">4 days</div>
                  </button>

                  <button
                    onClick={() => handleRate('easy')}
                    className="py-3 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-xs transition"
                  >
                    <div>Easy</div>
                    <div className="text-[10px] font-mono text-emerald-500 mt-0.5">7 days</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="light-card p-12 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
          <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-xl font-bold text-[#1A1D1E] font-display">
            All Due Cards Reviewed for Today!
          </h3>
          <p className="text-xs text-[#66625D]">
            Your memory retention index has been synced. Come back tomorrow for your next active recall batch.
          </p>
        </div>
      )}
    </div>
  );
}
