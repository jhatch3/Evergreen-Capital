/**
 * SOL Balance Checker - CLI Tool
 * 
 * This is a simple Node.js + TypeScript CLI tool that fetches and displays
 * the SOL balance for a given Solana wallet address.
 * 
 * HOW TO RUN:
 * 
 * 1. Install dependencies:
 *    npm install
 * 
 * 2. Build the TypeScript code:
 *    npm run build
 * 
 * 3. Run the CLI with a wallet address:
 *    node dist/index.js <WALLET_ADDRESS>
 * 
 * Example:
 *    node dist/index.js 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
 * 
 * Or use the start script (after building):
 *    npm run start <WALLET_ADDRESS>
 * 
 * If no address is provided, a usage message will be displayed.
 */

import { getSolBalance } from './getSolBalance';

/**
 * Main CLI entry point
 */
async function main() {
  // Get wallet address from command line arguments
  // process.argv[0] = node executable path
  // process.argv[1] = script path (dist/index.js)
  // process.argv[2] = first argument (wallet address)
  const walletAddress = process.argv[2];

  // Check if wallet address was provided
  if (!walletAddress) {
    console.error('Error: Wallet address is required');
    console.log('\nUsage: node dist/index.js <WALLET_ADDRESS>');
    console.log('\nExample:');
    console.log('  node dist/index.js 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');
    console.log('\nOr use npm:');
    console.log('  npm run start <WALLET_ADDRESS>');
    process.exit(1);
  }

  try {
    // Fetch the SOL balance
    const balance = await getSolBalance(walletAddress);

    // Display the result
    console.log(`\nSOL balance for ${walletAddress}:`);
    console.log(`${balance.toFixed(9)} SOL\n`);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      console.error(`\nError: ${error.message}\n`);
    } else {
      console.error('\nError: An unknown error occurred\n');
    }
    process.exit(1);
  }
}

// Run the main function
main();

