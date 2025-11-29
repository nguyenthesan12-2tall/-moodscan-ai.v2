export type MoodType = 'Happy' | 'Sad' | 'Angry' | 'Anxious' | 'Excited' | 'Neutral';

export interface MoodResult {
    mood: MoodType;
    emoji: string;
    color: string;
    quote: string;
    timestamp: number;
}

const MOOD_DATA: Record<MoodType, { keywords: string[]; emoji: string; color: string; quotes: string[] }> = {
    Happy: {
        keywords: ['vui', 'hạnh phúc', 'yêu đời', 'tuyệt vời', 'sướng'],
        emoji: '😄',
        color: 'text-yellow-500', // Yellow/Green-ish
        quotes: [
            "Hạnh phúc là hành trình, không phải đích đến.",
            "Hãy lan tỏa nụ cười của bạn!",
            "Hôm nay là một ngày tuyệt vời.",
        ],
    },
    Sad: {
        keywords: ['buồn', 'cô đơn', 'chán', 'thất vọng', 'khóc'],
        emoji: '😔',
        color: 'text-blue-500', // Blue/Gray
        quotes: [
            "Sau cơn mưa trời lại sáng.",
            "Mọi chuyện rồi sẽ ổn thôi.",
            "Hãy cho bản thân thời gian để chữa lành.",
        ],
    },
    Angry: {
        keywords: ['tức', 'bực', 'khó chịu', 'điên'],
        emoji: '😡',
        color: 'text-red-500', // Red
        quotes: [
            "Hít thở sâu và đếm đến 10.",
            "Giận dữ là tự trừng phạt bản thân vì lỗi của người khác.",
            "Bình tĩnh là sức mạnh.",
        ],
    },
    Anxious: {
        keywords: ['lo', 'sợ', 'hồi hộp', 'stress'],
        emoji: '😰',
        color: 'text-purple-500', // Purple
        quotes: [
            "Đừng lo lắng về ngày mai.",
            "Bạn mạnh mẽ hơn bạn nghĩ.",
            "Tập trung vào hơi thở của bạn.",
        ],
    },
    Excited: {
        keywords: ['hóng', 'mong', 'sung'],
        emoji: '🤩',
        color: 'text-orange-500', // Orange
        quotes: [
            "Năng lượng của bạn thật tuyệt vời!",
            "Hãy tận hưởng sự hào hứng này.",
            "Điều tuyệt vời đang chờ đón bạn.",
        ],
    },
    Neutral: {
        keywords: [],
        emoji: '😐',
        color: 'text-gray-500',
        quotes: [
            "Bình yên là hạnh phúc.",
            "Một ngày bình thường cũng là một ngày tốt.",
            "Hãy tận hưởng sự cân bằng.",
        ],
    },
};

export function analyzeMood(text: string): MoodResult {
    const lowerText = text.toLowerCase();
    let detectedMood: MoodType = 'Neutral';

    // Check for keywords
    for (const [mood, data] of Object.entries(MOOD_DATA)) {
        if (mood === 'Neutral') continue; // Skip neutral in loop

        for (const keyword of data.keywords) {
            if (lowerText.includes(keyword)) {
                detectedMood = mood as MoodType;
                break;
            }
        }
        if (detectedMood !== 'Neutral') break; // Stop if mood found (simple priority)
    }

    const data = MOOD_DATA[detectedMood];
    const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];

    return {
        mood: detectedMood,
        emoji: data.emoji,
        color: data.color,
        quote: randomQuote,
        timestamp: Date.now(),
    };
}
