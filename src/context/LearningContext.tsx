'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { LocalLearningProgressService } from '@/services/learning-progress.service';
import { useWallet } from '@solana/wallet-adapter-react';

interface LearningContextType {
  xp: number;
  level: number;
  streak: number;
  loading: boolean;
  refresh: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const wallet = useWallet();
  const service = new LocalLearningProgressService();

  const refresh = async () => {
    if (!wallet.publicKey) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userXP = await service.getXP(wallet.publicKey.toString());
      const streakData = await service.getStreak(wallet.publicKey.toString());

      setXp(userXP);
      setLevel(Math.floor(Math.sqrt(userXP / 100)));
      setStreak(streakData.currentStreak);
    } catch (error) {
      console.error('Failed to fetch learning data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [wallet.publicKey]);

  return (
    <LearningContext.Provider value={{ xp, level, streak, loading, refresh }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}