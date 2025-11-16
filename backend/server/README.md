# Solana RPC Proxy Server

Express server that proxies Solana RPC calls to avoid CORS and rate limit issues when calling from the browser.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend/server
   npm install
   ```

2. **Set environment variable:**
   Create a `.env` file or set the environment variable:
   ```bash
   export SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   ```
   
   Or for better performance, use a provider like Helius:
   ```bash
   export SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
   ```

3. **Run the server:**
   ```bash
   # Development (with hot reload)
   npm run dev
   
   # Production (after building)
   npm run build
   npm start
   ```

## API Endpoints

### GET /api/sol-balance

Fetches SOL balance for a given wallet address.

**Query Parameters:**
- `address` (string, required): Solana public key address

**Example:**
```bash
curl "http://localhost:3001/api/sol-balance?address=7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
```

**Response:**
```json
{
  "address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "balance": 1.5,
  "lamports": 1500000000
}
```

## Frontend Integration

The frontend can use this server by setting:
```bash
VITE_SOLANA_API_BASE_URL=http://localhost:3001
```

Then use the `useSolBalanceBackend` hook:
```typescript
import { useSolBalanceBackend } from '@/hooks/useSolBalanceBackend';

const { balance, error, loading } = useSolBalanceBackend(publicKey?.toString());
```

## Port Configuration

Default port is 3001. Override with:
```bash
export PORT=3001
```

