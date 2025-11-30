'use client';
// Main entry point for MoodScan AI

import React, { useState, useEffect } from 'react';
import MoodInput from '@/components/MoodInput';
import MoodResultView from '@/components/MoodResult';
import HistoryList from '@/components/HistoryList';
import ScanningAnimation from '@/components/ScanningAnimation';
import { analyzeMood, MoodResult } from '@/lib/moodLogic';
import { saveResult, getHistory } from '@/lib/storage';

export default function Home() {
  const [currentResult, setCurrentResult] = useState<MoodResult | null>(null);
  const [history, setHistory] = useState<MoodResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleAnalyze = (text: string) => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      const result = analyzeMood(text);
      setCurrentResult(result);
      saveResult(result);
      setHistory(prev => [result, ...prev]);
      setIsScanning(false);
    }, 2000);
  };

  const handleReset = () => {
    setCurrentResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-gradient flex flex-col items-center py-12 px-4 font-sans overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <header className="mb-12 text-center relative z-10">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2 drop-shadow-sm">
          MoodScan AI
        </h1>
        <p className="text-gray-600 font-medium tracking-wide">Understand your feelings in seconds</p>
      </header>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {isScanning ? (
          <ScanningAnimation />
        ) : currentResult ? (
          <MoodResultView result={currentResult} onReset={handleReset} />
        ) : (
          <MoodInput onAnalyze={handleAnalyze} />
        )}

        {!isScanning && <HistoryList history={history} />}
      </div>
    </main>
  );
}
