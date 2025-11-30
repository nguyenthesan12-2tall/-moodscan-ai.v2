export interface SentimentResult {
    mood: string;
    color: string;
    advice: string;
    keywords: string[];
    score: number;
    quote: string;
    borderColor: string;
}

export interface ScanHistory {
    id: string;
    mood: string;
    quote: string;
    timestamp: number;
    color: string;
    borderColor: string;
}

const KEYWORDS = {
    happy: ['happy', 'joy', 'joyful', 'excited', 'love', 'great', 'awesome', 'amazing', 'wonderful', 'fantastic', 'vui', 'hạnh phúc', 'tuyệt', 'thích', 'yêu', 'tốt', 'xuất sắc'],
    sad: ['sad', 'depressed', 'down', 'unhappy', 'miserable', 'lonely', 'buồn', 'chán', 'cô đơn', 'đau khổ', 'tệ'],
    angry: ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'hate', 'tức', 'giận', 'ghét', 'bực', 'phẫn nộ'],
    anxious: ['anxious', 'worried', 'nervous', 'stressed', 'overwhelmed', 'panic', 'lo lắng', 'căng thẳng', 'stress', 'mệt mỏi', 'áp lực'],
    chill: ['chill', 'relaxed', 'calm', 'peaceful', 'zen', 'okay', 'fine', 'thư giãn', 'bình thường', 'ổn', 'yên tĩnh'],
    energized: ['energized', 'pumped', 'motivated', 'inspired', 'ready', 'confident', 'năng lượng', 'nhiệt huyết', 'sẵn sàng', 'tự tin'],
};

const QUOTES = {
    happy: [
        "Keep that energy! You're glowing! ✨",
        "Your vibe is immaculate! Keep spreading joy! 🌟",
        "Living your best life! We love to see it! 💖",
        "Main character energy right here! 🎬",
    ],
    sad: [
        "It's okay not to be okay. Take your time. 💙",
        "Tomorrow is a fresh start. Hang in there! 🌅",
        "Your feelings are valid. Be kind to yourself. 🫂",
        "Even the darkest night will end. You got this. 🌙",
    ],
    angry: [
        "Channel that energy into something powerful! 💪",
        "It's okay to feel angry. Let it out safely. 🔥",
        "Deep breaths. You're stronger than this moment. 🌊",
        "Sometimes anger is just passion misdirected. ⚡",
    ],
    anxious: [
        "One breath at a time. You're doing great. 🌬️",
        "It's okay to not have all the answers right now. 🧘",
        "You've survived 100% of your worst days. Keep going. 💪",
        "Ground yourself. You're safe right here, right now. 🌿",
    ],
    chill: [
        "Just vibing? That's totally valid! ✌️",
        "Neutral is a mood too. Stay hydrated! 💧",
        "Sometimes being okay is enough. Keep coasting! 🌊",
        "Balance is key. You're doing fine! ⚖️",
    ],
    energized: [
        "That's the energy we need! Let's go! 🚀",
        "Ride that wave! You're unstoppable! 🌊",
        "Channel that power into your goals! ⚡",
        "Keep that momentum going! You're on fire! 🔥",
    ],
};

export function analyzeSentiment(text: string): SentimentResult {
    const lowerText = text.toLowerCase();
    const foundKeywords: string[] = [];
    const moodScores: Record<string, number> = {
        happy: 0,
        sad: 0,
        angry: 0,
        anxious: 0,
        chill: 0,
        energized: 0,
    };

    // Check all keywords
    Object.entries(KEYWORDS).forEach(([mood, words]) => {
        words.forEach((word) => {
            if (lowerText.includes(word)) {
                foundKeywords.push(word);
                moodScores[mood]++;
            }
        });
    });

    // Find dominant mood
    let dominantMood = 'chill';
    let maxScore = 0;
    Object.entries(moodScores).forEach(([mood, score]) => {
        if (score > maxScore) {
            maxScore = score;
            dominantMood = mood;
        }
    });

    // Calculate overall score (0-100)
    const totalPositive = moodScores.happy + moodScores.energized + moodScores.chill;
    const totalNegative = moodScores.sad + moodScores.angry + moodScores.anxious;
    let score = 50 + (totalPositive * 10) - (totalNegative * 10);
    score = Math.max(0, Math.min(100, score));

    // Map mood to colors
    const moodColors: Record<string, { text: string; border: string }> = {
        happy: { text: 'text-yellow-400', border: 'rgba(250, 204, 21, 0.8)' },
        sad: { text: 'text-blue-400', border: 'rgba(96, 165, 250, 0.8)' },
        angry: { text: 'text-red-400', border: 'rgba(248, 113, 113, 0.8)' },
        anxious: { text: 'text-orange-400', border: 'rgba(251, 146, 60, 0.8)' },
        chill: { text: 'text-green-400', border: 'rgba(74, 222, 128, 0.8)' },
        energized: { text: 'text-purple-400', border: 'rgba(192, 132, 252, 0.8)' },
    };

    // Get random quote for mood
    const moodQuotes = QUOTES[dominantMood as keyof typeof QUOTES] || QUOTES.chill;
    const quote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];

    const color = moodColors[dominantMood]?.text || 'text-gray-400';
    const borderColor = moodColors[dominantMood]?.border || 'rgba(156, 163, 175, 0.8)';

    return {
        mood: dominantMood.charAt(0).toUpperCase() + dominantMood.slice(1),
        color,
        advice: quote,
        keywords: [...new Set(foundKeywords)],
        score,
        quote,
        borderColor,
    };
}

// LocalStorage functions
const STORAGE_KEY = 'moodscan_history';

export function saveScanToHistory(result: SentimentResult): void {
    if (typeof window === 'undefined') return;

    const scan: ScanHistory = {
        id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        mood: result.mood,
        quote: result.quote,
        timestamp: Date.now(),
        color: result.color,
        borderColor: result.borderColor,
    };

    const history = getScanHistory();
    history.unshift(scan); // Add to beginning

    // Keep only last 20 scans
    const trimmedHistory = history.slice(0, 20);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
}

export function getScanHistory(): ScanHistory[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading scan history:', error);
        return [];
    }
}

export function clearHistory(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}
