import { useState, useEffect, useCallback } from "react";

export type HistoryItem = {
    query: string;
    timestamp: string;
};

const HISTORY_KEY = "conectai_search_history_v1";
const HISTORY_UPDATE_EVENT = "conectai_history_update";

export function useHistory() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const loadHistory = useCallback(() => {
        const stored = localStorage.getItem(HISTORY_KEY);
        if (stored) {
            try {
                setHistory(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse history", e);
                setHistory([]);
            }
        } else {
            setHistory([]);
        }
    }, []);

    useEffect(() => {
        loadHistory();
        const handleUpdate = () => loadHistory();
        window.addEventListener(HISTORY_UPDATE_EVENT, handleUpdate);
        return () => window.removeEventListener(HISTORY_UPDATE_EVENT, handleUpdate);
    }, [loadHistory]);

    const addHistoryItem = (query: string) => {
        if (!query || !query.trim()) return;

        const stored = localStorage.getItem(HISTORY_KEY);
        let currentHistory: HistoryItem[] = [];
        if (stored) {
            try {
                currentHistory = JSON.parse(stored);
            } catch (e) { }
        }

        const newItem: HistoryItem = {
            query: query.trim(),
            timestamp: new Date().toISOString(),
        };

        // Remove duplicates (case insensitive) and limit to 50
        const filtered = currentHistory.filter(
            (item) => item.query.toLowerCase() !== query.trim().toLowerCase()
        );
        const updated = [newItem, ...filtered].slice(0, 50);

        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event(HISTORY_UPDATE_EVENT));
    };

    const clearHistory = () => {
        localStorage.removeItem(HISTORY_KEY);
        window.dispatchEvent(new Event(HISTORY_UPDATE_EVENT));
    };

    return { history, addHistoryItem, clearHistory };
}
