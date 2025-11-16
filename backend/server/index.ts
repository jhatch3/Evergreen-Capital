/**
 * Express Server Entry Point
 * 
 * This is an example of how to register the Solana router in your Express server.
 * 
 * To use this:
 * 1. Install dependencies: npm install express @solana/web3.js
 * 2. Set SOLANA_RPC_URL environment variable
 * 3. Start server: npm run dev (or ts-node server/index.ts)
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import solanaRouter from './solana';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Register Solana router
// This mounts the router at /api, so the full path will be /api/sol-balance
app.use('/api', solanaRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Solana RPC: ${process.env.SOLANA_RPC_URL ? 'Configured' : 'NOT SET - Please set SOLANA_RPC_URL'}`);
  console.log(`🔗 Balance endpoint: http://localhost:${PORT}/api/sol-balance?address=YOUR_ADDRESS`);
});

export default app;

