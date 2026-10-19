import React, { useState } from 'react';
import { ConflictStyle, CONFLICT_STYLES_INFO, SCENARIOS } from '../data/scenarios';
import { CertificateModal } from './CertificateModal';
import { sounds } from '../utils/sound';
import { Award, RotateCcw, Heart, CheckCircle2, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

interface ResultScreenProps {
  studentName: string;
  selectedAvatar: string;
  chosenStyles: ConflictStyle[];
  heartScores: number[];
  onRestart: () => void;
  onOpenGuide: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  studentName,
  selectedAvatar,
  chosenStyles,
  heartScores,
  onRestart,
  onOpenGuide
}) => {
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [expandedScenarioId, setExpandedScenarioId] = useState<number | null>(null);

  // Calculate style counts
  const styleCounts: Record<ConflictStyle, number> = {
    tiger: 0,
    hedgehog: 0,
    rabbit: 0,
    dolphin: 0
  };

  chosenStyles.forEach((style) => {
    if (styleCounts[style] !== undefined) {
      styleCounts[style] += 1;
    }
  });

  const totalChoices = chosenStyles.length || 1;

  // Determine dominant style
  let dominantStyle: ConflictStyle = 'dolphin';
  let maxCount = -1;
  (Object.keys(styleCounts) as ConflictStyle[]).forEach((key) => {
    if (styleCounts[key] > maxCount) {
      maxCount = styleCounts[key];
      dominantStyle = key;
    }
  });

  const dominantInfo = CONFLICT_STYLES_INFO[dominantStyle];

  // Average heart score
  const avgHeart =
    heartScores.length > 0
      ? Math.round(heartScores.reduce((acc, curr) => acc + curr, 0) / heartScores.length)
      : 80;

  const toggleAccordion = (id: number) => {
    sounds.playPop();
    setExpandedScenarioId(expandedScenarioId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>시뮬레이션 종합 진단 리포트</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {studentName} 님의 <span className="text-sky-600">갈등 대처 유형</span> 분석 결과
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          8가지 교실 속 갈등 상황에서 내가 주로 선택한 해결 방식과 상대방 친구의 마음을 종합 분석했습니다.
        </p>
      </div>

      {/* Main Dominant Style Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left border-b border-slate-100 pb-6">
          <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center text-5xl shrink-0 shadow-inner border border-slate-200">
            {dominantInfo.animal}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                주요 대처 유형
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {totalChoices}개 상황 중 {styleCounts[dominantStyle]}회 선택
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {dominantInfo.name}
            </h2>

            <p className="text-sm font-semibold text-slate-600 italic">
              {dominantInfo.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {dominantInfo.summary}
            </p>
          </div>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              상대 친구들의 마음 평균
            </span>
            <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-rose-500">
              <Heart className="w-5 h-5 fill-rose-500" />
              <span>{avgHeart}%</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              체험한 갈등 상황
            </span>
            <div className="text-2xl font-black text-slate-800">
              8 / 8 완료
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              '나 전달법' 마스터 등급
            </span>
            <div className="flex items-center justify-center gap-1 text-2xl font-black text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
              <span>우수 실천가</span>
            </div>
          </div>
        </div>

        {/* Detailed Strength, Caution, Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              💪 나의 빛나는 강점
            </span>
            <p className="text-xs text-emerald-950 leading-relaxed font-medium">
              {dominantInfo.strength}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
              ⚠️ 주의할 점
            </span>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              {dominantInfo.caution}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-1.5">
            <span className="text-xs font-bold text-sky-800 flex items-center gap-1">
              💡 실천 솔루션 팁
            </span>
            <p className="text-xs text-sky-950 leading-relaxed font-medium">
              {dominantInfo.solutionTip}
            </p>
          </div>
        </div>

        {/* Action Button: Open Certificate */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            * 8가지 상황을 모두 완료한 {studentName} 님에게 마스터 수료증이 발급되었습니다.
          </p>
          <button
            onClick={() => {
              sounds.playFanfare();
              setIsCertificateOpen(true);
            }}
            className="w-full sm:w-auto py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>갈등 해결 마스터 수료증 확인 & 출력</span>
          </button>
        </div>
      </div>

      {/* 4 Conflict Styles Breakdown Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-900">
          나의 4가지 갈등 해결 성향 비율
        </h3>

        <div className="space-y-4">
          {(Object.keys(CONFLICT_STYLES_INFO) as ConflictStyle[]).map((key) => {
            const info = CONFLICT_STYLES_INFO[key];
            const count = styleCounts[key];
            const percentage = Math.round((count / totalChoices) * 100);

            return (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{info.animal}</span>
                    <span className="font-bold text-slate-800">{info.name}</span>
                  </div>
                  <span className="font-bold tabular-nums text-slate-600">
                    {count}회 ({percentage}%)
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      key === 'dolphin'
                        ? 'bg-sky-500'
                        : key === 'tiger'
                        ? 'bg-amber-500'
                        : key === 'hedgehog'
                        ? 'bg-purple-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mind Traffic Light Rule (마음 신호등 3초 멈춤법) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚦</span>
          <h3 className="text-base font-bold text-slate-900">
            초등 5·6학년을 위한 실전 마음 신호등 3단계
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-red-200 bg-red-50/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500" />
              <span className="font-bold text-red-950 text-xs sm:text-sm">1. 빨간불: 멈추기 (Stop)</span>
            </div>
            <p className="text-xs text-red-900/80 leading-relaxed">
              화가 솟구칠 때 즉시 말을 뱉거나 주먹을 쥐지 않고, 숨을 깊게 들이쉬며 3초간 입을 다물어요.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
              <span className="font-bold text-amber-950 text-xs sm:text-sm">2. 노란불: 생각하기 (Think)</span>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              ‘내가 지금 진짜 속상한 이유는 뭘까? 친구의 입장은 어땠을까?’ 상황을 한 걸음 물러나 바라봐요.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
              <span className="font-bold text-emerald-950 text-xs sm:text-sm">3. 초록불: 말하기 (Speak)</span>
            </div>
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              비난(너 전달법)을 빼고, ‘네가 ~할 때 난 ~해서 속상했어. 앞으로 ~해줘(나 전달법)’로 말해요.
            </p>
          </div>
        </div>
      </div>

      {/* Review All 8 Scenarios Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              8가지 상황별 모범 '나 전달법' 복습하기
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              각 상황을 누르면 가장 효과적이었던 모범 대화 문장을 다시 볼 수 있어요.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {SCENARIOS.map((sc) => {
            const isExpanded = expandedScenarioId === sc.id;
            return (
              <div
                key={sc.id}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(sc.id)}
                  className="w-full p-4 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{sc.friend.avatar}</span>
                    <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      상황 {sc.id}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {sc.title} ({sc.friend.name})
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-white border-t border-slate-200 space-y-3 animate-in fade-in duration-200">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <strong>상황:</strong> {sc.situation}
                    </p>
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <span className="text-xs font-bold text-emerald-800 block mb-1">
                        🌟 모범 나 전달법 공식:
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-emerald-950 leading-relaxed">
                        {sc.iMessage.idealSentence}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      💡 {sc.iMessage.resolutionSummary}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Restart & Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => {
            sounds.playPop();
            onRestart();
          }}
          className="w-full sm:w-auto py-3.5 px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>시뮬레이션 다시 도전하기</span>
        </button>

        <button
          onClick={onOpenGuide}
          className="w-full sm:w-auto py-3.5 px-6 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>나 전달법 비법 가이드 다시 보기</span>
        </button>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={studentName}
        dominantStyle={dominantStyle}
        completedCount={totalChoices}
      />
    </div>
  );
};
