'use client';

import React, { useState } from 'react';
import { 
  AFCAT_EXAM_PATTERN, 
  AFCAT_SUBJECTS, 
  AfcatSubject, 
  AfcatTopic 
} from '../../data/afcatData';
import { 
  Shield, 
  BookOpen, 
  Zap, 
  Brain, 
  Target, 
  CheckCircle2, 
  Play, 
  ExternalLink, 
  Award, 
  HelpCircle,
  Flame,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function AfcatGuide() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('english');

  const selectedSubject = AFCAT_SUBJECTS.find(s => s.id === selectedSubjectId) || AFCAT_SUBJECTS[0];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Mentorship Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1c2226] via-[#262a2b] to-[#343a40] text-white p-8 md:p-10 shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#faa114]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#faa114]/20 border border-[#faa114]/40 text-[#faa114] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Official Mentor Guide 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3" style={{ fontFamily: 'Outfit' }}>
            Air Force Common Admission Test (AFCAT)
          </h1>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            Welcome to your complete, step-by-step AFCAT mentorship hub. Designed specifically to guide you from zero to flying high in the Indian Air Force officer selection.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-xs text-white/60 font-medium">Questions</div>
              <div className="text-xl md:text-2xl font-bold text-[#faa114]">{AFCAT_EXAM_PATTERN.totalQuestions} Qs</div>
            </div>
            <div>
              <div className="text-xs text-white/60 font-medium">Total Marks</div>
              <div className="text-xl md:text-2xl font-bold text-[#faa114]">{AFCAT_EXAM_PATTERN.totalMarks} Marks</div>
            </div>
            <div>
              <div className="text-xs text-white/60 font-medium">Duration</div>
              <div className="text-xl md:text-2xl font-bold text-[#faa114]">{AFCAT_EXAM_PATTERN.durationMinutes} Mins</div>
            </div>
            <div>
              <div className="text-xs text-white/60 font-medium">Target Cutoff</div>
              <div className="text-xl md:text-2xl font-bold text-emerald-400">165+ Marks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Pattern & Marking Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#e5e2d9] shadow-sm hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#faa114]/15 text-[#faa114] flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-[#262a2b] mb-2" style={{ fontFamily: 'Outfit' }}>Marking Scheme</h3>
          <ul className="space-y-2 text-sm text-[#786e67]">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <strong className="text-emerald-700">Correct Answer:</strong> +3 Marks
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <strong className="text-rose-700">Wrong Answer:</strong> -1 Mark
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              <strong>Unattempted:</strong> 0 Marks
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e5e2d9] shadow-sm hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-[#262a2b] mb-2" style={{ fontFamily: 'Outfit' }}>Exam Format</h3>
          <ul className="space-y-2 text-sm text-[#786e67]">
            <li><strong>Mode:</strong> Computer-Based Test (CBT)</li>
            <li><strong>Language:</strong> English Medium Only</li>
            <li><strong>Question Type:</strong> Objective MCQs (4 options)</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e5e2d9] shadow-sm hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center mb-4">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-[#262a2b] mb-2" style={{ fontFamily: 'Outfit' }}>Selection Journey</h3>
          <ol className="space-y-1.5 text-xs text-[#786e67] font-medium">
            {AFCAT_EXAM_PATTERN.selectionProcess.map((step, idx) => (
              <li key={idx} className="bg-[#fcfcfb] p-2 rounded-lg border border-[#e5e2d9]">{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Subject Tabs & Deep Syllabus */}
      <div className="bg-white rounded-3xl border border-[#e5e2d9] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>
              Detailed Syllabus & High-Yield Topics
            </h2>
            <p className="text-sm text-[#786e67] mt-1">
              Select a subject below to view topic breakdown, weightage, and curated YouTube video sources.
            </p>
          </div>
        </div>

        {/* Subject Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {AFCAT_SUBJECTS.map((subject) => {
            const isSelected = subject.id === selectedSubjectId;
            return (
              <button
                key={subject.id}
                onClick={() => setSelectedSubjectId(subject.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[#262a2b] text-white border-[#262a2b] shadow-md scale-[1.02]' 
                    : 'bg-[#fcfcfb] text-[#262a2b] border-[#e5e2d9] hover:border-[#faa114]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 text-[#faa114]' : 'bg-[#faa114]/15 text-[#faa114]'}`}>
                    {getSubjectIcon(subject.iconName)}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-[#faa114] text-[#262a2b]' : 'bg-[#e5e2d9] text-[#786e67]'}`}>
                    {subject.totalQs} Qs
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm leading-snug">{subject.name}</div>
                  <div className={`text-xs mt-1 ${isSelected ? 'text-white/70' : 'text-[#786e67]'}`}>
                    {subject.totalMarks} Marks
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Subject Detail view */}
        <div className="space-y-6">
          {/* YouTube Playlist Banner */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-5 border border-red-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 uppercase tracking-wider">
                  Recommended Learning Playlist
                </div>
                <h4 className="font-bold text-base text-[#262a2b]">{selectedSubject.youtubePlaylist.title}</h4>
                <p className="text-xs text-[#786e67]">
                  By {selectedSubject.youtubePlaylist.channel} • {selectedSubject.youtubePlaylist.videoCount}
                </p>
              </div>
            </div>
            <a
              href={selectedSubject.youtubePlaylist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 shrink-0"
            >
              Watch Free Playlist <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Topics Grid */}
          <div>
            <h3 className="font-bold text-lg text-[#262a2b] mb-4 flex items-center gap-2" style={{ fontFamily: 'Outfit' }}>
              <Flame className="w-5 h-5 text-[#faa114]" /> Topics & Key Concepts ({selectedSubject.topics.length} Modules)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSubject.topics.map((topic) => (
                <div 
                  key={topic.id}
                  className="bg-[#fcfcfb] rounded-2xl p-5 border border-[#e5e2d9] hover:border-[#faa114] transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-base text-[#262a2b]">{topic.name}</h4>
                      <span className="text-xs text-[#786e67] font-medium">Weightage: {topic.weightage}</span>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${
                      topic.importance === 'Critical' 
                        ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                        : topic.importance === 'High'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {topic.importance}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#262a2b]">Must-Master Concepts:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.keyConcepts.map((concept, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-lg bg-white border border-[#e5e2d9] text-[#786e67]">
                          ✓ {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
