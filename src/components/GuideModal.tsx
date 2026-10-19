import React from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              초등 갈등 해결 비법: '나 전달법(I-Message)'이란?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              도덕 시간과 상담 교실에서 배우는 마법의 대화 공식 3단계
            </p>
          </div>
        </div>

        {/* Intro Banner */}
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-sky-900 leading-relaxed">
            화가 날 때 <strong className="font-semibold text-rose-600">"너는 왜 매일 그래?"</strong> 하고 친구를 주어로 말하면(너 전달법), 친구는 공격받았다고 느껴 마음의 문을 닫아버려요. 반면 <strong className="font-semibold text-sky-700">"나(I)"</strong>를 주어로 내 마음을 담담히 표현하면 싸우지 않고 화해할 수 있어요!
          </p>
        </div>

        {/* 3 Steps */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                1단계: 사실(상황) 말하기 — “네가 ~할 때”
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
              친구가 한 행동을 <strong>사진을 찍듯이 객관적 사실만</strong> 말해요. ‘맨날’, ‘원래’, ‘너처럼 이기적인 애는’ 같은 비난 단어를 쏙 빼는 것이 핵심이에요.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                2단계: 나의 감정/영향 말하기 — “나는 ~한 기분이 들어”
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
              분노 뒤에 숨은 나의 진짜 취약한 감정(‘난처함’, ‘서운함’, ‘소외감’, ‘부담감’, ‘창피함’)을 솔직히 털어놓아요. 상대방도 이 감정에 진심으로 공감하게 됩니다.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                3단계: 구체적 바람/부탁 말하기 — “앞으로는 ~해 줬으면 좋겠어”
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
              ‘~하지 마!’ 같은 금지 대신, <strong>친구가 지금 당장 실천할 수 있는 긍정적인 행동 대안</strong>을 정중하게 부탁해요.
            </p>
          </div>
        </div>

        {/* Real Example comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-xl border border-red-200 bg-red-50/60">
            <div className="flex items-center gap-1.5 text-red-700 font-bold text-xs mb-2">
              <AlertCircle className="w-4 h-4" />
              피해야 할 ‘너 전달법’ (싸움 유발)
            </div>
            <p className="text-xs text-red-800 leading-relaxed font-medium">
              “야! 너 때문에 모둠 과제 다 망쳤잖아! 진짜 게으르고 무책임해!”
            </p>
            <p className="text-[11px] text-red-600 mt-2">
              👉 친구의 반응: “내가 뭘 어쨌다고 소리야? 너랑 안 해!” (방어와 반발)
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-2">
              <CheckCircle2 className="w-4 h-4" />
              효과 만점 ‘나 전달법’ (공감 유발)
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              “과제 마감이 내일인데 참여하지 않을 때, 혼자 다 해야 할까 봐 부담되고 속상해. 사진 자료 찾는 것만이라도 맡아주면 좋겠어.”
            </p>
            <p className="text-[11px] text-emerald-700 mt-2">
              👉 친구의 반응: “그랬구나, 미안해. 사진 찾는 건 내가 바로 할게!”
            </p>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          공식 확인 완료! 시뮬레이션 계속하기
        </button>
      </div>
    </div>
  );
};
