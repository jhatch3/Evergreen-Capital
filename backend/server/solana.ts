/**
 * Solana RPC Router
 * 
 * This router handles Solana-related API calls server-side to avoid
 * CORS and rate limit issues when calling from the browser.
 * 
 * Environment Variables Required:
 * - SOLANA_RPC_URL: Your Solana RPC provider URL (e.g., Helius, QuickNode)
 *   Example: https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
 */

import { Router, Request, Response } from 'express';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const router = Router();

/**
 * GET /api/sol-balance
 * 
 * Fetches SOL balance for a given Solana wallet address
 * 
 * Query Parameters:
 * - address (string, required): Solana public key address
 * 
 * Returns:
 * - 200: { address: string, balance: number } - Balance in SOL
 * - 400: { error: string } - Missing or invalid address
 * - 500: { error: string } - Server error fetching balance
 */
router.get('/sol-balance', async (req: Request, res: Response) => {
  try {
    // Extract address from query parameters
    const address = req.query.address as string;

    // Validate address is provided
    if (!address) {
      return res.status(400).json({ 
        error: 'Missing address',
        details: 'Please provide a Solana wallet address as a query parameter: ?address=YOUR_ADDRESS'
      });
    }

    // Validate RPC URL is configured
    const rpcUrl = process.env.SOLANA_RPC_URL;
    if (!rpcUrl) {
      console.error('[Solana Router] SOLANA_RPC_URL environment variable is not set');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'SOLANA_RPC_URL environment variable is not configured'
      });
    }

    // Create Solana connection
    const connection = new Connection(rpcUrl, 'confirmed');

    // Validate and create PublicKey from address
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(address);
    } catch (error) {
      console.error('[Solana Router] Invalid address:', address, error);
      return res.status(400).json({ 
        error: 'Invalid address',
        details: `"${address}" is not a valid Solana public key`
      });
    }

    // Fetch balance in lamports
    console.log(`[Solana Router] Fetching balance for address: ${address}`);
    const lamports = await connection.getBalance(publicKey, 'confirmed');

    // Convert lamports to SOL
    // 1 SOL = 1,000,000,000 lamports
    const balance = lamports / LAMPORTS_PER_SOL;

    console.log(`[Solana Router] Balance fetched: ${balance} SOL (${lamports} lamports)`);

    // Return success response
    return res.status(200).json({
      address,
      balance,
      lamports,
    });

  } catch (error) {
    // Log error on server
    console.error('[Solana Router] Error fetching balance:', error);
    
    // Return generic error to client (don't expose internal details)
    return res.status(500).json({ 
      error: 'Failed to fetch balance',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

export default router;

