import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface MoodInputProps {
    onAnalyze: (text: string) => void;
}

export default function MoodInput({ onAnalyze }: MoodInputProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAnalyze(text);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">How are you feeling today?</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="I'm feeling..."
                    className="w-full h-40 p-5 rounded-2xl bg-white/50 border border-white/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none resize-none text-gray-700 placeholder-gray-400 transition-all text-lg shadow-inner"
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Search className="w-6 h-6" />
                    Scan Mood
                </button>
            </form>
        </div>
    );
}
