
"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase-client';

type CoinContextType = {
  coins: number;
  addCoins: (amount: number) => Promise<void>;
  refreshCoins: () => Promise<void>;
  isLoading: boolean;
};

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export function CoinProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [coins, setCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCoins = useCallback(async () => {
    if (!user) {
      setCoins(0);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setCoins(docSnap.data().coins || 0);
      } else {
        await setDoc(userDocRef, { coins: 0, email: user.email });
        setCoins(0);
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
      // Keep existing coins if fetch fails
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const addCoins = async (amount: number) => {
    if (!user) return;
    
    // Optimistically update the local state for instant feedback
    const originalCoins = coins;
    setCoins(prevCoins => prevCoins + amount);

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { coins: increment(amount) }, { merge: true });
    } catch (error) {
      console.error("Failed to update coins in Firestore:", error);
      // Revert the optimistic update on failure
      setCoins(originalCoins);
      // Optionally, show a toast to the user
    }
  };

  return (
    <CoinContext.Provider value={{ coins, addCoins, refreshCoins: fetchCoins, isLoading }}>
      {children}
    </CoinContext.Provider>
  );
}

export function useCoins() {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error('useCoins must be used within a CoinProvider');
  }
  return context;
}
