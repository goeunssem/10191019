/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SCENARIOS, ConflictStyle } from './data/scenarios';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { SimulationScreen } from './components/SimulationScreen';
import { IMessageScreen } from './components/IMessageScreen';
import { ResultScreen } from './components/ResultScreen';
import { GuideModal } from './components/GuideModal';
import { sounds } from './utils/sound';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'simulation' | 'imessage' | 'result'>('intro');
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [studentName, setStudentName] = useState<string>('5학년 2반 김민준');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('av-1');
  const [chosenStyles, setChosenStyles] = useState<ConflictStyle[]>([]);
  const [heartScores, setHeartScores] = useState<number[]>([]);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sounds.isMuted);

  const totalScenarios = SCENARIOS.length;
  const currentScenario = SCENARIOS[scenarioIndex];

  // Sound toggle handler
  const handleToggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sounds.playPop();
    }
  };

  // Start simulation handler
  const handleStartSimulation = (targetIndex?: number) => {
    const idx = targetIndex !== undefined ? targetIndex : 0;
    setScenarioIndex(idx);
    setCurrentStep('simulation');
  };

  // Profile update handler
  const handleUpdateProfile = (name: string, avatarId: string) => {
    setStudentName(name);
    setSelectedAvatar(avatarId);
  };

  // Move from simulation choice to I-Message training
  const handleProceedToIMessage = (style: ConflictStyle, finalHeart: number) => {
    // Record choice
    setChosenStyles((prev) => {
      const updated = [...prev];
      updated[scenarioIndex] = style;
      return updated;
    });

    setHeartScores((prev) => {
      const updated = [...prev];
      updated[scenarioIndex] = finalHeart;
      return updated;
    });

    setCurrentStep('imessage');
  };

  // Complete I-Message step
  const handleCompleteScenario = () => {
    if (scenarioIndex < totalScenarios - 1) {
      setScenarioIndex((prev) => prev + 1);
      setCurrentStep('simulation');
    } else {
      // Completed all 8 scenarios!
      setCurrentStep('result');
    }
  };

  // Reset to intro
  const handleReset = () => {
    setScenarioIndex(0);
    setChosenStyles([]);
    setHeartScores([]);
    setCurrentStep('intro');
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Top Bar Header */}
      <Header
        currentStep={currentStep}
        scenarioIndex={scenarioIndex}
        totalScenarios={totalScenarios}
        onOpenGuide={() => setIsGuideOpen(true)}
        onReset={handleReset}
        onNavigateHome={handleReset}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {currentStep === 'intro' && (
          <IntroScreen
            studentName={studentName}
            selectedAvatar={selectedAvatar}
            onUpdateProfile={handleUpdateProfile}
            onStart={handleStartSimulation}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {currentStep === 'simulation' && currentScenario && (
          <SimulationScreen
            key={`sim-${currentScenario.id}`}
            scenario={currentScenario}
            scenarioIndex={scenarioIndex}
            totalScenarios={totalScenarios}
            studentName={studentName}
            onProceedToIMessage={handleProceedToIMessage}
          />
        )}

        {currentStep === 'imessage' && currentScenario && (
          <IMessageScreen
            key={`imsg-${currentScenario.id}`}
            scenario={currentScenario}
            scenarioIndex={scenarioIndex}
            totalScenarios={totalScenarios}
            studentName={studentName}
            onCompleteScenario={handleCompleteScenario}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {currentStep === 'result' && (
          <ResultScreen
            studentName={studentName}
            selectedAvatar={selectedAvatar}
            chosenStyles={chosenStyles}
            heartScores={heartScores}
            onRestart={handleReset}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>초등 5·6학년 교우 관계 및 갈등 해결 시뮬레이션 교실</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>도덕·인성·상담 연계</span>
            <span>·</span>
            <span>나 전달법(I-Message) 실천 모델</span>
          </div>
        </div>
      </footer>

      {/* Guide Modal (나 전달법 비법 사전) */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
