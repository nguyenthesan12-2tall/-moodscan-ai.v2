import React, { useState } from 'react';

interface ProWaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProWaitlistModal({ isOpen, onClose }: ProWaitlistModalProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://formspree.io/f/xvgjyzbe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSuccess(true);
                setEmail('');
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                }, 2500);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={handleOverlayClick}
        >
            <div
                className="w-full max-w-md p-8 rounded-[2rem] relative animate-in zoom-in duration-300"
                style={{
                    background: 'rgba(20, 10, 40, 0.95)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '2px solid rgba(168, 85, 247, 0.5)',
                    boxShadow: `
            0 8px 32px 0 rgba(0, 0, 0, 0.5),
            0 0 60px rgba(168, 85, 247, 0.6),
            0 0 100px rgba(236, 72, 153, 0.3)
          `
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center"
                >
                    ×
                </button>

                {/* Content */}
                {success ? (
                    <div className="text-center py-8">
                        <div className="text-6xl mb-4">✨</div>
                        <h2 className="text-2xl font-bold text-white mb-2">You're on the list!</h2>
                        <p className="text-gray-300">We'll notify you when MoodScan Pro launches.</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <div className="text-5xl mb-3">🚀</div>
                            <h2
                                className="text-3xl font-black mb-2"
                                style={{
                                    background: 'linear-gradient(to right, #a855f7, #ec4899)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
                                }}
                            >
                                MoodScan Pro
                            </h2>
                            <p className="text-gray-300 text-sm">
                                Join the waitlist for exclusive early access
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-400 text-lg"
                                    style={{
                                        background: 'rgba(0, 0, 0, 0.4)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        outline: 'none',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                                        e.target.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    disabled={loading}
                                />
                                {error && (
                                    <p className="text-red-400 text-sm mt-2">{error}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50"
                                style={{
                                    background: 'linear-gradient(to right, #a855f7, #ec4899)',
                                    color: 'white',
                                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.8)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.6)';
                                    }
                                }}
                            >
                                {loading ? 'Joining...' : 'Join Waitlist'}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-gray-400 text-xs text-center">
                                🔥 Early access to AI-powered mood insights<br />
                                💎 Personalized mental wellness coaching<br />
                                📊 Advanced mood tracking & analytics
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
