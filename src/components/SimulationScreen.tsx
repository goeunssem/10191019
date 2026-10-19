import React, { useState } from 'react';
import { Scenario, ChoiceOption, ConflictStyle } from '../data/scenarios';
import { HeartGauge } from './HeartGauge';
import { sounds } from '../utils/sound';
import { ArrowRight, MessageCircle, HelpCircle, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';

interface SimulationScreenProps {
  scenario: Scenario;
  scenarioIndex: number;
  totalScenarios: number;
  studentName: string;
  onProceedToIMessage: (chosenStyle: ConflictStyle, finalHeart: number) => void;
}

export const SimulationScreen: React.FC<SimulationScreenProps> = ({
  scenario,
  scenarioIndex,
  totalScenarios,
  studentName,
  onProceedToIMessage
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [currentHeart, setCurrentHeart] = useState<number>(scenario.initialHeart);
  const [delta, setDelta] = useState<number | null>(null);
  const [hasChosenAtLeastOnce, setHasChosenAtLeastOnce] = useState<boolean>(false);
  const [recordedStyle, setRecordedStyle] = useState<ConflictStyle | null>(null);

  const selectedChoice = scenario.choices.find((c) => c.id === selectedChoiceId) || null;

  const handleSelectChoice = (choice: ChoiceOption) => {
    setSelectedChoiceId(choice.id);
    const newHeart = Math.max(0, Math.min(100, scenario.initialHeart + choice.heartChange));
    setCurrentHeart(newHeart);
    setDelta(choice.heartChange);

    if (!hasChosenAtLeastOnce) {
      setHasChosenAtLeastOnce(true);
      setRecordedStyle(choice.style);
    }

    if (choice.heartChange > 0) {
      sounds.playHeartUp();
    } else {
      sounds.playHeartDown();
    }
  };

  const handleProceed = () => {
    sounds.playPop();
    const styleToSave = recordedStyle || selectedChoice?.style || 'dolphin';
    onProceedToIMessage(styleToSave, currentHeart);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Breadcrumb & Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              상황 {scenarioIndex + 1} / {totalScenarios}
            </span>
            <span className="text-slate-400">·</span>
            <span>{scenario.category}</span>
            <span className="text-slate-400">·</span>
            <span className="hidden sm:inline">{scenario.location}</span>
          </div>
          <span className="text-xs font-semibold text-slate-700">
            {studentName}의 차례
          </span>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-sky-500 h-full transition-all duration-300"
            style={{ width: `${((scenarioIndex + 1) / totalScenarios) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Situation Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {scenario.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              장소: {scenario.location} · 갈등 상대: {scenario.friend.name} ({scenario.friend.role})
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0 border border-slate-200">
            {scenario.friend.avatar}
          </div>
        </div>

        {/* Story description */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 leading-relaxed">
          {scenario.situation}
        </div>

        {/* Friend initial speech bubble */}
        <div className="flex items-start gap-3 pl-2">
          <span className="text-xl mt-1">{scenario.friend.avatar}</span>
          <div className="relative bg-amber-50 border border-amber-200 rounded-2xl rounded-tl-xs px-4 py-3 text-sm text-amber-950 font-medium shadow-xs">
            <span className="text-xs font-bold text-amber-800 block mb-1">
              {scenario.friend.name}의 말:
            </span>
            {scenario.friendInitialQuote}
          </div>
        </div>

        {/* Heart Gauge */}
        <HeartGauge
          heartLevel={currentHeart}
          delta={delta}
          friendName={scenario.friend.name}
          friendAvatar={scenario.friend.avatar}
          mood={selectedChoice ? selectedChoice.friendReaction.avatarMood : 'awkward'}
        />
      </div>

      {/* Action Choices Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-sky-600" />
            <span>이 상황에서 나는 어떻게 반응할까요? (선택지를 골라보세요)</span>
          </h2>
          {selectedChoice && (
            <span className="text-xs text-slate-400 hidden sm:inline">
              * 다른 선택지를 눌러 마음 변화를 비교해볼 수 있어요
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {scenario.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => handleSelectChoice(choice)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/60 shadow-sm ring-1 ring-sky-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-sky-600 bg-sky-600 text-white'
                            : 'border-slate-300 group-hover:border-slate-400'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {choice.styleLabel}
                      </span>
                    </div>

                    <p
                      className={`text-sm sm:text-base leading-relaxed pl-6 ${
                        isSelected ? 'font-bold text-slate-900' : 'text-slate-800'
                      }`}
                    >
                      {choice.text}
                    </p>
                  </div>

                  {/* Heart preview badge */}
                  <div
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                      choice.heartChange > 0
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {choice.heartChange > 0 ? `+${choice.heartChange}%` : `${choice.heartChange}%`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Choice Reaction Box */}
      {selectedChoice && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{scenario.friend.avatar}</span>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                내 말에 대한 {scenario.friend.name}의 반응 & 속마음
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                selectedChoice.heartChange > 0
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              마음 변화 {selectedChoice.heartChange > 0 ? `+${selectedChoice.heartChange}%` : `${selectedChoice.heartChange}%`}
            </span>
          </div>

          {/* Friend's voiced response */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 block">
              {scenario.friend.name}의 겉 반응:
            </span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {selectedChoice.friendReaction.dialogue}
            </p>
          </div>

          {/* Friend's inner thought (속마음) */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{scenario.friend.name}의 진짜 속마음 들여다보기:</span>
            </div>
            <p className="text-sm text-indigo-950 font-medium italic leading-relaxed">
              “{selectedChoice.friendReaction.innerThought}”
            </p>
          </div>

          {/* Teacher's analysis */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-950">선생님의 공감 노트: </strong>
              {selectedChoice.friendReaction.explanation}
            </div>
          </div>

          {/* Next Button: Proceed to I-Message */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              * 이제 이 갈등을 가장 현명하게 해결하는 <strong>'나 전달법'</strong>을 실습해 볼까요?
            </p>
            <button
              onClick={handleProceed}
              className="w-full sm:w-auto py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0"
            >
              <span>'나 전달법'으로 다시 말해보기</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
