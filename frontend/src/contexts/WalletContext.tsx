import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface WalletContextType {
  isOptedIn: boolean;
  optIn: () => void;
  hasCompletedOnboarding: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletContextProvider = ({ children }: { children: ReactNode }) => {
  const { connected } = useWallet();
  const [isOptedIn, setIsOptedIn] = useState(false);

  // Reset opt-in state when wallet disconnects
  useEffect(() => {
    if (!connected) {
      setIsOptedIn(false);
    }
  }, [connected]);

  const optIn = () => {
    setIsOptedIn(true);
  };

  const hasCompletedOnboarding = connected && isOptedIn;

  return (
    <WalletContext.Provider value={{ isOptedIn, optIn, hasCompletedOnboarding }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within WalletContextProvider');
  }
  return context;
};
