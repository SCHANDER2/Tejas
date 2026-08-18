'use client';

import React from 'react';
import { GateBranchId, GateBranchInfo, GATE_BRANCHES } from '../../data/gateData';
import { Cpu, Brain, Flame, Shield, Zap, Radio, Check, ChevronRight } from 'lucide-react';

interface GateBranchSelectorProps {
  selectedBranchId: GateBranchId;
  onSelectBranch: (branchId: GateBranchId) => void;
}

export default function GateBranchSelector({
  selectedBranchId,
  onSelectBranch
}: GateBranchSelectorProps) {
  const getBranchIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Radio': return <Radio className="w-5 h-5 text-blue-400" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">Engineering Stream Selector</span>
          <h3 className="text-base font-bold text-white">Select Your GATE 2026 Target Branch</h3>
          <p className="text-xs text-slate-400">All PYQs, 15 Full Mocks, Sectional Quizzes & Video Playlists will tailor specifically to your stream.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {GATE_BRANCHES.map(branch => {
            const isSelected = branch.id === selectedBranchId;
            return (
              <button
                key={branch.id}
                onClick={() => onSelectBranch(branch.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {branch.code}
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GATE_BRANCHES.map(branch => {
          const isSelected = branch.id === selectedBranchId;
          return (
            <div
              key={branch.id}
              onClick={() => onSelectBranch(branch.id)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-slate-900/90 border-amber-500 ring-2 ring-amber-500/30 shadow-xl scale-[1.01]'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                      {getBranchIcon(branch.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">GATE CODE: {branch.code}</span>
                      <h4 className="font-bold text-sm text-white leading-tight">{branch.shortName}</h4>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {branch.candidatesCount}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {branch.description}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                  <div className="bg-slate-950/60 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">General Cutoff</span>
                    <span className="text-xs font-bold text-amber-400">{branch.generalCutoff}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">OBC / EWS</span>
                    <span className="text-xs font-bold text-blue-400">{branch.obcCutoff}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">SC / ST</span>
                    <span className="text-xs font-bold text-emerald-400">{branch.scStCutoff}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Top PSUs: <strong className="text-slate-300">{branch.psuOpportunities.slice(0, 3).join(', ')}...</strong>
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                  isSelected ? 'text-amber-400' : 'text-slate-500'
                }`}>
                  {isSelected ? 'Active Stream' : 'Switch Stream'} <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
