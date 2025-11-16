# SOL Balance Checker

A simple Node.js + TypeScript CLI tool to check SOL balance for any Solana wallet address.

## Features

- ✅ Validates wallet addresses
- ✅ Fetches balance from Solana mainnet
- ✅ Converts lamports to SOL
- ✅ Clear error messages
- ✅ TypeScript for type safety

## Installation

```bash
npm install
```

## Build

```bash
npm run build
```

## Usage

```bash
node dist/index.js <WALLET_ADDRESS>
```

### Example

```bash
node dist/index.js 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

Output:
```
SOL balance for 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU:
1.500000000 SOL
```

## Project Structure

```
sol-balance-checker/
├── src/
│   ├── index.ts           # CLI entry point
│   └── getSolBalance.ts    # Balance fetching function
├── dist/                  # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

1. **Validates the wallet address** using Solana's `PublicKey` class
2. **Connects to Solana mainnet RPC** at `https://api.mainnet-beta.solana.com`
3. **Fetches balance in lamports** using `connection.getBalance()`
4. **Converts to SOL** by dividing by `LAMPORTS_PER_SOL` (1,000,000,000)

## About Lamports

- **Lamports** are the smallest unit of SOL (like cents to dollars)
- 1 SOL = 1,000,000,000 lamports
- The RPC returns balance in lamports, so we divide by 1 billion to get SOL

## Error Handling

The tool will show clear error messages for:
- Invalid wallet addresses
- RPC connection failures
- Network errors

## License

MIT

