import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface UseSolBalanceReturn {
  balance: number | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Mock SOL balance - consistent across the app
 * ~$5 worth of SOL at current prices (~$150/SOL)
 */
const MOCK_SOL_BALANCE = 0.0333; // Approximately $5 USD at $150/SOL

/**
 * Custom hook that returns mock SOL balance
 * Returns consistent balance data across Dashboard and Deposit pages
 */
export const useSolBalance = (): UseSolBalanceReturn => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate a brief loading state for realism
    const timer = setTimeout(() => {
      if (publicKey) {
        // Return mock balance when wallet is connected
        setBalance(MOCK_SOL_BALANCE);
        setError(null);
      } else {
        // No balance when wallet is not connected
        setBalance(null);
        setError(null);
      }
      setLoading(false);
    }, 500); // Small delay to simulate network request

    return () => clearTimeout(timer);
  }, [publicKey]);

  return { balance, loading, error };
};

