"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type CoinContextType = {
  coins: number;
  setCoins: Dispatch<SetStateAction<number>>;
  addCoins: (amount: number) => void;
};

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export function CoinProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState(1250); // Start with some coins for demo

  const addCoins = (amount: number) => {
    setCoins(prevCoins => prevCoins + amount);
  };

  return (
    <CoinContext.Provider value={{ coins, setCoins, addCoins }}>
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
