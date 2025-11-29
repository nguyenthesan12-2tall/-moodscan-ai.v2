import React, { useState } from 'react';
import { X, Sparkles, Music, MessageCircle, Mail, ArrowRight, Loader2 } from 'lucide-react';

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const response = await fetch('https://formspree.io/f/xvgjyzbe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setEmail('');
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 animate-in zoom-in-95 duration-300 overflow-hidden">
                {/* Subtle Glow Effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-black/5 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mb-4 shadow-lg text-white ring-4 ring-purple-100">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        Unlock Your Mind
                    </h2>
                    <p className="text-gray-600 mt-2">
                        MoodScan Pro is coming soon. Join the waitlist to get <span className="font-bold text-pink-500">50% off</span> when we launch.
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to the club!</h3>
                        <p className="text-gray-600">We will notify you when we launch.</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 mb-8 relative z-10">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Deep Analysis</h3>
                                    <p className="text-sm text-gray-600">Get detailed psychological insights about your mood patterns.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
                                <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">AI Coach Chat</h3>
                                    <p className="text-sm text-gray-600">Chat with our advanced AI to work through your feelings.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
                                <div className="p-2 bg-pink-100 text-pink-600 rounded-xl">
                                    <Music className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Music Therapy</h3>
                                    <p className="text-sm text-gray-600">Personalized playlists to match or uplift your mood.</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="relative z-10">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-11 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading' || !email}
                                className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Joining...
                                    </>
                                ) : (
                                    <>
                                        Join Now
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                            {status === 'error' && (
                                <p className="text-red-500 text-sm text-center mt-2">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
