import React, { useState } from 'react';
import { MoodResult } from '@/lib/moodLogic';
import { RefreshCw, Sparkles } from 'lucide-react';
import PremiumModal from './PremiumModal';

interface MoodResultViewProps {
    result: MoodResult;
    onReset: () => void;
}

export default function MoodResultView({ result, onReset }: MoodResultViewProps) {
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

    return (
        <>
            <div className="w-full max-w-md mx-auto p-8 bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl text-center animate-in fade-in zoom-in duration-500">
                <div className={`mx-auto w-32 h-32 flex items-center justify-center rounded-full bg-white/50 mb-6 text-8xl shadow-lg ring-4 ring-white/30`}>
                    {result.emoji}
                </div>

                <h2 className={`text-4xl font-bold mb-2 ${result.color} drop-shadow-sm`}>{result.mood}</h2>

                <blockquote className="text-xl text-gray-700 italic mb-8 font-serif leading-relaxed">
                    "{result.quote}"
                </blockquote>

                <div className="space-y-3">
                    <button
                        onClick={() => setIsPremiumModalOpen(true)}
                        className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Premium Insights
                    </button>

                    <button
                        onClick={onReset}
                        className="w-full py-4 px-6 bg-white/60 hover:bg-white/80 text-gray-700 font-bold text-lg rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Check Another
                    </button>
                </div>
            </div>

            <PremiumModal
                isOpen={isPremiumModalOpen}
                onClose={() => setIsPremiumModalOpen(false)}
            />
        </>
    );
}
