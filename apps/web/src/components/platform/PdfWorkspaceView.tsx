'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Send, 
  Upload, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  BookOpen, 
  CheckCircle,
  HelpCircle,
  Brain,
  MessageSquare
} from 'lucide-react';

export default function PdfWorkspaceView() {
  const [selectedDoc, setSelectedDoc] = useState<string>('afcat_2025');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: 'Namaste! I am your Tejas AI Document Tutor. I have indexed the active examination paper. You can ask me to explain any complex mathematical derivation, extract high-yield formulas, or generate instant practice questions from this PDF!',
      time: 'Just now'
    }
  ]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const documentPresets: Record<string, { title: string; pages: number; agency: string; year: string; sampleContent: string[] }> = {
    afcat_2025: {
      title: 'AFCAT 02/2025 Official Question Paper (Shift 1)',
      pages: 8,
      agency: 'Indian Air Force / CDAC',
      year: '2025',
      sampleContent: [
        `INDIAN AIR FORCE — AFCAT 02/2025 QUESTION PAPER (SHIFT 1)
SECTION A: VERBAL ABILITY IN ENGLISH
Q1. Select the most appropriate synonym for the underlined word:
    The general delivered a TRENCHANT critique of the outdated operational doctrine.
    (A) Superficial  (B) Incisive  (C) Ambiguous  (D) Lenient
    [Correct: B - Incisive, meaning sharp, vigorous, and keenly articulate]

Q2. Find the error in the sentence:
    Neither the flight commander (A) / nor the navigators (B) / was present in the briefing room (C) / No error (D)
    [Correct: C - 'were present' according to proximity rule]

SECTION B: NUMERICAL ABILITY
Q3. Two fighter jets A and B take off towards each other from airbases 720 km apart at speeds of 640 km/h and 800 km/h respectively. After what time will they cross each other?
    (A) 30 min  (B) 36 min  (C) 45 min  (D) 25 min
    [Derivation: Relative Speed = 640 + 800 = 1440 km/h. Time = 720 / 1440 = 0.5 hours = 30 minutes]`,

        `SECTION C: REASONING & MILITARY APTITUDE
Q4. Complete the series: 7, 13, 25, 49, 97, ?
    Pattern: Each term is (Previous × 2) - 1.
    Next term: (97 × 2) - 1 = 194 - 1 = 193.

Q5. Which country recently inducted the S-400 Triumf surface-to-air missile squadrons with designated code name 'Sudarshan Chakra'?
    (A) Egypt  (B) India  (C) UAE  (D) Vietnam
    [Correct: B - Indian Air Force]`,
      ]
    },
    cds_2025: {
      title: 'UPSC CDS II 2025 General Knowledge & English',
      pages: 12,
      agency: 'Union Public Service Commission',
      year: '2025',
      sampleContent: [
        `UPSC COMBINED DEFENCE SERVICES (II) 2025
GENERAL KNOWLEDGE PAPER
Q1. With reference to the Indian Ocean Naval Symposium (IONS), consider the following statements:
    1. It was initiated by the Indian Navy in 2008.
    2. It seeks to increase maritime cooperation among navies of the littoral states of the IOR.
    Which of the statements given above is/are correct?
    (A) 1 only  (B) 2 only  (C) Both 1 and 2  (D) Neither 1 nor 2
    [Correct: C - Both 1 and 2]`,
      ]
    },
    gate_2025: {
      title: 'GATE 2025 Computer Science & Information Technology',
      pages: 16,
      agency: 'IIT Roorkee / IISc',
      year: '2025',
      sampleContent: [
        `GRADUATE APTITUDE TEST IN ENGINEERING 2025
COMPUTER SCIENCE & INFORMATION TECHNOLOGY (CS)
Q1. (NAT) Consider a max-heap with 1023 distinct elements. The minimum number of comparisons required to find the maximum element is _______.
    [Answer: 0 - The maximum element is always at the root of a max-heap, requiring zero comparisons.]

Q2. (MSQ) Which of the following regular expressions correspond to the language of all binary strings with an even number of 0s?
    (A) (1*01*01*)*  (B) (1 | 01*0)*  (C) (00 | 1)*  (D) (1*01*0)*1*`,
      ]
    }
  };

  const activeDocData = documentPresets[selectedDoc] || documentPresets.afcat_2025;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const newMessages = [
      ...messages,
      { role: 'user' as const, text: userText, time: 'Just now' }
    ];
    setMessages(newMessages);
    setChatInput('');
    setIsGenerating(true);

    setTimeout(() => {
      let aiReply = `Based on page ${currentPage} of ${activeDocData.title}:\n\n`;
      if (userText.toLowerCase().includes('quiz') || userText.toLowerCase().includes('question')) {
        aiReply += `🎯 Practice Question Generated from Document:\n**Q:** If fighter jet A increases speed by 25% (to 800 km/h) and fighter jet B maintains 800 km/h over the 720 km distance, what is the new crossing time?\n**Solution:** Relative speed = 800 + 800 = 1600 km/h. Time = 720 / 1600 = 0.45 hrs = 27 minutes.`;
      } else if (userText.toLowerCase().includes('formula') || userText.toLowerCase().includes('math')) {
        aiReply += `📐 Extracted Mathematical Principle:\n- Relative Speed (Opposite Direction) = $S_1 + S_2$\n- Time = $\\frac{\\text{Separation Distance}}{S_1 + S_2}$\n- Units: Multiply $\\text{km/h} \\times \\frac{5}{18}$ to convert to $\\text{m/s}$.`;
      } else {
        aiReply += `Here is the concise explanation: The highlighted question tests the relative velocity principle in 1D kinematics under constant speed. Since the vehicles are closing distance from opposite directions, their velocities vectorially sum up, reducing crossing time directly proportional to $(S_1 + S_2)$.`;
      }

      setMessages([
        ...newMessages,
        { role: 'assistant', text: aiReply, time: 'Just now' }
      ]);
      setIsGenerating(false);
    }, 600);
  };

  const triggerQuickPrompt = (prompt: string) => {
    setChatInput(prompt);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Controls Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E2D9] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FAA114]" />
            <span className="text-xs font-bold text-[#1A1D1E]">Active Document:</span>
          </div>

          <select
            value={selectedDoc}
            onChange={(e) => { setSelectedDoc(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 bg-[#F5F4F0] border border-[#E5E2D9] rounded-xl text-xs font-bold text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
          >
            <option value="afcat_2025">✈️ AFCAT 02/2025 Official Paper</option>
            <option value="cds_2025">🛡️ UPSC CDS II 2025 GK Paper</option>
            <option value="gate_2025">⚡ GATE 2025 CS Engineering Paper</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setZoomLevel(prev => Math.max(75, prev - 10))}
            className="p-2 bg-[#F5F4F0] hover:bg-[#E5E2D9] rounded-lg text-xs font-bold"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 text-[#66625D]" />
          </button>
          <span className="text-xs font-mono font-bold text-[#66625D] px-2">{zoomLevel}%</span>
          <button 
            onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
            className="p-2 bg-[#F5F4F0] hover:bg-[#E5E2D9] rounded-lg text-xs font-bold"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 text-[#66625D]" />
          </button>
        </div>
      </div>

      {/* Split Pane: Left Document Viewer / Right AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[650px]">
        
        {/* Left Pane (7 cols): Document Reader */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5E2D9] shadow-sm flex flex-col justify-between overflow-hidden">
          <div className="p-4 bg-[#FAF3E6] border-b border-[#E8D5B7] flex items-center justify-between">
            <span className="text-xs font-bold text-[#C88410] font-mono">
              PAGE {currentPage} OF {activeDocData.pages} • {activeDocData.agency}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-white disabled:opacity-40 border border-[#E8D5B7] rounded-lg text-xs font-bold text-[#1A1D1E]"
              >
                Previous Page
              </button>
              <button
                disabled={currentPage >= activeDocData.pages}
                onClick={() => setCurrentPage(prev => Math.min(activeDocData.pages, prev + 1))}
                className="px-3 py-1 bg-[#FAA114] disabled:opacity-40 text-[#1A1D1E] rounded-lg text-xs font-bold shadow-sm"
              >
                Next Page
              </button>
            </div>
          </div>

          <div 
            className="p-6 sm:p-8 flex-1 overflow-y-auto font-mono text-xs sm:text-sm text-[#1A1D1E] leading-relaxed whitespace-pre-wrap selection:bg-[#FAA114]/30"
            style={{ fontSize: `${(13 * zoomLevel) / 100}px` }}
          >
            {activeDocData.sampleContent[currentPage - 1] || activeDocData.sampleContent[0]}
          </div>

          <div className="p-3 bg-[#F5F4F0] border-t border-[#E5E2D9] text-[11px] text-[#66625D] text-center font-mono">
            Document Ingested into Tejas Neural Vector Index • Highlight or ask AI questions
          </div>
        </div>

        {/* Right Pane (5 cols): AI Study Tutor */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E5E2D9] shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Tutor Header */}
          <div className="p-4 bg-[#1A1D1E] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FAA114] text-[#1A1D1E] flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div>
                <h4 className="text-xs font-bold font-display">Dedicated AI Study Tutor</h4>
                <p className="text-[10px] text-slate-300 font-mono">Real-time Document Intelligence</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          {/* Chat Messages */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3.5 max-h-[480px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl text-xs max-w-[90%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#FAA114] text-[#1A1D1E] font-medium'
                      : 'bg-[#F5F4F0] text-[#1A1D1E] border border-[#E5E2D9]'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
                <span className="text-[10px] text-[#66625D] font-mono mt-1 px-1">{m.time}</span>
              </div>
            ))}
            {isGenerating && (
              <div className="p-3 bg-[#F5F4F0] rounded-2xl text-xs text-[#66625D] font-mono animate-pulse">
                ✦ AI Tutor is analyzing document context and formulating response...
              </div>
            )}
          </div>

          {/* Quick Action Chips & Input Form */}
          <div className="p-4 border-t border-[#E5E2D9] bg-[#FAFAF8] space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {[
                '⚡ Generate Quiz Questions',
                '📐 Extract Core Formulas',
                '💡 Explain Relative Speed',
              ].map((chip, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => triggerQuickPrompt(chip)}
                  className="px-2.5 py-1 bg-white hover:bg-[#FAF3E6] border border-[#E5E2D9] rounded-lg text-[11px] font-semibold text-[#1A1D1E] transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask anything about this document..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold rounded-xl text-xs shadow-sm transition active:scale-95 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
