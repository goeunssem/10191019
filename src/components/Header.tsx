import React from 'react';
import { Volume2, VolumeX, BookOpen, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/sound';

interface HeaderProps {
  currentStep: 'intro' | 'simulation' | 'imessage' | 'result';
  scenarioIndex: number;
  totalScenarios: number;
  onOpenGuide: () => void;
  onReset: () => void;
  onNavigateHome: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  scenarioIndex,
  totalScenarios,
  onOpenGuide,
  onReset,
  onNavigateHome,
  isMuted,
  onToggleSound
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onNavigateHome}
          className="text-left group flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <span className="text-xl">🤝</span>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
            마음공감 시뮬레이터
          </span>
          <span className="hidden md:inline-block text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
            초등 5·6학년 교실
          </span>
        </button>

        {/* Zone 2: 4 clean single-line text links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={onNavigateHome}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            갈등 상황 8선
          </button>
          <button
            onClick={onOpenGuide}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-sky-600"
          >
            <BookOpen className="w-4 h-4" />
            나 전달법 공식
          </button>
          {currentStep !== 'intro' && (
            <div className="text-xs text-slate-500 whitespace-nowrap shrink-0">
              진행: <span className="font-bold text-slate-800">{scenarioIndex + 1}</span> / {totalScenarios}
            </div>
          )}
        </nav>

        {/* Zone 3: Primary action / Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleSound}
            title={isMuted ? '소리 켜기' : '소리 끄기'}
            aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-sky-600" />}
          </button>

          <button
            onClick={onOpenGuide}
            className="sm:hidden p-2 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
            title="나 전달법 공식"
          >
            <BookOpen className="w-5 h-5" />
          </button>

          {currentStep !== 'intro' && (
            <button
              onClick={() => {
                if (window.confirm('처음 화면으로 돌아가시겠습니까? 진행 중인 기록이 초기화됩니다.')) {
                  onReset();
                }
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">처음으로</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
