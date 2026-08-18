'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Search, 
  ExternalLink, 
  Sparkles, 
  CheckCircle, 
  ChevronRight,
  Play,
  Award,
  Layers,
  Bookmark
} from 'lucide-react';

interface LearningHubViewProps {
  onNavigateExam?: (examId: string) => void;
}

export default function LearningHubView({ onNavigateExam }: LearningHubViewProps) {
  const [activeSubject, setActiveSubject] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<any | null>(null);

  const conceptNotes = [
    {
      id: 1,
      title: 'Time, Speed & Distance: Relative Speed & Train Problems',
      subject: 'maths',
      subjectName: 'Numerical Ability / Quant',
      examTag: 'AFCAT / CDS / SSC',
      reads: '14.2k reads',
      readTime: '8 min read',
      summary: 'Master relative speed concepts: Same Direction: \(S_1 - S_2\), Opposite Direction: \(S_1 + S_2\). Formula for crossing a platform: \(\text{Time} = \frac{L_{\text{train}} + L_{\text{platform}}}{\text{Speed}}\).',
      content: `
### Relative Speed Core Principles:
1. **Opposite Direction (Towards each other):**
   Relative Speed = $S_1 + S_2$
   Time to meet = $\\frac{\\text{Total Distance}}{S_1 + S_2}$

2. **Same Direction (Chasing scenario):**
   Relative Speed = $S_1 - S_2$ (where $S_1 > S_2$)
   Time to overtake = $\\frac{\\text{Initial Distance Separation}}{S_1 - S_2}$

3. **Units Conversion Rule:**
   - From $\\text{km/h}$ to $\\text{m/s}$: Multiply by $\\frac{5}{18}$
   - From $\\text{m/s}$ to $\\text{km/h}$: Multiply by $\\frac{18}{5}$

### Standard Question Archetypes:
- **Case 1: Train crossing a pole/person (negligible length):**
  Distance covered = Length of Train ($L_T$)
  $\\text{Time} = \\frac{L_T}{\\text{Speed of Train}}$

- **Case 2: Train crossing a platform/bridge/tunnel of length $L_P$:**
  Distance covered = $L_T + L_P$
  $\\text{Time} = \\frac{L_T + L_P}{\\text{Speed of Train}}$
      `
    },
    {
      id: 2,
      title: 'Indian Constitution: Fundamental Rights & Writs (Articles 12-35)',
      subject: 'gk',
      subjectName: 'Polity & Defence GK',
      examTag: 'UPSC / CDS / AFCAT',
      reads: '28.5k reads',
      readTime: '12 min read',
      summary: 'Summary of 6 Fundamental Rights: Right to Equality (14-18), Freedom (19-22), Against Exploitation (23-24), Freedom of Religion (25-28), Cultural & Educational (29-30), Constitutional Remedies (Article 32 - Heart and Soul).',
      content: `
### Article 32: Five Constitutional Writs:
1. **Habeas Corpus ("To have the body of"):** Protects individual liberty against arbitrary detention. Issued against public authorities as well as private individuals.
2. **Mandamus ("We command"):** Commands a public official or statutory body to perform an official duty they have failed or refused to perform. Cannot be issued against President or Governors.
3. **Prohibition ("To forbid"):** Issued by higher courts (SC/HC) to lower courts or tribunals to prevent them from exceeding their jurisdiction.
4. **Certiorari ("To be certified"):** Issued by higher courts to quash an order already passed by a lower court/tribunal without jurisdiction.
5. **Quo-Warranto ("By what authority"):** Enquires into the legality of the claim of a person to a public office.
      `
    },
    {
      id: 3,
      title: 'Thermodynamics: Laws, Carnot Engine & Entropy Equations',
      subject: 'physics',
      subjectName: 'Engineering & Medical Physics',
      examTag: 'JEE / GATE / NEET',
      reads: '19.8k reads',
      readTime: '10 min read',
      summary: 'Zeroth Law (Thermal equilibrium), First Law (\(dQ = dU + dW\)), Second Law (Clausius & Kelvin-Planck), Carnot Efficiency: \(\eta = 1 - \frac{T_C}{T_H}\).',
      content: `
### Thermodynamic Principles:
- **First Law of Thermodynamics:**
  $$dQ = dU + dW = nC_v dT + P dV$$

- **Carnot Engine Maximum Efficiency:**
  $$\\eta = 1 - \\frac{T_L}{T_H} = \\frac{W}{Q_H}$$
  Where $T_L$ and $T_H$ must always be in **Kelvin (K)**.

- **Entropy Change ($dS$):**
  $$dS = \\frac{dQ_{\\text{rev}}}{T}$$
  For an isolated system in an irreversible process, $dS_{\\text{universe}} > 0$.
      `
    },
    {
      id: 4,
      title: 'Organic Chemistry: High-Yield Name Reactions & Mechanisms',
      subject: 'chemistry',
      subjectName: 'Chemistry Core',
      examTag: 'NEET / JEE',
      reads: '22.1k reads',
      readTime: '15 min read',
      summary: 'Aldol Condensation, Cannizzaro Reaction, Reimer-Tiemann, Kolbe Reaction, Wurtz-Fittig, and Friedel-Crafts Acylation with electron-donating and withdrawing groups.',
      content: `
### Crucial Name Reactions:
1. **Aldol Condensation:** Carbonyl compounds having at least one $\\alpha$-hydrogen undergo reaction in the presence of dilute $\\text{NaOH}$ to form $\\beta$-hydroxy aldehydes.
2. **Cannizzaro Reaction:** Aldehydes having **NO $\\alpha$-hydrogen** (e.g., $\\text{HCHO}$, $\\text{C}_6\\text{H}_5\\text{CHO}$) undergo self-oxidation and reduction in concentrated alkali.
3. **Reimer-Tiemann Reaction:** Phenol reacts with $\\text{CHCl}_3$ and aqueous $\\text{NaOH}$ at $340\\text{ K}$ followed by hydrolysis to give Salicylaldehyde.
      `
    },
  ];

  const videoPlaylists = [
    { title: 'AFCAT 2026 Complete Mathematics Series', channel: 'Defence Wallah', videos: '42 Videos', url: 'https://youtube.com', color: '#FAA114' },
    { title: 'UPSC CDS General Knowledge Comprehensive', channel: 'Unacademy Defence', videos: '58 Videos', url: 'https://youtube.com', color: '#22C55E' },
    { title: 'GATE CS Data Structures & Algorithms', channel: 'Gate Smashers', videos: '64 Videos', url: 'https://youtube.com', color: '#6366F1' },
    { title: 'JEE Main Physics Mechanics & Electrodynamics', channel: 'Physics Galaxy', videos: '85 Videos', url: 'https://youtube.com', color: '#3B82F6' },
  ];

  const filteredNotes = conceptNotes.filter(n => {
    const matchesSub = activeSubject === 'all' || n.subject === activeSubject;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.examTag.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSub && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="dark-container p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> High-Yield Knowledge Vault
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Learning Hub & Concept Masterclass
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Concise formula sheets, high-yield topic summaries, and curated video masterclasses designed for fast revision before national examinations.
          </p>
        </div>
      </div>

      {/* Note Reader Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E2D9] my-8 animate-fadeInUp">
            <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF3E6] text-[#C88410] border border-[#E8D5B7]">
                  {selectedNote.examTag}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1D1E] font-display mt-1">
                  {selectedNote.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-xs font-bold text-[#66625D] hover:text-[#1A1D1E] p-2"
              >
                ✕ Close
              </button>
            </div>

            <div className="text-xs sm:text-sm text-[#1A1D1E] leading-relaxed space-y-3 whitespace-pre-line font-sans max-h-[60vh] overflow-y-auto">
              {selectedNote.content}
            </div>

            <div className="pt-4 border-t border-[#E5E2D9] flex justify-between items-center">
              <span className="text-xs text-[#66625D] font-mono">{selectedNote.readTime}</span>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-5 py-2.5 bg-[#FAA114] text-[#1A1D1E] font-bold text-xs rounded-xl hover:bg-[#E8940F] transition"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {[
            { id: 'all', label: 'All Subjects' },
            { id: 'maths', label: '🔢 Numerical & Quant' },
            { id: 'gk', label: '🏛️ Polity & GK' },
            { id: 'physics', label: '⚛️ Physics' },
            { id: 'chemistry', label: '🧪 Chemistry' },
          ].map(sub => (
            <button
              key={sub.id}
              onClick={() => setActiveSubject(sub.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeSubject === sub.id
                  ? 'bg-[#1A1D1E] text-white shadow-sm'
                  : 'bg-white text-[#66625D] border border-[#E5E2D9] hover:bg-[#F5F4F0]'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>

        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search concepts, formulas, topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
          />
          <Search className="w-4 h-4 text-[#66625D] absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.map(note => (
          <div key={note.id} className="light-card p-6 rounded-3xl flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF3E6] text-[#C88410] border border-[#E8D5B7]">
                  {note.examTag}
                </span>
                <span className="text-xs text-[#66625D] font-mono">{note.readTime}</span>
              </div>

              <h3 className="font-bold text-base text-[#1A1D1E] font-display group-hover:text-[#FAA114] transition-colors">
                {note.title}
              </h3>

              <p className="text-xs text-[#66625D] leading-relaxed line-clamp-2">
                {note.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5E2D9] flex items-center justify-between">
              <span className="text-[11px] text-[#66625D] font-mono">{note.reads}</span>
              <button
                onClick={() => setSelectedNote(note)}
                className="px-4 py-2 bg-[#FAF3E6] hover:bg-[#FAA114] text-[#C88410] hover:text-[#1A1D1E] font-bold text-xs rounded-xl border border-[#E8D5B7] transition flex items-center gap-1.5"
              >
                <span>Read Notes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Masterclasses */}
      <div className="light-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
              <Video className="w-5 h-5 text-[#FAA114]" /> Verified Educator Video Masterclasses
            </h3>
            <p className="text-xs text-[#66625D]">Structured syllabus playlists from top Indian teachers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videoPlaylists.map((vp, idx) => (
            <div key={idx} className="p-4 bg-[#F5F4F0] border border-[#E5E2D9] rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-white bg-red-600 px-2 py-0.5 rounded">
                  {vp.videos}
                </span>
                <h4 className="font-bold text-xs text-[#1A1D1E] mt-1">{vp.title}</h4>
                <p className="text-[11px] text-[#66625D]">{vp.channel}</p>
              </div>

              <a
                href={vp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-white hover:bg-[#FAF3E6] border border-[#E5E2D9] text-[#1A1D1E] font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 transition"
              >
                <Play className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                <span>Watch Playlist</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
