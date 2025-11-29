import React from 'react';
import { MoodResult } from '@/lib/moodLogic';

interface HistoryListProps {
    history: MoodResult[];
}

export default function HistoryList({ history }: HistoryListProps) {
    if (history.length === 0) return null;

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <h3 className="text-lg font-semibold text-gray-600 mb-4 px-2">Recent Scans</h3>
            <div className="space-y-3">
                {history.map((item, index) => {
                    return (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl hover:bg-white/40 transition-all cursor-default">
                            <div className="text-3xl filter drop-shadow-sm">
                                {item.emoji}
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-gray-800">{item.mood}</div>
                                <div className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
