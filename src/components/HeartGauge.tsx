import React from 'react';
import { Heart } from 'lucide-react';

interface HeartGaugeProps {
  heartLevel: number; // 0 to 100
  delta: number | null;
  friendName: string;
  friendAvatar: string;
  mood?: 'happy' | 'touched' | 'shocked' | 'angry' | 'sulking' | 'awkward';
}

export const HeartGauge: React.FC<HeartGaugeProps> = ({
  heartLevel,
  delta,
  friendName,
  friendAvatar,
  mood = 'awkward'
}) => {
  // Clamped heart value
  const clamped = Math.max(0, Math.min(100, heartLevel));

  const getMoodEmoji = () => {
    switch (mood) {
      case 'touched':
      case 'happy':
        return '😊';
      case 'angry':
        return '😡';
      case 'shocked':
        return '😱';
      case 'sulking':
        return '😒';
      case 'awkward':
      default:
        return '😐';
    }
  };

  const getHeartStatusText = () => {
    if (clamped >= 80) return '마음이 열리고 진심으로 화해할 준비가 되었어요';
    if (clamped >= 60) return '차분하게 대화를 나누며 생각을 바꾸고 있어요';
    if (clamped >= 40) return '어색하고 혼란스러워하며 마음을 닫을까 고민해요';
    if (clamped >= 20) return '상처받고 화가 나서 억울한 마음이 커졌어요';
    return '마음에 깊은 상처를 입고 대화를 거부하고 싶어요';
  };

  const getGaugeColor = () => {
    if (clamped >= 70) return 'bg-gradient-to-r from-rose-400 to-rose-500';
    if (clamped >= 45) return 'bg-gradient-to-r from-amber-400 to-amber-500';
    return 'bg-gradient-to-r from-slate-400 to-red-500';
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4 mb-3">
        {/* Friend avatar & name */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
              {friendAvatar}
            </div>
            <span
              className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full border border-slate-200 w-5 h-5 flex items-center justify-center shadow-xs"
              title={mood}
            >
              {getMoodEmoji()}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm sm:text-base">
                {friendName}의 마음 하트 게이지
              </span>
              {delta !== null && delta !== 0 && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full animate-bounce ${
                    delta > 0
                      ? 'bg-rose-100 text-rose-600 border border-rose-200'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {delta > 0 ? `+${delta}%` : `${delta}%`}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{getHeartStatusText()}</p>
          </div>
        </div>

        {/* Heart number indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Heart
            className={`w-6 h-6 transition-transform duration-300 ${
              clamped >= 60 ? 'text-rose-500 fill-rose-500 scale-110' : 'text-slate-400 fill-slate-300'
            }`}
          />
          <span className="text-xl sm:text-2xl font-black tabular-nums text-slate-800">
            {clamped}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-300/60 shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getGaugeColor()}`}
          style={{ width: `${clamped}%` }}
        />
      </div>

      {/* Ticks */}
      <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 px-0.5">
        <span>0% (냉전·분노)</span>
        <span>50% (평상시)</span>
        <span>100% (완전한 공감)</span>
      </div>
    </div>
  );
};
