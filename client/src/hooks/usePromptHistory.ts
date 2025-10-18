import { useState, useEffect } from "react";
import { type PromptHistoryItem } from "@shared/schema";
import { nanoid } from "nanoid";

const HISTORY_KEY = "prompt-generator-history";
const MAX_HISTORY_ITEMS = 50;

export function usePromptHistory() {
  const [history, setHistory] = useState<PromptHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: Omit<PromptHistoryItem, "id" | "timestamp">) => {
    const newItem: PromptHistoryItem = {
      ...item,
      id: nanoid(),
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev];
      return updated.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    deleteFromHistory,
    clearHistory,
  };
}
