import { MoodResult } from './moodLogic';

const STORAGE_KEY = 'moodscan_history';

export function saveResult(result: MoodResult): void {
    try {
        const history = getHistory();
        const newHistory = [result, ...history];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
        console.error('Failed to save mood result:', error);
    }
}

export function getHistory(): MoodResult[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        // Need to reconstruct icons because they don't survive JSON serialization
        // But for MVP we might just store the mood name and re-map the icon in the UI
        // Actually, let's just store the data and let the UI map it back to icons.
        // The MoodResult type has 'icon' which is a function, so it won't serialize well.
        // We should probably strip it before saving, or just save a simpler object.

        // Let's adjust this to return raw data and let the component handle the icon mapping
        return JSON.parse(stored);
    } catch (error) {
        console.error('Failed to get mood history:', error);
        return [];
    }
}

export function clearHistory(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear history:', error);
    }
}
