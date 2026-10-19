import React, { useState } from 'react';
import { STUDENT_AVATARS, SCENARIOS } from '../data/scenarios';
import { sounds } from '../utils/sound';
import { ArrowRight, Sparkles, Heart, MessageSquare, Award, BookOpen } from 'lucide-react';

interface IntroScreenProps {
  studentName: string;
  selectedAvatar: string;
  onUpdateProfile: (name: string, avatarId: string) => void;
  onStart: (targetScenarioIndex?: number) => void;
  onOpenGuide: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  studentName,
  selectedAvatar,
  onUpdateProfile,
  onStart,
  onOpenGuide
}) => {
  const [nameInput, setNameInput] = useState(studentName);
  const [avatarId, setAvatarId] = useState(selectedAvatar);

  const handleStart = (scenarioIndex?: number) => {
    sounds.playPop();
    const finalName = nameInput.trim() ? nameInput.trim() : '배려하는 5학년 친구';
    onUpdateProfile(finalName, avatarId);
    onStart(scenarioIndex);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>초등 5·6학년을 위한 실전 마음 공감 교실</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          교실 속 진짜 친구 갈등, <br className="hidden sm:inline" />
          <span className="text-sky-600">어떻게 말해야</span> 친구의 마음이 열릴까요?
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          줄 서기 새치기, 모둠 과제 무임승차, 단톡방 은근한 소외 등 우리 교실에서 매일 마주치는 <strong>8가지 현실 갈등 상황</strong>을 시뮬레이션해 보세요. 선택에 따라 변하는 친구의 마음 하트 게이지를 확인하고, <strong>'나 전달법'</strong>으로 지혜롭게 화해하는 대화법을 배워봅니다.
        </p>
      </div>

      {/* Feature 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-3">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm mb-1">상대방 마음 하트 게이지</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            나의 말 한마디에 따라 실시간으로 오르내리는 친구의 하트와 속마음을 확인해요.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm mb-1">'나 전달법' 빈칸 트레이닝</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            상황, 감정, 바람의 3단계 공식을 직접 조립하며 싸우지 않고 부탁하는 법을 마스터해요.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm mb-1">나의 갈등 대처 유형 진단</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            호랑이, 고슴도치, 토끼, 돌고래 중 내가 자주 쓰는 방식을 찾고 수료증을 받아요.
          </p>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            학생 프로필 설정
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            시뮬레이션과 최종 발급될 수료증에 표기될 학생 이름과 캐릭터를 선택해 주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name input */}
          <div className="space-y-2">
            <label htmlFor="student-name-input" className="text-xs font-bold text-slate-700">
              학생 이름 (또는 별명 / 학년 반)
            </label>
            <input
              id="student-name-input"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="예: 5학년 2반 김민준"
              maxLength={20}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
            <p className="text-[11px] text-slate-400">
              * 입력하지 않으면 기본 이름(배려하는 5학년 친구)으로 진행됩니다.
            </p>
          </div>

          {/* Avatar picker */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">내 캐릭터 선택</span>
            <div className="grid grid-cols-3 gap-2">
              {STUDENT_AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setAvatarId(av.id);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    avatarId === av.id
                      ? 'border-sky-500 bg-sky-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-2xl">{av.emoji}</span>
                  <span className="text-xs font-medium text-slate-800">{av.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => handleStart()}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <span>8가지 갈등 시뮬레이션 순서대로 시작하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenGuide}
            className="w-full sm:w-auto py-3.5 px-5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>나 전달법 공식 먼저 보기</span>
          </button>
        </div>
      </div>

      {/* 8 Scenarios Quick Explorer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              교실 속 8가지 갈등 상황 둘러보기
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              원하는 상황을 직접 눌러 바로 체험해볼 수도 있어요.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SCENARIOS.map((sc, index) => (
            <div
              key={sc.id}
              onClick={() => handleStart(index)}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer group text-left flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                {sc.friend.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span>상황 {sc.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{sc.category}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors truncate">
                  {sc.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  상대 친구: {sc.friend.name} ({sc.location})
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
