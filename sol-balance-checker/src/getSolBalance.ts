import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

/**
 * Lamports are the smallest unit of SOL (like cents to dollars, or satoshis to Bitcoin).
 * 1 SOL = 1,000,000,000 lamports (1 billion lamports)
 * 
 * When we call getBalance() on the Solana RPC, it returns the balance in lamports.
 * To convert to SOL, we divide by LAMPORTS_PER_SOL (which is 1_000_000_000).
 * 
 * Example:
 * - If getBalance() returns 1,500,000,000 lamports
 * - Dividing by 1,000,000,000 gives us 1.5 SOL
 */

/**
 * Fetches the SOL balance for a given wallet address
 * 
 * @param walletAddress - The Solana wallet address (public key) as a string
 * @returns Promise that resolves to the balance in SOL (as a number)
 * @throws Error if the address is invalid or the RPC call fails
 */
export async function getSolBalance(walletAddress: string): Promise<number> {
  // Validate the wallet address
  let publicKey: DskMHh58L9Cvt8bpUEpot7FdGJyPJvXDeKyKKjCDsmpr;
  try {
    publicKey = new PublicKey(walletAddress);
  } catch (error) {
    throw new Error(`Invalid wallet address: ${walletAddress}. Please provide a valid Solana public key.`);
  }

  // Create connection to Solana mainnet RPC endpoint
  const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

  try {
    // Fetch balance in lamports from the RPC
    // getBalance() returns the balance in lamports (the smallest unit of SOL)
    const lamports = await connection.getBalance(publicKey);

    // Convert lamports to SOL
    // We divide by LAMPORTS_PER_SOL (1,000,000,000) to get the SOL amount
    // Example: 1,500,000,000 lamports / 1,000,000,000 = 1.5 SOL
    const solBalance = lamports / LAMPORTS_PER_SOL;

    return solBalance;
  } catch (error) {
    // Handle RPC errors
    if (error instanceof Error) {
      throw new Error(`Failed to fetch balance from RPC: ${error.message}`);
    }
    throw new Error('Failed to fetch balance from RPC: Unknown error');
  }
}

