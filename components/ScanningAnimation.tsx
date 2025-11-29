import React from 'react';
import { Heart } from 'lucide-react';

export default function ScanningAnimation() {
    return (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in">
            <div className="relative">
                <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-20 delay-150"></div>
                <div className="relative w-32 h-32 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/50 animate-pulse-slow">
                    <Heart className="w-16 h-16 text-pink-500 animate-pulse" fill="currentColor" />
                </div>
            </div>
            <p className="mt-8 text-xl font-medium text-white/80 animate-pulse">Scanning your vibes...</p>
        </div>
    );
}
