'use client';

import { useState, useEffect } from 'react';
import HomeView from './components/HomeView';
import ResultView from './components/ResultView';
import { analyzeSentiment, SentimentResult, ScanHistory, saveScanToHistory, getScanHistory } from './utils/sentiment';

export default function Page() {
    const [view, setView] = useState<'home' | 'result'>('home');
    const [result, setResult] = useState<SentimentResult | null>(null);
    const [history, setHistory] = useState<ScanHistory[]>([]);

    // Load history on mount
    useEffect(() => {
        setHistory(getScanHistory());
    }, []);

    const handleScan = (text: string) => {
        const analysis = analyzeSentiment(text);
        setResult(analysis);

        // Save to localStorage
        saveScanToHistory(analysis);

        // Update history state
        setHistory(getScanHistory());

        setView('result');
    };

    const handleReset = () => {
        setView('home');
        setResult(null);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
            {view === 'home' ? (
                <HomeView onScan={handleScan} />
            ) : (
                result && <ResultView result={result} history={history} onReset={handleReset} />
            )}

            <footer className="absolute bottom-4 text-white/20 text-xs">
                MoodScan AI • Gen Z Edition
            </footer>
        </main>
    );
}
