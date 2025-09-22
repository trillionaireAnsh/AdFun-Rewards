
"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, onSnapshot, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type CoinContextType = {
  coins: number;
  addCoins: (amount: number) => Promise<void>;
  isLoading: boolean;
};

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export function CoinProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [coins, setCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // If there's no user, we're not loading coins.
      // This happens on logout.
      setIsLoading(false);
      setCoins(0);
      return;
    }

    setIsLoading(true);
    const userDocRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
        if (docSnap.exists()) {
            setCoins(docSnap.data().coins || 0);
        } else {
            // If user doc doesn't exist, create it with initial coin balance
            await setDoc(userDocRef, { coins: 0, email: user.email });
            setCoins(0);
        }
        setIsLoading(false);
    }, (error) => {
        console.error("Error fetching coins:", error);
        setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  const addCoins = async (amount: number) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    // We don't need to update the state here, onSnapshot will do it automatically
    await setDoc(userDocRef, { coins: increment(amount) }, { merge: true });
  };
  
  return (
    <CoinContext.Provider value={{ coins, addCoins, isLoading }}>
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
