import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // マッチした相手のリスト
  const [matches, setMatches] = useState([]);
  // 各マッチとのチャットメッセージ { profileId: [ {id, text, fromMe} ] }
  const [messages, setMessages] = useState({});

  const addMatch = (profile) => {
    setMatches((prev) => {
      if (prev.find((p) => p.id === profile.id)) return prev;
      return [...prev, profile];
    });
  };

  const sendMessage = (profileId, text) => {
    setMessages((prev) => {
      const existing = prev[profileId] || [];
      return {
        ...prev,
        [profileId]: [
          ...existing,
          { id: Date.now().toString(), text, fromMe: true },
        ],
      };
    });

    // デモ用の自動返信(本番ではWebSocket/APIに置き換える)
    setTimeout(() => {
      setMessages((prev) => {
        const existing = prev[profileId] || [];
        return {
          ...prev,
          [profileId]: [
            ...existing,
            { id: (Date.now() + 1).toString(), text: 'いいね!返信ありがとう😊', fromMe: false },
          ],
        };
      });
    }, 1000);
  };

  return (
    <AppContext.Provider value={{ matches, addMatch, messages, sendMessage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
