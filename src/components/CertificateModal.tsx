import React from 'react';
import { X, Printer, Award, Sparkles } from 'lucide-react';
import { ConflictStyle, CONFLICT_STYLES_INFO } from '../data/scenarios';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  dominantStyle: ConflictStyle;
  completedCount: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  dominantStyle,
  completedCount
}) => {
  if (!isOpen) return null;

  const styleInfo = CONFLICT_STYLES_INFO[dominantStyle];
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-amber-200 shadow-2xl p-6 sm:p-10 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer print:hidden"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Container with decorative border */}
        <div className="border-4 border-double border-amber-300 rounded-2xl p-6 sm:p-8 text-center space-y-6 bg-radial from-amber-50/40 via-white to-amber-50/20">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>초등 인성 교실 공식 수료증</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              갈등 해결 마스터 수료증
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono tracking-wider">
              CERTIFICATE OF EMPATHY & CONFLICT RESOLUTION
            </p>
          </div>

          {/* Student Name */}
          <div className="py-2 border-y border-amber-200/80 my-4">
            <span className="text-xs text-slate-500 block mb-1">성명 / 소속</span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {studentName}
            </span>
          </div>

          {/* Certificate Body Text */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto">
            위 어린이는 초등 5~6학년 대상 <strong>'친구 갈등 해결 시뮬레이션'</strong>의 {completedCount}가지 모든 현실 갈등 과제를 성실히 수행하고, 상대방의 마음을 살피는 <strong>'나 전달법(I-Message)'</strong>을 우수하게 습득하여 <strong>[{styleInfo.badge}]</strong> 갈등 해결 마스터로 인증되었기에 이 증서를 수여합니다.
          </p>

          {/* Badge & Animal */}
          <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-amber-200 shadow-xs">
            <span className="text-3xl">{styleInfo.animal}</span>
            <div className="text-left">
              <span className="text-xs font-semibold text-slate-500 block">최종 인증 유형</span>
              <span className="text-sm font-bold text-slate-900">{styleInfo.name}</span>
            </div>
          </div>

          {/* Date and Seal */}
          <div className="pt-4 flex items-center justify-between px-4 sm:px-8 text-slate-600 text-xs">
            <div>
              <p className="font-semibold">{formattedDate}</p>
              <p className="text-slate-400 text-[11px] mt-0.5">마음공감 실천 교실</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full border-2 border-amber-400 bg-amber-50 flex items-center justify-center font-bold text-amber-700 text-[10px] shadow-xs">
                인증 직인
              </div>
            </div>
          </div>
        </div>

        {/* Buttons (Hidden in print) */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>수료증 인쇄 / PDF 저장하기</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
