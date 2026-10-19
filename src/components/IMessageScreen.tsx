import React, { useState } from 'react';
import { Scenario, IMessageStep, IMessageBlankItem } from '../data/scenarios';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, BookOpen, Volume2, Heart } from 'lucide-react';

interface IMessageScreenProps {
  scenario: Scenario;
  scenarioIndex: number;
  totalScenarios: number;
  studentName: string;
  onCompleteScenario: (imessageAccuracy: boolean) => void;
  onOpenGuide: () => void;
}

export const IMessageScreen: React.FC<IMessageScreenProps> = ({
  scenario,
  scenarioIndex,
  totalScenarios,
  studentName,
  onCompleteScenario,
  onOpenGuide
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [attemptFeedback, setAttemptFeedback] = useState<{
    isCorrect: boolean;
    hint: string;
    optionId: string;
  } | null>(null);
  const [isCompletedAll, setIsCompletedAll] = useState<boolean>(false);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);

  const steps = scenario.iMessage.steps;
  const currentStep = steps[currentStepIndex];

  const handleSelectOption = (option: IMessageBlankItem) => {
    if (option.isCorrect) {
      sounds.playCorrect();
      setAttemptFeedback({
        isCorrect: true,
        hint: option.hint,
        optionId: option.id
      });
      const newAnswers = { ...selectedAnswers, [currentStep.stepNumber]: option.label };
      setSelectedAnswers(newAnswers);

      // Check if this was the last step
      if (currentStepIndex < steps.length - 1) {
        setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
          setAttemptFeedback(null);
        }, 1200);
      } else {
        setTimeout(() => {
          setIsCompletedAll(true);
          sounds.playFanfare();
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch {
            // Ignore confetti errors
          }
        }, 1000);
      }
    } else {
      sounds.playWrong();
      setAttemptFeedback({
        isCorrect: false,
        hint: option.hint,
        optionId: option.id
      });
    }
  };

  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scenario.iMessage.idealSentence);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.95;
      setIsReadingAloud(true);
      utterance.onend = () => setIsReadingAloud(false);
      utterance.onerror = () => setIsReadingAloud(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFinish = () => {
    sounds.playPop();
    onCompleteScenario(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
            상황 {scenarioIndex + 1} 나 전달법 트레이닝
          </span>
          <span className="text-slate-400">·</span>
          <span>{scenario.title}</span>
        </div>
        <button
          onClick={onOpenGuide}
          className="text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>3단계 공식 힌트</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>빈칸 채우기 대화 훈련</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            '{scenario.friend.name}'에게 내 마음을 상처 없이 전하는 '나 전달법' 완성하기
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            비난과 공격 대신, <strong>사실(상황) → 내 감정 → 구체적 바람</strong>을 차례대로 골라 완벽한 문장을 조립해 보세요.
          </p>
        </div>

        {/* Live Sentence Building Board */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500">
            실시간 완성 중인 {studentName}의 대화:
          </div>

          <div className="space-y-3">
            {/* Step 1 Slot */}
            <div className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div className="flex-1">
                <span className="text-slate-500 text-xs font-semibold mr-1.5">상황:</span>
                {selectedAnswers[1] ? (
                  <span className="font-bold text-sky-700 bg-sky-100/60 px-2 py-0.5 rounded">
                    {steps[0].promptPrefix}{selectedAnswers[1]}
                  </span>
                ) : (
                  <span className="border-b-2 border-dashed border-sky-400 text-sky-400 font-medium px-2 py-0.5">
                    1단계: 사실(상황)을 선택해 주세요...
                  </span>
                )}
              </div>
            </div>

            {/* Step 2 Slot */}
            <div className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="flex-1">
                <span className="text-slate-500 text-xs font-semibold mr-1.5">감정:</span>
                {selectedAnswers[2] ? (
                  <span className="font-bold text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded">
                    {steps[1].promptPrefix}{selectedAnswers[2]}
                  </span>
                ) : (
                  <span
                    className={`border-b-2 border-dashed px-2 py-0.5 font-medium ${
                      currentStepIndex >= 1
                        ? 'border-indigo-400 text-indigo-400'
                        : 'border-slate-300 text-slate-400'
                    }`}
                  >
                    2단계: 내 감정/영향을 선택해 주세요...
                  </span>
                )}
              </div>
            </div>

            {/* Step 3 Slot */}
            <div className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="flex-1">
                <span className="text-slate-500 text-xs font-semibold mr-1.5">바람:</span>
                {selectedAnswers[3] ? (
                  <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    {steps[2].promptPrefix}{selectedAnswers[3]}
                  </span>
                ) : (
                  <span
                    className={`border-b-2 border-dashed px-2 py-0.5 font-medium ${
                      currentStepIndex >= 2
                        ? 'border-emerald-400 text-emerald-400'
                        : 'border-slate-300 text-slate-400'
                    }`}
                  >
                    3단계: 구체적 바람/부탁을 선택해 주세요...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Current Active Step Question and Choices */}
        {!isCompletedAll && currentStep && (
          <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full text-white font-bold text-xs flex items-center justify-center ${
                    currentStep.stepNumber === 1
                      ? 'bg-sky-600'
                      : currentStep.stepNumber === 2
                      ? 'bg-indigo-600'
                      : 'bg-emerald-600'
                  }`}
                >
                  {currentStep.stepNumber}
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {currentStep.stepName}
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                힌트: {currentStep.pedagogicalTip}
              </span>
            </div>

            {/* Option Cards */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentStep.options.map((opt) => {
                const isSelected = attemptFeedback?.optionId === opt.id;
                const isCorrect = attemptFeedback?.isCorrect && isSelected;
                const isWrong = attemptFeedback && !attemptFeedback.isCorrect && isSelected;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isCorrect
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                        : isWrong
                        ? 'border-rose-400 bg-rose-50 text-rose-900'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-800'
                    }`}
                  >
                    <span className="text-sm sm:text-base leading-relaxed">
                      {opt.label}
                    </span>

                    {isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isWrong && (
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 animate-shake" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint / Feedback Box */}
            {attemptFeedback && (
              <div
                className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2 animate-in fade-in duration-150 ${
                  attemptFeedback.isCorrect
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-800'
                    : 'border-rose-200 bg-rose-50/70 text-rose-800'
                }`}
              >
                {attemptFeedback.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong className="font-semibold">
                    {attemptFeedback.isCorrect ? '참 잘했어요! ' : '다시 생각해 볼까요? '}
                  </strong>
                  {attemptFeedback.hint}
                </div>
              </div>
            )}
          </div>
        )}

        {/* All Steps Completed Screen */}
        {isCompletedAll && (
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base sm:text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>나 전달법 3단계 완성! 친구의 마음이 100% 열렸어요</span>
              </div>
              <div className="flex items-center gap-1 text-rose-600 font-black text-sm bg-white px-3 py-1 rounded-full border border-rose-200 shadow-xs">
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>하트 100%</span>
              </div>
            </div>

            {/* Friend Reaction speech */}
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100 shadow-xs">
              <span className="text-3xl">{scenario.friend.avatar}</span>
              <div>
                <span className="text-xs font-bold text-emerald-700 block mb-0.5">
                  {scenario.friend.name}의 최종 반응:
                </span>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  “네가 기분 나쁘지 않게 차분히 말해주니까 내 행동을 진심으로 반성하게 돼. 우리 앞으로도 좋은 친구로 지내자!”
                </p>
              </div>
            </div>

            {/* Complete sentence box */}
            <div className="p-4 bg-white/90 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  완성된 나 전달법 문장:
                </span>
                <button
                  onClick={handleSpeech}
                  disabled={isReadingAloud}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 bg-emerald-100/60 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isReadingAloud ? '읽는 중...' : '소리 내어 듣기'}</span>
                </button>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                {scenario.iMessage.idealSentence}
              </p>
            </div>

            <p className="text-xs text-emerald-800/80 leading-relaxed">
              💡 {scenario.iMessage.resolutionSummary}
            </p>

            {/* Bottom action button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleFinish}
                className="w-full sm:w-auto py-3.5 px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span>
                  {scenarioIndex < totalScenarios - 1
                    ? `다음 상황(${scenarioIndex + 2}/${totalScenarios})으로 가기`
                    : '최종 갈등 대처 유형 결과 보기'}
                </span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
