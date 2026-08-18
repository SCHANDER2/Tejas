'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Target, 
  Clock, 
  Shield, 
  Save, 
  LogOut, 
  CheckCircle,
  Award,
  Sparkles
} from 'lucide-react';

interface ProfileSettingsViewProps {
  onLogout: () => void;
  onTargetExamChanged: (newExamId: string) => void;
  initialProfile?: {
    fullName: string;
    email: string;
    targetExam: string;
    targetYear: string;
    dailyGoal: number;
    phone?: string;
    state?: string;
    prepStatus?: string;
  };
}

export default function ProfileSettingsView({
  onLogout,
  onTargetExamChanged,
  initialProfile
}: ProfileSettingsViewProps) {
  const [fullName, setFullName] = useState(initialProfile?.fullName || 'Priya Sharma');
  const [email, setEmail] = useState(initialProfile?.email || 'priya.sharma@example.com');
  const [phone, setPhone] = useState(initialProfile?.phone || '+91 98765 43210');
  const [targetExam, setTargetExam] = useState(initialProfile?.targetExam || 'afcat');
  const [targetYear, setTargetYear] = useState(initialProfile?.targetYear || '2026');
  const [dailyGoal, setDailyGoal] = useState(initialProfile?.dailyGoal || 120);
  const [stateName, setStateName] = useState(initialProfile?.state || 'Maharashtra');
  const [prepStatus, setPrepStatus] = useState(initialProfile?.prepStatus || 'dedicated');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      fullName,
      email,
      phone,
      targetExam,
      targetYear,
      dailyGoal,
      state: stateName,
      prepStatus
    };
    try {
      localStorage.setItem('tejas_user_profile', JSON.stringify(updated));
      localStorage.setItem('tejas_target_exam', targetExam);
    } catch (err) {
      console.warn('Storage error', err);
    }
    onTargetExamChanged(targetExam);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="dark-container p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF3E6] border border-[#E8D5B7] flex items-center justify-center text-2xl font-black text-[#C88410] font-display">
              {fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#FAA114] uppercase">VERIFIED ASPIRANT</span>
              <h1 className="text-2xl font-black text-white font-display mt-0.5">{fullName}</h1>
              <p className="text-xs text-slate-300 font-mono">{email}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="px-5 py-2.5 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-300 border border-white/20 hover:border-red-400 rounded-xl text-xs font-bold transition flex items-center gap-2 self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Your aspirant profile and exam preferences were successfully updated!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="light-card p-6 sm:p-8 rounded-3xl space-y-6">
        <h3 className="font-bold text-lg text-[#1A1D1E] font-display border-b border-[#E5E2D9] pb-4">
          Aspirant Details & Examination Target
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A1D1E] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#66625D]" /> Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A1D1E] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#66625D]" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A1D1E] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#66625D]" /> WhatsApp Mobile Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A1D1E] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#66625D]" /> State / UT in India
            </label>
            <input
              type="text"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              placeholder="e.g. Maharashtra, Uttar Pradesh, Delhi"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5E2D9] space-y-4">
          <h4 className="font-bold text-sm text-[#1A1D1E]">Exam & Study Goal Settings</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1D1E]">Target Examination</label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] font-bold focus:outline-none focus:border-[#FAA114]"
              >
                <option value="afcat">✈️ AFCAT 2026 (Air Force)</option>
                <option value="gate">⚡ GATE 2026 (Engineering)</option>
                <option value="cds">🛡️ UPSC CDS (IMA / OTA)</option>
                <option value="nda">⚔️ UPSC NDA & NA (Defence)</option>
                <option value="jee_mains">⚛️ JEE Main & Advanced</option>
                <option value="neet">🩺 NEET UG (Medical)</option>
                <option value="upsc">🏛️ UPSC CSE (Civil Services)</option>
                <option value="ssc_cgl">📋 SSC CGL (Govt Jobs)</option>
                <option value="cat">📊 CAT (IIMs B-Schools)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1D1E]">Target Year</label>
              <select
                value={targetYear}
                onChange={(e) => setTargetYear(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
              >
                <option value="2026">2026 (Current Cycle)</option>
                <option value="2027">2027 (Next Year)</option>
                <option value="2028">2028 (Long-term Prep)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1D1E]">Daily Goal (Minutes)</label>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
              >
                <option value="60">60 mins (1 hour / day)</option>
                <option value="120">120 mins (2 hours / day)</option>
                <option value="180">180 mins (3 hours / day)</option>
                <option value="240">240 mins (4 hours / day)</option>
                <option value="360">360 mins (6 hours / day)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5E2D9] flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
