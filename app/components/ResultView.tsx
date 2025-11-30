import React, { useState } from 'react';
import { SentimentResult, ScanHistory } from '../utils/sentiment';
import ProWaitlistModal from './ProWaitlistModal';

interface ResultViewProps {
    result: SentimentResult;
    history: ScanHistory[];
    onReset: () => void;
}

export default function ResultView({ result, history, onReset }: ResultViewProps) {
    const [showModal, setShowModal] = useState(false);

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="w-full max-w-4xl p-4 animate-in slide-in-from-bottom-10 duration-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Your Aura</h2>
                <button
                    onClick={onReset}
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm transition-colors font-medium"
                >
                    Scan Again
                </button>
            </div>

            {/* 3-Part Bento Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Top Left: Main Mood + Quote (Large - 2 columns) */}
                <div
                    className="col-span-2 p-8 rounded-[1.5rem] min-h-[280px] flex flex-col justify-center"
                    style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: `
              0 8px 32px 0 rgba(0, 0, 0, 0.37),
              0 0 40px ${result.borderColor},
              inset 0 0 60px rgba(255, 255, 255, 0.05)
            `
                    }}
                >
                    <div className="text-center">
                        <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">Current Mood</p>
                        <h1
                            className={`text-7xl font-black mb-6 ${result.color}`}
                            style={{
                                textShadow: `0 0 20px ${result.borderColor}, 0 0 40px ${result.borderColor}`
                            }}
                        >
                            {result.mood}
                        </h1>
                        <p className="text-xl text-gray-200 italic leading-relaxed">
                            "{result.quote}"
                        </p>
                    </div>
                </div>

                {/* Top Right: AI Coach CTA (Small - 1 column) */}
                <div
                    className="col-span-1 p-6 rounded-[1.5rem] flex flex-col justify-between"
                    style={{
                        background: 'rgba(168, 85, 247, 0.1)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '2px solid rgba(168, 85, 247, 0.3)',
                        boxShadow: `
              0 8px 32px 0 rgba(0, 0, 0, 0.37),
              0 0 30px rgba(168, 85, 247, 0.4)
            `
                    }}
                >
                    <div>
                        <div className="text-4xl mb-3">🤖</div>
                        <h3 className="text-lg font-bold text-white mb-2">AI Coach</h3>
                        <p className="text-sm text-gray-300 mb-4">Get personalized insights & guidance</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm hover:opacity-90 transition-all"
                        style={{
                            boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
                        }}
                    >
                        Unlock Pro
                    </button>
                </div>
            </div>

            {/* Bottom: Recent History (Wide - Full width) */}
            <div
                className="p-6 rounded-[1.5rem]"
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}
            >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span>📊</span> Recent Scans
                </h3>

                {history.length === 0 ? (
                    <p className="text-gray-400 text-sm italic text-center py-4">
                        No previous scans yet. This will be your first!
                    </p>
                ) : (
                    <div className="space-y-2">
                        {history.slice(0, 5).map((scan) => (
                            <div
                                key={scan.id}
                                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all"
                                style={{
                                    borderLeft: `3px solid ${scan.borderColor}`
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`font-bold ${scan.color}`}>{scan.mood}</span>
                                    <span className="text-gray-400 text-sm">•</span>
                                    <span className="text-gray-400 text-sm italic truncate max-w-md">
                                        "{scan.quote.length > 50 ? scan.quote.substring(0, 50) + '...' : scan.quote}"
                                    </span>
                                </div>
                                <span className="text-gray-500 text-xs">
                                    {formatTimestamp(scan.timestamp)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pro Waitlist Modal */}
            <ProWaitlistModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}
