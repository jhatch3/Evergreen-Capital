/**
 * React Hook for fetching SOL balance via backend API
 * 
 * This hook uses the backend API to fetch SOL balance, avoiding
 * CORS and rate limit issues from calling Solana RPC directly.
 * 
 * Usage:
 *   const { balance, error, loading } = useSolBalanceBackend(publicKey?.toString());
 */

import { useState, useEffect, useRef } from 'react';
import { fetchBalanceFromBackend } from '@/lib/api';

interface UseSolBalanceBackendReturn {
  balance: number | null;
  error: Error | null;
  loading: boolean;
}

/**
 * Custom hook to fetch SOL balance from backend API
 * 
 * @param publicKey - Solana wallet public key as string (optional)
 * @param pollMs - Polling interval in milliseconds (default: 15000 = 15 seconds)
 * @returns Object with balance, error, and loading state
 */
export const useSolBalanceBackend = (
  publicKey?: string | null,
  pollMs: number = 15000
): UseSolBalanceBackendReturn => {
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Reset state when publicKey changes
    if (!publicKey) {
      setBalance(null);
      setError(null);
      setLoading(false);
      return;
    }

    // Fetch balance function
    const fetchBalance = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('[useSolBalanceBackend] Fetching balance for:', publicKey);
        
        const solBalance = await fetchBalanceFromBackend(publicKey);
        
        setBalance(solBalance);
        setError(null);
        console.log('[useSolBalanceBackend] Balance fetched:', solBalance, 'SOL');
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch balance');
        console.error('[useSolBalanceBackend] Error:', error);
        setError(error);
        // Keep previous balance on error (don't reset to null)
        setBalance((prevBalance) => prevBalance);
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately on mount
    fetchBalance();

    // Set up polling interval
    if (pollMs > 0) {
      intervalRef.current = setInterval(fetchBalance, pollMs);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [publicKey, pollMs]);

  return { balance, error, loading };
};

